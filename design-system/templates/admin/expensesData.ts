/**
 * Dados de demonstração da tela de Despesas.
 *
 * Modelo `expenses` da spec (seção 6). A R8 manda três coisas:
 *
 *  1. Despesa: imóvel (e unidade, opcional), categoria (IPTU, condomínio,
 *     manutenção, taxa, outro), valor, data e quem pagou (titular).
 *  2. Informe de rendimentos anual por titular: mês a mês, aplicando a %
 *     de participação, separado por inquilino pessoa física ou jurídica,
 *     com totais.
 *  3. Extrato CSV de recebimentos e despesas por período, que abre direto
 *     no Excel.
 *
 * Nomes, valores e datas inventados — não são dados reais.
 *
 * SOBRE O CÁLCULO DA RECEITA — leia antes de confiar nos números:
 *
 * A receita do informe é o valor ATUAL de cada contrato, repetido em cada
 * mês em que ele está ativo. O reajuste NÃO é simulado: um contrato
 * IGP-M que reajustou em março aparece com o mesmo valor em janeiro e em
 * dezembro, porque o app guarda um valor só por contrato e o histórico de
 * reajuste não existe na v1 (os alertas de reajuste são v1.1). O informe
 * aqui é estrutural — prova que a conta por titular e por mês fecha — e
 * não é o número que se leva ao contador.
 */

import { CONTRACTS } from './contractsData';
import { PROPERTIES, UNITS, ownersLabel } from './propertiesData';

/** Categoria da despesa — exatamente as cinco que a R8 manda. */
export type ExpenseCategory = 'iptu' | 'condominio' | 'manutencao' | 'taxa' | 'outro';

export const CATEGORIES: ExpenseCategory[] = ['iptu', 'condominio', 'manutencao', 'taxa', 'outro'];

export const CATEGORY_LABEL: Record<ExpenseCategory, string> = {
  iptu: 'IPTU',
  condominio: 'Condomínio',
  manutencao: 'Manutenção',
  taxa: 'Taxa',
  outro: 'Outro',
};

export interface Expense {
  id: string;
  /** Imóvel — obrigatório, como a R8 manda. */
  propertyId: string;
  /** Unidade dentro do imóvel — opcional, como a R8 manda. */
  unitId?: string;
  category: ExpenseCategory;
  /** Valor em reais. */
  amount: number;
  /** Data AAAA-MM-DD. */
  date: string;
  /** Quem pagou (titular). */
  paidBy: string;
  /** Descrição livre — o que foi. */
  what: string;
}

/** Ano do informe de demonstração. */
export const YEAR = 2026;

export const EXPENSES: Expense[] = [
  {
    id: 'e1',
    propertyId: 'p1',
    unitId: 'u1',
    category: 'iptu',
    amount: 480,
    date: '2026-03-10',
    paidBy: 'Iara Alves',
    what: 'IPTU à vista',
  },
  {
    id: 'e2',
    propertyId: 'p2',
    unitId: 'u2',
    category: 'iptu',
    amount: 520,
    date: '2026-02-15',
    paidBy: 'Iara Alves',
    what: 'IPTU parcela única',
  },
  {
    id: 'e3',
    propertyId: 'p3',
    unitId: 'u3',
    category: 'manutencao',
    amount: 350,
    date: '2026-09-12',
    paidBy: 'Rodrigo Alves',
    what: 'Conserto hidráulico',
  },
  {
    id: 'e4',
    propertyId: 'p4',
    category: 'condominio',
    amount: 620,
    date: '2026-10-05',
    paidBy: 'Iara Alves',
    what: 'Condomínio do mês',
  },
  {
    id: 'e5',
    propertyId: 'p4',
    unitId: 'u4',
    category: 'taxa',
    amount: 90,
    date: '2026-08-20',
    paidBy: 'Iara Alves',
    what: 'Taxa de limpeza',
  },
  {
    id: 'e6',
    propertyId: 'p4',
    unitId: 'u5',
    category: 'manutencao',
    amount: 780,
    date: '2026-10-02',
    paidBy: 'Iara Alves',
    what: 'Ar-condicionado',
  },
];

/** Titulares que aparecem nas despesas e nos imóveis. */
export const HOLDERS: string[] = Array.from(
  new Set([...PROPERTIES.flatMap((p) => p.owners.map((o) => o.name)), ...EXPENSES.map((e) => e.paidBy)]),
).sort();

/* ------------------------------------------------------------------ */
/* Informe de rendimentos (R8, item 2)                                 */
/* ------------------------------------------------------------------ */

/** Competência AAAA-MM de uma data ISO. */
const monthOf = (iso: string): string => iso.slice(0, 7);

/** A unidade do contrato existe em `propertiesData`? */
const unitOf = (name: string) => UNITS.find((u) => u.name === name);

/** Fatia (0 a 1) de um titular num imóvel. Zero quando não é dono. */
function shareOf(propertyId: string, holder: string): number {
  const p = PROPERTIES.find((x) => x.id === propertyId);
  if (!p) return 0;
  const o = p.owners.find((x) => x.name === holder);
  return o ? o.pct / 100 : 0;
}

/**
 * Receita do titular num mês, aplicando a % de participação.
 *
 * Soma, sobre os contratos ativos no mês, o valor do aluguel vezes a fatia
 * do titular no imóvel daquela unidade.
 */
