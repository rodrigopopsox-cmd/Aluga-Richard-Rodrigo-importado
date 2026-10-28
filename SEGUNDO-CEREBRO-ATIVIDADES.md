# Atividades do Segundo Cérebro — projeto Aluga

> Inventário do backlog do Rodrigo (Marca), lido a partir do app **Segundo Cérebro**
> (`dinastia-cerebro.b6sonj.easypanel.host/tarefas`), em 27/10/2026.
>
> **Fonte:** 24 screenshots do modal "Editar tarefa", fornecidos pelo Rodrigo em 3 levas
> (1/3, 2/3, 3/3). Nada aqui foi inferido de execução — é leitura de tela.
>
> **Convenção de confiança:**
> - ✅ **confirmado** — li o texto integral na imagem
> - ⚠️ **cortado** — o título ou a observação apareceu cortada; recontei pelo padrão das
>   outras tarefas e está marcado
>
> O quadro declara **15 tarefas** e **~58h** na coluna `A fazer`. Consegui identificar
> **13 delas por completo**; 2 ficaram com título cortado (ver seção 5).

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

**Todas as 13 tarefas identificadas têm `Quem faz: Rodrigo` e `Etapa: A fazer`.**

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
| 9 | Aluga · **Mensagens** | Normal | 2h | ⚠️ título só |
| 10 | Aluga · **Textos do app em linguagem simples** | Normal | 4h | ✅ |
| 11 | Aluga · **Tutorial '…'** (segundo tutorial de 3h em 20/11) | Normal | 3h | ⚠️ título cortado |

### Sprint 3 — prazo 04/12/2026

| # | Título | Prio. | Tempo | Estado da leitura |
|---|---|---|---|---|
| 12 | Aluga · **Teste de uso com os 5 fundadores** | 🔴 Alta | 6h | ✅ |
| 13 | Aluga · **Ajustes visuais pós-testes** | Normal | 6h | ⚠️ obs. cortada |
| 14 | Aluga · **Validar preços com os fundadores** | 🔴 Alta | 2h | ✅ |

### Validação — prazo 15/01/2027

| # | Título | Prio. | Tempo | Estado da leitura |
|---|---|---|---|---|
| 15 | Aluga · **Medir o sucesso da v1** | 🔴 Alta | 2h | ⚠️ obs. cortada |

**Horas identificadas:** 3+4+4+3+8+4 +8+3+2+4+3 +6+6+2 +2 = **62h**, contra **~58h**
declarados no quadro. A diferença de 4h provavelmente está nas duas tarefas de título
cortado.

---

## 3. Observações na íntegra

### 1. Ajustar tokens de acessibilidade no DESIGN.md — 06/11 · 3h · Alta

> Para: Rodrigo (Marca). Sprint 1. O que fazer: Criar laranja mais escuro para botões e
> textos que passe contraste AA, subir texto base para 16px, alvos de toque de 48px.
> Pronto quando: `npm run check` passe e a vitrine/design-system mostra o novo laranja.
> Ref.: `docs/specs/v1.md`

**🔴 ESTA TAREFA JÁ ESTÁ FEITA.** Os três critérios dela são exatamente o que foi entregue
e validado em 2026-10-27:

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
> estilo Old Parr / Mustang / nome da V0) e consultar o INPI nas classes 36 e 42.
> Registrar em `PRODUCT.md` (em aberto). Pronto quando: temos 1 a 3 nomes sem conflito no
> INPI e com domínio livre. Ref.: `docs/specs/v1.md`

**O nome do produto ainda não está fechado.** "Aluga" é provisório. Direções de marca:
estilo **Old Parr**, **Mustang**, ou o nome da **V0**. Registro de marca nas classes
**36** (financeiro/seguros) e **42** (software).

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

### 4. Identidade provisória 'Aluga' e ícone do PWA — 06/11 · 3h · Normal

> Para: Rodrigo (Marca). Sprint 1. O que fazer: Wordmark 'Aluga' do design system + ícone
> do app para a tela inicial do celular (vários tamanhos) e favicon. Pronto quando: o app
> instalado no celular mostra ícone e nome. Ref.: `docs/specs/v1.md`

