// Screenshots app pages at mobile and desktop widths, for checking a new screen.
// Usage: node scripts/screenshot.mjs /wizard /onboarding   (needs `npm run build` first)
// Writes screenshots/<page>-mobile.png and screenshots/<page>-desktop.png.
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const pages = process.argv.slice(2);
if (!pages.length) {
  console.error("Give one or more paths, e.g. node scripts/screenshot.mjs /wizard");
  process.exit(1);
}
const port = 3077;
const server = spawn("npx", ["next", "start", "-p", String(port)], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 5000));
mkdirSync("screenshots", { recursive: true });
let browser;
try {
  browser = await chromium.launch();
} catch {
  server.kill();
  console.error("The screenshot browser isn't installed yet. Run: npx playwright install chromium");
  process.exit(1);
}
try {
  for (const path of pages) {
    for (const [label, width, height] of [["mobile", 390, 844], ["desktop", 1440, 940]]) {
      const page = await browser.newPage({ viewport: { width, height } });
      await page.goto(`http://localhost:${port}${path}`, { waitUntil: "networkidle" });
      const file = `screenshots/${path.replace(/^\//, "").replaceAll("/", "-") || "home"}-${label}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log("✓", file);
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.kill();
}
