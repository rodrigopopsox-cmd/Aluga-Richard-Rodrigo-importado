'use client';

import type { CSSProperties, ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import styles from './Chip.module.css';

export interface ChipProps {
  /** Leading icon, e.g. "lightbulb" for "Saiba mais" */
  icon?: IconName;
  /** light = gray; glass = frosted white over photos; dark = over photos/dark; outline */
  variant?: 'light' | 'glass' | 'dark' | 'outline';
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Tiny secondary pill link inside cards — "Saiba mais", "Ver unidades", "Vista 3D". */
export function Chip({ icon, variant = 'light', onClick, children, className, style }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[styles.chip, styles[variant], className].filter(Boolean).join(' ')}
      style={style}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
    </button>
  );
}
