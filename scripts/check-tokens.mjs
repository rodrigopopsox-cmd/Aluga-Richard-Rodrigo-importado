// Verifies that design-system/tokens/*.css mirrors the tokens in DESIGN.md (the source of truth).
//
//   colors.<k>        ↔ --<k>         in :root            (`primary` ↔ --brand)
//   colors.<k>-dark   ↔ --<k>         in [data-theme="dark"]
//   rounded.<k>       ↔ --radius-<k>
//   spacing.<n>       ↔ --space-<n>   (numeric keys)   ·   spacing.<k> ↔ --<k>
//   x-effects.<k>     ↔ --<k>
//   typography.*      → fontSize / fontWeight must exist in the --text-* / --weight-* scales
//
// Both directions are checked, so a token added to the CSS but not to DESIGN.md also fails.
// Usage: node scripts/check-tokens.mjs
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

const TOKENS = 'design-system/tokens';
const CSS_ONLY = new Set([
  // Not expressible in the DESIGN.md alpha schema (percentages / composites of other tokens)
  '--radius-round',
  '--hatch',
  '--hatch-gray',
  '--shadow-device',
]);

const errors = [];
const fail = (msg) => errors.push(msg);

// ── DESIGN.md front matter ─────────────────────────────────────────
const md = readFileSync('DESIGN.md', 'utf8');
const fm = md.match(/^---\n([\s\S]*?)\n---\n/);
if (!fm) throw new Error('DESIGN.md has no YAML front matter');
const design = parse(fm[1]);

const resolveRef = (value, seen = new Set()) => {
  const m = typeof value === 'string' && value.match(/^\{([\w-]+)\.([\w-]+)\}$/);
  if (!m) return String(value);
  const key = `${m[1]}.${m[2]}`;
  if (seen.has(key)) throw new Error(`Circular reference ${key}`);
  seen.add(key);
  const target = design[m[1]]?.[m[2]];
  if (target === undefined) throw new Error(`Broken reference {${key}}`);
  return resolveRef(target, seen);
};

// ── CSS custom properties ──────────────────────────────────────────
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const declsIn = (block) => {
  const out = new Map();
  for (const m of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out.set(m[1], m[2].trim());
  return out;
};
const readBlocks = (file) => {
  // Media-query overrides (e.g. prefers-reduced-motion) are runtime adaptations, not token values.
  const css = stripComments(readFileSync(`${TOKENS}/${file}`, 'utf8')).replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '');
  const root = new Map();
  const dark = new Map();
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = m[1].trim();
    const target = selector.includes('data-theme="dark"') ? dark : selector === ':root' ? root : null;
    if (target) for (const [k, v] of declsIn(m[2])) target.set(k, v);
  }
  return { root, dark };
};

const files = ['colors.css', 'typography.css', 'spacing.css', 'radii.css', 'effects.css'];
const css = Object.fromEntries(files.map((f) => [f, readBlocks(f)]));
const rootAll = new Map(files.flatMap((f) => [...css[f].root]));

const resolveVar = (value, scope, seen = new Set()) => {
  const m = value.match(/^var\((--[\w-]+)\)$/);
  if (!m) return value;
  if (seen.has(m[1])) throw new Error(`Circular var ${m[1]}`);
  seen.add(m[1]);
  const next = scope.get(m[1]) ?? rootAll.get(m[1]);
  if (next === undefined) throw new Error(`Undefined ${m[1]}`);
  return resolveVar(next, scope, seen);
};

const norm = (v) =>
  String(v)
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\s*([(),])\s*/g, '$1')
    .replace(/(^|[^\d])0\.(\d)/g, '$10.$2')
    .replace(/^0px$/, '0')
    .trim();

const compare = (label, expected, actual) => {
  if (actual === undefined) return fail(`${label}: missing in CSS (DESIGN.md = ${expected})`);
  if (norm(expected) !== norm(actual)) fail(`${label}: DESIGN.md = ${expected} · CSS = ${actual}`);
};

