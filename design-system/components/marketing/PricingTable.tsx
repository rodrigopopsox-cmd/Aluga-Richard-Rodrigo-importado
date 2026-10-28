'use client';

import { useId, useState, type CSSProperties } from 'react';
import { SegmentedControl } from '../forms/SegmentedControl';
import { PlanCard, type PlanSpec } from './PlanCard';
import styles from './PricingTable.module.css';

export interface PricingTableProps {
  /** The plans, in display order. 3 or 4 reads best. */
  plans: PlanSpec[];
  /** Months charged on the yearly plan. Aluga charges 10. */
  yearlyMonths?: number;
  /** Line shown under the toggle — e.g. "2 meses grátis no plano anual" */
  yearlyNote?: string;
  onSelect?: (planName: string) => void;
  className?: string;
  style?: CSSProperties;
}

type Period = 'month' | 'year';

/**
 * Pricing block: period toggle + a row of plan cards.
 *
 * Yearly prices are derived, not stored: yearly = monthly × yearlyMonths, so the
 * "10 meses" rule lives in one place instead of being typed into every plan.
 */
export function PricingTable({
  plans,
  yearlyMonths = 10,
  yearlyNote,
  onSelect,
  className,
  style,
}: PricingTableProps) {
  const [period, setPeriod] = useState<Period>('month');
  const headingId = useId();

  return (
    <section
      className={[styles.wrap, className].filter(Boolean).join(' ')}
      style={style}
      aria-labelledby={headingId}
    >
      <header className={styles.head}>
        <h2 className={styles.title} id={headingId}>
          Planos e preços
        </h2>
        <SegmentedControl
          options={[
            { value: 'month', label: 'Mensal' },
            { value: 'year', label: 'Anual' },
          ]}
          value={period}
          onChange={(v) => setPeriod(v as Period)}
        />
      </header>

      <div className={styles.grid}>
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            {...plan}
            period={period}
            price={period === 'year' ? plan.price * yearlyMonths : plan.price}
            priceNote={
              period === 'year'
                ? yearlyNote ?? `${yearlyMonths} meses, 2 de graça`
                : plan.priceNote
            }
            onSelect={onSelect ? () => onSelect(plan.name) : plan.onSelect}
          />
        ))}
      </div>
    </section>
  );
}
