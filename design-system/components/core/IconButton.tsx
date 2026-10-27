'use client';

import type { CSSProperties, MouseEvent } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import styles from './IconButton.module.css';

export interface IconButtonProps {
  icon: IconName;
  /** Accessible label (also used as title tooltip) */
  label: string;
  /**
   * soft = gray circle (header actions); dark = ink circle (card expand ↗); brand; white; ghost;
   * inverse = translucent circle for use on dark/brand cards.
   */
  variant?: 'soft' | 'dark' | 'brand' | 'white' | 'ghost' | 'inverse';
  /** Diameter in px. Default 40 */
  size?: number;
  /** Show orange unread dot */
  dot?: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
}

/** Circular icon-only button — header actions (chat, bell), card expand, rail items. */
export function IconButton({ icon, label, variant = 'soft', size = 40, dot, disabled, onClick, className, style }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={[styles.iconButton, styles[variant], className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...style }}
    >
      <Icon name={icon} size={Math.round(size * 0.45)} />
      {dot && <span className={styles.dot} />}
    </button>
  );
}
