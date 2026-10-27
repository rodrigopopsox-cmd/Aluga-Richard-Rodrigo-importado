import type { CSSProperties } from 'react';
import styles from './HeatScale.module.css';

export interface HeatScaleProps {
  /** How many of the 8 peach→red segments are filled (0–8) */
  level?: number;
  /** Caption above, e.g. "Alto interesse" */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

const STEPS = ['--heat-1', '--heat-2', '--heat-3', '--heat-4', '--heat-5', '--heat-6', '--heat-6', '--heat-7'];

/** Row of pill segments shading peach→red — interest / urgency intensity. */
export function HeatScale({ level = 8, label, className, style }: HeatScaleProps) {
  return (
    <div className={[styles.heat, className].filter(Boolean).join(' ')} style={style}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.steps} role="meter" aria-label={label ?? 'Intensidade'} aria-valuenow={level} aria-valuemin={0} aria-valuemax={8}>
        {STEPS.map((token, i) => (
          <span key={i} className={styles.step} style={i < level ? { background: `var(${token})` } : undefined} />
        ))}
      </div>
    </div>
  );
}
