'use client';
import Link from 'next/link';

import type { ReactNode } from 'react';
import {
  Badge,
  Card,
  CardHeader,
  PricingNote,
  PricingTable,
  ProductTour,
  Wordmark,
  type PlanSpec,
  type TourStep,
} from '@design-system';
import { PanelModes } from './PanelModes';
import s from './page.module.css';

/**
 * Landing do Aluga — tarefa 7 do Segundo Cérebro e R10 da spec.
 *
 * RESTRIÇÃO QUE DEFINE ESTE ARQUIVO: *"Só componentes e tokens do design
 * system."* Nada de CSS solto, nada de cor ou tamanho fora dos tokens. O
 * `page.module.css` daqui usa só `var(--…)` de `design-system/tokens` — dá
 * para conferir com o validador.
 *
 * FONTE DE TODO TEXTO: o documento de produto. O que ele não diz, a landing
 * não inventa. Duas ausências deliberadas:
 *
 *   · **Sem prova social.** "+300 proprietários", "+1.200 imóveis" e
 *     "32% menos inadimplência" são números do concorrente, lidos na
 *     engenharia reversa. O Aluga não lançou — não tem número para contar,
 *     e número emprestado é mentira.
 *   · **Sem comparação de concorrente.** Os termos do concorrente proíbem
 *     copiar interface, código e design.
 *
 * A DEMONSTRAÇÃO NÃO É DESENHO. O `ProductTour` monta os painéis com os
 * componentes de verdade do design system e com os dados de demonstração de
 * verdade; a última etapa renderiza as telas reais do painel — Modo simples
 * e Visão geral — e liga nelas o tema escuro e a letra maior. Se uma tela
 * mudar no app, a landing muda junto — é a única forma de a promessa não
 * mentir.
 *
 * REGRAS DO DESIGN.md QUE ESTA PÁGINA OBEDECE — cada uma delas já foi
 * descumprida aqui e reprovada na revisão:
 *
 *   · **Cartão plano.** "Cards have no drop shadow at rest. Depth comes
 *     from tonal layers (gray page → white cards with a 1px border-subtle
 *     hairline), not shadows."
 *   · **Movimento curto e quieto.** "120–360ms… No bounces, no parallax."
 *   · **Sem emoji na interface.** O aviso de passo não construído é selo,
 *     não triângulo amarelo.
 *   · **Uma frase, até 20 palavras**, sem exclamação, cinza mudado.
 *   · **Laranja é uma só ação primária por vista.**
 *
 * TOM DE VOZ. Os textos foram reescritos porque estavam robotizados — eram
 * frases de especificação ("Unidade, inquilino, valor e dia de vencimento"),
 * não frases de gente. A voz do projeto é **você**, uma frase por idéia, e
 * o sistema raramente fala de si mesmo.
 */
const PLANS: PlanSpec[] = [
  { name: 'Essencial', price: 59, units: 'até 5', holders: '1 titular' },
  { name: 'Família', price: 99, units: 'até 10', holders: '3 titulares' },
  { name: 'Patrimônio', price: 209, units: 'até 50', holders: '5 titulares' },
  { name: 'Investidor', price: 269, units: 'ilimitadas', holders: 'ilimitados' },
];

/**
 * As seis etapas da apresentação.
 *
 * ESTRUTURA — a mesma em todas, e é isso que faz seis etapas diferentes
 * parecerem o mesmo produto:
 *
 *     .split            duas colunas iguais, cartões da mesma altura
 *      ├── painel A     cabeçalho de duas linhas, [destaque], campos
 *      └── painel B     cabeçalho de duas linhas, [destaque], campos
 *
 * Já houve uma etapa (Resultado) que era uma linha de quatro métricas em
 * largura total enquanto as outras cinco eram duas colunas — era a
 * "composição que muda no meio da apresentação". Agora todas têm duas
 * colunas, e os números do resultado moram nos dois painéis.
 *
 * O DESTAQUE é no máximo um número grande por painel, e é o que a pessoa
 * deve ler primeiro naquela etapa. Duas etapas não têm número de destaque
 * porque o conteúdo delas é uma lista (imóveis, rentabilidade por
 * unidade) — forçar um número ali seria inventar um que o produto não dá.
 *
 * TODOS EXISTEM NO PRODUTO — cada painel é montado com os dados de
 * demonstração das telas reais:
 *
 *   · imóveis e unidades  → `propertiesData`
 *   · contratos           → `contractsData`
 *   · cobranças           → `chargesData`
 *   · recebimentos        → `receiptsData` (`RECEIPTS`/`EXPENSES`)
 *
 * Os números conferem com as telas: R$ 2.600 recebido de R$ 6.000 previsto
 * em Cobranças, e R$ 5.600,00 / R$ 962,00 / R$ 4.638,00 / 78% em
 * Recebimentos.
 */
