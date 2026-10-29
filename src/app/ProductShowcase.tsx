'use client';

import { useEffect, useState } from 'react';
import { Badge, Card, CardHeader, Icon, Metric, Wordmark } from '@design-system';
import {
  CHARGES,
  STATUS_LABEL,
  STATUS_TONE,
  balanceOf,
  type Charge,
} from '../../design-system/templates/admin/chargesData';
import s from './page.module.css';

/**
 * A DEMONSTRAÇÃO ANIMADA DO PRODUTO.
 *
 * O que ela é: o ciclo que o Aluga resolve, passando sozinho na frente de
 * quem chega — cobrança do mês, lembrete no WhatsApp, Pix caindo e a baixa
 * automática. Três tempos, dados reais de `chargesData`, componentes
 * reais do design system.
 *
 * POR QUE ELA EXISTE. Quem chega na landing precisa ver o produto
 * funcionando antes de decidir rolar. A apresentação guiada pela rolagem
 * logo abaixo continua sendo a explicação completa; isto aqui é o produto
 * em movimento, nos primeiros segundos.
 *
 * REGRAS QUE ELA OBEDECE:
 *
 *   · **Não segura a rolagem.** Nenhum `preventDefault`, nenhuma captura
 *     da rodinha, nenhum `position: fixed`. A animação corre sozinha no
 *     lugar dela e a página continua rolando normalmente.
 *   · **Movimento curto.** Cada troca de tempo é fade de 200ms
 *     (`--dur-base`) com subida de poucos pixels. Nada de bounce, nada de
 *     parallax, nada de barra de progresso.
 *   · **Respeita quem pede menos movimento.** Com
 *     `prefers-reduced-motion` a troca automática para e fica o primeiro
 *     tempo, parado — os pontos continuam clicáveis, então a pessoa
 *     escolhe o que ver.
 *   · **Não inventa.** Os números vêm de `CHARGES`: R$ 2.600 recebido de
 *     R$ 6.000 previsto, e a Loja Centro (Ana, R$ 1.400, vence 30/10) é a
 *     cobrança que muda de estado. A mensagem do WhatsApp é exemplo
 *     ilustrativo — e está escrito isso na tela.
 */

/** Os três tempos do ciclo. */
const BEATS = [
  { id: 'cobranca', label: 'A cobrança do mês' },
  { id: 'whatsapp', label: 'O lembrete no WhatsApp' },
  { id: 'pix', label: 'O Pix cai, a baixa é automática' },
] as const;

/** Quanto cada tempo fica na tela. 3,6s dá para ler sem esperar. */
const BEAT_MS = 3600;

