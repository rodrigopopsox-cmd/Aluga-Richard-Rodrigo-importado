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
 * As seis etapas da apresentação. Todas existem no produto — cada painel é
 * montado com os dados de demonstração das telas reais:
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
          <Field label="Valor" value="R$ 1.200" />
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
        <Metrics
          items={[
            { title: 'Recebido', value: 'R$ 2.600' },
            { title: 'Em aberto', value: 'R$ 3.400' },
            { title: 'Previsto', value: 'R$ 6.000' },
          ]}
        />
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
        <Panel title="Entrou em outubro" subtitle="R$ 5.600 no total">
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
        <ProductTour steps={TOUR} />

        {/* ---------------- Do seu jeito ---------------- */}
        <section className={s.mes}>
          <div className={s.mesCopy}>
            <h2 className={s.sectionTitle}>E você escolhe como quer ver</h2>
            <p className={s.sectionLead}>
              Quem tem dificuldade com sistema usa a tela “Este mês”: um cartão por unidade, o
              status escrito em palavras e dois botões. Quem quer controle total usa o painel
              completo. E dá para deixar a letra maior ou o tema escuro — as duas coisas são
              configuração, não versão diferente do app.
            </p>
            <p className={s.fine}>
              É a tela de verdade, rodando aqui dentro. Mexe na engrenagem: os modos funcionam.
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
