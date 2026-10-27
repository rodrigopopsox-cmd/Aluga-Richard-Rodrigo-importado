'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import styles from './LineChart.module.css';

export interface LineSeries {
  name: string;
  /** CSS color, ideally a token: 'var(--chart-ink)', 'var(--brand)' */
  color: string;
  data: number[];
  /** Soft gradient fill under the line */
  area?: boolean;
}

export interface LineChartProps {
  series: LineSeries[];
  /** Evenly spaced x-axis labels (e.g. ['10 abr','15 abr','20 abr']) */
  labels?: string[];
  height?: number;
  /** Index to highlight by default (dark value pill + dashed drop line). Hover overrides. */
  highlight?: number;
  /** Formats the dark tooltip pill value for series[0] */
  formatValue?: (value: number, index: number) => ReactNode;
  /** Gray hatched rounded columns behind the plot (brand signature). Default true */
  backdrop?: boolean;
  dots?: boolean;
  className?: string;
  style?: CSSProperties;
}

type Pt = [number, number];

function smooth(pts: Pt[]): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const PAD = 20;
const TOP = 44;
const BOTTOM = 16;
const BACKDROP_HEIGHTS = [0.62, 0.48, 0.74, 0.55, 0.7, 0.5, 0.66, 0.58, 0.72, 0.52, 0.64, 0.6];

/** Smooth line chart over hatched gray columns, with dark pill value tooltip — price/visitor trends. */
export function LineChart({
  series = [],
  labels = [],
  height = 200,
  highlight,
  formatValue = (v) => v,
  backdrop = true,
  dots = true,
  className,
  style,
}: LineChartProps) {
  const uid = useId().replace(/:/g, '');
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(600);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth || 600));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = Math.max(...series.map((s) => s.data.length), 2);
  const all = series.flatMap((s) => s.data);
  const mn = Math.min(...all);
  const mx = Math.max(...all);
  const x = (i: number) => PAD + (i * (w - PAD * 2)) / (n - 1);
  const y = (v: number) => TOP + (1 - (v - mn) / (mx - mn || 1)) * (height - TOP - BOTTOM);
  const hi = hover ?? highlight;
  const cols = Math.max(4, Math.round(w / 90));
  const first = series[0];

  return (
    <div
      ref={ref}
      className={[styles.chart, className].filter(Boolean).join(' ')}
      style={style}
      onMouseLeave={() => setHover(null)}
    >
      {/* Hover scrubbing is a pointer enhancement; values stay readable via labels and the highlighted pill. */}
      {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <svg
        width={w}
        height={height}
        className={styles.svg}
        role="img"
        aria-label={series.map((s) => s.name).join(', ')}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const i = Math.round(((e.clientX - r.left - PAD) / (w - PAD * 2)) * (n - 1));
          setHover(Math.max(0, Math.min(n - 1, i)));
        }}
      >
        <defs>
          <pattern id={`hatch-${uid}`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="10" height="10" className={styles.hatchBg} />
            <line x1="0" y1="0" x2="0" y2="10" strokeWidth="2" className={styles.hatchLine} />
          </pattern>
          {series.map((s, k) => (
            <linearGradient key={k} id={`grad-${uid}-${k}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={s.color} stopOpacity=".14" />
              <stop offset="1" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {backdrop &&
          Array.from({ length: cols }).map((_, i) => {
            const cw = w / cols;
            const h = BACKDROP_HEIGHTS[i % BACKDROP_HEIGHTS.length] * (height - BOTTOM);
            return <rect key={i} x={i * cw + 2} y={height - BOTTOM - h} width={cw - 4} height={h} rx="14" fill={`url(#hatch-${uid})`} />;
          })}
        {series.map((s, k) => {
          const pts: Pt[] = s.data.map((v, i) => [x(i), y(v)]);
          const d = smooth(pts);
          return (
            <g key={k}>
              {s.area && (
                <path
                  d={`${d} L${x(s.data.length - 1)},${height - BOTTOM} L${x(0)},${height - BOTTOM} Z`}
                  fill={`url(#grad-${uid}-${k})`}
                />
              )}
              <path d={d} fill="none" stroke={s.color} strokeWidth="1.75" strokeLinecap="round" />
              {dots &&
                pts.map((p, i) => (
                  <circle
                    key={i}
                    cx={p[0]}
                    cy={p[1]}
                    r={i === hi ? 6 : 4}
                    fill={s.color}
                    strokeWidth={i === hi ? 2 : 0}
                    className={styles.dotRing}
                  />
                ))}
            </g>
          );
        })}
        {hi != null && first && first.data[hi] != null && (
          <line
            x1={x(hi)}
            x2={x(hi)}
            y1={y(first.data[hi]) + 8}
            y2={height - BOTTOM}
            strokeDasharray="3 4"
            strokeWidth="1"
            className={styles.dropLine}
          />
        )}
      </svg>
      {hi != null && first && first.data[hi] != null && (
        <div className={styles.tip} style={{ left: x(hi), top: Math.max(0, y(first.data[hi]) - 44) }}>
          {formatValue(first.data[hi], hi)}
        </div>
      )}
      {labels.length > 0 && (
        <div className={styles.labels} style={{ paddingInline: PAD }}>
          {labels.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}