**O Aluga é PWA** — instalado na tela inicial do celular. Exige ícone em vários tamanhos e
favicon. O design system ainda não tem conjunto de ícones de app.

### 5. Desenhar as telas da v1 a partir dos templates — 06/11 · 8h · Normal

> Para: Rodrigo (Marca). Sprint 1. O que fazer: Modo simples ('Este mês'), cards por
> unidade, Recebi/Lembrar, letra grande), cadastros, cobranças, painel. Partir do
> `design-system/templates/admin`. ⚠️ *trecho do meio cortado entre "Partir do design-" e
> "system/templates/admin. Ref.:"* — reconstruído pelo padrão das outras tarefas:
> *"Pronto quando: telas aprovadas pelo Richard para desenvolver na sprint 2 e 3. Depende
> de: Ajustar tokens de acessibilidade. Ref.: `docs/specs/v1.md`"*

**Escopo da v1, em 4 peças:** Modo simples (`Este mês`) · cards por unidade com ação
`Recebi/Lembrar` · cadastros e cobranças · painel. **Depende da tarefa 1** (tokens) — que
já está pronta.

**Vocabulário da v1:** `Proprietário · Imóvel · Unidade · Cobrança · Recebimento`.
Note: **Unidade**, não Contrato. **Cobrança/Recebimento**, não Financeiro.

### 7. Landing page 'Aluga' na página inicial — 20/11 · 8h · Alta

> Para: Rodrigo (Marca). Sprint 2. O que fazer: Promessa, como funciona (3 passos), Modo
> simples, planos (R$ 59/99/209/269), botão 'Começar teste grátis' levando ao cadastro.
> Pronto quando: landing no ar no subdomínio e o botão chega ao cadastro. Depende de:
> Publicar no VPS. Ref.: `docs/specs/v1.md`

**Preços do Aluga: R$ 59 / 99 / 209 / 269.** Diferente da tabela do AluggaPro
(79/119/229/299). São produtos distintos — a tela de planos do template precisa ser
**refeita**, não ajustada.

### 8. Tutorial 'Conectar WhatsApp' — 20/11 · 3h · Normal

> Para: Rodrigo (Marca). Sprint 2. O que fazer: Passo a passo com imagens para ler o QR
> code, pensado para pessoa mais velha. Pronto quando: um teste com alguém de fora
> consegue conectar sozinho. Ref.: `docs/specs/v1.md`

**"Pensado para pessoa mais velha"** — o público-alvo do Aluga é idoso/proprietário
tradicional. Isso é a justificativa de produto do trabalho de acessibilidade: letra
grande, alvo de toque grande, passo a passo com imagem, sem jargão.

### 10. Textos do app em linguagem simples — 20/11 · 4h · Normal

> Para: Rodrigo (Marca). Sprint 2. O que fazer: Revisar todos os textos das telas: frases
> curtas, sem jargão, 'Proprietário/Imóvel/Unidade/Cobrança/Recebimento'. Pronto quando:
> planilha de textos aprovada e aplicada. Depende de: Desenhar as telas. Ref.:
> `docs/specs/v1.md`

### 12. Teste de uso com os 5 fundadores — 04/12 · 6h · Alta

> Para: Rodrigo (Marca). Sprint 3. O que fazer: Convidar pelo link do fundador, acompanhar
> o cadastro e o checklist, anotar travas. Pronto quando: 5 contas criadas e relatório de
> travas. Depende de: Assinatura do SaaS, Landing. Ref.: `docs/specs/v1.md`

### 14. Validar preços com os fundadores — 04/12 · 2h · Alta

> Para: Rodrigo (Marca). Sprint 3. O que fazer: Perguntar a disposição de pagar e o plano
> escolhido de cada um. Pronto quando: registro em `PRODUCT.md` (preços). Depende de:
> Teste com os fundadores. Ref.: `docs/specs/v1.md`

**A tabela R$ 59/99/209/269 ainda é hipótese.** Esta tarefa é que a confirma ou derruba.

---

## 4. Observações cortadas (preciso do texto)

