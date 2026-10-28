---
version: alpha
name: Aluga
description: >-
  Admin dashboard for managing rental properties (units, tenants, contracts,
  maintenance, finances). Calm, operational, mobile-first without losing desktop
  power. One hot accent — orange — on a cool, near-white world.
colors:
  # ── Primitives ────────────────────────────────────────────
  orange-50: "#FFF2EE"
  orange-100: "#FEE3DA"
  orange-200: "#FBA790"
  orange-400: "#FF6A44"
  orange-500: "#F75831"
  orange-600: "#E04A25"
  orange-700: "#C2410C"
  orange-800: "#9A3412"
  ink-900: "#0B1F27"
  ink-800: "#1B1B1B"
  ink-700: "#313131"
  ink-600: "#4A4B52"
  teal-900: "#1D3C47"
  gray-500: "#878992"
  gray-400: "#A9ABB3"
  gray-300: "#C6C6C8"
  gray-250: "#DCDDE3"
  gray-200: "#E6E8F1"
  gray-150: "#EDEEF4"
  gray-100: "#F4F4F8"
  gray-50: "#F8F8FB"
  mist-200: "#DCE1E6"
  white: "#FFFFFF"
  canvas: "#F0F0F0"
  night-950: "#111214"
  night-900: "#18191C"
  night-850: "#202125"
  night-800: "#2A2B30"
  green-500: "#22B722"
  green-600: "#139C13"
  green-100: "#E3F7E3"
  red-500: "#FF2D2D"
  red-600: "#E5484D"
  red-100: "#FFE5E5"
  amber-500: "#F5A524"
  amber-700: "#9A6500"
  amber-100: "#FFF1D6"
  viz-blue: "#8EA2EE"
  viz-green: "#7FD65A"
  viz-orange: "#F75831"
  viz-lilac: "#DDA3EF"
  heat-1: "#FDE3D2"
  heat-2: "#FBC9A6"
  heat-3: "#F8A97E"
  heat-4: "#F39072"
  heat-5: "#E56F6A"
  heat-6: "#D25964"
  heat-7: "#E8434F"
  white-a08: "rgba(255, 255, 255, 0.08)"
  white-a55: "rgba(255, 255, 255, 0.55)"
  white-a60: "rgba(255, 255, 255, 0.6)"
  white-a70: "rgba(255, 255, 255, 0.7)"
  white-a80: "rgba(255, 255, 255, 0.8)"
  ink-a05: "rgba(11, 31, 39, 0.05)"
  ink-a07: "rgba(11, 31, 39, 0.07)"
  ink-a32: "rgba(11, 31, 39, 0.32)"
  ink-a88: "rgba(27, 27, 27, 0.88)"
  black-a60: "rgba(0, 0, 0, 0.6)"
  orange-a16: "rgba(247, 88, 49, 0.16)"
  orange-a35: "rgba(247, 88, 49, 0.35)"
  orange-800-a40: "rgba(154, 52, 18, 0.4)"
  green-a16: "rgba(34, 183, 34, 0.16)"
  red-a16: "rgba(255, 45, 45, 0.16)"
  amber-a16: "rgba(245, 165, 36, 0.16)"
  # ── Semantic (light theme, default) ──────────────────────
  primary: "{colors.orange-700}"
  brand: "{colors.orange-700}"
  brand-hover: "{colors.orange-800}"
  brand-soft: "{colors.orange-100}"
  brand-soft-fg: "{colors.orange-600}"
  on-brand: "{colors.white}"
  text-strong: "{colors.ink-900}"
  text-body: "{colors.ink-800}"
  text-secondary: "{colors.ink-600}"
  text-muted: "{colors.gray-500}"
  text-subtle: "{colors.gray-400}"
  text-inverse: "{colors.white}"
  text-campaign: "{colors.teal-900}"
  surface-page: "{colors.gray-100}"
  surface-canvas: "{colors.canvas}"
  surface-card: "{colors.white}"
  surface-raised: "{colors.white}"
  surface-subtle: "{colors.gray-50}"
  surface-sunken: "{colors.gray-150}"
  surface-hover: "{colors.gray-200}"
  surface-track: "{colors.gray-100}"
  surface-inverse: "{colors.ink-800}"
  surface-inverse-2: "{colors.ink-700}"
  surface-glass: "{colors.white-a80}"
  surface-glass-ink: "{colors.ink-a88}"
  surface-photo-sky: "{colors.mist-200}"
  on-inverse: "{colors.white}"
  on-inverse-muted: "{colors.white-a60}"
  on-inverse-ghost: "{colors.white-a08}"
  on-photo: "{colors.white-a80}"
  on-glass: "{colors.ink-700}"
  scrim: "{colors.ink-a32}"
  hover-tint: "{colors.ink-a05}"
  border-subtle: "{colors.gray-200}"
  border-default: "{colors.gray-300}"
  border-strong: "{colors.ink-800}"
  control-off: "{colors.gray-300}"
  success: "{colors.green-500}"
  success-soft: "{colors.green-100}"
  success-fg: "{colors.green-600}"
  danger: "{colors.red-500}"
  danger-soft: "{colors.red-100}"
  danger-fg: "{colors.red-600}"
  warning: "{colors.amber-500}"
  warning-soft: "{colors.amber-100}"
  warning-fg: "{colors.amber-700}"
  chart-hatch-bg: "{colors.gray-150}"
  chart-hatch-line: "{colors.gray-250}"
  chart-ink: "{colors.ink-700}"
  hatch-light: "{colors.white-a55}"
  hatch-ink: "{colors.ink-a07}"
  focus-ring: "{colors.orange-800-a40}"
  # ── Dark theme overrides (opt-in via data-theme="dark") ──
  # Same role names with a -dark suffix; roles not listed keep their light value.
  brand-soft-dark: "{colors.orange-a16}"
  brand-soft-fg-dark: "{colors.orange-400}"
  text-strong-dark: "{colors.white}"
  text-body-dark: "{colors.gray-200}"
  text-secondary-dark: "{colors.gray-300}"
  text-muted-dark: "{colors.gray-400}"
  text-subtle-dark: "{colors.gray-500}"
  text-campaign-dark: "{colors.gray-200}"
  surface-page-dark: "{colors.night-950}"
  surface-canvas-dark: "{colors.night-950}"
  surface-card-dark: "{colors.night-900}"
  surface-raised-dark: "{colors.night-800}"
  surface-subtle-dark: "{colors.night-850}"
  surface-sunken-dark: "{colors.night-850}"
  surface-hover-dark: "{colors.night-800}"
  surface-track-dark: "{colors.night-850}"
  surface-inverse-dark: "{colors.ink-700}"
  surface-inverse-2-dark: "{colors.ink-600}"
  surface-glass-dark: "{colors.ink-a88}"
  surface-photo-sky-dark: "{colors.night-850}"
  on-glass-dark: "{colors.white}"
  scrim-dark: "{colors.black-a60}"
  hover-tint-dark: "{colors.white-a08}"
  border-subtle-dark: "{colors.night-800}"
  border-default-dark: "{colors.ink-600}"
  border-strong-dark: "{colors.gray-200}"
  control-off-dark: "{colors.ink-600}"
  success-soft-dark: "{colors.green-a16}"
  success-fg-dark: "{colors.green-500}"
  danger-soft-dark: "{colors.red-a16}"
  danger-fg-dark: "{colors.red-500}"
  warning-soft-dark: "{colors.amber-a16}"
  warning-fg-dark: "{colors.amber-500}"
  chart-hatch-bg-dark: "{colors.night-850}"
  chart-hatch-line-dark: "{colors.night-800}"
  chart-ink-dark: "{colors.gray-200}"
  hatch-ink-dark: "{colors.white-a08}"
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: -0.02em
  campaign-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: -0.01em
  page-title:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.22
    letterSpacing: -0.01em
  metric-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: 300
    lineHeight: 1
    letterSpacing: -0.03em
  metric-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: 300
    lineHeight: 1
    letterSpacing: -0.03em
  metric-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: 300
    lineHeight: 1
    letterSpacing: -0.03em
  metric-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: 300
    lineHeight: 1
    letterSpacing: -0.03em
  card-title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.01em
  card-title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.01em
  card-title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.45
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.45
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.3
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.3
  wordmark-spaced:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.32em
