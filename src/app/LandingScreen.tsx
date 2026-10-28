'use client';

import type { ReactNode } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  HowItWorks,
  Metric,
  PricingNote,
  PricingTable,
  ProcessDemo,
  Wordmark,
  type DemoStep,
  type PlanSpec,
} from '@design-system';
import { SimpleModeScreen } from '../../design-system/templates/admin/SimpleModeScreen';
import type { ToastInput } from '../../design-system/templates/admin/AdminApp';
import s from './page.module.css';

/**
 * Landing do Aluga — tarefa 7 do Segundo Cérebro e R10 da spec.
 *
 * RESTRIÇÃO QUE DEFINE ESTE ARQUIVO: *"Só componentes e tokens do design
 * system."* Nada de CSS solto, nada de cor ou tamanho fora dos tokens. O
 * `page.module.css` daqui usa só `var(--…)` de `design-system/tokens` — dá
 * para conferir com o validador.
 *
 * FONTE DE TODO TEXTO: `PRODUCT.md`. O que o documento não diz, a landing
 * não inventa. Duas ausências deliberadas:
 *
 *   · **Sem prova social.** "+300 proprietários", "+1.200 imóveis" e
 *     "32% menos inadimplência" são números do **AluggaPro**, lidos na
 *     engenharia reversa. O Aluga não lançou — não tem número para contar,
 *     e número emprestado é mentira.
 *   · **Sem comparação com concorrente.** `PRODUCT.md` diz que os termos do
 *     AluggaPro proíbem copiar interface, código e design.
 *
 * A seção do Modo simples renderiza a **tela de verdade**
 * (`SimpleModeScreen`), não um desenho dela. Se a tela muda, a landing muda
 * junto — é a única forma de a promessa não mentir.
 */
const PLANS: PlanSpec[] = [
  { name: 'Essencial', price: 59, units: 'até 5', holders: '1 titular' },
  { name: 'Família', price: 99, units: 'até 10', holders: '3 titulares' },
  { name: 'Patrimônio', price: 209, units: 'até 50', holders: '5 titulares' },
  { name: 'Investidor', price: 269, units: 'ilimitadas', holders: 'ilimitados' },
];

/** Os três passos são o arco do produto, cada um com features da v1. */
const STEPS = [
  {
    n: 1,
    title: 'Cadastre',
    icon: 'building-2' as const,
    body: 'Imóvel, unidade, inquilino e contrato. Uma vez só — valor, dia de vencimento e reajuste ficam guardados.',
  },
  {
    n: 2,
    title: 'O app cobra',
    icon: 'message-circle' as const,
    body: 'Gera a cobrança do mês, lembra o inquilino no WhatsApp 3 dias antes, no dia e 3 dias depois, e cria o pagamento no Mercado Pago.',
  },
  {
    n: 3,
    title: 'Você acompanha',
    icon: 'chart-spline' as const,
    body: 'Responde "Recebeu?" e a baixa sai sozinha. Despesas por imóvel e o informe de rendimentos separado por titular, para levar ao contador.',
  },
];

/* ------------------------------------------------------------------ *
 * Peças dos painéis de demonstração.
 *
 * São montadas com os componentes de verdade do design system
 * (`Card`, `CardHeader`, `Metric`, `Badge`, `Avatar`) e com os números de
 * demonstração de verdade das telas (`chargesData`, `contractsData`,
 * `receiptsData`). Os totais conferem com a tela de Cobranças e com a de
 * Recebimentos: R$ 2.600 / R$ 1.800 / R$ 4.400 e R$ 5.600,00 / R$ 962,00 /
 * R$ 4.638,00 / 78%.
 * ------------------------------------------------------------------ */

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
    <Card>
      <CardHeader title={title} subtitle={subtitle} action={action} size="sm" />
      <div className={s.panelBody}>{children}</div>
    </Card>
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

/** Régua de métricas — a mesma da tela, em três ou quatro cartões. */
function Metrics({ items }: { items: Array<{ title: string; value: string }> }) {
  return (
    <div className={s.metrics}>
      {items.map((m) => (
        <Card key={m.title}>
          <CardHeader title={m.title} size="sm" />
          <Metric value={m.value} size="md" />
        </Card>
      ))}
    </div>
  );
}

/**
 * As três demonstrações, na ordem em que a pessoa usa.
 *
 * HONESTIDADE, escrita de propósito: dois passos descrevem automação que
 * **ainda não existe no código**.
 *
 *   · "Boleto e Pix prontos" — criar o pagamento no Mercado Pago é a
 *     tarefa 11 do Segundo Cérebro (tutorial do OAuth). A tela de Cobranças
 *     existe; a geração do boleto, não.
 *   · "Lembrete no WhatsApp" — a régua de lembretes é a tarefa 9.
 *
 * `PRODUCT.md` promete as duas, então a landing pode falar delas. Mas quem
 * lesse como "já está pronto" estaria lendo errado — por isso o título leva
 * o aviso e a seção explica. Nada aqui é print de tela do concorrente: os
 * painéis são do nosso design system, com os nossos dados.
 */
