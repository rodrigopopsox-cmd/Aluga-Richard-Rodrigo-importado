'use client';

import { useId, type CSSProperties } from 'react';
import { Icon } from '../core/Icon';
import field from './Field.module.css';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  options: Array<string | SelectOption>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** sm = compact white filter pill ("Todos os imóveis ↓"); md = form field */
  size?: 'sm' | 'md';
  /** Error message — also switches the field to the error state */
  error?: string;
  hint?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

/** Native select styled as a pill — compact filter in card headers or full form field. */
export function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  size = 'md',
  error,
  hint,
  disabled,
  name,
  id,
  className,
  style,
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const msgId = `${selectId}-msg`;
  const message = error || hint;
  const sm = size === 'sm';
  return (
    <label className={[field.field, className].filter(Boolean).join(' ')} style={style} htmlFor={selectId}>
      {label && <span className={field.label}>{label}</span>}
      <span className={styles.wrap}>
        <select
          id={selectId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? msgId : undefined}
          onChange={(e) => onChange?.(e.target.value)}
          className={[styles.select, styles[size], error && styles.invalid].filter(Boolean).join(' ')}
        >
          {options.map((o) => {
            const v = typeof o === 'string' ? o : o.value;
            const l = typeof o === 'string' ? o : o.label;
            return (
              <option key={v} value={v}>
                {l}
              </option>
            );
          })}
        </select>
        <Icon name="chevron-down" size={sm ? 14 : 16} className={`${styles.chevron} ${sm ? styles.chevronSm : styles.chevronMd}`} />
      </span>
      {message && (
        <span id={msgId} className={[field.hint, error && field.error].filter(Boolean).join(' ')}>
          {message}
        </span>
      )}
    </label>
  );
}
