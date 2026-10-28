'use client';

import { useState } from 'react';
import { Badge, Button, Card, CardHeader, Icon, IconButton, Metric, type IconName } from '../../components';
import type { Breakpoint } from './useBreakpoint';
import type { ToastInput } from './AdminApp';
import { MOOD_TONE, SIMPLE_MONTHS, SIMPLE_UNITS, simpleTotals, type ChargeMood, type SimpleUnit } from './simpleModeData';
import s from './Screens.module.css';

/**
 * "Este mês" — a tela do Modo simples (R7 da spec v1).
 *
 * É a tela que a Vó abre todo dia. A spec manda:
 *   cabeçalho com o mês atual e navegação entre meses;
 *   resumo "R$ recebidos de R$ esperados";
 *   um card por unidade, com status em palavras ("Pago dia 05",
 *     "Atrasado 3 dias", "Vence em 2 dias");
 *   botões Recebi e Lembrar no WhatsApp;
 *   letra de 18px ou mais e botões com no mínimo 48px de altura.
 *
 * O status é FRASE, não só cor — a spec é explícita e isso também é o que
 * torna a tela legível para quem não distingue vermelho de verde.
 *
 * Estado local de demonstração: "Recebi" marca o card como pago e recalcula o
 * resumo. Ligado ao banco, a baixa vem do Mercado Pago ou do "Recebeu?".
 */
export interface SimpleModeScreenProps {
  bp: Breakpoint;
  toast: (t: ToastInput) => void;
}

const MOOD_ICON: Record<ChargeMood, IconName> = {
  paid: 'circle-check',
  late: 'circle-alert',
  due: 'circle-alert',
  open: 'circle-alert',
};

export function SimpleModeScreen({ bp, toast }: SimpleModeScreenProps) {
  const [monthIndex, setMonthIndex] = useState(1); // outubro, no meio da lista
  const [units, setUnits] = useState<SimpleUnit[]>(SIMPLE_UNITS);
  const mobile = bp === 'm';
  const pad = mobile ? 'var(--space-4-5)' : 'var(--card-padding)';

  const month = SIMPLE_MONTHS[monthIndex];
  const { expected, received, missing } = simpleTotals(units);
  const pct = expected > 0 ? Math.round((received / expected) * 100) : 0;

  /** "Recebi" — marca a unidade como paga e recalcula o resumo. */
  const receive = (id: string) => {
    setUnits((prev) =>
      prev.map((u) =>
        u.id === id && u.mood !== 'paid'
          ? { ...u, mood: 'paid', statusText: `Pago dia ${new Date().getDate().toString().padStart(2, '0')}` }
          : u,
      ),
    );
    toast({
      tone: 'success',
      title: 'Recebimento registrado',
      message: 'No app real, a baixa automática faz isso sem você clicar.',
    });
  };

  const remind = (u: SimpleUnit) => {
    toast({
      tone: 'info',
      title: `Lembrete para ${u.tenant}`,
      message: 'Sai pelo seu WhatsApp: 3 dias antes, no dia e 3 dias depois.',
    });
  };

  return (
    <div className={s.stack}>
      {/* cabeçalho com o mês e a navegação — CardHeader é o padrão do app */}
      <Card padding={pad}>
        <CardHeader
          title="Este mês"
          subtitle="Tudo o que entra e o que ainda falta"
          action={
            <div className={s.monthNav}>
              <IconButton
                icon="chevron-left"
                label="Mês anterior"
                size={36}
                onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
                disabled={monthIndex === 0}
              />
              <span className={s.monthLabel}>{month}</span>
              <IconButton
                icon="chevron-right"
                label="Próximo mês"
                size={36}
                onClick={() => setMonthIndex((i) => Math.min(SIMPLE_MONTHS.length - 1, i + 1))}
                disabled={monthIndex === SIMPLE_MONTHS.length - 1}
              />
            </div>
          }
        />
      </Card>

      {/* resumo: recebidos de esperados */}
      <Card padding={pad}>
        <div className={s.summary}>
          <Metric
            value={`R$ ${received.toLocaleString('pt-BR')}`}
            label={`de R$ ${expected.toLocaleString('pt-BR')} esperados`}
            size="lg"
          />
          <p className={s.summaryMissing}>
            {missing > 0 ? `Faltam R$ ${missing.toLocaleString('pt-BR')}` : 'Tudo recebido neste mês'}
          </p>
        </div>
        <div className={s.summaryTrack}>
          <div className={s.summaryFill} style={{ width: `${pct}%` }} />
        </div>
        <p className={s.summaryPct}>{pct}% recebido</p>
      </Card>

      {/* um card por unidade */}
      <div className={s.unitList}>
        {units.map((u) => (
          <Card key={u.id} padding={pad} className={s.unitCard}>
            <div className={s.unitHead}>
              <div className={s.unitNames}>
                <h3 className={s.unitName}>{u.unit}</h3>
                <p className={s.unitTenant}>{u.tenant}</p>
              </div>
              <div className={s.unitRent}>
                <span className={s.unitRentValue}>R$ {u.rent.toLocaleString('pt-BR')}</span>
                <span className={s.unitRentLabel}>aluguel</span>
              </div>
            </div>

            <div className={s.unitStatus}>
              <Icon
                name={MOOD_ICON[u.mood]}
                size={20}
                className={s.unitStatusIcon}
              />
              <span className={s.unitStatusText}>{u.statusText}</span>
              <Badge tone={MOOD_TONE[u.mood]}>
                {u.mood === 'paid' ? 'Recebido' : u.mood === 'late' ? 'Atrasado' : 'A vencer'}
              </Badge>
            </div>

            <div className={s.unitActions}>
              <Button
                size="lg"
                icon="check"
                onClick={() => receive(u.id)}
                disabled={u.mood === 'paid'}
              >
                {u.mood === 'paid' ? 'Já recebido' : 'Recebi'}
              </Button>
              <Button size="lg" variant="secondary" icon="message-circle" onClick={() => remind(u)}>
                Lembrar no WhatsApp
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* "Como funciona" curto, como manda a R7 */}
      <Card padding={pad}>
        <CardHeader title="Como funciona" subtitle="Só dois botões" />
        <p className={s.caption}>
          <strong>Recebi</strong> dá baixa no aluguel do mês. Se o Mercado Pago estiver
          conectado, isso acontece sozinho e o botão fica desativado.{" "}
          <strong>Lembrar no WhatsApp</strong> manda o aviso pelo seu WhatsApp: 3 dias antes,
          no dia e 3 dias depois do vencimento.
        </p>
      </Card>
    </div>
  );
}
