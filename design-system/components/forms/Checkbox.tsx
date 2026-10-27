'use client';

import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../core/Icon';
import styles from './Toggle.module.css';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  name?: string;
  className?: string;
  style?: CSSProperties;
}

/** Square-ish (6px) checkbox; fills brand orange when checked. */
export function Checkbox({ checked, onChange, label, disabled, name, className, style }: CheckboxProps) {
  return (
    <label className={[styles.root, disabled && styles.disabled, className].filter(Boolean).join(' ')} style={style}>
      <input
        type="checkbox"
        className={styles.native}
        name={name}
        checked={!!checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className={styles.box}>{checked && <Icon name="check" size={14} strokeWidth={2.25} />}</span>
      {label}
    </label>
  );
}
