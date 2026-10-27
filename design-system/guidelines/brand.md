<!--
Origem: `readme.md` do export do Claude Design (23/10/2026), preservado na íntegra abaixo da linha.
Os valores normativos (tokens) agora vivem em DESIGN.md; este texto continua valendo como guideline completo.
Onde está agora cada item citado no "Index" original:
  styles.css + tokens/        → design-system/tokens/ (index.css agrega; reference/styles.css para HTML avulso)
  components/ (.jsx/.d.ts)    → design-system/components/ (.tsx + .module.css, tipos nas próprias Props)
  components/*.prompt.md      → design-system/guidelines/components.md
  components/*.card.html      → design-system/reference/components/
  ui_kits/admin/              → design-system/templates/admin/ (TSX, rota /design-system/admin) e design-system/reference/ui_kits/admin/ (HTML original)
  guidelines/*.html           → design-system/reference/guidelines/
  assets/images/              → design-system/assets/images/
  thumbnail.html              → design-system/reference/thumbnail.html
  SKILL.md                    → .claude/skills/aluga-design/SKILL.md
  uploads/vanta-*.png         → não migrados (screenshots de terceiros, artefato da ferramenta)
Nota de ícones: o Icon agora usa o pacote lucide-react (registro em components/core/icons.ts), não mais o UMD 0.460 do unpkg.
-->

# Aluga Design System

Design system for **Aluga** (Rodrigo / Richard) — an admin dashboard for managing rental properties: units, tenants, contracts, maintenance and finances. The dashboard must be fully usable on mobile without losing desktop power features.

## Sources
- 14 screenshots uploaded to `uploads/vanta-01.png … vanta-14.png`. They are a Behance-style case study of **VANTA**, a real-estate management SaaS (designer credit: Vinarskyi Oleksandr), used here as the **visual reference** for Aluga. They include: brand sheet (Plus Jakarta Sans; #F75831, #1B1B1B, #E6E8F1, #C6C6C8, #878992, #313131), desktop dashboard and analytics screens, mobile home/analytics screens, user flow, customer journey and campaign mock-ups.
- No codebase, Figma file, or logo for Aluga was provided. All values were measured from the screenshots.
- VANTA's own logo/mark is **not** used. Aluga has no logo yet → the name is set in type (`Wordmark`).

Product language: UI copy is **Portuguese (pt-BR)**, currency BRL (`R$ 3.200`), dates `dd/mm`.

## Index
- `styles.css` — global entry (imports only) → `tokens/` (`colors`, `typography`, `spacing`, `radii`, `effects`, `fonts`, `base`)
- `components/` — React primitives (`core/`, `forms/`, `data/`, `navigation/`, `feedback/`), each with `.jsx`, `.d.ts`, `.prompt.md` and one `*.card.html`
- `ui_kits/admin/` — click-through admin dashboard (`index.html` responsive; `mobile.html` in a 390px phone frame)
- `guidelines/` — foundation specimen cards (colors, type, spacing, brand)
- `assets/images/` — architecture photos cropped from the reference (`building-brick.png`, `house-orange.png`, `building-glass.png`)
- `thumbnail.html`, `SKILL.md`

## Components
- **core**: Icon, Button, IconButton, Badge, Chip, Avatar, AvatarGroup, Wordmark
- **forms**: Input, Select, Checkbox, Switch, SegmentedControl
- **data**: Card, CardHeader, Metric, StatCard, ProgressPill, BarChart, Legend, LineChart, HeatScale, DataTable
- **navigation**: NavPills, SideRail
- **feedback**: Dialog, Toast, Tooltip

Intentional additions (no component library existed in the source, so a standard set was authored from what the screenshots show): `Icon` (Lucide wrapper), `Wordmark` (type-only brand name, no logo supplied), `DataTable`, `Checkbox`, `Switch`, `Dialog`, `Toast`, `Tooltip` (needed for a complete admin; styled from the reference's pills/cards).

## UI kit — Admin dashboard
`ui_kits/admin/`: Login → Painel (Visão geral / Análises) → Imóveis (filter, table, unit detail dialog) → Manutenção (tasks, add-task dialog, complete) → Financeiro (KPIs, cash-flow chart, payments, "Cobrar", auto-billing switch). Breakpoints: <760 mobile (bottom pill bar), 760–1179 tablet (2-col), ≥1180 desktop (4-col + side rail).

---

## CONTENT FUNDAMENTALS
- **Voice**: calm, confident, operational. Promises *clarity* and *control*: "Turning property chaos into clear control", "Everything in one place." In Aluga pt-BR: "Tudo em um só lugar.", "Imóveis sob controle."
- **Person**: speak to the manager as **você**; system talks about itself rarely ("sistema analisando"). Personal quotes in journeys use "eu" ("Não quero perder uma locação.").
- **Casing**: Sentence case for UI ("Adicionar tarefa", "Saiba mais"). Marketing headlines use Title-ish case in English source; in pt-BR use sentence case. Campaign lines may be ALL CAPS mixing Light + Medium weights ("MAIS QUE UM **IMÓVEL**.").
- **Two-line labels**: card titles are split into an ink line + muted line: "Total de / Unidades", "Visitas / Hoje", "Novos / Contratos", "Próximo / vencimento", "Tempo médio de / Locação".
- **Headline device**: the last word (or key word) + period in orange: "Decisões mais **claras.**", "Feito para controlar." The period is part of the brand (`ALUGA.`).
- **Numbers lead**: KPI copy is number-first with a tiny qualifier: "78% Ocupação", "R$ 124K Receita mensal", "18 dias", "+12 esta semana", "3 dias vs mês passado".
- **Brevity**: descriptions are one sentence, ≤ 20 words, muted gray. No exclamation marks.
- **Emoji**: never in UI. (The reference used one map illustration in a slide — not a UI pattern.)

## VISUAL FOUNDATIONS
- **Color**: one hot accent — orange `#F75831` — on a cool, near-white world. Ink `#1B1B1B` for dark cards/pills; headline ink `#0B1F27`. Cool grays `#E6E8F1 / #C6C6C8 / #878992 / #313131`. Page `#F4F4F8`, cards white. Orange is reserved for: the active nav item, the primary action, highlighted data (one series/bar), urgent states, the brand period. Green `#22B722` only for positive deltas; red only for counters/overdue.
- **Type**: Plus Jakarta Sans throughout. Light 300 for big metrics, Regular 400 for titles/body, Medium 500 for emphasis and the spaced wordmark. Tight negative tracking on large sizes. No serif, no mono.
- **Spacing**: compact-but-airy dashboards — 20px card padding, 14px grid gaps, 24px gutters. Desktop grid 4 cols; tablet 2; mobile 2 for KPI tiles then full-width.
- **Backgrounds**: flat light gray. No gradients except (a) soft fade under line charts and (b) protection fades on photography. Marketing uses big ghosted wordmark letters behind imagery and large orange circles behind cut-out photos.
- **Imagery**: warm-lit contemporary architecture (terracotta, black metal, glass, interior glow at dusk), autumn-orange foliage, often cut-out on white. Photos sit inside cards, bleeding to the card edge with a large radius.
- **Corners**: generous. Cards 26px, panels/dialogs 36px, inner tiles 16–22px, badges 9px, everything interactive is a full pill/circle.
- **Cards**: white, 1px inner hairline `#E6E8F1`, no drop shadow at rest. Dark variant (#1B1B1B) for "next payment"-type focal tiles. Never a colored left-border accent.
- **Shadows**: almost none. `--shadow-pop` for dialogs/toasts/floating mobile bar; `--shadow-brand` (orange glow) only under the active nav pill.
- **Signature motifs**: diagonal white hatch over bar fills; gray hatched rounded columns behind line charts; a row of light-gray "×" marks under KPI values; dark ink value pill tooltips with dimmed decimals ("R$ 23680.00"); circular dark "expand ↗" button top-right of cards; thin black connector lines with dot ends in marketing.
- **Transparency & blur**: frosted white chips/labels over photos (`backdrop-filter: blur(16px)`), blurred scrim behind dialogs. Nothing else is translucent.
- **Hover**: soft gray fills darken one step (`#EDEEF4 → #E6E8F1`); orange → `#E04A25`; table rows tint `#F8F8FB`. **Press**: scale(.97) buttons / (.94) circles. **Focus**: 3px orange ring at 35%.
- **Motion**: short and quiet — 120–360ms, `cubic-bezier(.22,1,.36,1)`. Width/height transitions on bars, color fades on states. No bounces, no parallax.
- **Layout rules**: desktop = left icon rail (sticky) + top bar (nav pills, search with ⌘K, chat/bell, avatar). Mobile = header with icon buttons + floating white bottom pill bar where only the active item shows its label.

## ICONOGRAPHY
- The reference uses thin (≈1.5px) rounded line icons, Iconsax-like (grid, chart-in-frame, pie, gear, chat bubble, bell, lightbulb, building, expand arrows).
- **Substitution**: no icon files were provided, so we use **Lucide 0.460** from unpkg via the `Icon` component (stroke 1.5). Closest match in weight and rounding. ⚠️ Flagged — swap for the real set if one exists.
- Icons sit inside circles (40–48px) or lead a pill label. Size ≈ 45% of the circle.
- No emoji, no unicode glyphs as icons (except the "×" decorative dot row and "⌘+K" key hint).
- Logos: none for Aluga — use `Wordmark`. The "A" monogram tile in the UI kit is a typographic placeholder, not a logo.
