#!/usr/bin/env node
// 画面の仕上げ確認：HTMLファイルをブラウザで開き、PC幅・スマホ幅のスクリーンショット、
// JavaScriptエラー、横はみ出し、「動きを減らす」設定での挙動をまとめて確認する。
//
// 使い方: node check_page.js <page.html> [--out <dir>] [--widths 1280,375]
// Playwright が見つからない環境では、何もせずに「skipped」と表示して終了する。
const fs = require('fs'), path = require('path'), https = require('https'), { execSync } = require('child_process');

function loadPlaywright() {
  try { return require('playwright'); } catch (e) { }
  try { return require(path.join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'playwright')); } catch (e) { }
  return null;
}
function findChromium() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  if (fs.existsSync(path.join(base, 'chromium'))) {
    const p = path.join(base, 'chromium');
    if (fs.statSync(p).isFile()) return p;
  }
  if (fs.existsSync(base)) for (const d of fs.readdirSync(base).filter(d => /^chromium-\d+/.test(d)).sort().reverse()) {
    for (const c of ['chrome-linux/chrome', 'chrome-linux64/chrome', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium']) {
      const p = path.join(base, d, c); if (fs.existsSync(p)) return p;
    }
  }
  return undefined; // Playwright の既定の場所に任せる
}
function get(url) {
  return new Promise((res, rej) => https.get(url, r => {
    if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return get(r.headers.location).then(res, rej);
    if (r.statusCode !== 200) return rej(new Error(url + ' ' + r.statusCode));
    const b = []; r.on('data', c => b.push(c)); r.on('end', () => res(Buffer.concat(b)));
  }).on('error', rej));
}
// CDN（jsDelivr/cdnjs）が遮断されている環境向けに、npm の配布元から同じファイルを取り出す
const cacheDir = path.join(require('os').tmpdir(), 'check-page-npm-cache');
async function fromNpm(url) {
  let m = url.match(/cdn\.jsdelivr\.net\/npm\/((?:@[^/]+\/)?[^@/]+)@([^/]+)\/(.+)$/), pkg, ver, file;
  if (m) [, pkg, ver, file] = m;
  else if ((m = url.match(/cdnjs\.cloudflare\.com\/ajax\/libs\/([^/]+)\/([^/]+)\/(.+)$/))) { [, pkg, ver, file] = m; file = 'dist/' + file; }
  else return null;
  const dir = path.join(cacheDir, pkg.replace('/', '__') + '@' + ver);
  if (!fs.existsSync(dir)) {
    const meta = JSON.parse(await get(`https://registry.npmjs.org/${pkg}/${ver}`));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dir + '.tgz', await get(meta.dist.tarball));
    execSync(`tar xzf "${dir}.tgz" -C "${dir}"`);
  }
  for (const c of [file, file.replace(/\.min\.js$/, '.js'), file.replace(/^dist\//, '')]) {
    const p = path.join(dir, 'package', c); if (fs.existsSync(p)) return fs.readFileSync(p);
  }
  return null;
}

(async () => {
  const args = process.argv.slice(2);
  const file = args.find(a => !a.startsWith('--') && /\.html?$/i.test(a));
  if (!file) { console.log('使い方: node check_page.js <page.html> [--out <dir>] [--widths 1280,375]'); process.exit(1); }
  const opt = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
  const abs = path.resolve(file);
  const out = path.resolve(opt('--out') || path.join(path.dirname(abs), '_check'));
  const widths = (opt('--widths') || '1280,375').split(',').map(Number);
  const pw = loadPlaywright();
  if (!pw) { console.log(JSON.stringify({ skipped: 'Playwright が見つからないため確認できませんでした' })); return; }
  fs.mkdirSync(out, { recursive: true });
  const browser = await pw.chromium.launch({ executablePath: findChromium() });
  const report = { file: abs, screenshots: [], errors: [], horizontalOverflow: {}, reducedMotion: {} };

  async function open(width, reduced) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    await page.route(/cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com/, async route => {
      try { const r = await route.fetch(); if (r.ok()) return route.fulfill({ response: r }); } catch (e) { }
      try { const body = await fromNpm(route.request().url()); if (body) return route.fulfill({ status: 200, body, contentType: /\.css$/.test(route.request().url()) ? 'text/css' : 'application/javascript' }); } catch (e) { }
      return route.abort();
    });
    await page.goto('file://' + abs, { waitUntil: 'load' });
    return { ctx, page, errs };
  }
  // ゆっくり最後までスクロールして、スクロールで登場する要素を全部表示させる
  const scrollThrough = page => page.evaluate(async () => {
    for (let y = 0; y <= document.documentElement.scrollHeight; y += 300) { scrollTo(0, y); await new Promise(r => setTimeout(r, 350)); }
    scrollTo(0, document.documentElement.scrollHeight); await new Promise(r => setTimeout(r, 1500)); scrollTo(0, 0);
  });

  for (const w of widths) {
    const { ctx, page, errs } = await open(w, false);
    await scrollThrough(page); await page.waitForTimeout(800);
    const shot = path.join(out, `screenshot-${w}.jpg`);
    await page.screenshot({ path: shot, fullPage: true, type: 'jpeg', quality: 75 });
    report.screenshots.push(shot);
    report.horizontalOverflow[w] = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - innerWidth));
    report.errors.push(...errs.map(e => `[${w}px] ${e}`));
    await ctx.close();
  }
  {
    const { ctx, page, errs } = await open(widths[0], true);
    await page.waitForTimeout(500);
    report.reducedMotion.runningAnimations = await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length);
    const shot = path.join(out, 'screenshot-reduced-motion.jpg');
    await page.screenshot({ path: shot, type: 'jpeg', quality: 75 });
    report.screenshots.push(shot);
    report.errors.push(...errs.map(e => `[reduced] ${e}`));
    await ctx.close();
  }
  await browser.close();
  report.summary = [
    report.errors.length ? `JavaScriptエラー ${report.errors.length}件` : 'JavaScriptエラーなし',
    Object.entries(report.horizontalOverflow).map(([w, v]) => v ? `${w}px幅で${v}pxはみ出し` : `${w}px幅ではみ出しなし`).join('、'),
    `動きを減らす設定で動いているアニメーション ${report.reducedMotion.runningAnimations}件`,
  ].join(' / ');
  console.log(JSON.stringify(report, null, 1));
})().catch(e => { console.error('確認に失敗しました: ' + e.message); process.exit(1); });
