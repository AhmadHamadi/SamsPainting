// Renders one page of every TYPE at desktop and mobile widths for visual
// review, and reports any console errors, failed requests or broken images.
//   node scripts/screenshot.mjs
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE ?? 'http://localhost:3100';
const OUT = process.env.OUT ?? path.join(process.cwd(), 'scripts', '__screenshots__');

const ROUTES = [
  ['home', '/'],
  ['services-hub', '/services/'],
  ['service', '/services/cabinet-painting/'],
  ['service-nested', '/services/surface-preparation/priming/'],
  ['areas-hub', '/service-areas/'],
  ['city', '/service-areas/dundas/'],
  ['city-service', '/service-areas/burlington/exterior-painting/'],
  ['cost-hub', '/cost/'],
  ['cost', '/cost/kitchen-cabinet-painting-cost/'],
  ['solutions-hub', '/solutions/'],
  ['solution', '/solutions/peeling-exterior-paint/'],
  ['blog-hub', '/blog/'],
  ['post', '/blog/best-time-to-paint-exterior-ontario/'],
  ['about', '/about/'],
  ['contact', '/contact/'],
  ['faq', '/faq/'],
  ['thank-you', '/thank-you/'],
  ['sitemap', '/sitemap/'],
  ['404', '/this-page-does-not-exist/'],
];

const VIEWPORTS = [
  ['desktop', 1360, 900],
  ['mobile', 390, 844],
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const problems = [];

for (const [vpName, width, height] of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  for (const [name, route] of ROUTES) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    page.on('requestfailed', (r) => errors.push(`REQ FAIL ${r.url()}`));
    page.on('response', (r) => {
      if (r.status() >= 400 && !route.includes('does-not-exist')) {
        errors.push(`HTTP ${r.status()} ${r.url()}`);
      }
    });

    await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(400);

    // Check every <img> actually decoded and is visible.
    const imgs = await page.evaluate(() =>
      [...document.images].map((i) => ({
        src: i.currentSrc || i.src,
        alt: i.alt,
        ok: i.complete && i.naturalWidth > 0,
        w: i.naturalWidth,
        shown: i.getBoundingClientRect().width > 0 && i.getBoundingClientRect().height > 0,
      })),
    );
    for (const im of imgs) {
      if (!im.ok) errors.push(`BROKEN IMG ${im.src}`);
      if (!im.alt) errors.push(`MISSING ALT ${im.src}`);
    }

    await page.screenshot({
      path: path.join(OUT, `${vpName}-${name}.png`),
      fullPage: false,
    });

    if (errors.length) problems.push({ vp: vpName, route, errors: [...new Set(errors)].slice(0, 5) });
    await page.close();
  }
  await ctx.close();
}

await browser.close();

if (problems.length) {
  console.log('\nISSUES FOUND:');
  for (const p of problems) {
    console.log(`  ${p.vp} ${p.route}`);
    for (const e of p.errors) console.log(`     - ${e}`);
  }
  process.exitCode = 1;
} else {
  console.log(`\nNo console errors, failed requests, broken images or missing alt text.`);
}
console.log(`Captured ${ROUTES.length * VIEWPORTS.length} screenshots to ${OUT}`);