rounded:
  xs: 6px
  badge-sm: 7px
  badge: 9px
  sm: 10px
  md: 14px
  tile: 16px
  lg: 20px
  tile-lg: 22px
  xl: 26px
  2xl: 36px
  pill: 999px
  card: 26px
  panel: 36px
  control: 999px
spacing:
  "0": 0px
  "0-5": 2px
  "1": 4px
  "2": 6px
  "3": 8px
  "3-5": 10px
  "4": 12px
  "4-5": 14px
  "5": 16px
  "5-5": 18px
  "6": 20px
  "7": 24px
  "7-5": 28px
  "8": 32px
  "9": 40px
  "10": 56px
  "11": 72px
  card-padding: 20px
  card-gap: 14px
  page-gutter: 24px
  control-h-xs: 26px
  control-h-sm: 48px
  control-h-md: 48px
  control-h-field: 48px
  control-h-lg: 48px
  rail-w: 72px
  topbar-h: 72px
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.control}"
    padding: 18px
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.brand-hover}"
  button-dark:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-inverse}"
    rounded: "{rounded.control}"
  button-dark-hover:
    backgroundColor: "{colors.surface-inverse-2}"
  button-secondary:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.control}"
  button-secondary-hover:
    backgroundColor: "{colors.surface-hover}"
  button-outline:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.control}"
  button-ghost-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-body}"
  button-sm:
    height: 48px
    padding: 14px
    typography: "{typography.label-md}"
  button-lg:
    height: 48px
    padding: 24px
    typography: "{typography.body-lg}"
  icon-button-soft:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-secondary}"
    size: 48px
    rounded: "{rounded.pill}"
  icon-button-soft-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.text-body}"
  icon-button-dark:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-inverse}"
  icon-button-white:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-secondary}"
  icon-button-inverse:
    backgroundColor: "{colors.on-inverse-ghost}"
    textColor: "{colors.on-inverse}"
  badge-brand:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    rounded: "{rounded.badge}"
    height: 26px
    typography: "{typography.label-md}"
  badge-soft:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand-soft-fg}"
  badge-neutral:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-secondary}"
  badge-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success-fg}"
  badge-danger:
    backgroundColor: "{colors.danger-soft}"
    textColor: "{colors.danger-fg}"
  badge-warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning-fg}"
  badge-sm:
    rounded: "{rounded.badge-sm}"
    height: 22px
    typography: "{typography.label-sm}"
  badge-count:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-brand}"
    rounded: "{rounded.pill}"
    size: 20px
  chip-light:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.pill}"
    height: 28px
    typography: "{typography.label-md}"
  chip-glass:
    backgroundColor: "{colors.surface-glass}"
    textColor: "{colors.on-glass}"
  chip-dark:
    backgroundColor: "{colors.surface-glass-ink}"
    textColor: "{colors.on-inverse}"
  input:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.control}"
    height: 48px
    padding: 16px
    typography: "{typography.body-md}"
  input-white:
    backgroundColor: "{colors.surface-card}"
  input-hover:
    backgroundColor: "{colors.surface-hover}"
  input-focus:
    backgroundColor: "{colors.surface-card}"
  input-error:
    textColor: "{colors.danger-fg}"
  input-label:
    textColor: "{colors.text-muted}"
    typography: "{typography.label-md}"
  select-sm:
    backgroundColor: "{colors.surface-card}"
    height: 30px
    typography: "{typography.label-md}"
  checkbox-checked:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    rounded: "{rounded.xs}"
    size: 20px
  switch-off:
    backgroundColor: "{colors.control-off}"
    width: 40px
    height: 24px
  switch-on:
    backgroundColor: "{colors.brand}"
  segmented-control:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.pill}"
  segmented-control-selected:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-strong}"
  card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.card}"
    padding: 20px
  card-dark:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-inverse}"
  card-sunken:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.text-body}"
  card-brand:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
  card-title:
    textColor: "{colors.text-strong}"
    typography: "{typography.card-title-md}"
  card-subtitle:
    textColor: "{colors.text-muted}"
    typography: "{typography.card-title-md}"
  metric:
    textColor: "{colors.text-strong}"
    typography: "{typography.metric-lg}"
  progress-pill-track:
    backgroundColor: "{colors.surface-track}"
    rounded: "{rounded.pill}"
    height: 34px
  progress-pill-brand:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
  progress-pill-light:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-secondary}"
  chart-tooltip:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-inverse}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  data-table-header:
    textColor: "{colors.text-muted}"
    typography: "{typography.label-md}"
  data-table-row-hover:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.text-body}"
  nav-pills:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.pill}"
    height: 48px
  nav-pills-selected:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
  side-rail-item:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-secondary}"
    size: 48px
  side-rail-item-selected:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
  dialog:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.panel}"
    padding: 28px
  dialog-scrim:
    backgroundColor: "{colors.scrim}"
  toast:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-strong}"
    rounded: "{rounded.lg}"
  tooltip:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-inverse}"
    rounded: "{rounded.pill}"
    typography: "{typography.label-md}"
  focus-ring:
    backgroundColor: "{colors.focus-ring}"