const DEMOS: Array<{ label: string; steps: DemoStep[] }> = [
  {
    label: 'Contratos',
    steps: [
      {
        title: 'O contrato, em uma ficha',
        detail: 'Unidade, inquilino, valor e dia de vencimento. Uma vez só.',
        children: (
          <Panel
            title="Casa do CIC"
            subtitle="casa · alugada"
            action={<Badge tone="success">Vigente</Badge>}
          >
            <Field label="Inquilino" value="Maria Silva" />
            <Field label="Valor" value="R$ 1.200" />
            <Field label="Vence" value="dia 5" />
            <Field label="Início" value="05/03/2024" />
          </Panel>
        ),
      },
      {
        title: 'O reajuste já está no contrato',
        detail: 'IGP-M, IPCA ou porcentagem fixa, com o mês de aniversário.',
        children: (
          <Panel title="Reajuste" subtitle="Como o valor corrige todo ano">
            <Field label="Índice" value="IGP-M (FGV)" />
            <Field label="Aniversário" value="março" />
            <Field label="Próximo reajuste" value="março de 2027" />
          </Panel>
        ),
      },
      {
        title: 'Pessoa física ou jurídica, desde o início',
        detail: 'É o que separa o Imposto de Renda por titular na hora de declarar.',
        children: (
          <Panel title="Titulares" subtitle="Quem assina o contrato">
            <div className={s.people}>
              <div className={s.person}>
                <Avatar name="Maria Silva" size={28} />
                <span className={s.personName}>Maria Silva</span>
                <Badge tone="neutral">PF</Badge>
              </div>
              <div className={s.person}>
                <Avatar name="Clínica Vida Ltda" size={28} />
                <span className={s.personName}>Clínica Vida Ltda</span>
                <Badge tone="neutral">PJ</Badge>
              </div>
            </div>
          </Panel>
        ),
      },
      {
        title: 'A cobrança nasce daqui',
        detail: 'Do contrato sai a cobrança do mês, no valor e no dia certos.',
        children: (
          <Panel title="Cobrança de outubro" subtitle="Casa do CIC · Maria Silva">
            <Field label="Valor" value="R$ 1.200" />
            <Field label="Vence" value="05/10/2026" />
          </Panel>
        ),
      },
    ],
  },
  {
    label: 'Cobranças',
    steps: [
      {
        title: 'A cobrança do mês já está lá',
        detail: 'Gerada a partir do contrato. Você não cria nada.',
        children: (
          <Metrics
            items={[
              { title: 'Recebido', value: 'R$ 2.600' },
              { title: 'Em aberto', value: 'R$ 1.800' },
              { title: 'Previsto', value: 'R$ 4.400' },
            ]}
          />
        ),
      },
      {
        title: '⚠️ Boleto e Pix prontos',
        detail:
          'O app cria o pagamento no Mercado Pago e o inquilino paga por Pix, boleto ou saldo.',
        children: (
          <Panel title="Cobrança" subtitle="Casa do CIC · Maria Silva">
            <Field label="Valor" value="R$ 1.200" />
            <Field label="Vence" value="05/10/2026" />
            <div className={s.payRow}>
              <Button size="sm">Pix</Button>
              <Button size="sm" variant="secondary" icon="file-text">
                Boleto
              </Button>
            </div>
          </Panel>
        ),
      },
      {
        title: '⚠️ Lembrete no WhatsApp',
        detail: 'A mensagem sai do jeito que a pessoa lê. Você pausa quando quiser.',
        children: (
          <div className={s.chat}>
            <div className={s.bubble}>
              <span className={s.bubbleWho}>Maria · Casa do CIC</span>
              <p className={s.bubbleText}>
                Oi Maria, o aluguel de R$ 1.200 vence dia 5. Dá para pagar por Pix ou boleto.
              </p>
            </div>
          </div>
        ),
      },
      {
        title: 'Pagou, deu baixa',
        detail: 'O pagamento cai e a cobrança fecha sozinha. Sem planilha.',
        children: (
          <Panel
            title="Casa do CIC"
            subtitle="R$ 1.200 · 05/10/2026"
            action={<Badge tone="success">Paga</Badge>}
          >
            <Field label="Baixa" value="automática em 05/10" />
          </Panel>
        ),
      },
    ],
  },
  {
    label: 'Recebimentos',
    steps: [
      {
        title: 'Pagamento identificado',
        detail: 'Mercado Pago, WhatsApp ou manual — cada recebimento guarda a origem.',
        children: (
          <Panel title="Recebimentos" subtitle="O que entrou em outubro">
            <Field label="Casa do CIC" value={<Badge tone="success">Mercado Pago</Badge>} />
            <Field label="Casa Água Verde" value={<Badge tone="neutral">WhatsApp</Badge>} />
            <Field label="Kitnet" value={<Badge tone="neutral">Manual</Badge>} />
          </Panel>
        ),
      },
      {
        title: 'Baixa com responsável',
        detail: 'A cobrança guarda quem deu a baixa e quando — automática quando o pagamento cai.',
        children: (
          <Panel title="Quem deu a baixa" subtitle=" outubro">
            <Field label="Casa do CIC" value="baixa automática em 05/10" />
            <Field label="Casa Água Verde" value="você em 03/10, pelo &ldquo;Recebeu?&rdquo;" />
          </Panel>
        ),
      },
      {
        title: 'Recibo na hora',
        detail: 'A confirmação do pagamento sai com o valor e a unidade.',
        children: (
          <Panel title="Recibo" subtitle="Outubro de 2026">
            <Field label="Recebido de" value="Maria Silva" />
            <Field label="Referente a" value="Casa do CIC" />
            <Field label="Valor" value="R$ 1.200" />
          </Panel>
        ),
      },
      {
        title: 'Quanto cada imóvel rende',
        detail: 'Despesas por imóvel e por titular — o Imposto de Renda sai separado.',
        children: (
          <Metrics
            items={[
              { title: 'Recebido', value: 'R$ 5.600,00' },
              { title: 'Despesas', value: 'R$ 962,00' },
              { title: 'Resultado', value: 'R$ 4.638,00' },
              { title: 'Ocupação', value: '78%' },
            ]}
          />
        ),
      },
    ],
  },
];

