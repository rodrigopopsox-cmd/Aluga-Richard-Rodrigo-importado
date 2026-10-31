import type { CSSProperties } from 'react';
import styles from './Wordmark.module.css';

export interface WordmarkProps {
  /** dot = "ALUGA." with orange period (display); spaced = letter-spaced "A L U G A" (app header) */
  variant?: 'dot' | 'spaced';
  /** Font size in px */
  size?: number;
  color?: string;
  /**
   * Segundo termo da marca. Presente, renderiza "Aluga Vibe" em vez de "Aluga".
   * Omitido, o wordmark fica exatamente como era — nenhum uso existente muda.
   */
  secondWord?: string;
  /**
   * Caixa da primeira palavra. `upper` (padrão) é "ALUGA", como sempre foi;
   * `title` é "Aluga". Só mexe onde é passada.
   */
  firstCase?: 'upper' | 'title';
  className?: string;
  style?: CSSProperties;
}

/** Typographic brand name. No logo mark exists yet — do not draw one; use this wherever a logo would go. */
export function Wordmark({ variant = 'dot', size = 24, color = 'var(--text-strong)', secondWord, firstCase = 'upper', className, style }: WordmarkProps) {
  const cls = [styles.wordmark, variant === 'spaced' ? styles.spaced : styles.dotVariant, className].filter(Boolean).join(' ');
  return (
    <span className={cls} style={{ fontSize: size, color, ...style }}>
      {firstCase === 'title' ? 'Aluga' : 'ALUGA'}
      {secondWord ? <> <span className={styles.second}>{secondWord}</span></> : null}
      {variant === 'dot' && <span className={styles.period}>.</span>}
    </span>
  );
}
