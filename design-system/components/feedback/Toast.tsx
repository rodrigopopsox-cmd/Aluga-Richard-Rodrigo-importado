'use client';

import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../core/Icon';
import type { IconName } from '../core/icons';
import styles from './Toast.module.css';

export type ToastTone = 'success' | 'danger' | 'info' | 'neutral';

export interface ToastProps {
  tone?: ToastTone;
  title: ReactNode;
  message?: ReactNode;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

const ICON: Record<ToastTone, IconName> = {
  success: 'circle-check',
  danger: 'circle-alert',
  info: 'bell',
  neutral: 'info',
};

/** White floating notice with a solid colored circle icon. Stack bottom-right (desktop) / top (mobile). */
export function Toast({ tone = 'success', title, message, onClose, className, style }: ToastProps) {
  return (
    <div role="status" className={[styles.toast, className].filter(Boolean).join(' ')} style={style}>
      <span className={`${styles.icon} ${styles[tone]}`}>
        <Icon name={ICON[tone]} size={16} />
      </span>
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        {message && <div className={styles.message}>{message}</div>}
      </div>
      {onClose && (
        <button type="button" aria-label="Fechar" onClick={onClose} className={styles.close}>
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
