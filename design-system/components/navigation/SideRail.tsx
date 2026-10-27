'use client';

import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../core/Icon';
import type { IconName } from '../core/icons';
import styles from './SideRail.module.css';

export interface RailItem {
  id: string;
  label: string;
  icon: IconName;
}

export interface SideRailProps {
  items: RailItem[];
  value?: string;
  onChange?: (id: string) => void;
  /** Bottom-pinned slot (help/logout IconButtons) */
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Vertical stack of circular icon buttons on the desktop left edge; active = orange. Hover/focus shows a dark label. */
export function SideRail({ items = [], value, onChange, footer, className, style }: SideRailProps) {
  return (
    <nav aria-label="Módulos" className={[styles.rail, className].filter(Boolean).join(' ')} style={style}>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          aria-label={it.label}
          aria-current={it.id === value ? 'page' : undefined}
          className={styles.btn}
          onClick={() => onChange?.(it.id)}
        >
          <Icon name={it.icon} size={20} />
          <span className={styles.tip} aria-hidden="true">
            {it.label}
          </span>
        </button>
      ))}
      {footer && <div className={styles.footer}>{footer}</div>}
    </nav>
  );
}
