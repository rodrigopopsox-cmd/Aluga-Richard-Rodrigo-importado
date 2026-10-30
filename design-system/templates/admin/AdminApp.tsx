'use client';

import { useCallback, useState } from 'react';
import { Button, Checkbox, Dialog, Input, SegmentedControl, Select, Toast, type ToastProps } from '../../components';
import { AnalyticsScreen } from './AnalyticsScreen';
import { ChargesScreen } from './ChargesScreen';
import { ContractsScreen } from './ContractsScreen';
import { DashboardScreen } from './DashboardScreen';
import { tasks as initialTasks, properties, type Task } from './data';
import { ExpensesScreen } from './ExpensesScreen';
import { FinanceScreen } from './FinanceScreen';
import { LoginScreen } from './LoginScreen';
import { MaintenanceScreen } from './MaintenanceScreen';
import { OnboardingScreen } from './OnboardingScreen';
import { PlansScreen } from './PlansScreen';
import { PropertiesScreen } from './PropertiesScreen';
import { Shell, type DashView, type ModuleId } from './Shell';
import { SimpleModeScreen } from './SimpleModeScreen';
import { TenantsScreen } from './TenantsScreen';
import { useSettings } from './useSettings';
import { useStoredState } from './useStoredState';
import styles from './AdminApp.module.css';

export type ToastInput = Pick<ToastProps, 'tone' | 'title' | 'message'>;

/** Rótulo discreto que a demonstração mostra no topo do painel. */
export const DEMO_BADGE = 'Demonstração · dados ilustrativos';

export interface AdminAppProps {
  /**
   * `login` (padrão) é o fluxo de sempre: login simulado e depois o painel.
   * `demo` abre o painel direto, sem login e sem onboarding — é a experiência
   * comercial servida em `/demonstracao`.
   */
  mode?: 'login' | 'demo';
}

/**
 * Click-through admin template: Login → Painel (Visão geral / Análises) → Imóveis → Manutenção → Recebimentos → Cobranças → Planos.
 * Demo state only (fake data; auth flag and current module in localStorage). Use it as the starting composition for real screens.
 *
 * DOIS FLUXOS DE ENTRADA, UM SÓ PAINEL. O `AdminApp` apenas escolhe o caminho:
 * `AdminLogin` monta `aluga_kit_auth`; `AdminPanel` é o painel em si. No modo
 * demonstração o `AdminLogin` não é montado, então a chave de autenticação não é
 * lida nem escrita — a demonstração não consegue interferir no fluxo "Entrar".
 */
export function AdminApp({ mode = 'login' }: AdminAppProps) {
  if (mode === 'demo') return <AdminPanel demo />;
  return <AdminLogin />;
}

/** Fluxo "Entrar". É o único lugar que monta a chave de autenticação. */
function AdminLogin() {
  const [auth, setAuth] = useStoredState<'0' | '1'>('aluga_kit_auth', '0');
  if (auth !== '1') return <LoginScreen onLogin={() => setAuth('1')} />;
  return <AdminPanel onLogout={() => setAuth('0')} />;
}

interface AdminPanelProps {
  /** Demonstração: sem login, sem onboarding, e a saída volta para o site. */
  demo?: boolean;
  /** Só no fluxo com login. Na demonstração a saída é "Voltar ao site". */
  onLogout?: () => void;
}

function AdminPanel({ demo = false, onLogout }: AdminPanelProps) {
  // A demonstração navega com chave própria: visitar `/demonstracao` não muda o
  // módulo em que o fluxo "Entrar" cai.
  const [module, setModule] = useStoredState<ModuleId>(
    demo ? 'aluga_demo_module' : 'aluga_kit_module',
    'dash',
  );
  const [view, setView] = useState<DashView>('overview');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ title: '', where: properties[0], urgent: false });
  const [toasts, setToasts] = useState<Array<ToastInput & { id: number }>>([]);
  const settings = useSettings();
  // Passos do onboarding concluídos (ids separados por vírgula). Persistido para a
  // tela não voltar a cada reload — no app real isso vem do banco.
  //
  // NA DEMONSTRAÇÃO o bloqueio é ignorado (`demo ||`) e `toggleOnb` não escreve:
  // `aluga_onboarding` fica exatamente como o fluxo "Entrar" deixou.
  const [onbRaw, setOnbRaw] = useStoredState<string>('aluga_onboarding', '');
  const onbDone = onbRaw ? onbRaw.split(',').filter(Boolean) : [];
  const onbComplete = demo || onbRaw.split(',').filter(Boolean).length >= 5;
  const toggleOnb = useCallback(
    (id: string) => {
      if (demo) return;
      const next = onbDone.includes(id) ? onbDone.filter((x) => x !== id) : [...onbDone, id];
      setOnbRaw(next.join(','));
    },
    [demo, onbDone, onbRaw, setOnbRaw],
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

  // Na demonstração não existe logout: a saída volta para a landing e não
  // encosta em `aluga_kit_auth`.
  const exit = demo
    ? {
        label: 'Voltar ao site',
        icon: 'chevron-left' as const,
        run: () => {
          window.location.href = '/';
        },
      }
    : undefined;

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

  return (
    <>
      <Shell
        module={module}
        setModule={goTo}
        view={view}
        setView={setView}
        onLogout={onLogout}
        exit={exit}
        badge={demo ? DEMO_BADGE : undefined}
        settings={settings}
      >
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
          if (module === 'props') return <PropertiesScreen bp={bp} toast={toast} go={goTo} />;
          if (module === 'maint') return <MaintenanceScreen bp={bp} tasks={tasks} setTasks={setTasks} onAddTask={() => setAdding(true)} toast={toast} />;
          if (module === 'plans') return <PlansScreen bp={bp} toast={toast} />;
          if (module === 'charges') return <ChargesScreen bp={bp} toast={toast} />;
          if (module === 'tenants') return <TenantsScreen bp={bp} toast={toast} />;
          if (module === 'contracts') return <ContractsScreen bp={bp} toast={toast} />;
          if (module === 'expenses') return <ExpensesScreen bp={bp} toast={toast} />;
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
