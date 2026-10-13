// Renderiza cada placa de slides.html a PNG 1080x1350 y arma el video MP4.
// Uso: node propuesta/render.mjs  (con un server estático sirviendo la raíz del repo en :8765)
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const base = process.env.BASE || 'http://localhost:8765';
const outDir = new URL('./png/', import.meta.url).pathname;
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const page = await browser.newPage({ viewport: { width: 1180, height: 1400 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('requestfailed', (r) => errors.push('failed: ' + r.url()));
await page.goto(`${base}/propuesta/slides.html`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const ids = await page.$$eval('section.slide', (els) => els.map((e) => e.id));
for (const [i, id] of ids.entries()) {
  const file = `${outDir}${String(i + 1).padStart(2, '0')}.png`;
  await page.locator('#' + id).screenshot({ path: file });
  console.log('ok', file);
}
await browser.close();
if (errors.length) console.log('errors:', errors);

if (process.argv.includes('--video')) {
  // 4,2 s por placa con fundido de 0,6 s entre placas.
  const n = ids.length, dur = 4.2, fade = 0.6;
  const inputs = [];
  for (let i = 1; i <= n; i++) inputs.push('-loop', '1', '-t', String(dur), '-i', `${outDir}${String(i).padStart(2, '0')}.png`);
  let filter = '', prev = '0:v';
  for (let i = 1; i < n; i++) {
    const offset = (dur - fade) * i;
    const label = i === n - 1 ? 'out' : `x${i}`;
    filter += `[${prev}][${i}:v]xfade=transition=fade:duration=${fade}:offset=${offset.toFixed(2)}[${label}];`;
    prev = label;
  }
  filter += '[out]format=yuv420p[v]';
  const mp4 = new URL('./albys-propuesta.mp4', import.meta.url).pathname;
  execFileSync('ffmpeg', ['-y', ...inputs, '-filter_complex', filter, '-map', '[v]', '-r', '30', '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-movflags', '+faststart', mp4], { stdio: 'inherit' });
  console.log('video', mp4);
}
