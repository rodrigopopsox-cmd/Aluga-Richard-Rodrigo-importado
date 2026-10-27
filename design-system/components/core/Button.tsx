'use client';

import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'dark' | 'secondary' | 'outline' | 'ghost';

export interface ButtonProps {
  /** primary = brand orange; dark = ink pill (e.g. "+ Adicionar tarefa"); secondary = soft gray; outline; ghost */
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon */
  icon?: IconName;
  /** Trailing icon */
  iconRight?: IconName;
  fullWidth?: boolean;
  disabled?: boolean;
  /** Shows a spinner, sets aria-busy and blocks clicks. */
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Pill-shaped action button. Orange primary for the one main action per view;
 * dark pill for in-card actions. Press = scale(.97).
 */
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth,
  disabled,
  loading,
  type = 'button',
  onClick,
  children,
  className,
  style,
}: ButtonProps) {
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 18;
  const cls = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.block,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
      className={cls}
      style={style}
    >
      {loading ? <Icon name="loader-circle" size={iconSize} spin /> : icon && <Icon name={icon} size={iconSize} />}
      {children}
      {iconRight && !loading && <Icon name={iconRight} size={iconSize} />}
    </button>
  );
}
