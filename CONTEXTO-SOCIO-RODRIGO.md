# Contexto do projeto — Aluga (para o sócio Rodrigo e para qualquer IA que for assumir)

> Documento de handoff. Ele existe para que **qualquer IA** (ou pessoa) consiga entrar no
> projeto sem perguntar nada: o que já está pronto, o que foi corrigido, como rodar e
> quais são as regras inegociáveis.
>
> Última atualização: 2026-10-29.

---

## 1. O que é o projeto

Site do **Aluga** (gestão de aluguéis para o mercado brasileiro), composto de duas frentes:

| Frente | O que é | Onde vive |
|---|---|---|
| **Vitrine do Design System** | Página `/design-system` que exibe todos os componentes, tokens e telas de exemplo | `src/app/design-system/` |
| **Template do painel admin** | Telas reais do produto, montadas só com componentes do design system. **7 telas da v1 já desenhadas** (ver seção 4.7) | `design-system/templates/admin/` |
| **Landing** | Página `/` com a promessa e uma apresentação de 7 etapas comandada pela rolagem. **Feita e aprovada** (ver seção 4.8) | `src/app/` |

O design system é a **fonte da verdade visual**: nada de CSS solto, nada de cor/tamanho
inventado fora dos tokens.

**A landing e o painel compartilham as telas.** A última etapa do tour renderiza
`SimpleModeScreen` e `DashboardScreen` de verdade — se uma tela muda no app, a landing muda
junto. É a única forma de a promessa não mentir.

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
| `CONTEXTO-SOCIO-RODRIGO.md` (este documento) | procure pelo **nome** na pasta — o id do Drive muda a cada sincronização |
| `ENGENHARIA-REVERSA-ALUGGAPRO.md` (mapa do produto no ar) | `11O1vFOaGAJ5Ra3Kmp4YfppCPEL-jHxGb` |
| `ALGGAPRO-INVENTARIO-COMPLETO.txt` (inventário de 19 rotas autenticadas) | `1XAirviGZlE2_ajonNBY9k9tcENyNwU0W` |
| `SEGUNDO-CEREBRO-ATIVIDADES.md` (backlog do Rodrigo, 15 tarefas em 4 sprints) | procure pelo **nome** na pasta — o id do Drive muda a cada sincronização |
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

### 4.5 Tela de planos com os preços do Aluga

Commit `c0025c8`. **Aprovada pelo Rodrigo em 28/10/2026 sem ressalva** — *"os planos eu
gostei"*. Não mexer.

- `components/marketing/PlanCard.tsx` + `PricingTable.tsx` — componentes novos.
- Preços **de `PRODUCT.md`**, não do AluggaPro: Essencial R$ 59 · Família R$ 99 ·
  Patrimônio R$ 209 · Investidor R$ 269.
- O que `PRODUCT.md` **não** define ficou vazio de propósito: plano destacado, lista de
  recursos por plano. Quando o Rodrigo fechar isso com os fundadores (tarefa 14), é só
  preencher `badge`/`highlighted`/`features`.

### 4.6 Onboarding como estado de entrada

Commits `50bbffc` + `d4eae79`. **Duas correções do Rodrigo aplicadas:**

1. *"eu quero manter todas as funçoes do antigo painel"* → **Completo passou a ser o padrão**
   (commit `02578c2`), não Simples.
2. *"o primeiros passos deve ser atribuido na hora de entrada do usuario... nao como uma
   opçao do nosso menu"* → o onboarding aparece **no lugar do painel** enquanto os 5 passos
   não fecham; não é item de menu.

- `components/data/StepChecklist.tsx` — componente novo do design system.
- `useSettings.ts` ganhou `ViewMode` (`aluga_view`), lido também de `?view=` na URL.
- A preferência de exibição mora em **Configurações** (menu da engrenagem), não num toggle
  solto na tela.

### 4.7 As 7 telas da v1 — tarefa 5 do Segundo Cérebro, FECHADA

