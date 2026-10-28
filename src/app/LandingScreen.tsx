'use client';

import {
  Badge,
  Button,
  HowItWorks,
  PricingNote,
  PricingTable,
  ProductTour,
  Wordmark,
  type PlanSpec,
  type TourStep,
} from '@design-system';
import { SimpleModeScreen } from '../../design-system/templates/admin/SimpleModeScreen';
import { PropertiesScreen } from '../../design-system/templates/admin/PropertiesScreen';
import { TenantsScreen } from '../../design-system/templates/admin/TenantsScreen';
import { ContractsScreen } from '../../design-system/templates/admin/ContractsScreen';
import { ChargesScreen } from '../../design-system/templates/admin/ChargesScreen';
import { FinanceScreen } from '../../design-system/templates/admin/FinanceScreen';
import { ExpensesScreen } from '../../design-system/templates/admin/ExpensesScreen';
import type { ToastInput } from '../../design-system/templates/admin/AdminApp';
import type { ModuleId } from '../../design-system/templates/admin/Shell';
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
 *     AluggaPro proíbem copiar interface, código e design. Comparar preço
 *     não é copiar tela, mas também não é o que a tarefa pede.
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

const noop = () => {};
const noopToast = noop as unknown as (t: ToastInput) => void;
const noopGo = noop as unknown as (m: ModuleId) => void;

/**
 * Os três tours mostram as telas de verdade do app, na ordem em que a
 * pessoa usa. Cada passo renderiza a tela real dentro da moldura — não um
 * desenho dela, não um print, não uma maquete.
 *
 * HONESTIDADE, e isso está escrito de propósito: dois passos daqui
 * descrevem automação que **ainda não existe no código**.
 *
 *   · A创建criação do pagamento no Mercado Pago, com boleto, é a tarefa 11
 *     do Segundo Cérebro — o tutorial do OAuth. A tela de Cobranças existe;
 *     a geração do boleto, não.
 *   · A régua de lembretes (3 dias antes, no dia, 3 dias depois) é a
 *     tarefa 9. `PRODUCT.md` promete as duas, então a landing pode falar
 *     delas — mas quem ler estes passos como "já está pronto" está lendo
 *     errado. Estão marcados com ⚠️ nos títulos.
 *
 * Fora isso, tudo o que os tours mostram está construído e validado: as
 * telas de Imóveis, Inquilinos, Contratos, Cobranças, Recebimentos e
 * Despesas são as da tarefa 5, commitadas.
 */
