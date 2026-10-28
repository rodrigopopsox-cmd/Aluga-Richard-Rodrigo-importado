'use client';

import { Card, CardHeader, Wordmark } from '../../../../design-system/components';
import s from './Identity.module.css';

/**
 * Identidade provisória "Aluga" + ícones do PWA.
 *
 * O nome é provisório (tarefa 4 do backlog, Sprint 1) — as direções em aberto
 * são Old Parr / Mustang / nome da Vó(V0), e o INPI precisa ser consultado nas
 * classes 36 e 42. Nada aqui é definitivo.
 *
 * Os PNGs são gerados por `scripts/build-icons.mjs` a partir dos SVGs em
 * `design-system/assets/icons/`. Não edite os binários à mão.
 */

const SIZES = [16, 32, 48, 64, 96, 128, 192, 512];

const SWATCHES: Array<[string, string]> = [
  ['--brand', 'var(--brand)'],
  ['--brand-hover', 'var(--brand-hover)'],
  ['--brand-soft', 'var(--brand-soft)'],
  ['--on-brand', 'var(--on-brand)'],
];

export function IdentityShowcase() {
  return (
    <div className={s.page}>
      <header className={s.head}>
        <h1 className={s.title}>Identidade provisória</h1>
        <p className={s.sub}>
          Marca provisória do Aluga e os ícones do PWA. O monograma é um{" "}
          <strong>A</strong> de traço arredondado sobre o tile laranja da marca — a
          mesma geometria do <code>logoTile</code> que já existe no painel, para o
          ícone do app e o app serem a mesma coisa.
        </p>
      </header>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>O ícone em tamanho real</h2>
        <Card padding="var(--space-6)">
          <div className={s.sizes}>
            {SIZES.map((n) => (
              <div key={n} className={s.size}>
                <img
                  className={s.sizeIcon}
                  src="/icons/icon-192.png"
                  width={n}
                  height={n}
                  alt={`Ícone do Aluga em ${n} por ${n} pixels`}
                />
                <span className={s.sizeLabel}>{n}px</span>
              </div>
            ))}
          </div>
        </Card>
        <p className={s.note}>
          O favicon usa traço mais grosso (62 em vez de 46 no viewBox de 512) porque
          em 16px o traço fino desaparece. São dois desenhos diferentes de propósito.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Como aparece na tela inicial</h2>
        <Card padding="var(--space-5)">
          <div className={s.screen}>
            <div className={s.appIcon}>
              <img className={s.appIconImg} src="/icons/icon-192.png" alt="Ícone do Aluga" />
              <span className={s.appLabel}>Aluga</span>
            </div>
            <div className={s.appIcon}>
              <img className={s.appIconImg} src="/icons/icon-maskable-512.png" alt="Ícone maskable do Aluga" />
              <span className={s.appLabel}>maskable</span>
            </div>
          </div>
        </Card>
        <p className={s.note}>
          O Android recorta o ícone em até 20% das bordas (círculo, quadrado, gota,
          conforme a launcher). Por isso existe um segundo ícone, <strong>maskable</strong>,
          com a marca dentro da zona segura central e fundo full-bleed — sem ele, a
          letra A pode ser cortada.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Paleta da marca</h2>
        <Card padding="var(--space-6)">
          <div className={s.swatches}>
            {SWATCHES.map(([name, value]) => (
              <div key={name} className={s.swatch}>
                <div className={s.swatchChip} style={{ background: value }} />
                <div className={s.swatchMeta}>
                  <span className={s.swatchName}>{name}</span>
                  <span className={s.swatchValue}>{name}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <p className={s.note}>
          Só tokens — nenhuma cor nova foi criada para a identidade. O laranja{" "}
          <code>--brand: #C2410C</code> tem contraste 5,18:1 com branco, acima do
          mínimo AA de 4,5:1.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Wordmark</h2>
        <Card padding="var(--space-6)">
          <div className={s.marks}>
            <div className={s.markBox}>
              <Wordmark variant="dot" size={40} />
              <span className={s.markCaption}>variant=&quot;dot&quot; · display</span>
            </div>
            <div className={s.markBox}>
              <Wordmark variant="spaced" size={22} />
              <span className={s.markCaption}>variant=&quot;spaced&quot; · cabeçalho do app</span>
            </div>
          </div>
        </Card>
        <p className={s.note}>
          O <code>Wordmark</code> já existia no design system com as duas variantes.
          Nada foi alterado nele — a identidade provisória só acrescenta o ícone.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Como regenerar</h2>
        <Card padding="var(--space-6)">
          <CardHeader title="scripts/build-icons.mjs" subtitle="Fonte da identidade" />
          <pre className={s.code}>node scripts/build-icons.mjs</pre>
          <p className={s.note} style={{ marginTop: 'var(--space-3)' }}>
            O monograma é geometria em <code>paths</code>, não texto — não depende de
            fonte instalada, então o resultado é idêntico em qualquer máquina. Para
            mudar a marca, edite o SVG mestre em{" "}
            <code>design-system/assets/icons/</code> e rode o script.
          </p>
        </Card>
      </section>
    </div>
  );
}
