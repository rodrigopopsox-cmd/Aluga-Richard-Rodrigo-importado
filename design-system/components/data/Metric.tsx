import type { CSSProperties, ReactNode } from 'react';
import styles from './Metric.module.css';

export interface MetricProps {
  /** Big number — rendered Light 300, tight tracking */
  value: ReactNode;
  /** Small baseline-aligned qualifier: "Ocupação", "Bom", "este mês" */
  label?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Dim the decimal part ("23680.00") */
  decimals?: boolean;
  inverse?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Large light-weight number with a small baseline label — the core KPI typography. Numbers lead. */
export function Metric({ value, label, size = 'lg', decimals, inverse, className, style }: MetricProps) {
  const str = String(value);
  const i = decimals ? str.lastIndexOf('.') : -1;
  return (
    <div className={[styles.metric, styles[size], inverse && styles.inverse, className].filter(Boolean).join(' ')} style={style}>
      <span className={styles.value}>
        {i > -1 ? (
          <>
            {str.slice(0, i)}
            <span className={styles.decimals}>{str.slice(i)}</span>
          </>
        ) : (
          value
        )}
      </span>
      {label != null && <span className={styles.label}>{label}</span>}
    </div>
  );
}
