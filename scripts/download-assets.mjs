import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = resolve(ROOT, "public/images");
const SEO = resolve(ROOT, "public/seo");

// Wix media base — use ~mv2 path with reasonable fill params for quality
const wix = (id, w, h, ext) =>
  `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fill/w_${w},h_${h},al_c,q_90,enc_avif,quality_auto/${id}~mv2.${ext}`;

const assets = [
  ["logo.png",            wix("a14f67_8ed9060863cb470e8a06f7bb46e12047", 260, 140, "png")],
  ["arrow-left.png",      wix("a14f67_32c71590c99c46f5a55d8eb9c7830384", 86, 80, "png")],
  ["arrow-right.png",     wix("a14f67_eae96fd75fad4aa6a20dc78037e1adce", 86, 80, "png")],
  ["icon-line.png",       wix("a14f67_6671f6489b13475093b4c9850502bd2e", 90, 90, "png")],
  ["icon-ig.png",         wix("a14f67_182daa45edbc49759fd21244a154553b", 90, 90, "png")],
  ["slide-alien.jpg",     wix("a14f67_bff20301bd8041379039e357d1d2c12a", 1118, 820, "jpg")],
  ["logo-familymart.png", wix("a14f67_944252302d644e108703f2211f2a4324", 272, 272, "png")],
  ["logo-711.png",        wix("a14f67_6d5cec001f2048dda39bd2843a651c2a", 272, 272, "png")],
  ["qr-line.png",         wix("a14f67_8131141520144ffb74ee2635de3f86d", 272, 272, "png")],
  ["bg-texture.jpg",      wix("a14f67_c15a202349934206b711626cbc65dd27", 1920, 1280, "jpg")],
];

const seo = [
  ["favicon.png", `https://static.wixstatic.com/media/a14f67_069f2c8aee3b40bb8f211113fb4b192e~mv2.png/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/a14f67_069f2c8aee3b40bb8f211113fb4b192e~mv2.png`],
];

async function fetchTo(url, dest) {
  await mkdir(dirname(dest), { recursive: true });
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`✓ ${dest.replace(ROOT, "")}  (${buf.length} bytes)`);
}

async function run(list, base) {
  const batch = 4;
  for (let i = 0; i < list.length; i += batch) {
    await Promise.all(
      list.slice(i, i + batch).map(([name, url]) =>
        fetchTo(url, resolve(base, name)).catch((e) => console.error(`✗ ${name}: ${e.message}`))
      ),
    );
  }
}

await run(assets, OUT);
await run(seo, SEO);
console.log("done");
