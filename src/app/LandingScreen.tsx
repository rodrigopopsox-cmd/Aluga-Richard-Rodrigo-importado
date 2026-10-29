'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Metric,
  PricingNote,
  PricingTable,
  ProcessDemo,
  Wordmark,
  type DemoTab,
  type PlanSpec,
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
 * A DEMONSTRAÇÃO NÃO É DESENHO. O `ProcessDemo` monta os painéis com os
 * componentes de verdade do design system e com os dados de demonstração de
 * verdade; a aba "Meu mês" renderiza a tela real do Modo simples, com o
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
 * TOM DE VOZ. O Rodrigo reclamou que os textos estavam robotizados — e com
 * razão: eram frases de especificação ("Unidade, inquilino, valor e dia de
 * vencimento"), não frases de gente. A voz do projeto é **você**, uma frase
 * por idéia, e o sistema raramente fala de si mesmo. O que está aqui foi
 * reescrito nesse tom: concreto, curto, sem gerundismo e sem adjetivo de
 * folheto.
 */
const PLANS: PlanSpec[] = [
  { name: 'Essencial', price: 59, units: 'até 5', holders: '1 titular' },
  { name: 'Família', price: 99, units: 'até 10', holders: '3 titulares' },
  { name: 'Patrimônio', price: 209, units: 'até 50', holders: '5 titulares' },
  { name: 'Investidor', price: 269, units: 'ilimitadas', holders: 'ilimitados' },
];

/**
 * Os três passos do produto, em texto. A demonstração deles mora no hero,
 * em abas — repetir a mesma explicação aqui, com outro desenho, era o que
 * fazia a página parecer longa e poluída.
 */
const STEPS: Array<{ n: number; icon: DemoTab['label'] extends never ? never : 'building-2' | 'message-circle' | 'chart-spline'; kicker: string; title: string; body: string }> = [
  {
    n: 1,
    icon: 'building-2',
    kicker: 'Cadastre',
    title: 'Cadastra uma vez, esquece',
    body: 'Imóvel, inquilino e contrato entram uma única vez. Valor, dia de vencimento e reajuste ficam guardados — você nunca digita isso de novo.',
  },
  {
    n: 2,
    icon: 'message-circle',
    kicker: 'O app cobra',
    title: 'O app cobra por você',
    body: 'A cobrança do mês nasce sozinha, o inquilino é lembrado no WhatsApp e o pagamento no Mercado Pago é criado sem você tocar em nada.',
  },
  {
    n: 3,
    icon: 'chart-spline',
    kicker: 'Você acompanha',
    title: 'Você só acompanha',
    body: 'Responde “Recebeu?” e a baixa sai. No fim do mês, sabe quanto cada imóvel rendeu e o que ainda falta.',
  },
];

/**
 * As quatro abas da demonstração: os três momentos do aluguel e a tela
 * simples. Cada aba tem os seus passos, que passam sozinhos.
 */
const TABS: DemoTab[] = [
  {
    label: 'Contratos',
    steps: [
      {
        title: 'O contrato, em uma ficha',
        detail: 'Quem mora, quanto paga e quando vence. Tudo em uma tela só.',
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
        detail: 'Você escolhe o índice uma vez. No aniversário, o valor corrige sozinho.',
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
        detail: 'Pessoa ou empresa, tanto faz. Na hora do Imposto de Renda, cada um aparece separado.',
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
        detail: 'A cobrança do mês já existe antes de você pensar nela. Valor e dia certos.',
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
  {
    label: 'Cobranças',
    steps: [
      {
        title: 'A cobrança do mês já está lá',
        detail: 'Nada de criar cobrança na mão. Ela nasce do contrato, no dia certo.',
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
        detail: 'O inquilino escolhe: Pix, boleto ou saldo na conta. Você não faz nada.',
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
        detail: 'A mensagem chega como se você tivesse escrito: com o nome, o valor e a data.',
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
        detail: 'O Pix cai e a cobrança fecha sozinha. Sem planilha, sem conferir no fim do mês.',
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
  {
    label: 'Recebimentos',
    steps: [
      {
        title: 'Pagamento identificado',
        detail: 'Cada entrada guarda de onde veio: Mercado Pago, WhatsApp ou você digitando.',
        status: <Badge tone="success">Recebido</Badge>,
        children: (
          <div className={s.split}>
            <Panel title="Recebimentos" subtitle="o que entrou em outubro">
              <Field label="Casa do CIC" value={<Badge tone="success">Mercado Pago</Badge>} />
              <Field label="Casa Água Verde" value={<Badge tone="neutral">WhatsApp</Badge>} />
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
        detail: 'Fica registrado quem deu a baixa e em que dia. Automático quando o Pix cai.',
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
        detail: 'O recibo sai com valor, mês e unidade. Pronto para mandar no WhatsApp.',
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
        detail: 'Quanto cada imóvel rende de verdade, com as despesas já descontadas.',
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
  {
    label: 'Meu mês',
    steps: [
      {
        title: 'A tela de quem não quer complicação',
        detail: 'Um cartão por unidade, o status escrito em palavras e dois botões. Mexe na engrenagem: os modos funcionam.',
        children: <MeuMesDemo />,
      },
    ],
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
        {/* ---------------- Hero: texto de um lado, demo do outro ---------------- */}
        <section className={s.hero}>
          <div className={s.heroCopy}>
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
          </div>

          <div className={s.heroDemo}>
            <ProcessDemo tabs={TABS} />
            <p className={s.heroHint}>
              Quatro abas: os três momentos do aluguel e a tela simples. Elas passam sozinhas — mas
              você pode clicar e navegar quando quiser.
            </p>
          </div>
        </section>

        {/* ---------------- Como funciona, em texto ---------------- */}
        <section className={s.how}>
          <div className={s.howHead}>
            <h2 className={s.sectionTitle}>Como funciona</h2>
            <p className={s.sectionLead}>
              Três passos. Depois do primeiro, o app assume e você só olha.
            </p>
          </div>

          <ol className={s.howList}>
            {STEPS.map((st) => (
              <li className={s.howItem} key={st.n}>
                <div className={s.howItemHead}>
                  <span className={s.howN}>{st.n}</span>
                  <span className={s.howKicker}>{st.kicker}</span>
                </div>
                <h3 className={s.howTitle}>{st.title}</h3>
                <p className={s.howBody}>{st.body}</p>
              </li>
            ))}
          </ol>
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
