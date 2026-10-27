'use client';

import { useState } from 'react';
import { Badge, Button, Card, CardHeader, DataTable, Legend, LineChart, Metric, SegmentedControl, Switch } from '../../components';
import { brl, payments as initialPayments, revenue, STATUS_TONE, type Payment, type Range } from './data';
import type { ToastInput } from './AdminApp';
import type { Breakpoint } from './useBreakpoint';
import s from './Screens.module.css';

const RANGES: Range[] = ['Dia', 'Semana', 'Mês'];

/** Financeiro — revenue/expense/receivable KPIs, auto-billing switch, cash-flow chart, recent payments with "Cobrar". */
export function FinanceScreen({ bp, toast }: { bp: Breakpoint; toast: (t: ToastInput) => void }) {
  const [range, setRange] = useState<Range>('Mês');
  const [auto, setAuto] = useState(true);
  const [pays, setPays] = useState<Payment[]>(initialPayments);
  const mobile = bp === 'm';

  const charge = (p: Payment) => {
    setPays((ps) => ps.map((x) => (x.id === p.id ? { ...x, status: 'Cobrança enviada' } : x)));
    toast({ tone: 'info', title: 'Cobrança enviada', message: `${p.who} · ${brl(p.value)}` });
  };

  return (
    <div className={s.stack}>
      <div className={s.grid} style={{ gridTemplateColumns: `repeat(${mobile ? 1 : 3}, minmax(0, 1fr))` }}>
        <Card>
          <CardHeader title="Receita" subtitle="Mensal" />
          <Metric value="R$ 124K" size="lg" className={s.mt4} />
          <div className={`${s.small} ${s.mt2}`}>
            <span className={s.positive}>+8,2%</span> vs setembro
          </div>
        </Card>
        <Card>
          <CardHeader title="Despesas" subtitle="Recorrentes" />
          <Metric value="R$ 31K" size="lg" className={s.mt4} />
          <Legend
            direction="row"
            className={s.mt2}
            items={[
              { label: 'Condomínio', color: 'var(--brand)' },
              { label: 'Manutenção', color: 'var(--surface-inverse)' },
              { label: 'Taxas', color: 'var(--border-default)' },
            ]}
          />
        </Card>
        <Card tone="brand">
          <CardHeader inverse title="A receber" subtitle="este mês" />
          <Metric inverse value="R$ 18,9K" size="lg" className={s.mt4} />
          <div className={s.mt3}>
            <Switch
              checked={auto}
              onChange={(v) => {
                setAuto(v);
                toast({ tone: 'neutral', title: v ? 'Cobrança automática ativada' : 'Cobrança automática desativada' });
              }}
              label={<span className={s.switchLabel}>Cobrança automática</span>}
            />
          </div>
        </Card>
      </div>
      <Card>
        <CardHeader title="Fluxo de caixa" subtitle="Análise" action={<SegmentedControl size="sm" options={RANGES} value={range} onChange={(v) => setRange(v as Range)} />} />
        <LineChart
          height={mobile ? 170 : 220}
          series={[{ name: 'Receita', color: 'var(--chart-ink)', data: revenue[range] }]}
          labels={['Jan', 'Mar', 'Mai', 'Jul', 'Set']}
          highlight={6}
          formatValue={(v) => (
            <span>
              R$ {Math.round(v * 100).toLocaleString('pt-BR')}
              <span style={{ opacity: 0.55 }}>,00</span>
            </span>
          )}
        />
      </Card>
      <Card padding={mobile ? 'var(--space-4-5)' : 'var(--card-padding)'}>
        <CardHeader title="Pagamentos" subtitle="Recentes" className={s.mb} />
        <DataTable<Payment>
          columns={[
            {
              key: 'who',
              label: 'Inquilino',
              render: (p) => (
                <div>
                  <div className={s.rowTitle}>{p.who}</div>
                  <div className={s.rowSub}>{p.unit}</div>
                </div>
              ),
            },
            { key: 'date', label: 'Data' },
            { key: 'value', label: 'Valor', align: 'right', render: (p) => brl(p.value) },
            {
              key: 'status',
              label: 'Status',
              render: (p) => (
                <Badge size="sm" dot tone={STATUS_TONE[p.status] ?? 'soft'}>
                  {p.status}
                </Badge>
              ),
            },
            {
              key: 'action',
              label: '',
              align: 'right',
              render: (p) =>
                p.status === 'Atrasado' || p.status === 'A vencer' ? (
                  <Button size="sm" variant="secondary" onClick={() => charge(p)}>
                    Cobrar
                  </Button>
                ) : null,
            },
          ]}
          rows={pays}
        />
      </Card>
    </div>
  );
}