const TOURS: Array<{ label: string; steps: TourStep[] }> = [
  {
    label: 'Contratos',
    steps: [
      {
        screen: 'Imóveis',
        title: 'Cadastre o imóvel e as unidades',
        detail: 'Uma vez só. Endereço, unidades e quanto cada uma rende.',
        cursor: { x: 34, y: 30 },
        children: <PropertiesScreen bp="d" toast={noopToast} go={noopGo} />,
      },
      {
        screen: 'Inquilinos',
        title: 'Quem mora em cada unidade',
        detail:
          'Com CPF ou CNPJ. É o que separa o Imposto de Renda por titular depois.',
        cursor: { x: 26, y: 44 },
        children: <TenantsScreen bp="d" toast={noopToast} />,
      },
      {
        screen: 'Contratos',
        title: 'Valor, vencimento e reajuste',
        detail:
          'IGP-M, IPCA ou porcentagem fixa, com o mês de aniversário. É o que basta para cobrar.',
        cursor: { x: 62, y: 34 },
        children: <ContractsScreen bp="d" toast={noopToast} />,
      },
      {
        screen: 'Cobranças',
        title: 'A primeira cobrança já existe',
        detail: 'Gerada a partir do contrato, no mês e no dia certos.',
        cursor: { x: 44, y: 52 },
        children: <ChargesScreen bp="d" toast={noopToast} />,
      },
    ],
  },
  {
    label: 'Cobranças',
    steps: [
      {
        screen: 'Cobranças',
        title: 'A cobrança do mês já está lá',
        detail: 'Gerada a partir do contrato. Você não cria nada.',
        cursor: { x: 30, y: 36 },
        children: <ChargesScreen bp="d" toast={noopToast} />,
      },
      {
        screen: 'Cobranças',
        title: '⚠️ Boleto e Pix prontos',
        detail:
          'O app cria o pagamento no Mercado Pago e o inquilino paga por Pix, boleto ou saldo.',
        cursor: { x: 70, y: 40 },
        children: <ChargesScreen bp="d" toast={noopToast} />,
      },
      {
        screen: 'Recebimentos',
        title: '⚠️ O app lembra antes de vencer',
        detail:
          'Lembrete no WhatsApp, do jeito que a pessoa lê. Você pausa quando quiser.',
        cursor: { x: 82, y: 22 },
        children: <FinanceScreen bp="d" toast={noopToast} />,
      },
      {
        screen: 'Cobranças',
        title: 'Pagou, deu baixa',
        detail: 'O pagamento cai e a cobrança fecha. Sem planilha.',
        cursor: { x: 52, y: 60 },
        children: <ChargesScreen bp="d" toast={noopToast} />,
      },
    ],
  },
  {
    label: 'Recebimentos',
    steps: [
      {
        screen: 'Recebimentos',
        title: 'Pagamento identificado',
        detail: 'Mercado Pago, WhatsApp ou manual — cada recebimento guarda a origem.',
        cursor: { x: 24, y: 30 },
        children: <FinanceScreen bp="d" toast={noopToast} />,
      },
      {
        screen: 'Cobranças',
        title: 'Baixa com responsável',
        detail: 'A cobrança guarda quem deu a baixa e quando. Automática quando o pagamento cai.',
        cursor: { x: 60, y: 48 },
        children: <ChargesScreen bp="d" toast={noopToast} />,
      },
      {
        screen: 'Recebimentos',
        title: 'Recibo na hora',
        detail: 'A confirmação do pagamento sai na hora, com o valor e a unidade.',
        cursor: { x: 40, y: 56 },
        children: <FinanceScreen bp="d" toast={noopToast} />,
      },
      {
        screen: 'Despesas',
        title: 'Quanto cada imóvel rende',
        detail: 'Despesas por imóvel e por titular — o Imposto de Renda sai separado.',
        cursor: { x: 56, y: 38 },
        children: <ExpensesScreen bp="d" toast={noopToast} />,
      },
    ],
  },
];

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
            <Button size="lg" iconRight="arrow-right" onClick={() => (window.location.href = '/design-system/admin')}>
              Começar teste grátis
            </Button>
            <Button size="lg" variant="secondary" onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}>
              Ver os planos
            </Button>
          </div>
          <p className={s.fine}>14 dias no app, sem cartão. Depois do teste, o app pede para assinar.</p>
        </section>

        {/* ---------------- Como funciona ---------------- */}
        <HowItWorks steps={STEPS} lead="Três passos, e o resto é automático." />

        {/* ------------- Como funciona, na prática ------------- */}
        <section className={s.tours} id="como-funciona">
          <div className={s.toursHead}>
            <h2 className={s.sectionTitle}>Como funciona, na prática</h2>
            <p className={s.sectionLead}>
              Três tours com as telas de verdade do app, na ordem em que você usa. Passa sozinho;
              se você encostar o mouse, ele espera. Os passos marcados com ⚠️ são promessa do
              PRODUCT.md que ainda não está construída — estão ditos aqui, não escondidos.
            </p>
          </div>
          {TOURS.map((t) => (
            <ProductTour key={t.label} label={t.label} steps={t.steps} />
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
              <SimpleModeScreen bp="d" toast={noop as unknown as (t: ToastInput) => void} />
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
          <Button size="lg" iconRight="arrow-right" onClick={() => (window.location.href = '/design-system/admin')}>
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