Commits `f997f43` `528b6cc` `f4924d9` `c56e6c7` `59c7959` `50ebd2f` `8b1c812` `b993638`
`ee8b8d4`. Todas com `check-tokens` 208 OK, `tsc` limpo e render validado em rota
temporária (HTTP 200 sem 500), removida depois.

| # | Tela | Requisito da spec | O que entrega |
|---|---|---|---|
| 1 | **Este mês** (Modo simples) | R7 | cabeçalho com mês e navegação · "R$ recebidos de R$ esperados" · um card por unidade com status **em palavras** · botões **Recebi** e **Lembrar no WhatsApp** |
| 2 | **Cobranças** | R3 | 5 estados em palavras · recebimento manual com valor/data/origem · **recebimento parcial deixa em aberto e mostra o saldo** · desfazer com registro de quem e quando |
| 3 | **Recebimentos** | R7 | 4 cards (Recebido/Despesas/Resultado/Ocupação) · SegmentedControl Mês/Trimestre/Ano · fluxo de caixa · **"Precisa de atenção"** com Switch "Lembretes no WhatsApp" |
| 4 | **Inquilinos** | R2 | nome, CPF/CNPJ, **WhatsApp obrigatório**, e-mail opcional · unidades como badges · "sem unidade" como estado real |
| 5 | **Contratos** | R2 | unidade, inquilino, valor, dia de vencimento (1–31), início, fim opcional, índice de reajuste (IGP-M/IPCA/% fixo/nenhum) e mês de aniversário · **Encerrar** derivado do campo `fim` |
| 6 | **Imóveis e Unidades** | R2 | apelido, tipo, endereço com CEP, titulares com % somando 100 · unidade alugada/vaga · **a tabela lista unidades**, imóvel como contexto (regra "imóvel de uma unidade só") · **limite do plano** com tela "Seu plano permite N unidades" |
| 7 | **Despesas** | R8 | categoria (IPTU/condomínio/manutenção/taxa/outro), valor, data, quem pagou · **informe de rendimentos por titular** mês a mês aplicando a % · separado por inquilino PF/PJ · **extrato CSV** |

**Componentes novos do design system que saíram da tarefa 5:**

| Componente | Para quê |
|---|---|
| `MaskedInput` (`components/forms/`) | máscaras de CPF, CNPJ, telefone e CEP. Formata mas **não valida dígito verificador** — decisão explícita: validação é regra de formulário |
| `StepChecklist` (`components/data/`) | o checklist de 5 passos do onboarding |
| `PlanCard` / `PricingTable` (`components/marketing/`) | a tela de planos |

**Ícones novos no registro:** `chevron-left`, `chevron-right`, `file-signature`, `receipt`.

**Menu do rail depois da tarefa 5:** Painel · Imóveis · Manutenção · Recebimentos · Planos ·
Cobranças · Inquilinos · Contratos · Despesas. ("Financeiro" virou **Recebimentos**.)

**Ressalvas honestas — o que NÃO foi validado:**

- Os **diálogos de cadastro** das telas 4, 5, 6 e 7 não foram testados com clique. A
  validação é SSR: prova que compila e que a lista renderiza certa. Roteiro de teste em
  `ROTEIRO-REVISAO-TELAS.md`.
- A **consulta de CEP** (Imóveis) não foi testada: ViaCEP dá timeout no sandbox. No
  navegador do Rodrigo deve funcionar, mas não foi visto funcionando.
- A **validação de dígito verificador de CPF/CNPJ não existe** em lugar nenhum do app.
- O **Painel** (dashboard) ainda mostra cards do template genérico que não existem no
  produto: "Visitas", "Novos Contratos", "Manutenção", "Insights (Assistente IA)" e
  "Saúde Financeira" com percentil inventado. **É a próxima tarefa grande.**

### 4.8 Landing page em `/`

Commit `82918a2`. Tarefa 7 do Segundo Cérebro e R10 da spec. **A restrição que define o
commit é a que a própria tarefa põe: "Só componentes e tokens do design system."**

