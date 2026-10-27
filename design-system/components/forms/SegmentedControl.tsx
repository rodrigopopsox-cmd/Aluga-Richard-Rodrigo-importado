'use client';

import type { CSSProperties } from 'react';
import styles from './SegmentedControl.module.css';

export interface SegmentedControlProps {
  /** e.g. ['Dia','Semana','Mês'] */
  options: Array<string | { value: string; label: string }>;
  value: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
  /** Accessible name for the group */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

/** Gray pill track with a white active segment — time-range switches on charts (Dia / Semana / Mês). */
export function SegmentedControl({ options = [], value, onChange, size = 'md', label, className, style }: SegmentedControlProps) {
  return (
    <div role="tablist" aria-label={label} className={[styles.track, className].filter(Boolean).join(' ')} style={style}>
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value;
        const l = typeof o === 'string' ? o : o.label;
        const on = v === value;
        return (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={on}
            className={`${styles.segment} ${styles[size]}`}
            onClick={() => onChange?.(v)}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
