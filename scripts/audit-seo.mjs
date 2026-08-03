// ---------------------------------------------------------------------------
// SEO integrity audit — run against the BUILT HTML, not the source.
//
//   npm run build && npm run audit:seo
//
// Verifies, by parsing every prerendered page:
//   1. Zero duplicate <title>
//   2. Zero duplicate meta description
//   3. Zero duplicate canonical
//   4. Zero duplicate <h1>, and exactly one per page
//   5. Zero duplicate FAQ questions site-wide
//   6. Every JSON-LD block parses as valid JSON
//   7. Canonicals are absolute https with a trailing slash
//   8. Open Graph + Twitter tags present
//   9. Templated-page body overlap under the 15% Jaccard threshold
//  10. noindex pages are excluded from sitemap.xml
//
// Exits non-zero on any failure so it can gate a deploy.
// ---------------------------------------------------------------------------
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const APP_DIR = path.join(process.cwd(), '.next', 'server', 'app');
const JACCARD_LIMIT = 0.15;

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const decode = (s = '') =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;/g, '’')
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');

const one = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]).trim() : null;
};

function metaContent(html, attr, value) {
  // Handles both attribute orders that React may emit.
  const a = html.match(
    new RegExp(`<meta[^>]+${attr}="${value}"[^>]*content="([^"]*)"`, 'i'),
  );
  if (a) return decode(a[1]).trim();
  const b = html.match(
    new RegExp(`<meta[^>]+content="([^"]*)"[^>]*${attr}="${value}"`, 'i'),
  );
  return b ? decode(b[1]).trim() : null;
}

/**
 * Extract comparable BODY CONTENT.
 *
 * Deliberately excludes the site chrome — header, mega-menu, breadcrumbs,
 * footer and sticky call bar. That boilerplate is identical on every page by
 * design (the footer alone lists all 32 services and all 13 cities), so
 * including it would swamp the measurement and tell us nothing about whether
 * the actual page copy is distinct. What is measured is the content inside
 * <main>, minus navigation.
 */
