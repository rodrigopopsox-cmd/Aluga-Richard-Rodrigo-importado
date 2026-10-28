import type { CSSProperties } from 'react';
import { Button } from '../core/Button';
import { Icon } from '../core/Icon';
import styles from './StepChecklist.module.css';

export interface Step {
  id: string;
  /** Short imperative label — e.g. "Cadastrar o primeiro imóvel" */
  title: string;
  /** One line explaining what this step is for. Read on a phone. */
  description?: string;
  done?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export interface StepChecklistProps {
  steps: Step[];
  /** Heading above the counter — e.g. "Primeiros passos" */
  title?: string;
  /** Small line under the heading */
  subtitle?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Numbered progress checklist — the onboarding pattern.
 *
 * Each step is a row: marker (number when pending, check when done), title, optional
 * description and an optional action. The counter and the bar are derived from `steps`,
 * so a step marked `done` updates both without extra bookkeeping.
 */
export function StepChecklist({ steps, title, subtitle, className, style }: StepChecklistProps) {
  const done = steps.filter((s) => s.done).length;
  const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;

  return (
    <section className={[styles.wrap, className].filter(Boolean).join(' ')} style={style}>
      {(title || subtitle) && (
        <header className={styles.head}>
          <div>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <p className={styles.counter} aria-live="polite">
            {done} de {steps.length}
          </p>
        </header>
      )}

      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={title ? `Progresso: ${title}` : 'Progresso'}
      >
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>

      <ol className={styles.list}>
        {steps.map((step, i) => (
          <li key={step.id} className={styles.step} data-done={step.done || undefined}>
            <span className={styles.marker} aria-hidden="true">
              {step.done ? <Icon name="circle-check" size={20} /> : i + 1}
            </span>
            <div className={styles.body}>
              <p className={styles.stepTitle}>{step.title}</p>
              {step.description && <p className={styles.stepDesc}>{step.description}</p>}
            </div>
            {step.actionLabel && (
              <Button
                size="sm"
                variant={step.done ? 'secondary' : 'primary'}
                onClick={step.onAction}
                className={styles.action}
              >
                {step.actionLabel}
              </Button>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
