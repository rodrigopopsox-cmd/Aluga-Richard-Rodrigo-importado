import type { CSSProperties } from 'react';
import styles from './BrandLockup.module.css';

export interface BrandLockupProps {
  /** Tamanho da fonte do texto, em px. */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wordmark da marca: "Aluga Vibe.".
 *
 * "Aluga" em tinta forte e "Vibe." em laranja. O ponto mora dentro do span
 * laranja, então ele sai de graça — não precisa de marcação própria.
 *
 * JÁ TEVE SÍMBOLO, E FOI RETIRADO. A primeira versão era um "A" sem barra
 * com um ponto na base, desenhado pelo Rodrigo. Na revisão ele pediu para
 * tirar — "vamos deixar só Aluga Vibe" — e o desenho saiu daqui. Ficou o
 * wordmark tipográfico como único portador da marca.
 *
 * ATENÇÃO AO TAMANHO. Com o símbolo, a marca ocupava mais largura: ele somava
 * ~1,36em ao lado do texto. Sem ele, um `size` igual ao de antes deixa a
 * marca visivelmente menor. Os lugares que usam o lockup passaram por isso —
 * o `size` deles foi aumentado na mesma mudança, e mexeer em um sem mexer no
 * outro faz a marca encolher de um lado e inchar do outro.
 *
 * O `Wordmark` tipográfico continua no design system e segue sustentando o
 * painel e a tela de login, que não levam o "Vibe.".
 */
export function BrandLockup({ size = 26, className, style }: BrandLockupProps) {
  const cls = [styles.lockup, className].filter(Boolean).join(' ');
  return (
    <span className={cls} style={{ fontSize: size, ...style }}>
      <span className={styles.texto}>
        Aluga <span className={styles.vibe}>Vibe.</span>
      </span>
    </span>
  );
}