**A landing é UMA explicação, num bloco só.** Não existe seção depois da apresentação:
tudo o que a página explica está dentro do tour. Foi o que o Rodrigo pediu na 10ª rodada,
depois de reprovar uma versão que tinha a demonstração do painel como bloco separado
embaixo — *"vc acabou fazendo outra animaçao embaixo de onde eu queria... o legal seria
a explicaçao do site estar tudo no mesmo lugar"*.

**Estrutura atual:** hero (só texto) → `ProductTour` com **7 etapas** → planos → CTA final
→ rodapé. Nada entre o tour e os planos.

**As 7 etapas** (todas com dados reais das telas): 01 Imóveis · 02 Contratos · 03 Cobranças
· 04 Recebimentos · 05 Resultado · 06 Rentabilidade · **07 "Do seu jeito"**.

**A 7ª etapa é o painel e o que se configura nele, e é a única com quatro beats.** Ela
ocupa quatro telas de rolagem, uma por estado, na ordem em que o produto as apresenta:

| Beat | Estado | O que mostra |
|---|---|---|
| 01 | **Modo Completo** | a Visão geral inteira, com as fotos das casas |
| 02 | **Modo Simples** | a tela "Este mês", um cartão por unidade |
| 03 | **Tema escuro** | o painel completo, escuro |
| 04 | **Letra maior** | o painel completo, com a acessibilidade ligada |

Começa no **Completo**, que é o padrão do produto e é a tela com as imagens das casas.
Quem rola vê um estado substituir o outro **sem clicar em nada** — foi o pedido: *"na
ultima sessao da animaçao mostrando nosso painel e as funcionalidades dele animada sem o
cliente precisar em clicar em nada so dando scroll"*.

**Como os beats funcionam.** `ProductTour` aceita `beats?` por etapa e `panel` passou a ser
função do beat. A seção mede `totalScreens` telas de rolagem em vez de `steps.length`, e a
tela é convertida em (etapa, beat). Uma etapa com quatro beats = quatro telas.

**A régua não mudou.** Quem rola é o navegador: nenhum `preventDefault`, nenhuma captura
da rodinha, nenhum `position: fixed`. A etapa ativa continua sendo **função pura da
posição da rolagem** — rolar para cima desfaz, rolar rápido não pula estado,
redimensionar e entrar por âncora recomputam do zero. Só a granularidade mudou dentro da
última etapa.

**Arquivos da landing:**
- `src/app/LandingScreen.tsx` + `src/app/page.module.css`
- `src/app/PanelModes.tsx` — os quatro estados, com as telas reais do painel
- `design-system/components/marketing/ProductTour.tsx` + `.module.css`

**Apagados na 10ª rodada:** `src/app/MeuMesDemo.tsx` e `src/app/ProductShowcase.tsx`.
Nada mais os referencia.

**Duas decisões técnicas que vale conhecer:**

1. **A tela completa cabe numa caixa de preview.** A Visão geral tem ~1400px e não caberia
   no `.pin` sticky de 100vh — o que passasse da tela ficaria inalcancável. A caixa limita
   a altura (`46vh`, `40vh` em tela curta, `34vh` no celular) e um degradê some com o fundo.
   O degradê vai para `var(--surface-page)`, a cor da moldura, então em tema escuro ele
   desaparece no fundo em vez de virar faixa cinza.
2. **`data-theme` e `data-a11y` são atributos de elemento**, não exclusivos do `<html>`.
   Por isso o tema escuro e a letra maior funcionam dentro da moldura sem sequestrar a
   landing. No app os dois atributos vão no `<html>` e valem para o painel todo.

**Duas ausências deliberadas, escritas no código:**

1. **Sem prova social.** "+300 proprietários", "+1.200 imóveis" e "32% menos
   inadimplência" são números do **AluggaPro**. O Aluga não lançou — não tem número para
   contar, e número emprestado é mentira.
2. **Sem comparação com concorrente.** `PRODUCT.md` diz que os termos do AluggaPro
   proíbem copiar interface, código e design.