// ── colors ─────────────────────────────────────────────────────────
const colorsRoot = css['colors.css'].root;
const colorsDark = css['colors.css'].dark;
const seenRoot = new Set();
const seenDark = new Set();
for (const [key, raw] of Object.entries(design.colors ?? {})) {
  const expected = resolveRef(raw);
  if (key === 'primary') {
    compare('colors.primary → --brand', expected, colorsRoot.has('--brand') ? resolveVar(colorsRoot.get('--brand'), colorsRoot) : undefined);
    continue;
  }
  if (key.endsWith('-dark') && colorsDark.has(`--${key.slice(0, -5)}`)) {
    const name = `--${key.slice(0, -5)}`;
    seenDark.add(name);
    compare(`colors.${key} → [data-theme=dark] ${name}`, expected, resolveVar(colorsDark.get(name), colorsDark));
    continue;
  }
  const name = `--${key}`;
  seenRoot.add(name);
  compare(`colors.${key} → ${name}`, expected, colorsRoot.has(name) ? resolveVar(colorsRoot.get(name), colorsRoot) : undefined);
}
for (const name of colorsRoot.keys()) if (!seenRoot.has(name)) fail(`${name} (colors.css) is not declared in DESIGN.md colors`);
for (const name of colorsDark.keys()) if (!seenDark.has(name)) fail(`${name} ([data-theme=dark]) is not declared in DESIGN.md as ${name.slice(2)}-dark`);

// ── rounded ────────────────────────────────────────────────────────
const radii = css['radii.css'].root;
const seenRadii = new Set();
for (const [key, raw] of Object.entries(design.rounded ?? {})) {
  const name = `--radius-${key}`;
  seenRadii.add(name);
  compare(`rounded.${key} → ${name}`, resolveRef(raw), radii.has(name) ? resolveVar(radii.get(name), radii) : undefined);
}
for (const name of radii.keys()) if (!seenRadii.has(name) && !CSS_ONLY.has(name)) fail(`${name} (radii.css) is not declared in DESIGN.md rounded`);

// ── spacing ────────────────────────────────────────────────────────
const spacing = css['spacing.css'].root;
const seenSpacing = new Set();
for (const [key, raw] of Object.entries(design.spacing ?? {})) {
  const name = /^\d/.test(key) ? `--space-${key}` : `--${key}`;
  seenSpacing.add(name);
  compare(`spacing.${key} → ${name}`, resolveRef(raw), spacing.has(name) ? resolveVar(spacing.get(name), spacing) : undefined);
}
for (const name of spacing.keys()) if (!seenSpacing.has(name)) fail(`${name} (spacing.css) is not declared in DESIGN.md spacing`);

// ── x-effects ──────────────────────────────────────────────────────
const effects = css['effects.css'].root;
const seenEffects = new Set();
for (const [key, raw] of Object.entries(design['x-effects'] ?? {})) {
  const name = `--${key}`;
  seenEffects.add(name);
  compare(`x-effects.${key} → ${name}`, String(raw), effects.get(name));
}
for (const name of effects.keys()) if (!seenEffects.has(name) && !CSS_ONLY.has(name)) fail(`${name} (effects.css) is not declared in DESIGN.md x-effects`);

// ── typography ─────────────────────────────────────────────────────
const type = css['typography.css'].root;
const sizes = new Set([...type].filter(([k]) => k.startsWith('--text-')).map(([, v]) => norm(v)));
const weights = new Set([...type].filter(([k]) => k.startsWith('--weight-')).map(([, v]) => norm(v)));
const fontStack = type.get('--font-sans') ?? '';
for (const [key, t] of Object.entries(design.typography ?? {})) {
  if (t.fontSize && !sizes.has(norm(t.fontSize))) fail(`typography.${key}.fontSize ${t.fontSize} is not in the --text-* scale`);
  if (t.fontWeight != null && !weights.has(norm(t.fontWeight))) fail(`typography.${key}.fontWeight ${t.fontWeight} is not in the --weight-* scale`);
  if (t.fontFamily && !fontStack.includes(t.fontFamily)) fail(`typography.${key}.fontFamily "${t.fontFamily}" is not in --font-sans`);
}

// ── report ─────────────────────────────────────────────────────────
if (errors.length) {
  console.error(`✗ tokens:check — ${errors.length} mismatch(es) between DESIGN.md and ${TOKENS}/:\n`);
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}
const count = seenRoot.size + seenDark.size + seenRadii.size + seenSpacing.size + seenEffects.size;
console.log(`✓ tokens:check — ${count} tokens in ${TOKENS}/ match DESIGN.md`);