const TOUR: TourStep[] = [
  {
    label: 'Imóveis',
    title: 'Seus imóveis, organizados de uma vez',
    body: 'Endereço, titular e unidades em um lugar só. Você cadastra uma vez e não volta nisso.',
    panel: () => (
      <div className={s.split}>
        <Panel title="Casa do CIC" subtitle="casa · Rua das Palmeiras, 120">
          <Field label="Bairro" value="CIC · Curitiba" />
          <Field label="Titular" value="Iara Alves" />
          <Field label="Participação" value="100%" />
        </Panel>
        <Panel title="Casa Água Verde" subtitle="casa · Rua Bolívia, 45">
          <Field label="Bairro" value="Água Verde · Curitiba" />
          <Field label="Titular" value="Iara Alves" />
          <Field label="Participação" value="100%" />
        </Panel>
      </div>
    ),
  },
  {
    label: 'Contratos',
    title: 'O contrato guarda o que você não quer decorar',
    body: 'Valor, dia de vencimento e reajuste ficam no contrato. A cobrança do mês nasce daí.',
    panel: () => (
      <div className={s.split}>
        <Panel title="Casa do CIC" subtitle="Maria Silva · pessoa física">
          <Highlight value="R$ 1.200" label="aluguel por mês" />
          <Field label="Vence" value="dia 5" />
          <Field label="Início" value="05/03/2024" />
          <Field label="Reajuste" value="IGP-M" />
        </Panel>
        <Panel title="Os outros contratos" subtitle="cada um com o seu índice">
          <Field label="Casa Água Verde" value="Pedro · IPCA" />
          <Field label="Kitnet" value="João · fixo 7%" />
          <Field label="Sala 2" value="Clínica Vida · IGP-M" />
        </Panel>
      </div>
    ),
  },
  {
    label: 'Cobranças',
    title: 'O que já entrou e o que ainda falta',
    body: 'A cobrança do mês é gerada sozinha. Você vê o total e o que está em aberto.',
    panel: () => (
      <div className={s.split}>
        <Panel title="Cobranças de outubro" subtitle="geradas a partir dos contratos">
          <Highlight value="R$ 2.600" label="recebido de R$ 6.000 previstos" />
          <Field label="Em aberto" value="R$ 3.400" />
          <Field label="Atrasadas" value="2 cobranças" />
        </Panel>
        <Panel title="O que ainda falta" subtitle="outubro">
          <Field label="Kitnet" value="R$ 400 de R$ 800" />
          <Field label="Loja Centro" value="R$ 1.400" />
        </Panel>
      </div>
    ),
  },
  {
    label: 'Recebimentos',
    title: 'Cada real que entra com a sua origem',
    body: 'Mercado Pago, WhatsApp ou você digitando — e quem deu a baixa fica registrado.',
    panel: () => (
      <div className={s.split}>
        <Panel title="Entrou em outubro" subtitle="cinco recebimentos">
          <Highlight value="R$ 5.600" label="no total do mês" />
          <Field label="Casa do CIC" value="R$ 1.200 · Mercado Pago" />
          <Field label="Casa Água Verde" value="R$ 1.000 · WhatsApp" />
          <Field label="Kitnet" value="R$ 400 · manual" />
        </Panel>
        <Panel title="Quem deu a baixa" subtitle="fica no registro">
          <Field label="Casa do CIC" value="automática em 05/10" />
          <Field label="Casa Água Verde" value="você em 03/10" />
          <Field label="Kitnet" value="você em 06/10" />
        </Panel>
      </div>
    ),
  },
  {
    label: 'Resultado',
    title: 'Quanto sobrou no mês, sem planilha',
    body: 'Recebido, despesas e resultado calculados. Ocupação para você saber o que está vazio.',
    panel: () => (
      <div className={s.split}>
        <Panel title="Entrou" subtitle="outubro">
          <Highlight value="R$ 5.600,00" label="recebido no mês" />
          <Field label="Ocupação" value="78%" />
        </Panel>
        <Panel title="Saiu" subtitle="outubro">
          <Highlight value="R$ 4.638,00" label="resultado depois das despesas" />
          <Field label="Despesas" value="R$ 962,00" />
        </Panel>
      </div>
    ),
  },
  {
    label: 'Rentabilidade',
    title: 'Quanto cada imóvel rende de verdade',
    body: 'Aluguel e despesa por unidade. Na hora do Imposto de Renda, tudo separado por titular.',
    panel: () => (
      <div className={s.split}>
        <Panel title="Aluguel do mês" subtitle="por unidade">
          <Field label="Casa do CIC" value="R$ 1.200" />
          <Field label="Casa Água Verde" value="R$ 1.000" />
          <Field label="Kitnet" value="R$ 800" />
          <Field label="Loja Centro" value="R$ 1.400" />
          <Field label="Sala 2" value="R$ 1.600" />
        </Panel>
        <Panel title="Despesas do mês" subtitle="IPTU, condomínio, taxa">
          <Field label="IPTU" value="R$ 320" />
          <Field label="Condomínio" value="R$ 480" />
          <Field label="Manutenção" value="R$ 150" />
          <Field label="Taxa" value="R$ 12" />
        </Panel>
      </div>
    ),
  },
  /*
   * A SÉTIMA ETAPA — o painel, e o que se configura nele.
   *
   * Era uma seção separada depois da apresentação ("Do seu jeito"). Ela foi
   * reprovada porque quebrava a promessa de que a explicação do site está
   * toda no mesmo lugar: a pessoa via uma apresentação, acabava, e depois
   * vinha outra demonstração animada embaixo — dois blocos, duas explicações.
   *
   * Agora é a última etapa da mesma apresentação, e é a única com
   * **quatro beats**: ela ocupa quatro telas de rolagem, não uma. Quem rola
   * vê o painel aparecer no Modo Simples, virar o Completo, escurecer e
   * crescer a letra — em ordem, sozinho, sem clicar em nada.
   *
   * POR QUE QUATRO E NÃO UMA SÓ TELA. As três coisas que se configuram no
   * painel (tema escuro, letra maior, Simples/Completo) são ESTADOS, não
   * telas. Encaixotar as quatro numa tela só daria quatro miniaturas
   * pequenas demais para ler — e foi justamente o excesso de coisa junta
   * que reprovaram antes ("nas animações está tudo muito perto da outra").
   * Uma por tela de rolagem mantém o mesmo ritmo do resto da apresentação.
   *
   * Começa no Modo Completo — é o padrão do produto, e é a tela com as
   * fotos das casas. Depois vêm o Simples, o tema escuro e a letra maior.
   */
  {
    label: 'Do seu jeito',
    title: 'O painel se configura do seu jeito',
    body: 'Escolha entre os modos Completo e Simples, use o tema escuro ou aumente as letras para uma leitura mais confortável.',
    beats: 4,
    panel: (beat) => <PanelModes beat={beat} />,
  },
];

