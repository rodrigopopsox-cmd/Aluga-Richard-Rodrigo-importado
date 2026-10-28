# Contexto do projeto — Aluga (para o sócio Rodrigo e para qualquer IA que for assumir)

> Documento de handoff. Ele existe para que **qualquer IA** (ou pessoa) consiga entrar no
> projeto sem perguntar nada: o que já está pronto, o que foi corrigido, como rodar e
> quais são as regras inegociáveis.
>
> Última atualização: 2026-10-27.

---

## 1. O que é o projeto

Site do **Aluga** (gestão de aluguéis para o mercado brasileiro), composto de duas frentes:

| Frente | O que é | Onde vive |
|---|---|---|
| **Vitrine do Design System** | Página `/design-system` que exibe todos os componentes, tokens e telas de exemplo | `src/app/design-system/` |
| **Template do painel admin** | Telas reais do produto (Painel, Imóveis, Manutenção, Financeiro, Login) montadas só com componentes do design system | `design-system/templates/admin/` |

O design system é a **fonte da verdade visual**: nada de CSS solto, nada de cor/tamanho
inventado fora dos tokens.

---

## 2. Ambientes e fonte da verdade

- **Fonte da verdade dos arquivos do projeto: Google Drive** — pasta `Aluga Richard/Rodrigo`
  (id `1GQtEFPQAQUzX6KLQJjpDvi4uBSjknV3c`).
- **Repo git:** `rodrigopopsox-cmd/Aluga-Richard-Rodrigo-importado`.
- **Máquina do Rodrigo:** `C:\Users\Digo Nego\Documents\Aluga-Richard-Rodrigo-importado`
  (já está com todos os arquivos aplicados e validados).
- **Preview local:** extração de `origin/main` + patches de sandbox, rodando em `http://localhost:3000`.

Pastas relevantes no Drive:

| Pasta | id |
|---|---|
| `templates/admin` | `1OZyIhifpA6fTfXQeuPlDivLFam33B-eh` |
| `src/app/design-system` | `1kQ36-EOqYOtWeaJR-RIkFsrNUFcJu_bY` |
| tokens (`design-system/tokens`) | `1zFBOWwKL4YlR3vERg-3X8s_Bivi24UiQ` |
| `DESIGN.md` | arquivo `1JyZPbSGWDQWkJwPqq5kEHqv2rwW343B8` |

Arquivos de apoio na raiz do Drive:

| Arquivo | id |
|---|---|
| `CONTEXTO-SOCIO-RODRIGO.md` (este documento) | `1yN5L0IfusxQVpIaQBT6YBHNbA8opC090` |
| `ENGENHARIA-REVERSA-ALUGGAPRO.md` (mapa do produto no ar) | `11O1vFOaGAJ5Ra3Kmp4YfppCPEL-jHxGb` |
| `ALGGAPRO-INVENTARIO-COMPLETO.txt` (inventário de 19 rotas autenticadas) | `1XAirviGZlE2_ajonNBY9k9tcENyNwU0W` |
| `SEGUNDO-CEREBRO-ATIVIDADES.md` (backlog do Rodrigo, 15 tarefas em 4 sprints) | ver seção 2 |
| `aluga-design-system-correcao.zip` (15 arquivos, aplicar por cima) | `1S7XejLzEl83acXt2tmO3EihVWFEZ1SDY` |
| `aluga-design-system.patch` (alternativa via `git apply`) | `1TRc7IShh01HQJV00VMGhOElx9SusbFCR` |

---

## 3. Como rodar

```bash
npm install
npm run dev          # http://localhost:3000
```

Páginas úteis:

- `http://localhost:3000/design-system` — vitrine
- `http://localhost:3000/design-system/admin` — template do painel (login: `admin` / `admin`)

Validações obrigatórias antes de dizer "pronto":

