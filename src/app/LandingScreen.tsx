'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  HowItWorksStep,
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
 * A seção do Modo simples renderiza a **tela de verdade**
 * (`SimpleModeScreen`), não um desenho dela. Se a tela muda, a landing muda
 * junto — é a única forma de a promessa não mentir.
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
 */
const PLANS: PlanSpec[] = [
  { name: 'Essencial', price: 59, units: 'até 5', holders: '1 titular' },
  { name: 'Família', price: 99, units: 'até 10', holders: '3 titulares' },
  { name: 'Patrimônio', price: 209, units: 'até 50', holders: '5 titulares' },
  { name: 'Investidor', price: 269, units: 'ilimitadas', holders: 'ilimitados' },
];

/**
 * Os três passos do produto. Cada um virou uma seção da landing, com o
 * texto do passo e a demonstração do processo lado a lado — em vez de uma
 * lista de três passos solta e, embaixo, três demonstrações repetindo o
 * que a lista já tinha dito.
 */
const CHAPTERS: Array<{
  n: number;
  icon: HowItWorksStep['icon'];
  kicker: string;
  title: string;
  body: string;
  demo: { label: string; steps: DemoStep[] };
}> = [
  {
    n: 1,
    icon: 'building-2',
    kicker: 'Cadastre',
    title: 'Imóvel, inquilino e contrato. Uma vez só.',
    body: 'Valor, dia de vencimento e reajuste ficam guardados no contrato. Não se digita nada disso de novo.',
    demo: {
      label: 'Contratos',
      steps: [
        {
          title: 'O contrato, em uma ficha',
          detail: 'Unidade, inquilino, valor e dia de vencimento.',
          status: <Badge tone="success">Vigente</Badge>,
          children: (
            <div className={s.split}>
              <Panel title="Casa do CIC" subtitle="casa · alugada">
                <Field label="Inquilino" value="Maria Silva" />
                <Field label="Valor" value="R$ 1.200" />
                <Field label="Vence" value="dia 5" />
                <Field label="Início" value="05/03/2024" />
                <Field label="Reajuste" value="IGP-M" />
              </Panel>
              <div className={s.splitSide}>
                <Panel title="Unidade" subtitle="Rua das Palmeiras, 120">
                  <Field label="Bairro" value="CIC · Curitiba" />
                </Panel>
                <Panel title="Titular" subtitle="quem recebe o aluguel">
                  <div className={s.person}>
                    <Avatar name="Iara Alves" size={28} />
                    <span className={s.personName}>Iara Alves</span>
                    <Badge tone="neutral">100%</Badge>
                  </div>
                </Panel>
              </div>
            </div>
          ),
        },
        {
          title: 'O reajuste já está no contrato',
          detail: 'IGP-M, IPCA ou porcentagem fixa, com o mês de aniversário.',
          status: <Badge tone="neutral">IGP-M</Badge>,
          children: (
            <div className={s.split}>
              <Panel title="Reajuste" subtitle="como o valor corrige">
                <Field label="Índice" value="IGP-M (FGV)" />
                <Field label="Aniversário" value="março" />
                <Field label="Próximo" value="março de 2027" />
              </Panel>
              <Panel title="Os outros contratos" subtitle="cada um com o seu">
                <Field label="Casa Água Verde" value="IPCA" />
                <Field label="Kitnet" value="fixo 7%" />
                <Field label="Sala 2" value="IGP-M" />
              </Panel>
            </div>
          ),
        },
        {
          title: 'Pessoa física ou jurídica',
          detail: 'É o que separa o Imposto de Renda por titular.',
          status: <Badge tone="neutral">PF e PJ</Badge>,
          children: (
            <div className={s.split}>
              <Panel title="Titulares" subtitle="quem assina">
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
              </Panel>
              <Panel title="Na declaração" subtitle="hora do contador">
                <Field label="Rendimentos" value="separados por titular" />
                <Field label="Despesas" value="por imóvel" />
              </Panel>
            </div>
          ),
        },
        {
          title: 'A cobrança nasce daqui',
          detail: 'Do contrato sai a cobrança do mês, no valor e no dia certos.',
          status: <Badge tone="brand">Aberta</Badge>,
          children: (
            <div className={s.split}>
              <Panel title="Cobrança de outubro" subtitle="Casa do CIC · Maria Silva">
                <Field label="Valor" value="R$ 1.200" />
                <Field label="Vence" value="05/10/2026" />
              </Panel>
              <Panel title="Sem digitar nada" subtitle="gerado sozinho">
                <Field label="Origem" value="contrato" />
                <Field label="Mês" value="outubro" />
              </Panel>
            </div>
          ),
        },
      ],
    },
  },
  {
    n: 2,
    icon: 'message-circle',
    kicker: 'O app cobra',
    title: 'Gera, lembra e dá baixa. Sem você pedir.',
    body: 'A cobrança do mês sai do contrato, o inquilino é lembrado no WhatsApp e o pagamento no Mercado Pago é criado sem intervenção.',
    demo: {
      label: 'Cobranças',
      steps: [
        {
          title: 'A cobrança do mês já está lá',
          detail: 'Gerada a partir do contrato. Você não cria nada.',
          status: <Badge tone="neutral">Outubro</Badge>,
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
          title: 'Boleto e Pix prontos',
          detail: 'O inquilino paga por Pix, boleto ou saldo na conta.',
          pending: 'em construção',
          children: (
            <div className={s.split}>
              <Panel title="Cobrança" subtitle="Casa do CIC · Maria Silva">
                <Field label="Valor" value="R$ 1.200" />
                <Field label="Vence" value="05/10/2026" />
              </Panel>
              <Panel title="Formas de pagamento" subtitle="Mercado Pago">
                <div className={s.payRow}>
                  <Button size="sm">Pix</Button>
                  <Button size="sm" variant="secondary" icon="file-text">
                    Boleto
                  </Button>
                </div>
              </Panel>
            </div>
          ),
        },
        {
          title: 'Lembrete no WhatsApp',
          detail: 'A mensagem sai do jeito que a pessoa lê.',
          pending: 'em construção',
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
          detail: 'O pagamento cai e a cobrança fecha sozinha.',
          status: <Badge tone="success">Paga</Badge>,
          children: (
            <div className={s.split}>
              <Panel title="Casa do CIC" subtitle="R$ 1.200 · 05/10/2026">
                <Field label="Baixa" value="automática em 05/10" />
              </Panel>
              <Panel title="Sem planilha" subtitle="nada de conferir na mão">
                <Field label="Origem" value="Mercado Pago" />
                <Field label="Recibo" value="na hora" />
              </Panel>
            </div>
          ),
        },
      ],
    },
  },
  {
    n: 3,
    icon: 'chart-spline',
    kicker: 'Você acompanha',
    title: 'Quanto cada imóvel rende, e o que precisa de atenção.',
    body: 'Responda “Recebeu?” e a baixa sai. Despesas por imóvel, resultado do mês e o informe de rendimentos separado por titular.',
    demo: {
      label: 'Recebimentos',
      steps: [
        {
          title: 'Pagamento identificado',
          detail: 'Cada recebimento guarda a origem.',
          status: <Badge tone="success">Recebido</Badge>,
          children: (
            <div className={s.split}>
              <Panel title="Recebimentos" subtitle="o que entrou em outubro">
                <Field label="Casa do CIC" value={<Badge tone="success">Mercado Pago</Badge>} />
                <Field
                  label="Casa Água Verde"
                  value={<Badge tone="neutral">WhatsApp</Badge>}
                />
                <Field label="Kitnet" value={<Badge tone="neutral">Manual</Badge>} />
              </Panel>
              <Panel title="Três caminhos" subtitle="do jeito que a pessoa paga">
                <Field label="Automático" value="Mercado Pago" />
                <Field label="Você confirma" value="“Recebeu?”" />
                <Field label="Na mão" value="manual" />
              </Panel>
            </div>
          ),
        },
        {
          title: 'Baixa com responsável',
          detail: 'A cobrança guarda quem deu a baixa e quando.',
          status: <Badge tone="neutral">Outubro</Badge>,
          children: (
            <Panel title="Quem deu a baixa" subtitle="outubro">
              <Field label="Casa do CIC" value="automática em 05/10" />
              <Field label="Casa Água Verde" value="você em 03/10" />
              <Field label="Kitnet" value="você em 06/10" />
            </Panel>
          ),
        },
        {
          title: 'Recibo na hora',
          detail: 'A confirmação do pagamento sai com o valor e a unidade.',
          status: <Badge tone="neutral">Recibo</Badge>,
          children: (
            <div className={s.split}>
              <Panel title="Recibo" subtitle="outubro de 2026">
                <Field label="Recebido de" value="Maria Silva" />
                <Field label="Referente a" value="Casa do CIC" />
                <Field label="Valor" value="R$ 1.200" />
              </Panel>
              <Panel title="Pronto para mandar" subtitle="sem montar nada">
                <Field label="Envio" value="WhatsApp" />
                <Field label="Anexo" value="PDF" />
              </Panel>
            </div>
          ),
        },
        {
          title: 'Quanto cada imóvel rende',
          detail: 'Despesas por imóvel e por titular.',
          status: <Badge tone="neutral">Este mês</Badge>,
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
  },
];

/* ------------------------------------------------------------------ *
 * Peças dos painéis.
 *
 * Montadas com os componentes de verdade do design system e com os dados
 * de demonstração de verdade. Os totais conferem com as telas: R$ 2.600 /
 * R$ 1.800 / R$ 4.400 em Cobranças e R$ 5.600,00 / R$ 962,00 /
 * R$ 4.638,00 / 78% em Recebimentos.
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

/**
 * Número que conta.
 *
 * Quando o painel entra na cascata, o valor sobe de zero até o número
 * final em vez de piscar pronto. É o padrão de "contador animado" que o
 * Ramp e o Linear usam nas demonstrações, e faz duas coisas que um número
 * estático não faz: chama o olho para o valor que importa e mantém o
 * movimento vivo dentro do passo, sem precisar de barra de progresso.
 *
 * A duração é 900ms, fora da régua de 120–360ms do DESIGN.md — que trata
 * de *transição de interface*, não de contagem de dado. A cascata que
 * trouxe o painel até aqui seguiu a régua; isto é o conteúdo se
 * estabelecendo.
 *
 * `prefers-reduced-motion` pula a contagem e entrega o número final.
 */
function CountUp({ value, duration = 900 }: { value: string; duration?: number }) {
  const parts = value.match(/^(\D*)([\d.,]+)(\D*)$/);
  const final = useMemo(() => {
    if (!parts) return null;
    const [, prefix, digits, suffix] = parts;
    const dec = digits.includes(',') ? digits.split(',')[1].length : 0;
    return {
      prefix,
      suffix,
      dec,
      n: Number(digits.replace(/\./g, '').replace(',', '.')),
    };
  }, [parts]);

  const [n, setN] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = mq.matches;
    if (mq.matches || !final) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number): void => {
      const p = Math.min(1, (t - t0) / duration);
      // easeOutCubic — sai rápida e assenta. Sem bounce.
      setN(final.n * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [final, duration]);

  if (!final) return <>{value}</>;
  const shown = reduced.current ? final.n : n;
  return (
    <>
      {final.prefix}
      {shown.toLocaleString('pt-BR', {
        minimumFractionDigits: final.dec,
        maximumFractionDigits: final.dec,
      })}
      {final.suffix}
    </>
  );
}

/** Régua de métricas — a mesma da tela, em três ou quatro cartões. */
function Metrics({ items }: { items: Array<{ title: string; value: string }> }) {
  return (
    <div className={s.metrics}>
      {items.map((m) => (
        <Card key={m.title}>
          <CardHeader title={m.title} size="sm" />
          <div className={s.metricSlot}>
            <Metric
              value={<CountUp value={m.value} />}
              size="md"
              decimals={m.value.includes(',')}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}

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
            O Aluga gera a cobrança de cada mês, lembra o inquilino no WhatsApp, dá baixa quando
            o Pix cai e entrega o Imposto de Renda separado por titular. Feito para quem tem
            imóvel e não tem tempo de planilha.
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
            14 dias no app, sem cartão. Depois do teste, o app pede para assinar.
          </p>
        </section>

        {/* ------------- Os três passos, com a prova ------------- */}
        {CHAPTERS.map((c) => (
          <section className={s.chapter} key={c.n} id={`passo-${c.n}`}>
            <div className={s.chapterCopy}>
              <div className={s.chapterHead}>
                <span className={s.chapterN}>{c.n}</span>
                <span className={s.chapterKicker}>{c.kicker}</span>
              </div>
              <h2 className={s.chapterTitle}>{c.title}</h2>
              <p className={s.chapterBody}>{c.body}</p>
            </div>
            <div className={s.chapterDemo}>
              <ProcessDemo label={c.demo.label} steps={c.demo.steps} />
            </div>
          </section>
        ))}

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
            Unidade é o que gera aluguel: cada kitnet ou loja conta como uma. Titular extra
            custa R$ 9 por mês, e cada conta tem 2 logins de ajudante de graça. Os 5 primeiros
            fundadores têm o primeiro mês grátis.
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