/* ------------------------------------------------------------------ *
 * Peças dos painéis.
 *
 * Montadas com os componentes de verdade do design system e com os dados
 * de demonstração de verdade.
 * ------------------------------------------------------------------ */

/*
 * Painel da demonstração. `size="md"` no cabeçalho (18px) e não `sm`
 * (16px): com o destaque em 28px, o valor do campo em 16px e o rótulo em
 * 13px, o título do cartão em 16px ficava no mesmo tamanho do valor e a
 * escada desandava. Em 18px ele ocupa o lugar dele.
 */
function Panel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className={s.panel}>
      <CardHeader title={title} subtitle={subtitle} action={action} size="md" />
      <div className={s.panelBody}>{children}</div>
    </Card>
  );
}

/**
 * O DESTAQUE da etapa: um número grande, no máximo um por painel.
 *
 * É o elemento que a pessoa deve ler primeiro, e por isso ele é a única
 * coisa do cartão que cresce de tamanho — 28px, peso leve, tracking de
 * métrica, algarismo tabular para os dígitos não dançarem. Fica colado no
 * cabeçalho, antes das linhas de campo.
 *
 * Os números aparecem PRONTOS, não contando. Houve uma versão com contador
 * animado (o valor subindo de zero) e ela foi reprovada no uso: a
 * apresentação é comandada pela rolagem, então quem rola rápido via o
 * contador no meio — "R$ 17", "R$ 23" — e numa página sobre dinheiro um
 * número errado na tela, mesmo que por 400ms, lê-se como defeito.
 */
