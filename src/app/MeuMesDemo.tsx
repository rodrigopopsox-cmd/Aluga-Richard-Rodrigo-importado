'use client';

import { useState } from 'react';
import { IconButton, SegmentedControl, Switch, Wordmark } from '@design-system';
import { SimpleModeScreen } from '../../design-system/templates/admin/SimpleModeScreen';
import { DashboardScreen } from '../../design-system/templates/admin/DashboardScreen';
import { tasks as TASKS_REAIS, type Task } from '../../design-system/templates/admin/data';
import type { ToastInput } from '../../design-system/templates/admin/AdminApp';
import { useBreakpoint } from '../../design-system/templates/admin/useBreakpoint';
import s from './page.module.css';

/**
 * A seção "Você configura do seu jeito" — o painel do Aluga rodando de
 * verdade dentro da landing, nos dois modos.
 *
 * NÃO É CÓPIA DESENHADA. São as telas de verdade do produto:
 *
 *   · **Simples**  → `SimpleModeScreen`, a mesma tela que o painel mostra
 *     quando a pessoa escolhe Simples. Mesmos componentes, mesmos dados de
 *     `simpleModeData`, status escrito em palavras ("Pago dia 05") e não só
 *     cor.
 *   · **Completo** → `DashboardScreen`, a Visão geral inteira: os cartões
 *     com foto das casas, ocupação, manutenção, próximo vencimento,
 *     insights, saúde financeira e receita. Nada foi refeito à mão e nada
 *     foi inventado — se o painel muda, esta seção muda junto.
 *
 * O MENU DE CONFIGURAÇÕES é o mesmo do painel: engrenagem, switch de
 * Acessibilidade, Simples/Completo e Claro/Escuro, com os MESMOS TEXTOS do
 * `SettingsMenu`. Ligar Acessibilidade aumenta o texto aqui dentro; ligar
 * Escuro escurece o quadro; trocar Simples/Completo troca a tela. Nenhum
 * dos três é controle morto.
 *
 * PORQUE O EFEITO FICA PRESO NO QUADRO. Os tokens de acessibilidade e de
 * tema escuro são atributos de elemento (`[data-a11y='on']`,
 * `[data-theme='dark']`), não exclusivos do `<html>`. Então dá para
 * aplicá-los **neste quadro** e mostrar o resultado sem sequestrar a
 * página inteira. No app o atributo vai no `<html>` e vale para o painel
 * todo.
 *
 * O QUE OS BOTÕES DA TELA FAZEM AQUI. A Visão geral tem atalhos que, no
 * painel, trocam de módulo ("Ver unidades", "Recebimentos"). Aqui eles
 * levam à etapa da apresentação que mostra aquilo — Imóveis ou
 * Recebimentos. Continuam fazendo o que prometem, só que dentro desta
 * página. O "Adicionar tarefa" acrescenta uma tarefa de verdade à lista.
 */
export function MeuMesDemo() {
  const [open, setOpen] = useState(false);
  const [a11y, setA11y] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [view, setView] = useState<'simple' | 'full'>('simple');
  const [tasks, setTasks] = useState<Task[]>(TASKS_REAIS);
  const [toast, setToast] = useState<ToastInput | null>(null);
  // O mesmo breakpoint do painel: a tela escolhe quantas colunas usar, e não
  // a landing. Num quadro estreito (celular) a grade fecha para duas colunas
  // em vez de espremer quatro.
  const bp = useBreakpoint();

  /**
   * Atalhos da Visão geral. Cada módulo do painel vira a etapa da
   * apresentação que demonstra aquilo; quem não tem etapa equivalente cai
   * no começo da apresentação, que é o produto como um todo.
   */
  const ETAPA: Record<string, number> = {
    props: 0, // Imóveis
    contracts: 1,
    charges: 2,
    fin: 3, // Recebimentos
    expenses: 5, // Rentabilidade
  };

  const go = (modulo: string): void => {
    const etapa = ETAPA[modulo] ?? 0;
    const secao = document.getElementById('tour');
    if (!secao) return;
    // A mesma conta do ProductTour: uma tela de rolagem por etapa.
    const total = 6;
    const span = (secao.offsetHeight - window.innerHeight) / total;
    const top = secao.getBoundingClientRect().top + window.scrollY + etapa * span + 1;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  /** "Adicionar tarefa" — acrescenta uma tarefa real à lista da tela. */
  const addTask = (): void => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: 'Nova tarefa',
        where: 'A definir',
        progress: 0,
        tone: 'light',
        people: [],
        status: 'Agendada',
        due: '—',
      },
    ]);
    setToast({
      tone: 'info',
      title: 'Tarefa adicionada',
      message: 'No app real, ela abre um formulário antes de salvar.',
    });
  };

  const showToast = (t: ToastInput): void => setToast(t);

  return (
    <div
      className={s.mesFrame}
      data-a11y={a11y ? 'on' : undefined}
      data-theme={theme === 'dark' ? 'dark' : undefined}
    >
      {/* ---------- barra do app: marca, mês, engrenagem ---------- */}
      <div className={s.mesBar}>
        <Wordmark size={16} />
        <span className={s.mesMonth}>
          {view === 'simple' ? 'Este mês' : 'Visão geral'}
        </span>
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
            {/* Texto copiado do SettingsMenu do painel, palavra por palavra.
                Se ele mudar lá, muda aqui — é a mesma promessa. */}
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

      {/* ---------- a tela do painel, no modo escolhido ---------- */}
      <div className={s.mesScreen}>
        {view === 'simple' ? (
          <SimpleModeScreen bp={bp} toast={showToast} />
        ) : (
          <DashboardScreen bp={bp} tasks={tasks} onAddTask={addTask} go={go} />
        )}
      </div>

      {/* ---------- recado do que acabou de acontecer ---------- */}
      {toast && (
        <div className={s.mesToast} role="status">
          <span className={s.mesToastTitle}>{toast.title}</span>
          {toast.message && <span className={s.mesToastMsg}>{toast.message}</span>}
          <button
            type="button"
            className={s.mesToastClose}
            onClick={() => setToast(null)}
            aria-label="Fechar aviso"
          >
            ×
          </button>
        </div>
      )}

      {/* ---------- o recado de honestidade ---------- */}
      <p className={s.mesNote}>
        É o painel de verdade, rodando aqui dentro — as duas telas são as do app, com os dados de
        demonstração delas. Nada aqui cobra, baixa ou altera registro.
      </p>
    </div>
  );
}
