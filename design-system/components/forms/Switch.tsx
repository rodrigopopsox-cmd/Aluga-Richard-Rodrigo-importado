'use client';

import type { CSSProperties, ReactNode } from 'react';
import styles from './Toggle.module.css';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  name?: string;
  className?: string;
  style?: CSSProperties;
}

/** On/off toggle for settings; orange track when on. */
export function Switch({ checked, onChange, label, disabled, name, className, style }: SwitchProps) {
  return (
    <label className={[styles.root, disabled && styles.disabled, className].filter(Boolean).join(' ')} style={style}>
      <input
        type="checkbox"
        role="switch"
        aria-checked={!!checked}
        className={styles.native}
        name={name}
        checked={!!checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className={styles.track}>
        <span className={styles.knob} />
      </span>
      {label}
    </label>
  );
}
