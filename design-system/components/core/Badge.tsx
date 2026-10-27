import type { CSSProperties, ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeTone = 'brand' | 'soft' | 'neutral' | 'dark' | 'success' | 'danger' | 'warning';

export interface BadgeProps {
  /** brand = solid orange label (e.g. "Problema 01"); soft = orange tint; neutral; dark; success; danger; warning */
  tone?: BadgeTone;
  size?: 'sm' | 'md';
  /** Leading status dot */
  dot?: boolean;
  /** Render as red notification counter instead (e.g. app-icon badge "2") */
  count?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Small status label with softly-rounded (not pill) corners; or a red count bubble. */
export function Badge({ tone = 'neutral', size = 'md', dot, count, children, className, style }: BadgeProps) {
  if (count != null) {
    return (
      <span className={[styles.count, className].filter(Boolean).join(' ')} style={style}>
        {count}
      </span>
    );
  }
  return (
    <span className={[styles.badge, styles[size], styles[tone], className].filter(Boolean).join(' ')} style={style}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