x-effects:
  # Not part of the DESIGN.md alpha schema (no elevation/motion groups yet); mirrored in
  # design-system/tokens/effects.css and checked by `npm run tokens:check`.
  shadow-none: "none"
  shadow-xs: "0 1px 2px rgba(11, 31, 39, 0.04)"
  shadow-card: "0 1px 2px rgba(11, 31, 39, 0.03), 0 8px 24px -12px rgba(11, 31, 39, 0.08)"
  shadow-pop: "0 12px 40px -8px rgba(11, 31, 39, 0.18), 0 2px 6px rgba(11, 31, 39, 0.06)"
  shadow-brand: "0 8px 20px -8px rgba(247, 88, 49, 0.55)"
  shadow-knob: "0 1px 3px rgba(0, 0, 0, 0.15)"
  blur-glass: "saturate(140%) blur(16px)"
  blur-scrim: "blur(6px)"
  ease-out: "cubic-bezier(0.22, 1, 0.36, 1)"
  ease-in-out: "cubic-bezier(0.65, 0, 0.35, 1)"
  dur-fast: "120ms"
  dur-base: "200ms"
  dur-slow: "360ms"
  press-scale: "0.97"
  press-scale-round: "0.94"
---

# Aluga — Design System

> **Contract.** This file is the visual contract and the source of truth for every
> design token. The CSS in `design-system/tokens/` mirrors it and `npm run tokens:check`
> fails when they drift. Change a value here first, then in the CSS.
> Components live in `design-system/` — see `design-system/README.md`.

