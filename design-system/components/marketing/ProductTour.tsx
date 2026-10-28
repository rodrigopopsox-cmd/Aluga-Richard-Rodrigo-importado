'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Icon } from '../core/Icon';
import styles from './ProductTour.module.css';

/**
 * Um passo do tour: uma tela real do app e o que acontece nela.
 *
 * `children` é a **tela de verdade**, não um desenho dela. Quem monta o
 * tour passa `<ContractsScreen bp="d" toast={noop} />` e a moldura apenas
 * a emoldura. Se a tela mudar no app, o tour muda junto — é a única forma
 * de a demonstração não mentir.
 */
export interface TourStep {
  /**
   * Nome da tela como aparece no menu do app ("Contratos", "Cobranças").
   * É o que a barra da moldura mostra, no lugar do nome do site: o tour é
   * do produto, não da marca.
   */
  screen: string;
  /** O que acontece neste passo, em poucas palavras. */
  title: string;
  /** Uma linha explicando o passo. */
  detail: string;
  /** A tela real. */
  children: ReactNode;
  /**
   * Onde o cursor para, em porcentagem da área da tela. Sem isso o cursor
   * fica parado no meio e parece defeito, não demonstração.
   */
  cursor?: { x: number; y: number };
}

export interface ProductTourProps {
  /** Rótulo da seção: "Contratos", "Cobranças", "Recebimentos". */
  label: string;
  steps: TourStep[];
  /** Milissegundos por passo. `0` desliga o avanço automático. */
  interval?: number;
}

/**
 * Tour do produto: moldura com uma tela real do app dentro, contador de
 * passo e narração que avança sozinha.
 *
 * O formato é o que o mercado usa (etiqueta da tela + `01 / 04` + legenda),
 * mas o conteúdo é nosso: as telas são as do app e os textos vêm do
 * `PRODUCT.md`. Nada é copiado de concorrente — nem texto, nem número, nem
 * imagem.
 *
 * Três cuidados de acessibilidade, porque animação que ninguém pediu para
 * ver é hostil:
 *
 *   · `prefers-reduced-motion` desliga o avanço automático **e** a
 *     troca com fade. Quem pediu menos movimento recebe menos movimento.
 *   · O ponteiro do mouse em cima pausa, e o foco também — ninguém perde
 *     o passo de vista porque estava lendo.
 *   · Os botões de passo são alvos de 48px e a narração é `aria-live`,
 *     então o tour se usa sem ver a animação.
 */
export function ProductTour({ label, steps, interval = 5600 }: ProductTourProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const total = steps.length;
  const step = steps[index];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent): void => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );

  useEffect(() => {
    if (!interval || paused || reduced) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % total), interval);
    return () => window.clearTimeout(id);
  }, [index, interval, paused, reduced, total]);

  return (
    <figure
      className={styles.tour}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label={`${label} — como funciona`}
    >
      <div className={styles.bar}>
        <span className={styles.barLabel}>{label}</span>
        <span className={styles.barCount}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className={styles.device}>
        <div className={styles.screen} key={index} data-reduced={reduced ? '' : undefined}>
          {step.children}
        </div>
        {step.cursor && (
          <span
            className={styles.cursor}
            style={{ left: `${step.cursor.x}%`, top: `${step.cursor.y}%` }}
            aria-hidden="true"
          />
        )}
      </div>

      <figcaption className={styles.foot}>
        <div className={styles.text} aria-live="polite">
          <span className={styles.screenName}>{step.screen}</span>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.detail}>{step.detail}</p>
        </div>

        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => go(index - 1)}
            aria-label="Passo anterior"
          >
            <Icon name="chevron-left" size={20} />
          </button>

          <ol className={styles.dots}>
            {steps.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  className={i === index ? styles.dotOn : styles.dot}
                  onClick={() => go(i)}
                  aria-label={`Passo ${i + 1}: ${s.title}`}
                  aria-current={i === index ? 'step' : undefined}
                />
              </li>
            ))}
          </ol>

          <button
            type="button"
            className={styles.navBtn}
            onClick={() => go(index + 1)}
            aria-label="Próximo passo"
          >
            <Icon name="chevron-right" size={20} />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
