/**
 * Dados de demonstração da tela de Imóveis.
 *
 * Modelo `properties` + `units` da spec (seção 6). A R2 manda:
 *   · Imóvel: apelido, tipo (casa, kitnet, comércio, apartamento, outro),
 *     endereço com preenchimento pelo CEP e proprietários com % de
 *     participação. A soma dá 100% e o padrão é um único proprietário
 *     com 100%.
 *   · Unidade: nome, status (alugada ou vaga). Imóvel de uma unidade só
 *     cria a unidade sozinho, e o usuário não vê a diferença.
 *
 * Nomes, endereços e números inventados — não são dados reais. As unidades
 * e os inquilinos são os mesmos de `tenantsData.ts`, `contractsData.ts` e
 * `chargesData.ts`, para as telas contarem a mesma história.
 *
 * A "Loja Centro" está vaga de propósito: o contrato dela foi encerrado em
 * 31/07/2026 (ver `contractsData.ts`). Unidade vaga é um estado real do
 * produto, não um espaço em branco.
 */

/** Tipo do imóvel — exatamente os cinco que a R2 manda. */
export type PropertyType = 'casa' | 'kitnet' | 'comércio' | 'apartamento' | 'outro';

export const PROPERTY_TYPES: PropertyType[] = ['casa', 'kitnet', 'comércio', 'apartamento', 'outro'];

/** Proprietário (titular) e sua fatia do imóvel. A soma dá 100%. */
export interface Owner {
  name: string;
  pct: number;
}

export interface Property {
  id: string;
  /** Apelido — como o usuário chama o imóvel. */
  nickname: string;
  type: PropertyType;
  cep: string;
  street: string;
  number: string;
  district: string;
  city: string;
  /** Um ou mais proprietários. A soma dos percentuais dá 100%. */
  owners: Owner[];
}

/** Status da unidade — só dois, como a R2 manda. */
export type UnitStatus = 'alugada' | 'vaga';

export interface Unit {
  id: string;
  propertyId: string;
  name: string;
  status: UnitStatus;
  /** Nome do inquilino, quando alugada. */
  tenant?: string;
}

/**
 * Limite de unidades por plano, literal de PRODUCT.md (seção "Planos e
 * preços"). `null` = ilimitado.
 */
export const PLAN_UNIT_LIMIT: Record<string, number | null> = {
  Essencial: 5,
  Família: 10,
  Patrimônio: 50,
  Investidor: null,
};

/**
 * Plano da conta de demonstração. PRODUCT.md não diz em que plano a conta
 * de teste está — este valor existe para a tela poder mostrar a regra do
 * limite. Trocar de plano aqui troca o comportamento da tela.
 */
export const CURRENT_PLAN = 'Essencial';

export const PROPERTIES: Property[] = [
  {
    id: 'p1',
    nickname: 'Casa do CIC',
    type: 'casa',
    cep: '81800-000',
    street: 'Rua das Palmeiras',
    number: '120',
    district: 'CIC',
    city: 'Curitiba',
    owners: [{ name: 'Iara Alves', pct: 100 }],
  },
  {
    id: 'p2',
    nickname: 'Casa Água Verde',
    type: 'casa',
    cep: '80600-000',
    street: 'Rua Bolívia',
    number: '45',
    district: 'Água Verde',
    city: 'Curitiba',
    owners: [{ name: 'Iara Alves', pct: 100 }],
  },
  {
    id: 'p3',
    nickname: 'Kitnet',
    type: 'kitnet',
    cep: '80730-000',
    street: 'Rua Pará',
    number: '300',
    district: 'Bigorrilho',
    city: 'Curitiba',
    // Dois titulares de propósito: é o caso que a R2 descreve ("meu e do
    // meu marido"), e o que prova a regra da soma dar 100%.
    owners: [
      { name: 'Iara Alves', pct: 60 },
      { name: 'Rodrigo Alves', pct: 40 },
    ],
  },
  {
    id: 'p4',
    nickname: 'Ed. Comercial Centro',
    type: 'comércio',
    cep: '80010-000',
    street: 'Rua XV de Novembro',
    number: '1000',
    district: 'Centro',
    city: 'Curitiba',
    owners: [{ name: 'Iara Alves', pct: 100 }],
  },
];

export const UNITS: Unit[] = [
  { id: 'u1', propertyId: 'p1', name: 'Casa do CIC', status: 'alugada', tenant: 'Maria Silva' },
  { id: 'u2', propertyId: 'p2', name: 'Casa Água Verde', status: 'alugada', tenant: 'Pedro Santos' },
  { id: 'u3', propertyId: 'p3', name: 'Kitnet', status: 'alugada', tenant: 'João Oliveira' },
  { id: 'u4', propertyId: 'p4', name: 'Loja Centro', status: 'vaga' },
  { id: 'u5', propertyId: 'p4', name: 'Sala 2', status: 'alugada', tenant: 'Clínica Vida Ltda' },
];

/* ------------------------------------------------------------------ */
/* Derivados                                                           */
/* ------------------------------------------------------------------ */

/** Encontra o imóvel de uma unidade. */
export function owner(propertyId: string, properties: Property[] = PROPERTIES): Property | undefined {
  return properties.find((p) => p.id === propertyId);
}

/** Unidades de um imóvel. */
export const unitsOf = (units: Unit[], propertyId: string): Unit[] =>
  units.filter((u) => u.propertyId === propertyId);

/**
 * Nome da unidade como a pessoa lê. Imóvel de uma unidade só: a unidade
 * mostra o apelido do imóvel, porque a R2 diz que o usuário não vê
 * diferença entre os dois. Imóvel com várias: "Imóvel · Unidade".
 */
export function unitLabel(u: Unit, properties: Property[], units: Unit[]): string {
  const p = owner(u.propertyId, properties);
  if (!p) return u.name;
  return unitsOf(units, p.id).length <= 1 ? p.nickname : `${p.nickname} · ${u.name}`;
}

/** Endereço em uma linha. */
export const addressOf = (p: Property): string =>
  `${p.street}, ${p.number} · ${p.district} · ${p.city}`;

/** Titulares em uma linha, com a fatia de cada um. */
export const ownersLabel = (p: Property): string =>
  p.owners.length === 1
    ? `${p.owners[0].name} (100%)`
    : p.owners.map((o) => `${o.name} (${o.pct}%)`).join(' · ');

/** Um único titular com 100% — o padrão que a R2 manda. */
export const singleOwner = (name: string): Owner[] => [{ name, pct: 100 }];

/** Soma dos percentuais dos titulares. */
export const ownersSum = (owners: Owner[]): number => owners.reduce((sum, o) => sum + o.pct, 0);

/**
 * Regra do limite do plano (R2): ao criar a unidade N+1 acima do limite,
 * aparece a tela "Seu plano permite N unidades", com o plano que resolve
 * e o botão para trocar.
 *
 * `null` quando ainda cabe.
 */
export function limitBlock(
  unitCount: number,
  plan: string = CURRENT_PLAN,
): { allowed: number; next: string } | null {
  const limit = PLAN_UNIT_LIMIT[plan];
  if (limit === undefined || limit === null) return null;
  if (unitCount < limit) return null;
  const next = Object.keys(PLAN_UNIT_LIMIT).find((p) => {
    const l = PLAN_UNIT_LIMIT[p];
    return l !== null && l > limit;
  });
  return { allowed: limit, next: next ?? plan };
}
