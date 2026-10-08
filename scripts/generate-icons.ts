#!/usr/bin/env node
/**
 * Generates PWA icons from an SVG source.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public", "icons");
mkdirSync(outDir, { recursive: true });

function svg(size: number, { safe = 1 }: { safe?: number } = {}) {
  const r = (size / 2) * safe;
  const cx = size / 2;
  const cy = size / 2;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#F7F2E8"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#E7CD9B"/>
  <circle cx="${cx}" cy="${cy}" r="${r * 0.7}" fill="#ECA84F"/>
  <circle cx="${cx}" cy="${cy}" r="${r * 0.4}" fill="#E86A3C"/>
</svg>`;
}

async function render(name: string, size: number, safe?: number) {
  const buffer = Buffer.from(svg(size, { safe }));
  await sharp(buffer).png().toFile(join(outDir, name));
  console.log(`wrote ${name}`);
}

async function main() {
  await render("icon-192.png", 192, 0.42);
  await render("icon-512.png", 512, 0.42);
  // Maskable: safe zone is the inner ~80% (Android may crop to a circle/squircle)
  await render("icon-512-maskable.png", 512, 0.34);
  // Simple favicon reuse
  writeFileSync(join(here, "..", "public", "favicon.svg"), svg(64, { safe: 0.42 }));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