function bodyText(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const scope = main ? main[1] : html;
  return decode(
    scope
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
      .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
      // The quote form is identical everywhere and its <select>s alone repeat
      // all 32 service names and all 13 city names. It is a form control, not
      // page copy.
      .replace(/<form[\s\S]*?<\/form>/gi, ' ')
      // Repeated CTA chrome, explicitly tagged in components/sections.tsx.
      .replace(/<section[^>]*data-boilerplate[\s\S]*?<\/section>/gi, ' ')
      .replace(/<div[^>]*data-boilerplate[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 5-word shingles — the standard near-duplicate measure. */
function shingles(text, n = 5) {
  const w = text.split(' ').filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= w.length; i++) set.add(w.slice(i, i + n).join(' '));
  return set;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  for (const s of small) if (large.has(s)) inter++;
  return inter / (a.size + b.size - inter);
}

function routeOf(file) {
  const rel = path
    .relative(APP_DIR, file)
    .replace(/\\/g, '/')
    .replace(/\.html$/, '');
  return rel === 'index' ? '/' : `/${rel}/`;
}

/** Group pages by template so we compare like with like. */
function pageType(route) {
  if (route === '/') return 'home';
  const seg = route.split('/').filter(Boolean);
  if (seg[0] === 'service-areas') {
    if (seg.length === 1) return 'areas-hub';
    if (seg.length === 2) return 'city';
    return 'city-service';
  }
  if (seg[0] === 'services') return seg.length === 1 ? 'services-hub' : 'service';
  if (seg[0] === 'cost') return seg.length === 1 ? 'cost-hub' : 'cost';
  if (seg[0] === 'solutions') return seg.length === 1 ? 'sol-hub' : 'solution';
  if (seg[0] === 'blog') return seg.length === 1 ? 'blog-hub' : 'post';
  return 'utility';
}

const failures = [];
const warnings = [];
const fail = (m) => failures.push(m);
const warn = (m) => warnings.push(m);

const files = await walk(APP_DIR);
if (!files.length) {
  console.error(red('No built HTML found. Run `npm run build` first.'));
  process.exit(1);
}

const pages = [];

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const route = routeOf(file);

  // /_next/_not-found is Next's internal 404 renderer, not a reachable URL.
  // It is served with a 404 status and is not in the sitemap, so auditing it
  // as a page would produce false duplicate-canonical and overlap failures.
  if (route.startsWith('/_not-found')) continue;

  const title = one(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = metaContent(html, 'name', 'description');
  const canonical = (html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i) || [])[1];
  const canonicalCount = (html.match(/rel="canonical"/gi) || []).length;
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    decode(m[1].replace(/<[^>]+>/g, '')).trim(),
  );
  const robots = metaContent(html, 'name', 'robots') || '';
  const noindex = /noindex/i.test(robots);

  // JSON-LD
  const ldBlocks = [...html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )].map((m) => m[1]);
  const graphs = [];
  for (const raw of ldBlocks) {
    try {
      graphs.push(JSON.parse(raw));
    } catch (e) {
      fail(`${route} — JSON-LD does not parse: ${e.message}`);
    }
  }

  const faqQuestions = [];
  for (const g of graphs) {
    const nodes = Array.isArray(g) ? g : [g];
    for (const n of nodes) {
      if (n && n['@type'] === 'FAQPage' && Array.isArray(n.mainEntity)) {
        for (const q of n.mainEntity) if (q?.name) faqQuestions.push(q.name.trim());
      }
    }
  }

  // ── Per-page assertions ──────────────────────────────────────────────
  if (!title) fail(`${route} — missing <title>`);
  if (!description) fail(`${route} — missing meta description`);
  if (canonicalCount !== 1) fail(`${route} — expected exactly 1 canonical, found ${canonicalCount}`);
  if (canonical) {
    if (!canonical.startsWith('https://')) fail(`${route} — canonical is not absolute https: ${canonical}`);
    if (!canonical.endsWith('/')) fail(`${route} — canonical missing trailing slash: ${canonical}`);
  }
  if (h1s.length !== 1) fail(`${route} — expected exactly 1 <h1>, found ${h1s.length}`);
  if (!metaContent(html, 'property', 'og:title')) fail(`${route} — missing og:title`);
  if (!metaContent(html, 'property', 'og:description')) fail(`${route} — missing og:description`);
  if (!metaContent(html, 'property', 'og:image')) fail(`${route} — missing og:image`);
  if (!metaContent(html, 'name', 'twitter:card')) fail(`${route} — missing twitter:card`);

  if (title && title.length > 62) warn(`${route} — title ${title.length} chars: "${title}"`);
  if (description && (description.length < 80 || description.length > 165)) {
    warn(`${route} — meta description ${description.length} chars`);
  }
  if (!noindex && faqQuestions.length === 0 && pageType(route) !== 'utility') {
    warn(`${route} — no FAQPage schema`);
  }

  pages.push({
    route,
    title,
    description,
    canonical,
    h1: h1s[0],
    noindex,
    faqQuestions,
    type: pageType(route),
    text: bodyText(html),
  });
}

// ── Site-wide duplicate checks ─────────────────────────────────────────
function dupes(field, label) {
  const seen = new Map();
  for (const p of pages) {
    const v = p[field];
    if (!v) continue;
    if (!seen.has(v)) seen.set(v, []);
    seen.get(v).push(p.route);
  }
  let count = 0;
  for (const [value, routes] of seen) {
    if (routes.length > 1) {
      count++;
      fail(`Duplicate ${label} on ${routes.length} pages: "${value.slice(0, 80)}" → ${routes.slice(0, 4).join(', ')}${routes.length > 4 ? ` (+${routes.length - 4})` : ''}`);
    }
  }
  return count;
}

const dupTitles = dupes('title', 'title');
const dupDescs = dupes('description', 'meta description');
const dupCanon = dupes('canonical', 'canonical');
const dupH1 = dupes('h1', 'H1');

// FAQ questions must be globally unique.
const faqSeen = new Map();
for (const p of pages) {
  for (const q of p.faqQuestions) {
    if (!faqSeen.has(q)) faqSeen.set(q, []);
    faqSeen.get(q).push(p.route);
  }
}
let dupFaq = 0;
for (const [q, routes] of faqSeen) {
  if (routes.length > 1) {
    dupFaq++;
    fail(`Duplicate FAQ question on ${routes.length} pages: "${q.slice(0, 80)}" → ${routes.slice(0, 3).join(', ')}${routes.length > 3 ? ` (+${routes.length - 3})` : ''}`);
  }
}

// ── Body-overlap (Jaccard) within each templated page type ─────────────
const overlapReport = [];
const byType = new Map();
for (const p of pages) {
  if (!byType.has(p.type)) byType.set(p.type, []);
  byType.get(p.type).push(p);
}

