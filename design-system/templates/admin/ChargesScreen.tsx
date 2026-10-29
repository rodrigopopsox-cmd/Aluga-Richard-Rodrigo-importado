'use client';

import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  DataTable,
  Dialog,
  Input,
  Select,
  type DataTableColumn,
} from '../../components';
import type { Breakpoint } from './useBreakpoint';
import type { ToastInput } from './AdminApp';
import {
  CHARGES,
  SOURCE_LABEL,
  STATUS_LABEL,
  STATUS_TONE,
  balanceOf,
  type Charge,
  type ChargeStatus,
  type PaymentSource,
} from './chargesData';
import s from './Screens.module.css';

/**
 * Cobranças — R3 da spec v1.
 *
 * A spec manda:
 *   estados `prevista → aberta → paga | atrasada | cancelada`;
 *   recebimento manual com valor, data, origem e comprovante opcional;
 *   recebimento parcial deixa a cobrança em aberto, com o saldo visível;
 *   desfazer recebimento, com registro de quem fez e quando.
 *
 * A tela é uma lista do mês de competência. O job que gera a cobrança e o
 * webhook do Mercado Pago que dá a baixa são backend — aqui só o estado e as
 * ações manuais, que é o que o usuário vê.
 *
 * Dados de demonstração (chargesData.ts).
 */
export interface ChargesScreenProps {
  bp: Breakpoint;
  toast: (t: ToastInput) => void;
}

const money = (v: number): string => `R$ ${v.toLocaleString('pt-BR')}`;

const brDate = (iso: string): string => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

/** Competições disponíveis na demonstração, da mais recente para a mais antiga. */
const PERIODS = ['2026-11', '2026-10'];

