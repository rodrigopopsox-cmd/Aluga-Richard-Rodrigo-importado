# Engenharia reversa — AluggaPro (produto no ar)

> Levantamento feito em **2026-10-27**.
>
> **Método, em duas etapas:**
> 1. leitura das páginas públicas (home, demo, ferramentas, 12 calculadoras, termos,
>    privacidade, portal do inquilino, robots.txt e sitemap.xml);
> 2. **menu lateral e dashboard reais**, obtidos por screenshots do app autenticado
>    fornecidos pelo Rodrigo em 27/10/2026 (conta Starter em período de teste, **0 imóveis
>    cadastrados**, nenhum dado criado ou alterado).
>
> **Nenhuma credencial foi usada ou pedida por mim.** O material autenticado chegou como
> imagem, não como acesso.
>
> Tudo aqui é **observado**, não inventado. Onde algo é inferência minha, está marcado
> como *(inferido)*.

---

## 1. O que é o produto

**AluggaPro** — SaaS de gestão de aluguéis para **proprietários e investidores
imobiliários** no Brasil. Posicionamento: não é "administradora de imóveis", é
**gestão de portfólio imobiliário** — a ênfase está em resultado líquido, imposto e
rentabilidade, não em cadastro de imóvel.

| | |
|---|---|
| Nome exato | **AluggaPro** (duplo G) — o projeto interno chama "Aluga Pro" |
| Domínio do app | `app.aluggapro.com.br` |
| Portal do inquilino | `inquilino.aluggapro.com.br` (subdomínio separado) |
| Site institucional | `aluggapro.com.br` |
| Provas sociais | +300 proprietários, +1.200 imóveis, 32% menos inadimplência |
| Plano observado na conta | **Starter**, em período de teste de 7 dias |
| Planos citados nos Termos | **Basic, Pro, Elite** — *divergência a confirmar (ver 3.7)* |
| Intermediador de pagamento | **ASAAS** (confirmado na Política de Privacidade) |

**Promessa central:** *"Administre seus aluguéis em 15 minutos por mês. Sem planilha."*
O discurso é sempre **antes/depois**: planilha e sensação → dashboard e indicador.

---

## 2. As três superfícies (isso muda o escopo do design system)

O produto **não é um app só**. São três superfícies com público e contexto diferentes:

| # | Superfície | URL | Acesso | Público |
|---|---|---|---|---|
| 1 | **Site institucional + SEO** | `aluggapro.com.br` | público, sem login | visitante / lead |
| 2 | **App do proprietário** | `app.aluggapro.com.br` | e-mail + senha, Google | proprietário / investidor |
| 3 | **Portal do inquilino** | `inquilino.aluggapro.com.br` | **CPF ou CNPJ** + senha, com fluxo de **primeiro acesso** | inquilino |

**Consequência para o design system:** hoje o template cobre só a superfície 2
(Login → Painel → Imóveis → Manutenção → Financeiro). As superfícies 1 e 3 **não existem**
no design system.

Detalhe que importa: o login do inquilino é por **CPF/CNPJ**, não e-mail — ou seja, o
campo de identificação é diferente do do proprietário, e existe um fluxo de
"criar senha no primeiro acesso". São dois componentes de login distintos, não um só
com label trocada.

---

## 3. Mapa de módulos do app do proprietário — MENU REAL

Obtido do screenshot do app autenticado. **14 itens de menu, em 7 grupos.** Esta é a
estrutura de verdade, não inferida:

```
Dashboard                          ← item solto, no topo

Pré-Locação                        ← funil de aquisição, ANTES do aluguel existir
  · CRM
  · Vitrine Digital

Cadastros                          ← as 4 entidades centrais
  · Meus Imóveis
  · Proprietários
  · Inquilinos
  · Contratos

Operação
  · Recebimentos
  · Vistorias

Financeiro
  · Financeiro
  · Folha de Repasse
  · Relatórios

Serviços
  · Parceiros

Configurações
Suporte
Ideias da Comunidade e Notificações   ← item único, no rodapé do menu
```