## Overview

Aluga is an admin dashboard for people who manage rental properties — units, tenants,
contracts, maintenance and finances — and it must be fully usable on a phone without
losing desktop power features. The personality is **calm, confident and operational**:
the product promises *clarity* and *control* ("Imóveis sob controle.", "Tudo em um só lugar.").

The look is a cool, near-white world with **one hot accent** (orange `#F75831`), generous
rounding, flat hairline cards and light-weight numbers that lead every KPI. The visual
reference was a Behance case study of VANTA (a real-estate SaaS by Vinarskyi Oleksandr);
its logo is **not** used. Aluga has no logo yet — the name is set in type (`Wordmark`).

UI copy is **Portuguese (pt-BR)**, currency BRL (`R$ 3.200`), dates `dd/mm`.

## Content & Voice

- **Person:** speak to the manager as **você**; the system rarely talks about itself ("sistema analisando").
- **Casing:** sentence case in UI ("Adicionar tarefa", "Saiba mais"). Campaign lines may be ALL CAPS mixing Light + Medium ("MAIS QUE UM **IMÓVEL**.").
- **Two-line labels:** card titles split into an ink line + muted line — "Total de / Unidades", "Visitas / Hoje", "Próximo / vencimento".
- **Headline device:** the key word + period in orange — "Decisões mais **claras.**". The period is part of the brand (`ALUGA.`).
- **Numbers lead:** "78% Ocupação", "R$ 124K Receita mensal", "+12 esta semana".
- **Brevity:** descriptions are one sentence, ≤ 20 words, muted gray. No exclamation marks. **No emoji** in UI.

