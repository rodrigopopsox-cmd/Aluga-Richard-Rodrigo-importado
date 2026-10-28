# Template — painel administrativo

Versão tipada (TSX + CSS Modules) do UI kit `ui_kits/admin` do Claude Design. Rota: **`/design-system/admin`**.
O HTML original continua em `design-system/reference/ui_kits/admin/`.

Fluxo: Login → Painel (Visão geral / Análises) → Imóveis (filtro, tabela, diálogo da unidade) → Manutenção (tarefas,
diálogo "Nova tarefa", concluir) → Recebimentos (recebido, despesas, resultado, ocupação, fluxo de caixa, "Precisa de atenção") → Cobranças → Planos.
Breakpoints (`useBreakpoint`): < 760 mobile (barra inferior em pílula) · 760–1179 tablet (2 colunas) · ≥ 1180 desktop (4 colunas + rail).

| Arquivo | Papel |
|---|---|
| `AdminApp.tsx` | Estado do demo (login, módulo atual, tarefas, diálogo, toasts) |
| `Shell.tsx` | Moldura: rail + top bar (desktop/tablet) ou header + barra inferior (mobile) |
| `LoginScreen.tsx`, `DashboardScreen.tsx`, `AnalyticsScreen.tsx`, `PropertiesScreen.tsx`, `MaintenanceScreen.tsx`, `FinanceScreen.tsx` | Telas |
| `Screens.module.css`, `Shell.module.css`, `LoginScreen.module.css`, `AdminApp.module.css` | Padrões de composição (só tokens) |
| `data.ts` | Dados fictícios + `STATUS_TONE` e `brl()` |
| `useBreakpoint.ts`, `useStoredState.ts` | Breakpoint responsivo e estado em `localStorage` seguro para SSR |

Ao transformar uma tela em produto real: copie a composição para `src/app/...`, troque `data.ts` por dados reais e mantenha
os componentes vindos de `@design-system`. Valores fora da escala do original foram ajustados ao token mais próximo.