const noopToast = (() => {}) as unknown as (t: ToastInput) => void;

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
        {/* ---------------- Hero ---------------- */}
        <section className={s.hero}>
          <Badge tone="soft">Nome provisório</Badge>
          <h1 className={s.headline}>
            Cobre, receba e saiba quanto cada <span className={s.accent}>imóvel rende.</span>
          </h1>
          <p className={s.lead}>
            O Aluga gera a cobrança de cada mês, lembra o inquilino no WhatsApp, dá baixa quando o
            Pix cai e entrega o Imposto de Renda separado por titular. Feito para quem tem imóvel
            e não tem tempo de planilha.
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
              onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver os planos
            </Button>
          </div>
          <p className={s.fine}>14 dias no app, sem cartão. Depois do teste, o app pede para assinar.</p>
        </section>

        {/* ---------------- Como funciona ---------------- */}
        <HowItWorks steps={STEPS} lead="Três passos, e o resto é automático." />

        {/* ------------- Como funciona, na prática ------------- */}
        <section className={s.demos} id="como-funciona">
          <div className={s.demosHead}>
            <h2 className={s.sectionTitle}>Como funciona, na prática</h2>
            <p className={s.sectionLead}>
              O processo andando sozinho, como acontece no app. Cada painel troca por conta
              própria; se você encostar o mouse, ele espera. Os passos marcados com ⚠️ são promessa
              do PRODUCT.md que ainda não está construída — estão ditos aqui, não escondidos.
            </p>
          </div>
          {DEMOS.map((d) => (
            <ProcessDemo key={d.label} label={d.label} steps={d.steps} />
          ))}
        </section>

        {/* ---------------- Modo simples ---------------- */}
        <section className={s.simple} id="modo-simples">
          <div className={s.simpleCopy}>
            <h2 className={s.sectionTitle}>A tela &ldquo;Este mês&rdquo;</h2>
            <p className={s.sectionLead}>
              Para quem tem dificuldade com sistema, ou só quer ver o que importa: um cartão por
              unidade, o status escrito em palavras e dois botões — <strong>Recebi</strong> e{' '}
              <strong>Lembrar no WhatsApp</strong>.
            </p>
            <p className={s.fine}>
              Esta é a tela de verdade, renderizada aqui dentro. Se ela mudar no app, muda aqui
              também.
            </p>
          </div>
          <div className={s.device}>
            <div className={s.deviceScreen}>
              <SimpleModeScreen bp="d" toast={noopToast} />
            </div>
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
            Unidade é o que gera aluguel: cada kitnet ou loja conta como uma. Titular extra custa
            R$ 9 por mês, e cada conta tem 2 logins de ajudante de graça. Os 5 primeiros fundadores
            têm o primeiro mês grátis.
          </PricingNote>
        </section>

        {/* ---------------- CTA final ---------------- */}
        <section className={s.final}>
          <h2 className={s.sectionTitle}>Experimente 14 dias, sem cartão</h2>
          <p className={s.sectionLead}>
            Cadastre um imóvel, um inquilino e um contrato. Se não fizer sentido, não paga nada.
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
          Aluga é nome provisório. O definitivo passa pelo INPI antes do lançamento.
        </p>
      </footer>
    </div>
  );
}
