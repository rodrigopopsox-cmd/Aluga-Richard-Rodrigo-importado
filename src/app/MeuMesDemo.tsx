'use client';

import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Icon,
  IconButton,
  Metric,
  SegmentedControl,
  Switch,
  Wordmark,
} from '@design-system';
import {
  MOOD_TONE,
  SIMPLE_MONTHS,
  SIMPLE_UNITS,
  simpleTotals,
  type SimpleUnit,
} from '../../design-system/templates/admin/simpleModeData';
import s from './page.module.css';

/**
 * A aba "Meu mês" da demonstração.
 *
 * MOSTRA TRÊS COISAS DE VERDADE, NÃO DESENHADAS:
 *
 *   1. **A tela do Modo simples** — o mesmo `Card`, `CardHeader`, `Metric`,
 *      `Badge` e `Button` do app, com os mesmos dados de `simpleModeData`.
 *      O status é frase ("Pago dia 05"), não só cor, como a R7 manda.
 *   2. **O menu de configurações** — a engrenagem do canto, com o switch de
 *      Acessibilidade, o Simples/Completo e o Claro/Escuro. São os mesmos
 *      componentes (`Switch`, `SegmentedControl`) e os mesmos textos do
 *      `SettingsMenu` do painel.
 *   3. **Os dois modos funcionando** — ligar Acessibilidade aumenta o texto
 *      aqui dentro; ligar Escuro escurece o quadro. Não é controle morto.
 *
 * POR QUE O EFEITO FICA PRESO NO QUADRO. Os tokens de acessibilidade e de
 * tema escuro são atributos de elemento (`[data-a11y='on']`,
 * `[data-theme='dark']`), não exclusivos do `<html>`. Então dá para aplicá-los
 * **neste quadro** e mostrar o resultado sem sequestrar a página inteira —
 * o visitário mexe no interruptor e vê o que acontece, e a landing continua
 * clara. No app o atributo vai no `<html>` e vale para o painel todo.
 *
 * O "Recebi" também funciona: marca a unidade como paga e recalcula o resumo,
 * exatamente como a tela real faz.
 */
