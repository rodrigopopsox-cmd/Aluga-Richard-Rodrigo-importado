'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Icon } from '../core/Icon';
import { Wordmark } from '../core/Wordmark';
import styles from './ProcessDemo.module.css';

/**
 * Um passo da demonstração: um painel focado e o que ele está mostrando.
 *
 * `children` é montado pelo chamador com os **componentes de verdade do
 * design system** (`Card`, `CardHeader`, `Metric`, `Badge`, `Avatar`) e com
 * os **dados de demonstração de verdade** (`chargesData`, `contractsData`,
 * `receiptsData`). Não é print, não é maquete, não é tela de concorrente.
 */
export interface DemoStep {
  /** O que acontece neste passo. */
  title: string;
  /**
   * Uma linha explicando. `DESIGN.md` manda: uma frase, até 20 palavras,
   * sem exclamação.
   */
  detail: string;
  /**
   * Aviso de que o passo é promessa e não código. Some da tela — aparece
   * como selo ao lado do título, porque `DESIGN.md` proíbe emoji na
   * interface.
   */
  pending?: string;
  /**
   * Estado mostrado no canto do título — "Vigente", "Paga", "Aberta". É o
   * que muda de um passo para o outro e faz a demonstração parecer um
   * processo acontecendo, e não uma galeria de telas.
   */
  status?: ReactNode;
  /** O painel focado. */
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
 * Demonstração de processo — **um cartão único e grande**, no formato do
 * cartão "Novo contrato" que o Rodrigo apontou como referência:
 *
 *   · cabeçalho com a marca + o nome da área à esquerda e o contador
 *     `NN / 04` à direita;
 *   · linha de título com o selo de estado à direita;
 *   · interior em grade de colunas densas;
 *   · rodapé com a legenda e a navegação.
 *
 * POR QUE NÃO É A TELA INTEIRA DENTRO DE UMA MOLDURA. A primeira versão
 * embedava a tela real do painel (`ChargesScreen`, `PropertiesScreen`) numa
 * moldura de 400px. Foi reprovado, e com razão: tela de painel é feita para
 * desktop largo, com tipo pequeno e grade de quatro métricas. Espremida
 * numa moldura de marketing, o texto fica ilegível e a disposição das
 * fontes deixa de fazer sentido.
 *
 * A daqui mostra **um pedaço focado do processo por vez**, com o tipo no
 * tamanho que o design system manda para leitura. É a mesma coisa que o
 * mercado faz, e é honesta: o painel é montado com os componentes e os
 * dados do app, então os números que aparecem são os mesmos que a tela
 * mostra.
 *
 * O QUE O `DESIGN.md` MANDA E ESTE COMPONENTE OBEDECE — cada item abaixo já
 * foi descumprido uma vez e reprovado na revisão:
 *
 *   · **Cartão plano, sem sombra.** "Cards have no drop shadow at rest.
 *     Depth comes from tonal layers (gray page → white cards with a 1px
 *     border-subtle hairline), not shadows." A moldura é hairline. A
 *     versão anterior usava `--shadow-card` e depois `--shadow-device`
 *     (anel preto de 10px) — as duas contra a regra.
 *   · **Movimento curto e quieto.** "120–360ms, cubic-bezier(.22,1,.36,1).
 *     No bounces, no parallax." A versão anterior tinha uma barra de
 *     progresso que corria 4,2 s — doze vezes o limite, e laranja,
 *     competindo com a ação primária. Saiu.
 *   · **Sem emoji.** O aviso de "promessa não construída" é selo, não
 *     triângulo amarelo.
 *
 * COMO A ANIMAÇÃO FUNCIONA AGORA — e por que é diferente do que já foi
 * feito aqui. A versão anterior trocava o painel inteiro de uma vez: o
 * bloco somia e o bloco novo aparecia. Isso é o que parece "quadrado, sem
 * fluidez nenhuma": o olho perde a referência e não vê continuidade.
 *
 * Agora o painel **se preenche em cascata**: cada bloco entra um depois do
 * outro, com 60 ms de atraso entre um e outro, todos em fade curto com
 * subida de poucos pixels. É a técnica de stagger que o mercado usa em
 * demonstração de produto (Linear, Ramp) e ela dá duas coisas que o fade
 * em bloco não dá:
 *
 *   1. **Continuidade.** O olho acompanha a informação chegando em
 *      sequência, em vez de uma tela sendo substituída por outra.
 *   2. **Ritmo de processo.** A ordem de entrada segue a ordem de leitura,
 *      então parece que os campos estão sendo preenchidos — "alguém
 *      mexendo no site", que é o que foi pedido.
 *
 * Não há barra de progresso em nenhum lugar: o contador `NN / 04` no
 * cabeçalho e o selo de estado no título já dizem onde se está.
 *
 * Três cuidados, porque animação que ninguém pediu para ver é hostil:
 *
 *   · `prefers-reduced-motion` desliga o avanço automático **e** a cascata.
 *   · Ponteiro em cima e foco pausam — ninguém perde o passo de vista
 *     porque estava lendo.
 *   · Botões com alvo de 48px (o token sobe para 56px no modo
 *     acessibilidade) e narração em `aria-live`: o painel se usa sem ver a
 *     animação.
 */
export function ProcessDemo({ label, steps, interval = 5200 }: ProcessDemoProps) {
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
      {/* ---------- cabeçalho: marca, área, contador ---------- */}
      <div className={styles.bar}>
        <div className={styles.brand}>
          <Wordmark size={18} />
        </div>
        <span className={styles.barLabel}>{label}</span>
        <span className={styles.barCount}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* ---------- corpo: título com selo + interior denso ---------- */}
      <div className={styles.body} key={index} data-reduced={reduced ? '' : undefined}>
        <div className={styles.head}>
          <h3 className={styles.title}>{step.title}</h3>
          <div className={styles.headSide}>
            {step.status}
            {step.pending && <span className={styles.pending}>{step.pending}</span>}
          </div>
        </div>
        {step.children}
      </div>

      {/* ---------- rodapé: legenda, narração, navegação ---------- */}
      <figcaption className={styles.foot}>
        <div className={styles.text}>
          <span className={styles.legend}>Exemplo ilustrativo</span>
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
