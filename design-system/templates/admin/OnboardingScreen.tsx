'use client';

import { Badge, Card, CardHeader, StepChecklist, type Step } from '../../components';
import type { Breakpoint } from './useBreakpoint';
import s from './Screens.module.css';

/**
 * Primeiros passos — onboarding.
 *
 * Conteúdo da tarefa 3 do backlog (Sprint 1):
 *   checklist de 5 passos (imóvel, inquilino e contrato, ver a primeira cobrança,
 *   conectar WhatsApp, conectar Mercado Pago) + "Como funciona" de cada tela.
 *
 * ORDEM DOS PASSOS é a do backlog — não reordenei por gosto.
 *
 * Não é um item de menu: enquanto os 5 passos não estão concluídos, esta tela
 * aparece no lugar do painel (ver AdminApp). Some sozinha no 5/5.
 *
 * O estado (`done`) vem de fora e é persistido. Aqui é só demonstração: no app
 * real cada passo se marca sozinho quando a ação acontece (imóvel cadastrado,
 * contrato criado, Mercado Pago conectado).
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

/** "Como funciona" — uma linha por termo, no vocabulário da v1. */
const HOW: Array<[string, string]> = [
  ['Imóvel', 'Cada imóvel tem uma ou mais unidades — kitnet, loja, sala. É a unidade que gera aluguel.'],
  ['Unidade', 'O que é alugado de fato. O preço, o inquilino e o contrato ficham na unidade.'],
  ['Cobrança', 'A mensalidade do mês. Nasce do contrato e vence na data combinada.'],
  ['Recebimento', 'Quando o dinheiro entra. Com o Mercado Pago conectado, a baixa é automática.'],
  ['Proprietário', 'Quem recebe. Pode ser você ou outro titular da mesma conta.'],
];

export interface OnboardingScreenProps {
  bp: Breakpoint;
  /** Ids dos passos já concluídos. */
  done: string[];
  /** Marca ou desmarca um passo. */
  toggle: (id: string) => void;
}

export function OnboardingScreen({ bp, done, toggle }: OnboardingScreenProps) {
  const mobile = bp === 'm';
  const pad = mobile ? 'var(--space-4-5)' : 'var(--card-padding)';
  const allDone = done.length === STEPS.length;

  return (
    <div className={s.stack}>
      <Card padding={pad}>
        <StepChecklist
          title="Primeiros passos"
          subtitle="Cinco passos para o app começar a trabalhar por você"
          steps={STEPS.map((st) => {
            const isDone = done.includes(st.id);
            return {
              ...st,
              done: isDone,
              onAction: () => toggle(st.id),
              actionLabel: isDone ? 'Concluído' : st.actionLabel,
            };
          })}
        />
        {allDone && (
          <p className={[s.caption, s.positive].join(' ')}>
            Tudo pronto. A partir daqui o app cobra, avisa e dá baixa sozinho — esta tela não
            aparece mais.
          </p>
        )}
      </Card>

      <Card padding={pad}>
        <CardHeader
          title="Como funciona"
          subtitle="Cinco palavras que o app usa — e o que cada uma quer dizer"
        />
        <div className={s.glossary}>
          {HOW.map(([term, meaning]) => (
            <div key={term} className={s.glossaryItem}>
              <Badge tone="soft">{term}</Badge>
              <p className={s.glossaryText}>{meaning}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
