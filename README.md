# Aluga — Richard & Rodrigo

Painel administrativo para gestão de imóveis de aluguel (unidades, inquilinos, contratos, manutenção e financeiro).

## Estrutura

- `PRODUCT.md` — o produto: público, planos e preços, fases v1/v2/v3, arquitetura e decisões
- `docs/specs/v1.md` — especificação da v1 (requisitos, critérios de aceite, cronograma) · `docs/tasks/` — tarefas no formato do Segundo Cérebro
- `DESIGN.md` — contrato visual e fonte da verdade dos tokens (formato Google Labs / Stitch)
- `AGENTS.md` — instruções para agentes de código (o `CLAUDE.md` só importa este arquivo)
- `design-system/` — tokens (CSS) e componentes React em TypeScript (`core`, `forms`, `data`, `navigation`, `feedback`), templates de tela (`templates/admin`), guidelines, imagens e os HTMLs de referência do Claude Design em `reference/` (abra `design-system/reference/index.html` no navegador). Mapa completo em [design-system/README.md](design-system/README.md)
- `src/app/` — app Next.js: `/` início, `/design-system` vitrine da biblioteca (todos os estados, tema claro e escuro), `/design-system/admin` template do painel
- `scripts/` — `check-tokens.mjs` (CSS × `DESIGN.md`) e `drive-ignore.mjs` (tira `node_modules/` e `.next/` da sincronização do Drive)

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000/design-system
npm run check    # typecheck + lint + DESIGN.md + tokens
npm run build
```

## Sincronização

Este repositório é atualizado automaticamente a partir da pasta do Google Drive do Richard, a cada 5 minutos. Os commits com mensagem `auto-sync: …` são essas atualizações automáticas.

As pastas `node_modules/` e `.next/` não vão para o Drive (atributo `com.apple.fileprovider.ignore#P`, aplicado por `scripts/drive-ignore.mjs`) nem para o git (`.gitignore`). Use `npm install`, não `npm ci`.
