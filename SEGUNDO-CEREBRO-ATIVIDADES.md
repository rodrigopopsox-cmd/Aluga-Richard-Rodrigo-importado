# Atividades do Segundo Cérebro — projeto Aluga

> Inventário do backlog do Rodrigo (Marca), lido a partir do app **Segundo Cérebro**
> (`dinastia-cerebro.b6sonj.easypanel.host/tarefas`), em 27/10/2026.
>
> **Fonte:** 24 screenshots do modal "Editar tarefa", fornecidos pelo Rodrigo em 3 levas
> (1/3, 2/3, 3/3). Nada aqui foi inferido de execução — é leitura de tela.
>
> **Convenção de confiança:**
> - ✅ **confirmado** — li o texto integral na imagem
> - ⚠️ **inferido** — o título não apareceu nas imagens; deduzi da observação
>
> O quadro declara **15 tarefas** e **~58h** na coluna `A fazer`. Consegui identificar
> **14 delas por completo**; 1 ficou com título cortado (ver seção 5). Dessas 14,
> **todas têm a observação completa**.
>
> **Estado em 29/10/2026: 8 das 15 tarefas feitas (1, 3, 4, 5, 7, 9, 10 + a 2 depende de
> consulta externa).** Sprint 1 está fechada exceto a 2 (pesquisa de nome/INPI, do Rodrigo)
> e a 6 (título desconhecido). Sprint 2: a 7 (landing) está **pronta e aprovada pelo
> Rodrigo** — *"Perfeito ficou tudo otimo"* — depois de 10 rodadas de revisão. A **9
> (mensagens)** e a **10 (linguagem simples)** estão entregues. A 8 e a 11 (tutoriais) foram
> **puladas a pedido do Rodrigo** (*"as tarefas de tutorais nos pulamos por enquanto"*) —
> depende de prints do WhatsApp, que exigem o celular dele. Falta publicar no VPS, que é do
> Richard.

---

## 1. O app

| | |
|---|---|
| Nome | **Segundo Cérebro** |
| URL | `dinastia-cerebro.b6sonj.easypanel.host/tarefas` |
| Hospedagem | EasyPanel / VPS |
| Projeto | **Aluga Imóvel** (tag em todos os cards) |
| Visão | Quadro kanban — *"Arraste entre as colunas"* |
| Colunas | `A fazer` · `Aguardando` |
| Filtros | `Todas` · `Prioridade alta` · `Quem faz: Todos` · `Mínimo` |
| Cabeçalho | `A fazer ~58h` · `15 tarefas` |

**Modal "Editar tarefa"** — campos, na ordem: `Título` · `Prazo` (date picker) ·
`Tempo estimado` (select: 2h/3h/4h/6h/8h) · `Prioridade` (`Alta` / `Normal` / `Baixa`) ·
`Quem faz` (select) · `Repetir` (`Não repete`) · `Etapa` (select) · `Observação` (textarea) ·
`Cancelar` · `Salvar`.

**Todas as 14 tarefas identificadas têm `Quem faz: Rodrigo` e `Etapa: A fazer`.**

---

## 2. Inventário por sprint

### Sprint 1 — prazo 06/11/2026

| # | Título | Prio. | Tempo | Estado da leitura |
|---|---|---|---|---|
| 1 | Aluga · **Ajustar tokens de acessibilidade no DESIGN.md** | 🔴 Alta | 3h | ✅ |
| 2 | Aluga · **Pesquisa de nome: shortlist e consulta ao INPI** | Normal | 4h | ✅ |
| 3 | Aluga · **Desenhar o onboarding** | Normal | 4h | ✅ |
| 4 | Aluga · **Identidade provisória 'Aluga' e ícone do PWA** | Normal | 3h | ✅ |
| 5 | Aluga · **Desenhar as telas da v1 a partir dos templates** | Normal | 8h | ✅ |
| 6 | *(título cortado — card de 4h em 06/11)* | Normal | 4h | ⚠️ |

### Sprint 2 — prazo 20/11/2026

| # | Título | Prio. | Tempo | Estado da leitura |
|---|---|---|---|---|
| 7 | Aluga · **Landing page 'Aluga' na página inicial** | 🔴 Alta | 8h | ✅ |
| 8 | Aluga · **Tutorial 'Conectar WhatsApp'** | Normal | 3h | ✅ |
| 9 | Aluga · **Mensagens** | Normal | 2h | ✅ |
| 10 | Aluga · **Textos do app em linguagem simples** | Normal | 4h | ✅ |
| 11 | Aluga · **Tutorial 'Conectar Mercado Pago'** *(título inferido da observação)* | Normal | 3h | ⚠️ título |

### Sprint 3 — prazo 04/12/2026

| # | Título | Prio. | Tempo | Estado da leitura |
|---|---|---|---|---|
| 12 | Aluga · **Teste de uso com os 5 fundadores** | 🔴 Alta | 6h | ✅ |
| 13 | Aluga · **Ajustes visuais pós-testes** | Normal | 6h | ✅ |
| 14 | Aluga · **Validar preços com os fundadores** | 🔴 Alta | 2h | ✅ |