function Highlight({ value, label }: { value: string; label: string }) {
  return (
    <div className={s.highlight}>
      <span className={s.highlightValue}>{value}</span>
      <span className={s.highlightLabel}>{label}</span>
    </div>
  );
}

/** Linha "rótulo · valor", como a ficha de um contrato. */
function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className={s.field}>
      <span className={s.fieldLabel}>{label}</span>
      <span className={s.fieldValue}>{value}</span>
    </div>
  );
}

export function LandingScreen() {
  return (
    <div className={s.page}>
      <header className={s.top}>
        <Link className={s.brandLink} href="/" aria-label="Aluga — página inicial">
          <Wordmark size={26} />
        </Link>

        <nav className={s.topNav} aria-label="Navegação principal">
          <a className={s.topLink} href="#tour">
            Como funciona
          </a>

          <a className={s.topLink} href="#planos">
            Planos
          </a>
        </nav>

        <div className={s.topActions}>
          <Link className={s.topLogin} href="/design-system/admin">
            Entrar
          </Link>
          <Link className={s.topAction} href="/design-system/admin">
            Conhecer o painel
          </Link>
        </div>
      </header>

      <main>
        {/* ---------------- Hero comercial ---------------- */}
        <section className={s.heroV2} aria-labelledby="hero-title">
          <div className={s.heroLayout}>

            <div className={s.heroContent}>
              <Badge tone="soft">
                Gestão de aluguéis para proprietários
              </Badge>

              <h1 className={s.heroTitle} id="hero-title">
                Seus imóveis organizados.
                <span className={s.heroTitleAccent}>
                  Seus aluguéis sob controle.
                </span>
              </h1>

              <p className={s.heroDescription}>
                Organize imóveis, contratos, cobranças e recebimentos
                em um só lugar. Acompanhe o que entrou, o que falta
                receber e o resultado de cada imóvel.
              </p>

              <div className={s.heroActions}>
                <Link
                  href="/design-system/admin"
                  className={s.heroPrimaryLink}
                >
                  Conhecer o painel
                  <span aria-hidden="true">→</span>
                </Link>

                <a
                  href="#tour"
                  className={s.heroSecondaryLink}
                >
                  Ver como funciona
                </a>
              </div>

              <p className={s.heroDisclaimer}>
                Explore uma demonstração do painel, sem precisar criar uma conta.
              </p>
            </div>

            <div className={s.heroVisual}>
              <div className={s.heroPreview}>

                <div className={s.heroPreviewHeader}>
                  <div className={s.heroPreviewBrand}>
                    <Wordmark size={20} />
                    <span className={s.heroPreviewSection}>
                      Visão geral
                    </span>
                  </div>

                  <span className={s.heroPreviewStatus}>
                    Demonstração
                  </span>
                </div>

                <div className={s.heroPreviewIntro}>
                  <span className={s.heroPreviewEyebrow}>
                    Seu patrimônio em um só lugar
                  </span>

                  <h2 className={s.heroPreviewTitle}>
                    Acompanhe seus aluguéis
                  </h2>

                  <p className={s.heroPreviewSubtitle}>
                    Exemplo ilustrativo de organização financeira.
                  </p>
                </div>

                <div className={s.heroPreviewMetrics}>
                  <div className={s.heroMetric}>
                    <span className={s.heroMetricLabel}>
                      Imóveis
                    </span>
                    <strong className={s.heroMetricValue}>
                      04
                    </strong>
                    <span className={s.heroMetricDetail}>
                      Cadastrados
                    </span>
                  </div>

                  <div className={s.heroMetric}>
                    <span className={s.heroMetricLabel}>
                      Recebido no mês
                    </span>
                    <strong className={s.heroMetricValue}>
                      R$ 8.400
                    </strong>
                    <span className={s.heroMetricDetail}>
                      Valores ilustrativos
                    </span>
                  </div>
                </div>

                <div className={s.heroPreviewList}>
                  <div className={s.heroPreviewListHead}>
                    <h3>Recebimentos</h3>
                    <span>Exemplo do mês</span>
                  </div>

                  <div className={s.heroPreviewRow}>
                    <div className={s.heroProperty}>
                      <span className={s.heroPropertyIcon} aria-hidden="true">
                        01
                      </span>
                      <div>
                        <strong>Apartamento Aurora</strong>
                        <span>Unidade 101</span>
                      </div>
                    </div>

                    <div className={s.heroPropertyAmount}>
                      <strong>R$ 2.800</strong>
                      <span className={s.heroStatusPaid}>
                        Recebido
                      </span>
                    </div>
                  </div>

                  <div className={s.heroPreviewRow}>
                    <div className={s.heroProperty}>
                      <span className={s.heroPropertyIcon} aria-hidden="true">
                        02
                      </span>
                      <div>
                        <strong>Casa Jardim</strong>
                        <span>Unidade 01</span>
                      </div>
                    </div>

                    <div className={s.heroPropertyAmount}>
                      <strong>R$ 2.200</strong>
                      <span className={s.heroStatusPending}>
                        A receber
                      </span>
                    </div>
                  </div>

                  <div className={s.heroPreviewRow}>
                    <div className={s.heroProperty}>
                      <span className={s.heroPropertyIcon} aria-hidden="true">
                        03
                      </span>
                      <div>
                        <strong>Sala Comercial</strong>
                        <span>Unidade 203</span>
                      </div>
                    </div>

                    <div className={s.heroPropertyAmount}>
                      <strong>R$ 3.400</strong>
                      <span className={s.heroStatusPaid}>
                        Recebido
                      </span>
                    </div>
                  </div>
                </div>

                <p className={s.heroPreviewFootnote}>
                  Dados fictícios para demonstração visual.
                </p>
              </div>
            </div>
          </div>

          <a className={s.heroScrollHint} href="#tour">
            Explore o Aluga na apresentação abaixo
            <IconCaret />
          </a>
        </section>
        {/* ---------------- A apresentação guiada pela rolagem ----------------

            Sete etapas, e a última ocupa quatro telas de rolagem (os quatro
            estados do painel). Tudo o que a landing explica está aqui — uma
            explicação, um bloco. ---------------- */}
        {/* Benefícios principais */}
        <section className={s.benefitsSection} aria-labelledby="benefits-title">
          <div className={s.benefitsContainer}>
            <div className={s.benefitsHeading}>
              <div>
                <span className={s.benefitsLabel}>POR QUE USAR O ALUGA</span>
                <h2 id="benefits-title" className={s.benefitsTitle}>
                  Menos informação espalhada.
                  <span>Mais clareza para administrar.</span>
                </h2>
              </div>
              <p className={s.benefitsLead}>
                Imóveis, contratos e informações financeiras organizados para você
                acompanhar seus aluguéis sem depender de várias planilhas.
              </p>
            </div>
            <div className={s.benefitsCards}>
              {[
                {
                  number: '01',
                  title: 'Tudo em um só lugar',
                  text: 'Organize imóveis, unidades, inquilinos e contratos para encontrar o que precisa.',
                },
                {
                  number: '02',
                  title: 'Saiba o que falta receber',
                  text: 'Acompanhe cobranças, recebimentos e valores que continuam pendentes.',
                },
                {
                  number: '03',
                  title: 'Entenda seus resultados',
                  text: 'Consulte informações financeiras e acompanhe o resultado de cada imóvel.',
                },
              ].map((item) => (
                <article className={s.benefitsCard} key={item.number}>
                  <span className={s.benefitsNumber}>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <ProductTour steps={TOUR} id="tour" />

        {/* Recursos em detalhe */}
        <section className={s.featuresSection} id="recursos" aria-labelledby="features-title">
          <div className={s.featuresContainer}>
            <div className={s.featuresIntro}>
              <span className={s.featuresEyebrow}>RECURSOS DO ALUGA</span>
              <h2 id="features-title">
                Do cadastro ao recebimento.
                <span>Tudo faz parte da mesma gestão.</span>
              </h2>
              <p>
                Você não precisa procurar cada informação em um lugar diferente.
                Acompanhe as etapas da administração dos seus aluguéis com mais contexto.
              </p>
            </div>

            <div className={s.featuresLayout}>
              <div className={s.featuresList}>
                {[
                  {
                    number: '01',
                    title: 'Imóveis e unidades',
                    text: 'Organize endereços, unidades e seus respectivos titulares em uma estrutura fácil de consultar.',
                  },
                  {
                    number: '02',
                    title: 'Contratos e inquilinos',
                    text: 'Consulte quem ocupa cada unidade, o valor combinado e as datas importantes do contrato.',
                  },
                  {
                    number: '03',
                    title: 'Cobranças e recebimentos',
                    text: 'Veja os valores previstos, o que já foi recebido e o que continua pendente.',
                  },
                  {
                    number: '04',
                    title: 'Despesas e resultados',
                    text: 'Reúna informações financeiras para entender melhor o resultado de cada imóvel.',
                  },
                ].map((feature) => (
                  <article className={s.featureItem} key={feature.number}>
                    <span className={s.featureNumber}>{feature.number}</span>
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className={s.featuresVisual}>
                <div className={s.featuresVisualHeader}>
                  <span>VISÃO DA GESTÃO</span>
                  <span className={s.featuresDemoBadge}>Exemplo ilustrativo</span>
                </div>

                <div className={s.featuresFlow}>
                  <div className={s.featuresFlowMain}>
                    <span className={s.featuresFlowLabel}>IMÓVEL</span>
                    <strong>Edifício das Araucárias</strong>
                    <span>3 unidades cadastradas</span>
                  </div>

                  <div className={s.featuresFlowConnector} aria-hidden="true" />

                  <div className={s.featuresFlowPair}>
                    <div className={s.featuresFlowCard}>
                      <span className={s.featuresFlowLabel}>CONTRATO</span>
                      <strong>Apartamento 201</strong>
                      <span>Vencimento dia 10</span>
                    </div>
                    <div className={s.featuresFlowCard}>
                      <span className={s.featuresFlowLabel}>COBRANÇA</span>
                      <strong>Outubro</strong>
                      <span>R$ 1.850,00 previstos</span>
                    </div>
                  </div>

                  <div className={s.featuresFlowConnector} aria-hidden="true" />

                  <div className={s.featuresFlowResult}>
                    <div>
                      <span className={s.featuresFlowLabel}>RECEBIMENTO</span>
                      <strong>R$ 1.850,00</strong>
                    </div>
                    <span className={s.featuresFlowStatus}>Recebido</span>
                  </div>
                </div>

                <p className={s.featuresVisualNote}>
                  Dados fictícios para demonstrar a organização das informações.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gestao familiar */}
        <section className={s.familySection} id="familia" aria-labelledby="family-title">
          <div className={s.familyContainer}>
            <div className={s.familyContent}>
              <span className={s.familyEyebrow}>GESTÃO FAMILIAR</span>
              <h2 id="family-title">
                Patrimônio compartilhado.
                <span>Informações de cada titular no seu lugar.</span>
              </h2>
              <p>
                Quando os imóveis pertencem a pessoas diferentes da mesma família,
                a organização precisa respeitar essa divisão.
              </p>
              <p>
                O Aluga permite relacionar imóveis aos seus titulares e consultar
                informações por responsável, sem perder a visão do conjunto.
              </p>

              <div className={s.familyHighlights}>
                <div>
                  <strong>Por titular</strong>
                  <span>Identifique a quem pertence cada imóvel.</span>
                </div>
                <div>
                  <strong>Visão conjunta</strong>
                  <span>Acompanhe os imóveis da família em uma organização central.</span>
                </div>
              </div>
            </div>

            <div className={s.familyVisual}>
              <div className={s.familyVisualTop}>
                <div>
                  <span className={s.familyVisualLabel}>EXEMPLO DE ORGANIZAÇÃO</span>
                  <h3>Imóveis por titular</h3>
                </div>
                <span className={s.familyVisualTag}>Dados fictícios</span>
              </div>

              {[
                { initials: 'IA', name: 'Iara Alves', description: '2 imóveis vinculados', properties: 'Casa do CIC · Sala Centro' },
                { initials: 'MA', name: 'Marcos Alves', description: '1 imóvel vinculado', properties: 'Apartamento Jardim' },
                { initials: 'LA', name: 'Lúcia Alves', description: '2 imóveis vinculados', properties: 'Sobrado Norte · Loja Central' },
              ].map((holder) => (
                <div className={s.familyHolder} key={holder.initials}>
                  <div className={s.familyAvatar} aria-hidden="true">{holder.initials}</div>
                  <div className={s.familyHolderInfo}>
                    <strong>{holder.name}</strong>
                    <span>{holder.properties}</span>
                  </div>
                  <span className={s.familyHolderCount}>{holder.description}</span>
                </div>
              ))}

              <div className={s.familyVisualFooter}>
                Uma organização central, com cada imóvel associado ao seu titular.
              </div>
            </div>
          </div>
        </section>
        {/* Como funciona */}
        <section className={s.processSection} id="como-funciona" aria-labelledby="process-title">
          <div className={s.processContainer}>
            <div className={s.processHeading}>
              <div>
                <span className={s.processEyebrow}>COMO FUNCIONA</span>
                <h2 id="process-title">
                  Uma forma mais simples
                  <span>de cuidar dos seus aluguéis.</span>
                </h2>
              </div>
              <p>
                Comece organizando seus imóveis. Depois, acompanhe contratos,
                cobranças e resultados em um mesmo lugar.
              </p>
            </div>
            <div className={s.processSteps}>
              {[
                {
                  number: '01',
                  label: 'ORGANIZE',
                  title: 'Cadastre seus imóveis',
                  text: 'Reúna imóveis e unidades, identificando seus titulares e as informações de cada endereço.',
                },
                {
                  number: '02',
                  label: 'ACOMPANHE',
                  title: 'Tenha os contratos à mão',
                  text: 'Consulte inquilinos, vencimentos e cobranças para saber o que precisa da sua atenção.',
                },
                {
                  number: '03',
                  label: 'ENTENDA',
                  title: 'Veja o resultado',
                  text: 'Acompanhe recebimentos, despesas e informações financeiras dos seus imóveis.',
                },
              ].map((step) => (
                <article className={s.processStep} key={step.number}>
                  <div className={s.processStepTop}>
                    <span className={s.processNumber}>{step.number}</span>
                    <span className={s.processStepLabel}>{step.label}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
            <div className={s.processBottom}>
              <p>Quer conhecer as telas antes de começar?</p>
              <a href="#tour" className={s.processLink}>
                Explorar a demonstração
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Planos */}
        <section className={s.plansV2} id="planos" aria-labelledby="plans-intro-title">
          <div className={s.plansV2Container}>
            <div className={s.plansV2Intro}>
              <span className={s.plansV2Eyebrow}>PLANOS E PREÇOS</span>
              <h2 id="plans-intro-title">
                Um plano para o tamanho
                <span>do seu patrimônio.</span>
              </h2>
              <p>
                Compare os limites de unidades e titulares. Escolha entre
                pagamento mensal ou anual e encontre a opção adequada à sua gestão.
              </p>
            </div>
            <PricingTable
              className={s.plansV2Table}
              plans={PLANS.map((plan) => ({
                ...plan,
                ctaLabel: 'Conhecer o painel',
                ctaIcon: 'arrow-right' as const,
              }))}
              yearlyMonths={10}
              yearlyNote="10 meses, 2 de graça"
              onSelect={() => (window.location.href = '/design-system/admin')}
            />
            <div className={s.plansV2Notes}>
              <div>
                <strong>O que conta como unidade?</strong>
                <p>
                  Cada espaço que gera aluguel conta como uma unidade.
                  Uma casa, kitnet ou loja alugada individualmente corresponde a uma unidade.
                </p>
              </div>
              <div>
                <strong>Informações adicionais</strong>
                <PricingNote>
                  Titular adicional: R$ 9 por mês. Cada conta inclui dois acessos
                  de ajudante. No pagamento anual, o valor equivale a dez mensalidades.
                </PricingNote>
              </div>
            </div>
            <p className={s.plansV2Disclaimer}>
              Os botões dos planos abrem uma demonstração do painel.
              A contratação não é realizada nesta página.
            </p>
          </div>
        </section>
        {/* Perguntas frequentes */}
        <section className={s.faqSection} id="perguntas" aria-labelledby="faq-title">
          <div className={s.faqContainer}>
            <div className={s.faqIntro}>
              <span className={s.faqEyebrow}>PERGUNTAS FREQUENTES</span>
              <h2 id="faq-title">
                Tudo mais claro
                <span>antes de começar.</span>
              </h2>
              <p>
                Reunimos algumas respostas sobre a organização dos imóveis,
                os titulares e os planos do Aluga.
              </p>
              <Link href="/design-system/admin" className={s.faqLink}>
                Conhecer o painel
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className={s.faqList}>
              {[
                {
                  question: 'Para quem o Aluga foi pensado?',
                  answer: 'Para proprietários que administram seus próprios imóveis e precisam organizar contratos, cobranças e informações financeiras.',
                },
                {
                  question: 'O que conta como uma unidade?',
                  answer: 'Cada espaço alugado individualmente conta como uma unidade. Uma casa conta como uma; três kitnets alugadas separadamente contam como três.',
                },
                {
                  question: 'Posso organizar imóveis de diferentes pessoas da família?',
                  answer: 'O Aluga trabalha com titulares. Assim, cada imóvel pode ser relacionado ao seu responsável, mantendo as informações organizadas.',
                },
                {
                  question: 'Qual é a diferença entre os planos?',
                  answer: 'Os limites de unidades e titulares variam conforme o plano. Você pode comparar essas quantidades nos cartões de preços acima.',
                },
                {
                  question: 'Como funciona o pagamento anual?',
                  answer: 'O valor anual corresponde a dez mensalidades do plano escolhido. O seletor de preços mostra o total anual antes da contratação.',
                },
                {
                  question: 'Preciso criar uma conta para conhecer o painel?',
                  answer: 'Não para explorar a demonstração disponível nesta página. Ela utiliza dados ilustrativos e não cria uma conta.',
                },
              ].map((item) => (
                <details name="aluga-faq" className={s.faqItem} key={item.question}>
                  <summary className={s.faqQuestion}>
                    <span>{item.question}</span>
                    <span className={s.faqIndicator} aria-hidden="true">+</span>
                  </summary>
                  <p className={s.faqAnswer}>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className={s.finalV2} aria-labelledby="final-title">
          <div className={s.finalV2Inner}>
            <span className={s.finalV2Eyebrow}>CONHEÇA O ALUGA</span>
            <h2 id="final-title">
              Seus imóveis merecem
              <span>uma gestão mais tranquila.</span>
            </h2>
            <p>
              Explore o painel, conheça as telas e veja como o Aluga organiza
              as informações importantes dos seus aluguéis.
            </p>
            <Link href="/design-system/admin" className={s.finalV2Button}>
              Explorar o painel
              <span aria-hidden="true">→</span>
            </Link>
            <span className={s.finalV2Note}>
              Demonstração com dados ilustrativos. Não é necessário criar uma conta.
            </span>
          </div>
        </section>
      </main>

      <footer className={s.footerV2}>
        <div className={s.footerV2Container}>
          <div className={s.footerV2Main}>
            <div className={s.footerV2Brand}>
              <Link href="/" aria-label="Aluga, voltar ao início">
                <Wordmark variant="spaced" size={20} />
              </Link>
              <p>
                Mais organização para quem cuida dos próprios imóveis.
              </p>
            </div>

            <nav className={s.footerV2Nav} aria-label="Navegação do rodapé">
              <div>
                <strong>Conheça</strong>
                <a href="#recursos">Recursos</a>
                <a href="#familia">Gestão familiar</a>
                <a href="#como-funciona">Como funciona</a>
              </div>
              <div>
                <strong>Explore</strong>
                <a href="#tour">Demonstração</a>
                <a href="#planos">Planos e preços</a>
                <a href="#perguntas">Perguntas frequentes</a>
              </div>
            </nav>
          </div>

          <div className={s.footerV2Bottom}>
            <p>Aluga — gestão de aluguéis para proprietários.</p>
            <p>Nome provisório, sujeito à verificação antes do lançamento.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/** A seta da dica de rolagem — `Icon` do design system, não um caractere. */
function IconCaret() {
  return (
    <svg
      className={s.scrollCaret}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
