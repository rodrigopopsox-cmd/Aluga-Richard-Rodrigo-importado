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
  Metric,
  Select,
  type DataTableColumn,
} from '../../components';
import type { Breakpoint } from './useBreakpoint';
import type { ToastInput } from './AdminApp';
import {
  CATEGORIES,
  CATEGORY_LABEL,
  EXPENSES,
  HOLDERS,
  YEAR,
  buildCsv,
  csvName,
  extratoRows,
  informeOf,
  informeTotal,
  revenueByTenant,
  type Expense,
  type ExpenseCategory,
} from './expensesData';
import { PROPERTIES, UNITS, addressOf } from './propertiesData';
import { brl } from './data';
import s from './Screens.module.css';

/**
 * Despesas — a R8 tem três partes, e a tela tem as três.
 *
 *  1. Cadastro de despesa: imóvel (obrigatório), unidade (opcional),
 *     categoria (IPTU, condomínio, manutenção, taxa, outro), valor, data e
 *     quem pagou (titular).
 *  2. Informe de rendimentos anual por titular: mês a mês, aplicando a %
 *     de participação, separado por inquilino PF ou PJ, com totais.
 *  3. Extrato CSV de recebimentos e despesas por período.
 *
 * O informe é a razão de a tela existir: a história 1 da spec é o
 * proprietário que "chega ao Imposto de Renda sem os números separados por
 * titular", e a história 5 é "o total recebido no ano por titular (meu e
 * do meu marido), para levar ao contador".
 *
 * RESSALVA QUE A TELA REPETE PARA O USUÁRIO: a receita do informe é o
 * valor ATUAL de cada contrato repetido em cada mês ativo. O reajuste não
 * é simulado — o histórico de reajuste não existe na v1 (alertas de
 * reajuste são v1.1). O número fecha por titular e por mês, mas não é o
 * número para declarar.
 *
 * O informe é gerado como tabela e CSV. PDF não: gerar PDF é biblioteca
 * nova, e o conteúdo que a R8 pede está todo na tabela. Falta o formato,
 * não a informação.
 */
export interface ExpensesScreenProps {
  bp: Breakpoint;
  toast: (t: ToastInput) => void;
}

interface Draft {
  propertyId: string;
  unitId: string;
  category: ExpenseCategory;
  amount: string;
  date: string;
  paidBy: string;
  what: string;
}

const MONTH_SHORT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

const EMPTY: Draft = {
  propertyId: '',
  unitId: '',
  category: 'iptu',
  amount: '',
  date: `${YEAR}-10-28`,
  paidBy: '',
  what: '',
};

const digits = (v: string): string => v.replace(/\D/g, '');

const money = (v: number): string => brl(v);

