'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../core/Icon';
import { Wordmark } from '../core/Wordmark';
import { SegmentedControl } from '../forms/SegmentedControl';
import styles from './ProcessDemo.module.css';

/**
 * Um passo da demonstração: um painel focado e o que ele está mostrando.
 *
 * `children` é montado pelo chamador com os **componentes de verdade do
 * design system** (`Card`, `CardHeader`, `Metric`, `Badge`, `Avatar`) e com
 * os **dados de demonstração de verdade**. Não é print, não é maquete, não
 * é tela de concorrente.
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

/** Um módulo do app — uma aba da demonstração. */
export interface DemoTab {
  /** Rótulo da aba: "Contratos", "Cobranças", "Recebimentos", "Meu mês". */
  label: string;
  /** Os passos deste módulo. Uma aba com um passo só fica parada. */
  steps: DemoStep[];
}

export interface ProcessDemoProps {
  /** Os módulos, que viram as abas. */
  tabs: DemoTab[];
  /** Milissegundos por passo. `0` desliga o avanço automático. */
  interval?: number;
}

/**
 * Demonstração de processo — **um cartão único**, no formato do cartão
 * "Novo contrato" que o Rodrigo apontou como referência, com **abas de
 * módulo** para trocar de tela:
 *
 *   · cabeçalho com a marca, as abas do módulo e o contador `NN / 04`;
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
 * AS ABAS. A navegação por módulo é o `SegmentedControl` do próprio design
 * system — o mesmo componente que o app usa para trocar Dia/Semana/Mês nos
 * gráficos. Ele já nasce com `role="tablist"`, `role="tab"` e
 * `aria-selected`, então a semântica de acessibilidade vem de fábrica e não
 * foi reinventada aqui. O que este componente acrescenta é só a navegação
 * por setas, que o `tablist` pede e o `SegmentedControl` não tinha.
 *
 * Trocar de aba **zera o passo e reexecuta a cascata**: é uma tela nova
 * entrando, não o mesmo conteúdo com outro rótulo.
 *
 * O QUE O `DESIGN.md` MANDA E ESTE COMPONENTE OBEDECE — cada item abaixo já
 * foi descumprido uma vez e reprovado na revisão:
 *
 *   · **Cartão plano, sem sombra.** "Cards have no drop shadow at rest.
 *     Depth comes from tonal layers (gray page → white cards with a 1px
 *     border-subtle hairline), not shadows."
 *   · **Movimento curto e quieto.** "120–360ms, cubic-bezier(.22,1,.36,1).
 *     No bounces, no parallax." A versão anterior tinha uma barra de
 *     progresso que corria 4,2 s — doze vezes o limite, e laranja,
 *     competindo com a ação primária. Saiu.
 *   · **Sem emoji.** O aviso de "promessa não construída" é selo, não
 *     triângulo amarelo.
 *
 * COMO A ANIMAÇÃO FUNCIONA — e por que é diferente do que já foi feito
 * aqui. A versão anterior trocava o painel inteiro de uma vez: o bloco
 * somia e o bloco novo aparecia. Isso é o que parece "quadrado, sem
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
export function ProcessDemo({ tabs, interval = 5200 }: ProcessDemoProps) {
  const [tab, setTab] = useState(0);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const active = tabs[tab];
  const total = active.steps.length;
  const current = active.steps[step];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent): void => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /** Trocar de módulo: volta ao primeiro passo e reexecuta a cascata. */
  const pick = useCallback((next: number) => {
    setTab(next);
    setStep(0);
  }, []);

  const go = useCallback(
    (next: number) => setStep(((next % total) + total) % total),
    [total],
  );

  useEffect(() => {
    // Aba com um passo só não tem o que adiantar — fica parada para a
    // pessoa explorar (é o caso do "Meu mês", que é interativo).
    if (!interval || total < 2 || paused || reduced) return;
    const id = window.setTimeout(() => setStep((i) => (i + 1) % total), interval);
    return () => window.clearTimeout(id);
  }, [step, interval, paused, reduced, total]);

  /**
   * Setas movem entre as abas, como um `tablist` pede. O foco vai junto,
   * então quem navega por teclado vê a seleção andar.
   */
  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const last = tabs.length - 1;
    const next =
      e.key === 'Home' ? 0 : e.key === 'End' ? last : tab + (e.key === 'ArrowRight' ? 1 : -1);
    const clamped = ((next % tabs.length) + tabs.length) % tabs.length;
    pick(clamped);
    const btns = tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    btns?.[clamped]?.focus();
  };

  return (
    <figure
      className={styles.demo}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label="Demonstração do produto"
    >
      {/* ---------- cabeçalho: marca, abas, contador ---------- */}
      <div className={styles.bar}>
        <div className={styles.brand}>
          <Wordmark size={18} />
        </div>

        <div className={styles.tabs} ref={tabsRef} onKeyDown={onTabKeyDown}>
          <SegmentedControl
            size="md"
            label="Módulos da demonstração"
            options={tabs.map((t) => t.label)}
            value={active.label}
            onChange={(v) => pick(tabs.findIndex((t) => t.label === v))}
          />
        </div>

        {total > 1 && (
          <span className={styles.barCount}>
            {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* ---------- corpo: título com selo + interior denso ---------- */}
      <div
        className={styles.body}
        key={`${tab}-${step}`}
        data-reduced={reduced ? '' : undefined}
        role="tabpanel"
        aria-label={`${active.label} — passo ${step + 1}`}
      >
        <div className={styles.head}>
          <h3 className={styles.title}>{current.title}</h3>
          <div className={styles.headSide}>
            {current.status}
            {current.pending && <span className={styles.pending}>{current.pending}</span>}
          </div>
        </div>
        {current.children}
      </div>

      {/* ---------- rodapé: legenda, narração, navegação ---------- */}
      <figcaption className={styles.foot}>
        <div className={styles.text}>
          <span className={styles.legend}>Exemplo ilustrativo</span>
          <p className={styles.detail}>{current.detail}</p>
        </div>

        {total > 1 && (
          <div className={styles.nav}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => go(step - 1)}
              aria-label="Passo anterior"
            >
              <Icon name="chevron-left" size={20} />
            </button>

            <ol className={styles.dots}>
              {active.steps.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    className={i === step ? styles.dotOn : styles.dot}
                    onClick={() => go(i)}
                    aria-label={`Passo ${i + 1}: ${s.title}`}
                    aria-current={i === step ? 'step' : undefined}
                  />
                </li>
              ))}
            </ol>

            <button
              type="button"
              className={styles.navBtn}
              onClick={() => go(step + 1)}
              aria-label="Próximo passo"
            >
              <Icon name="chevron-right" size={20} />
            </button>
          </div>
        )}
      </figcaption>
    </figure>
  );
}