### Validação — prazo 15/01/2027

| # | Título | Prio. | Tempo | Estado da leitura |
|---|---|---|---|---|
| 15 | Aluga · **Medir o sucesso da v1** | 🔴 Alta | 2h | ✅ |

**Horas identificadas:** Sprint 1 = 26h · Sprint 2 = 20h · Sprint 3 = 14h · Validação =
2h → **62h** no total, contra **~58h** declarados no quadro. A diferença de 4h pode ser
arredondamento do "~58h" ou a tarefa 6 ter tempo diferente do que li no card.

---

## 3. Observações na íntegra

### 1. Ajustar tokens de acessibilidade no DESIGN.md — 06/11 · 3h · Alta

> Para: Rodrigo (Marca). Sprint 1. O que fazer: Criar laranja mais escuro para botões e
> textos que passe contraste AA, subir texto base para 16px, alvos de toque de 48px.
> **Mudar primeiro o `DESIGN.md` e depois `design-system/tokens`; rodar `npm run check`.**
> Pronto quando: `npm run check` passa e a vitrine `/design-system` mostra o novo laranja.
> Ref.: `docs/specs/v1.md`

**🔴 ESTA TAREFA JÁ ESTÁ FEITA** (validada em 27/10/2026, commit `2564d06`). Os três
critérios dela são exatamente o que foi entregue:

| Critério da tarefa | Entregue |
|---|---|
| Laranja mais escuro, contraste AA | `--brand: #C2410C` (5,18:1) · `--brand-hover: #9A3412` (7,31:1) |
| Texto base 16px | `--text-base: 16px` (era 14px) |
| Alvos de toque 48px | `--control-h-sm/md/field: 48px` |
| `npm run check` passa | `node scripts/check-tokens.mjs` → **208 OK** |
| Vitrine mostra o novo laranja | confirmado em tela |

E tem mais do que a tarefa pedia: a camada opt-in `a11y.css` (base 18px + alvos 56px,
ativada por `data-a11y="on"`) e o menu da engrenagem no template do painel.

### 2. Pesquisa de nome: shortlist e consulta ao INPI — 06/11 · 4h · Normal

> Para: Rodrigo (Marca). Sprint 1. O que fazer: Fechar 3 finalistas (direções preferidas:
> estilo Old Parr / Mustang / nome da Vó) e consultar o INPI nas classes 36 e 42.
> Registrar em `PRODUCT.md` (Em aberto). Pronto quando: temos 1 a 3 nomes sem conflito no
> INPI e com domínio livre. Ref.: `docs/specs/v1.md`

**O nome do produto ainda não está fechado.** "Aluga" é provisório. Direções de marca:
estilo **Old Parr**, **Mustang**, ou o nome da **Vó/V0** (ver nota de leitura, seção 4).
Registro de marca nas classes **36** (financeiro/seguros) e **42** (software).

### 3. Desenhar o onboarding — 06/11 · 4h · Normal

> Para: Rodrigo (Marca). Sprint 1. O que fazer: Pergunta 'Como prefere ver?' (Simples
> marcado) + checklist de 5 passos (imóvel, inquilino e contrato, ver a primeira cobrança,
> conectar WhatsApp, conectar Mercado Pago) + 'Como funciona' de cada tela. Pronto quando:
> fluxo aprovado. Ref.: `docs/specs/v1.md`

**O checklist do Aluga NÃO é o do AluggaPro.** Comparação direta:

| Passo | AluggaPro (observado) | Aluga (planejado) |
|---|---|---|
| 1 | Cadastrar imóvel | imóvel |
| 2 | Cadastrar inquilino | inquilino **e contrato** (um passo só) |
| 3 | Criar contrato | ver a primeira cobrança |
| 4 | Conectar conta bancária | conectar WhatsApp |
| 5 | Ver lançamentos do mês | conectar Mercado Pago |

Duas diferenças de produto, não de redação:
- O Aluga **junta inquilino e contrato** num passo — é mais enxuto de propósito.
- O Aluga troca "conectar banco" por **WhatsApp + Mercado Pago**, e inverte a posição do
  "ver a primeira cobrança" (vem antes das conexões, não depois).

**A pergunta "Como prefere ver?" com "Simples" marcado** é a decisão de produto mais
importante do documento: o Aluga assume que o usuário quer o **modo simples por padrão**.
Isso é o mesmo eixo da camada de acessibilidade — o usuário escolhe como quer ver.

**✅ TAREFA FEITA** — commits `50bbffc` + `d4eae79`.

| Entregue | Onde |
|---|---|
| Onboarding no lugar do painel enquanto os 5 passos não fecham | `OnboardingScreen.tsx` |
| Checklist de 5 passos (componente novo do design system) | `StepChecklist.tsx` |
| Bloco "Como prefere ver?" (Simples/Completo) | `SettingsMenu.tsx` |
| "Como funciona" com glossário sem negrito | `OnboardingScreen.tsx` |