### 3.1 O que essa estrutura revela

**a) Existe um funil ANTES da locação.** `Pré-Locação` (CRM + Vitrine Digital) é aquisição:
lead → proposta → contrato. O template do painel hoje começa no meio da história — assume
que o imóvel já está alugado.

**b) `Proprietários` é entidade separada de `Meus Imóveis`.** O produto foi feito para
**investidor com carteira**, não para dono de um imóvel. Um proprietário tem N imóveis;
um imóvel tem 1 proprietário. *(inferido: relação 1→N, a confirmar nas telas)*

**c) `Inquilinos` também é cadastro independente** — não vive dentro do contrato. Faz
sentido: o mesmo inquilino pode ter tido contratos anteriores no portfólio.

**d) `Contratos` é o centro de tudo** — liga imóvel + inquilino + proprietário + valor +
reajuste. É onde a inteligência do produto mora.

**e) `Recebimentos` ≠ `Financeiro`.** Recebimentos é operação (o que entrou, de quem,
com ou sem atraso); Financeiro é resultado (receita, despesa, lucro). Separação
deliberada entre **movimento** e **consolidação**.

**f) `Folha de Repasse` é separada do Financeiro** — é o documento que vai para o
proprietário, não o cálculo interno.

**g) `Parceiros` sob Serviços** — rede de prestadores (provavelmente manutenção,
vistoria, jurídico). É marketplace, não cadastro.

**h) `Ideias da Comunidade e Notificações`** — canal de feedback dentro do produto.
Decisão de produto incomum e reveladora: o time usa o próprio app como central de
sugestões.

### 3.2 Dashboard inicial — layout real

```
Bom dia, Richard                    ← saudação personalizada
0 imóveis sob gestão                ← contador de estado vazio, em destaque

[ Este mês ] [ Trimestre ] [ Ano ]  ← filtro de período (segmented control)

[ + Despesa ]  [ Novo contrato ]    ← as 2 ações primárias

┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Receita      │ Despesas     │ Resultado   │ Ocupação     │
│ R$ 0         │ R$ 0         │ líquido R$0 │ 0%           │
└──────────────┴──────────────┴──────────────┴──────────────┘

Fluxo de caixa
Despesas por categoria
Precisa de atenção                  ← bloco de pendências
Transações recentes
```

**Os 4 indicadores são exatamente:** Receita · Despesas · **Resultado líquido** ·
**Ocupação**. Os dois em negrito são os que o template do painel **não tem**.

**Só duas ações primárias no dashboard:** `Despesa` e `Novo contrato`. Nada de
"cadastrar imóvel" solto — o cadastro de imóvel mora no checklist, não no topo.

### 3.3 O checklist de configuração — o achado mais valioso

Com a conta vazia, o dashboard mostra um **onboarding de 5 etapas**:

```
Checklist de configuração
  1. Cadastrar imóvel
  2. Cadastrar inquilino
  3. Criar contrato
  4. Conectar conta bancária
  5. Ver lançamentos do mês
```

Isso é **a ordem canônica do produto**, ditada pelo próprio time:

**imóvel → inquilino → contrato → banco → lançamentos**

Consequências diretas para o design system:

- O **empty state** do dashboard não é "nenhum dado". É um **checklist de progresso** —
  e o template do painel não tem esse componente.
- O fluxo de onboarding é **linear e obrigatório**: não dá para criar contrato sem
  imóvel e inquilino. O design system precisa de estados de "pré-requisito não cumprido".
- **"Conectar conta bancária" é etapa 4 de 5** — ou seja, o produto assume integração
  bancária como parte do caminho feliz, não como configuração avançada.
- A etapa 5 é *"ver"*, não *"fazer"* — o produto encerra o onboarding mostrando
  resultado, não pedindo mais dado.

### 3.4 Contratos

