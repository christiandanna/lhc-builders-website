/**
 * ---------------------------------------------------------------------------
 * BRAND ASSET BUILD
 * ---------------------------------------------------------------------------
 * Takes LHC Builders' own logo artwork and produces the variants the site
 * needs. The source is the real logo from the previous site — nothing here
 * redraws or reinterprets it.
 *
 *   node scripts/build-brand-assets.mjs
 *
 * Outputs:
 *   public/images/branding/lhc-logo.png        colour, transparent background
 *   public/images/branding/lhc-logo-light.png  knocked out to warm white
 *   public/icon.png / apple-icon.png           favicons, teal on charcoal
 *   public/og-image.jpg                        social card
 *
 * The white background of the source JPEG is made transparent by alpha, so the
 * mark sits correctly on both the warm-white page and the charcoal footer.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUB = join(ROOT, "public");
const BRANDING = join(PUB, "images", "branding");

const LOGO_SRC =
  "https://images.squarespace-cdn.com/content/v1/69cd7819335a0d085282aba0/5e9ddd7a-47b8-41f9-8d95-1bf663deb2c7/LHC+LOGO4.jpg?format=1500w";

/** Sampled from the real logo artwork. */
const TEAL = { r: 0x58, g: 0xb8, b: 0xb8 };
const INK = "#1b1d1e";
const LINEN = "#f7f5f1";

/**
 * Turns the white paper of the source JPEG into transparency.
 *
 * Alpha comes from ink coverage (how far the darkest channel is from white)
 * rather than luminance. Luminance would make the mid-tone teal translucent,
 * which washed the mark out on dark backgrounds. The gain pushes genuinely
 * inked pixels to fully opaque while leaving the artwork's anti-aliased edges
 * partially transparent.
 */
const ALPHA_GAIN = 2.1;

async function knockOutWhite(buffer, recolour) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const coverage = 1 - Math.min(r, g, b) / 255;
    const alpha = Math.round(Math.min(1, coverage * ALPHA_GAIN) * 255);

    if (recolour) {
      out[i] = recolour.r;
      out[i + 1] = recolour.g;
      out[i + 2] = recolour.b;
    } else {
      out[i] = r;
      out[i + 1] = g;
      out[i + 2] = b;
    }
    out[i + 3] = alpha;
  }

  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
}

async function main() {
  await mkdir(BRANDING, { recursive: true });

  const response = await fetch(LOGO_SRC, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
  });
  if (!response.ok) throw new Error(`Logo fetch failed: ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());

  // Keep an untouched copy of what was downloaded, for the handoff.
  await writeFile(join(BRANDING, "lhc-logo-original.jpg"), await sharp(source).jpeg({ quality: 92 }).toBuffer());

  const colour = await knockOutWhite(source, null);
  await writeFile(join(BRANDING, "lhc-logo.png"), colour);

  // Knocked out to warm white, for the charcoal footer and the hero overlay.
  const light = await knockOutWhite(source, { r: 0xf7, g: 0xf5, b: 0xf1 });
  await writeFile(join(BRANDING, "lhc-logo-light.png"), light);

  // --- Compact lockup for the navbar --------------------------------------
  // The full artwork is a three-line stack; at navbar height the third line
  // ("RESIDENTIAL CONTRACTORS") is a few pixels tall and turns to mush. The
  // navbar therefore uses the gable + LHC + BUILDERS only. The full lockup
  // still appears in the footer, where it has the room.
  const fullMeta = await sharp(source).metadata();
  const compactH = Math.round(fullMeta.height * 0.82);
  const compactSrc = await sharp(source)
    .extract({ left: 0, top: 0, width: fullMeta.width, height: compactH })
    .toBuffer();

  await writeFile(
    join(BRANDING, "lhc-logo-compact.png"),
    await sharp(await knockOutWhite(compactSrc, null)).trim().png().toBuffer(),
  );
  await writeFile(
    join(BRANDING, "lhc-logo-compact-light.png"),
    await sharp(await knockOutWhite(compactSrc, { r: 0xf7, g: 0xf5, b: 0xf1 }))
      .trim()
      .png()
      .toBuffer(),
  );

  // --- Favicon: the gable and the LHC letters only, on charcoal -----------
  // Crop the top portion of the artwork (roofline + LHC) and pad it square.
  const meta = await sharp(source).metadata();
  const cropH = Math.round(meta.height * 0.52);
  const letters = await sharp(source)
    .extract({ left: 0, top: 0, width: meta.width, height: cropH })
    .toBuffer();
  const lettersKnocked = await knockOutWhite(letters, TEAL);
  const lettersFitted = await sharp(lettersKnocked)
    .trim()
    .resize({ width: 360, fit: "inside" })
    .toBuffer();

  for (const [name, size] of [["icon.png", 512], ["apple-icon.png", 180]]) {
    const inner = await sharp(lettersFitted)
      .resize({ width: Math.round(size * 0.72), fit: "inside" })
      .toBuffer();
    await sharp({
      create: { width: size, height: size, channels: 4, background: INK },
    })
      .composite([{ input: inner, gravity: "center" }])
      .png()
      .toFile(join(PUB, name));
  }

  // --- Social card: a real project photo, darkened, with the logo ---------
  const photo = join(PUB, "images", "projects", "312-sena", "01-exterior.jpg");
  const W = 1200;
  const H = 630;

  const base = await sharp(photo)
    .resize(W, H, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.52 })
    .blur(0.4)
    .toBuffer();

  const scrim = Buffer.from(
    `<svg width="${W}" height="${H}">
       <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0" stop-color="#101112" stop-opacity="0.42"/>
         <stop offset="1" stop-color="#101112" stop-opacity="0.78"/>
       </linearGradient></defs>
       <rect width="${W}" height="${H}" fill="url(#g)"/>
       <text x="80" y="520" font-family="Helvetica,Arial,sans-serif" font-size="21"
             letter-spacing="4.6" font-weight="600" fill="${LINEN}" fill-opacity="0.8">
         CUSTOM HOMES &#183; OLD METAIRIE &#183; NEW ORLEANS
       </text>
       <rect x="80" y="548" width="92" height="4" fill="#58b8b8"/>
     </svg>`,
  );

  const logoOnCard = await sharp(light).resize({ width: 420, fit: "inside" }).toBuffer();

  await sharp(base)
    .composite([
      { input: scrim, top: 0, left: 0 },
      { input: logoOnCard, top: 150, left: 80 },
    ])
    .jpeg({ quality: 88, progressive: true })
    .toFile(join(PUB, "og-image.jpg"));

  console.log("Brand assets written to /public.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
