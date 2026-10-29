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
  ProgressPill,
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
import { tasks } from '../../design-system/templates/admin/data';
import { OCCUPANCY } from '../../design-system/templates/admin/receiptsData';
import s from './page.module.css';

/**
 * A seção "E você escolhe como quer ver" — o painel do Aluga rodando de
 * verdade dentro da landing, nos dois modos.
 *
 * MOSTRA COISAS DE VERDADE, NÃO DESENHADAS:
 *
 *   1. **A tela do Modo simples** — os mesmos `Card`, `CardHeader`,
 *      `Metric`, `Badge` e `Button` do app, com os mesmos dados de
 *      `simpleModeData`. O status é frase ("Pago dia 05"), não só cor.
 *   2. **A Visão geral do modo Completo** — as mesmas seções do
 *      `DashboardScreen`: unidades, visitas, novos contratos, ocupação,
 *      manutenção, próximo vencimento, insights, saúde financeira e
 *      receita. Os números são os que o painel mostra.
 *   3. **O menu de configurações** — a engrenagem, com o switch de
 *      Acessibilidade, o Simples/Completo e o Claro/Escuro. São os mesmos
 *      componentes (`Switch`, `SegmentedControl`) e os MESMOS TEXTOS do
 *      `SettingsMenu` do painel.
 *   4. **Os dois modos funcionando** — ligar Acessibilidade aumenta o
 *      texto aqui dentro; ligar Escuro escurece o quadro; trocar
 *      Simples/Completo troca o conteúdo. Não é controle morto.
 *
 * POR QUE OS TEXTOS SÃO COPIA FIEL DO PAINEL. A dica do seletor
 * Simples/Completo diz, no painel: "Completo mostra tudo: ocupação,
 * visitas, manutenção, insights e saúde financeira. Simples encurta o
 * painel para as unidades, quanto entrou no mês e o que vence agora."
 * A landing antes escrevia outra coisa ("Completo mostra também quanto
 * rendeu") e o modo Completo só acrescentava dois cartões — a promessa
 * não batia com o produto. Agora a frase é a do painel e o conteúdo é o
 * que ela descreve.
 *
 * POR QUE O EFEITO FICA PRESO NO QUADRO. Os tokens de acessibilidade e de
 * tema escuro são atributos de elemento (`[data-a11y='on']`,
 * `[data-theme='dark']`), não exclusivos do `<html>`. Então dá para
 * aplicá-los **neste quadro** e mostrar o resultado sem sequestrar a
 * página inteira. No app o atributo vai no `<html>` e vale para o painel
 * todo.
 *
 * O QUE NÃO ENTROU, E POR QUÊ. Os cartões com foto do painel
 * ("Ed. Aurora", "Total de Unidades" com imagem) e os atalhos de navegação
 * ("Ver unidades", "Recebimentos") não estão aqui. Navegar não levaria a
 * lugar nenhum nesta página, e controle que não faz nada é pior que
 * controle ausente — já foi regra desta casa. O conteúdo e os números são
 * os do painel; só a navegação ficou de fora.
 */