export function ProductShowcase() {
  const [beat, setBeat] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent): void => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    // Movimento reduzido: a troca automática não roda. Os pontos continuam
    // lá, clicáveis — a pessoa escolhe o que ver.
    if (reduced) return;
    const t = window.setTimeout(() => setBeat((b) => (b + 1) % BEATS.length), BEAT_MS);
    return () => window.clearTimeout(t);
  }, [beat, reduced]);

  return (
    <div className={s.showcase}>
      {/* ---------- moldura: barra do app ---------- */}
      <div className={s.showBar}>
        <Wordmark size={16} />
        <span className={s.showWhere}>Cobranças · outubro</span>
        <span className={s.showLive}>
          <span className={s.showLiveDot} aria-hidden="true" />
          ao vivo
        </span>
      </div>

      {/* ---------- o conteúdo do tempo atual ---------- */}
      <div className={s.showBody} key={BEATS[beat].id}>
        {beat === 0 && <Cobrancas />}
        {beat === 1 && <WhatsApp />}
        {beat === 2 && <Pix />}
      </div>

      {/* ---------- os pontos e o nome do tempo ---------- */}
      <div className={s.showFoot}>
        <span className={s.showCaption}>{BEATS[beat].label}</span>
        <ol className={s.showDots}>
          {BEATS.map((b, i) => (
            <li key={b.id}>
              <button
                type="button"
                className={i === beat ? s.showDotOn : s.showDot}
                onClick={() => setBeat(i)}
                aria-label={`Ver: ${b.label}`}
                aria-current={i === beat ? 'step' : undefined}
              />
            </li>
          ))}
        </ol>
      </div>

      <p className={s.showNote}>Exemplo ilustrativo, com os dados de demonstração do painel.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * TEMPO 1 — a cobrança do mês, com o que ainda falta.
 * ------------------------------------------------------------------ */

function Cobrancas() {
  const previsto = CHARGES.reduce((t, c) => t + c.amount, 0);
  const recebido = CHARGES.reduce((t, c) => t + c.paid, 0);

  return (
    <>
      <Card padding="var(--space-5)">
        <CardHeader title="Cobranças de outubro" subtitle="geradas a partir dos contratos" />
        <div className={s.showTotals}>
          <Metric value={`R$ ${fmt(recebido)}`} label="recebido" size="md" />
          <Metric value={`R$ ${fmt(previsto - recebido)}`} label="em aberto" size="md" />
        </div>
      </Card>

      <Card padding="var(--space-5)">
        <CardHeader title="O que ainda falta" subtitle="duas cobranças em aberto" />
        <div className={s.showRows}>
          <Row charge={CHARGES[3]} foco />
          <Row charge={CHARGES[2]} />
        </div>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * TEMPO 2 — o lembrete saindo sozinho.
 * ------------------------------------------------------------------ */

function WhatsApp() {
  const c = CHARGES[3]; // Loja Centro · Ana · R$ 1.400 · vence 30/10

  return (
    <Card padding="var(--space-5)">
      <CardHeader
        title="Lembrete enviado"
        subtitle={`para ${c.tenant} · ${c.unit}`}
        action={
          <Badge tone="soft">
            <Icon name="message-circle" size={14} /> WhatsApp
          </Badge>
        }
      />
      <div className={s.showChat}>
        <div className={s.showBubble}>
          Bom dia, {c.tenant}. Passando para lembrar que o aluguel da {c.unit} — R${' '}
          {fmt(c.amount)} — vence no dia 30/10. Se já pagou, pode ignorar.
        </div>
        <p className={s.showChatMeta}>Enviado 3 dias antes do vencimento, sem você tocar em nada.</p>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * TEMPO 3 — o Pix cai e a baixa é automática.
 * ------------------------------------------------------------------ */

function Pix() {
  const recebido = CHARGES.reduce((t, c) => t + c.paid, 0) + CHARGES[3].amount;
  const previsto = CHARGES.reduce((t, c) => t + c.amount, 0);
  const c = CHARGES[3];

  return (
    <>
      <Card padding="var(--space-5)">
        <CardHeader title="Pagamento identificado" subtitle={`${c.unit} · ${c.tenant}`} />
        <div className={s.showTotals}>
          <Metric value={`R$ ${fmt(recebido)}`} label="recebido" size="md" />
          <Metric value={`R$ ${fmt(previsto - recebido)}`} label="em aberto" size="md" />
        </div>
        <div className={s.showPaid}>
          <Icon name="circle-check" size={20} className={s.showPaidIcon} />
          <span>
            R$ {fmt(c.amount)} · Mercado Pago · baixa automática em 30/10
          </span>
        </div>
      </Card>

      <Card padding="var(--space-5)">
        <CardHeader title="E o registro fica" subtitle="para o Imposto de Renda" />
        <div className={s.showRows}>
          <div className={s.showRecord}>
            <span className={s.showRecordLabel}>Origem</span>
            <span className={s.showRecordValue}>Mercado Pago</span>
          </div>
          <div className={s.showRecord}>
            <span className={s.showRecordLabel}>Quem deu a baixa</span>
            <span className={s.showRecordValue}>automática, sem você</span>
          </div>
        </div>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Peças
 * ------------------------------------------------------------------ */

/** Linha de cobrança. `foco` marca a que vai mudar de estado. */
function Row({ charge, foco }: { charge: Charge; foco?: boolean }) {
  const saldo = balanceOf(charge);
  return (
    <div className={foco ? s.showRowFocus : s.showRow}>
      <div className={s.showRowMain}>
        <span className={s.showRowUnit}>{charge.unit}</span>
        <span className={s.showRowTenant}>{charge.tenant}</span>
      </div>
      <div className={s.showRowSide}>
        <span className={s.showRowValue}>
          R$ {fmt(charge.amount)}
          {saldo > 0 && charge.paid > 0 && (
            <span className={s.showRowPart}> · R$ {fmt(saldo)} a pagar</span>
          )}
        </span>
        <Badge tone={STATUS_TONE[charge.status]}>{STATUS_LABEL[charge.status]}</Badge>
      </div>
    </div>
  );
}

/** 1200 → "1.200", no padrão pt-BR. */
const fmt = (v: number): string => v.toLocaleString('pt-BR');