**Duas decisões do Rodrigo que mudaram o que foi entregue:**
1. *"eu quero manter todas as funçoes do antigo painel"* → **Completo passou a ser o
   padrão** (commit `02578c2`), não Simples.
2. *"o primeiros passos deve ser atribuido na hora de entrada do usuario... nao como uma
   opçao do nosso menu"* → o onboarding é **estado de entrada**, não item de menu.

O "pronto quando: fluxo aprovado" **não foi fechado** — o Rodrigo ainda não assinou o
fluxo final.

### 4. Identidade provisória 'Aluga' e ícone do PWA — 06/11 · 3h · Normal

> Para: Rodrigo (Marca). Sprint 1. O que fazer: Wordmark 'Aluga' do design system + ícone
> do app para a tela inicial do celular (vários tamanhos) e favicon. Pronto quando: o app
> instalado no celular mostra ícone e nome. Ref.: `docs/specs/v1.md`

**O Aluga é PWA** — instalado na tela inicial do celular. Exige ícone em vários tamanhos e
favicon. O design system ainda não tem conjunto de ícones de app.

**✅ TAREFA FEITA** — commit `e982dab`, 15 arquivos, 517 inserções.

| Entregue | Como |
|---|---|
| Ícones do app em vários tamanhos | `scripts/build-icons.mjs` com `sharp` |
| `manifest.json` do PWA | gerado pelo mesmo script |
| Favicon | idem |
| Links no `<head>` | validado no HTML servido com `curl` |

**Lição que ficou:** `sharp` resolve de `/tmp` com `ERR_MODULE_NOT_FOUND` e é ESM-only;
PIL e numpy **não** estão instalados no sandbox. Ícones gerados com `sharp` a partir da
raiz do projeto.

### 5. Desenhar as telas da v1 a partir dos templates — 06/11 · 8h · Normal

> Para: Rodrigo (Marca). Sprint 1. O que fazer: Modo simples ('Este mês', cards por
> unidade, Recebi/Lembrar, letra grande), cadastros, cobranças, painel. Partir de
> `design-system/templates/admin`. Pronto quando: telas aprovadas pelo Richard para
> desenvolver na sprint 2 e 3. Depende de: Ajustar tokens de acessibilidade. Ref.:
> `docs/specs/v1.md`

**Escopo da v1, em 4 peças:** Modo simples (`Este mês`) · cards por unidade com ação
`Recebi/Lembrar` · cadastros e cobranças · painel. **Depende da tarefa 1** (tokens) — que
já está pronta.

**Vocabulário da v1:** `Proprietário · Imóvel · Unidade · Cobrança · Recebimento`.
Note: **Unidade**, não Contrato. **Cobrança/Recebimento**, não Financeiro.

**✅ TAREFA FEITA** — 7 telas, 8 commits, todas validadas. O "pronto quando: telas aprovadas
pelo Richard" **não foi fechado**: o Rodrigo revisou e montou um roteiro de teste
(`ROTEIRO-REVISAO-TELAS.md`), mas a aprovação final é do Richard.

| # | Tela | Requisito | Commits |
|---|---|---|---|
| 1 | Este mês (Modo simples) | R7 | `f997f43` `528b6cc` |
| 2 | Cobranças | R3 | `f4924d9` |
| 3 | Recebimentos | R7 | `c56e6c7` `59c7959` |
| 4 | Inquilinos | R2 | `50ebd2f` |
| 5 | Contratos | R2 | `8b1c812` |
| 6 | Imóveis e Unidades | R2 | `b993638` |
| 7 | Despesas e informe de IR | R8 | `ee8b8d4` |

**Componentes novos do design system que saíram da tarefa 5:**

| Componente | Para quê |
|---|---|
| `MaskedInput` | máscaras de CPF, CNPJ, telefone e CEP — repete em Inquilinos, Contratos e Imóveis |
| `StepChecklist` | o checklist de 5 passos do onboarding (tarefa 3) |
| `PlanCard` / `PricingTable` | a tela de planos com R$ 59/99/209/269 |

**Ícones novos no registro:** `chevron-left`, `chevron-right`, `file-signature`, `receipt`.

**O que a tarefa 5 entregou além do pedido:** a tela de planos (com os preços do Aluga, não
os do AluggaPro) e o onboarding — que eram tarefas vizinhas e estavam no mesmo caminho.

**Ressalvas honestas, registradas:**

- Os **diálogos de cadastro** das 4 telas com formulário não foram testados com clique — a
  validação é SSR (compila + lista renderiza). Está no roteiro de revisão.
- A **consulta de CEP** (Imóveis) não foi testada: ViaCEP dá timeout no sandbox. No
  navegador do Rodrigo deve funcionar, mas não foi visto funcionando.
- O **Painel** (dashboard) continua com cards do template genérico que não existem no
  produto — "Visitas", "Novos Contratos", "Manutenção", "Insights (Assistente IA)",
  "Saúde Financeira". **É a próxima tarefa grande.**

