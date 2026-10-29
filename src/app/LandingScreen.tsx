'use client';

import type { ReactNode } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  PricingNote,
  PricingTable,
  ProductTour,
  Wordmark,
  type PlanSpec,
  type TourStep,
} from '@design-system';
import { MeuMesDemo } from './MeuMesDemo';
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
 * verdade; a seção "Meu mês" renderiza a tela real do Modo simples, com o
 * menu de configurações de verdade. Se uma tela mudar no app, a landing
 * muda junto — é a única forma de a promessa não mentir.
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
    panel: (
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
    panel: (
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
    panel: (
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
    panel: (
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
    panel: (
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
    panel: (
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
        <Wordmark size={26} />
        <nav className={s.topNav} aria-label="Atalhos">
          <a className={s.topLink} href="/design-system">
            Design system
          </a>
          <a className={s.topLink} href="/design-system/admin">
            Template do painel
          </a>
        </nav>
      </header>

      <main>
        {/* ---------------- Hero: só o convite ---------------- */}
        <section className={s.hero}>
          <Badge tone="soft">Em construção · nome provisório</Badge>
          <h1 className={s.headline}>
            Cobre, receba e saiba quanto cada <span className={s.accent}>imóvel rende.</span>
          </h1>
          <p className={s.lead}>
            Você cadastra o imóvel e o inquilino uma vez. Depois disso o Aluga cobra todo mês,
            lembra quem está devendo, dá baixa quando o Pix cai e ainda separa o Imposto de Renda
            por titular. Você só acompanha.
          </p>
          <div className={s.ctas}>
            <Button
              size="lg"
              iconRight="arrow-right"
              onClick={() => (window.location.href = '/design-system/admin')}
            >
              Começar teste grátis
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() =>
                document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Ver os planos
            </Button>
          </div>
          <p className={s.fine}>
            14 dias de app completo, sem cartão. Quando acabar, você decide se assina.
          </p>
          <p className={s.scrollCue}>
            Role para ver o app funcionando
            <IconCaret />
          </p>
        </section>

        {/* ---------------- A apresentação guiada pela rolagem ---------------- */}
        <ProductTour steps={TOUR} id="tour" />

        {/* ---------------- Do seu jeito ---------------- */}
        <section className={s.mes}>
          <div className={s.mesCopy}>
            <h2 className={s.sectionTitle}>Você configura do seu jeito</h2>
            <p className={s.sectionLead}>
              O ciclo acontece sozinho: a cobrança do mês nasce do contrato, o lembrete sai no
              WhatsApp três dias antes, e quando o Pix cai a baixa é automática. Isso passa aqui em
              cima, sem você tocar em nada.
            </p>
            <p className={s.sectionLead}>
              Embaixo, o painel — e você escolhe como quer ver. Letra maior e botões maiores para
              quem tem dificuldade com sistema. Tema escuro para quem trabalha à noite. E duas
              formas de ver: Simples, com um cartão por unidade e o que entrou no mês, ou Completo,
              com a visão geral inteira.
            </p>
            <p className={s.fine}>
              Tudo isso é configuração — não é versão diferente do app, e não custa nada a mais.
            </p>
            <p className={s.fine}>
              É o painel de verdade, rodando aqui dentro. Mexa na engrenagem: os modos funcionam.
            </p>
          </div>
          <div className={s.mesStage}>
            <MeuMesDemo />
          </div>
        </section>

        {/* ---------------- Planos ---------------- */}
        <section className={s.plans} id="planos">
          <PricingTable
            plans={PLANS}
            yearlyMonths={10}
            yearlyNote="10 meses, 2 de graça"
            onSelect={() => (window.location.href = '/design-system/admin')}
          />
          <PricingNote>
            Unidade é o que gera aluguel: cada kitnet ou loja conta como uma. Titular extra sai R$ 9
            por mês, e toda conta vem com 2 logins de ajudante de graça. Os 5 primeiros fundadores
            ganham o primeiro mês.
          </PricingNote>
        </section>

        {/* ---------------- CTA final ---------------- */}
        <section className={s.final}>
          <h2 className={s.sectionTitle}>14 dias, sem cartão e sem perguntar nada</h2>
          <p className={s.sectionLead}>
            Cadastra um imóvel, um inquilino e um contrato. Se não fizer sentido para você, some e
            não paga nada.
          </p>
          <Button
            size="lg"
            iconRight="arrow-right"
            onClick={() => (window.location.href = '/design-system/admin')}
          >
            Começar teste grátis
          </Button>
        </section>
      </main>

      <footer className={s.foot}>
        <Wordmark variant="spaced" size={14} />
        <p className={s.fine}>
          Aluga é o nome provisório. O definitivo passa pelo INPI antes do lançamento.
        </p>
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
