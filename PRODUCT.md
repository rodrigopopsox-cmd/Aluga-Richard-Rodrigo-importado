# PRODUCT.md — Aluga (nome provisório)

Contrato de produto: o que estamos construindo, para quem, como cobramos e em que ordem.
Decidido por Richard e Rodrigo em 24/10/2026, depois de 8 rodadas de planejamento.
Visual e tokens: [`DESIGN.md`](DESIGN.md) · Regras para agentes: [`AGENTS.md`](AGENTS.md) · Especificação da v1: [`docs/specs/v1.md`](docs/specs/v1.md).

## O problema

Quem tem vários imóveis para alugar (casas, kitnets, comércios) e não tem experiência de gestão se perde:
- lembra o inquilino de pagar pelo WhatsApp, um por um;
- confere o Pix na mão;
- esquece reajustes e o fim dos contratos;
- não sabe quanto cada imóvel rende;
- sofre no Imposto de Renda, sem os valores separados por titular.

O primeiro caso real é a avó do Richard: casas, uma kitnet e comércios, com o Pix caindo na conta dela ou na do Vô.

## Para quem

| Segmento | Quando | Observação |
|---|---|---|
| Proprietário pessoa física com 2 a 50+ unidades, sem imobiliária, muitas vezes mais velho | **agora (B2C)** | o "proprietário perdido"; precisa de algo que se entenda só de olhar |
| Família com imóveis em nome de mais de uma pessoa | **agora (B2C)** | plano família: vários titulares (CPFs) numa conta |
| Ajudante (filho, neto, assistente) | **agora** | cuida dos imóveis em nome do proprietário; login grátis |
| Inquilino | v1: só recebe mensagens · v2: portal com permissões limitadas | |
| Imobiliárias e administradoras | **v3 (B2B)** | repasse, taxa de administração, extrato por proprietário |

## Posicionamento

O AluggaPro (aluggapro.com.br) é a referência de **funcionalidades e estrutura**, não de visual, textos ou preços. Os termos de uso deles proíbem copiar interface, código e design.

Os nossos diferenciais são:
1. **Cobrança pelo WhatsApp automatizada**: lembretes e "Recebeu?" respondido por IA.
2. **Modo simples** para quem tem dificuldade: a tela "Este mês" do protótipo "Aluguéis da Vó".
3. **Plano família**, cobrado por titular (CPF), com o IR separado por titular.
4. **R$ 20 mais barato** que o plano equivalente do AluggaPro.

## Planos e preços

| Plano | Unidades | Titulares | Mensal |
|---|---|---|---|
| Essencial | até 5 | 1 | R$ 59 |
| Família | até 10 | 3 | R$ 99 |
| Patrimônio | até 50 | 5 | R$ 209 |
| Investidor | ilimitadas | ilimitados | R$ 269 |

- **Unidade** é o que gera aluguel: cada kitnet ou loja conta como uma.
- Titular extra custa R$ 9 por mês. Cada conta tem 2 logins de ajudante grátis.
- O plano anual custa o preço de 10 meses. O teste é de **14 dias no app, sem cartão**; no fim, o app pede para assinar.
- **Fundadores** (os 5 primeiros testadores): o primeiro mês é grátis e depois vale o preço cheio.
- **Imobiliárias (v3), hipótese a revisar:** pacotes de 50, 100 e 250 unidades por R$ 199, R$ 349 e R$ 749.
- A assinatura é cobrada pelo **Mercado Pago Assinaturas** (cartão recorrente). A Stripe é a reserva.

## Fases

| Módulo | v1 · MVP da Vó + fundadores | v2 · lançamento SaaS | v3 · B2B e pré-locação |
|---|---|---|---|
| Conta, organização, titulares e ajudantes | ✅ | | |
| Imóveis, unidades, inquilinos, contratos (cadastro) | ✅ | | |
| Cobranças mensais, recebimentos e painel (mês/trimestre/ano) | ✅ | | |
| Mercado Pago do proprietário com baixa automática | ✅ | | |
| Lembretes no WhatsApp e "Recebeu?" com IA | ✅ | | |
| Modo simples, onboarding e checklist | ✅ | | |
| Despesas, informe de IR por titular e extrato CSV | ✅ | | |
| Assinatura do SaaS, planos e limites | ✅ | | |
| Landing page, termos e privacidade | ✅ | | |
| Alertas de reajuste (IGP-M/IPCA) e fim de contrato | v1.1 | | |
| Contrato gerado de modelo, aditamento, assinatura digital | | ✅ | |
| Portal do inquilino, cobranças avulsas, vistorias | | ✅ | |
| Apuração do carnê-leão e envio ao contador | | ✅ | |
| Parceiros (contador, seguro) | | ✅ | |
| Folha de repasse, taxa de administração, extrato do proprietário | | | ✅ |
| CRM, vitrine, placas e QR code | | | ✅ |
| Otimizador tributário e ganho de capital | | | ✅ |

## Como funciona (decisões de arquitetura)