for (const [type, group] of byType) {
  if (group.length < 2) continue;
  const sh = group.map((p) => ({ route: p.route, s: shingles(p.text) }));
  let max = 0;
  let maxPair = null;
  let sum = 0;
  let n = 0;
  let over = 0;
  // Cap comparisons on very large groups to keep the audit fast; sampling is
  // reported so a capped run is never mistaken for full coverage.
  const LIMIT = 60;
  const sample = sh.length > LIMIT ? sh.slice(0, LIMIT) : sh;
  for (let i = 0; i < sample.length; i++) {
    for (let j = i + 1; j < sample.length; j++) {
      const v = jaccard(sample[i].s, sample[j].s);
      sum += v;
      n++;
      if (v > max) {
        max = v;
        maxPair = [sample[i].route, sample[j].route];
      }
      if (v > JACCARD_LIMIT) over++;
    }
  }
  if (!n) continue;
  overlapReport.push({ type, count: group.length, compared: sample.length, avg: sum / n, max, maxPair, over });
  if (max > JACCARD_LIMIT) {
    fail(`Body overlap ${(max * 100).toFixed(1)}% exceeds ${(JACCARD_LIMIT * 100).toFixed(0)}% between ${maxPair[0]} and ${maxPair[1]} (type: ${type})`);
  }
}

// ── Sitemap must exclude noindex pages ─────────────────────────────────
try {
  const sitemapFile = files.find((f) => f.endsWith('sitemap.xml.body')) ?? null;
  let xml = null;
  if (sitemapFile) xml = await readFile(sitemapFile, 'utf8');
  else {
    const alt = path.join(APP_DIR, 'sitemap.xml.body');
    xml = await readFile(alt, 'utf8').catch(() => null);
  }
  if (xml) {
    for (const p of pages.filter((x) => x.noindex)) {
      const slug = p.route.replace(/\/$/, '');
      if (slug && xml.includes(`${slug}/`)) fail(`noindex page ${p.route} appears in sitemap.xml`);
    }
  } else {
    warn('sitemap.xml body not found in build output — verify manually on the running server');
  }
} catch {
  warn('Could not read sitemap.xml from the build output');
}

// ── Report ─────────────────────────────────────────────────────────────
console.log(bold('\n═══ SEO INTEGRITY AUDIT ═══\n'));
console.log(`Pages audited:            ${pages.length}`);
console.log(`  indexable:              ${pages.filter((p) => !p.noindex).length}`);
console.log(`  noindex:                ${pages.filter((p) => p.noindex).length}`);
console.log(`Unique titles:            ${new Set(pages.map((p) => p.title)).size}`);
console.log(`Unique meta descriptions: ${new Set(pages.map((p) => p.description)).size}`);
console.log(`Unique H1s:               ${new Set(pages.map((p) => p.h1)).size}`);
console.log(`Total FAQ questions:      ${[...faqSeen.values()].reduce((a, r) => a + r.length, 0)}`);
console.log(`Unique FAQ questions:     ${faqSeen.size}`);

console.log(bold('\nDuplicate checks'));
const line = (label, n) => console.log(`  ${n === 0 ? green('PASS') : red('FAIL')}  ${label}: ${n}`);
line('duplicate titles', dupTitles);
line('duplicate meta descriptions', dupDescs);
line('duplicate canonicals', dupCanon);
line('duplicate H1s', dupH1);
line('duplicate FAQ questions', dupFaq);

console.log(bold('\nBody overlap by page type (5-word shingle Jaccard)'));
for (const r of overlapReport.sort((a, b) => b.max - a.max)) {
  const status = r.max > JACCARD_LIMIT ? red('FAIL') : green('PASS');
  const note = r.compared < r.count ? ` [sampled ${r.compared}/${r.count}]` : '';
  console.log(
    `  ${status}  ${r.type.padEnd(14)} pages=${String(r.count).padStart(3)}  avg=${(r.avg * 100).toFixed(1)}%  max=${(r.max * 100).toFixed(1)}%${note}`,
  );
}

if (warnings.length) {
  console.log(bold(yellow(`\nWarnings (${warnings.length})`)));
  for (const w of warnings.slice(0, 25)) console.log(`  ${yellow('!')} ${w}`);
  if (warnings.length > 25) console.log(`  … and ${warnings.length - 25} more`);
}

if (failures.length) {
  console.log(bold(red(`\nFAILURES (${failures.length})`)));
  for (const f of failures.slice(0, 40)) console.log(`  ${red('✗')} ${f}`);
  if (failures.length > 40) console.log(`  … and ${failures.length - 40} more`);
  console.log(red(bold('\n═══ AUDIT FAILED ═══\n')));
  process.exit(1);
}

console.log(green(bold('\n═══ ALL CHECKS PASSED ═══\n')));