export function MeuMesDemo() {
  const [open, setOpen] = useState(false);
  const [a11y, setA11y] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [view, setView] = useState<'simple' | 'full'>('simple');
  const [units, setUnits] = useState<SimpleUnit[]>(SIMPLE_UNITS);

  // Duas unidades na demo: o bastante para ler o padrão do cartão sem
  // estourar a altura do hero. Os dados são os reais.
  const shown = units.slice(0, 2);
  const { expected, received, missing } = simpleTotals(units);
  const pct = expected > 0 ? Math.round((received / expected) * 100) : 0;

  const receive = (id: string): void => {
    setUnits((prev) =>
      prev.map((u) =>
        u.id === id && u.mood !== 'paid'
          ? { ...u, mood: 'paid', statusText: `Pago dia ${new Date().getDate().toString().padStart(2, '0')}` }
          : u,
      ),
    );
  };

  return (
    <div
      className={s.mesFrame}
      data-a11y={a11y ? 'on' : undefined}
      data-theme={theme === 'dark' ? 'dark' : undefined}
    >
      {/* ---------- barra do app: marca, mês, engrenagem ---------- */}
      <div className={s.mesBar}>
        <Wordmark size={16} />
        <span className={s.mesMonth}>{SIMPLE_MONTHS[1]}</span>
        <IconButton
          icon="settings"
          label="Configurações"
          variant="soft"
          size={40}
          onClick={() => setOpen((v) => !v)}
        />
      </div>

      {/* ---------- painel de configurações ---------- */}
      {open && (
        <div className={s.mesPanel} role="group" aria-label="Configurações de exibição">
          <span className={s.mesPanelTitle}>Configurações</span>

          <div className={s.mesBlock}>
            <Switch checked={a11y} onChange={setA11y} label="Acessibilidade" name="demo-a11y" />
            <span className={s.mesHint}>Deixa o texto e os botões maiores.</span>
          </div>

          <div className={s.mesBlock}>
            <span className={s.mesLabel}>Como prefere ver?</span>
            <SegmentedControl
              size="sm"
              label="Como prefere ver?"
              options={[
                { value: 'simple', label: 'Simples' },
                { value: 'full', label: 'Completo' },
              ]}
              value={view}
              onChange={(v) => setView(v as 'simple' | 'full')}
            />
            <span className={s.mesHint}>
              Simples encurta para as unidades e o que entrou no mês. Completo mostra também
              quanto rendeu.
            </span>
          </div>

          <div className={s.mesBlock}>
            <span className={s.mesLabel}>Tema</span>
            <SegmentedControl
              size="sm"
              label="Tema"
              options={[
                { value: 'light', label: 'Claro' },
                { value: 'dark', label: 'Escuro' },
              ]}
              value={theme}
              onChange={(v) => setTheme(v as 'light' | 'dark')}
            />
          </div>
        </div>
      )}

      {/* ---------- resumo do mês ---------- */}
      <Card padding="var(--space-4-5)">
        <CardHeader
          title="Este mês"
          subtitle="Tudo o que entra e o que ainda falta"
          action={
            <div className={s.mesMonthNav}>
              <IconButton icon="chevron-left" label="Mês anterior" size={36} />
              <span className={s.mesMonthLabel}>{SIMPLE_MONTHS[1]}</span>
              <IconButton icon="chevron-right" label="Próximo mês" size={36} />
            </div>
          }
        />
        <div className={s.mesSummary}>
          <Metric
            value={`R$ ${received.toLocaleString('pt-BR')}`}
            label={`de R$ ${expected.toLocaleString('pt-BR')} esperados`}
            size="lg"
          />
          <p className={s.mesSummaryMissing}>
            {missing > 0 ? `Faltam R$ ${missing.toLocaleString('pt-BR')}` : 'Tudo recebido neste mês'}
          </p>
        </div>
        <div className={s.mesSummaryTrack}>
          <div className={s.mesSummaryFill} style={{ width: `${pct}%` }} />
        </div>
        <p className={s.mesSummaryPct}>{pct}% recebido</p>
      </Card>

      {/* ---------- o que o "Completo" acrescenta ---------- */}
      {view === 'full' && (
        <div className={s.mesMetrics}>
          <Card padding="var(--space-4-5)">
            <CardHeader title="Receita" size="sm" />
            <div className={s.mesMetricSlot}>
              <Metric value={`R$ ${expected.toLocaleString('pt-BR')}`} size="md" />
            </div>
          </Card>
          <Card padding="var(--space-4-5)">
            <CardHeader title="A receber" size="sm" />
            <div className={s.mesMetricSlot}>
              <Metric value={`R$ ${missing.toLocaleString('pt-BR')}`} size="md" />
            </div>
          </Card>
        </div>
      )}

      {/* ---------- um cartão por unidade ---------- */}
      {shown.map((u) => (
        <Card key={u.id} padding="var(--space-4-5)" className={s.mesUnit}>
          <div className={s.mesUnitHead}>
            <div className={s.mesUnitNames}>
              <h4 className={s.mesUnitName}>{u.unit}</h4>
              <p className={s.mesUnitTenant}>{u.tenant}</p>
            </div>
            <div className={s.mesUnitRent}>
              <span className={s.mesUnitRentValue}>R$ {u.rent.toLocaleString('pt-BR')}</span>
              <span className={s.mesUnitRentLabel}>aluguel</span>
            </div>
          </div>

          <div className={s.mesUnitStatus}>
            <Icon
              name={u.mood === 'paid' ? 'circle-check' : 'circle-alert'}
              size={20}
              className={s.mesUnitStatusIcon}
            />
            <span className={s.mesUnitStatusText}>{u.statusText}</span>
            <Badge tone={MOOD_TONE[u.mood]}>
              {u.mood === 'paid' ? 'Recebido' : u.mood === 'late' ? 'Atrasado' : 'A vencer'}
            </Badge>
          </div>

          <div className={s.mesUnitActions}>
            <Button
              size="lg"
              icon="check"
              onClick={() => receive(u.id)}
              disabled={u.mood === 'paid'}
            >
              {u.mood === 'paid' ? 'Já recebido' : 'Recebi'}
            </Button>
            <Button size="lg" variant="secondary" icon="message-circle">
              Lembrar no WhatsApp
            </Button>
          </div>
        </Card>
      ))}

      {/* ---------- o recado de honestidade ---------- */}
      <p className={s.mesNote}>
        Ligado de verdade, a baixa vem sozinha do Mercado Pago ou do “Recebeu?” no WhatsApp — o
        botão fica aí só para você experimentar.
      </p>
    </div>
  );
}