**Nenhum controle morto.** Os atalhos da Visão geral ("Ver unidades", "Recebimentos") levam
a rolagem até a etapa da apresentação que demonstra aquele módulo — o número de telas vem
de `data-screens` no próprio tour, não de uma constante repetida. O "Adicionar tarefa"
acrescenta uma tarefa de verdade. O aviso do que aconteceu é **absoluto** e desaparece em
5s: em fluxo ele deslocaria o painel inteiro no meio da rolagem, e a etapa é sticky.

**O "pronto quando" da tarefa NÃO foi fechado:** ela depende de publicar no VPS, e o botão
precisa chegar a um **cadastro que ainda não existe**. O CTA hoje leva a
`/design-system/admin`, que é o login do template. Publicar e criar cadastro são do Richard.

**Validação do `82918a2`:** `check-tokens` 208 OK · `tsc --noEmit` limpo · `stylelint`
limpo (`oxlint` panica no HEAD também — é do ambiente, não do código) · `/`,
`/design-system` e `/design-system/admin` em HTTP 200 · as 3 imagens das casas em 200 com
`image/png` (1,6 MB / 709 KB / 1,8 MB) · rota temporária com os 4 beats empilhados: 4
legendas conferidas, 3 imagens por beat do Completo, `data-theme="dark"` no beat 3 e
`data-a11y="on"` no beat 4 · **matemática da progressão varrida px a px**: 10 estados,
nenhum perdido, subir é o inverso exato de descer, salto do topo ao fim não pula estado,
10 estados em viewports de 600 a 1440px, `goTo(i)` cai certo nas 7 etapas · zero ocorrência
de "progress", zero emoji, zero "PRODUCT" · **zero classe órfã** (39 no CSS, 39 usadas) ·
console do servidor sem erros.

### 4.9 Mensagens da régua D-3/D0/D+3 — tarefa 9 do Segundo Cérebro, FECHADA

**Arquivo:** `docs/messages/v1.md`. **Só redação — nenhuma tela, nenhuma imagem, nenhuma
alteração no Supabase.**

20 modelos de texto para o Richard colocar no fluxo n8n/Evolution:

| Bloco | IDs |
|---|---|
| Lembrete D-3 | `d3_v1` `d3_v2` `d3_v3` |
| Lembrete D0 | `d0_v1` `d0_v2` `d0_v3` |
| Lembrete D+3 | `dp3_v1` `dp3_v2` `dp3_v3` |
| Confirmação ao inquilino | `pay_v1` `pay_v2` `pay_v3` + `pay_partial` |
| "Recebeu?" ao proprietário | `recebeu_v1` `recebeu_v2` `recebeu_v3` |
| Respostas do sistema | `ok_sim` `ok_sim_v2` `ask_valor` `ask_1_2` |

**Regras que vieram da spec, não de mim:** agenda D-3/D0/D+3 só para cobranças sem
pagamento · 3 variações por momento (exigência da R5) · máximo 30 envios/dia com intervalo
aleatório · botão "Pausar envios" · sem conexão com o Mercado Pago, o lembrete leva a chave
Pix copia-e-cola · confiança baixa na leitura da resposta → *"Responda 1 para recebi, 2
para ainda não"*, que é frase literal da R6.

**O que não tem, de propósito:** multa, juros, mora, negativação — o Aluga não tem isso na
v1, e é justamente a régua jurídica do concorrente. Nenhum link de portal do inquilino,
que a spec marca como **v2**.

**5 decisões em aberto para o Richard** estão na seção 7 do arquivo. Enquanto não forem
respondidas, os textos já servem para teste manual.

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
14. **NUNCA use `var(--border)` — esse token não existe.** O certo é **`--border-subtle`**
    (ou `--border-default` / `--border-strong`). Errei isso na tela de Despesas e só peguei
    porque rodei o validador. **Outros tokens que já usei por engano e não existem:**
    `--text-primary`, `--tracking-wide`, `--space-12`, `--shadow-sm`, `--font-mono` (não há
    fonte mono no design system). → **Sempre** rodar o validador que cruza os `var(--…)` do
    CSS com os tokens definidos antes de commitar:

    ```python
    import io, re, glob
    defined = set()
    for f in glob.glob('design-system/tokens/*.css'):
        defined |= set(re.findall(r'^\s*(--[a-z0-9-]+)\s*:', io.open(f, encoding='utf-8').read(), re.M))
    css = io.open('design-system/templates/admin/Screens.module.css', encoding='utf-8').read()
    used = set(re.findall(r'var\((--[a-z0-9-]+)\)', css))
    print('invalidos:', sorted(used - defined))
    ```

