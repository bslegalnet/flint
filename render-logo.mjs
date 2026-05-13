import puppeteer from "puppeteer";
import path from "path";

const DESKTOP = "/Users/thomasneelettu/Desktop";

const html = (bg) => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 720px;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${bg};
  }
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
  .flint {
    font-family: 'Cinzel', Georgia, serif;
    font-weight: 700;
    font-size: 100px;
    color: #C09428;
    letter-spacing: 0.12em;
    line-height: 1;
  }
  .sub-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 10px;
  }
  .line {
    height: 1.5px;
    width: 60px;
    background: #C09428;
    opacity: 0.7;
  }
  .sub {
    font-family: 'Cinzel', Georgia, serif;
    font-weight: 400;
    font-size: 17px;
    color: #C09428;
    letter-spacing: 0.32em;
  }
</style>
</head>
<body>
<div class="logo">
  <span class="flint">FLINT</span>
  <div class="sub-row">
    <div class="line"></div>
    <span class="sub">FINANCIAL GROUP</span>
    <div class="line"></div>
  </div>
</div>
</body>
</html>`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 720, height: 260, deviceScaleFactor: 3 });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Transparent
await page.setContent(html("transparent"), { waitUntil: "domcontentloaded" });
await wait(3000);
await page.screenshot({
  path: path.join(DESKTOP, "flint-logo-transparent.png"),
  omitBackground: true,
});
console.log("Saved: flint-logo-transparent.png");

// Cream/beige
await page.setContent(html("#F5EDD8"), { waitUntil: "domcontentloaded" });
await wait(3000);
await page.screenshot({
  path: path.join(DESKTOP, "flint-logo-cream.png"),
  omitBackground: false,
});
console.log("Saved: flint-logo-cream.png");

await browser.close();