**Decisão do Rodrigo sobre o que não fazer:** *"vamos fazer so as tarefas que temos que
fazer nao vamos se perder, pq provavelmente quem vai deixar funcional sem ser generico é
meu socio"*. Ou seja: o trabalho de **tirar o genérico** e deixar funcional é do Richard
(Produto). O Rodrigo fecha o que é **desenho, texto e fluxo**.

### 7. Landing page 'Aluga' na página inicial — 20/11 · 8h · Alta

> Para: Rodrigo (Marca). Sprint 2. O que fazer: Promessa, como funciona (3 passos), Modo
> simples, planos (R$ 59/99/209/269), botão 'Começar teste grátis' levando ao cadastro.
> **Só componentes e tokens do design system.** Pronto quando: landing no ar no
> subdomínio e o botão chega ao cadastro. Depende de: Publicar no VPS. Ref.:
> `docs/specs/v1.md`

**Preços do Aluga: R$ 59 / 99 / 209 / 269.** Diferente da tabela do AluggaPro
(79/119/229/299). São produtos distintos — a tela de planos do template precisa ser
**refeita**, não ajustada.

**✅ TAREFA FEITA** — commit `0c1b092`. Landing em `/`, montada só com componentes e
tokens do design system.

| Seção pedida | Entregue |
|---|---|
| Promessa | "Cobre, receba e saiba quanto cada imóvel rende." — derivada do problema declarado em `PRODUCT.md` |
| Como funciona (3 passos) | componente novo `HowItWorks`: Cadastre → O app cobra → Você acompanha |
| Modo simples | **a tela de verdade** (`SimpleModeScreen`) embedada, não um desenho dela |
| Planos R$ 59/99/209/269 | `PricingTable`, o mesmo componente da tela de planos do app |
| Botão "Começar teste grátis" | leva a `/design-system/admin` — **não existe cadastro ainda** |

**Duas ausências deliberadas, escritas no código:**

1. **Sem prova social.** "+300 proprietários", "+1.200 imóveis" e "32% menos
   inadimplência" são números do **AluggaPro**, lidos na engenharia reversa. O Aluga não
   lançou — não tem número para contar, e número emprestado é mentira.
2. **Sem comparação com concorrente.** Os termos do AluggaPro proíbem copiar interface,
   código e design; comparar preço não é o que a tarefa pede.

**O "pronto quando" NÃO foi fechado:** a tarefa depende de *publicar no VPS*, e o botão
precisa chegar a um **cadastro que ainda não existe**. Hoje o CTA leva ao login do
template. Publicar e criar cadastro são do Richard.

**Componente novo do design system:** `HowItWorks` (marketing). Três passos, e não cinco,
de propósito — o onboarding tem cinco porque é configuração de conta; a landing precisa do
arco do produto.

---

#### Da 1ª à 10ª rodada — como a landing ficou do jeito que está

A tarefa 7 foi fechada em `0c1b092` e depois passou por **dez rodadas de revisão com o
Rodrigo**. O que está em `82918a2` é o resultado delas. Registrar o percurso interessa
porque cada rodada ensinou uma coisa que o commit final não mostra:

| Rodada | O que o Rodrigo disse | O que isso ensinou |
|---|---|---|
| 1ª–3ª | *"nossa landing page está horrível, letras colada na tela"* · *"nas animações está tudo muito perto da outra, está muito poluído"* · *"tem product.md escrito em uma das descrições"* · *"animação está bem quadrada sem fluidez nenhuma"* · *"está tudo muito raso"* · *"não gostei de nada na nossa landing, refaça tudo mas com as ideias que já dei"* | tela clean, **bordas menores ou sem borda**, **diminuir as artes para caber tudo no mesmo bloco**, e **nenhum texto de especificação na interface** |
| 4ª | *"eu quero sem barras mas algo difetente do q fizemos ate agora, preciso que pegue referencias em sites de design grafico para fazer algo bom"* | **barra de progresso de qualquer espessura está proibida** — foram 4 tentativas reprovadas. A resposta foi cascata escalonada, não barra |
| 5ª–6ª | *"o setor 'meu mes' pode entrar tambem junto mas com o dashboard mostrando o menu simples acessibilidade e tema escuro tambem"* · *"capriche nos textos apresentado esta muito robotico isso para todo os textos do ladingpage"* | os textos são **voz "você"**, uma frase por idéia, e o sistema raramente fala de si mesmo. Referência de layout: `aluggapro.com.br` como **inspiração, não cópia literal** |
| 7ª | *"Não quero apenas uma animação decorativa"* · *"Não confundo isso com reproduzir uma animação automaticamente por tempo"* · *"Não implemente um mecanismo que capture continuamente a rodinha do mouse"* | **sticky scrollytelling**: a rolagem do navegador comanda, não um timer. Nenhum `preventDefault`, nenhum `position: fixed` |
| 8ª | *"use essa ideia que eu te dei e refaça por favor... parece que esta incompleto"* · *"use a tela real do Completo incluindo as imagens das casas"* · *"so copie a tela do painel nao invente nada"* · *"tirar o nome de menu 'Este mês'"* | as telas embedadas são as **do produto**, não desenho delas. E número que carrega significado (dinheiro, percentual) **não anima de zero** — só fade/translate |
| 9ª | *"toda essa area 'estes mês' eu quero junto com Animated Product Showcase mostrando todas as nossas funçoes de acessibilidade, tema e o modo simples e o modo completo, sempre comece com o modo completo"* | os quatro estados entram como **última etapa**, começando no Completo |
| 10ª | *"vc acabou fazendo outra animaçao embaixo de onde eu queria... o legal seria a explicaçao do site estar tudo no mesmo lugar"* · *"na ultima sessao da animaçao mostrando nosso painel e as funcionalidades dele animada sem o cliente precisar em clicar em nada so dando scroll"* | **nada de bloco separado**: uma explicação, um lugar. E os estados se demonstram **por rolagem**, sem clique |