15. **`rm -rf .next` com o servidor rodando faz o Turbopack entrar em pânico** e reiniciar.
    Não quebra — ele se recupera e serve 200 —, mas suja o log e pode mascarar um erro real
    de runtime. → Pare o servidor antes, ou ignore o pânico sabendo o que é.
16. **`.next` guarda rotas de validação já removidas.** O `tsc` passa a acusar
    `Cannot find module '.../valN/page.js'` — erro fantasma, o arquivo não existe mais.
    Aconteceu 2 vezes. → **`rm -rf .next` antes de rodar o `tsc`.**
17. **`python3` com `str.replace` sem acentos apaga os acentos do texto de interface.**
    Aconteceu no commit `528b6cc`: `label="Mes anterior"` entrou sem acento e teve que ser
    restaurado. → Ao gerar TSX por script, mantenha os acentos do português no bloco novo e
    confira com `grep` depois.
18. **Falso negativo na validação de HTML.** O React insere `<!-- -->` entre interpolações
    JSX, então `vence {dueLabel(c)}` vira `vence <!-- -->dia 5` no HTML servido. Procurar a
    string colada dá FALTA sem haver falha nenhuma. → Normalizar com
    `re.sub(r'<!--\s*-->', '', html)` **antes** de conferir. Aconteceu 3 vezes.
19. **`cd <dir> && <cmd>` falha repetidamente com `exit_code: null`** (4×, sempre no
    `npx tsc`). → Passe o diretório no parâmetro `cwd` da ferramenta em vez de encadear `cd`.
20. **Erro de TypeScript apontando linha sem string nenhuma** = aspa desequilibrada em
    outro lugar. Aconteceu no `SimpleModeScreen.tsx`: o `tsc` apontava "Unterminated string
    literal" na linha 129, que não tinha string. → **Contar aspas/backticks do arquivo antes
    de procurar.** Contando deu 27 (ímpar) e achei em 30 segundos.
21. **Calcular o esperado à mão antes de declarar FALTA na validação.** Em Cobranças, 4
    "FALTA" que eu ia commitar como bug eram dados meus errados: `R$ 3.200` estava errado
    (recebido = 1200+1000+400 = **R$ 2.600**), `Sala 2` é de 11/2026 e não aparece em
    10/2026, e "Registrar recebimento" só renderiza com o diálogo aberto. → A validação
    automática só é útil se o valor esperado estiver certo.

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
- **Último commit pushed: `dd1e841`** — *docs(messages): textos das mensagens da v1*.
  Junto foi `6b99c95`, que troca um `margin-top: 2px` cru pelo token `--space-0-5` no
  `PlanCard.module.css` (era o único erro do `stylelint`, pré-existente).
- Antes destes, `bee0a42` — docs de contexto refletindo a 10ª rodada da landing, e
  `82918a2` — *Tour: a última etapa agora é o painel e suas configurações, por rolagem*.
- O `main` do repo (`33f6853`) **não tem** nada desse trabalho. Para levar pra `main` é
  preciso autorização explícita do Rodrigo.

**Comandos para o Rodrigo pegar qualquer entrega:**

```powershell
cd "C:\Users\Digo Nego\Documents\Aluga-Richard-Rodrigo-importado"
git fetch origin
git pull origin arena/8e2745c8-aluga-richard-rodrigo-importad
npm install
npm run dev
```

