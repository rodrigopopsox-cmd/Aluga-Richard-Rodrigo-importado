'use client';

import { useMemo } from 'react';
import { Input, type InputProps } from './Input';

/**
 * Máscaras de documento e contato. Cada uma sabe quantos dígitos aceita e
 * onde entram os separadores.
 */
const MASKS = {
  cpf: { digits: 11, format: (d: string) => d.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, a, b, c, e) => [a, b, c].join('.') + (e ? `-${e}` : '')) },
  cnpj: { digits: 14, format: (d: string) => d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, (_, a, b, c, e, f) => [a, b, c].join('.') + `/${e}` + (f ? `-${f}` : '')) },
  phone: { digits: 11, format: (d: string) => d.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, a, b, c) => (a ? `(${a})` : '') + (b ? ` ${b}` : '') + (c ? `-${c}` : '')) },
  cep: { digits: 8, format: (d: string) => d.replace(/(\d{5})(\d{0,3})/, (_, a, b) => a + (b ? `-${b}` : '')) },
} as const;

export type MaskKind = keyof typeof MASKS;

export interface MaskedInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  /** Qual máscara aplicar. */
  mask: MaskKind;
  value?: string;
  /** Recebe o valor formatado (com pontuação) e o valor limpo (só dígitos). */
  onChange?: (formatted: string, raw: string) => void;
}

/** Só os dígitos, respeitando o tamanho da máscara. */
function toRaw(value: string, max: number): string {
  return value.replace(/\D/g, '').slice(0, max);
}

/**
 * Campo com máscara de documento ou contato.
 *
 * Existe porque CPF, CNPJ, telefone e CEP precisam de formato fixo, e fazer
 * essa máscara dentro de cada tela espalha a mesma lógica em vários lugares.
 * A validação (dígito verificador, DDD válido) NÃO acontece aqui — isso é
 * regra de formulário, não de máscara.
 */
export function MaskedInput({ mask, value = '', onChange, ...rest }: MaskedInputProps) {
  const spec = MASKS[mask];
  const raw = useMemo(() => toRaw(value, spec.digits), [value, spec.digits]);
  const formatted = useMemo(() => (raw ? spec.format(raw) : ''), [raw, spec.format]);

  return (
    <Input
      {...rest}
      value={formatted}
      inputMode="numeric"
      autoComplete="off"
      onChange={(next) => {
        const clean = toRaw(next, spec.digits);
        onChange?.(spec.format(clean), clean);
      }}
    />
  );
}
