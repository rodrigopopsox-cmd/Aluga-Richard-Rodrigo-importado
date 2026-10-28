import type { CSSProperties, ReactNode } from 'react';
import { Badge } from '../core/Badge';
import { Button } from '../core/Button';
import { Icon } from '../core/Icon';
import styles from './PlanCard.module.css';

export interface PlanCardProps {
  /** Plan name — e.g. "Essencial" */
  name: string;
  /** Price in BRL for the selected period. Shown as "R$ 59". */
  price: number;
  /** 'month' = per month; 'year' = total charged per year */
  period: 'month' | 'year';
  /** Unit limit line — e.g. "até 5 unidades" or "unidades ilimitadas" */
  units: string;
  /** Holder (titular) limit line — e.g. "1 titular" or "titulares ilimitados" */
  holders: string;
  /** What this plan includes, one line each. Keep short — these are read on a phone. */
  features?: string[];
  /** Solid orange card + label. Use for the plan you want most people to pick. */
  highlighted?: boolean;
  /** Small label above the name — e.g. "Mais popular" */
  badge?: string;
  /** Quiet line under the price — e.g. "2 meses grátis" */
  priceNote?: string;
  ctaLabel?: string;
  ctaIcon?: 'arrow-right';
  onSelect?: () => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Plan definition for PricingTable: `price` is always the MONTHLY price and there is no
 * `period` — PricingTable derives the yearly figure and injects the period.
 */
export type PlanSpec = Omit<PlanCardProps, 'period' | 'price'> & { price: number };

function brl(value: number): string {
  return `R$ ${value.toLocaleString('pt-BR')}`;
}

/**
 * One pricing plan. Orange card when highlighted — otherwise a white card with a hairline.
 *
 * The card deliberately shows only what differs between plans (units and holders).
 * Anything common to every plan belongs below the table, not repeated four times.
 */
export function PlanCard({
  name,
  price,
  period,
  units,
  holders,
  features,
  highlighted,
  badge,
  priceNote,
  ctaLabel = 'Começar teste grátis',
  ctaIcon,
  onSelect,
  className,
  style,
}: PlanCardProps) {
  const cls = [styles.card, highlighted && styles.highlighted, className].filter(Boolean).join(' ');
  const suffix = period === 'year' ? '/ano' : '/mês';

  return (
    <div className={cls} style={style} data-highlighted={highlighted || undefined}>
      <div className={styles.head}>
        {badge && (
          <Badge tone={highlighted ? 'dark' : 'brand'} size="sm">
            {badge}
          </Badge>
        )}
        <h3 className={styles.name}>{name}</h3>
      </div>

      <div className={styles.priceRow}>
        <span className={styles.price}>{brl(price)}</span>
        <span className={styles.suffix}>{suffix}</span>
      </div>
      {priceNote && <p className={styles.priceNote}>{priceNote}</p>}

      <dl className={styles.limits}>
        <div className={styles.limit}>
          <dt>Unidades</dt>
          <dd>{units}</dd>
        </div>
        <div className={styles.limit}>
          <dt>Titulares</dt>
          <dd>{holders}</dd>
        </div>
      </dl>

      {features && features.length > 0 && (
        <ul className={styles.features}>
          {features.map((f) => (
            <li key={f} className={styles.feature}>
              <Icon name="circle-check" size={16} className={styles.check} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.cta}>
        <Button
          variant={highlighted ? 'dark' : 'primary'}
          fullWidth
          iconRight={ctaIcon}
          onClick={onSelect}
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

export interface PricingNoteProps {
  children: ReactNode;
  className?: string;
}

/** Quiet legal/explanation line that belongs under a pricing block. */
export function PricingNote({ children, className }: PricingNoteProps) {
  return <p className={[styles.note, className].filter(Boolean).join(' ')}>{children}</p>;
}
