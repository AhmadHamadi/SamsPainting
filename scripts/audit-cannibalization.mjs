// ---------------------------------------------------------------------------
// Keyword-cannibalisation audit.
//
// Every page on this site is supposed to own exactly ONE primary keyword, so
// that no two pages compete against each other in the SERPs. This script builds
// the full keyword -> URL map from the content layer and fails if any keyword
// maps to more than one URL.
//
//   node scripts/audit-cannibalization.mjs
// ---------------------------------------------------------------------------
import { readFileSync } from 'node:fs';

const read = (f) => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');

const keywords = (file) => [...read(file).matchAll(/keyword:\s*'([^']+)'/g)].map((m) => m[1]);

const servicesSrc = read('lib/services.ts');
const serviceSlugs = [...servicesSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const serviceKeywords = keywords('lib/services.ts');
// A service joins the city matrix when its entry carries `matrix: true`.
const matrixKeywords = [
  ...servicesSrc.matchAll(/keyword:\s*'([^']+)'[\s\S]{0,600}?matrix:\s*(true|false)/g),
]
  .filter((m) => m[2] === 'true')
  .map((m) => m[1]);

const cityNames = [...read('lib/areas.ts').matchAll(/^\s{4}name:\s*'([^']+)',/gm)].map((m) => m[1]);

const map = new Map();
const add = (kw, url) => {
  const k = kw.toLowerCase().trim();
  if (!map.has(k)) map.set(k, []);
  map.get(k).push(url);
};

serviceKeywords.forEach((k, i) => add(k, `/services/${serviceSlugs[i] ?? i}/`));
cityNames.forEach((c) => add(`painters ${c}`, `/service-areas/${c}/`));
cityNames.forEach((c) => matrixKeywords.forEach((k) => add(`${k} ${c}`, `/service-areas/${c}/${k}/`)));
keywords('lib/costs.ts').forEach((k, i) => add(k, `/cost/#${i}`));
keywords('lib/solutions.ts').forEach((k, i) => add(k, `/solutions/#${i}`));
keywords('lib/blog.ts').forEach((k, i) => add(k, `/blog/#${i}`));

let collisions = 0;
for (const [k, urls] of map) {
  if (urls.length > 1) {
    collisions++;
    console.log(`\x1b[31mCOLLISION\x1b[0m "${k}" -> ${urls.join(' | ')}`);
  }
}

console.log('\n═══ KEYWORD CANNIBALISATION AUDIT ═══\n');
console.log(`Service pages:            ${serviceKeywords.length}`);
console.log(`Services in city matrix:  ${matrixKeywords.length}`);
console.log(`Cities:                   ${cityNames.length}`);
console.log(`Cost pages:               ${keywords('lib/costs.ts').length}`);
console.log(`Solution pages:           ${keywords('lib/solutions.ts').length}`);
console.log(`Blog posts:               ${keywords('lib/blog.ts').length}`);
console.log(`\nDistinct primary keywords mapped: ${map.size}`);
console.log(
  collisions === 0
    ? '\x1b[32mPASS\x1b[0m  keyword collisions: 0 — every page owns a distinct primary query\n'
    : `\x1b[31mFAIL\x1b[0m  keyword collisions: ${collisions}\n`,
);

process.exit(collisions === 0 ? 0 : 1);
