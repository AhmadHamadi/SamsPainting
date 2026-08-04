// ---------------------------------------------------------------------------
// Pre-deploy verification. Fails loudly rather than letting a bad config ship.
//   node scripts/verify-deploy.mjs
// ---------------------------------------------------------------------------
import { readFileSync, existsSync } from 'node:fs';
import { pathToRegexp } from 'path-to-regexp';

const fail = [];
const ok = [];
const check = (cond, pass, msg) => (cond ? ok.push(pass) : fail.push(msg));

// ── Required files ─────────────────────────────────────────────────────────
for (const f of [
  'vercel.json',
  'package.json',
  '.env.example',
  '.gitignore',
  'README.md',
  'next.config.mjs',
  'public/llms.txt',
  'app/api/quote/route.ts',
]) {
  check(existsSync(f), `present: ${f}`, `MISSING FILE: ${f}`);
}

// ── vercel.json ────────────────────────────────────────────────────────────
let v;
try {
  v = JSON.parse(readFileSync('vercel.json', 'utf8'));
  ok.push('vercel.json parses');
} catch (e) {
  fail.push(`vercel.json invalid JSON: ${e.message}`);
}

if (v) {
  check(v.trailingSlash === true, 'trailingSlash true', 'vercel.json trailingSlash must be true');
  check(v.cleanUrls === false, 'cleanUrls false', 'vercel.json cleanUrls must be false');

  // Every redirect/header source must compile as a real route pattern.
  for (const r of v.redirects ?? []) {
    try {
      pathToRegexp(r.source);
      ok.push(`redirect compiles: ${r.source}`);
    } catch (e) {
      fail.push(`REDIRECT WILL NOT COMPILE: "${r.source}" — ${e.message}`);
    }
    check(
      r.permanent === true,
      `redirect 301: ${r.source}`,
      `redirect should be permanent (301): ${r.source}`,
    );
  }
  for (const h of v.headers ?? []) {
    try {
      pathToRegexp(h.source);
      ok.push(`header compiles: ${h.source}`);
    } catch (e) {
      fail.push(`HEADER SOURCE WILL NOT COMPILE: "${h.source}" — ${e.message}`);
    }
  }

  const all = (v.headers ?? []).flatMap((h) => h.headers.map((x) => x.key.toLowerCase()));
  for (const req of [
    'strict-transport-security',
    'x-content-type-options',
    'x-frame-options',
    'referrer-policy',
    'permissions-policy',
  ]) {
    check(all.includes(req), `header set: ${req}`, `MISSING SECURITY HEADER: ${req}`);
  }

  // Exactly one canonical host redirect (apex -> www or the reverse).
  const hostRedirects = (v.redirects ?? []).filter((r) =>
    (r.has ?? []).some((c) => c.type === 'host'),
  );
  check(
    hostRedirects.length === 1,
    'one canonical host redirect',
    `expected exactly 1 host redirect, found ${hostRedirects.length}`,
  );
}

// ── Secrets must not be committed ──────────────────────────────────────────
const gitignore = existsSync('.gitignore') ? readFileSync('.gitignore', 'utf8') : '';
for (const entry of ['node_modules', '.vercel', '.env']) {
  check(gitignore.includes(entry), `gitignored: ${entry}`, `.gitignore must include ${entry}`);
}

const routeSrc = readFileSync('app/api/quote/route.ts', 'utf8');
check(
  /process\.env\.RESEND_API_KEY/.test(routeSrc),
  'API key read from env',
  'route.ts must read RESEND_API_KEY from process.env',
);
check(
  !/re_[A-Za-z0-9]{16,}/.test(routeSrc),
  'no hardcoded API key in route.ts',
  'HARDCODED RESEND KEY FOUND in route.ts — remove it',
);
check(
  /reply_to/.test(routeSrc),
  'reply-to set to customer',
  'route.ts should set reply_to',
);
// The payload uses ES shorthand (`text,`), so match the property either way.
check(
  /(^|[\s{,])text\s*[,:]/m.test(routeSrc),
  'text/plain part included',
  'route.ts should send a text part alongside the HTML',
);

// A committed .env would be a live secret leak.
check(!existsSync('.env'), 'no .env committed', 'A .env file exists — ensure it is NOT committed');

// ── Report ─────────────────────────────────────────────────────────────────
console.log(`\n═══ VERCEL DEPLOY VERIFICATION ═══\n`);
console.log(`Passed: ${ok.length}`);
if (fail.length) {
  console.log(`\n\x1b[31mFAILURES (${fail.length})\x1b[0m`);
  for (const f of fail) console.log(`  ✗ ${f}`);
  console.log('\n\x1b[31m═══ NOT DEPLOY-READY ═══\x1b[0m\n');
  process.exit(1);
}
console.log('\n\x1b[32m═══ DEPLOY-READY — set RESEND_API_KEY in Vercel and ship ═══\x1b[0m\n');
