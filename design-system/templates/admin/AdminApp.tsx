'use client';

import { useCallback, useState } from 'react';
import { Button, Checkbox, Dialog, Input, SegmentedControl, Select, Toast, type ToastProps } from '../../components';
import { AnalyticsScreen } from './AnalyticsScreen';
import { DashboardScreen } from './DashboardScreen';
import { tasks as initialTasks, properties, type Task } from './data';
import { FinanceScreen } from './FinanceScreen';
import { LoginScreen } from './LoginScreen';
import { MaintenanceScreen } from './MaintenanceScreen';
import { OnboardingScreen } from './OnboardingScreen';
import { PlansScreen } from './PlansScreen';
import { PropertiesScreen } from './PropertiesScreen';
import { Shell, type DashView, type ModuleId } from './Shell';
import { SimpleModeScreen } from './SimpleModeScreen';
import { useSettings } from './useSettings';
import { useStoredState } from './useStoredState';
import styles from './AdminApp.module.css';

export type ToastInput = Pick<ToastProps, 'tone' | 'title' | 'message'>;

/**
 * Click-through admin template: Login → Painel (Visão geral / Análises) → Imóveis → Manutenção → Financeiro.
 * Demo state only (fake data; auth flag and current module in localStorage). Use it as the starting composition for real screens.
 */
export function AdminApp() {
  const [auth, setAuth] = useStoredState<'0' | '1'>('aluga_kit_auth', '0');
  const [module, setModule] = useStoredState<ModuleId>('aluga_kit_module', 'dash');
  const [view, setView] = useState<DashView>('overview');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ title: '', where: properties[0], urgent: false });
  const [toasts, setToasts] = useState<Array<ToastInput & { id: number }>>([]);
  const settings = useSettings();
  // Passos do onboarding concluídos (ids separados por vírgula). Persistido para a
  // tela não voltar a cada reload — no app real isso vem do banco.
  const [onbRaw, setOnbRaw] = useStoredState<string>('aluga_onboarding', '');
  const onbDone = onbRaw ? onbRaw.split(',').filter(Boolean) : [];
  const onbComplete = onbRaw.split(',').filter(Boolean).length >= 5;
  const toggleOnb = useCallback(
    (id: string) => {
      const next = onbDone.includes(id) ? onbDone.filter((x) => x !== id) : [...onbDone, id];
      setOnbRaw(next.join(','));
    },
    [onbDone, onbRaw, setOnbRaw],
  );

  const goTo = (m: ModuleId) => {
    setModule(m);
    window.scrollTo(0, 0);
  };

  const toast = useCallback((t: ToastInput) => {
    const id = Date.now() + Math.random();
    setToasts((x) => [...x, { tone: 'success', ...t, id }]);
    window.setTimeout(() => setToasts((x) => x.filter((y) => y.id !== id)), 3200);
  }, []);

  const login = () => setAuth('1');
  const logout = () => setAuth('0');
  const closeDialog = useCallback(() => setAdding(false), []);
  const save = () => {
    if (!draft.title.trim()) return;
    setTasks((ts) => [
      {
        id: Date.now(),
        title: draft.title,
        where: draft.where,
        progress: 5,
        tone: draft.urgent ? 'brand' : 'light',
        people: [{ name: 'Rodrigo Alves' }],
        status: draft.urgent ? 'Urgente' : 'Agendada',
        due: '—',
      },
      ...ts,
    ]);
    setAdding(false);
    setDraft({ title: '', where: properties[0], urgent: false });
    toast({ title: 'Tarefa criada', message: 'A equipe de manutenção foi notificada.' });
  };

  if (auth !== '1') return <LoginScreen onLogin={login} />;

  return (
    <>
      <Shell module={module} setModule={goTo} view={view} setView={setView} onLogout={logout} settings={settings}>
        {(bp) => {
          if (module === 'dash') {
            // Enquanto os 5 passos não estão feitos, o painel É o onboarding.
            if (!onbComplete) return <OnboardingScreen bp={bp} done={onbDone} toggle={toggleOnb} />;
            // Modo simples é a tela "Este mês" da spec (R7), não um painel filtrado:
            // cards por unidade, status em palavras, botões Recebi e Lembrar.
            if (settings.view === 'simple') return <SimpleModeScreen bp={bp} toast={toast} />;
            return (
              <>
                {bp === 'm' && (
                  <SegmentedControl
                    className={styles.mobileTabs}
                    options={[
                      { value: 'overview', label: 'Visão geral' },
                      { value: 'analytics', label: 'Análises' },
                    ]}
                    value={view}
                    onChange={(v) => setView(v as DashView)}
                  />
                )}
                {view === 'analytics' ? (
                  <AnalyticsScreen bp={bp} />
                ) : (
                  <DashboardScreen bp={bp} tasks={tasks} onAddTask={() => setAdding(true)} go={goTo} />
                )}
              </>
            );
          }
          if (module === 'props') return <PropertiesScreen bp={bp} toast={toast} />;
          if (module === 'maint') return <MaintenanceScreen bp={bp} tasks={tasks} setTasks={setTasks} onAddTask={() => setAdding(true)} toast={toast} />;
          if (module === 'plans') return <PlansScreen bp={bp} toast={toast} />;
          return <FinanceScreen bp={bp} toast={toast} />;
        }}
      </Shell>
      <Dialog
        open={adding}
        onClose={closeDialog}
        title="Nova tarefa"
        subtitle="Manutenção"
        footer={
          <>
            <Button variant="secondary" onClick={closeDialog}>
              Cancelar
            </Button>
            <Button onClick={save} disabled={!draft.title.trim()}>
              Salvar tarefa
            </Button>
          </>
        }
      >
        <Input label="Título" variant="white" placeholder="Ex.: Troca do chuveiro" value={draft.title} onChange={(v) => setDraft((d) => ({ ...d, title: v }))} />
        <Select label="Imóvel" options={properties} value={draft.where} onChange={(v) => setDraft((d) => ({ ...d, where: v }))} />
        <Checkbox checked={draft.urgent} onChange={(v) => setDraft((d) => ({ ...d, urgent: v }))} label="Marcar como urgente" />
      </Dialog>
      <div className={styles.toasts}>
        {toasts.map((t) => (
          <Toast key={t.id} tone={t.tone} title={t.title} message={t.message} onClose={() => setToasts((x) => x.filter((y) => y.id !== t.id))} />
        ))}
      </div>
    </>
  );
}
