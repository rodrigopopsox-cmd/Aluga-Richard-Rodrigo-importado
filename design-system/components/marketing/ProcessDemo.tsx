'use client';

import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { Icon } from '../core/Icon';
import styles from './ProcessDemo.module.css';

/**
 * Um passo da demonstração: um painel focado e o que ele está mostrando.
 *
 * `children` é montado pelo chamador com os **componentes de verdade do
 * design system** (`Card`, `Metric`, `Badge`, `DataTable`…) e com os
 * **dados de demonstração de verdade** (`chargesData`, `contractsData`,
 * `receiptsData`). Não é print, não é maquete, não é tela de concorrente.
 */
export interface DemoStep {
  /** O que acontece neste passo. */
  title: string;
  /** Uma linha explicando. */
  detail: string;
  /** O painel focalizado. */
  children: ReactNode;
}

export interface ProcessDemoProps {
  /** Rótulo da seção: "Contratos", "Cobranças", "Recebimentos". */
  label: string;
  steps: DemoStep[];
  /** Milissegundos por passo. `0` desliga o avanço automático. */
  interval?: number;
}

/**
 * Demonstração de processo: um cartão com etiqueta, contador, painel que
 * troca sozinho e a narração embaixo.
 *
 * POR QUE NÃO É A TELA INTEIRA DENTRO DE UMA MOLDURA. A primeira versão
 * embedava a tela real do painel (`ChargesScreen`, `PropertiesScreen`) numa
 * moldura de 400px. O resultado foi reprovado, e com razão: tela de
 * painel é feita para desktop largo, com tipo pequeno e grade de quatro
 * métricas. Espremida numa moldura de marketing, o texto fica ilegível e a
 * disposição das fontes deixa de fazer sentido.
 *
 * A daqui mostra **um pedaço focado do processo por vez**, com o tipo no
 * tamanho que o design system manda para leitura. É a mesma coisa que o
 * mercado faz, e é honesta: o painel é montado com os componentes e os
 * dados do app, então os números que aparecem são os mesmos que a tela
 * mostra.
 *
 * A moldura é um cartão com sombra leve — **sem a borda grossa** que a
 * versão anterior usava (`--shadow-device` é um anel preto de 10px, feito
 * para emular aparelho, não para Painel de produto).
 *
 * Três cuidados, porque animação que ninguém pediu para ver é hostil:
 *
 *   · `prefers-reduced-motion` desliga o avanço automático **e** a troca.
 *   · Ponteiro em cima e foco pausam — ninguém perde o passo de vista
 *     porque estava lendo.
 *   · Botões com alvo de 48px (o token sobe para 56px no modo
 *     acessibilidade) e narração em `aria-live`: o painel se usa sem ver a
 *     animação.
 */
export function ProcessDemo({ label, steps, interval = 4200 }: ProcessDemoProps) {
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
      className={styles.demo}
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
        {/* Tempo até o próximo passo. É o que faz a troca parecer
            automática em vez de acionada: a barra enche sozinha. */}
        <span className={styles.track} aria-hidden="true">
          <span
            key={index}
            className={styles.fill}
            style={{ animationDuration: `${interval}ms` } as CSSProperties}
            data-paused={paused || reduced ? '' : undefined}
          />
        </span>
      </div>

      <div className={styles.body} key={index} data-reduced={reduced ? '' : undefined}>
        {step.children}
      </div>

      <figcaption className={styles.foot}>
        <div className={styles.text} aria-live="polite">
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