## Colors

One hot accent on cool neutrals. Use **semantic** tokens (`brand`, `surface-*`, `text-*`,
`border-*`, `success|danger|warning-*`) in code; primitives (`orange-500`, `gray-200`…)
exist only to define them.

- **Brand orange — two tones:** `#C2410C` (`brand`) is the accessible action/text tone — it clears WCAG AA 4.5:1 against white, so it drives the active nav item and the one primary action per view (hover `#9A3412`). The brighter `#F75831` stays as the accent for highlighted data (one series/bar), urgent states and the brand period, where contrast on white is not required.
- **Ink (#1B1B1B / headline #0B1F27):** dark focal cards ("Próximo vencimento"), dark pills, tooltips, body text.
- **Cool grays (#E6E8F1 · #C6C6C8 · #878992 · #313131):** hairlines, muted text, sunken fills. Page `#F4F4F8`, cards white.
- **Semantic:** green `#22B722` only for positive deltas/paid; red for counters/overdue; amber for "a vencer".
- **Data viz:** blue `#8EA2EE`, green `#7FD65A`, orange `#F75831`, lilac `#DDA3EF` for categories; peach→red `heat-1…7` for intensity.

### Dark theme

The reference was light-only. A dark theme was **authored for this project** and is
**opt-in** (`<html data-theme="dark">`); light stays the default. Tokens ending in `-dark`
are the dark values of the role with the same name. Orange stays the single accent;
surfaces move to `night-*` neutrals and "inverse" surfaces lift to `ink-700`.
Treat it as a proposal to validate with real screens before shipping it to users.

## Typography

**Plus Jakarta Sans** throughout (self-hosted via `next/font`). No serif, no mono.

- **Light 300** for big metrics, **Regular 400** for titles and body, **Medium 500** for emphasis and the spaced wordmark. SemiBold/Bold are rare.
- Tight negative tracking on large sizes (`-0.02em` display, `-0.03em` metrics).
- Card titles: 18px Regular, two lines (ink + muted).
- Metrics: dim the decimals (`R$ 23680<span style="opacity:.55">.00</span>`).
- Base size is **16px** for body and labels; the scale is 11 · 12 · 13 · 16 · 18 · 22 · 28 · 36 · 48 · 64 · 72 · 96 (`--text-2xs` … `--text-display`).

## Layout

Compact-but-airy dashboards: **20px** card padding, **14px** grid gaps, **24px** page gutter. Interactive controls (buttons, fields, nav) keep a minimum **48px** touch target for accessibility.

**Modo Acessibilidade (opt-in).** A camada `design-system/tokens/a11y.css` amplia a tipografia (base **18px**) e eleva os alvos de toque para **56px**. É ativada por `<html data-a11y="on">` — pelo menu de configurações (engrenagem) no topo do painel, ou `?a11y=on`. É uma adaptação de runtime, fora do espelho de tokens que o `tokens:check` valida; com o modo desligado, o design acima vale integralmente.
Spacing scale 0 · 2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 24 · 28 · 32 · 40 · 56 · 72
(`--space-0` … `--space-11`; `-5` names are half-steps such as `--space-4-5` = 14px).

| Breakpoint | Width | Grid | Navigation |
|---|---|---|---|
| Mobile | < 760px | 2 cols for KPI tiles, then full width | Header with icon buttons + floating white bottom pill bar (only the active item shows its label) |
| Tablet | 760–1179px | 2 cols | Left icon rail + top bar |
| Desktop | ≥ 1180px | 4 cols | Sticky left icon rail + top bar (nav pills, search with ⌘K, chat/bell, avatar) |

## Elevation & Depth

Almost flat. Depth comes from **tonal layers** (gray page → white cards with a 1px
`border-subtle` hairline), not shadows. Cards have **no drop shadow at rest**.

- `shadow-pop` — dialogs, toasts and the floating mobile bar only.
- `shadow-brand` (orange glow) — only under the active nav pill / rail item.
- Transparency: frosted white chips over photos (`backdrop-filter: blur(16px)`) and a blurred scrim behind dialogs. Nothing else is translucent.
- Motion: short and quiet — 120–360ms, `cubic-bezier(.22,1,.36,1)`. Press = `scale(.97)` buttons / `.94` circles. No bounces, no parallax.

Exact values live in the `x-effects` group above (the alpha spec has no elevation/motion group yet).

## Shapes

Generous rounding: cards **26px**, panels/dialogs **36px**, inner tiles **16–22px**, badges
**9px** (7px small), and everything interactive is a full **pill** or circle. Never mix
sharp corners in; never use a colored left-border accent on cards.

**Signature motifs:** diagonal white hatch over bar fills; gray hatched rounded columns behind
line charts; a row of light-gray "×" marks under KPI values; dark ink value-pill tooltips with
dimmed decimals; a circular "expand ↗" button top-right of cards.

## Components

The library lives in `design-system/components` (React + TypeScript + CSS Modules) and is
imported from `@design-system`. Tokens above give the canonical look for each atom; states:

- **Button** — `primary · dark · secondary · outline · ghost`; sizes sm 48 / md 48 / lg 48; states hover, active (scale .97), focus (3px orange ring at 40%), disabled (45% opacity), loading (spinner, `aria-busy`).
- **IconButton** — `soft · dark · brand · white · ghost · inverse`; optional orange unread dot.
- **Badge** — softly rounded (not pill) status label; `count` renders the red notification bubble.
- **Chip** — tiny secondary pill link inside cards; `glass` over photos.
- **Input / Select** — pill fields, `soft` (gray) or `white` (hairline); states hover, focus (orange ring), error (red ring + message), disabled.
- **Checkbox / Switch** — orange when on; visible focus ring.
- **SegmentedControl / NavPills / SideRail** — gray track, active item white (segments) or solid orange (navigation).
- **Card / CardHeader / StatCard / Metric** — white hairline surfaces with the two-line title; `dark` and `brand` tones for focal tiles; `selected` outlines in orange.
- **ProgressPill, BarChart + Legend, LineChart, HeatScale, DataTable** — data display; DataTable has an empty state.
- **Dialog, Toast, Tooltip** — feedback; dialog 36px radius over a blurred ink scrim.

Iconography: thin (1.5px) rounded line icons — **Lucide** via the `Icon` component (registry in
`design-system/components/core/icons.ts`). Icons sit inside 48px circles or lead a pill label, at
≈45% of the circle. No emoji, no unicode glyphs as icons.

## Do's and Don'ts

- Do use orange for **one** primary action per view; use the `dark` pill for in-card actions.
- Do split card titles into ink + muted lines and lead KPIs with the number.
- Do take every color, font, spacing and radius from a token (`var(--…)`); never hardcode hex, px spacing/radius or a font family in app code.
- Do keep cards flat (hairline, no shadow); reserve `shadow-pop` for floating layers.
- Don't add a second accent color, gradients (except chart fades and photo protection) or emoji.
- Don't draw a logo — use `Wordmark` until a real mark exists.
- Don't use green except for positive values, or red except for overdue/alerts.
- Accessibility: the action orange `#C2410C` clears WCAG AA 4.5:1 with white text; body and label text use a 16px base and interactive controls meet a 48px touch target.
