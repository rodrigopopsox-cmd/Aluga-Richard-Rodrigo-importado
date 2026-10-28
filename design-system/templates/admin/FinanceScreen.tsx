'use client';

import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  DataTable,
  LineChart,
  Metric,
  SegmentedControl,
  Switch,
} from '../../components';
import {
  ATTENTION,
  EXPENSES,
  OCCUPANCY,
  RECEIPTS,
  SOURCE_LABEL,
  brDate,
  brl,
  type AttentionKind,
  type Range,
  type Receipt,
  type ReceiptSource,
} from './receiptsData';
import type { ToastInput } from './AdminApp';
import type { Breakpoint } from './useBreakpoint';
import s from './Screens.module.css';

const RANGES: Range[] = ['Mês', 'Trimestre', 'Ano'];

/** Tom do badge por tipo de atenção — cor como reforço, nunca como única informação. */
const ATTENTION_TONE: Record<AttentionKind, 'danger' | 'warning' | 'neutral'> = {
  late: 'danger',
  whatsapp: 'warning',
  mercadopago: 'neutral',
};

/**
 * Recebimentos — o dinheiro do mês (R7 da spec v1).
 *
 * A R7 manda para o painel completo: receita, despesas, resultado e ocupação
 * por mês, trimestre ou ano; fluxo de caixa; e a lista "Precisa de atenção"
 * (atrasos, WhatsApp desconectado, Mercado Pago desconectado).
 *
 * Antes esta tela se chamava "Financeiro" — nome do template genérico, que não
 * existe no vocabulário da v1. O vocabulário é Proprietário, Imóvel, Unidade,
 * Cobrança e **Recebimento**.
 *
 * Dados de demonstração em `receiptsData.ts`.
 */
export function FinanceScreen({ bp, toast }: { bp: Breakpoint; toast: (t: ToastInput) => void }) {
  const [range, setRange] = useState<Range>('Mês');
  const [paused, setPaused] = useState(false);
  const mobile = bp === 'm';
  const pad = mobile ? 'var(--space-4-5)' : 'var(--card-padding)';

  const received = RECEIPTS.reduce((sum, r) => sum + r.amount, 0);
  const spent = EXPENSES.reduce((sum, e) => sum + e.amount, 0);
  const result = received - spent;
  const occupancy = OCCUPANCY[range === 'Ano' ? 'year' : range === 'Trimestre' ? 'quarter' : 'month'];

  return (
    <div className={s.stack}>
      {/* receita, despesas, resultado e ocupação — por mês, trimestre ou ano */}
      <div className={s.grid} style={{ gridTemplateColumns: `repeat(${mobile ? 2 : 4}, minmax(0, 1fr))` }}>
        <Card>
          <CardHeader title="Recebido" subtitle={range} />
          <Metric value={brl(received)} size="lg" className={s.mt4} />
        </Card>
        <Card>
          <CardHeader title="Despesas" subtitle={range} />
          <Metric value={brl(spent)} size="lg" className={s.mt4} />
        </Card>
        <Card>
          <CardHeader title="Resultado" subtitle={range} />
          <Metric value={brl(result)} size="lg" className={s.mt4} />
          <div className={`${s.small} ${s.mt2}`}>
            <span className={s.positive}>+8,2%</span> vs setembro
          </div>
        </Card>
        <Card>
          <CardHeader title="Ocupação" subtitle={range} />
          <Metric value={`${occupancy}%`} size="lg" className={s.mt4} />
        </Card>
      </div>

      {/* seletor de período + fluxo de caixa */}
      <Card>
        <CardHeader
          title="Fluxo de caixa"
          subtitle="Recebido e despesas"
          action={
            <SegmentedControl size="sm" options={RANGES} value={range} onChange={(v) => setRange(v as Range)} />
          }
        />
        <LineChart
          height={mobile ? 170 : 220}
          series={[
            { name: 'Recebido', color: 'var(--chart-ink)', data: [42, 48, 45, 52, 50, 58, 56, 61, 60], area: true },
          ]}
          labels={['Jan', 'Mar', 'Mai', 'Jul', 'Set']}
          highlight={8}
          formatValue={(v) => <span>R$ {v}K</span>}
        />
      </Card>

      {/* "Precisa de atenção" — a lista da R7 */}
      <Card padding={pad}>
        <CardHeader
          title="Precisa de atenção"
          subtitle="O que não pode esperar"
          action={
            <Switch
              checked={!paused}
              onChange={(v) => {
                setPaused(!v);
                toast({
                  tone: 'neutral',
                  title: v ? 'Envios retomados' : 'Envios pausados',
                  message: v
                    ? 'Os lembretes voltam a sair pelo seu WhatsApp.'
                    : 'Nenhum lembrete sai até você retomar.',
                });
              }}
              label={<span className={s.switchLabel}>Lembretes no WhatsApp</span>}
            />
          }
        />
        <div className={s.attention}>
          {ATTENTION.map((a) => (
            <div key={a.id} className={s.attentionItem}>
              <div className={s.attentionText}>
                <span className={s.attentionTitle}>{a.title}</span>
                <span className={s.attentionDetail}>{a.detail}</span>
              </div>
              <Button size="sm" variant="secondary" onClick={() => toast({ tone: 'info', title: a.title })}>
                {a.actionLabel}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* recebimentos do período */}
      <Card padding={0}>
        <CardHeader title="Recebimentos" subtitle="O que entrou" className={s.mb} />
        <DataTable<Receipt>
          columns={[
            {
              key: 'unit',
              label: 'Unidade',
              render: (r) => (
                <div>
                  <div className={s.rowTitle}>{r.unit}</div>
                  <div className={s.rowSub}>{r.tenant}</div>
                </div>
              ),
            },
            { key: 'date', label: 'Data', render: (r) => brDate(r.date) },
            { key: 'amount', label: 'Valor', align: 'right', render: (r) => brl(r.amount) },
            {
              key: 'source',
              label: 'Origem',
              render: (r) => (
                <Badge size="sm" tone={SOURCE_TONE[r.source]}>
                  {SOURCE_LABEL[r.source]}
                </Badge>
              ),
            },
            { key: 'by', label: 'Quem deu baixa', render: (r) => <span className={s.small}>{r.by}</span> },
          ]}
          rows={RECEIPTS}
        />
      </Card>

      <Card padding={pad}>
        <CardHeader title="Como funciona" subtitle="De onde vem cada número" />
        <p className={s.caption}>
          <strong>Recebido</strong> é o que entrou de verdade. <strong>Despesas</strong> é o que
          saiu — IPTU, condomínio, manutenção e taxa. <strong>Resultado</strong> é a diferença, e
          é o número que você leva para o contador. <strong>Ocupação</strong> é quantas das suas
          unidades estão alugadas. A <strong>origem</strong> do recebimento mostra se a baixa foi
          automática (Mercado Pago), pela sua resposta ao &ldquo;Recebeu?&rdquo; ou manual.
        </p>
      </Card>
    </div>
  );
}

/** Tom do badge por origem — o automático é o que se comemora. */
const SOURCE_TONE: Record<ReceiptSource, 'success' | 'soft' | 'neutral'> = {
  mercadopago: 'success',
  whatsapp: 'soft',
  manual: 'neutral',
};