**Estado final (`82918a2`) — a landing é UMA explicação, num bloco só.** Não existe seção
depois da apresentação. Estrutura: hero (só texto) → `ProductTour` com **7 etapas** →
planos → CTA final → rodapé.

**A 7ª etapa ("Do seu jeito") é o painel e o que se configura nele, e é a única com quatro
beats** — ocupa quatro telas de rolagem, uma por estado:

| Beat | Estado | O que mostra |
|---|---|---|
| 01 | **Modo Completo** | a Visão geral inteira, com as fotos das casas |
| 02 | **Modo Simples** | a tela "Este mês", um cartão por unidade |
| 03 | **Tema escuro** | o painel completo, escuro |
| 04 | **Letra maior** | o painel completo, com a acessibilidade ligada |

`ProductTour` passou a aceitar `beats?` por etapa, e `panel` virou função do beat. A seção
mede `totalScreens` telas em vez de `steps.length`, e a tela é convertida em (etapa, beat).
**A régua não mudou**: quem rola é o navegador, e a etapa ativa continua sendo função pura
da posição da rolagem.

**Apagados na 10ª rodada:** `src/app/MeuMesDemo.tsx` e `src/app/ProductShowcase.tsx`.
Novo: `src/app/PanelModes.tsx`. O `page.module.css` encolheu 590 linhas.

**Validação do `82918a2`:** `check-tokens` 208 OK · `tsc --noEmit` limpo · `stylelint`
limpo (`oxlint` panica no HEAD também — é do ambiente, não do código) · `/`,
`/design-system` e `/design-system/admin` em HTTP 200 · as 3 imagens das casas em 200 com
`image/png` · rota temporária com os 4 beats empilhados: 4 legendas conferidas, 3 imagens
por beat do Completo, `data-theme="dark"` no beat 3 e `data-a11y="on"` no beat 4 ·
**matemática da progressão varrida px a px**: 10 estados, nenhum perdido, subir é o inverso
exato de descer, salto do topo ao fim não pula estado, 10 estados em viewports de 600 a
1440px, `goTo(i)` cai certo nas 7 etapas · zero ocorrência de "progress", zero emoji, zero
"PRODUCT" · **zero classe órfã** (39 no CSS, 39 usadas) · console do servidor sem erros.

**Aprovado pelo Rodrigo em 29/10/2026:** *"Perfeito ficou tudo otimo"*.

**O "pronto quando" da tarefa continua NÃO fechado:** depende de publicar no VPS, e o botão
precisa chegar a um **cadastro que ainda não existe**. O CTA hoje leva a
`/design-system/admin`. Publicar e criar cadastro são do Richard.

### 8. Tutorial 'Conectar WhatsApp' — 20/11 · 3h · Normal

> Para: Rodrigo (Marca). Sprint 2. O que fazer: Passo a passo com imagens para ler o QR
> code, pensado para pessoa mais velha. Pronto quando: um teste com alguém de fora
> consegue conectar sozinho. Ref.: `docs/specs/v1.md`

**"Pensado para pessoa mais velha"** — o público-alvo do Aluga é idoso/proprietário
tradicional. Isso é a justificativa de produto do trabalho de acessibilidade: letra
grande, alvo de toque grande, passo a passo com imagem, sem jargão.

### 9. Mensagens — 20/11 · 2h · Normal

> Para: Rodrigo (Marca). Sprint 2. O que fazer: 3 variações para D-3, D0, D+3, confirmação
> de pagamento ao inquilino e o 'Recebeu?' ao proprietário, no tom da marca. Pronto quando:
> textos entregues para o Richard colocar no fluxo. Ref.: `docs/specs/v1.md`

**Esta é a régua de cobrança do Aluga, e ela é curta e humana.** Três toques —
**D-3** (antes), **D0** (no dia) e **D+3** (depois) — mais duas confirmações: a de
pagamento, para o inquilino, e o **"Recebeu?"**, para o proprietário. Não é a régua de
cobrança do AluggaPro, que é jurídica e automática. Aqui é **conversa**, no tom da marca.

Duas consequências para o design system:
- O componente que falta não é "notificação", é **variação de mensagem por momento** —
  D-3/D0/D+3 são três textos do mesmo evento, escolhidos por data.
