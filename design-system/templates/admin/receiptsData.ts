/**
 * Dados de demonstração da tela de Recebimentos.
 *
 * Alinhado à R7 (painel completo) e à R3/R8 da spec: recebimentos com origem,
 * despesas por categoria e a lista "Precisa de atenção".
 *
 * Números inventados para a tela renderizar — não são dados reais.
 * Ligado ao banco, `receipts` vem de `payments`, `expenses` de `expenses` e
 * `attention` é calculada (cobranças atrasadas + status das conexões).
 */

export type ReceiptSource = 'mercadopago' | 'whatsapp' | 'manual';

/** Período do resumo — a R7 manda mês, trimestre ou ano. */
export type Range = 'Mês' | 'Trimestre' | 'Ano';

export interface Receipt {
  id: string;
  unit: string;
  tenant: string;
  /** AAAA-MM-DD. */
  date: string;
  amount: number;
  source: ReceiptSource;
  /** Quem/o que deu a baixa — a R3 manda guardar. */
  by: string;
}

export const RECEIPTS: Receipt[] = [
  { id: 'r1', unit: 'Casa do CIC', tenant: 'Maria', date: '2026-10-05', amount: 1200, source: 'mercadopago', by: 'baixa automática' },
  { id: 'r2', unit: 'Casa Água Verde', tenant: 'Pedro', date: '2026-10-03', amount: 1000, source: 'whatsapp', by: 'você, pelo "Recebeu?"' },
  { id: 'r3', unit: 'Kitnet', tenant: 'João', date: '2026-10-06', amount: 400, source: 'manual', by: 'você' },
  { id: 'r4', unit: 'Sala 2', tenant: 'Clínica Vida', date: '2026-09-10', amount: 1600, source: 'mercadopago', by: 'baixa automática' },
  { id: 'r5', unit: 'Loja Centro', tenant: 'Ana', date: '2026-09-30', amount: 1400, source: 'whatsapp', by: 'você, pelo "Recebeu?"' },
];

export const SOURCE_LABEL: Record<ReceiptSource, string> = {
  mercadopago: 'Mercado Pago',
  whatsapp: 'WhatsApp',
  manual: 'Manual',
};

/** Categorias de despesa, exatamente as da R8. */
export const EXPENSE_CATEGORIES = ['IPTU', 'Condomínio', 'Manutenção', 'Taxa', 'Outro'] as const;

export interface Expense {
  id: string;
  property: string;
  category: string;
  amount: number;
  date: string;
  /** Titular que pagou — a R8 manda guardar para o IR por titular. */
  paidBy: string;
}

export const EXPENSES: Expense[] = [
  { id: 'e1', property: 'Casa do CIC', category: 'IPTU', amount: 320, date: '2026-10-08', paidBy: 'Você' },
  { id: 'e2', property: 'Loja Centro', category: 'Condomínio', amount: 480, date: '2026-10-10', paidBy: 'Você' },
  { id: 'e3', property: 'Kitnet', category: 'Manutenção', amount: 150, date: '2026-10-12', paidBy: 'Vô' },
  { id: 'e4', property: 'Casa Água Verde', category: 'Taxa', amount: 12, date: '2026-10-03', paidBy: 'Você' },
];

/**
 * "Precisa de atenção" — a lista da R7. Cada item é algo que o proprietário
 * precisa resolver, em linguagem de gente, não código de erro.
 */
export type AttentionKind = 'late' | 'whatsapp' | 'mercadopago';

export interface Attention {
  id: string;
  kind: AttentionKind;
  title: string;
  detail: string;
  actionLabel: string;
}

export const ATTENTION: Attention[] = [
  {
    id: 'a1',
    kind: 'late',
    title: '1 cobrança atrasada',
    detail: 'Kitnet · João · R$ 400 em aberto desde 05/10',
    actionLabel: 'Ver cobrança',
  },
  {
    id: 'a2',
    kind: 'whatsapp',
    title: 'WhatsApp desconectado',
    detail: 'Os lembretes não estão saindo. Reconecte para a cobrança voltar ao automático.',
    actionLabel: 'Reconectar',
  },
];

/** Ocupação por período — usada no resumo. */
export const OCCUPANCY = {
  month: 78,
  quarter: 74,
  year: 71,
} as const;

export const brl = (v: number): string =>
  `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const brDate = (iso: string): string => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};
