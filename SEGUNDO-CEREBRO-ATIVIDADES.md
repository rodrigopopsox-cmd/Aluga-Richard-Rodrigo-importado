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
> estilo Old Parr / Mustang / nome da Vó) e consultar o INPI nas classes 36 e 42.
> Registrar em `PRODUCT.md` (Em aberto). Pronto quando: temos 1 a 3 nomes sem conflito no
> INPI e com domínio livre. Ref.: `docs/specs/v1.md`

**O nome do produto ainda não está fechado.** "Aluga" é provisório. Direções de marca:
estilo **Old Parr**, **Mustang**, ou o nome da **Vó/V0** (ver nota de leitura, seção 4).
Registro de marca nas classes
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

### 7. Landing page 'Aluga' na página inicial — 20/11 · 8h · Alta

> Para: Rodrigo (Marca). Sprint 2. O que fazer: Promessa, como funciona (3 passos), Modo
> simples, planos (R$ 59/99/209/269), botão 'Começar teste grátis' levando ao cadastro.
> **Só componentes e tokens do design system.** Pronto quando: landing no ar no
> subdomínio e o botão chega ao cadastro. Depende de: Publicar no VPS. Ref.:
> `docs/specs/v1.md`

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

### 10. Textos do app em linguagem simples — 20/11 · 4h · Normal

> Para: Rodrigo (Marca). Sprint 2. O que fazer: Revisar todos os textos das telas: frases
> curtas, sem jargão, 'Proprietário/Imóvel/Unidade/Cobrança/Recebimento'. Pronto quando:
> planilha de textos aprovada e aplicada. Depende de: Desenhar as telas. Ref.:
> `docs/specs/v1.md`

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
| **Tutorial com imagens, para pessoa idosa** (WhatsApp e Mercado Pago) | não existe |
| **Mensagens por momento** — D-3 / D0 / D+3, com confirmação ao inquilino e "Recebeu?" ao proprietário | não existe |
| **Fluxo de retorno de OAuth** (voltou do Mercado Pago) | não existe |
| **Wordmark 'Aluga'** | não existe |

**Conflito de nomenclatura a resolver:** o menu que levantei no AluggaPro
(`Meus Imóveis`, `Contratos`, `Financeiro`, `Vistorias`…) **não é** o vocabulário da v1 do
Aluga. O Aluga é deliberadamente mais simples: 4 substantivos
(`Proprietário/Imóvel/Unidade/Cobrança/Recebimento`) contra 14 itens de menu. Se o template
for usado como base da v1, ele precisa **encolher**, não crescer.

---

## 7. Roteiro sugerido (a confirmar com o Rodrigo)

1. **Marcar a tarefa 1 como pronta** — destrava a 5, que é a maior da Sprint 1 (8h).
2. **Fechar as 2 últimas lacunas** — título da 6 e da 11, e abrir a coluna `Aguardando`.
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
