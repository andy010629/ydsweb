import { mkdir, writeFile, readdir, readFile, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const PRODUCTS_DIR = resolve(ROOT, "docs/research/products");
const OUT = resolve(ROOT, "public/images/products");

const wixUrl = (filename) =>
  `https://static.wixstatic.com/media/${filename}/v1/fill/w_800,h_800,al_c,q_90,enc_avif,quality_auto/${filename}`;

async function exists(p) { try { await access(p); return true; } catch { return false; } }

async function fetchTo(url, dest) {
  if (await exists(dest)) return null; // skip already-downloaded
  await mkdir(dirname(dest), { recursive: true });
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

const files = await readdir(PRODUCTS_DIR);
const seen = new Set();
const queue = [];
for (const f of files) {
  if (!f.endsWith(".json")) continue;
  const data = JSON.parse(await readFile(resolve(PRODUCTS_DIR, f), "utf8"));
  for (const p of data.products) {
    const all = [p.img, ...(p.gallery || [])].filter(Boolean);
    for (const img of all) {
      if (seen.has(img)) continue;
      seen.add(img);
      queue.push([img, wixUrl(img)]);
    }
  }
}

console.log(`${queue.length} unique images, downloading missing ones...`);
let downloaded = 0, skipped = 0, failed = 0;
const batch = 8;
for (let i = 0; i < queue.length; i += batch) {
  await Promise.all(queue.slice(i, i + batch).map(async ([name, url]) => {
    try {
      const sz = await fetchTo(url, resolve(OUT, name));
      if (sz === null) { skipped++; }
      else { downloaded++; if (downloaded % 10 === 0) console.log(`  ${downloaded} downloaded...`); }
    } catch (e) { failed++; console.error(`  ✗ ${name}: ${e.message}`); }
  }));
}
console.log(`done. downloaded=${downloaded} skipped=${skipped} failed=${failed}`);
