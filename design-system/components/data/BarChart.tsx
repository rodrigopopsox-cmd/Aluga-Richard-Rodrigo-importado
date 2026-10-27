import type { CSSProperties, ReactNode } from 'react';
import styles from './BarChart.module.css';

export interface BarDatum {
  label: string;
  value: number;
  /** CSS color, ideally a token: 'var(--viz-blue)'. Default var(--brand) */
  color?: string;
}

export interface BarChartProps {
  data: BarDatum[];
  /** px height of the plot. Default 120 */
  height?: number;
  /** px gap between bars. Default 8 */
  gap?: number;
  /** White diagonal hatch over the fill (brand signature). Default true */
  hatched?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Hatched rounded bars — "Visitantes por origem" style breakdowns. Pair with <Legend>. */
export function BarChart({ data = [], height = 120, gap = 8, hatched = true, className, style }: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className={[styles.bars, className].filter(Boolean).join(' ')} style={{ gap, height, ...style }}>
      {data.map((d, i) => {
        const fill = d.color ?? 'var(--brand)';
        return (
          <div
            key={i}
            title={`${d.label}: ${d.value}`}
            className={styles.bar}
            style={{
              height: `${Math.max(8, (d.value / max) * 100)}%`,
              background: hatched ? `var(--hatch), ${fill}` : fill,
            }}
          />
        );
      })}
    </div>
  );
}

export interface LegendItem {
  label: string;
  color: string;
  value?: ReactNode;
  /** Short line swatch instead of a dot (line-chart series) */
  line?: boolean;
}

export interface LegendProps {
  items: LegendItem[];
  direction?: 'row' | 'column';
  className?: string;
  style?: CSSProperties;
}

/** Dot (or line) legend for charts. */
export function Legend({ items = [], direction = 'column', className, style }: LegendProps) {
  return (
    <div className={[styles.legend, styles[direction], className].filter(Boolean).join(' ')} style={style}>
      {items.map((it, i) => (
        <div key={i} className={styles.item}>
          <span className={[styles.swatch, it.line && styles.swatchLine].filter(Boolean).join(' ')} style={{ background: it.color }} />
          <span className={styles.itemLabel}>{it.label}</span>
          {it.value != null && <span className={styles.itemValue}>{it.value}</span>}
        </div>
      ))}
    </div>
  );
}
