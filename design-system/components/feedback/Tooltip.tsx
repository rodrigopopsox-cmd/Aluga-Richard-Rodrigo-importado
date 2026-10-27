'use client';

import { useId, useState, type ReactNode } from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  content: ReactNode;
  placement?: 'top' | 'bottom';
  /** Force visible (showcase / docs). Normally driven by hover & focus. */
  open?: boolean;
  children: ReactNode;
}

/** Dark ink pill tooltip on hover/focus — same shape as chart value pills. */
export function Tooltip({ content, placement = 'top', open, children }: TooltipProps) {
  const [on, setOn] = useState(false);
  const id = useId();
  const visible = open ?? on;
  return (
    <span
      className={styles.anchor}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      aria-describedby={visible ? id : undefined}
    >
      {children}
      <span id={id} role="tooltip" className={[styles.tip, styles[placement], visible && styles.visible].filter(Boolean).join(' ')}>
        {content}
      </span>
    </span>
  );
}