Confirmado como módulo de menu próprio em `Cadastros`. Do site público sabe-se que
inclui: contratos em 1 clique, assinatura eletrônica com validade jurídica, contratos
pelo WhatsApp, alertas de vencimento e reajuste IGP-M/IPCA na data de aniversário.

### 3.5 Fiscal / imposto

O menu **não tem um módulo "Fiscal" visível**. O que existe de fiscal aparece dentro de
`Financeiro` / `Relatórios` e nas calculadoras de IR. *(inferido: o módulo fiscal pode
estar em `Configurações` ou ser recurso de plano superior — a confirmar)*

### 3.6 Conta / assinatura

Plano observado: **Starter**, em teste de 7 dias.

### 3.7 Divergência de nomenclatura de planos

| Fonte | Nomes |
|---|---|
| Termos de Uso (§7) | Basic, Pro, Elite |
| Conta real | **Starter** |

Duas explicações possíveis: *Starter* é o nome do período de teste antes de virar Basic,
ou os planos foram renomeados e os Termos não foram atualizados. **A confirmar** — vale
perguntar ao time, porque afeta a tela de planos.

---

## 4. Portal do inquilino

Três funcionalidades, e só três — o inquilino não gerencia nada, só consulta:

1. **Faturas e segunda via** — boleto e Pix do mês, sempre atualizados
2. **Recibos e histórico** — comprovantes de tudo que já pagou
3. **Contrato à mão** — vencimento, prazo e andamento

O tom da copy é de tranquilidade: *"Seu aluguel em dia. Sem complicação."*
Quando não consegue acessar, a instrução é **falar com o proprietário ou a
administradora** — não existe suporte direto ao inquilino.

---

## 5. As 12 calculadoras públicas (a joia do SEO)

Todas em `aluggapro.com.br`, **sem cadastro, sem limite de uso**. É uma estratégia de
aquisição: cada calculadora é uma página de entrada que termina oferecendo o produto.

| Calculadora | O que responde |
|---|---|
| Rentabilidade de imóvel alugado | quanto rende por mês/ano, com despesa e vacância |
| Reajuste de aluguel (IPCA/IGP-M/%) | novo valor do aluguel, com memória do cálculo |
| Multa e juros por atraso | valor atualizado de cobrança atrasada |
| Fluxo de caixa para imóveis | quanto sobra por mês/ano, com financiamento |
| Payback de imóvel para locação | tempo para o aluguel líquido recuperar o investimento |
| Custo real de manter imóvel alugado | custo mensal/anual real |
| IR sobre aluguel | estimativa de imposto e valor líquido |
| Multa por quebra de contrato | multa proporcional por rescisão antecipada |
| Devolução de caução corrigida | quanto devolver, com correção e abatimentos |
| Aluguel proporcional | valor por dias de uso (entrada/saída no meio do mês) |
| IPTU | estimativa a partir do valor venal e alíquota |
| Economia com AluggaPro | quanto economiza usando o produto |

**Mais 3 guias** (iscas de conteúdo): Manual Financeiro do Proprietário, Guia para Evitar
Inadimplência, Guia de Documentos Essenciais.

### 5.1 O padrão de UX das calculadoras — vale copiar

Todas as 12 seguem a **mesma receita**, e ela é boa:

1. **"Resposta rápida"** — uma caixa com a fórmula em linguagem natural, antes do formulário
2. **Form curto** — no máximo 4 ou 5 campos, cada um com frase de ajuda abaixo
3. **CTA primário** — "Calcular X agora"
4. **Link secundário** — *"Quero fazer uma simulação mais detalhada"* → abre o modo
   detalhado (progressive disclosure, não um formulário gigante de cara)
5. **Checklist "como evitar erros"** — 9 a 10 itens acionáveis
6. **Guia completo** — texto educativo longo
7. **FAQ** em acordeão
8. **Links cruzados** para as outras calculadoras
9. **Aviso legal** — *"simulação matemática, não substitui análise jurídica"*