- **App:** PWA (site que se instala na tela inicial) em Next.js. A landing fica em `/` e o app em `/app`, no mesmo projeto e com o mesmo design system.
- **Dados:** Supabase na região de São Paulo. A **organização** pode ser uma família ou uma imobiliária, e o isolamento por organização é feito no banco (Row Level Security). Isso deixa o B2B pronto sem construir as funções de imobiliária.
- **Hospedagem:** VPS da Hostinger com Easypanel, onde já roda o Segundo Cérebro. O app, a Evolution e o n8n ficam lá, num subdomínio de um domínio que já temos. O Supabase começa no plano grátis.
- **Dinheiro do aluguel:** cada proprietário conecta a **própria conta do Mercado Pago** (OAuth), e o dinheiro nunca passa por nós.
  - Um teste técnico na sprint 1 confirma se o Pix funciona em nome de uma conta de pessoa física.
  - Se não funcionar, a reserva é boleto pelo Mercado Pago mais Pix copia-e-cola da chave do proprietário, com confirmação pelo "Recebeu?".
- **WhatsApp:**
  - Os **lembretes aos inquilinos** saem do WhatsApp do próprio proprietário pela Evolution: 3 dias antes, no dia e 3 dias depois. Proteções:
    - mensagens só para inquilinos com quem ele já conversa;
    - limite de envios por dia e texto variado;
    - cláusula de aviso no contrato;
    - botão para pausar os envios;
    - link manual do WhatsApp como reserva.
  - Um **número central da marca** (Evolution, com chip próprio) conversa com os proprietários: "Recebeu R$ 1.300 do João?", alertas, resumo do mês e suporte ("Falar com a gente").
  - As respostas são lidas no **n8n com o Claude Haiku**, e o Supabase dá a baixa. Se a IA não tiver certeza, o sistema pede "responda 1 ou 2".
  - O número central migra para a **API oficial do WhatsApp** ao escalar.
- **LGPD desde a v1:** dados no Brasil, tokens do Mercado Pago criptografados, termos de uso e política de privacidade aceitos no cadastro.
- **Acessibilidade:** laranja mais escuro nos botões e textos, texto base de 16px, alvos de toque de 48px, frases curtas, e um "Como funciona" em cada tela.

## Vocabulário

| Na tela | Significa | No banco |
|---|---|---|
| Proprietário | dono do imóvel, que recebe o aluguel | `owners` (titular: CPF ou CNPJ e conta de recebimento) |
| Imóvel | o endereço ("Casa do CIC", "Prédio Agrícola") | `properties` |
| Unidade | o que é alugado (casa 1, kitnet, loja) | `units` |
| Inquilino | quem paga | `tenants` |
| Contrato | o acordo de aluguel de uma unidade | `leases` |
| Cobrança | o que o inquilino deve num mês | `charges` |
| Recebimento | o que de fato entrou | `payments` |
| Ajudante | quem usa a conta em nome do proprietário | `members` com papel `helper` |

## Time e trilhas

| Pessoa | Trilha | Zona de potência |
|---|---|---|
| Richard | **Produto**: dados, Supabase, pagamentos, WhatsApp, app | já criou produtos e integrou o Mercado Pago e o n8n |
| Rodrigo | **Marca**: nome, identidade, landing, telas, textos, testes | formação e experiência em design |

As tarefas vivem no **Segundo Cérebro** (área Empresarial, título começando com "Aluga ·"). A lista da v1 está em [`docs/tasks/v1-segundo-cerebro.csv`](docs/tasks/v1-segundo-cerebro.csv).

## Como saberemos que a v1 deu certo

1. A Vó roda **um mês inteiro** pelo sistema: cobranças geradas, lembretes enviados, todos os pagamentos baixados.
2. **Pelo menos 3 dos 5 fundadores** continuam pagando depois do mês grátis.
3. Medimos também quantos **concluem o checklist** "Configure sua conta".

## Riscos e premissas

| Risco | Mitigação |
|---|---|
| Bloqueio do WhatsApp do proprietário pela Meta (a Evolution não é a API oficial) | as proteções acima, o link manual como reserva e a API oficial no número central |
| O Pix automático do Mercado Pago pode não funcionar para conta de pessoa física | teste técnico na sprint 1, limitado a 2 dias, com o boleto mais Pix copia-e-cola como reserva |
| Limites do Supabase grátis (pausa projetos parados, banco pequeno) | migrar para o plano pago quando houver assinantes |
| Nome provisório "Aluga" soa igual a "Alugga" | usar só como provisório; o nome definitivo passa pelo INPI antes do lançamento público |
| Engenharia reversa do AluggaPro | copiar só estrutura e fluxos, nunca telas, textos, código ou preços |

## Em aberto

- **Nome definitivo.** Descartados: Tá Pago, que é marca da TA PAGO Produtos Digitais S.A., e Locare, cujo `.com.br` é de uma locadora de eventos. As listas checadas estão no histórico do planejamento. Falta consultar o INPI nas classes 36 e 42.
- **Pix automático em conta de pessoa física** pelo Mercado Pago: depende do teste da sprint 1.
- **Preços B2B:** hipótese, a revisar antes da v3.
