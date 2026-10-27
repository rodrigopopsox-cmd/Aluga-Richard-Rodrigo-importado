# AGENTS.md — Aluga

Instruções para agentes de código (Claude Code, Codex, Cursor, Copilot, Antigravity…).
Este arquivo é a fonte única; `CLAUDE.md` só importa ele.

## Projeto

- Painel administrativo para gestão de imóveis de aluguel (Richard & Rodrigo): unidades, inquilinos, contratos, manutenção e financeiro. Precisa funcionar bem no celular sem perder recursos do desktop.
- UI em **pt-BR**, moeda BRL (`R$ 3.200`), datas `dd/mm`. Sem emoji na interface.
- Stack: **Next.js 16** (App Router, Turbopack, Cache Components) · **React 19** · **TypeScript** · **CSS Modules + tokens CSS**. Não há Tailwind nem shadcn/ui: o design system já fornece componentes e tokens — não adicione uma segunda biblioteca de UI.
- Rotas: `/` · `/design-system` (vitrine com a biblioteca inteira, todos os estados e os dois temas) · `/design-system/admin` (template navegável do painel).
- **Produto:** o que construir e em que ordem está em [`PRODUCT.md`](PRODUCT.md) (público, planos, fases v1/v2/v3, arquitetura, vocabulário). A especificação da versão atual está em [`docs/specs/v1.md`](docs/specs/v1.md) e as tarefas em `docs/tasks/`. Antes de implementar uma funcionalidade, confira a spec; se algo divergir, atualize a spec junto com o código.

## Comandos

```bash
npm install          # nunca `npm ci` aqui: ele apaga node_modules e o Drive tenta sincronizar a pasta recriada
npm run dev          # http://localhost:3000
npm run build
npm run check        # typecheck + lint (oxlint + stylelint) + lint:design (DESIGN.md) + tokens:check
```

Rode `npm run check` e `npm run build` antes de dar uma tarefa por concluída.
`lint:design` deve terminar com 0 erros; os avisos de tokens primitivos "órfãos" e de contraste do laranja são conhecidos (ver DESIGN.md → Do's and Don'ts).

## Design system — regras obrigatórias

1. **`DESIGN.md` (raiz) é o contrato visual e a fonte da verdade dos tokens.** Para mudar ou criar um token, edite `DESIGN.md` primeiro e depois `design-system/tokens/*.css`; `npm run tokens:check` falha se os dois divergirem.
2. **Componentes novos saem da biblioteca em `design-system/`.** Antes de criar UI, procure em `/design-system` e em `design-system/components`. Se já existe algo equivalente, estenda (nova prop/variante) em vez de duplicar.
3. **Nenhum valor de cor, fonte, espaçamento ou raio hardcoded** — nem em TSX nem em CSS. Use `var(--…)` dos tokens semânticos (`--brand`, `--surface-card`, `--text-muted`, `--space-5`, `--radius-card`, `--text-base`, `--font-sans`…). O lint bloqueia hex/rgb, `px` em padding/margin/gap/radius/font-size e `font-family` fora do token.
4. **Importe de `@design-system`** (templates de `@design-system/templates/<nome>`), nunca de arquivos internos — o lint bloqueia.
5. Ícones só via `<Icon name="…" />` (Lucide, traço 1.5). Ícone novo = uma linha em `design-system/components/core/icons.ts`.
6. Use tokens **semânticos** (não primitivos como `--orange-500`) para que tudo funcione no tema claro e no escuro (`data-theme="dark"`, opt-in).
7. Voz e layout: siga `DESIGN.md` (títulos em duas linhas, números na frente, laranja só para a ação principal, cards planos com hairline).

## Mapa da biblioteca (`design-system/`)

| Pasta | O que tem |
|---|---|
| `tokens/` | CSS dos tokens: `colors` (primitivos → semânticos → tema escuro), `typography`, `spacing`, `radii`, `effects`, `base`; `index.css` agrega; `fonts.css` só para HTML avulso |
| `components/` | 28 componentes React + TS + CSS Modules em `core/`, `forms/`, `data/`, `navigation/`, `feedback/`; API pública em `components/index.ts` |
| `templates/admin/` | Composições prontas: Shell, Login, Painel, Análises, Imóveis, Manutenção, Financeiro, `AdminApp` (rota `/design-system/admin`) |
| `guidelines/` | `brand.md` (guideline original completo: voz, fundamentos visuais, iconografia) e `components.md` (uso de cada componente) |
| `assets/images/` | Fotos de arquitetura da marca (importe com `import img from '@design-system/assets/images/…'` e use `img.src`) |
| `reference/` | HTMLs de referência visual originais do Claude Design — **não são componentes**. Abra `design-system/reference/index.html` direto no navegador |
| `README.md` | Detalhes do mapa, convenções e o passo a passo de componente novo |

## Como criar um componente novo

1. Confirme que não existe equivalente (vitrine `/design-system`, `design-system/components`).
2. Crie `design-system/components/<grupo>/<Nome>.tsx` + `<Nome>.module.css` no grupo certo (`core`, `forms`, `data`, `navigation`, `feedback`).
3. Exporte uma `interface <Nome>Props` tipada (variantes como uniões de strings, `className?` e `style?`), com JSDoc de uma linha dizendo quando usar. `'use client'` se tiver estado ou handlers.
4. Estilize só com tokens; estados obrigatórios quando se aplicam: hover, active, focus-visible (anel `--focus-ring`), disabled, loading, erro, vazio, selecionado.
5. Exporte em `design-system/components/index.ts`.
6. Adicione à vitrine em `src/app/design-system/Showcase.tsx`, com a matriz de estados, e confira nos dois temas.
7. Documente o uso em `design-system/guidelines/components.md`; se criou token, registre em `DESIGN.md`.
8. `npm run check && npm run build`.

## Ambiente (importante)

- A pasta do projeto fica no **Google Drive** e um LaunchAgent (`com.kakashudo.aluga-sync`) faz `git add -A`, commit `auto-sync: …` e push para o GitHub **a cada 5 minutos**. Não faça commit/push manual sem pedido e nunca salve segredos no projeto (`.env*` é ignorado pelo git).
- `node_modules/` e `.next/` são marcados para não sincronizar com o Drive (`scripts/drive-ignore.mjs`, roda em `predev`/`prebuild`/`postinstall`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
