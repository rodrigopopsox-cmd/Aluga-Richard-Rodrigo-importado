'use client';

import { useState, type CSSProperties } from 'react';
import { BarChart, Card, CardHeader, Chip, HeatScale, Legend, LineChart, Metric, SegmentedControl, Select } from '../../components';
import { revenue, visitors, type Range } from './data';
import type { Breakpoint } from './useBreakpoint';
import s from './Screens.module.css';

const VIZ = [
  { label: 'Direto', value: 27, color: 'var(--viz-blue)' },
  { label: 'Site', value: 28, color: 'var(--viz-green)' },
  { label: 'Instagram', value: 34, color: 'var(--viz-orange)' },
  { label: 'Parceiro', value: 11, color: 'var(--viz-lilac)' },
];

const HEAT = [7, 6, 4, 2, 6, 5, 3, 1, 5, 7, 6, 3, 2, 4, 5, 6, 1, 3, 2, 4, 3, 1, 2, 5];
const RANGES: Range[] = ['Dia', 'Semana', 'Mês'];

/** Painel · Análises — visitors by source, visit performance, time-to-rent, visitor flow, interest heat map, rent value trend. */
export function AnalyticsScreen({ bp }: { bp: Breakpoint }) {
  const [r1, setR1] = useState<Range>('Mês');
  const [r2, setR2] = useState<Range>('Semana');
  const cols = bp === 'd' ? 3 : bp === 't' ? 2 : 1;
  const span = (n: number): CSSProperties => ({ gridColumn: `span ${Math.min(n, cols)}` });

  return (
    <div className={s.grid} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      <Card>
        <div className={s.headRow}>
          <CardHeader title="Visitantes por" subtitle="Origem" />
          <span className={s.totalBubble}>
            <span>Total</span>
            <span className={s.totalValue}>1.562</span>
          </span>
        </div>
        <div className={s.chartRow}>
          <Legend items={VIZ.map((v) => ({ label: v.label, color: v.color, value: `${v.value}%` }))} className={s.legendCol} />
          <BarChart data={VIZ} height={110} className={s.grow} />
        </div>
      </Card>

      <Card>
        <CardHeader title="Desempenho de" subtitle="Visitas" action={<Chip icon="lightbulb">Saiba mais</Chip>} />
        <div className={`${s.split} ${s.splitThick}`}>
          <span className={s.splitBrand} style={{ flex: 62 }} />
          <span className={s.splitInk} style={{ flex: 38 }} />
        </div>
        <div className={s.twoCols}>
          <div>
            <div className={s.dotLabel}>
              <span className={`${s.dot} ${s.dotBrand}`} />
              Visitas agendadas
            </div>
            <Metric value="78%" label="Bom" size="md" className={s.mt1} />
          </div>
          <div>
            <div className={s.dotLabel}>
              <span className={`${s.dot} ${s.dotInk}`} />
              Realizadas
            </div>
            <Metric value="64%" label="Estável" size="md" className={s.mt1} />
          </div>
        </div>
      </Card>

      <Card style={bp === 't' ? span(2) : undefined}>
        <CardHeader title="Tempo médio de" subtitle="Locação" />
        <div className={`${s.endRow} ${s.mt5}`}>
          <div>
            <Metric value="18 dias" size="md" />
            <div className={`${s.small} ${s.mt2}`}>
              <span className={s.positive}>3 dias</span> a menos vs mês passado
            </div>
          </div>
          <HeatScale level={8} label="Alta procura" />
        </div>
      </Card>

      <Card style={span(2)}>
        <CardHeader
          title="Fluxo de"
          subtitle="Visitantes"
          action={
            bp === 'm' ? null : (
              <>
                <SegmentedControl size="sm" options={RANGES} value={r1} onChange={(v) => setR1(v as Range)} />
                <Select size="sm" options={['Todos os imóveis', 'Ed. Aurora', 'Residencial Pinheiros']} />
              </>
            )
          }
        />
        <Legend
          direction="row"
          className={s.legendRow}
          items={[
            { label: 'Visitantes', color: 'var(--viz-green)', line: true },
            { label: 'Recorrentes', color: 'var(--brand)', line: true },
          ]}
        />
        <LineChart
          height={220}
          series={[
            { name: 'Visitantes', color: 'var(--success)', data: visitors.a },
            { name: 'Recorrentes', color: 'var(--brand)', data: visitors.b },
          ]}
          labels={['10 out', '15 out', '20 out', '25 out', '31 out']}
          highlight={2}
          formatValue={(v) => `Visitantes: ${Math.round(v * 180).toLocaleString('pt-BR')}`}
        />
      </Card>

      <Card style={bp === 'd' ? { gridRow: 'span 2' } : undefined}>
        <CardHeader title="Mapa de interesse" subtitle="por unidade" />
        <div className={s.heatMap}>
          <div className={s.heatAxis}>
            <div className={s.heatGradient} />
            <div className={s.heatAxisLabels}>
              <span>
                Alto
                <br />
                interesse
              </span>
              <span>
                Baixo
                <br />
                interesse
              </span>
            </div>
          </div>
          <div className={s.heatGrid}>
            {HEAT.map((v, i) => (
              <span key={i} title={`Unidade ${100 + i}`} className={s.heatCell} style={{ background: `var(--heat-${v})` }} />
            ))}
          </div>
        </div>
        <div className={s.pills}>
          <span className={`${s.pill} ${s.pillBrand}`}>Livres 28%</span>
          <span className={s.pill}>Reservadas 3%</span>
          <span className={s.pill}>Vencendo 6%</span>
        </div>
      </Card>

      <Card style={span(2)}>
        <CardHeader title="Valor do aluguel" subtitle="Análise" action={<SegmentedControl size="sm" options={RANGES} value={r2} onChange={(v) => setR2(v as Range)} />} />
        <LineChart
          height={200}
          series={[{ name: 'Preço', color: 'var(--chart-ink)', data: revenue[r2] }]}
          labels={['10 out', '15 out', '20 out', '25 out', '31 out']}
          highlight={4}
          formatValue={(v) => (
            <span>
              R$ {Math.round(v * 100).toLocaleString('pt-BR')}
              <span style={{ opacity: 0.55 }}>,00</span>
            </span>
          )}
        />
      </Card>
    </div>
  );
}
