'use client';

import { useEffect, useEffectEvent, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { IconButton } from '../core/IconButton';
import styles from './Dialog.module.css';

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  /** Two-tone title, ink line */
  title: ReactNode;
  /** Muted second line */
  subtitle?: ReactNode;
  children?: ReactNode;
  /** Right-aligned action buttons */
  footer?: ReactNode;
  /** Max width px. Default 480 */
  width?: number;
}

/** Centered 36px-radius modal over a blurred ink scrim; Esc / scrim click closes. Focus moves in and is restored on close. */
export function Dialog({ open, onClose, title, subtitle, children, footer, width = 480 }: DialogProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  // Reads the latest onClose without re-running the effect (inline arrow props would otherwise steal focus each render).
  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose?.();
  });

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  // Scrim click is a pointer shortcut; keyboard users close with Esc (window listener above).
  return createPortal(
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={styles.scrim} onClick={onClose}>
      {/* stopPropagation keeps clicks inside the panel from reaching the scrim */}
      {/* oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={styles.panel}
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.head}>
          <div id={titleId} className={styles.title}>
            <div className={styles.titleMain}>{title}</div>
            {subtitle && <div className={styles.titleSub}>{subtitle}</div>}
          </div>
          <IconButton icon="x" label="Fechar" size={36} onClick={onClose} />
        </div>
        {children}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
