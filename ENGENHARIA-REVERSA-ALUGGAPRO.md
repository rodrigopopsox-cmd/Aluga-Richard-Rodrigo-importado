# Engenharia reversa — AluggaPro (produto no ar)

> Levantamento feito em **2026-10-27** acessando o site público do produto.
> **Método:** leitura das páginas públicas (home, demo, ferramentas, 12 calculadoras,
> termos, privacidade, portal do inquilino, robots.txt e sitemap.xml).
> **Não foi feito login em nenhuma área** — nenhuma credencial foi usada ou pedida.
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
| Planos | **Basic, Pro, Elite** (mensais, 7 dias grátis, sem cartão) |
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

## 3. Mapa de módulos do app do proprietário

Montado a partir da lista de "mais de 20 recursos" do site, do dashboard citado e dos
termos de uso. A estrutura interna exata das telas **não pôde ser confirmada** sem login.

### 3.1 Dashboard — "Visão Geral do Portfólio"

Indicadores citados literalmente no texto alternativo da imagem do dashboard:
**receita, despesas, resultado líquido, ocupação, fluxo de caixa e pendências do mês.**

> ⚠️ O template atual do painel tem Dashboard com cards de fluxo de caixa e pagamentos.
> **Falta:** ocupação e **resultado líquido** como número de primeira classe.

### 3.2 Imóveis e portfólio

- Cadastro e gestão de imóveis
- **Rentabilidade por imóvel** (receita, despesa e imposto estimado por imóvel)
- **Vitrine digital** e **placas inteligentes** (divulgação do imóvel)
- **Vistorias com fotos**
- Documentos por imóvel

### 3.3 Contratos

- Contratos em 1 clique
- **Assinatura eletrônica** com validade jurídica, ilimitado
- **Contratos pelo WhatsApp**
- Alertas de vencimento de contrato
- **Reajuste IGP-M e IPCA** na data de aniversário

### 3.4 Financeiro / cobrança

- **Boletos e Pix automáticos** (Banco Inter, Cora ou Mercado Pago — o site cita os três;
  a política de privacidade cita ASAAS. *Provedor exato: a confirmar*)
- **Lembrete na véspera** do vencimento
- **Baixa e recibo automáticos**
- **Multa e juros no boleto**
- **Folha de repasse** (repasse ao proprietário)
- Relatórios **PDF e CSV**

### 3.5 Fiscal / imposto (módulo que mais se distancia do template atual)

- **Módulo fiscal e IR**
- Cálculo estimado de impostos
- Simulações tributárias e comparações fiscais
- **Simulador de ganho de capital**
- **Simulador de estruturação via holding imobiliária**
- Análise patrimonial

### 3.6 Conta / assinatura

- Planos Basic / Pro / Elite, upgrade e cancelamento
- Suspensão automática por não pagamento

---

## 4. Portal do inquilino

Três funcionalidades, e só três — o inquilino não gerência nada, só consulta:

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

### 7.1 Módulos inteiros que faltam

| Módulo | Existe no template? |
|---|---|
| Contratos (prazo, reajuste, assinatura, aditivo) | ❌ |
| Fiscal / IR / ganho de capital / holding | ❌ |
| Rentabilidade e payback por imóvel | ❌ (Analytics é genérico) |
| Vistorias com fotos | ❌ |
| Folha de repasse | ❌ |
| Vitrine digital / placas | ❌ |
| Assinatura e planos (Basic/Pro/Elite) | ❌ |
| Portal do inquilino (superfície inteira) | ❌ |
| Calculadoras públicas (superfície inteira) | ❌ |

### 7.2 Componentes que esses módulos vão exigir

- **Campo de CPF/CNPJ** com máscara e validação (login do inquilino)
- **Campo de data de vencimento / aniversário de contrato** com antecedência
- **Seletor de índice** (IGP-M / IPCA / percentual livre) — segmented control
- **Memória de cálculo** — bloco que mostra passo a passo de onde veio o número
  (padrão repetido nas 12 calculadoras; o design system não tem nada parecido)
- **Linha de resultado** com bruto → descontos → líquido (comparação lado a lado)
- **Timeline de contrato** (assinado → vigente → aviso → vencido → rescindido)
- **Galeria de vistoria** (foto + data + observação)
- **Empty state de "nenhum imóvel"** com CTA para o primeiro — o site promete
  *"automatizar meu primeiro aluguel"*, então o onboarding é peça central
- **Aviso legal** discreto mas presente (o produto vive de se proteger)

### 7.3 Um detalhe de copy que vale adotar

O produto **nunca promete certeza**. Toda simulação vem com o aviso de que é estimativa e
não substitui contador ou advogado — e os Termos de Uso dedicam duas seções inteiras
a isso (§3 e §9). Isso é decisão de produto, não de jurídico: permite vender simulação
tributária sem se tornar consultoria.

---

## 8. O que não dá para ver daqui (e o que resolveria)

**Fechado atrás de login, sem credencial:**

1. A **árvore de telas real** do app do proprietário — menu, rotas, o que existe de fato
   em cada módulo
2. O **dashboard de verdade** (só vi a imagem e o texto alternativo)
3. O **portal do inquilino autenticado**
4. Os **fluxos de cadastro** (onboarding do primeiro imóvel, criação de contrato)
5. **Planos e preços** — sei que são Basic/Pro/Elite, não sei o que cada um inclui
6. O **tom de voz real da interface** (só vi o do marketing)

**O que resolve sem senha:** 6 a 10 screenshots — um por módulo do menu, mais o
dashboard e o portal do inquilino. Com isso eu fecho a árvore de telas e a nomenclatura
exata de cada módulo.

> Não peço e não aceito login e senha. Screenshot ou export "Salvar como"/PDF resolvem.

---

## 9. Recomendações, em ordem de valor

1. **Fechar a árvore de telas com screenshots** — é o que mais falta e destrava o resto
2. **Criar o módulo Contratos no template** — é o coração do produto ("contratos em 1
   clique") e hoje não existe
3. **Criar o componente "memória de cálculo"** — usado em 12 páginas públicas e em todo
   módulo fiscal; é a assinatura visual do produto
4. **Decidir o escopo das 3 superfícies** — se o inquilino e as calculadoras entram no
   design system ou ficam fora. Isso muda o tamanho do trabalho
5. **Adotar o vocabulário da seção 6** na copy do template, para o produto não parecer
   genérico

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
