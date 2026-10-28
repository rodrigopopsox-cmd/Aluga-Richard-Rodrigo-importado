/**
 * Dados de demonstração da tela "Este mês" (modo simples).
 *
 * É o caso real da Vó, descrito no PRODUCT.md: "casas, uma kitnet e comércios,
 * com o Pix caindo na conta dela ou na do Vô". Números inventados para a tela
 * renderizar — não são dados reais e não vêm de fonte externa.
 *
 * Quando o app for ligado ao banco, isto sai: cada card nasce de `charges` +
 * `payments` do mês de competência.
 */

import type { BadgeTone } from '../../components';

/** Situação da cobrança, em palavras — é assim que aparece na tela. */
export type ChargeMood = 'paid' | 'late' | 'due' | 'open';

export interface SimpleUnit {
  id: string;
  /** Nome como a Vó chama: "Casa do CIC", não um ID. */
  unit: string;
  /** Imóvel a que pertence. */
  property: string;
  /** Quem paga. */
  tenant: string;
  /** Valor do aluguel no mês, em reais. */
  rent: number;
  mood: ChargeMood;
  /**
   * Frase de situação. A spec manda: "Pago dia 05", "Atrasado 3 dias",
   * "Vence em 2 dias" — palavras, nunca só cor.
   */
  statusText: string;
}

export const SIMPLE_MONTHS = ['Setembro', 'Outubro', 'Novembro'] as const;

/** Mês em exibição na demonstração. */
export const SIMPLE_UNITS: SimpleUnit[] = [
  {
    id: 'u1',
    unit: 'Casa do CIC',
    property: 'Casa do CIC',
    tenant: 'Maria',
    rent: 1200,
    mood: 'paid',
    statusText: 'Pago dia 05',
  },
  {
    id: 'u2',
    unit: 'Casa Água Verde',
    property: 'Casa Água Verde',
    tenant: 'Pedro',
    rent: 1000,
    mood: 'paid',
    statusText: 'Pago dia 03',
  },
  {
    id: 'u3',
    unit: 'Kitnet',
    property: 'Casa do CIC',
    tenant: 'João',
    rent: 800,
    mood: 'late',
    statusText: 'Atrasado 3 dias',
  },
  {
    id: 'u4',
    unit: 'Loja Centro',
    property: 'Loja Centro',
    tenant: 'Ana',
    rent: 1400,
    mood: 'due',
    statusText: 'Vence em 2 dias',
  },
];

/** Total esperado e total já recebido, derivados dos cards. */
export function simpleTotals(units: SimpleUnit[]) {
  const expected = units.reduce((sum, u) => sum + u.rent, 0);
  const received = units.filter((u) => u.mood === 'paid').reduce((sum, u) => sum + u.rent, 0);
  return { expected, received, missing: expected - received };
}

/** Tom do badge de situação — cor como reforço, nunca como única informação. */
export const MOOD_TONE: Record<ChargeMood, BadgeTone> = {
  paid: 'success',
  late: 'danger',
  due: 'warning',
  open: 'neutral',
};