export function ExpensesScreen({ bp, toast }: ExpensesScreenProps) {
  const [rows, setRows] = useState<Expense[]>(EXPENSES);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);

  const [holder, setHolder] = useState<string>(HOLDERS[0] ?? '');
  const [year] = useState<number>(YEAR);

  const mobile = bp === 'm';
  const pad = mobile ? 'var(--space-4-5)' : 'var(--card-padding)';
  const grid = mobile ? s.stack : s.formGrid;

  const yearRows = useMemo(() => rows.filter((e) => e.date.startsWith(String(year))), [rows, year]);
  const totalYear = yearRows.reduce((sum, e) => sum + e.amount, 0);
  const byCategory = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        category: c,
        total: yearRows.filter((e) => e.category === c).reduce((sum, e) => sum + e.amount, 0),
      })).filter((x) => x.total > 0),
    [yearRows],
  );

  const informe = useMemo(() => informeOf(holder, year), [holder, year]);
  const totals = useMemo(() => informeTotal(informe), [informe]);
  const tenants = useMemo(() => revenueByTenant(year), [year]);
  /** Receita do ano inteiro, no mesmo escopo das despesas — os dois cards comparam. */
  const revenueYear = useMemo(() => tenants.reduce((sum, t) => sum + t.total, 0), [tenants]);
  const resultYear = revenueYear - totalYear;

  const unitsOfProperty = draft.propertyId ? UNITS.filter((u) => u.propertyId === draft.propertyId) : [];

  const close = () => {
    setOpen(false);
    setEditing(null);
    setDraft(EMPTY);
  };

  const openNew = () => {
    setEditing(null);
    setDraft({ ...EMPTY, paidBy: holder });
    setOpen(true);
  };

  const openEdit = (e: Expense) => {
    setEditing(e);
    setDraft({
      propertyId: e.propertyId,
      unitId: e.unitId ?? '',
      category: e.category,
      amount: String(e.amount),
      date: e.date,
      paidBy: e.paidBy,
      what: e.what,
    });
    setOpen(true);
  };

  const invalid =
    !draft.propertyId ||
    !(Number(digits(draft.amount)) > 0) ||
    !draft.date ||
    !draft.paidBy.trim() ||
    !draft.what.trim();

  const save = () => {
    if (invalid) return;
    const expense: Expense = {
      id: editing?.id ?? `e${Date.now()}`,
      propertyId: draft.propertyId,
      unitId: draft.unitId || undefined,
      category: draft.category,
      amount: Number(digits(draft.amount)),
      date: draft.date,
      paidBy: draft.paidBy.trim(),
      what: draft.what.trim(),
    };
    setRows((prev) => (editing ? prev.map((x) => (x.id === editing.id ? expense : x)) : [...prev, expense]));
    toast({
      tone: 'success',
      title: editing ? 'Despesa atualizada' : 'Despesa registrada',
      message: `${expense.what} · ${money(expense.amount)}`,
    });
    close();
  };

  const remove = (e: Expense) => {
    setRows((prev) => prev.filter((x) => x.id !== e.id));
    toast({ tone: 'info', title: 'Despesa removida', message: `${e.what} saiu da lista.` });
  };

  /** Baixa o extrato CSV — Blob + link, sem biblioteca. */
  const downloadCsv = () => {
    const csv = buildCsv(extratoRows(year));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = csvName(year);
    a.click();
    URL.revokeObjectURL(url);
    toast({
      tone: 'success',
      title: 'Extrato baixado',
      message: `${csvName(year)} · ${extratoRows(year).length} linhas`,
    });
  };

  const columns: Array<DataTableColumn<Expense>> = [
    {
      key: 'date',
      label: 'Data',
      render: (e) => {
        const [, m, d] = e.date.split('-');
        return `${d}/${m}`;
      },
    },
    {
      key: 'what',
      label: 'O que foi',
      render: (e) => (
        <div className={s.rowStack}>
          <span className={s.rowTitle}>{e.what}</span>
          <span className={s.rowSub}>{CATEGORY_LABEL[e.category]}</span>
        </div>
      ),
    },
    {
      key: 'unit',
      label: 'Onde',
      render: (e) => {
        const p = PROPERTIES.find((x) => x.id === e.propertyId);
        const u = e.unitId ? UNITS.find((x) => x.id === e.unitId) : undefined;
        if (!p) return <span className={s.rowMuted}>—</span>;
        return (
          <div className={s.rowStack}>
            <span>{u ? `${p.nickname} · ${u.name}` : p.nickname}</span>
            <span className={s.rowSub}>{u ? 'unidade' : 'imóvel inteiro'}</span>
          </div>
        );
      },
    },
    { key: 'paidBy', label: 'Quem pagou', render: (e) => e.paidBy },
    {
      key: 'amount',
      label: 'Valor',
      align: 'right',
      render: (e) => money(e.amount),
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: (e) => (
        <div className={s.rowActions}>
          <Button size="sm" variant="ghost" onClick={() => openEdit(e)}>
            Editar
          </Button>
          <Button size="sm" variant="ghost" onClick={() => remove(e)}>
            Remover
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.stack}>
      <div className={s.grid} style={{ gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3, minmax(0, 1fr))' }}>
        <Card padding="var(--space-5-5)">
          <CardHeader size="sm" title={`Despesas de ${year}`} subtitle="registradas no ano" />
          <Metric value={money(totalYear)} size="md" className={s.mt3} />
        </Card>
        <Card padding="var(--space-5-5)">
          <CardHeader size="sm" title="Recebido no ano" subtitle="aluguéis do ano" />
          <Metric value={money(revenueYear)} size="md" className={s.mt3} />
        </Card>
        <Card padding="var(--space-5-5)">
          <CardHeader size="sm" title="Resultado" subtitle="recebido menos despesas" />
          <Metric value={money(resultYear)} size="md" className={s.mt3} />
        </Card>
      </div>

      <Card padding={pad}>
        <CardHeader
          title="Despesas"
          subtitle={`${yearRows.length} lançamentos em ${year}`}
          action={
            <Button icon="plus" onClick={openNew}>
              Nova despesa
            </Button>
          }
        />
        {byCategory.length > 0 && (
          <div className={s.chips}>
            {byCategory.map((x) => (
              <Badge key={x.category} tone="neutral" size="sm">
                {CATEGORY_LABEL[x.category]} · {money(x.total)}
              </Badge>
            ))}
          </div>
        )}
      </Card>

      <Card padding={0}>
        <DataTable columns={columns} rows={yearRows} empty="Nenhuma despesa registrada neste ano." />
      </Card>

      {/* ---------------- Informe de rendimentos (R8) ---------------- */}
      <Card padding={pad}>
        <CardHeader
          title="Informe de rendimentos"
          subtitle="Mês a mês, pela fatia de cada titular — é o que o contador pede"
          action={
            <div className={s.rowActions}>
              <Select
                label="Titular"
                size="sm"
                options={HOLDERS}
                value={holder}
                onChange={setHolder}
              />
              <Button variant="secondary" onClick={downloadCsv}>
                Baixar extrato CSV
              </Button>
            </div>
          }
        />
        <DataTable
          columns={[
            { key: 'm', label: 'Mês', render: (l) => MONTH_SHORT[l.month - 1] },
            { key: 'r', label: 'Recebido', align: 'right', render: (l) => money(l.revenue) },
            { key: 'e', label: 'Despesas', align: 'right', render: (l) => money(l.expenses) },
            { key: 's', label: 'Resultado', align: 'right', render: (l) => money(l.result) },
          ]}
          rows={informe}
          empty="Nenhum rendimento neste ano."
        />
        <div className={s.informeTotal}>
          <span>Total de {year}</span>
          <span>
            {money(totals.revenue)} recebido · {money(totals.expenses)} de despesas ·{' '}
            <strong>{money(totals.result)}</strong> de resultado
          </span>
        </div>
        <p className={s.caption}>
          Recebido é a fatia de {holder} no aluguel de cada mês, pela % de participação de cada
          imóvel. O reajuste não entra na conta: o valor usado é o que está no contrato hoje, e o
          histórico de reajuste ainda não existe. O informe fecha por titular e por mês, mas não é o
          número para declarar — confira com o contador.
        </p>
      </Card>

      {/* ---------------- Por inquilino, PF ou PJ (R8) ---------------- */}
      <Card padding={pad}>
        <CardHeader
          title="Recebido por inquilino"
          subtitle="Separado por pessoa física ou jurídica, como o informe pede"
        />
        <DataTable
          columns={[
            {
              key: 't',
              label: 'Inquilino',
              render: (r) => (
                <div className={s.rowStack}>
                  <span className={s.rowTitle}>{r.tenant}</span>
                  <span className={s.rowSub}>{r.unit}</span>
                </div>
              ),
            },
            {
              key: 'k',
              label: 'Tipo',
              render: (r) => (
                <Badge tone="neutral" size="sm">
                  {r.kind === 'pj' ? 'Pessoa jurídica' : 'Pessoa física'}
                </Badge>
              ),
            },
            { key: 'v', label: `Recebido em ${year}`, align: 'right', render: (r) => money(r.total) },
          ]}
          rows={tenants}
          empty="Nenhum inquilino neste ano."
        />
      </Card>

      <Card padding={pad}>
        <CardHeader title="Como funciona" subtitle="O que cada campo quer dizer" />
        <div className={s.glossary}>
          {[
            [
              'Onde',
              'A despesa pode ser do imóvel inteiro — um IPTU, um condomínio — ou de uma unidade só, quando o conserto foi numa kitnet.',
            ],
            [
              'Categoria',
              'IPTU, condomínio, manutenção, taxa ou outro. É por categoria que se descobre para onde o dinheiro do imóvel está indo.',
            ],
            [
              'Quem pagou',
              'O titular que tirou do bolso. Não é rateado: se um pagou, a despesa é dele.',
            ],
            [
              'Fatia',
              'A participação de cada titular no imóvel, em %. Dois donos, 60 e 40, dá dois informes diferentes.',
            ],
            [
              'Extrato CSV',
              'Recebimentos e despesas do período, com ponto e vírgula, que abre direto no Excel em português.',
            ],
          ].map(([term, meaning]) => (
            <div key={term} className={s.glossaryItem}>
              <Badge tone="soft">{term}</Badge>
              <p className={s.glossaryText}>{meaning}</p>
            </div>
          ))}
        </div>
        <p className={s.caption}>
          O informe de rendimentos sai como tabela e como CSV. Em PDF ainda não: o que a R8 pede de
          informação está todo aqui, falta o formato — e formato sem a informação não serviria para
          nada.
        </p>
      </Card>

      {/* ---------------- Diálogo: despesa ---------------- */}
      <Dialog
        open={open}
        onClose={close}
        title={editing ? 'Editar despesa' : 'Nova despesa'}
        subtitle="Onde, o que foi, quanto e quem pagou"
        width={mobile ? 440 : 560}
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              Cancelar
            </Button>
            <Button onClick={save} disabled={invalid}>
              Salvar
            </Button>
          </>
        }
      >
        <div className={grid}>
          <Select
            label="Imóvel"
            options={[{ value: '', label: 'Escolha o imóvel' }, ...PROPERTIES.map((p) => ({ value: p.id, label: p.nickname }))]}
            value={draft.propertyId}
            onChange={(v) => setDraft((d) => ({ ...d, propertyId: v, unitId: '' }))}
          />
          <Select
            label="Unidade (opcional)"
            options={[
              { value: '', label: 'Imóvel inteiro' },
              ...unitsOfProperty.map((u) => ({ value: u.id, label: u.name })),
            ]}
            value={draft.unitId}
            onChange={(v) => setDraft((d) => ({ ...d, unitId: v }))}
            disabled={!draft.propertyId}
            hint={draft.propertyId ? undefined : 'Escolha o imóvel primeiro.'}
          />
        </div>

        <Input
          label="O que foi"
          value={draft.what}
          onChange={(v) => setDraft((d) => ({ ...d, what: v }))}
          placeholder="Ex.: Conserto hidráulico"
        />

        <div className={grid}>
          <Select
            label="Categoria"
            options={CATEGORIES.map((c) => ({ value: c, label: CATEGORY_LABEL[c] }))}
            value={draft.category}
            onChange={(v) => setDraft((d) => ({ ...d, category: v as ExpenseCategory }))}
          />
          <Input
            label="Valor"
            value={draft.amount}
            onChange={(v) => setDraft((d) => ({ ...d, amount: v }))}
            placeholder="350"
            inputMode="decimal"
            hint={digits(draft.amount) ? money(Number(digits(draft.amount))) : 'Só o número, em reais.'}
          />
        </div>

        <div className={grid}>
          <Input
            label="Data"
            type="date"
            value={draft.date}
            onChange={(v) => setDraft((d) => ({ ...d, date: v }))}
          />
          <Select
            label="Quem pagou"
            options={[{ value: '', label: 'Escolha o titular' }, ...HOLDERS]}
            value={draft.paidBy}
            onChange={(v) => setDraft((d) => ({ ...d, paidBy: v }))}
          />
        </div>

        {draft.propertyId && (
          <p className={s.caption}>
            {addressOf(PROPERTIES.find((p) => p.id === draft.propertyId)!)}
          </p>
        )}
      </Dialog>
    </div>
  );
}
