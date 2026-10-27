# Design system Aluga

Biblioteca de UI do projeto. O contrato visual e os valores dos tokens estão em [`../DESIGN.md`](../DESIGN.md);
as regras para agentes, em [`../AGENTS.md`](../AGENTS.md). Vitrine viva: rota **`/design-system`** (`npm run dev`).

```tsx
import { Button, Card, CardHeader } from '@design-system';
import { AdminApp } from '@design-system/templates/admin';
```

## Mapa

```
design-system/
├── index.ts                 API pública (reexporta components/)
├── tokens/                  CSS custom properties — espelho de DESIGN.md
│   ├── colors.css           primitivos → semânticos → [data-theme="dark"]
│   ├── typography.css       família, pesos, escala 11–96, papéis (--type-*)
│   ├── spacing.css          --space-0 … --space-11 (+ meios-passos -0-5…), alturas de controle, rail/topbar
│   ├── radii.css            --radius-xs … --radius-2xl, pill, round, card/panel/control
│   ├── effects.css          sombras, blur, hachuras, easing, durações, escala de clique
│   ├── base.css             reset mínimo + body
│   ├── index.css            agrega tudo (usado por src/app/globals.css)
│   └── fonts.css            @import do Google Fonts — só para HTML avulso (o app usa next/font)
├── components/
│   ├── core/                Avatar, AvatarGroup, Badge, Button, Chip, Icon (+ icons.ts), IconButton, Wordmark
│   ├── forms/               Input, Select, Checkbox, Switch, SegmentedControl (+ Field/Toggle .module.css compartilhados)
│   ├── data/                Card, CardHeader, Metric, StatCard, ProgressPill, BarChart, Legend, LineChart, HeatScale, DataTable
│   ├── navigation/          NavPills, SideRail
│   ├── feedback/            Dialog, Toast, Tooltip
│   └── index.ts             exports nomeados + tipos
├── templates/
│   └── admin/               AdminApp, Shell, LoginScreen, DashboardScreen, AnalyticsScreen, PropertiesScreen,
│                            MaintenanceScreen, FinanceScreen, data.ts (dados fictícios), useBreakpoint, useStoredState
├── guidelines/
│   ├── brand.md             guideline completo original (voz, fundamentos visuais, iconografia)
│   └── components.md        quando e como usar cada componente
├── assets/images/           building-brick.png, building-glass.png, house-orange.png
└── reference/               HTMLs de referência do Claude Design (ver abaixo)
```

28 componentes exportados em 25 módulos — o mesmo conjunto do export original.

## Tokens em três camadas

1. **Primitivos** (`--orange-500`, `--gray-200`, `--night-900`…) — só existem para definir os semânticos.
2. **Semânticos** (`--brand`, `--surface-card`, `--text-muted`, `--border-subtle`, `--success-soft`…) — o que componentes e telas usam.
3. **Tema** — claro é o padrão; `[data-theme="dark"]` redefine só os semânticos. O tema escuro foi criado neste projeto (a referência era só clara) e é opt-in.

Valores fora da escala em um componente específico (ex.: altura 22px do Badge pequeno) ficam no `.module.css` dele;
cor, fonte, espaçamento e raio **sempre** vêm de token — o `stylelint` e o `oxlint` bloqueiam o contrário.

## Referências HTML (`reference/`)

Os HTMLs originais do Claude Design, preservados como referência visual (não são componentes nem são importados pelo app).
Abra **`design-system/reference/index.html`** direto no navegador (duplo clique; não precisa de servidor).

- `guidelines/*.html` — cards de cores, tipografia, espaçamento, raios, sombras, marca.
- `components/<grupo>/*.card.html` — os componentes originais renderizados.
- `ui_kits/admin/index.html` e `mobile.html` — o kit clicável original (desktop e frame de celular).
- `thumbnail.html` — capa.
- `styles.css` aponta para `../tokens/` (os tokens vivos); `vendor/ds-bundle.js` é o bundle compilado original, mantido só para esses HTMLs.
- Cards e kit carregam React, Babel e Lucide do unpkg: precisam de internet, como no original.

## Como criar um componente novo

1. Procure um equivalente na vitrine `/design-system` e em `components/`. Se existir, adicione prop/variante em vez de duplicar.
2. Crie `components/<grupo>/<Nome>.tsx` e `<Nome>.module.css`.
3. Tipos: `export interface <Nome>Props` com variantes em união de strings, `className?` e `style?`; JSDoc de uma linha (quando usar). `'use client'` se tiver estado ou handlers.
4. Estilo só com tokens (`var(--…)`). Cubra os estados que se aplicam: hover, active (`scale(var(--press-scale))`), focus-visible (`0 0 0 3px var(--focus-ring)`), disabled, loading, erro, vazio, selecionado. Use tokens semânticos para funcionar no tema escuro.
5. Exporte em `components/index.ts` (e o tipo das props).
6. Mostre na vitrine (`src/app/design-system/Showcase.tsx`) com a matriz de estados (`StateMatrix`) e confira nos dois temas.
7. Escreva o uso em `guidelines/components.md`. Token novo? Primeiro em `DESIGN.md`, depois no CSS.
8. `npm run check && npm run build`.

## Verificações automáticas

| Comando | O que garante |
|---|---|
| `npm run typecheck` | props e variantes válidas (substitui as regras de props por componente do lint de aderência original) |
| `npm run lint` | `oxlint`: sem hex/rgb/px/fonte hardcoded em TS/TSX, sem import de arquivos internos; `stylelint`: o mesmo no CSS |
| `npm run lint:design` | `DESIGN.md` válido no formato Google Labs (`@google/design.md`) |
| `npm run tokens:check` | `design-system/tokens/*.css` idêntico ao `DESIGN.md`, nos dois sentidos |
