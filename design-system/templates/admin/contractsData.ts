/**
 * Dados de demonstração da tela de Contratos.
 *
 * Modelo `leases` da spec (seção 6). A R2 manda, e só isso: unidade,
 * inquilino, valor, dia de vencimento (1 a 31), início, fim opcional,
 * índice de reajuste (IGP-M, IPCA, % fixo ou nenhum) e mês de aniversário.
 *
 * Nomes e números inventados para a tela renderizar — não são dados reais.
 * As unidades e os inquilinos são os mesmos de `tenantsData.ts` e
 * `chargesData.ts`, para as telas contarem a mesma história.
 *
 * O que a spec **não** pede para o contrato não tem campo aqui de
 * propósito: multa, juros de mora, garantia e carência não aparecem porque
 * "o cadastro do contrato basta para cobrar; o documento é v2"
 * (seção 3, fora do escopo). Invenção de campo seria invenção de regra.
 */

/** Índice de reajuste — exatamente os quatro que a R2 manda. */
export type Reajuste = 'igpm' | 'ipca' | 'fixo' | 'nenhum';

export interface Contract {
  id: string;
  /** Nome como o usuário chama a unidade. */
  unit: string;
  /**
   * Id do inquilino em `tenantsData.ts`. Guardado fora de sincronia de
   * propósito: contrato encerrado mantém o inquilino que assinou, mesmo
   * quando ele já saiu da lista de inquilinos ativos.
   */
  tenantId: string;
  tenantName: string;
  /**
   * PF ou PJ do inquilino. O informe de IR (R8) separa os rendimentos por
   * inquilino pessoa física ou jurídica, e o contrato e onde isso mora.
   */
  tenantKind: 'pf' | 'pj';
  /** Valor mensal do aluguel, em reais. */
  amount: number;
  /** Dia de vencimento, 1 a 31. Se o dia não existe no mês, vale o último (R3). */
  dueDay: number;
  /** Início, AAAA-MM-DD. */
  start: string;
  /** Fim opcional, AAAA-MM-DD. */
  end?: string;
  reajuste: Reajuste;
  /** Percentual do reajuste fixo. Só quando `reajuste === 'fixo'`. */
  fixoPct?: number;
  /** Mês (1 a 12) em que o contrato faz aniversário e reajusta. */
  anniversaryMonth: number;
}

/**
 * Data de referência da demonstração, fixa no arquivo. A tela não depende
 * do relógio de quem está olhando — "termina em 38 dias" precisa ser
 * sempre o mesmo número para a validação significar alguma coisa.
 */
export const HOJE = '2026-10-28';

export const CONTRACTS: Contract[] = [
  {
    id: 'k1',
    unit: 'Casa do CIC',
    tenantId: 't1',
    tenantKind: 'pf',
    tenantName: 'Maria Silva',
    amount: 1200,
    dueDay: 5,
    start: '2024-03-05',
    reajuste: 'igpm',
    anniversaryMonth: 3,
  },
  {
    id: 'k2',
    unit: 'Casa Água Verde',
    tenantId: 't2',
    tenantKind: 'pf',
    tenantName: 'Pedro Santos',
    amount: 1000,
    dueDay: 3,
    start: '2023-01-03',
    reajuste: 'ipca',
    anniversaryMonth: 1,
  },
  {
    id: 'k3',
    unit: 'Kitnet',
    tenantId: 't3',
    tenantKind: 'pf',
    tenantName: 'João Oliveira',
    amount: 800,
    dueDay: 5,
    start: '2026-01-05',
    // Fim de propósito: é o contrato que mostra o "termina em breve".
    end: '2026-12-05',
    reajuste: 'fixo',
    fixoPct: 7,
    anniversaryMonth: 1,
  },
  {
    id: 'k4',
    unit: 'Sala 2',
    tenantId: 't4',
    tenantKind: 'pj',
    tenantName: 'Clínica Vida Ltda',
    amount: 1600,
    dueDay: 10,
    start: '2025-06-10',
    end: '2027-05-31',
    reajuste: 'igpm',
    anniversaryMonth: 6,
  },
  {
    id: 'k5',
    unit: 'Loja Centro',
    tenantId: 't0',
    tenantKind: 'pf',
    tenantName: 'Ana Costa',
    amount: 1400,
    dueDay: 30,
    start: '2021-08-01',
    end: '2026-07-31',
    reajuste: 'nenhum',
    anniversaryMonth: 8,
  },
];

