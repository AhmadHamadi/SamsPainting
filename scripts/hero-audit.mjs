// Captures the HERO of every service and city page so each can be visually
// checked against the page it belongs to.
//   node scripts/hero-audit.mjs
import { chromium } from 'playwright-core';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE ?? 'http://localhost:3100';
const OUT = path.join(process.cwd(), 'scripts', '__heroes__');
const WIDTH = Number(process.env.W ?? 1280);
const HEIGHT = Number(process.env.H ?? 560);

// Read the route list straight from the built sitemap so nothing is missed.
const src = await readFile(path.join(process.cwd(), 'lib', 'services.ts'), 'utf8');
const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const parents = [...src.matchAll(/slug:\s*'([^']+)'[\s\S]{0,900}?parent:\s*'([^']+)'/g)];
const parentOf = Object.fromEntries(parents.map((m) => [m[1], m[2]]));

const routes = slugs.map((s) => [s, parentOf[s] ? `/services/${parentOf[s]}/${s}/` : `/services/${s}/`]);

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT } });

for (const [name, route] of routes) {
  const page = await ctx.newPage();
  try {
    await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 40000 });
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  } catch (e) {
    console.log(`FAILED ${route}: ${e.message}`);
  }
  await page.close();
}

await ctx.close();
await browser.close();
console.log(`Captured ${routes.length} hero shots at ${WIDTH}x${HEIGHT} to ${OUT}`);
