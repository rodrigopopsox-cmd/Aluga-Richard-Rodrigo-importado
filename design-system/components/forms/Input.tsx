'use client';

import { useId, type ChangeEvent, type CSSProperties, type HTMLAttributes } from 'react';
import { Icon } from '../core/Icon';
import type { IconName } from '../core/icons';
import field from './Field.module.css';
import styles from './Input.module.css';

export interface InputProps {
  label?: string;
  /** Leading icon, e.g. "search" */
  icon?: IconName;
  /** Trailing keyboard hint, e.g. "⌘+K" */
  shortcut?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  /** soft = gray fill (default, search bar); white = white with hairline (forms on gray) */
  variant?: 'soft' | 'white';
  /** Error message — also switches the field to the error state */
  error?: string;
  hint?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  required?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Pill text field — search bar in the top bar and form fields in dialogs. */
export function Input({
  label,
  icon,
  shortcut,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = 'text',
  variant = 'soft',
  error,
  hint,
  disabled,
  name,
  id,
  autoComplete,
  inputMode,
  required,
  className,
  style,
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const msgId = `${inputId}-msg`;
  const message = error || hint;
  const controlCls = [
    styles.control,
    variant === 'white' && styles.white,
    error && styles.invalid,
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <label className={[field.field, className].filter(Boolean).join(' ')} style={style} htmlFor={inputId}>
      {label && <span className={field.label}>{label}</span>}
      <span className={controlCls}>
        {icon && <Icon name={icon} size={18} color="var(--text-secondary)" />}
        <input
          id={inputId}
          className={styles.input}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? msgId : undefined}
          onChange={(e) => onChange?.(e.target.value, e)}
        />
        {shortcut && <span className={styles.kbd}>{shortcut}</span>}
      </span>
      {message && (
        <span id={msgId} className={[field.hint, error && field.error].filter(Boolean).join(' ')}>
          {message}
        </span>
      )}
    </label>
  );
}