O modo detalhado é o mais interessante: a calculadora de multa/juros deixa escolher a
**base de cálculo** (só o aluguel, ou aluguel + encargos), a **periodicidade dos juros**
(ao mês / ao dia) e a **carência** — porque "depende do contrato". É o oposto de assumir
uma regra única.

---

## 6. Vocabulário do domínio

Para a copy do design system não parecer traduzida. Termos que o produto usa:

**Receita e resultado:** receita bruta · receita líquida · resultado líquido ·
rentabilidade bruta · rentabilidade líquida · payback · ganho de capital

**O que come o lucro:** vacância · inadimplência · encargos (condomínio, IPTU, água,
energia, gás) · despesa não repassada · custo oculto

**Cobrança:** boleto · Pix · lembrete · baixa · recibo · multa · juros de mora ·
carência · base de cálculo · segunda via

**Contrato:** reajuste · IGP-M · IPCA · data de aniversário · aditivo · assinatura
eletrônica · rescisão · caução · vistoria

**Estrutura:** holding imobiliária · folha de repasse · valor venal · alíquota ·
módulo fiscal · IR

---

## 7. O que o design system precisa e ainda não tem

Comparado com o template do painel entregue (Login → Painel → Imóveis → Manutenção →
Financeiro):

### 7.1 Módulos inteiros que faltam no template

Comparado com os **14 itens de menu reais** (seção 3) contra o template atual
(Login → Painel → Imóveis → Manutenção → Financeiro):

| Módulo real | Existe no template? |
|---|---|
| Dashboard (Receita · Despesa · Resultado líquido · Ocupação) | ⚠️ parcial — faltam **Resultado líquido** e **Ocupação** |
| Pré-Locação → **CRM** | ❌ |
| Pré-Locação → **Vitrine Digital** | ❌ |
| Cadastros → Meus Imóveis | ⚠️ existe "Imóveis", com outra nomenclatura |
| Cadastros → **Proprietários** | ❌ |
| Cadastros → **Inquilinos** | ❌ |
| Cadastros → **Contratos** | ❌ |
| Operação → **Recebimentos** | ⚠️ parcial, virou "Manutenção" |
| Operação → **Vistorias** | ❌ |
| Financeiro → **Folha de Repasse** | ❌ |
| Financeiro → **Relatórios** | ❌ |
| Serviços → **Parceiros** | ❌ |
| **Configurações / Suporte / Comunidade** | ❌ |
| **Checklist de onboarding** | ❌ |
| Fiscal / IR / ganho de capital / holding | ❌ (não é item de menu visível) |
| Portal do inquilino (superfície inteira) | ❌ |
| Calculadoras públicas (superfície inteira) | ❌ |

**Resumo:** dos 14 itens de menu reais, o template cobre **3 de forma parcial** e
**nenhum de forma completa**. E o template tem um módulo — **Manutenção** — que **não
existe** no produto real (o que existe é `Vistorias` e `Parceiros`, que são coisas
diferentes).

> ⚠️ **Isso é um erro de escopo a corrigir:** o template foi montado com "Manutenção"
>   onde o produto tem "Recebimentos / Vistorias". O menu do template está **mais longo**
>   que o real em um item e **mais curto** em onze.

### 7.2 Componentes que esses módulos vão exigir

- **Checklist de progresso** com etapas e estado — o onboarding do produto é isso
- **Estado de pré-requisito** ("crie o imóvel antes do contrato") — o fluxo é linear
- **Segmented control de período** (Este mês / Trimestre / Ano) — já existe no DS ✅
- **Duas ações primárias** no topo do dashboard (`Despesa`, `Novo contrato`) — o DS já
  tem Button ✅
- **Campo de CPF/CNPJ** com máscara e validação (inquilino, login do portal)
- **Seletor de índice** (IGP-M / IPCA / percentual livre) — segmented control
- **Memória de cálculo** — bloco que mostra passo a passo de onde veio o número
- **Timeline de contrato** (assinado → vigente → aviso → vencido → rescindido)
- **Galeria de vistoria** (foto + data + observação)
- **Linha de resultado** bruto → descontos → líquido
- **Aviso legal** discreto mas presente (o produto vive de se proteger)

