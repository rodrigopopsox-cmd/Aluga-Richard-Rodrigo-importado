'use client';

import { Card, CardHeader, PricingTable, type PlanSpec } from '../../components';
import type { ToastInput } from './AdminApp';
import type { Breakpoint } from './useBreakpoint';
import s from './Screens.module.css';

/**
 * Planos — preços e limites da assinatura.
 *
 * FONTE DOS DADOS: PRODUCT.md, seção "Planos e preços". Nada aqui é estimativa.
 * O que PRODUCT.md não define ficou de fora de propósito:
 *   · qual plano é o "Mais popular" — nenhum card está destacado;
 *   · a lista de recursos por plano — os cartões mostram só unidades e titulares,
 *     que é a única diferença que o documento estabelece.
 * Quando o Rodrigo fechar isso com os fundadores (tarefa 14 do backlog), é só
 * preencher `badge`/`highlighted` e `features` em cada plano.
 */
const PLANS: PlanSpec[] = [
  { name: 'Essencial', price: 59, units: 'até 5', holders: '1 titular' },
  { name: 'Família', price: 99, units: 'até 10', holders: '3 titulares' },
  { name: 'Patrimônio', price: 209, units: 'até 50', holders: '5 titulares' },
  { name: 'Investidor', price: 269, units: 'ilimitadas', holders: 'ilimitados' },
];

/** Regras de cobrança — todas literais de PRODUCT.md. */
const RULES: Array<[string, string]> = [
  ['Titular extra', 'R$ 9 por mês'],
  ['Ajudantes', '2 logins grátis por conta'],
  ['Plano anual', 'preço de 10 meses'],
  ['Teste', '14 dias no app, sem cartão'],
  ['Fundadores', '1º mês grátis (5 primeiros)'],
  ['Cobrança', 'Mercado Pago Assinaturas'],
];

export function PlansScreen({ bp, toast }: { bp: Breakpoint; toast: (t: ToastInput) => void }) {
  const mobile = bp === 'm';

  return (
    <div className={s.stack}>
      <PricingTable
        plans={PLANS}
        yearlyMonths={10}
        yearlyNote="10 meses, 2 de graça"
        onSelect={(name) =>
          toast({
            tone: 'info',
            title: `Plano ${name}`,
            message: 'Assinatura pelo Mercado Pago — integração na sprint 3.',
          })
        }
      />

      <Card padding={mobile ? 'var(--space-4-5)' : 'var(--card-padding)'}>
        <CardHeader
          title="Como funciona a cobrança"
          subtitle="Unidade é o que gera aluguel: cada kitnet ou loja conta como uma"
        />
        <dl className={s.rules}>
          {RULES.map(([label, value]) => (
            <div key={label} className={s.rule}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <p className={s.caption}>
        Preços e limites conforme <code>PRODUCT.md</code>. Estão em validação com os 5
        fundadores — a confirmação entra em <code>PRODUCT.md</code> (preços) na sprint 3.
      </p>
    </div>
  );
}