export function ChargesScreen({ bp, toast }: ChargesScreenProps) {
  const [period, setPeriod] = useState('2026-10');
  const [rows, setRows] = useState<Charge[]>(CHARGES);
  const [editing, setEditing] = useState<Charge | null>(null);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [source, setSource] = useState<PaymentSource>('manual');
  const mobile = bp === 'm';
  const pad = mobile ? 'var(--space-4-5)' : 'var(--card-padding)';

  const monthRows = useMemo(() => rows.filter((c) => c.period === period), [rows, period]);

  const totals = useMemo(() => {
    const expected = monthRows.reduce((sum, c) => sum + c.amount, 0);
    const received = monthRows.reduce((sum, c) => sum + c.paid, 0);
    const late = monthRows.filter((c) => c.status === 'atrasada').length;
    const open = monthRows.filter((c) => c.status === 'aberta').length;
    return { expected, received, late, open, missing: expected - received };
  }, [monthRows]);

  /** Abre o diálogo de recebimento já preenchido com o saldo. */
  const openReceive = (c: Charge) => {
    setEditing(c);
    setAmount(String(balanceOf(c)));
    setDate(new Date().toISOString().slice(0, 10));
    setSource('manual');
  };

  /** Registra o recebimento. Parcial deixa a cobrança em aberto, com saldo à vista. */
  const saveReceive = () => {
    if (!editing) return;
    const value = Number(amount.replace(/\D/g, '')) / 100;
    if (!(value > 0)) return;

    setRows((prev) =>
      prev.map((c) => {
        if (c.id !== editing.id) return c;
        const paid = Math.min(c.amount, c.paid + value);
        const settled = paid >= c.amount;
        return {
          ...c,
          paid,
          status: settled ? 'paga' : 'aberta',
          source,
          receivedBy: `você em ${brDate(date)}`,
        };
      }),
    );
    const partial = editing.paid + value < editing.amount;
    toast({
      tone: 'success',
      title: partial ? 'Recebimento parcial registrado' : 'Cobrança dada baixa',
      message: partial
        ? `Saldo em aberto: ${money(editing.amount - editing.paid - value)}.`
        : 'No app real, a baixa automática faz isso sem você clicar.',
    });
    setEditing(null);
  };

  /** Desfazer — a R3 manda registrar quem fez e quando. */
  const undo = (c: Charge) => {
    setRows((prev) =>
      prev.map((x) =>
        x.id === c.id
          ? { ...x, paid: 0, status: 'aberta' as ChargeStatus, source: undefined, receivedBy: undefined }
          : x,
      ),
    );
    toast({
      tone: 'info',
      title: 'Recebimento desfeito',
      message: `Registrado: você, agora. A cobrança voltou para em aberto.`,
    });
  };

  const columns: Array<DataTableColumn<Charge>> = [
    {
      key: 'unit',
      label: 'Unidade',
      render: (c) => (
        <div className={s.chargeWho}>
          <span className={s.chargeUnit}>{c.unit}</span>
          <span className={s.chargeTenant}>{c.tenant}</span>
        </div>
      ),
    },
    { key: 'dueDate', label: 'Vence', render: (c) => brDate(c.dueDate) },
    {
      key: 'amount',
      label: 'Valor',
      align: 'right',
      render: (c) => money(c.amount),
    },
    {
      key: 'balance',
      label: 'Saldo',
      align: 'right',
      render: (c) => {
        const bal = balanceOf(c);
        return bal > 0 ? <span className={s.chargeBalance}>{money(bal)}</span> : <span className={s.chargeSettled}>—</span>;
      },
    },
    {
      key: 'status',
      label: 'Situação',
      render: (c) => (
        <Badge tone={STATUS_TONE[c.status]}>{STATUS_LABEL[c.status]}</Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: (c) =>
        c.status === 'paga' ? (
          <Button size="sm" variant="ghost" onClick={() => undo(c)}>
            Desfazer
          </Button>
        ) : c.status === 'cancelada' || c.status === 'prevista' ? null : (
          <Button size="sm" onClick={() => openReceive(c)}>
            Recebi
          </Button>
        ),
    },
  ];

  return (
    <div className={s.stack}>
      <Card padding={pad}>
        <CardHeader
          title="Cobranças"
          subtitle="O que cada inquilino deve neste mês"
          action={
            <Select
              size="sm"
              label="Mês"
              options={PERIODS.map((p) => ({ value: p, label: p.split('-').reverse().join('/') }))}
              value={period}
              onChange={setPeriod}
            />
          }
        />
      </Card>

      <Card padding={pad}>
        <div className={s.chargeTotals}>
          <div>
            <span className={s.chargeTotalsLabel}>Recebido</span>
            <span className={s.chargeTotalsValue}>{money(totals.received)}</span>
          </div>
          <div>
            <span className={s.chargeTotalsLabel}>Falta receber</span>
            <span className={s.chargeTotalsValue}>{money(totals.missing)}</span>
          </div>
          <div>
            <span className={s.chargeTotalsLabel}>Total do mês</span>
            <span className={s.chargeTotalsValue}>{money(totals.expected)}</span>
          </div>
        </div>
        {(totals.open > 0 || totals.late > 0) && (
          <p className={s.caption}>
            {totals.late > 0 && `${totals.late} atrasada${totals.late > 1 ? 's' : ''}. `}
            {totals.open > 0 && `${totals.open} em aberto. `}
            Lembretes saem pelo WhatsApp 3 dias antes, no dia e 3 dias depois.
          </p>
        )}
      </Card>

      <Card padding={0}>
        <DataTable columns={columns} rows={monthRows} empty="Nenhuma cobrança neste mês." />
      </Card>

      <Card padding={pad}>
        <CardHeader title="Como funciona" subtitle="Os estados de uma cobrança" />
        <p className={s.caption}>
          <strong>Prevista</strong> é o mês que ainda não virou cobrança. <strong>Em aberto</strong>{' '}
          já venceu e ainda falta. <strong>Paga</strong> é quando entra tudo — sozinho pelo
          Mercado Pago, pelo &ldquo;Recebeu?&rdquo; ou por você. <strong>Atrasada</strong>{' '}
          passa do vencimento. Se entrar pela metade, continua em aberto com o que falta à vista.
        </p>
      </Card>

      <Dialog
        open={editing != null}
        onClose={() => setEditing(null)}
        title="Registrar recebimento"
        subtitle={editing ? `${editing.unit} · ${editing.tenant}` : undefined}
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
            <Button onClick={saveReceive} disabled={!(Number(amount.replace(/\D/g, '')) > 0)}>
              Registrar
            </Button>
          </>
        }
      >
        <Input label="Valor recebido" value={amount} onChange={setAmount} placeholder="R$ 0,00" />
        <Input label="Data" type="date" value={date} onChange={setDate} />
        <Select
          label="Origem"
          options={(Object.keys(SOURCE_LABEL) as PaymentSource[]).map((k) => ({
            value: k,
            label: SOURCE_LABEL[k],
          }))}
          value={source}
          onChange={(v) => setSource(v as PaymentSource)}
        />
        {editing && balanceOf(editing) > 0 && (
          <p className={s.caption}>
            Saldo desta cobrança: {money(balanceOf(editing))}. Se registrar menos, ela continua em
            aberto.
          </p>
        )}
      </Dialog>
    </div>
  );
}