```bash
node scripts/check-tokens.mjs    # tokens ↔ DESIGN.md (precisa dar 208 OK)
npx tsc --noEmit                 # TypeScript (ver "armadilhas" — há erros pré-existentes)
```

---

## 4. Estado atual (entregue e validado em produção)

### 4.1 Tokens corrigidos (acessibilidade de cor e tamanho)

| Token | Valor | Por quê |
|---|---|---|
| `--brand` | laranja 700 `#C2410C` | contraste 5,18:1 com texto branco (AA) |
| `--brand-hover` | laranja 800 `#9A3412` | 7,31:1 (AA) |
| `--focus-ring` | `rgba(154,52,18,.4)` | anel de foco visível |
| `--text-base` | **16px** | antes 14px, pequeno demais |
| `--type-label` | passa a usar `--text-sm` | |
| alturas de controle (`sm`/`md`/`field`) | **48px** | alvo de toque confortável |

`#F75831` (laranja vivo) continua existindo, mas **só** para dados/urgência — nunca como
cor de ação principal.

### 4.2 Camada de acessibilidade opt-in (`design-system/tokens/a11y.css`)

- Ativada por `<html data-a11y="on">`.
- Amplia a escala tipográfica em ~1,125 (base 18px) e todos os `--control-h-*` para 56px.
- **Não mexe em cor, espaçamento ou raio** — é só texto e alvo de toque.
- Importada **por último** em `tokens/index.css`, para sobrescrever a base.
- É deliberadamente **externa** ao espelho `DESIGN.md ↔ tokens` (o validador só lê
  `colors/typography/spacing/radii/effects.css`).

### 4.3 Acessibilidade + tema como configuração no template do painel

- `design-system/templates/admin/useSettings.ts` — hook com persistência em
  `localStorage` (`aluga_a11y`, `aluga_theme`).
- `design-system/templates/admin/SettingsMenu.tsx` + `SettingsMenu.module.css` — o menu
  da engrenagem (ícone `settings`, no mesmo estilo `IconButton` dos demais ícones),
  no **rail esquerdo, abaixo dos ícones de módulo e acima do sair**. Painel abre para a
  **direita**; no mobile fica no header e abre para baixo.
- Texto de ajuda sem jargão técnico: *"Deixa o texto e os botões maiores."*
- Duas superfícies compartilham o mesmo estado: o menu do painel e o Switch da vitrine.
- Overrides por URL: `?a11y=on`, `?theme=dark`.

### 4.4 Bug de renderização corrigido (stacking context) — RESOLVIDO

**Sintoma original:** clicava na engrenagem e o painel não aparecia — só um fio branco de
~13px do lado do menu. Os tooltips dos ícones do rail também não apareciam.

**Causa raiz:**

1. `Shell.module.css` → `.railColumn { position: sticky }`. **`position: sticky` cria um
   stacking context.**
2. `Card.module.css` → `.card { position: relative }`.
3. Os dois ficam com `z-index: auto` no contexto raiz, então são pintados **na ordem do
   DOM**. Os cards vêm **depois** do rail → os cards passam por cima de **tudo** que está
   dentro do rail, inclusive o popover, mesmo ele tendo `z-index: 30` — porque esse `30`
   fica preso *dentro* do stacking context do rail e nunca é comparado com os cards.

**Correção aplicada** em `design-system/templates/admin/Shell.module.css`:

```css
.railColumn {
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 20;   /* ← sticky cria stacking context; sem isso o popover da engrenagem
                    e os tooltips do rail ficam atrás dos cards. */
  /* ...resto igual... */
}
```

**Status:** corrigido, aplicado no Drive, no commit e **confirmado pelo Rodrigo em tela**
(engrenagem no rail, painel por cima dos cards, tema claro/escuro funcionando).

---

## 5. Armadilhas conhecidas (já pagamos por elas)

1. **`edit_file` em lote no MESMO arquivo perde edições.** Duas ou três edições no mesmo
   arquivo numa mesma resposta podem ser descartadas em silêncio. → Aplique **uma edição
   por chamada** e confira com `grep` depois.