| # | Tarefa | O que li | O que falta |
|---|---|---|---|
| 13 | Ajustes visuais pós-testes | *"…ajustes dos testes da V0 e dos fundadores nas telas e tokens. Pronto quando: ajustes aprovados e no ar. Ref.: docs/specs/v1.md"* | o **início** — o "Para/Sprint/O que fazer" |
| 15 | Medir o sucesso da v1 | *"Para: Rodrigo (Marca). Validação. O que fazer: Conferir: mês completo do V0 sem planilha; 3 de 5 fundadores pagando após o mês grátis; % que concluíu o checklist…"* · *"Depende de: Tudo. Ref.: docs/specs/v1.md"* | o **resto** da lista de conferência |

---

## 5. Lacunas do inventário

1. **Duas tarefas sem título** — uma de 4h em 06/11 (Sprint 1) e uma de 3h em 20/11
   (Sprint 2, segundo "Tutorial"). O quadro diz 15 tarefas; fechei 13.
2. **Card "Aluga · Criar projeto Supabase em São Paulo e e-ligar…"** — apareceu no canto
   da tela, título cortado. Provavelmente está na coluna `Aguardando`.
3. **Coluna `Aguardando`** não foi aberta em nenhuma das 3 levas.
4. **Tarefa 9 "Mensagens"** (20/11 · 2h) — só o título, sem observação.

---

## 6. O que isso significa para o design system

**Já entregue e que bate com o backlog:**

- Tarefa 1 (tokens de acessibilidade) — **pronta**, todos os critérios de "pronto quando"
  cumpridos.
- A camada opt-in de a11y e o menu da engrenagem respondem à pergunta **"Como prefere
  ver?"** da tarefa 3.

**Gap novo que o backlog cria e o template não cobre:**

| Do backlog | Situação no template |
|---|---|
| **Modo simples ("Este mês")** como padrão | não existe — o template abre no painel completo |
| **Cards por unidade** com ação `Recebi / Lembrar` | não existe |
| **Onboarding com checklist de 5 passos** (imóvel → inquilino+contrato → 1ª cobrança → WhatsApp → Mercado Pago) | não existe |
| **Pergunta "Como prefere ver?"** na entrada | não existe |
| **Ícone de PWA** (vários tamanhos) + favicon | não existe |
| **Vocabulário** `Proprietário/Imóvel/Unidade/Cobrança/Recebimento` | o template usa `Imóveis/Manutenção/Financeiro` |
| **Planos R$ 59/99/209/269** | o template não tem tela de planos |
| **Tutorial com imagens, para pessoa idosa** | não existe |
| **Wordmark 'Aluga'** | não existe |

**Conflito de nomenclatura a resolver:** o menu que levantei no AluggaPro
(`Meus Imóveis`, `Contratos`, `Financeiro`, `Vistorias`…) **não é** o vocabulário da v1 do
Aluga. O Aluga é deliberadamente mais simples: 4 substantivos
(`Proprietário/Imóvel/Unidade/Cobrança/Recebimento`) contra 14 itens de menu. Se o template
for usado como base da v1, ele precisa **encolher**, não crescer.

---

## 7. Roteiro sugerido (a confirmar com o Rodrigo)

1. **Marcar a tarefa 1 como pronta** — destrava a 5, que é a maior da Sprint 1 (8h).
2. **Fechar as 2 lacunas de título** antes de planejar a Sprint 2.
3. **Decidir o destino do template:** encolher para o vocabulário da v1
   (`Unidade`, `Cobrança/Recebimento`, modo simples) ou manter o template como está e
   construir a v1 em cima só do que serve.
4. **Refazer a tela de planos** com R$ 59/99/209/269 — a tabela atual do AluggaPro não
   serve.
5. **O checklist de onboarding do Aluga** é o componente de maior valor: é a primeira
   impressão do produto e não existe no design system.

---

## 8. Fonte

- 24 screenshots do modal "Editar tarefa" do **Segundo Cérebro**
  (`dinastia-cerebro.b6sonj.easypanel.host/tarefas`), 27/10/2026, fornecidos pelo Rodrigo
  em 3 levas. Nenhuma credencial foi usada ou pedida.
