'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../core/Icon';
import styles from './ProductTour.module.css';

/** Uma etapa da apresentação. */
export interface TourStep {
  /** Rótulo curto do módulo — "Imóveis", "Contratos", "Cobranças". */
  label: string;
  /** Título da etapa, orientado ao que a pessoa ganha. */
  title: string;
  /** Uma frase de benefício. `DESIGN.md`: uma frase, até 20 palavras. */
  body: string;
  /** O painel demonstrado nesta etapa. */
  panel: ReactNode;
}

export interface ProductTourProps {
  steps: TourStep[];
}

/**
 * Apresentação de produto em **sticky scrollytelling**: a explicação fica
 * acima, a interface demonstra abaixo, e a rolagem do usuário avança as
 * etapas.
 *
 * COMO FUNCIONA — e por que não é um timer.
 *
 * A seção de fora é **alta**: uma tela de rolagem por etapa, mais uma tela
 * final onde ela sai do sticky. Dentro dela, um único elemento
 * `position: sticky` ocupa a viewport. Quem rola é o **navegador** — não há
 * `preventDefault`, não há captura da rodinha, não há `scroll-jacking`.
 *
 * A etapa ativa sai da posição da rolagem dentro da seção:
 *
 *     progresso = -rect.top / (rect.height - innerHeight)
 *     etapa     = min(N-1, floor(progresso * N))
 *
 * Isso dá três propriedades que um timer não dá, e que foram pedidas:
 *
 *   · **Rolar para cima volta.** A conta é simétrica; não há estado para
 *     "avançar" que precise ser desfeito à mão.
 *   · **Rápido ou devagar dá no mesmo.** A etapa é função da posição, não
 *     de quantos eventos de scroll aconteceram. Não existe passo perdido
 *     por rolagem rápida.
 *   · **Âncora, voltar do navegador e redimensionar funcionam.** A conta
 *     roda no scroll e no resize, então qualquer forma de chegar à seção
 *     recomplica do zero.
 *
 * Depois da última etapa a seção simplesmente acaba e a página continua
 * rolando — não há nada para "liberar".
 *
 * PORQUE A MEDIDA É BARATA. O listener é `passive`, e o cálculo roda dentro
 * de um `requestAnimationFrame` com guarda: se já tem um frame pendente, o
 * evento é ignorado. E o `setState` só dispara quando a etapa **muda de
 * fato** — rolar dentro da mesma etapa não re-renderiza nada.
 *
 * ACESSIBILIDADE.
 *
 *   · O avanço é por rolagem, então espaço, setas, Page Down e toque
 *     funcionam sem código extra.
 *   · A etapa atual é anunciada por uma região `aria-live` discreta — sem
 *     ela, quem usa leitor de tela não fica sabendo que o conteúdo mudou.
 *   · `prefers-reduced-motion` não desliga a apresentação: o conteúdo das
 *     etapas é informação, não decoração. Desliga só as transições.
 *   · Os botões de etapa são `button` de verdade, com rótulo.
 */
export function ProductTour({ steps }: ProductTourProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const total = steps.length;
  const step = steps[active];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent): void => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let frame = 0;

    const measure = (): void => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // Fora da seção: não mexe em nada, para não roubar render das
      // seções vizinhas.
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / span));
      const next = Math.min(total - 1, Math.floor(p * total));
      setActive((prev) => (prev === next ? prev : next));
    };

    const onScroll = (): void => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    measure();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [total]);

  /** Leva a rolagem para o começo de uma etapa. */
  const goTo = (i: number): void => {
    const el = sectionRef.current;
    if (!el) return;
    const span = (el.offsetHeight - window.innerHeight) / total;
    const top = el.getBoundingClientRect().top + window.scrollY + i * span + 1;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      className={styles.tour}
      ref={sectionRef}
      aria-label="Como o Aluga funciona"
      // Altura: uma tela de rolagem por etapa, mais a tela final onde a
      // seção sai do sticky. Fica inline porque é dimensão de viewport —
      // não existe token de design system para "tantas telas de
      // rolagem", e inventar um token local só para isso já foi
      // reprovado pelo validador.
      style={{ height: `calc(${total} * 100vh + 100vh)` }}
    >
      {/*
        O `data-reduced` vai no PALCO, não no painel. O painel tem
        `key={p-${active}}` e é remontado a cada troca de etapa, então o
        atributo precisaria ser reaplicado a cada frame — e no primeiro
        frame depois da troca ele ainda não estaria lá, produzindo um
        piscar de animação em quem pediu movimento reduzido. No palco, que
        não é remontado, o atributo está sempre certo.
      */}
      <div className={styles.pin} data-reduced={reduced ? '' : undefined}>
        {/* ---------- explicação, acima ---------- */}
        <div className={styles.head}>
          <div className={styles.count}>
            <span className={styles.countNow}>
              {String(active + 1).padStart(2, '0')}
            </span>
            <span className={styles.countSep}>/</span>
            <span className={styles.countTotal}>{String(total).padStart(2, '0')}</span>
            <span className={styles.countLabel}>{step.label}</span>
          </div>

          <h2 className={styles.title} key={`t-${active}`}>
            {step.title}
          </h2>
          <p className={styles.body} key={`b-${active}`}>
            {step.body}
          </p>
        </div>

        {/* ---------- interface demonstrada, abaixo ---------- */}
        <div className={styles.stage}>
          <div className={styles.panel} key={`p-${active}`}>
            {step.panel}
          </div>
        </div>

        {/* ---------- navegação opcional ---------- */}
        <div className={styles.nav}>
          <ol className={styles.dots}>
            {steps.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  className={i === active ? styles.dotOn : styles.dot}
                  onClick={() => goTo(i)}
                  aria-label={`Etapa ${i + 1} de ${total}: ${s.label}`}
                  aria-current={i === active ? 'step' : undefined}
                />
              </li>
            ))}
          </ol>
          <span className={styles.navHint}>Role para continuar</span>
        </div>
      </div>

      {/* Anúncio para leitor de tela: sem isso, quem não vê a rolagem não
          fica sabendo que a etapa mudou. */}
      <p className={styles.srOnly} aria-live="polite">
        Etapa {active + 1} de {total}: {step.label}. {step.title}
      </p>
    </section>
  );
}
