import type { CSSProperties } from 'react';
import styles from './Wordmark.module.css';

export interface WordmarkProps {
  /** dot = "ALUGA." with orange period (display); spaced = letter-spaced "A L U G A" (app header) */
  variant?: 'dot' | 'spaced';
  /** Font size in px */
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Typographic brand name. No logo mark exists yet — do not draw one; use this wherever a logo would go. */
export function Wordmark({ variant = 'dot', size = 24, color = 'var(--text-strong)', className, style }: WordmarkProps) {
  const cls = [styles.wordmark, variant === 'spaced' ? styles.spaced : styles.dotVariant, className].filter(Boolean).join(' ');
  return (
    <span className={cls} style={{ fontSize: size, color, ...style }}>
      ALUGA{variant === 'dot' && <span className={styles.period}>.</span>}
    </span>
  );
}
