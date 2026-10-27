import type { CSSProperties } from 'react';
import { AvatarGroup } from '../core/Avatar';
import styles from './ProgressPill.module.css';

export interface ProgressPillProps {
  /** Task name shown inside the fill */
  label: string;
  /** 0–100 */
  value: number;
  /** dark = done/in-progress; brand = urgent; light = queued */
  tone?: 'dark' | 'brand' | 'light';
  /** Assignees (AvatarGroup) shown after the bar */
  people?: Array<{ name?: string; src?: string }>;
  /** Bar height in px. Default 34 */
  height?: number;
  className?: string;
  style?: CSSProperties;
}

/** Rounded progress bar with the task label inside the fill — maintenance activity rows. */
export function ProgressPill({ label, value = 0, tone = 'dark', people, height = 34, className, style }: ProgressPillProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={[styles.row, className].filter(Boolean).join(' ')} style={style}>
      <div
        className={styles.track}
        style={{ height }}
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={`${styles.fill} ${styles[tone]}`} style={{ width: `${pct}%` }}>
          <span className={styles.label}>{label}</span>
          <span className={styles.pct}>{pct}%</span>
        </div>
      </div>
      {people && (
        <div className={styles.people}>
          <AvatarGroup people={people} size={26} />
        </div>
      )}
    </div>
  );
}