(Se der `couldn't find remote ref`, é propagação da ref no GitHub — o `git fetch origin`
antes resolve. Depois **Ctrl+Shift+R**, porque o cache de CSS em dev segura a versão velha.)

**Linha do tempo dos commits** (todos pushed na branch da sessão):

| Commit | O que |
|---|---|
| `2564d06` `c48fdcb` `dd9db6e` `33ed4bd` | tokens de acessibilidade + docs sincronizados com o Drive |
| `81af208` | acessibilidade e tema como configuração no template |
| `c0025c8` | tela de planos (R$ 59/99/209/269) |
| `50bbffc` `d4eae79` | onboarding como estado de entrada |
| `e982dab` | identidade provisória + ícones PWA |
| `02578c2` | Completo passa a ser o padrão de exibição |
| `e7bdd27` | spec v1 atualizada |
| `f997f43` `528b6cc` | tela "Este mês" (Modo simples) + correção de tamanhos |
| `f4924d9` | tela de Cobranças (R3) |
| `c56e6c7` `59c7959` | tela de Recebimentos (R7) + correção de proporções |
| `50ebd2f` | tela de Inquilinos + componente `MaskedInput` |
| `8b1c812` | tela de Contratos |
| `b993638` | tela de Imóveis e Unidades |
| `ee8b8d4` | tela de Despesas + informe de IR (R8) |
| `0c1b092` → `2a2ae76` → `82918a2` | a landing, em 10 rodadas de revisão com o Rodrigo |

**A landing levou 10 rodadas.** Vale registrar o que foi ficando pelo caminho, porque cada
rodada ensinou uma coisa que não se vê no commit final:

| Rodada | O que o Rodrigo disse | O que isso ensinou |
|---|---|---|
| 1ª–3ª | *"nossa landing page está horrível, letras colada na tela"* · *"nas animações está tudo muito perto da outra, está muito poluído"* · *"animação está bem quadrada sem fluidez nenhuma"* | tela clean, **bordas menores ou sem borda**, **diminuir as artes para caber tudo no mesmo bloco** |
| 4ª | *"eu quero sem barras mas algo difetente do q fizemos ate agora"* | **barra de progresso de qualquer espessura está proibida** — foram 4 tentativas reprovadas |
| 5ª–6ª | *"o setor 'meu mes' pode entrar tambem junto mas com o dashboard mostrando o menu simples acessibilidade e tema escuro tambem"* · *"capriche nos textos apresentado esta muito robotico"* | os textos são **voz "você"**, uma frase por idéia, e o sistema raramente fala de si mesmo |
| 7ª | *"Não quero apenas uma animação decorativa"* · *"Não implemente um mecanismo que capture continuamente a rodinha do mouse"* | **sticky scrollytelling**: a rolagem do navegador comanda, não um timer |
| 8ª | *"use a tela real do Completo incluindo as imagens das casas"* · *"so copie a tela do painel nao invente nada"* | as telas embedadas são as **do produto**, não desenho delas |
| 9ª | *"toda essa area 'estes mês' eu quero junto com Animated Product Showcase... sempre comece com o modo completo"* | os quatro estados entram como **última etapa**, começando no Completo |
| 10ª | *"vc acabou fazendo outra animaçao embaixo de onde eu queria... o legal seria a explicaçao do site estar tudo no mesmo lugar"* | **nada de bloco separado**: uma explicação, um lugar |
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
- [ ] **Limpar o Painel (dashboard).** Única tela do painel que ainda mostra o template
      genérico: "Visitas", "Novos Contratos", "Manutenção", "Insights (Assistente IA)" e
      "Saúde Financeira" com percentil inventado. **É a próxima tarefa grande.**
- [ ] **Publicar no VPS e criar o cadastro** — a landing (`82918a2`) está pronta e aprovada
      pelo Rodrigo, mas o "pronto quando" da tarefa 7 depende de subir no subdomínio e de
      existir uma tela de cadastro para o botão "Começar teste grátis" chegar. Ambos são do
      Richard.