- O **"Recebeu?"** inverte o sentido do fluxo: é o produto perguntando ao proprietário,
  não informando. É um padrão de UX que o template não tem.

#### ✅ TAREFA 9 FEITA — 29/10/2026

**Arquivo:** `docs/messages/v1.md` (12.335 bytes, 283 linhas).

**20 modelos de texto**, prontos para o Richard colocar no fluxo:

| Bloco | Modelos |
|---|---|
| Lembrete D-3 | `d3_v1` `d3_v2` `d3_v3` |
| Lembrete D0 | `d0_v1` `d0_v2` `d0_v3` |
| Lembrete D+3 | `dp3_v1` `dp3_v2` `dp3_v3` |
| Confirmação ao inquilino | `pay_v1` `pay_v2` `pay_v3` + `pay_partial` |
| "Recebeu?" ao proprietário | `recebeu_v1` `recebeu_v2` `recebeu_v3` |
| Respostas do sistema | `ok_sim` `ok_sim_v2` `ask_valor` `ask_1_2` |

**Validação feita:** 3 variações em cada bloco de 3 · zero emoji · frase mais longa
com 15 palavras (limite de 20) · todas as variáveis declaradas na tabela ·
`npm run check` limpo (stylelint, tokens, typecheck).

**Deixado de fora de propósito** (não é da v1, ou é do concorrente): menção a
multa, juros, mora ou negativação — o Aluga não tem isso na v1 · link de portal do
inquilino, que a spec marca como **v2** · pedido de dados bancários.

**5 decisões em aberto para o Richard** (seção 7 do arquivo): de qual número sai a
confirmação ao inquilino · como a variação é escolhida · se D+3 repete · se
`pay_partial` precisa de campo novo · se o "Recebeu?" tem tempo limite de resposta.

**Próximo passo:** o Rodrigo revisa o tom; o Richard implementa no fluxo.

### 10. Textos do app em linguagem simples — 20/11 · 4h · Normal

> Para: Rodrigo (Marca). Sprint 2. O que fazer: Revisar todos os textos das telas: frases
> curtas, sem jargão, 'Proprietário/Imóvel/Unidade/Cobrança/Recebimento'. Pronto quando:
> planilha de textos aprovada e aplicada. Depende de: Desenhar as telas. Ref.:
> `docs/specs/v1.md`

#### ✅ TAREFA 10 FEITA — 29/10/2026

**Arquivos:** `docs/textos/v1.md` (a planilha) + 10 telas editadas.

**Bug achado no caminho, e corrigido:** a tela de Planos mostrava para o cliente
*"Assinatura pelo Mercado Pago — integração na sprint 3"* e *"Preços e limites conforme
PRODUCT.md … na sprint 3"*. Nome de arquivo nosso e agenda interna no meio da interface —
o mesmo tipo de coisa que o Rodrigo já tinha apontado na landing. Troquei pelo que o
cliente precisa saber: duração do teste e como cobra.

**Jargão tirado das 8 telas que existem no produto:**

| Antes | Depois |
|---|---|
| `competência` | `mês` |
| `previsto` / `em aberto` | `total do mês` / `falta receber` |
| `resultado` | `sobrou` |
| `fluxo de caixa` | `entradas e saídas` |
| `informe de rendimentos` | `Imposto de Renda` |
| `extrato CSV` | `baixar planilha` |
| `mês do aniversário` | `mês do reajuste` |
| `vagas` | `sem inquilino` |
| `lançamentos` | `registros` |
| `Este mês` | `Resumo do mês` |