2. **Cache de CSS em dev (Turbopack).** O Turbopack serve o CSS de módulo por uma **URL
   estável** que não muda quando você edita o arquivo. Editar o CSS **não garante** que o
   navegador/proxy pegue a versão nova.
   - Confie no conteúdo servido, não na URL: baixe o chunk e procure a regra.
   - Sempre peça um **Ctrl+Shift+R** após mudança de CSS.
   - Para furar o cache de verdade, crie um **arquivo CSS module novo** (muda o chunk).
   - Se o markup está novo e o estilo velho, é isso.
3. **Servidor precisa ser reiniciado** quando arquivos **novos** entram no projeto
   (ex.: `SettingsMenu.tsx`). O `npm run dev` já em execução não pega. Na dúvida:
   `Remove-Item -Recurse -Force .next` e subir de novo.
4. **Push pro Drive altera o mime type** (`.ts` sobe como `text/javascript`, `.css` como
   `text/css`). Não é problema funcional, mas não estranhe.
5. **Sempre leia de volta o arquivo do Drive** (ou compare o tamanho com
   `git cat-file -s origin/main:<path>`) antes de sobrescrever, para não apagar edição de
   outra pessoa.
6. **Transcrição perde bytes** em conteúdos longos. Confira o tamanho após o push.
7. **Tamanho igual NÃO prova conteúdo igual — e push manual já quebrou arquivo duas
   vezes.** Reenviar um `.tsx` grande reescrevendo o conteúdo à mão colou o JSX da função
   `Section` no `Showcase.tsx` (quebraria o build) e trocou `t.id` por `id` no
   `AdminApp.tsx` (variável inexistente, também quebraria). Os dois passaram batendo o
   tamanho em bytes ou com diferença pequena o bastante para parecer ruído.
   → **Depois de todo push, baixe o arquivo de volta do Drive e faça `diff` com o espelho
   local.** Foi assim que os dois foram encontrados. Só confiar no tamanho não basta.
8. **`grep` em CSS não-minificado engana:** `grep` trabalha linha a linha, então
   `-A 4` corta propriedades e `.{0,180}` para na primeira newline. Use `grep -A N` com N
   grande ou inspecione o arquivo.
9. **Componente `Switch`** fica em `design-system/components/forms/Switch.tsx` e usa
   `Toggle.module.css` (não existe `Switch.module.css`).
10. **`tsc --noEmit` já erra no `main` limpo:** faltam declarações para os PNG em
    `design-system/assets/images/` e `LayoutProps` é tipo gerado pelo Next. Não é regressão
    sua — compare com o base antes de se culpar.
11. **`next/font/google` não funciona em sandbox** (sem acesso à internet). Use
    `@fontsource/plus-jakarta-sans`.
12. **Windows:** caminho com espaço (`C:\Users\Digo Nego\...`) precisa de aspas no
    PowerShell, senão o `cd` quebra. E "Extrair Tudo" do Windows cria uma subpasta com o
    nome do zip — sempre confira com `Test-Path`.
13. **Não presuma que a rede está bloqueada — teste antes de descartar trabalho.** Ficou
    registrado aqui que "não é possível acessar sites externos", e por isso a engenharia
    reversa do AluggaPro foi marcada como bloqueada e adiada por várias rodadas. Quando
    finalmente testei, o acesso funcionou normalmente e o levantamento inteiro foi feito
    em uma rodada. Um `fetch_page` custa segundos; uma premissa errada custou dias.
    Regra: **antes de dizer "não dá", tentar.**

---

## 6. Regras inegociáveis do combinado

1. **Só executa tarefas do Rodrigo (Marca).** Tarefas do Richard (Produto) ficam com ele —
   inclusive o trabalho dele já feito, os projetos Supabase e o repo `black-navalha`.
