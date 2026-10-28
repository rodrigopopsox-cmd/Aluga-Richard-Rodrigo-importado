/**
 * Dados de demonstração da tela de Cobranças.
 *
 * Modelo alinhado ao rascunho da spec (seção 6): `charges` + `payments`.
 * Uma cobrança por contrato ativo, por mês de competência.
 *
 * Números inventados para a tela renderizar — não são dados reais.
 * Ligado ao banco, a lista vem de `charges` filtrado pela competência.
 */

/** Estados da cobrança, exatamente os da R3: prevista → aberta → paga | atrasada | cancelada. */
export type ChargeStatus = 'prevista' | 'aberta' | 'paga' | 'atrasada' | 'cancelada';

/** Origem do recebimento — campo `payments.source` da spec. */
export type PaymentSource = 'mercadopago' | 'whatsapp' | 'manual';

export interface Charge {
  id: string;
  /** Nome como o usuário chama. */
  unit: string;
  tenant: string;
  /** Competência AAAA-MM. */
  period: string;
  /** Valor da cobrança no mês. */
  amount: number;
  /** Quanto já entrou. Menor que `amount` = recebimento parcial. */
  paid: number;
  /** Vencimento AAAA-MM-DD. */
  dueDate: string;
  status: ChargeStatus;
  /** Preenchido quando há recebimento. */
  source?: PaymentSource;
  /** Quem registrou e quando — a R3 manda guardar no "desfazer". */
  receivedBy?: string;
}

export const CHARGES: Charge[] = [
  {
    id: 'c1',
    unit: 'Casa do CIC',
    tenant: 'Maria',
    period: '2026-10',
    amount: 1200,
    paid: 1200,
    dueDate: '2026-10-05',
    status: 'paga',
    source: 'mercadopago',
    receivedBy: 'baixa automática em 05/10',
  },
  {
    id: 'c2',
    unit: 'Casa Água Verde',
    tenant: 'Pedro',
    period: '2026-10',
    amount: 1000,
    paid: 1000,
    dueDate: '2026-10-03',
    status: 'paga',
    source: 'whatsapp',
    receivedBy: 'você em 03/10, pelo "Recebeu?"',
  },
  {
    id: 'c3',
    unit: 'Kitnet',
    tenant: 'João',
    period: '2026-10',
    amount: 800,
    paid: 400,
    dueDate: '2026-10-05',
    status: 'aberta',
    source: 'manual',
    receivedBy: 'você em 06/10',
  },
  {
    id: 'c4',
    unit: 'Loja Centro',
    tenant: 'Ana',
    period: '2026-10',
    amount: 1400,
    paid: 0,
    dueDate: '2026-10-30',
    status: 'aberta',
  },
  {
    id: 'c5',
    unit: 'Sala 2',
    tenant: 'Clínica Vida',
    period: '2026-11',
    amount: 1600,
    paid: 0,
    dueDate: '2026-11-10',
    status: 'prevista',
  },
];

/** Rótulo em palavras do estado — a tela fala com o usuário, não com o banco. */
export const STATUS_LABEL: Record<ChargeStatus, string> = {
  prevista: 'Prevista',
  aberta: 'Em aberto',
  paga: 'Paga',
  atrasada: 'Atrasada',
  cancelada: 'Cancelada',
};

/** Tom do badge — cor como reforço, nunca como única informação. */
export const STATUS_TONE = {
  prevista: 'neutral',
  aberta: 'warning',
  paga: 'success',
  atrasada: 'danger',
  cancelada: 'neutral',
} as const;

export const SOURCE_LABEL: Record<PaymentSource, string> = {
  mercadopago: 'Mercado Pago',
  whatsapp: 'WhatsApp ("Recebeu?")',
  manual: 'Manual',
};

/** Saldo em aberto da cobrança. */
export const balanceOf = (c: Charge): number => c.amount - c.paid;
