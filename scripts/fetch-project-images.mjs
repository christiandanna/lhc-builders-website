/**
 * ---------------------------------------------------------------------------
 * PROJECT PHOTOGRAPHY IMPORT
 * ---------------------------------------------------------------------------
 * One-off import of LHC Builders' own project photography from the previous
 * Squarespace site into this repository, so the production site does not depend
 * on a third-party CDN that can disappear when that site is taken down.
 *
 *   node scripts/fetch-project-images.mjs
 *
 * Images are requested from the CDN at the largest size that does not upscale
 * the original, then resized to a sensible web maximum and re-encoded as
 * progressive JPEG. Next.js serves AVIF/WebP variants from these at runtime.
 *
 * This script is kept for provenance — it documents exactly where each file
 * came from. It does not need to run again unless new photography is added.
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images", "projects");
const MANIFEST = join(ROOT, "scripts", "project-images.json");

/** Squarespace only serves these widths. */
const STEPS = [100, 300, 500, 750, 1000, 1500, 2500];
/** Hard ceiling for what we store. Beyond this is wasted bytes for a web page. */
const MAX_WIDTH = 2400;

function bestStep(originalWidth) {
  const target = Math.min(originalWidth || MAX_WIDTH, MAX_WIDTH);
  return STEPS.find((step) => step >= target) ?? 2500;
}

async function download(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
  });
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  let written = 0;
  let bytes = 0;

  for (const [slug, images] of Object.entries(manifest)) {
    const dir = join(OUT, slug);
    await mkdir(dir, { recursive: true });

    for (const image of images) {
      const url = `${image.url}?format=${bestStep(image.w)}w`;
      const buffer = await download(url);

      const pipeline = sharp(buffer).rotate();
      const meta = await pipeline.metadata();
      const resized =
        meta.width && meta.width > MAX_WIDTH
          ? pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
          : pipeline;

      const output = await resized
        .jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toBuffer();

      const target = join(dir, image.file);
      await writeFile(target, output);
      written += 1;
      bytes += output.length;
      console.log(
        `${slug}/${image.file}  ${meta.width}x${meta.height}  ${(output.length / 1024).toFixed(0)} KB`,
      );
    }
  }

  console.log(`\n${written} images, ${(bytes / 1024 / 1024).toFixed(1)} MB total.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