### 7.3 Um detalhe de copy que vale adotar

O produto **nunca promete certeza**. Toda simulação vem com o aviso de que é estimativa e
não substitui contador ou advogado — e os Termos de Uso dedicam duas seções inteiras
a isso (§3 e §9). Isso é decisão de produto, não de jurídico: permite vender simulação
tributária sem se tornar consultoria.

---

## 8. O que ainda não dá para ver (e o que resolveria)

**Já resolvido:** menu lateral completo, dashboard inicial, indicadores, onboarding de
5 etapas, nomenclatura real dos módulos, plano da conta.

**Ainda fechado:**

1. **As telas de cada módulo** — cadastro de imóvel, de inquilino, de proprietário,
   criação de contrato. Sei os nomes e a ordem, não os campos.
2. **CRM e Vitrine Digital** — o funil de pré-locação inteiro.
3. **Recebimentos e Folha de Repasse** — como o dado de cobrança é apresentado.
4. **Relatórios** — quais relatórios existem e em que formato.
5. **Parceiros** — é marketplace ou só uma lista?
6. **Configurações** — onde mora assinatura, plano, dados bancários, fiscais.
7. **Portal do inquilino autenticado**.
8. **Preços reais** dos planos.

**O que resolve:** um screenshot por item de menu (são 14) — ou só dos 6 que importam
agora: Imóveis, Inquilinos, Contratos, Recebimentos, Financeiro, Configurações.

> Continuo sem pedir e sem aceitar login. Screenshot resolve.

---

## 9. Recomendações, em ordem de valor

1. **Alinhar o menu do template com o menu real** — hoje o template tem "Manutenção",
   que não existe no produto, e não tem 11 itens que existem. Antes de construir qualquer
   coisa nova, corrigir o desenho do Shell.
2. **Construir o checklist de onboarding** — é a peça que define a primeira impressão do
   produto e o template não tem. 5 etapas, ordem canônica, progresso persistido.
3. **Criar o módulo Contratos** — confirmado como centro do produto (`Cadastros →
   Contratos`), e hoje não existe.
4. **Renomear o que existe** para a nomenclatura real: `Imóveis` → `Meus Imóveis`,
   `Manutenção` → `Recebimentos` / `Vistorias`. Copy errada confunde mais que copy ausente.
5. **Criar o componente "memória de cálculo"** — usado nas 12 calculadoras e em todo
   módulo fiscal.
6. **Decidir o escopo das 3 superfícies** — se inquilino e calculadoras entram no
   design system. Isso muda o tamanho do trabalho.
7. **Adotar o vocabulário da seção 6** na copy do template.

---

## 10. Fontes

- `https://aluggapro.com.br/` — posicionamento, features, provas sociais
- `https://aluggapro.com.br/demo` — antes/depois, dashboard
- `https://aluggapro.com.br/ferramentas` — hub das 12 calculadoras + 3 guias
- `https://aluggapro.com.br/calculadora-de-rentabilidade-de-imovel-alugado`
- `https://aluggapro.com.br/calculadora-de-multa-e-juros-por-atraso-no-aluguel`
- `https://aluggapro.com.br/termos` — planos, limitações, propriedade intelectual
- `https://aluggapro.com.br/privacidade` — LGPD, ASAAS, dados coletados
- `https://app.aluggapro.com.br/auth` — login do proprietário
- `https://inquilino.aluggapro.com.br/` — portal do inquilino
- `https://aluggapro.com.br/sitemap.xml`, `/robots.txt` — mapa completo de URLs públicas
- **Screenshots do app autenticado** (27/10/2026, fornecidos pelo Rodrigo) — menu lateral
  real, dashboard inicial, checklist de onboarding, plano da conta
