/**
 * Dados de demonstração da tela de Inquilinos.
 *
 * Modelo `tenants` da spec (seção 6). A R2 manda: nome, CPF/CNPJ validado,
 * WhatsApp **obrigatório** e e-mail opcional.
 *
 * Nomes e documentos inventados — não são dados reais. Os CPFs são sequências
 * inválidas de propósito: a validação de dígito verificador é regra de
 * formulário e não está implementada aqui.
 */

export interface Tenant {
  id: string;
  name: string;
  /** CPF (11 dígitos) ou CNPJ (14). */
  taxId: string;
  kind: 'pf' | 'pj';
  /** Obrigatório — é por onde sai o lembrete. */
  whatsapp: string;
  email?: string;
  /** Unidades que este inquilino ocupa. */
  units: string[];
}

export const TENANTS: Tenant[] = [
  {
    id: 't1',
    name: 'Maria Silva',
    taxId: '123.456.789-00',
    kind: 'pf',
    whatsapp: '(41) 99999-0001',
    email: 'maria@exemplo.com',
    units: ['Casa do CIC'],
  },
  {
    id: 't2',
    name: 'Pedro Santos',
    taxId: '987.654.321-00',
    kind: 'pf',
    whatsapp: '(41) 99999-0002',
    units: ['Casa Água Verde'],
  },
  {
    id: 't3',
    name: 'João Oliveira',
    taxId: '111.222.333-44',
    kind: 'pf',
    whatsapp: '(41) 99999-0003',
    units: ['Kitnet'],
  },
  {
    id: 't4',
    name: 'Clínica Vida Ltda',
    taxId: '12.345.678/0001-90',
    kind: 'pj',
    whatsapp: '(41) 99999-0004',
    email: 'financeiro@clinicavida.exemplo.com',
    units: ['Sala 2'],
  },
];

/** Documento válido = 11 dígitos (CPF) ou 14 (CNPJ), já limpo. */
export function taxIdDigits(taxId: string): string {
  return taxId.replace(/\D/g, '');
}

export const isTaxIdComplete = (taxId: string): boolean => {
  const n = taxIdDigits(taxId).length;
  return n === 11 || n === 14;
};

/** Rótulo em palavras — PJ ou PF, como a R2 manda. */
export const kindLabel = (kind: Tenant['kind']): string => (kind === 'pj' ? 'Pessoa jurídica' : 'Pessoa física');
