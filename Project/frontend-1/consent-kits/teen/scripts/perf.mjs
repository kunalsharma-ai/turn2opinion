// Core Web Vitals for the built page (PERFORMANCE.md).
//   npm run build && npm run preview          # in one terminal
//   npm i -D playwright && node scripts/perf.mjs   # in another  (URL=… to point elsewhere,
//                                                   CHROME=/path/to/chrome to use an installed browser)
// Mobile = Lighthouse's throttling profile (4x CPU, 150 ms RTT, 1.6 Mbps); median of 5 runs.
import { chromium } from 'playwright';
const EXE = process.env.CHROME || undefined;
const runs = [
  ['Mobile, English', 'en', { width: 412, height: 823 }, true],
  ['Mobile, Hindi', 'hi', { width: 412, height: 823 }, true],
  ['Desktop, English', 'en', { width: 1350, height: 940 }, false],
  ['Desktop, Arabic', 'ar', { width: 1350, height: 940 }, false],
];
const b = await chromium.launch(EXE ? { executablePath: EXE } : {});
const out = [];
for (const [label, lang, viewport, mobile] of runs) {
  const vals = [];
  for (let i = 0; i < 5; i++) {
    const ctx = await b.newContext({ viewport });
    const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', mobile
      ? { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 }
      : { offline: false, latency: 40, downloadThroughput: 10 * 1024 * 1024 / 8, uploadThroughput: 10 * 1024 * 1024 / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: mobile ? 4 : 1 });
    let bytes = 0;
    cdp.on('Network.loadingFinished', (e) => { bytes += e.encodedDataLength || 0; });
    await p.addInitScript(() => {
      window.__m = { lcp: 0, tbt: 0, cls: 0 };
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__m.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__m.tbt += Math.max(0, e.duration - 50); }).observe({ type: 'longtask', buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    await p.goto(`${process.env.URL || 'http://localhost:4300'}/?lang=${lang}`, { waitUntil: 'load' });
    await p.waitForTimeout(4000);
    const m = await p.evaluate(() => ({
      fcp: (performance.getEntriesByName('first-contentful-paint')[0] || {}).startTime || 0,
      ...window.__m,
    }));
    vals.push({ ...m, bytes });
    await ctx.close();
  }
  vals.sort((a, c) => a.lcp - c.lcp);
  const med = vals[2];
  out.push(`| ${label} | ${Math.round(med.fcp)} ms | ${med.lcp > 1000 ? (med.lcp / 1000).toFixed(2) + ' s' : Math.round(med.lcp) + ' ms'} | ${Math.round(med.tbt)} ms | ${med.cls.toFixed(3)} | ${Math.round(med.bytes / 1024)} KB |`);
}
console.log('| Run | FCP | LCP | TBT | CLS | Transfer |');
console.log('|---|---|---|---|---|---|');
console.log(out.join('\n'));
await b.close();
