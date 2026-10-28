'use client';

import type { CSSProperties } from 'react';
import { Button, Card, CardHeader, Chip, IconButton, Legend, LineChart, Metric, ProgressPill, StatCard } from '../../components';
import houseOrange from '../../assets/images/house-orange.png';
import buildingGlass from '../../assets/images/building-glass.png';
import buildingBrick from '../../assets/images/building-brick.png';
import type { Task } from './data';
import type { ModuleId } from './Shell';
import type { Breakpoint } from './useBreakpoint';
import s from './Screens.module.css';

export interface DashboardScreenProps {
  bp: Breakpoint;
  tasks: Task[];
  onAddTask: () => void;
  go: (m: ModuleId) => void;
}

/** Painel · Visão geral — KPI tiles, property photo card, maintenance, next due date, insights, finance health, revenue. */
export function DashboardScreen({ bp, tasks, onAddTask, go }: DashboardScreenProps) {
  const cols = bp === 'd' ? 4 : 2;
  const gridCols = cols;
  const mobile = bp === 'm';
  const span = (n: number): CSSProperties => ({ gridColumn: `span ${Math.min(n, cols)}` });
  const full: CSSProperties = mobile ? { gridColumn: 'span 2' } : {};

  return (
    <div className={s.grid} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      <StatCard
        title="Total de"
        subtitle="Unidades"
        value="432"
        image={houseOrange.src}
        action={
          <Chip variant="glass" icon="building-2" onClick={() => go('props')}>
            Ver unidades
          </Chip>
        }
      />
      <StatCard title="Visitas" subtitle="Hoje" value="56" image={buildingGlass.src} action={<Chip variant="glass" icon="users">Agenda</Chip>} />
      <StatCard title="Novos" subtitle="Contratos" value="32" delta="+12" deltaLabel="esta semana" style={full} />

      <Card padding={0} className={s.photoCard} style={{ ...full, ...(bp === 'd' ? { gridRow: 'span 2' } : { minHeight: 320 }) }}>
        <div className={s.photoCardHead}>
          <CardHeader title="Ed. Aurora," subtitle="São Paulo · SP-04" action={<IconButton icon="maximize-2" label="Abrir imóvel" size={36} onClick={() => go('props')} />} />
        </div>
        <div className={s.photoArea}>
          <img src={buildingBrick.src} alt="Fachada do Ed. Aurora" />
          <div className={s.photoOverlay}>
            <div className={s.glassPanel}>
              <div className={s.glassLabel}>Ocupação</div>
              <div className={s.glassValue}>78%</div>
              <div className={s.glassDelta}>+6% vs mês passado</div>
            </div>
            <Chip variant="dark" icon="lightbulb">
              Saiba mais
            </Chip>
          </div>
        </div>
      </Card>


      <Card style={span(2)}>
          <CardHeader
            title="Manutenção"
            subtitle="Atividade"
          action={
            <Button variant="dark" size="sm" icon="plus" onClick={onAddTask}>
              Adicionar tarefa
            </Button>
          }
        />
        <div className={s.caption}>Status das tarefas em andamento</div>
        <div className={s.list}>
          {tasks.slice(0, 4).map((t) => (
            <ProgressPill key={t.id} label={t.title} value={t.progress} tone={t.tone} people={mobile ? undefined : t.people} />
          ))}
        </div>
      </Card>

      <Card tone="dark" className={s.between} style={{ ...full, minHeight: 220 }}>
        <CardHeader inverse title="Próximo" subtitle="vencimento" action={<IconButton icon="maximize-2" label="Financeiro" variant="inverse" size={36} onClick={() => go('fin')} />} />
        <div>
          <Metric inverse value="05" label="nov" size="lg" />
          <div className={s.countdown}>
            <span className={s.countdownLabel}>Faltam</span>
            <span className={s.countdownValue}>13 dias</span>
          </div>
        </div>
      </Card>

        <Card style={span(2)}>
          <CardHeader title="Insights" subtitle="Assistente IA" action={<IconButton icon="lightbulb" label="Insights" size={36} />} />
        <div className={s.analysing}>
          sistema analisando <span className={s.brandDot}>•</span>
        </div>
        <LineChart
          height={140}
          backdrop={false}
          series={[{ name: 'Ocupação', color: 'var(--brand)', data: [61, 64, 63, 67, 66, 71, 72, 76, 78], area: true }]}
          highlight={8}
          formatValue={(v) => `${v}%`}
        />
        <div className={s.infoBox}>
          Previsão de ocupação total: 65 dias
          <br />
          <span className={s.small}>
            Reajuste sugerido em 3 unidades: <span className={s.positive}>+4,5%</span>
          </span>
        </div>
      </Card>

      <Card className={s.between} style={{ ...full, gap: 'var(--card-gap)' }}>
          <CardHeader title="Saúde" subtitle="Financeira" action={<IconButton icon="maximize-2" label="Financeiro" size={36} onClick={() => go('fin')} />} />
        <div className={s.healthHead}>
          <span className={s.healthWord}>Ótima</span>
          <span className={s.healthPct}>96%</span>
        </div>
        <div className={s.list}>
          {(
            [
              ['Adimplência', 94],
              ['Inadimplência', 6],
            ] as const
          ).map(([label, v]) => (
            <div key={label} className={s.healthRow}>
              <span className={s.healthLabel}>{label}</span>
              <div className={s.healthTrack}>
                <div className={`${s.healthFill} ${v > 50 ? s.fillNeutral : s.fillAlert}`} style={{ width: `${Math.max(v, 12)}%` }}>
                  {v}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className={s.between} style={{ ...full, gap: 'var(--space-3-5)' }}>
        <CardHeader title="Receita" subtitle="Mensal" />
        <Metric value="R$ 124K" size="md" />
        <Legend
          direction="row"
          items={[
            { label: 'Aluguéis', color: 'var(--brand)' },
            { label: 'Taxas', color: 'var(--surface-inverse)' },
          ]}
        />
        <div className={`${s.split} ${s.splitThin}`}>
          <span className={s.splitBrand} style={{ flex: 82 }} />
          <span className={s.splitInk} style={{ flex: 18 }} />
        </div>
      </Card>
    </div>
  );
}