export function revenueOf(holder: string, year: number, month: number): number {
  const key = `${year}-${String(month).padStart(2, '0')}`;
  return CONTRACTS.reduce((sum, c) => {
    if (monthOf(c.start) > key) return sum;
    if (c.end && monthOf(c.end) < key) return sum;
    const u = unitOf(c.unit);
    if (!u) return sum;
    return sum + c.amount * shareOf(u.propertyId, holder);
  }, 0);
}

/** Despesas pagas pelo titular num mês. */
export function expensesOf(holder: string, year: number, month: number): number {
  const key = `${year}-${String(month).padStart(2, '0')}`;
  return EXPENSES.filter((e) => monthOf(e.date) === key && e.paidBy === holder).reduce(
    (sum, e) => sum + e.amount,
    0,
  );
}

export interface InformeLine {
  month: number;
  revenue: number;
  expenses: number;
  result: number;
}

/** Informe mês a mês de um titular, com os 12 meses e os totais. */
export function informeOf(holder: string, year: number = YEAR): InformeLine[] {
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const revenue = revenueOf(holder, year, month);
    const expenses = expensesOf(holder, year, month);
    return { month, revenue, expenses, result: revenue - expenses };
  });
}

export const informeTotal = (lines: InformeLine[]) =>
  lines.reduce(
    (acc, l) => ({
      revenue: acc.revenue + l.revenue,
      expenses: acc.expenses + l.expenses,
      result: acc.result + l.result,
    }),
    { revenue: 0, expenses: 0, result: 0 },
  );

/**
 * Rendimentos do ano separados por inquilino, com PF ou PJ — o outro
 * corte que a R8 pede no informe. Quem tem contrato encerrado no meio do
 * ano aparece só com os meses em que ocupou.
 */
export function revenueByTenant(
  year: number = YEAR,
): Array<{ tenant: string; kind: 'pf' | 'pj'; unit: string; total: number }> {
  return CONTRACTS.map((c) => {
    let total = 0;
    for (let m = 1; m <= 12; m += 1) {
      const key = `${year}-${String(m).padStart(2, '0')}`;
      if (monthOf(c.start) > key) continue;
      if (c.end && monthOf(c.end) < key) continue;
      total += c.amount;
    }
    return { tenant: c.tenantName, kind: c.tenantKind, unit: c.unit, total };
  });
}

/* ------------------------------------------------------------------ */
/* Extrato CSV (R8, item 3)                                            */
/* ------------------------------------------------------------------ */

export interface CsvRow {
  date: string;
  kind: 'recebimento' | 'despesa';
  unit: string;
  what: string;
  category: string;
  holder: string;
  amount: number;
}

/**
 * Extrato de recebimentos e despesas por período.
 *
 * Recebimento entra pelo valor do contrato em cada mês ativo — mesma
 * ressalva do cálculo do informe: sem histórico de reajuste.
 */
export function extratoRows(year: number = YEAR): CsvRow[] {
  const rows: CsvRow[] = [];
  for (let m = 1; m <= 12; m += 1) {
    const key = `${year}-${String(m).padStart(2, '0')}`;
    for (const c of CONTRACTS) {
      if (monthOf(c.start) > key) continue;
      if (c.end && monthOf(c.end) < key) continue;
      const p = unitOf(c.unit) ? PROPERTIES.find((x) => x.id === unitOf(c.unit)!.propertyId) : undefined;
      rows.push({
        date: `${key}-01`,
        kind: 'recebimento',
        unit: c.unit,
        what: `Aluguel — ${c.tenantName}`,
        category: 'aluguel',
        // Titular do recebimento e quem e dono do imovel, com a fatia — e
        // assim que o contador separa por pessoa.
        holder: p ? ownersLabel(p) : '',
        amount: c.amount,
      });
    }
  }
  for (const e of EXPENSES) {
    if (!e.date.startsWith(String(year))) continue;
    const p = PROPERTIES.find((x) => x.id === e.propertyId);
    const u = e.unitId ? UNITS.find((x) => x.id === e.unitId) : undefined;
    rows.push({
      date: e.date,
      kind: 'despesa',
      unit: u ? `${p?.nickname ?? ''} · ${u.name}` : (p?.nickname ?? ''),
      what: e.what,
      category: CATEGORY_LABEL[e.category],
      holder: e.paidBy,
      amount: -e.amount,
    });
  }
  return rows.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * CSV que abre direto no Excel em português: separador `;` (a vírgula é
 * decimal em pt-BR) e quebra de linha do Windows.
 */
export function buildCsv(rows: CsvRow[]): string {
  const head = ['Data', 'Tipo', 'Unidade', 'Descrição', 'Categoria', 'Titular', 'Valor (R$)'];
  const cell = (v: string | number) => {
    const s = typeof v === 'number' ? v.toFixed(2).replace('.', ',') : String(v);
    return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [head.join(';'), ...rows.map((r) =>
    [r.date, r.kind, r.unit, r.what, r.category, r.holder, r.amount.toFixed(2).replace('.', ',')].map(cell).join(';'),
  )];
  return `${lines.join('\r\n')}\r\n`;
}

/** Nome do arquivo, com o período. */
export const csvName = (year: number, from?: string, to?: string): string =>
  `extrato-aluga-${from ?? `${year}-01`}-a-${to ?? `${year}-12`}.csv`;
