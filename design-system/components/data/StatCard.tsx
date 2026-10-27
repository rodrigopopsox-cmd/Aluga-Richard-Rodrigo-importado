'use client';

import type { CSSProperties, ReactNode } from 'react';
import { Card, CardHeader } from './Card';
import { Metric } from './Metric';
import styles from './StatCard.module.css';

export interface StatCardProps {
  title: ReactNode;
  subtitle?: ReactNode;
  value: ReactNode;
  /** Small label after the value */
  unit?: ReactNode;
  /** Green delta, e.g. "+12" */
  delta?: ReactNode;
  /** Caption under delta, e.g. "esta semana" */
  deltaLabel?: ReactNode;
  /** Photo URL shown on the right ~46% */
  image?: string;
  /** Bottom-right slot, typically a glass Chip */
  action?: ReactNode;
  /** Decorative row of × marks under the metric. Default true */
  dots?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

const MARKS = Array.from({ length: 15 }, () => '×');

/** KPI tile: two-tone title, light metric, optional photo bleeding off the right edge. */
export function StatCard({ title, subtitle, value, unit, delta, deltaLabel, image, action, dots = true, onClick, className, style }: StatCardProps) {
  const narrow = image ? styles.withImage : undefined;
  return (
    <Card onClick={onClick} padding="var(--space-5-5)" className={[styles.stat, className].filter(Boolean).join(' ')} style={style}>
      {image && (
        <div className={styles.photo}>
          {/* Decorative architecture photo; the title carries the meaning. */}
          <img src={image} alt="" />
        </div>
      )}
      <div className={[styles.head, narrow].filter(Boolean).join(' ')}>
        <CardHeader title={title} subtitle={subtitle} size="sm" />
      </div>
      <div className={styles.body}>
        <div className={styles.valueRow}>
          <Metric value={value} label={unit} size="md" />
          {delta && (
            <span className={styles.delta}>
              <span className={styles.deltaValue}>{delta}</span>
              {deltaLabel}
            </span>
          )}
        </div>
        {dots && (
          <div aria-hidden="true" className={[styles.dots, narrow].filter(Boolean).join(' ')}>
            {MARKS.map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        )}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </Card>
  );
}
