'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import { AvatarGroup, Badge, Button, Card, CardHeader, IconButton, Metric, ProgressPill, SegmentedControl } from '../../components';
import { STATUS_TONE, type Task } from './data';
import type { ToastInput } from './AdminApp';
import type { Breakpoint } from './useBreakpoint';
import s from './Screens.module.css';

type Filter = 'Abertas' | 'Concluídas' | 'Todas';

export interface MaintenanceScreenProps {
  bp: Breakpoint;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  onAddTask: () => void;
  toast: (t: ToastInput) => void;
}

/** Manutenção — filterable task list (with empty state) + performance and open-ticket tiles. */
export function MaintenanceScreen({ bp, tasks, setTasks, onAddTask, toast }: MaintenanceScreenProps) {
  const [filter, setFilter] = useState<Filter>('Abertas');
  const list = tasks.filter((t) => filter === 'Todas' || (filter === 'Abertas' ? t.progress < 100 : t.progress === 100));
  const done = (id: number) => {
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, progress: 100, tone: 'dark', status: 'Concluída' } : t)));
    toast({ title: 'Tarefa concluída', message: 'O inquilino foi notificado.' });
  };

  return (
    <div className={s.grid} style={{ gridTemplateColumns: bp === 'd' ? 'minmax(0, 2fr) minmax(0, 1fr)' : '1fr', alignItems: 'start' }}>
      <Card>
        <div className={s.toolbar}>
          <CardHeader title="Tarefas" subtitle="de manutenção" className={s.toolbarTitle} />
          <SegmentedControl size="sm" options={['Abertas', 'Concluídas', 'Todas']} value={filter} onChange={(v) => setFilter(v as Filter)} />
          <Button variant="dark" size="sm" icon="plus" onClick={onAddTask}>
            Adicionar
          </Button>
        </div>
        <div className={s.flexCol}>
          {list.map((t) => (
            <div key={t.id} className={s.taskItem}>
              <div className={s.taskHead}>
                <div className={s.taskMain}>
                  <div className={s.taskTitle}>{t.title}</div>
                  <div className={s.rowSub}>
                    {t.where} · prazo {t.due}
                  </div>
                </div>
                <Badge size="sm" dot tone={STATUS_TONE[t.status] ?? 'neutral'}>
                  {t.status}
                </Badge>
                {t.progress < 100 && <IconButton icon="check" label="Concluir" size={34} onClick={() => done(t.id)} />}
              </div>
              <ProgressPill label={t.title} value={t.progress} tone={t.tone} people={t.people} />
            </div>
          ))}
          {list.length === 0 && <div className={s.empty}>Nenhuma tarefa neste filtro.</div>}
        </div>
      </Card>
      <div className={s.grid} style={{ gridTemplateColumns: bp === 't' ? '1fr 1fr' : '1fr' }}>
        <Card>
          <CardHeader title="Desempenho da" subtitle="Manutenção" />
          <div className={s.lead}>Chamados, prestadores, prazos e andamento dos reparos em um só lugar.</div>
          <Metric value="92%" label="Resolvidas no prazo" size="lg" />
        </Card>
        <Card tone="dark">
          <CardHeader inverse title="Chamados" subtitle="abertos" />
          <div className={`${s.endRow} ${s.mt5}`}>
            <Metric inverse value={tasks.filter((t) => t.progress < 100).length} label="em andamento" />
            <AvatarGroup people={[{ name: 'Ana Lima' }, { name: 'Caio Dias' }, { name: 'Felipe Sá' }, { name: 'Gabi Luz' }]} size={30} />
          </div>
        </Card>
      </div>
    </div>
  );
}
