'use client';

import type { CSSProperties } from 'react';
import { Icon } from '../core/Icon';
import type { IconName } from '../core/icons';
import styles from './NavPills.module.css';

export interface NavItem {
  id: string;
  label: string;
  icon?: IconName;
}

export interface NavPillsProps {
  items: NavItem[];
  value: string;
  onChange?: (id: string) => void;
  /** Mobile bottom-bar mode: inactive items icon-only gray circles, active expands with label */
  compact?: boolean;
  /** Floating white bar (with shadow) instead of gray track */
  bar?: boolean;
  /** Accessible name for the navigation */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

/** Primary pill navigation: gray track, active item solid orange. Desktop: labeled pills; mobile: `compact bar`. */
export function NavPills({ items = [], value, onChange, compact, bar, label, className, style }: NavPillsProps) {
  const cls = [styles.nav, compact && styles.compact, bar && styles.bar, className].filter(Boolean).join(' ');
  return (
    <div role="tablist" aria-label={label} className={cls} style={style}>
      {items.map((it) => {
        const on = it.id === value;
        return (
          <button
            key={it.id}
            type="button"
            role="tab"
            aria-selected={on}
            aria-label={it.label}
            className={styles.item}
            onClick={() => onChange?.(it.id)}
          >
            {it.icon && <Icon name={it.icon} size={compact ? 22 : 18} />}
            {(!compact || on) && <span>{it.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