2. **Diagnóstico antes de mudança.** Nada de sair editando.
3. **Nada de operação destrutiva** em banco, **nada de desligar RLS**, **nada de bucket
   público**, **nada de push/publicar na `main` sem autorização**.
4. **Nunca expor segredos, chaves ou dados pessoais** em docs, prints ou memória. Não pedir
   nem aceitar senha de terceiros em chat.
5. **Nada de dado mockado ou "pronto" inventado.** Produção de verdade, validada.
6. **Atualizar docs existentes no Drive, sem duplicar.**
7. **A vitrine é aditiva:** o design aprovado não muda, só ganha função.
8. **Acessibilidade: só texto e alvo de toque.** Sem mudança de cor.
9. **Acessibilidade/tema como configuração fica no template do painel**, com ícone de
   engrenagem **seguindo o estilo dos ícones já existentes** (`IconButton`). O foco é a área
   do template.
10. **Texto de ajuda é para o cliente final:** sem jargão técnico. Ex.: "Deixa o texto e os
    botões maiores." (não mencionar px).
11. **Commit e push só na branch da sessão**
    (`arena/8e2745c8-aluga-richard-rodrigo-importad`). Nunca na `main`.

---

## 7. Git — estado

- Branch da sessão: `arena/8e2745c8-aluga-richard-rodrigo-importad`
- Commit do trabalho: **`81af208`** — *feat(design-system): acessibilidade e tema como
  configuracao no template do painel* — já pushed para o `origin`.
- O `main` do repo (`33f6853`) **ainda não tem** esse trabalho. Para levar pra `main` é
  preciso autorização explícita do Rodrigo.
- **Drive 100% sincronizado e verificado byte a byte** (2026-10-27): todos os arquivos
  entregues foram baixados de volta do Drive e comparados com `diff` contra o espelho
  local. Duas corrupções de push foram encontradas e corrigidas: `Showcase.tsx`
  (função `Section` com JSX colado) e `AdminApp.tsx` (`y.id !== id` com `id` inexistente).
  Restou apenas 1 byte de newline final no `Shell.module.css`, sem efeito prático.

---

## 8. Próximas tarefas

- [x] Painel da engrenagem abre por cima dos cards — **feito e confirmado em tela**.
- [x] Commit + push do trabalho na branch da sessão (`81af208`).
- [x] **Engenharia reversa do AluggaPro** — **feita**, ver
  `ENGENHARIA-REVERSA-ALUGGAPRO.md` (id `11O1vFOaGAJ5Ra3Kmp4YfppCPEL-jHxGb`).
  Mapeadas as 3 superfícies, os módulos, as 12 calculadoras públicas e o vocabulário
  do domínio, tudo a partir das páginas públicas, **sem login**.
- [x] **Árvore de telas do app autenticado** — **fechada** via o inventário que o Rodrigo
  trouxe (`ALGGAPRO-INVENTARIO-COMPLETO.txt`, id
  `1XAirviGZlE2_ajonNBY9k9tcENyNwU0W`): 19 rotas com campos, filtros, validações,
  estados vazios e defaults. O que **ainda** falta não é tela, é **efeito externo**:
  boleto/Pix gerado, baixa automática, assinatura eletrônica válida, PDF/CSV real,
  conexão bancária, portal do inquilino autenticado, vitrine publicada e cálculos
  fiscais com valores reais. Resolve com conta de homologação e dados sintéticos.
- [ ] **Levar o commit para a `main`** — depende de autorização do Rodrigo.

---

## 9. Backlog do Rodrigo — app "Segundo Cérebro"

O Rodrigo gerencia o projeto num kanban próprio, o **Segundo Cérebro**
(`dinastia-cerebro.b6sonj.easypanel.host/tarefas`, EasyPanel). Quadro `A fazer` /
`Aguardando`, **15 tarefas, ~58h**, todas "Quem faz: Rodrigo".

Inventário completo em **`SEGUNDO-CEREBRO-ATIVIDADES.md`**. O que importa para quem for
assumir:

