'use client';

import type { CSSProperties } from 'react';
import { Icon } from '../core/Icon';
import type { IconName } from '../core/icons';
import styles from './HowItWorks.module.css';

export interface HowItWorksStep {
  /** Número mostrado no marcador — 1, 2, 3. */
  n: number;
  /** Título curto, em verbo. É o que a pessoa lê. */
  title: string;
  /** Uma ou duas frases. Nada de lista. */
  body: string;
  icon: IconName;
}

export interface HowItWorksProps {
  steps: HowItWorksStep[];
  title?: string;
  lead?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * "Como funciona" em passos numerados — bloco de landing.
 *
 * A R10 manda "como funciona (3 passos)". Três, e não cinco: o onboarding do
 * app tem cinco passos porque é configuração de conta; a landing precisa do
 * arco do produto, que é cadastrar → cobrar → acompanhar.
 *
 * O número é o elemento gráfico. Não há linha conectora entre os passos:
 * ligar com traço sugere sequência rígida, e o produto não é sequencial —
 * dá para cadastrar despesa antes de cobrar, e para convidar o ajudante a
 * qualquer momento.
 */
export function HowItWorks({ steps, title = 'Como funciona', lead, className, style }: HowItWorksProps) {
  return (
    <section className={[styles.wrap, className].filter(Boolean).join(' ')} style={style}>
      <header className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
        {lead && <p className={styles.lead}>{lead}</p>}
      </header>

      <ol className={styles.list}>
        {steps.map((step) => (
          <li key={step.n} className={styles.item}>
            <span className={styles.marker} aria-hidden="true">
              {step.n}
            </span>
            <div className={styles.body}>
              <h3 className={styles.stepTitle}>
                <Icon name={step.icon} size={18} className={styles.icon} />
                {step.title}
              </h3>
              <p className={styles.text}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
