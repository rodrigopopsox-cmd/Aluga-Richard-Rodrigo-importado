#!/usr/bin/env node
/**
 * Gera os ícones da marca provisória "Aluga" a partir de um SVG mestre.
 *
 * O monograma é um "A" de traço arredondado sobre o tile laranja da marca
 * (--brand: #C2410C). Geometria desenhada em paths — sem depender de fonte,
 * então o resultado é idêntico em qualquer máquina.
 *
 * Uso: node scripts/build-icons.mjs
 * Saída: design-system/assets/icons/*.svg (mestres) + public/icons/*.png (PWA)
 *        + src/app/icon.svg, src/app/apple-icon.png (convenções do Next).
 */
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = (...p) => join(root, ...p);

// --- marca -----------------------------------------------------------------
const BRAND = '#C2410C'; // --brand (orange-700)
const ON_BRAND = '#FFFFFF'; // --on-brand

/**
 * Monograma "A" — viewBox 512. Traço arredondado, peso proporcional.
 * Ocupa ~67% da altura, centrado, e cabe no safe zone de 80% do maskable.
 */
const monogram = (fill) => `
  <g fill="none" stroke="${fill}" stroke-width="46"
     stroke-linecap="round" stroke-linejoin="round">
    <path d="M256 108 L138 404" />
    <path d="M256 108 L374 404" />
    <path d="M180 292 L332 292" />
  </g>`;

/** Tile com cantos arredondados — ícone "any" (o que o usuário vê na lista de apps). */
const tileIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="${BRAND}" />
  ${monogram(ON_BRAND)}
</svg>`;

/** Fundo full-bleed, marca dentro do safe zone — ícone "maskable" (Android recorta). */
const maskableIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="${BRAND}" />
  <g transform="translate(256 256) scale(0.72) translate(-256 -256)">
    ${monogram(ON_BRAND)}
  </g>
</svg>`;

/** Favicon — viewBox pequeno, traço mais grosso para continuar legível em 16px. */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="${BRAND}" />
  <g fill="none" stroke="${ON_BRAND}" stroke-width="62"
     stroke-linecap="round" stroke-linejoin="round">
    <path d="M256 128 L152 388" />
    <path d="M256 128 L360 388" />
    <path d="M188 276 L324 276" />
  </g>
</svg>`;

const dirs = [
  out('design-system/assets/icons'),
  out('public/icons'),
  out('src/app'),
];
for (const d of dirs) await mkdir(d, { recursive: true });

// --- mestres SVG (fonte da identidade) -------------------------------------
await writeFile(out('design-system/assets/icons/icon.svg'), tileIcon.trim() + '\n');
await writeFile(out('design-system/assets/icons/icon-maskable.svg'), maskableIcon.trim() + '\n');
await writeFile(out('design-system/assets/icons/favicon.svg'), favicon.trim() + '\n');

// --- PNGs do PWA ------------------------------------------------------------
const png = async (svg, size, dest) => {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(dest);
  console.log(`  ${dest.replace(root + '/', '')}  ${size}x${size}`);
};

console.log('gerando PNGs:');
await png(tileIcon, 192, out('public/icons/icon-192.png'));
await png(tileIcon, 512, out('public/icons/icon-512.png'));
await png(maskableIcon, 512, out('public/icons/icon-maskable-512.png'));
// iOS não respeita transparência e aplica o próprio arredondamento: fundo cheio.
await png(maskableIcon, 180, out('src/app/apple-icon.png'));

// --- convenções do Next -----------------------------------------------------
await copyFile(out('design-system/assets/icons/icon.svg'), out('src/app/icon.svg'));
await copyFile(out('design-system/assets/icons/favicon.svg'), out('src/app/favicon.svg'));
console.log('  src/app/icon.svg, src/app/favicon.svg, src/app/apple-icon.png');

console.log('\npronto.');
