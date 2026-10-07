// Visual QA harness: full-page screenshots at the breakpoints the brief lists,
// plus console-error and horizontal-overflow checks on every route.
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.BASE || "http://localhost:3210";
const OUT = process.env.OUT || ".";

const routes = (process.env.ROUTES || "/,/about,/services,/projects,/contact,/faq,/privacy,/projects/project-slot-01,/nope-404").split(",");
const widths = (process.env.WIDTHS || "1440,390").split(",").map(Number);

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--font-render-hinting=none"],
});

const report = [];

for (const width of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: width < 700 ? 844 : 900, deviceScaleFactor: 1 });

  for (const route of routes) {
    const problems = [];
    page.removeAllListeners("console");
    page.removeAllListeners("pageerror");
    page.on("console", (m) => {
      if (m.type() === "error" || m.type() === "warning") problems.push(`${m.type()}: ${m.text().slice(0, 240)}`);
    });
    page.on("pageerror", (e) => problems.push(`pageerror: ${String(e).slice(0, 240)}`));

    const response = await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 60000 });

    // Trigger every scroll reveal, then return to the top before capturing.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 400));
    });

    const metrics = await page.evaluate(() => {
      const de = document.documentElement;
      // Any element whose right edge sits past the viewport is an overflow bug.
      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > window.innerWidth + 1.5 || r.left < -1.5) {
          const cs = getComputedStyle(el);
          if (cs.position === "fixed" && cs.visibility === "hidden") continue;
          offenders.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]} right=${Math.round(r.right)} left=${Math.round(r.left)}`);
        }
      }
      return {
        scrollW: de.scrollWidth,
        clientW: de.clientWidth,
        title: document.title,
        h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
        desc: document.querySelector('meta[name="description"]')?.content || null,
        canonical: document.querySelector('link[rel="canonical"]')?.href || null,
        imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => i.alt === null || i.alt === undefined).length,
        offenders: offenders.slice(0, 6),
      };
    });

    const name = (route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "")) + `-${width}`;
    await page.screenshot({ path: join(OUT, `${name}.png`), fullPage: width >= 700 ? false : false });
    await page.screenshot({ path: join(OUT, `${name}-full.png`), fullPage: true });

    report.push({
      route,
      width,
      status: response?.status(),
      overflow: metrics.scrollW > metrics.clientW ? `${metrics.scrollW} > ${metrics.clientW}` : "none",
      offenders: metrics.offenders,
      title: metrics.title,
      h1: metrics.h1,
      descLen: metrics.desc?.length ?? 0,
      canonical: metrics.canonical,
      problems: problems.filter((p) => !p.includes("Download the React DevTools")),
    });
  }
  await page.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 1));