**Sprints:** 1 → 06/11/2026 · 2 → 20/11/2026 · 3 → 04/12/2026 · Validação → 15/01/2027.

**A tarefa 1 da Sprint 1 — "Ajustar tokens de acessibilidade no DESIGN.md" — JÁ ESTÁ
PRONTA.** Os critérios de aceite dela (laranja escuro com contraste AA, texto base 16px,
alvos de toque 48px, `npm run check` passando, vitrine mostrando o novo laranja) foram
todos cumpridos e validados em 2026-10-27 — ver seção 4.1. Ela é dependência da tarefa
"Desenhar as telas da v1", a maior da Sprint 1 (8h).

**Decisões de produto que o backlog revela:**

- **O nome "Aluga" é provisório.** Pesquisa de nome em curso, direções Old Parr /
  Mustang / nome da V0, consulta ao INPI nas classes 36 e 42. Registro em `PRODUCT.md`.
- **Preços do Aluga: R$ 59 / 99 / 209 / 269** — **diferentes** do AluggaPro
  (79/119/229/299). Ainda em validação com os 5 fundadores.
- **Vocabulário da v1:** `Proprietário · Imóvel · Unidade · Cobrança · Recebimento`.
  **Unidade**, não Contrato. **Cobrança/Recebimento**, não Financeiro. Bem mais enxuto que
  os 14 itens de menu do AluggaPro.
- **Modo simples ("Este mês") é o padrão**, com pergunta "Como prefere ver?" na entrada —
  mesmo eixo da camada de acessibilidade.
- **Onboarding em 5 passos:** imóvel → inquilino e contrato → ver a primeira cobrança →
  conectar WhatsApp → conectar Mercado Pago. **Diferente** do AluggaPro (que junta
  inquilino e contrato em passos separados e usa "conectar conta bancária").
- **Aluga é PWA** — ícone para tela inicial do celular e favicon ainda não existem no
  design system.
- **Público-alvo inclui pessoa idosa** — o tutorial de WhatsApp é "pensado para pessoa
  mais velha", com imagens. É a justificativa de produto do trabalho de acessibilidade.

**Consequência para o template do painel:** se ele for a base da v1, precisa **encolher**
para esse vocabulário, não crescer. Ver a tabela de gap na seção 6 do
`SEGUNDO-CEREBRO-ATIVIDADES.md`.

---

## 10. Mapa rápido de arquivos

```
design-system/
  tokens/
    colors.css  typography.css  spacing.css  radii.css  effects.css   ← validados por check-tokens
    index.css                                                          ← importa tokens + a11y (por último)
    a11y.css                                                          ← camada opt-in (fora do validador)
  components/
    core/IconButton.tsx        ← botão circular de ícone (variants: soft/dark/brand/white/ghost/inverse)
    forms/Switch.tsx           ← usa Toggle.module.css
    data/Card.tsx              ← .card { position: relative }  ← envolvido no bug de stacking
    navigation/SideRail.tsx    ← props: items, value, onChange, footer, className, style
  templates/admin/
    AdminApp.tsx               ← usa useSettings
    Shell.tsx                  ← rail + topbar + bottom bar (mobile); passa settings ao SettingsMenu
    Shell.module.css           ← .railColumn (onde entra o z-index: 20)
    SettingsMenu.tsx           ← engrenagem + popover (align: 'rail' | 'header')
    SettingsMenu.module.css    ← .panel / .fromRail / .fromHeader / .hint
    useSettings.ts             ← localStorage aluga_a11y / aluga_theme
    useBreakpoint.ts  data.ts  index.ts  README.md
    DashboardScreen  AnalyticsScreen  PropertiesScreen  MaintenanceScreen  FinanceScreen  LoginScreen
src/app/design-system/
    page.tsx  Showcase.tsx  Showcase.module.css
    admin/page.tsx            ← renderiza <AdminApp />
```
