import type { CSSProperties } from 'react';
import { icons, type IconName } from './icons';
import styles from './Icon.module.css';

export interface IconProps {
  /** Icon name in kebab-case, e.g. "layout-grid", "bell", "maximize-2" (see icons.ts) */
  name: IconName;
  /** Pixel size. Default 20 */
  size?: number;
  /** Stroke width. Brand default 1.5 (thin, airy line icons) */
  strokeWidth?: number;
  color?: string;
  /** Continuous rotation (loading spinners) */
  spin?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Thin-stroke line icon (Lucide, 1.5px) — use for every glyph in nav, buttons, cards; never emoji. */
export function Icon({ name, size = 20, strokeWidth = 1.5, color = 'currentColor', spin, className, style }: IconProps) {
  const Svg = icons[name];
  return (
    <span
      aria-hidden="true"
      className={[styles.icon, spin && styles.spin, className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...style }}
    >
      <Svg size={size} strokeWidth={strokeWidth} color={color} />
    </span>
  );
}
