// Fetch each product's Wix detail page, extract description / gallery images,
// then write enriched JSON back to docs/research/products/.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DIR = resolve(ROOT, "docs/research/products");

const CATEGORY_TO_PATH = {
  starterkit: "starterkit",
  prokit: "prokit",
  disposable: "disposable",
  "disposable/kit": "disposable/kit",
  "e-juice": "e-juice",
  "e-liquid": "e-liquid",
  "e-cigarette": "e-cigarette",
};

const EXCLUDE_IMG_IDS = new Set([
  "a14f67_c15a202349934206b711626cbc65dd27", // bg-texture
  "a14f67_8ed9060863cb470e8a06f7bb46e12047", // logo
  "a14f67_32c71590c99c46f5a55d8eb9c7830384", // arrow
  "a14f67_eae96fd75fad4aa6a20dc78037e1adce", // arrow
  "a14f67_6671f6489b13475093b4c9850502bd2e", // line icon
  "a14f67_182daa45edbc49759fd21244a154553b", // ig icon
  "a14f67_944252302d644e108703f2211f2a4324", // familymart
  "a14f67_6d5cec001f2048dda39bd2843a651c2a", // 7-eleven
  "a14f67_069f2c8aee3b40bb8f211113fb4b192e", // favicon
  "a14f67_68131141520144ffb74ee2635de3f86d", // qr line
  "a14f67_bff20301bd8041379039e357d1d2c12a", // slide-alien
  "a14f67_bcc5acc4e64f4c72a71e26615405560b", // line cta button icon (appears on every detail page)
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
          "accept-language": "zh-TW,zh;q=0.9,en;q=0.8",
        },
      });
      if (!res.ok) throw new Error(`${res.status}`);
      return await res.text();
    } catch (e) {
      if (i === retries) throw e;
      await sleep(1500);
    }
  }
}

function extractDescription(html) {
  // Find <div ... data-id="content-viewer"> ... and walk forward until matching </div>
  const startMatch = html.match(/<div[^>]*data-id="content-viewer"[^>]*>/);
  if (!startMatch) return null;
  const startIdx = startMatch.index + startMatch[0].length;
  // Walk balanced divs
  let depth = 1;
  let i = startIdx;
  const re = /<\/?div\b[^>]*>/g;
  re.lastIndex = startIdx;
  let m;
  while ((m = re.exec(html))) {
    if (m[0].startsWith("</")) depth--;
    else depth++;
    if (depth === 0) {
      i = m.index;
      break;
    }
  }
  const inner = html.slice(startIdx, i);
  // Convert to text: <br/> and <p>/<div> close → newline, strip rest of tags
  const text = inner
    .replace(/<br[^>]*>/gi, "\n")
    .replace(/<\/(?:p|div|li|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return text || null;
}

function extractGallery(html) {
  const idRegex = /a14f67_[a-f0-9]+~mv2\.(?:jpg|jpeg|png|gif|webp)/gi;
  return [...new Set(html.match(idRegex) || [])].filter((m) => {
    const id = m.split("~")[0];
    return !EXCLUDE_IMG_IDS.has(id);
  });
}

async function run() {
  const files = await readdir(DIR);
  let total = 0;
  for (const f of files) {
    if (!f.endsWith(".json")) continue;
    const path = resolve(DIR, f);
    const data = JSON.parse(await readFile(path, "utf8"));
    const catPath = CATEGORY_TO_PATH[data.slug];
    if (!catPath) continue;
    console.log(`\n=== ${data.title} (${data.products.length}) ===`);
    const enriched = [];
    for (const p of data.products) {
      total++;
      const slug = p.wixSlug || p.slug;
      const url = `https://www.bababoitw8.com/${catPath}/info/${encodeURIComponent(slug)}`;
      try {
        const html = await fetchHtml(url);
        const description = extractDescription(html);
        const gallery = extractGallery(html);
        enriched.push({ ...p, description, gallery });
        console.log(
          `  ✓ ${p.t1}  (desc=${description?.length || 0}ch, gallery=${gallery.length})`,
        );
      } catch (e) {
        console.error(`  ✗ ${p.t1}: ${e.message}`);
        enriched.push(p);
      }
      await sleep(250);
    }
    data.products = enriched;
    await writeFile(path, JSON.stringify(data, null, 2));
  }
  console.log(`\nDone: ${total} products processed.`);
}

await run();
