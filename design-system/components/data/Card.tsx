'use client';

import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  /** default = white; dark = ink (e.g. "Próximo vencimento"); sunken = off-white inset; brand = orange */
  tone?: 'default' | 'dark' | 'sunken' | 'brand';
  /** Inner padding — prefer a spacing token, e.g. "var(--space-5-5)". Default var(--card-padding) = 20px */
  padding?: number | string;
  /** Corner radius. Default var(--radius-card) = 26px */
  radius?: number | string;
  /** 1px inner hairline (default cards only). Default true */
  bordered?: boolean;
  /** Orange outline — e.g. the active filter card */
  selected?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** White rounded surface with hairline edge — the base of every dashboard widget. Never a colored left-border accent. */
export function Card({
  tone = 'default',
  padding = 'var(--card-padding)',
  radius = 'var(--radius-card)',
  bordered = true,
  selected,
  onClick,
  children,
  className,
  style,
}: CardProps) {
  const cls = [
    styles.card,
    styles[tone],
    bordered && tone === 'default' && styles.bordered,
    onClick && styles.interactive,
    selected && styles.selected,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const onKeyDown = onClick
    ? (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }
    : undefined;
  return (
    // role/tabIndex/onKeyDown are added together with onClick (static analysis can't see the conditional role).
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cls}
      style={{ padding, borderRadius: radius, ...style }}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-pressed={onClick && selected !== undefined ? selected : undefined}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  /** First line, ink — e.g. "Visitantes por" */
  title: ReactNode;
  /** Second line, muted gray — e.g. "Origem" */
  subtitle?: ReactNode;
  /** Right-side slot (IconButton, SegmentedControl, Chip) */
  action?: ReactNode;
  /** Use on dark/brand cards */
  inverse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
}

/** The signature two-line card title: ink line + muted line ("Total de / Unidades"). */
export function CardHeader({ title, subtitle, action, inverse, size = 'md', className, style }: CardHeaderProps) {
  const sizeCls = size === 'lg' ? styles.titleLg : size === 'sm' ? styles.titleSm : styles.titleMd;
  return (
    <div className={[styles.header, inverse && styles.inverse, className].filter(Boolean).join(' ')} style={style}>
      <div className={`${styles.titles} ${sizeCls}`}>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
