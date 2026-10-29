'use client';

import { useEffect, useState } from 'react';
import { DashboardScreen } from '../../design-system/templates/admin/DashboardScreen';
import { SimpleModeScreen } from '../../design-system/templates/admin/SimpleModeScreen';
import { tasks as TASKS_REAIS, type Task } from '../../design-system/templates/admin/data';
import type { ToastInput } from '../../design-system/templates/admin/AdminApp';
import { useBreakpoint } from '../../design-system/templates/admin/useBreakpoint';
import s from './page.module.css';

/**
 * A ÚLTIMA ETAPA da apresentação: o painel e as três coisas que se
 * configura nele.
 *
 * QUATRO ESTADOS, UM POR TELA DE ROLAGEM. Não tem clique para descobrir:
 *
 *   01  Modo Completo  — a Visão geral inteira, com as fotos das casas
 *   02  Modo Simples   — a tela "Este mês", um cartão por unidade
 *   03  Tema escuro    — o painel completo, escuro
 *   04  Letra maior    — o painel completo, com a acessibilidade ligada
 *
 * Começa no **Completo**, que é o modo padrão do produto e o que a pessoa
 * vê ao entrar. As duas formas de ver vêm primeiro (Completo, Simples) e
 * depois as duas configurações (escuro, letra maior) — a ordem em que o
 * próprio produto as apresenta.
 *
 * O tema escuro e a letra maior são demonstrados no painel **completo**, e
 * não no simples: é a tela com mais texto miúdo (rótulos de 13px, números,
 * tabelas), então é onde a configuração faz diferença visível. Aplicar o
 * tema na tela mais vazia esconderia exatamente o problema que ele resolve.
 *
 * Quem rola vê um substituir o outro, na ordem. Quem rola para cima
 * desfaz. Não há timer, não há `preventDefault`, não há captura da rodinha
 * — a mesma régua do resto da apresentação, só com granularidade mais fina
 * dentro desta etapa.
 *
 * AS TELAS SÃO AS DO PRODUTO. `SimpleModeScreen` e `DashboardScreen` são os
 * componentes que o painel renderiza, com os dados de demonstração deles.
 * Nada foi remontado à mão: se o painel muda, esta etapa muda junto.
 *
 * POR QUE A TELA COMPLETA CABE NUMA CAIXA. A Visão geral é mais alta que
 * uma viewport, e dentro de uma etapa sticky o que passa da tela ficaria
 * inalcancável. A caixa de pré-visualização limita a altura e some o fundo
 * com um degradê — o mesmo recurso que Linear e Vercel usam para mostrar
 * uma interface alta sem cortá-la no meio. O degradê vai para a cor da
 * moldura, então em tema escuro ele some no fundo em vez de virar uma
 * faixa cinza.
 *
 * O QUE OS BOTÕES FAZEM. Os atalhos da Visão geral ("Ver unidades",
 * "Recebimentos") levam a rolagem até a etapa da apresentação que
 * demonstra aquilo. O "Adicionar tarefa" acrescenta uma tarefa de verdade.
 * O "Recebi" da tela Simples marca a unidade e mostra o aviso. Nenhum
 * controle morto.
 */

/** Os quatro estados, na ordem em que a rolagem os apresenta. */
const MODES = [
  { label: 'Modo Completo', text: 'a visão geral inteira do painel' },
  { label: 'Modo Simples', text: 'um cartão por unidade e o que entrou no mês' },
  { label: 'Tema escuro', text: 'o mesmo painel, para quem trabalha à noite' },
  { label: 'Letra maior', text: 'o mesmo painel, para quem tem dificuldade com sistema' },
] as const;

/** Em cada beat, qual tela e com quais atributos. */
const TELAS = [
  { tela: 'completo', escuro: false, letraMaior: false },
  { tela: 'simples', escuro: false, letraMaior: false },
  { tela: 'completo', escuro: true, letraMaior: false },
  { tela: 'completo', escuro: false, letraMaior: true },
] as const;

export function PanelModes({ beat }: { beat: number }) {
  const [tasks, setTasks] = useState<Task[]>(TASKS_REAIS);
  const [toast, setToast] = useState<ToastInput | null>(null);
  // O mesmo breakpoint do painel: a tela escolhe quantas colunas usar.
  const bp = useBreakpoint();

  /**
   * O aviso desaparece sozinho.
   *
   * Duas razões, e nenhuma é estética. Primeira: a etapa é sticky, então
   * qualquer coisa que empurre o conteúdo mexe na posição do painel — e
   * "sem saltos de layout" foi exigência. Segunda: sem timer, o aviso
   * ficaria ali para sempre segurando espaço, porque nada mais o fecha.
   *
   * Por isso ele também é absoluto, não fluxo: nasce por cima do painel,
   * no mesmo lugar em que o app mostra os avisos, e não desloca nada.
   */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const mode = MODES[Math.min(beat, MODES.length - 1)];
  const { tela, escuro, letraMaior } = TELAS[Math.min(beat, TELAS.length - 1)];

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
    // O número de telas vem do próprio tour (atributo `data-screens`), não
    // de uma constante repetida aqui — se a apresentação ganhar ou perder
    // uma etapa, esta conta continua certa sozinha.
    const total = Number(secao.dataset.screens ?? 10);
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

  return (
    <div className={s.modes}>
      {/* ---------- qual dos quatro estados está na tela ---------- */}
      <div className={s.modesCaption}>
        <span className={s.modesCaptionNum}>
          {String(beat + 1).padStart(2, '0')}
          <span className={s.modesCaptionSep}>/</span>
          {String(MODES.length).padStart(2, '0')}
        </span>
        <span className={s.modesCaptionLabel}>{mode.label}</span>
        <span className={s.modesCaptionText}>{mode.text}</span>
      </div>

      {/*
        A moldura carrega `data-theme` e `data-a11y`. Os dois são atributos
        de elemento, não exclusivos do `<html>`, então o tema escuro e a
        letra maior funcionam aqui dentro sem sequestrar a landing. No app
        os atributos vão no `<html>` e valem para o painel todo.
      */}
      <div
        className={s.modesFrame}
        data-theme={escuro ? 'dark' : undefined}
        data-a11y={letraMaior ? 'on' : undefined}
      >
        <div className={s.modesPreview}>
          {tela === 'simples' ? (
            <SimpleModeScreen bp={bp} toast={setToast} />
          ) : (
            <DashboardScreen bp={bp} tasks={tasks} onAddTask={addTask} go={go} />
          )}
        </div>
        {/* Degradê que some com o fundo: diz "tem mais embaixo" sem cortar
            a interface no meio. Vai para a cor da moldura, então em tema
            escuro ele desaparece no fundo. */}
        <div className={s.modesFade} aria-hidden="true" />

        {/* ---------- o aviso do que acabou de acontecer ----------
            Absoluto, por cima do painel e por cima do degradê: não
            desloca nada (a etapa é sticky) e nasce no mesmo lugar em que
            o app mostra avisos. Some sozinho em 5s. */}
        {toast && (
          <div className={s.modesToast} role="status">
            <span className={s.modesToastTitle}>{toast.title}</span>
            {toast.message && <span className={s.modesToastMsg}>{toast.message}</span>}
          </div>
        )}
      </div>

      {/* ---------- o recado de honestidade ---------- */}
      <p className={s.modesNote}>
        São as telas do painel, com os dados de demonstração delas. Nada aqui cobra, baixa ou
        altera registro.
      </p>
    </div>
  );
}