export function MeuMesDemo() {
  const [open, setOpen] = useState(false);
  const [a11y, setA11y] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [view, setView] = useState<'simple' | 'full'>('simple');
  const [units, setUnits] = useState<SimpleUnit[]>(SIMPLE_UNITS);
  /** Unidades com lembrete de WhatsApp agendado nesta sessão. */
  const [reminded, setReminded] = useState<string[]>([]);

  // Duas unidades na demo: o bastante para ler o padrão do cartão sem
  // estourar a altura da seção. Os dados são os reais.
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

  /**
   * "Lembrar no WhatsApp". No app real o lembrete sai 3 dias antes, no dia
   * e 3 dias depois. Aqui ele não pode sair — então ele marca a unidade e
   * diz que agendou, que é o que dá para fazer honestamente sem mandar
   * mensagem de verdade. Antes o botão não tinha ação nenhuma.
   */
  const remind = (id: string): void => {
    setReminded((prev) => (prev.includes(id) ? prev : [...prev, id]));
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
              size="md"
              label="Como prefere ver?"
              options={[
                { value: 'simple', label: 'Simples' },
                { value: 'full', label: 'Completo' },
              ]}
              value={view}
              onChange={(v) => setView(v as 'simple' | 'full')}
            />
            {/* Texto copiado do SettingsMenu do painel. Se ele mudar lá,
                muda aqui — é a mesma promessa. */}
            <span className={s.mesHint}>
              Completo mostra tudo: ocupação, visitas, manutenção, insights e saúde financeira.
              Simples encurta o painel para as unidades, quanto entrou no mês e o que vence agora.
            </span>
          </div>

          <div className={s.mesBlock}>
            <span className={s.mesLabel}>Tema</span>
            <SegmentedControl
              size="md"
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

      {/* ================================================== *
       * MODO SIMPLES — a tela "Este mês"
       * ================================================== */}
      {view === 'simple' && (
        <>
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
                <Button
                  size="lg"
                  variant="secondary"
                  icon="message-circle"
                  onClick={() => remind(u.id)}
                  disabled={reminded.includes(u.id)}
                >
                  {reminded.includes(u.id) ? 'Lembrete agendado' : 'Lembrar no WhatsApp'}
                </Button>
              </div>

              {reminded.includes(u.id) && (
                <p className={s.mesUnitReminded}>
                  No app, o lembrete sai sozinho 3 dias antes, no dia e 3 dias depois.
                </p>
              )}
            </Card>
          ))}
        </>
      )}

      {/* ================================================== *
       * MODO COMPLETO — a Visão geral do painel
       *
       * As mesmas seções do DashboardScreen, com os mesmos números.
       * Ordem: a linha de indicadores, depois os dois blocos largos
       * (manutenção e próximo vencimento), depois saúde e receita.
       * ================================================== */}
      {view === 'full' && (
        <div className={s.mesFull}>
          <Card padding="var(--space-4-5)">
            <CardHeader title="Total de" subtitle="Unidades" size="sm" />
            <div className={s.mesMetricSlot}>
              <Metric value="432" size="md" />
            </div>
          </Card>

          <Card padding="var(--space-4-5)">
            <CardHeader title="Visitas" subtitle="Hoje" size="sm" />
            <div className={s.mesMetricSlot}>
              <Metric value="56" size="md" />
            </div>
          </Card>

          <Card padding="var(--space-4-5)">
            <CardHeader title="Novos" subtitle="Contratos" size="sm" />
            <div className={s.mesMetricSlot}>
              <Metric value="32" size="md" />
            </div>
            <div className={s.mesDelta}>
              <Badge tone="success">+12</Badge>
              <span className={s.mesDeltaLabel}>esta semana</span>
            </div>
          </Card>

          <Card padding="var(--space-4-5)">
            <CardHeader title="Ocupação" subtitle="do mês" size="sm" />
            <div className={s.mesMetricSlot}>
              <Metric value={`${OCCUPANCY.month}%`} size="md" />
            </div>
          </Card>

          <Card padding="var(--space-4-5)" className={s.mesWide}>
            <CardHeader title="Manutenção" subtitle="Atividade" size="sm" />
            <div className={s.mesCaption}>Status das tarefas em andamento</div>
            <div className={s.mesPills}>
              {tasks.slice(0, 3).map((t) => (
                <ProgressPill key={t.id} label={t.title} value={t.progress} tone={t.tone} />
              ))}
            </div>
          </Card>

          <Card padding="var(--space-4-5)" className={s.mesWide}>
            <CardHeader title="Saúde" subtitle="Financeira" size="sm" />
            <div className={s.mesHealthHead}>
              <span className={s.mesHealthWord}>Ótima</span>
              <span className={s.mesHealthPct}>96%</span>
            </div>
            <div className={s.mesHealthList}>
              {(
                [
                  ['Adimplência', 94],
                  ['Inadimplência', 6],
                ] as const
              ).map(([label, v]) => (
                <div key={label} className={s.mesHealthRow}>
                  <span className={s.mesHealthLabel}>{label}</span>
                  <div className={s.mesHealthTrack}>
                    <div
                      className={v > 50 ? s.mesFillNeutral : s.mesFillAlert}
                      style={{ width: `${Math.max(v, 12)}%` }}
                    >
                      {v}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="var(--space-4-5)" className={s.mesWide}>
            <CardHeader title="Insights" subtitle="Assistente IA" size="sm" />
            <div className={s.mesAnalysing}>
              sistema analisando <span className={s.mesDot}>•</span>
            </div>
            <p className={s.mesInsightText}>
              Previsão de ocupação total: 65 dias
              <br />
              <span className={s.mesInsightPositive}>
                Reajuste sugerido em 3 unidades: +4,5%
              </span>
            </p>
          </Card>

          <Card padding="var(--space-4-5)" className={s.mesWide}>
            <CardHeader title="Receita" subtitle="Mensal" size="sm" />
            <div className={s.mesMetricSlot}>
              <Metric value="R$ 124K" size="md" />
            </div>
          </Card>
        </div>
      )}

      {/* ---------- o recado de honestidade ---------- */}
      <p className={s.mesNote}>
        {view === 'simple'
          ? 'Ligado de verdade, a baixa vem sozinha do Mercado Pago ou do "Recebeu?" no WhatsApp — o botão fica aí só para você experimentar.'
          : 'Estas são as seções da Visão geral do painel. Os atalhos que navegam entre telas ficaram de fora: aqui não levariam a lugar nenhum.'}
      </p>
    </div>
  );
}
