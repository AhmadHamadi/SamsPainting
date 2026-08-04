// Ad-hoc visual check of the homepage hero, navbar states and mobile menu.
//   node scripts/layout-check.mjs <outputDir>
import { chromium } from 'playwright-core';
const OUT = process.argv[2];
const b = await chromium.launch();
const shots = [
  ['home-desktop', '/', 1360, 800, null],
  ['home-mobile', '/', 390, 800, null],
  ['navbar-open', '/', 1360, 800, 'services'],
  ['areas-open', '/', 1360, 800, 'areas'],
  ['mobile-menu', '/', 390, 800, 'burger'],
  ['city-desktop', '/service-areas/dundas/', 1360, 700, null],
];
for (const [name, route, w, h, action] of shots) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:3100' + route, { waitUntil: 'networkidle', timeout: 40000 });
  await p.waitForTimeout(300);
  try {
    if (action === 'services') await p.getByRole('button', { name: /^Services$/ }).click();
    if (action === 'areas') await p.getByRole('button', { name: /Service Areas/ }).click();
    if (action === 'burger') await p.getByRole('button', { name: /Open menu/ }).click();
    if (action) await p.waitForTimeout(500);
  } catch (e) {
    console.log(`ACTION FAILED on ${name}: ${e.message.split('\n')[0]}`);
  }
  await p.screenshot({ path: `${OUT}/${name}.png` });
  await ctx.close();
}
await b.close();
console.log('captured');
