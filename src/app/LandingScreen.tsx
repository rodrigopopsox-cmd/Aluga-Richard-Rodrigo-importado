'use client';

import { Badge, Button, HowItWorks, PricingNote, PricingTable, Wordmark, type PlanSpec } from '@design-system';
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
