'use client';

import { useState } from 'react';
import { Badge, Button, Card, CardHeader, DataTable, Dialog, Input, Select, type DataTableColumn } from '../../components';
import type { Breakpoint } from './useBreakpoint';
import type { ToastInput } from './AdminApp';
import { TENANTS } from './tenantsData';
import {
  CONTRACTS,
  HOJE,
  MONTHS,
  REAJUSTE_OPTIONS,
  STATUS_LABEL,
  STATUS_TONE,
  dueLabel,
  endingLabel,
  isEnding,
  periodLabel,
  reajusteLabel,
  statusOf,
  type Contract,
  type Reajuste,
} from './contractsData';
import { brl } from './data';
import s from './Screens.module.css';

/**
 * Contratos — cadastro da R2.
 *
 * A R2 manda: unidade, inquilino, valor, dia de vencimento (1 a 31),
 * início, fim opcional, índice de reajuste (IGP-M, IPCA, % fixo ou
 * nenhum) e mês de aniversário. Esses são todos os campos do formulário —
 * nada além.
 *
 * Duas coisas que a tela **não** faz, de propósito:
 *
 * 1. Não cadastra multa, juros de mora, garantia nem carência. A seção 3
 *    da spec deixa o documento do contrato fora da v1 ("o cadastro do
 *    contrato basta para cobrar; o documento é v2"). Campo inventado aqui
 *    seria regra inventada.
 * 2. Não dispara alerta de fim de contrato. O aviso de 60 e 30 dias antes
 *    do fim é v1.1 (seção 8). A lista mostra o prazo que sobra, e só.
 *
 * O estado do contrato é derivado do campo `fim`: encerrado quando o fim
 * já passou, ativo enquanto não há fim ou ele ainda não chegou. A R3 diz
 * que o job diário gera cobrança "para cada contrato ativo" — encerrar
 * aqui é o que faz a cobrança parar de nascer.
 */
export interface ContractsScreenProps {
  bp: Breakpoint;
  toast: (t: ToastInput) => void;
}

interface Draft {
  unit: string;
  tenantId: string;
  /** Dígitos puros, em reais. */
  amount: string;
  dueDay: string;
  start: string;
  end: string;
  reajuste: Reajuste;
  fixoPct: string;
  anniversaryMonth: string;
}

const UNIT_OPTIONS = ['Casa do CIC', 'Casa Água Verde', 'Kitnet', 'Loja Centro', 'Sala 2'];

const EMPTY: Draft = {
  unit: '',
  tenantId: '',
  amount: '',
  dueDay: '5',
  start: HOJE,
  end: '',
  reajuste: 'igpm',
  fixoPct: '',
  anniversaryMonth: '1',
};

const digits = (v: string): string => v.replace(/\D/g, '');

/** Só o que a R2 exige: unidade, inquilino, valor, dia válido e início. */
function invalidOf(d: Draft): string | null {
  if (!d.unit) return 'Escolha a unidade.';
  if (!d.tenantId) return 'Escolha o inquilino.';
  if (!(Number(digits(d.amount)) > 0)) return 'Informe o valor do aluguel.';
  const day = Number(digits(d.dueDay));
  if (!(day >= 1 && day <= 31)) return 'O dia de vencimento vai de 1 a 31.';
  if (!d.start) return 'Informe a data de início.';
  if (d.end && d.end < d.start) return 'O fim não pode ser antes do início.';
  if (d.reajuste === 'fixo' && !(Number(digits(d.fixoPct)) > 0))
    return 'Informe o percentual do reajuste fixo.';
  return null;
}

/** Glossário do "Como funciona" — termo como etiqueta, explicação em texto. */
const HOW: Array<[string, string]> = [
  [
    'Aluguel',
    'O valor que o app usa para gerar a cobrança de cada mês. Se mudar, muda a cobrança nova — a que já foi gerada fica como está.',
  ],
  [
    'Dia do vencimento',
    'Vai de 1 a 31. Se o mês não tem esse dia, a cobrança vence no último dia do mês.',
  ],
  [
    'Vigência',
    'Começa no início e termina no fim, quando existe. Sem data de fim, o contrato vale por tempo indeterminado.',
  ],
  [
    'Reajuste',
    'O índice que corrige o valor uma vez por ano. IGP-M e IPCA são índices de mercado; o percentual fixo é um número combinado entre vocês; sem reajuste, o valor congela.',
  ],
  [
    'Mês do reajuste',
    'O mês em que o contrato faz mais um ano e o valor muda.',
  ],
  [
    'Encerrar',
    'Preenche a data de fim com hoje. Enquanto o contrato está ativo, o app gera uma cobrança por mês; encerrado, não gera mais.',
  ],
];