/** Rótulo do índice, como a spec escreve. */
export const REAJUSTE_LABEL: Record<Reajuste, string> = {
  igpm: 'IGP-M',
  ipca: 'IPCA',
  fixo: '% fixo',
  nenhum: 'Sem reajuste',
};

export const REAJUSTE_OPTIONS: Array<{ value: Reajuste; label: string }> = [
  { value: 'igpm', label: 'IGP-M' },
  { value: 'ipca', label: 'IPCA' },
  { value: 'fixo', label: '% fixo' },
  { value: 'nenhum', label: 'Sem reajuste' },
];

export const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
] as const;

/**
 * Estado do contrato, derivado só do fim. `encerrado` quando o fim já
 * passou; `ativo` enquanto não há fim ou ele ainda não chegou. Não existe
 * "suspenso" nem "rescindido" porque a spec não define esses estados.
 */
export type ContractStatus = 'ativo' | 'encerrado';

export const statusOf = (c: Contract, today: string = HOJE): ContractStatus =>
  c.end && c.end < today ? 'encerrado' : 'ativo';

export const STATUS_LABEL: Record<ContractStatus, string> = {
  ativo: 'Ativo',
  encerrado: 'Encerrado',
};

export const STATUS_TONE = {
  ativo: 'success',
  encerrado: 'neutral',
} as const;

/**
 * Quantos dias faltam para o contrato terminar. `null` quando não tem fim.
 * Negativo quando já terminou.
 */
export function daysLeft(c: Contract, today: string = HOJE): number | null {
  if (!c.end) return null;
  const a = Date.parse(`${today}T00:00:00Z`);
  const b = Date.parse(`${c.end}T00:00:00Z`);
  return Math.round((b - a) / 86400000);
}

/**
 * Um contrato está "terminando" quando falta menos de 60 dias — a mesma
 * janela que a spec usa no alerta de fim de contrato (v1.1). Aqui a tela
 * só mostra o prazo; o alerta automático não é desta versão.
 */
export const isEnding = (c: Contract, today: string = HOJE): boolean => {
  const d = daysLeft(c, today);
  return d !== null && d >= 0 && d <= 60;
};

/** AAAA-MM-DD para DD/MM/AAAA. */
export const brDate = (iso: string): string => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

/** Vigência em palavras: "desde 05/03/2024" ou "05/01/2026 até 05/12/2026". */
export const periodLabel = (c: Contract): string =>
  c.end ? `${brDate(c.start)} até ${brDate(c.end)}` : `desde ${brDate(c.start)}`;

/** "dia 5" — a R3 já cuida do mês que não tem o dia 31. */
export const dueLabel = (c: Contract): string => `dia ${c.dueDay}`;

/** Rótulo completo do reajuste, com o percentual quando é fixo. */
export const reajusteLabel = (c: Contract): string =>
  c.reajuste === 'fixo' && c.fixoPct ? `${c.fixoPct}% fixo` : REAJUSTE_LABEL[c.reajuste];

/** Frase do que falta, pronta para a tabela. */
export const endingLabel = (c: Contract, today: string = HOJE): string | null => {
  const d = daysLeft(c, today);
  if (d === null) return null;
  if (d < 0) return `terminou há ${Math.abs(d)} dia${Math.abs(d) === 1 ? '' : 's'}`;
  if (d === 0) return 'termina hoje';
  return `termina em ${d} dia${d === 1 ? '' : 's'}`;
};