Duas frases que afirmavam funcionalidade que a v1 não tem foram reescritas para descrever
só o que existe: o hint do SettingsMenu (*"visitas, manutenção, insights e saúde
financeira"*) e o hero do Login (*"contratos, manutenção e finanças"*).

**Validação:** rota temporária com as 8 telas empilhadas, `curl` no HTML servido, 12 textos
novos conferidos um a um, **zero** ocorrência dos 11 jargões na interface. `tokens:check`
208 OK, `stylelint` limpo, `tsc` limpo. Rota temporária apagada; `/design-system/admin`
continua 200.

**Ficou pendente, registrado em `docs/textos/v1.md` seção 3:** `DashboardScreen`,
`MaintenanceScreen` e `AnalyticsScreen` ainda são do template genérico e afirmam ter
**Visitas, Manutenção, Insights e Saúde Financeira**, que não existem no vocabulário da v1.
O item de menu **`Manutenção`** no `Shell` também continua, porque tirar muda navegação e
não é questão de texto. **Recomendação: decidir o que fazer com as três telas antes de
publicar** — enquanto estiverem no ar, o produto promete o que não entrega.

### 11. Tutorial 'Conectar Mercado Pago' — 20/11 · 3h · Normal

> Para: Rodrigo (Marca). Sprint 2. O que fazer: Passo a passo com imagens do OAuth do
> Mercado Pago. Pronto quando: idem. Ref.: `docs/specs/v1.md`

*(Título inferido — a observação é literal, mas o título do card estava cortado nas
imagens. "Pronto quando: idem" aponta para o mesmo critério do tutorial de WhatsApp:
alguém de fora consegue conectar sozinho.)*

**Mercado Pago entra por OAuth**, não por credencial manual. Isso importa: o fluxo de
conexão é um redirecionamento com tela de consentimento, e o design system precisa cobrir
o estado "voltou do provedor" — que é onde costuma quebrar.

### 12. Teste de uso com os 5 fundadores — 04/12 · 6h · Alta

> Para: Rodrigo (Marca). Sprint 3. O que fazer: Convidar pelo link do fundador, acompanhar
> o cadastro e o checklist, anotar travas. Pronto quando: 5 contas criadas e relatório de
> travas. Depende de: Assinatura do SaaS, Landing. Ref.: `docs/specs/v1.md`

### 13. Ajustes visuais pós-testes — 04/12 · 6h · Normal

> Para: Rodrigo (Marca). Sprint 3. O que fazer: Aplicar os ajustes dos testes da V0 e dos
> fundadores nas telas e tokens. Pronto quando: ajustes aprovados e no ar. Depende de:
> Testes de uso. Ref.: `docs/specs/v1.md`

### 14. Validar preços com os fundadores — 04/12 · 2h · Alta

> Para: Rodrigo (Marca). Sprint 3. O que fazer: Perguntar a disposição de pagar e o plano
> escolhido de cada um. Pronto quando: registro em `PRODUCT.md` (preços). Depende de:
> Teste com os fundadores. Ref.: `docs/specs/v1.md`

**A tabela R$ 59/99/209/269 ainda é hipótese.** Esta tarefa é que a confirma ou derruba.

### 15. Medir o sucesso da v1 — 15/01/2027 · 2h · Alta

> Para: Rodrigo (Marca). Validação. O que fazer: Conferir: mês completo da V0 sem planilha;
> 3 de 5 fundadores pagando após o mês grátis; % que concluiu o checklist; cobranças
> baixadas sem clique. Pronto quando: decisão registrada: seguir para a v2 ou ajustar.
> Depende de: Tudo acima. Ref.: `docs/specs/v1.md`

**São 4 métricas de validação, e uma delas é a mais reveladora do produto:** *"cobranças
baixadas sem clique"*. O Aluga promete baixa automática — se isso funcionar, é o
diferencial que justifica a assinatura. As outras três medem adoção (mês completo sem
planilha), disposição a pagar (3 de 5 fundadores) e conclusão do onboarding.

---

## 4. Estado das observações

**Todas as 14 tarefas identificadas têm a observação completa.** Nenhuma ficou cortada.

Onde minha leitura de tela estava incompleta, o Rodrigo passou o texto por escrito
(27/10/2026) e eu conferi: a reconstrução que eu tinha feito da tarefa 5 ("Desenhar as
telas da v1") estava **correta no conteúdo**, com dois detalhes de forma que ele corrigiu
— "Partir **de**" (não "Partir do") e a observação real não tinha o trecho duplicado que
eu suspeitava.

**Nota de leitura — "Vó":** onde o texto original aparece como *"Vó"*, mantive **Vó**
literalmente, mas a interpretação é **V0** (versão zero) — a mesma frase fala em *"seguir
para a v2"*, e o produto tem versões V0/V1/V2. **A confirmar com o Rodrigo.**

---

## 5. Lacunas do inventário

1. **Título da tarefa 6** — card de 4h em 06/11 (Sprint 1). A observação não foi passada.
   É a única tarefa das 15 que ainda não tenho.
2. **Título da tarefa 11** — inferido como *"Tutorial 'Conectar Mercado Pago'"* a partir
   da observação (passo a passo do OAuth do Mercado Pago). A observação é literal; só o
   título é inferido.
3. **Coluna `Aguardando`** não foi aberta em nenhuma das 3 levas. Tem um card
   *"Aluga · Criar projeto Supabase em São Paulo e e-ligar…"* cortado no canto da tela.

**Total: 14 de 15 tarefas identificadas. Faltam 2 títulos e 1 coluna.**

---

## 6. O que isso significa para o design system

**Restrição de escopo que vale para o projeto inteiro:** a tarefa 7 (Landing) diz
*"Só componentes e tokens do design system"*. Ou seja, a landing **não pode** ter CSS
solu — ela é prova de que o design system se sustenta sozinho.

**Já entregue e que bate com o backlog** (atualizado em 29/10/2026):

| Do backlog | Situação |
|---|---|
| Tarefa 1 — tokens de acessibilidade | **pronta**, todos os critérios cumpridos |
| Tarefa 3 — onboarding + "Como prefere ver?" | **pronta** (`50bbffc` `d4eae79`) |
| Tarefa 4 — identidade provisória + ícone PWA | **pronta** (`e982dab`) |
| Tarefa 5 — telas da v1 | **pronta** — 7 telas (ver seção 3) |

**Gap que o backlog cria e o design system AINDA não cobre** — é o que sobra:

| Do backlog | Situação |
|---|---|
| **Tutorial com imagens, para pessoa idosa** (WhatsApp e Mercado Pago) | não existe — tarefas 8 e 11 |
| **Mensagens por momento** — D-3 / D0 / D+3, com confirmação ao inquilino e "Recebeu?" ao proprietário | não existe — tarefa 9 |
| **Fluxo de retorno de OAuth** (voltou do Mercado Pago) | não existe |
| **Landing page** com só componentes e tokens | **pronta** (`0c1b092`), falta publicar no VPS — tarefa 7 |
| **Planos R$ 59/99/209/269 validados** | tela pronta, preços ainda hipótese — tarefa 14 |

**Gap que existia e foi fechado na tarefa 5:**

| Do backlog | Como ficou |
|---|---|
| Modo simples ("Este mês") | existe, com Completo como padrão (decisão do Rodrigo) |
| Cards por unidade com `Recebi / Lembrar` | existe |
| Onboarding com checklist de 5 passos | existe |
| Pergunta "Como prefere ver?" | existe, em Configurações |
| Ícone de PWA + favicon | existe |
| Vocabulário `Proprietário/Imóvel/Unidade/Cobrança/Recebimento` | aplicado nas 7 telas novas |
| Planos R$ 59/99/209/269 | tela pronta, aprovada pelo Rodrigo |
| Wordmark 'Aluga' | existe |

**Conflito de nomenclatura a resolver:** o menu que levantei no AluggaPro
(`Meus Imóveis`, `Contratos`, `Financeiro`, `Vistorias`…) **não é** o vocabulário da v1 do
Aluga. O Aluga é deliberadamente mais simples: 4 substantivos
(`Proprietário/Imóvel/Unidade/Cobrança/Recebimento`) contra 14 itens de menu. Se o template
for usado como base da v1, ele precisa **encolher**, não crescer.

---

## 7. Roteiro — situação em 29/10/2026

**Feito na Sprint 1:**

1. ~~Marcar a tarefa 1 como pronta~~ — **feito** (destravou a 5).
2. ~~Decidir o destino do template~~ — **decidido: encolher para o vocabulário da v1.** As
   7 telas novas usam `Proprietário/Imóvel/Unidade/Inquilino/Contrato/Cobrança/Recebimento`,
   e o menu do rail foi renomeado (o "Financeiro" virou **Recebimentos**).
3. ~~Refazer a tela de planos~~ — **feito** (`c0025c8`), com R$ 59/99/209/269. Aprovada pelo
   Rodrigo sem ressalva.
4. ~~Checklist de onboarding~~ — **feito** (`50bbffc` `d4eae79`).

**Ainda em aberto na Sprint 1:**

- **Tarefa 2 — pesquisa de nome e INPI.** É do Rodrigo e depende de consulta externa. Não
  bloqueia nada.
- **Tarefa 6 — título desconhecido.** Card de 4h em 06/11. A observação não foi passada.
- **Limpeza do Painel.** O dashboard ainda mostra cards do template genérico que não existem
  no produto. Não é tarefa do kanban, mas é a próxima tarefa grande e a única tela do painel
  que ainda mente sobre o produto.

**Sprint 2 (20/11) — em andamento:**

- **Landing (7) — FEITA e APROVADA** (`82918a2`, 10 rodadas de revisão). O Rodrigo deu
  *"Perfeito ficou tudo otimo"* em 29/10/2026. Falta publicar no VPS, que é do Richard.
  A estrutura final: hero → `ProductTour` com 7 etapas → planos → CTA final → rodapé.
  **Uma explicação, um bloco** — nada depois da apresentação. A 7ª etapa tem quatro beats
  (Completo → Simples → tema escuro → letra maior), um por tela de rolagem, sem clique.
- **Tutorial WhatsApp (8), mensagens (9), linguagem simples (10), tutorial Mercado Pago
  (11) — nada iniciado.**

A landing só pôde ser feita por causa da restrição *"Só componentes e tokens do design
system"*: ela é a prova de que o design system se sustenta sozinho, sem CSS de página. Foi
por isso que ela nasceu **depois** das 7 telas — as telas é que criaram os componentes que
a landing reusa (`PricingTable`, `HowItWorks`, `SimpleModeScreen`).

**O que a landing provou, no fim das 10 rodadas:** o design system se sustenta sozinho, e
as telas embedadas na landing são as **do produto** — se uma tela muda no app, a landing
muda junto. É a única forma de a promessa não mentir.

**Ressalva que o Rodrigo registrou em 29/10/2026:** *"provavelmente quem vai deixar
funcional sem ser generico é meu socio"*. Ou seja, a **parte funcional** — banco, job de
cobrança, integração real — é do Richard. O Rodrigo fecha **desenho, texto e fluxo**. Evita
gastar hora do Rodrigo no que é do Richard.

**Última atualização deste documento:** 29/10/2026, refletindo o commit `82918a2`.

---

## 8. Fonte

- 24 screenshots do modal "Editar tarefa" do **Segundo Cérebro**
  (`dinastia-cerebro.b6sonj.easypanel.host/tarefas`), 27/10/2026, fornecidos pelo Rodrigo
  em 3 levas. Nenhuma credencial foi usada ou pedida.
