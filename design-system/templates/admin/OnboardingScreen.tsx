'use client';

import { useState } from 'react';
import { Card, CardHeader, SegmentedControl, StepChecklist, type Step } from '../../components';
import type { ToastInput } from './AdminApp';
import type { Breakpoint } from './useBreakpoint';
import s from './Screens.module.css';

/**
 * Primeiros passos — onboarding.
 *
 * Conteúdo literal da tarefa 3 do backlog (Sprint 1):
 *   Pergunta 'Como prefere ver?' (Simples marcado)
 * + checklist de 5 passos (imóvel, inquilino e contrato, ver a primeira cobrança,
 *   conectar WhatsApp, conectar Mercado Pago)
 * + 'Como funciona' de cada tela.
 *
 * ORDEM DOS PASSOS é a do backlog — não reordenei por gosto.
 * O estado é local (demo): ligar no banco quando as telas de cadastro existirem.
 */
const STEPS: Step[] = [
  {
    id: 'imovel',
    title: 'Cadastrar o primeiro imóvel',
    description: 'Endereço, características e fotos. É o que vai gerar aluguel.',
    actionLabel: 'Cadastrar imóvel',
  },
  {
    id: 'inquilino-contrato',
    title: 'Cadastrar o inquilino e criar o contrato',
    description: 'Quem paga, por quanto e até quando. Sem contrato não tem cobrança.',
    actionLabel: 'Criar contrato',
  },
  {
    id: 'primeira-cobranca',
    title: 'Ver a primeira cobrança',
    description: 'O app gera a cobrança do mês e mostra o que vai ser cobrado.',
    actionLabel: 'Ver cobrança',
  },
  {
    id: 'whatsapp',
    title: 'Conectar o WhatsApp',
    description: 'Para os lembretes automáticos e o "Recebeu?" no dia do pagamento.',
    actionLabel: 'Conectar',
  },
  {
    id: 'mercado-pago',
    title: 'Conectar o Mercado Pago',
    description: 'Para a baixa automática: o pagamento dá baixa sem você clicar.',
    actionLabel: 'Conectar',
  },
];

/** "Como funciona" — uma linha por tela, no vocabulário da v1. */
const HOW: Array<[string, string]> = [
  ['Imóvel', 'Cada imóvel tem uma ou mais unidades — kitnet, loja, sala. É a unidade que gera aluguel.'],
  ['Unidade', 'O que é alugado de fato. O preço, o inquilino e o contrato ficham na unidade.'],
  ['Cobrança', 'A mensalidade do mês. Nasce do contrato e vence na data combinada.'],
  ['Recebimento', 'Quando o dinheiro entra. Com o Mercado Pago conectado, a baixa é automática.'],
  ['Proprietário', 'Quem recebe. Pode ser você ou outro titular da mesma conta.'],
];

export function OnboardingScreen({ bp, toast }: { bp: Breakpoint; toast: (t: ToastInput) => void }) {
  const [view, setView] = useState<'simples' | 'completo'>('simples');
  const [done, setDone] = useState<string[]>([]);
  const mobile = bp === 'm';

  const toggle = (id: string) => {
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    toast({
      tone: 'success',
      title: done.includes(id) ? 'Passo desmarcado' : 'Passo concluído',
      message: 'No app real, o estado vem do banco — aqui é só demonstração.',
    });
  };

  const allDone = done.length === STEPS.length;

  return (
    <div className={s.stack}>
      <Card padding={mobile ? 'var(--space-4-5)' : 'var(--card-padding)'}>
        <CardHeader
          title="Como prefere ver?"
          subtitle="Você pode mudar quando quiser, em Configurações"
        />
        <div className={s.mt4}>
          <SegmentedControl
            options={[
              { value: 'simples', label: 'Simples' },
              { value: 'completo', label: 'Completo' },
            ]}
            value={view}
            onChange={(v) => setView(v as 'simples' | 'completo')}
          />
        </div>
        <p className={s.caption}>
          <strong>Simples</strong> mostra só o que importa neste mês: o que entrou, o que
          falta e o que fazer agora. <strong>Completo</strong> mostra todos os períodos,
          relatórios e filtros.
        </p>
      </Card>

      <Card padding={mobile ? 'var(--space-4-5)' : 'var(--card-padding)'}>
        <StepChecklist
          title="Primeiros passos"
          subtitle="Cinco passos para o app começar a trabalhar por você"
          steps={STEPS.map((st) => ({
            ...st,
            done: done.includes(st.id),
            onAction: () => toggle(st.id),
            actionLabel: done.includes(st.id) ? 'Concluído' : st.actionLabel,
          }))}
        />
        {allDone && (
          <p className={[s.caption, s.positive].join(' ')}>
            Tudo pronto. A partir daqui o app cobra, avisa e dá baixa sozinho.
          </p>
        )}
      </Card>

      <Card padding={mobile ? 'var(--space-4-5)' : 'var(--card-padding)'}>
        <CardHeader
          title="Como funciona"
          subtitle="Cinco palavras que o app usa — e o que cada uma quer dizer"
        />
        <dl className={s.rules}>
          {HOW.map(([term, meaning]) => (
            <div key={term} className={s.rule}>
              <dt>{term}</dt>
              <dd>{meaning}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  );
}