- [ ] **Revisar as 7 telas com o Rodrigo.** Roteiro em `ROTEIRO-REVISAO-TELAS.md`. Faltam
      testar com clique: diálogos de cadastro, CEP (Imóveis), limite do plano e download do
      CSV (Despesas).
- [ ] **Validar dígito verificador de CPF/CNPJ** — não existe em lugar nenhum do app.
      Decisão do Rodrigo pendente: se quer, e onde mora (regra de formulário, não máscara).
- [ ] **Informe de IR em PDF** — hoje sai em tabela e CSV. Falta o formato, não a
      informação.
- [x] **Sprint 2 do Segundo Cérebro — tarefa 9 (mensagens)** — **feita** em 29/10/2026.
      **20 modelos de texto** em `docs/messages/v1.md`: D-3/D0/D+3 com 3 variações cada,
      confirmação de pagamento ao inquilino e "Recebeu?" ao proprietário, mais as
      respostas do sistema. Nada de multa/juros/negativação (não é da v1) e nenhum link
      de portal do inquilino (é v2). 5 decisões em aberto para o Richard.
- [ ] **Sprint 2 — o que falta:** linguagem simples (10), que depende das telas, e as
      telas já estão prontas. Os tutoriais WhatsApp (8) e Mercado Pago (11) foram
      **pulados a pedido do Rodrigo** em 29/10/2026 — metade das imagens depende de
      prints do celular dele.

---

## 9. Backlog do Rodrigo — app "Segundo Cérebro"

O Rodrigo gerencia o projeto num kanban próprio, o **Segundo Cérebro**
(`dinastia-cerebro.b6sonj.easypanel.host/tarefas`, EasyPanel). Quadro `A fazer` /
`Aguardando`, **15 tarefas, ~58h**, todas "Quem faz: Rodrigo".

Inventário completo em **`SEGUNDO-CEREBRO-ATIVIDADES.md`**. O que importa para quem for
assumir:

**Sprints:** 1 → 06/11/2026 · 2 → 20/11/2026 · 3 → 04/12/2026 · Validação → 15/01/2027.

**Estado da Sprint 1 em 29/10/2026 — 4 das 6 tarefas fechadas:**

| # | Tarefa | Estado |
|---|---|---|
| 1 | Ajustar tokens de acessibilidade no DESIGN.md | **FEITA** (`2564d06`) — todos os critérios de aceite cumpridos, ver seção 4.1 |
| 2 | Pesquisa de nome: shortlist e consulta ao INPI | **em aberto** — é do Rodrigo e depende de consulta externa. Não bloqueia nada |
| 3 | Desenhar o onboarding | **FEITA** (`50bbffc` `d4eae79`), mas o "pronto quando: fluxo aprovado" não foi fechado |
| 4 | Identidade provisória 'Aluga' e ícone do PWA | **FEITA** (`e982dab`) |
| 5 | Desenhar as telas da v1 a partir dos templates | **FEITA** (`f997f43` … `ee8b8d4`) — 7 telas, ver seção 4.7. Aprovação do Richard pendente |
| 6 | *(título cortado — card de 4h)* | **desconhecida** |

A tarefa 1 era dependência da 5. Com as duas fechadas, **a Sprint 1 está praticamente
fechada** — falta só a 2 (nome) e a 6 (título desconhecido).

**Sprint 2 — iniciada:**

| # | Tarefa | Estado |
|---|---|---|
| 7 | Landing page 'Aluga' na página inicial | **FEITA E APROVADA** (`82918a2`, 10 rodadas de revisão) — ver seção 4.8. Falta publicar no VPS e criar o cadastro, ambos do Richard |
| 8 | Tutorial 'Conectar WhatsApp' | em aberto |
| 9 | Mensagens (D-3/D0/D+3, confirmação, "Recebeu?") | em aberto |
| 10 | Textos do app em linguagem simples | em aberto |
| 11 | Tutorial 'Conectar Mercado Pago' | em aberto |