export function ContractsScreen({ bp, toast }: ContractsScreenProps) {
  const [rows, setRows] = useState<Contract[]>(CONTRACTS);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Contract | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  /** So mostra o que falta depois de uma tentativa de salvar. */
  const [tried, setTried] = useState(false);
  const mobile = bp === 'm';
  const pad = mobile ? 'var(--space-4-5)' : 'var(--card-padding)';
  /** Celular empilha; desktop poe dois campos por linha, que o formulario tem 8. */
  const grid = mobile ? s.stack : s.formGrid;

  const invalid = invalidOf(draft);

  const close = () => {
    setOpen(false);
    setEditing(null);
    setDraft(EMPTY);
    setTried(false);
  };

  const openNew = () => {
    setEditing(null);
    setDraft(EMPTY);
    setTried(false);
    setOpen(true);
  };

  const openEdit = (c: Contract) => {
    setEditing(c);
    setDraft({
      unit: c.unit,
      tenantId: c.tenantId,
      amount: String(c.amount),
      dueDay: String(c.dueDay),
      start: c.start,
      end: c.end ?? '',
      reajuste: c.reajuste,
      fixoPct: c.fixoPct ? String(c.fixoPct) : '',
      anniversaryMonth: String(c.anniversaryMonth),
    });
    setOpen(true);
  };

  const save = () => {
    if (invalid) {
      setTried(true);
      return;
    }
    const contract: Contract = {
      id: editing?.id ?? `k${Date.now()}`,
      unit: draft.unit,
      tenantId: draft.tenantId,
      tenantName: TENANTS.find((t) => t.id === draft.tenantId)?.name ?? 'Inquilino',
      tenantKind: TENANTS.find((t) => t.id === draft.tenantId)?.kind ?? 'pf',
      amount: Number(digits(draft.amount)),
      dueDay: Number(digits(draft.dueDay)),
      start: draft.start,
      end: draft.end || undefined,
      reajuste: draft.reajuste,
      fixoPct: draft.reajuste === 'fixo' ? Number(digits(draft.fixoPct)) : undefined,
      anniversaryMonth: Number(digits(draft.anniversaryMonth)),
    };
    setRows((prev) => (editing ? prev.map((x) => (x.id === editing.id ? contract : x)) : [...prev, contract]));
    toast({
      tone: 'success',
      title: editing ? 'Contrato atualizado' : 'Contrato cadastrado',
      message: `${contract.unit} · ${brl(contract.amount)} · vence ${dueLabel(contract)}`,
    });
    close();
  };

  /** Encerrar preenche a data de fim com hoje — é o que faz a cobrança parar. */
  const endNow = (c: Contract) => {
    setRows((prev) => prev.map((x) => (x.id === c.id ? { ...x, end: HOJE } : x)));
    toast({
      tone: 'info',
      title: 'Contrato encerrado',
      message: `${c.unit} não vai gerar cobrança nova.`,
    });
  };

  const columns: Array<DataTableColumn<Contract>> = [
    {
      key: 'unit',
      label: 'Unidade',
      render: (c) => (
        <div className={s.rowStack}>
          <span className={s.rowTitle}>{c.unit}</span>
          <span className={s.rowSub}>{c.tenantName}</span>
        </div>
      ),
    },
    {
      key: 'amount',
      label: 'Aluguel',
      align: 'right',
      render: (c) => (
        <div className={s.rowStack}>
          <span className={s.rowTitle}>{brl(c.amount)}</span>
          <span className={s.rowSub}>vence {dueLabel(c)}</span>
        </div>
      ),
    },
    {
      key: 'period',
      label: 'Vigência',
      render: (c) => {
        const phrase = endingLabel(c);
        const ended = statusOf(c) === 'encerrado';
        return (
          <div className={s.rowStack}>
            <span>{periodLabel(c)}</span>
            {!phrase ? (
              <span className={s.rowMuted}>sem data de fim</span>
            ) : ended ? (
              <span className={s.rowMuted}>{phrase}</span>
            ) : isEnding(c) ? (
              <Badge tone="warning" size="sm">
                {phrase}
              </Badge>
            ) : (
              <span className={s.rowMuted}>fim definido</span>
            )}
          </div>
        );
      },
    },
    {
      key: 'reajuste',
      label: 'Reajuste',
      render: (c) => (
        <div className={s.rowStack}>
          <span>{reajusteLabel(c)}</span>
          <span className={s.rowSub}>reajuste em {MONTHS[c.anniversaryMonth - 1]}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Situação',
      render: (c) => (
        <Badge tone={STATUS_TONE[statusOf(c)]} size="sm">
          {STATUS_LABEL[statusOf(c)]}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: (c) => (
        <div className={s.rowActions}>
          <Button size="sm" variant="ghost" onClick={() => openEdit(c)}>
            Editar
          </Button>
          {statusOf(c) === 'ativo' && (
            <Button size="sm" variant="ghost" onClick={() => endNow(c)}>
              Encerrar
            </Button>
          )}
        </div>
      ),
    },
  ];

  const set =
    <K extends keyof Draft>(key: K) =>
    (value: string) =>
      setDraft((d) => ({ ...d, [key]: value }));

  return (
    <div className={s.stack}>
      <Card padding={pad}>
        <CardHeader
          title="Contratos"
          subtitle="Quanto cada inquilino paga, e até quando"
          action={
            <Button icon="plus" onClick={openNew}>
              Novo contrato
            </Button>
          }
        />
      </Card>

      <Card padding={0}>
        <DataTable columns={columns} rows={rows} empty="Nenhum contrato cadastrado ainda." />
      </Card>

      <Card padding={pad}>
        <CardHeader title="Como funciona" subtitle="O que cada campo quer dizer" />
        <div className={s.glossary}>
          {HOW.map(([term, meaning]) => (
            <div key={term} className={s.glossaryItem}>
              <Badge tone="soft">{term}</Badge>
              <p className={s.glossaryText}>{meaning}</p>
            </div>
          ))}
        </div>
        <p className={s.caption}>
          O prazo que aparece na lista é só uma informação — o aviso automático de 60 e 30 dias
          antes do fim ainda não é desta versão. Multa, juros de atraso, garantia e prazo de
          carência também não têm campo aqui: para a v1 o cadastro é o que basta para cobrar, e o
          documento do contrato em si vem depois.
        </p>
      </Card>

      <Dialog
        open={open}
        onClose={close}
        title={editing ? 'Editar contrato' : 'Novo contrato'}
        subtitle="Unidade, inquilino, valor e vencimento"
        width={mobile ? 440 : 560}
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              Cancelar
            </Button>
            <Button onClick={save} disabled={invalid !== null}>
              Salvar
            </Button>
          </>
        }
      >
        <div className={grid}>
          <Select
            label="Unidade"
            options={[{ value: '', label: 'Escolha a unidade' }, ...UNIT_OPTIONS]}
            value={draft.unit}
            onChange={set('unit')}
          />
          <Select
            label="Inquilino"
            options={[{ value: '', label: 'Escolha o inquilino' }, ...TENANTS.map((t) => ({ value: t.id, label: t.name }))]}
            value={draft.tenantId}
            onChange={set('tenantId')}
          />
        </div>

        <div className={grid}>
          <Input
            label="Aluguel por mês"
            value={draft.amount}
            onChange={set('amount')}
            placeholder="1200"
            inputMode="decimal"
            hint={digits(draft.amount) ? brl(Number(digits(draft.amount))) : 'Só o número, em reais.'}
          />
          <Input
            label="Dia do vencimento"
            value={draft.dueDay}
            onChange={set('dueDay')}
            placeholder="5"
            inputMode="numeric"
            hint="De 1 a 31."
          />
        </div>

        <div className={grid}>
          <Input label="Início" type="date" value={draft.start} onChange={set('start')} />
          <Input
            label="Fim (opcional)"
            type="date"
            value={draft.end}
            onChange={set('end')}
            hint="Deixe vazio se não tem data para acabar."
          />
        </div>

        <div className={grid}>
          <Select
            label="Reajuste"
            options={REAJUSTE_OPTIONS}
            value={draft.reajuste}
            onChange={(v) => setDraft((d) => ({ ...d, reajuste: v as Reajuste }))}
          />
          {draft.reajuste === 'fixo' ? (
            <Input
              label="Percentual fixo"
              value={draft.fixoPct}
              onChange={set('fixoPct')}
              placeholder="7"
              inputMode="decimal"
              hint="Um número combinado entre vocês, uma vez por ano."
            />
          ) : (
            <Input
              label="Mês do reajuste"
              value={draft.anniversaryMonth}
              onChange={set('anniversaryMonth')}
              placeholder="1"
              inputMode="numeric"
              hint="Mês em que o valor muda."
            />
          )}
        </div>

        {draft.reajuste === 'fixo' && (
          <Input
            label="Mês do reajuste"
            value={draft.anniversaryMonth}
            onChange={set('anniversaryMonth')}
            placeholder="1"
            inputMode="numeric"
            hint="Mês em que o valor muda."
          />
        )}

        {tried && invalid && (
          <p className={s.caption} role="status">
            {invalid}
          </p>
        )}
      </Dialog>
    </div>
  );
}