A landing só pôde ser feita **depois** das 7 telas, e não antes: a restrição *"Só componentes
e tokens do design system"* faz dela a prova de que o design system se sustenta sozinho, e
foram as telas que criaram os componentes que ela reusa (`PricingTable`, `HowItWorks`,
`SimpleModeScreen`).

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

**Consequência para o template do painel — JÁ APLICADA:** o template **encolheu** para o
vocabulário da v1. As 7 telas novas usam `Proprietário/Imóvel/Unidade/Inquilino/Contrato/
Cobrança/Recebimento`, e o "Financeiro" do rail virou **Recebimentos**. O que sobrou do
template genérico é o **Painel** (dashboard) e **Manutenção** — e Manutenção não existe no
produto (está fora do vocabulário da v1). Ver a tabela de gap na seção 6 do
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
    useSettings.ts             ← localStorage aluga_a11y / aluga_theme / aluga_view
    useBreakpoint.ts  data.ts  index.ts  README.md

  templates/admin — telas da v1 (novas, todas validadas):
    SimpleModeScreen.tsx      ← "Este mês" (Modo simples, R7)      + simpleModeData.ts
    ChargesScreen.tsx         ← Cobranças (R3)                     + chargesData.ts
    FinanceScreen.tsx         ← Recebimentos (R7)                  + receiptsData.ts
    TenantsScreen.tsx         ← Inquilinos (R2)                    + tenantsData.ts
    ContractsScreen.tsx       ← Contratos (R2)                     + contractsData.ts
    PropertiesScreen.tsx      ← Imóveis e Unidades (R2)            + propertiesData.ts
    ExpensesScreen.tsx        ← Despesas + informe IR (R8)         + expensesData.ts
    PlansScreen.tsx           ← Planos (R$ 59/99/209/269)
    OnboardingScreen.tsx      ← estado de entrada (5 passos)

  templates/admin — ainda do template genérico (a limpar):
    DashboardScreen.tsx       ← Painel: cards "Visitas", "Novos Contratos", "Manutenção",
                                "Insights (Assistente IA)", "Saúde Financeira" — NÃO existem
                                no produto. Próxima tarefa grande.
    MaintenanceScreen.tsx     ← Manutenção não existe no vocabulário da v1
    AnalyticsScreen.tsx  LoginScreen.tsx

  components — novos na tarefa 5:
    forms/MaskedInput.tsx     ← máscaras cpf / cnpj / phone / cep
    data/StepChecklist.tsx    ← checklist de 5 passos do onboarding
    marketing/PlanCard.tsx    PricingTable.tsx
  components — novos na tarefa 7 (landing):
    marketing/HowItWorks.tsx  ← "como funciona (3 passos)" da landing
    marketing/ProductTour.tsx ← a apresentação de 7 etapas comandada pela rolagem.
                                 Aceita `beats?` por etapa: a 7ª etapa tem 4 beats e
                                 ocupa 4 telas de rolagem (Completo → Simples →
                                 tema escuro → letra maior).
docs/
    specs/v1.md                 ← especificação da v1 (R1–R10)
    messages/v1.md              ← 20 modelos de mensagem da régua D-3/D0/D+3 (tarefa 9)
src/app/
    page.tsx  LandingScreen.tsx  page.module.css   ← landing em "/" (só tokens)
    PanelModes.tsx                ← os 4 estados do painel, última etapa do tour.
                                      Renderiza SimpleModeScreen e DashboardScreen
                                      reais, com data-theme / data-a11y na moldura.
    design-system/
      page.tsx  Showcase.tsx  Showcase.module.css
      admin/page.tsx        ← renderiza <AdminApp />
```

**Apagados na 10ª rodada (não existem mais):** `src/app/MeuMesDemo.tsx` e
`src/app/ProductShowcase.tsx`. Nada os referencia.

**Rotas temporárias de validação:** quando uma tela nova precisa ser validada em tela, eu
crio `src/app/design-system/valNN/page.tsx`, dou `curl`, confiro o HTML servido e **removo
a rota**. `val3` a `val13` já foram todas removidas. Se você encontrar uma pasta `val*` no
repo, é lixo — apague.
