'use client';

import { useEffect, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarGroup,
  Badge,
  BarChart,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Chip,
  DataTable,
  Dialog,
  HeatScale,
  Icon,
  IconButton,
  icons,
  Input,
  Legend,
  LineChart,
  Metric,
  NavPills,
  ProgressPill,
  SegmentedControl,
  Select,
  SideRail,
  StatCard,
  Switch,
  Toast,
  Tooltip,
  Wordmark,
  type BadgeTone,
  type ButtonVariant,
  type IconButtonProps,
  type IconName,
} from '@design-system';
import houseOrange from '@design-system/assets/images/house-orange.png';
import buildingGlass from '@design-system/assets/images/building-glass.png';
import buildingBrick from '@design-system/assets/images/building-brick.png';
import { installForcedStates } from './forceStates';
import styles from './Showcase.module.css';

type Theme = 'light' | 'dark';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';

const FORCE: Partial<Record<State, string>> = {
  hover: 'ds-force-hover',
  active: 'ds-force-active',
  focus: 'ds-force-focus',
};

const STATE_LABEL: Record<State, string> = {
  default: 'Padrão',
  hover: 'Hover',
  active: 'Active',
  focus: 'Focus',
  disabled: 'Disabled',
  loading: 'Loading',
};

const SECTIONS = [
  ['fundamentos', 'Fundamentos'],
  ['core', 'Core'],
  ['forms', 'Forms'],
  ['data', 'Data'],
  ['navigation', 'Navigation'],
  ['feedback', 'Feedback'],
  ['templates', 'Templates'],
] as const;

const SEMANTIC_COLORS = [
  '--brand',
  '--brand-hover',
  '--brand-soft',
  '--on-brand',
  '--text-strong',
  '--text-body',
  '--text-secondary',
  '--text-muted',
  '--text-subtle',
  '--surface-page',
  '--surface-card',
  '--surface-subtle',
  '--surface-sunken',
  '--surface-hover',
  '--surface-inverse',
  '--surface-inverse-2',
  '--border-subtle',
  '--border-default',
  '--border-strong',
  '--success',
  '--success-soft',
  '--danger',
  '--danger-soft',
  '--warning',
  '--warning-soft',
  '--focus-ring',
];

const PALETTE = [
  '--orange-50', '--orange-100', '--orange-200', '--orange-400', '--orange-500', '--orange-600',
  '--ink-900', '--ink-800', '--ink-700', '--ink-600', '--teal-900',
  '--gray-500', '--gray-400', '--gray-300', '--gray-250', '--gray-200', '--gray-150', '--gray-100', '--gray-50',
  '--white', '--canvas', '--mist-200', '--night-950', '--night-900', '--night-850', '--night-800',
  '--green-500', '--green-600', '--green-100', '--red-500', '--red-600', '--red-100', '--amber-500', '--amber-700', '--amber-100',
  '--viz-blue', '--viz-green', '--viz-orange', '--viz-lilac',
  '--heat-1', '--heat-2', '--heat-3', '--heat-4', '--heat-5', '--heat-6', '--heat-7',
];

const TYPE_SCALE: Array<[string, string, string]> = [
  ['--text-display', '96 · display', 'ALUGA.'],
  ['--text-6xl', '72 · metric xl', 'R$ 124K'],
  ['--text-5xl', '64 · display', 'Imóveis sob controle.'],
  ['--text-4xl', '48 · metric lg', '78%'],
  ['--text-3xl', '36 · metric md', '432 unidades'],
  ['--text-2xl', '28 · metric sm', 'Decisões mais claras.'],
  ['--text-xl', '22 · dialog/page title', 'Nova tarefa'],
  ['--text-lg', '18 · card title', 'Total de unidades'],
  ['--text-md', '16 · description', 'Acompanhe unidades ocupadas e livres.'],
  ['--text-base', '14 · body', 'Inquilino Marina Costa'],
  ['--text-sm', '13 · small', 'Visitas agendadas'],
  ['--text-xs', '12 · label', 'Status das tarefas'],
  ['--text-2xs', '11 · caption', 'Alto interesse'],
];

const WEIGHTS: Array<[string, string]> = [
  ['--weight-light', 'Light 300'],
  ['--weight-regular', 'Regular 400'],
  ['--weight-medium', 'Medium 500'],
  ['--weight-semibold', 'SemiBold 600'],
  ['--weight-bold', 'Bold 700'],
];

const SPACES = ['0-5', '1', '2', '3', '3-5', '4', '4-5', '5', '5-5', '6', '7', '7-5', '8', '9', '10', '11'];
const RADII = ['xs', 'badge-sm', 'badge', 'sm', 'md', 'tile', 'lg', 'tile-lg', 'xl', '2xl'];
const SHADOWS = ['--shadow-xs', '--shadow-card', '--shadow-pop', '--shadow-brand'];

const BUTTON_VARIANTS: ButtonVariant[] = ['primary', 'dark', 'secondary', 'outline', 'ghost'];
const ICON_VARIANTS: NonNullable<IconButtonProps['variant']>[] = ['soft', 'dark', 'brand', 'white', 'ghost', 'inverse'];
const BADGE_TONES: BadgeTone[] = ['brand', 'soft', 'neutral', 'dark', 'success', 'danger', 'warning'];

const VIZ = [
  { label: 'Direto', value: 27, color: 'var(--viz-blue)' },
  { label: 'Site', value: 28, color: 'var(--viz-green)' },
  { label: 'Instagram', value: 34, color: 'var(--viz-orange)' },
  { label: 'Parceiro', value: 11, color: 'var(--viz-lilac)' },
];

const NAV_ITEMS = [
  { id: 'dash', label: 'Painel', icon: 'layout-grid' as const },
  { id: 'an', label: 'Análises', icon: 'chart-spline' as const },
  { id: 'rep', label: 'Relatórios', icon: 'file-chart-column' as const },
  { id: 'set', label: 'Ajustes', icon: 'settings' as const },
];

const RAIL_ITEMS = [
  { id: 'props', label: 'Imóveis', icon: 'building-2' as const },
  { id: 'ten', label: 'Inquilinos', icon: 'users' as const },
  { id: 'man', label: 'Manutenção', icon: 'wrench' as const },
  { id: 'fin', label: 'Financeiro', icon: 'wallet' as const },
];

interface UnitRow {
  id: number;
  unit: string;
  tenant: string;
  rent: string;
  status: string;
  tone: BadgeTone;
}

const ROWS: UnitRow[] = [
  { id: 1, unit: 'Aurora · 402', tenant: 'Marina Costa', rent: 'R$ 3.200', status: 'Pago', tone: 'success' },
  { id: 2, unit: 'Pinheiros · 118', tenant: 'João Pedro Lima', rent: 'R$ 2.750', status: 'Atrasado', tone: 'danger' },
  { id: 3, unit: 'Aurora · 805', tenant: 'Reserva · Lucas F.', rent: 'R$ 3.350', status: 'Reservado', tone: 'soft' },
  { id: 4, unit: 'Vila Madalena · 33', tenant: 'Beatriz Nunes', rent: 'R$ 3.900', status: 'A vencer', tone: 'warning' },
];

const brl = (v: number) => `R$ ${Math.round(v * 100).toLocaleString('pt-BR')}`;

// ?theme=dark opens the showcase in dark mode (handy for screenshots and links).
const noSubscribe = () => () => {};
const urlTheme = (): Theme => (new URLSearchParams(window.location.search).get('theme') === 'dark' ? 'dark' : 'light');
// ?a11y=on opens the showcase with the accessibility layer on (bigger type + 56px targets).
// Falls back to the value saved by the admin template's settings menu, so both stay in sync.
const urlA11y = (): boolean => {
  const param = new URLSearchParams(window.location.search).get('a11y');
  if (param) return param === 'on';
  try {
    return window.localStorage.getItem('aluga_a11y') === 'on';
  } catch {
    return false;
  }
};

export function Showcase() {
  const router = useRouter();
  const initialTheme = useSyncExternalStore(noSubscribe, urlTheme, () => 'light' as Theme);
  const [chosenTheme, setTheme] = useState<Theme | null>(null);
  const theme = chosenTheme ?? initialTheme;
  const initialA11y = useSyncExternalStore(noSubscribe, urlA11y, () => false);
  const [chosenA11y, setA11y] = useState<boolean | null>(null);
  const a11y = chosenA11y ?? initialA11y;
  const [tab, setTab] = useState('an');
  const [rail, setRail] = useState('props');
  const [range, setRange] = useState('Semana');
  const [checks, setChecks] = useState({ a: true, b: false });
  const [switches, setSwitches] = useState({ a: true, b: false });
  const [dialog, setDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(1);

  useEffect(() => {
    installForcedStates();
    // Re-run after fonts/late stylesheets settle (and on HMR in dev).
    const t = window.setTimeout(installForcedStates, 600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    return () => {
      delete root.dataset.theme;
    };
  }, [theme]);

  // Opt-in accessibility layer: larger type scale + 56px touch targets.
  // Purely additive — with data-a11y absent the approved design is untouched.
  useEffect(() => {
    const root = document.documentElement;
    if (a11y) root.dataset.a11y = 'on';
    else delete root.dataset.a11y;
    return () => {
      delete root.dataset.a11y;
    };
  }, [a11y]);

  return (
    <div className={styles.page}>
      <header className={styles.top}>
        <div className={styles.topTitle}>
          <Wordmark size={26} />
          <span className={styles.topLabel}>Design system</span>
        </div>
        <SegmentedControl
          label="Tema"
          size="sm"
          options={[
            { value: 'light', label: 'Claro' },
            { value: 'dark', label: 'Escuro' },
          ]}
          value={theme}
          onChange={(v) => setTheme(v as Theme)}
        />
        <span
          className={styles.a11yToggle}
          title="Acessibilidade: texto ampliado (base 18px) e alvos de toque de 56px"
        >
          <Switch checked={a11y} onChange={(v) => setA11y(v)} label="Acessibilidade" name="a11y" />
        </span>
        <Button variant="dark" size="sm" iconRight="arrow-right" onClick={() => router.push('/design-system/admin')}>
          Template do painel
        </Button>
      </header>

      <nav className={styles.toc} aria-label="Seções">
        {SECTIONS.map(([id, label]) => (
          <a key={id} className={styles.tocLink} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>

      {/* ── Fundamentos ─────────────────────────────────── */}
      <Section id="fundamentos" title="Fundamentos" lead={<>Tokens de <code>design-system/tokens</code>, espelhados de <code>DESIGN.md</code> (fonte da verdade). Troque o tema no topo para ver os valores do tema escuro.</>}>
        <Block title="Cores semânticas" note="use estas no código">
          <div className={styles.swatches}>
            {SEMANTIC_COLORS.map((t) => (
              <Swatch key={t} token={t} />
            ))}
          </div>
        </Block>
        <Block title="Paleta" note="primitivos — só definem os semânticos">
          <div className={styles.swatches}>
            {PALETTE.map((t) => (
              <Swatch key={t} token={t} />
            ))}
          </div>
        </Block>
        <div className={styles.grid2}>
          <Block title="Tipografia" note="Plus Jakarta Sans">
            <div>
              {TYPE_SCALE.map(([token, meta, sample]) => (
                <div key={token} className={styles.typeRow}>
                  <span className={styles.typeMeta}>
                    {token}
                    <br />
                    {meta}
                  </span>
                  <span className={styles.typeSample} style={{ fontSize: `var(${token})`, fontWeight: token.match(/(6xl|4xl|3xl|2xl)/) ? 'var(--weight-light)' : undefined }}>
                    {sample}
                  </span>
                </div>
              ))}
              {WEIGHTS.map(([token, label]) => (
                <div key={token} className={styles.typeRow}>
                  <span className={styles.typeMeta}>{token}</span>
                  <span className={styles.typeSample} style={{ fontSize: 'var(--text-2xl)', fontWeight: `var(${token})` }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Block>
          <div className={styles.stack}>
            <Block title="Espaçamento" note="--space-*">
              <div className={styles.stack}>
                {SPACES.map((s) => (
                  <div key={s} className={styles.row}>
                    <span className={styles.label}>--space-{s}</span>
                    <span className={styles.spaceBar} style={{ width: `var(--space-${s})` }} />
                  </div>
                ))}
              </div>
            </Block>
            <Block title="Raios" note="--radius-*">
              <div className={`${styles.row} ${styles.rowTop}`}>
                {RADII.map((r) => (
                  <div key={r} className={styles.stack}>
                    <span className={styles.radiusBox} style={{ borderRadius: `var(--radius-${r})` }} />
                    <span className={styles.label}>{r}</span>
                  </div>
                ))}
                <div className={styles.stack}>
                  <span className={`${styles.radiusBox} ${styles.radiusPill}`} style={{ borderRadius: 'var(--radius-pill)' }} />
                  <span className={styles.label}>pill</span>
                </div>
              </div>
            </Block>
          </div>
        </div>
        <Block title="Elevação e texturas" note="cards são planos; sombra só em camadas flutuantes">
          <div className={styles.grid3}>
            <div className={`${styles.elevation} ${styles.elevationHairline}`}>
              hairline (cards)
            </div>
            {SHADOWS.map((s) => (
              <div key={s} className={styles.elevation} style={{ boxShadow: `var(${s})` }}>
                {s}
              </div>
            ))}
            <div className={styles.hatchSwatch} style={{ background: 'var(--hatch), var(--brand)' }} />
            <div className={styles.hatchSwatch} style={{ background: 'var(--hatch-gray), var(--surface-sunken)' }} />
          </div>
        </Block>
      </Section>

      {/* ── Core ─────────────────────────────────────────── */}
      <Section id="core" title="Core" lead="Button · IconButton · Badge · Chip · Avatar · AvatarGroup · Wordmark · Icon">
        <Block title="Button" note="variantes × estados">
          <StateMatrix
            rows={BUTTON_VARIANTS}
            states={['default', 'hover', 'active', 'focus', 'disabled', 'loading']}
            render={(v, s) => (
              <Button variant={v as ButtonVariant} icon="plus" disabled={s === 'disabled'} loading={s === 'loading'}>
                Novo contrato
              </Button>
            )}
          />
          <div className={styles.row}>
            <span className={styles.label}>Tamanhos</span>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg" iconRight="arrow-right">
              Large
            </Button>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>fullWidth</span>
            <div className={styles.grow}>
              <Button fullWidth size="lg" iconRight="arrow-right">
                Entrar
              </Button>
            </div>
          </div>
        </Block>

        <Block title="IconButton" note="variantes × estados · dot de não lido">
          <StateMatrix
            rows={ICON_VARIANTS}
            states={['default', 'hover', 'active', 'focus', 'disabled']}
            render={(v, s) =>
              v === 'inverse' ? (
                <span className={styles.darkBackdrop}>
                  <IconButton icon="maximize-2" label="Expandir" variant="inverse" size={36} disabled={s === 'disabled'} />
                </span>
              ) : (
                <IconButton icon="bell" label="Notificações" variant={v as IconButtonProps['variant']} disabled={s === 'disabled'} />
              )
            }
          />
          <div className={styles.row}>
            <span className={styles.label}>dot · tamanhos</span>
            <IconButton icon="message-circle" label="Mensagens" dot />
            <IconButton icon="maximize-2" label="Expandir" variant="dark" size={32} />
            <IconButton icon="building-2" label="Imóveis" variant="brand" size={48} />
          </div>
        </Block>

        <div className={styles.grid2}>
          <Block title="Badge" note="tons · tamanhos · contador">
            <div className={styles.row}>
              <span className={styles.label}>md</span>
              {BADGE_TONES.map((t) => (
                <Badge key={t} tone={t} dot={t !== 'brand' && t !== 'dark'}>
                  {t}
                </Badge>
              ))}
            </div>
            <div className={styles.row}>
              <span className={styles.label}>sm</span>
              {BADGE_TONES.map((t) => (
                <Badge key={t} tone={t} size="sm" dot>
                  {t}
                </Badge>
              ))}
            </div>
            <div className={styles.row}>
              <span className={styles.label}>count</span>
              <Badge count={2} />
              <Badge count={12} />
              <Badge tone="brand">Problema 01</Badge>
            </div>
          </Block>
          <Block title="Chip" note="variantes × estados">
            <StateMatrix
              rows={['light', 'outline', 'glass', 'dark']}
              states={['default', 'hover', 'focus']}
              render={(v) =>
                v === 'glass' || v === 'dark' ? (
                  <span className={styles.photoBackdrop} style={{ backgroundImage: `url(${buildingGlass.src})` }}>
                    <Chip icon={v === 'glass' ? 'users' : 'box'} variant={v}>
                      {v === 'glass' ? 'Visitantes' : 'Vista 3D'}
                    </Chip>
                  </span>
                ) : (
                  <Chip icon="lightbulb" variant={v as 'light' | 'outline'}>
                    Saiba mais
                  </Chip>
                )
              }
            />
          </Block>
        </div>

        <div className={styles.grid2}>
          <Block title="Avatar · AvatarGroup">
            <div className={styles.row}>
              <span className={styles.label}>iniciais</span>
              <Avatar name="Rodrigo Alves" />
              <Avatar name="Richard Souza" size={32} />
              <Avatar name="Ana Lima" size={56} />
            </div>
            <div className={styles.row}>
              <span className={styles.label}>imagem</span>
              <Avatar name="Ed. Aurora" src={houseOrange.src} />
              <Avatar name="Ed. Vidro" src={buildingGlass.src} size={48} ring />
            </div>
            <div className={styles.row}>
              <span className={styles.label}>grupo</span>
              <AvatarGroup people={[{ name: 'Ana Lima' }, { name: 'Bruno Reis' }]} />
              <AvatarGroup people={[{ name: 'Ana Lima' }, { name: 'Bruno C' }, { name: 'Caio D' }, { name: 'Duda E' }, { name: 'Enzo P' }]} />
            </div>
          </Block>
          <Block title="Wordmark" note="não há logo — o nome é tipográfico">
            <div className={styles.row}>
              <Wordmark size={48} />
              <Wordmark variant="spaced" size={16} />
            </div>
            <div className={styles.row}>
              <span className={`${styles.darkBackdrop} ${styles.brandBackdrop}`}>
                <Wordmark variant="spaced" size={14} color="var(--on-brand)" />
              </span>
              <span className={styles.darkBackdrop}>
                <Wordmark variant="spaced" size={14} color="var(--on-inverse)" />
              </span>
            </div>
          </Block>
        </div>

        <Block title="Icon" note={`registro completo (${Object.keys(icons).length}) · Lucide, traço 1.5`}>
          <div className={styles.iconGrid}>
            {(Object.keys(icons) as IconName[]).map((name) => (
              <span key={name} className={styles.iconCell}>
                <Icon name={name} size={20} />
                {name}
              </span>
            ))}
          </div>
        </Block>
      </Section>

      {/* ── Forms ────────────────────────────────────────── */}
      <Section id="forms" title="Forms" lead="Input · Select · Checkbox · Switch · SegmentedControl">
        <Block title="Input" note="soft / white × estados">
          <StateMatrix
            rows={['soft', 'white']}
            states={['default', 'hover', 'focus', 'disabled']}
            render={(v, s) => (
              <Input
                variant={v as 'soft' | 'white'}
                icon="search"
                placeholder="Buscar aqui"
                shortcut={v === 'soft' ? '⌘+K' : undefined}
                disabled={s === 'disabled'}
                className={styles.fieldWidth}
              />
            )}
          />
          <div className={`${styles.row} ${styles.rowTop}`}>
            <Input label="Inquilino" variant="white" placeholder="Nome completo" hint="Como aparece no contrato." className={styles.fieldWidth} />
            <Input label="E-mail" variant="white" defaultValue="rodrigo@aluga" error="E-mail inválido" className={styles.fieldWidth} />
            <Input label="Senha" variant="white" type="password" icon="lock" defaultValue="aluga2026" className={styles.fieldWidth} />
          </div>
        </Block>
        <Block title="Select" note="md / sm × estados">
          <StateMatrix
            rows={['md', 'sm']}
            states={['default', 'hover', 'focus', 'disabled']}
            render={(v, s) => (
              <Select
                size={v as 'md' | 'sm'}
                options={['Todos os imóveis', 'Ed. Aurora', 'Residencial Pinheiros']}
                disabled={s === 'disabled'}
                className={v === 'md' ? styles.fieldWidth : undefined}
              />
            )}
          />
          <div className={`${styles.row} ${styles.rowTop}`}>
            <Select label="Imóvel" options={['Ed. Aurora', 'Residencial Pinheiros', 'Casa Jardins']} hint="Selecione a propriedade." className={styles.fieldWidth} />
            <Select label="Conta do Pix" options={['Selecione…', 'Conta PJ', 'Conta PF']} error="Escolha uma conta." className={styles.fieldWidth} />
          </div>
        </Block>
        <div className={styles.grid2}>
          <Block title="Checkbox" note="marcado / desmarcado × estados">
            <StateMatrix
              rows={['desmarcado', 'marcado']}
              states={['default', 'hover', 'focus', 'disabled']}
              render={(v, s) => <Checkbox checked={v === 'marcado'} disabled={s === 'disabled'} label="Lembrete" />}
            />
            <Checkbox checked={checks.a} onChange={(a) => setChecks((c) => ({ ...c, a }))} label="Enviar lembrete ao inquilino (interativo)" />
          </Block>
          <Block title="Switch" note="on / off × estados">
            <StateMatrix
              rows={['off', 'on']}
              states={['default', 'focus', 'disabled']}
              render={(v, s) => <Switch checked={v === 'on'} disabled={s === 'disabled'} label="Cobrança" />}
            />
            <Switch checked={switches.a} onChange={(a) => setSwitches((x) => ({ ...x, a }))} label="Cobrança automática (interativo)" />
          </Block>
        </div>
        <Block title="SegmentedControl" note="segmento selecionado em branco">
          <div className={styles.row}>
            <span className={styles.label}>md</span>
            <SegmentedControl options={['Dia', 'Semana', 'Mês']} value={range} onChange={setRange} />
            <span className={styles.label}>sm</span>
            <SegmentedControl size="sm" options={['Dia', 'Semana', 'Mês']} value={range} onChange={setRange} />
          </div>
          <StateMatrix
            rows={['segmento']}
            states={['default', 'hover', 'focus']}
            render={() => <SegmentedControl size="sm" options={['Abertas', 'Concluídas', 'Todas']} value="Todas" />}
          />
        </Block>
      </Section>

      {/* ── Data ─────────────────────────────────────────── */}
      <Section id="data" title="Data" lead="Card · CardHeader · StatCard · Metric · ProgressPill · BarChart · Legend · LineChart · HeatScale · DataTable">
        <div className={styles.grid3}>
          <Card>
            <CardHeader title="Card" subtitle="default" action={<IconButton icon="maximize-2" label="Expandir" size={36} />} />
          </Card>
          <Card tone="dark">
            <CardHeader inverse title="Próximo" subtitle="vencimento" action={<IconButton icon="maximize-2" label="Expandir" variant="inverse" size={36} />} />
            <Metric inverse value="05" label="nov" />
          </Card>
          <Card tone="sunken">
            <CardHeader title="Card" subtitle="sunken" />
          </Card>
          <Card tone="brand">
            <CardHeader inverse title="A receber" subtitle="este mês" />
            <Metric inverse value="R$ 18,9K" size="md" />
          </Card>
          <Card bordered={false}>
            <CardHeader title="Card" subtitle="sem hairline" size="sm" />
          </Card>
          {[1, 2].map((n) => (
            <Card key={n} onClick={() => setSelectedCard(n)} selected={selectedCard === n} padding="var(--space-5-5)">
              <CardHeader size="sm" title="Unidades" subtitle={n === 1 ? 'Ocupadas (selecionado)' : 'Livres (clique)'} />
              <Metric value={n === 1 ? '78%' : '14%'} label={n === 1 ? '5 unidades' : '1 unidade'} size="md" />
            </Card>
          ))}
        </div>
        <Block title="Card interativo" note="estados">
          <StateMatrix
            rows={['onClick']}
            states={['default', 'hover', 'focus']}
            render={() => (
              <Card onClick={() => undefined} padding="var(--space-4-5)">
                <CardHeader size="sm" title="Abrir" subtitle="imóvel" />
              </Card>
            )}
          />
          <div className={styles.row}>
            <span className={styles.label}>CardHeader</span>
            <CardHeader size="sm" title="Visitas" subtitle="Hoje" />
            <CardHeader size="md" title="Visitantes por" subtitle="Origem" />
            <CardHeader size="lg" title="Fluxo de" subtitle="caixa" />
          </div>
        </Block>
        <div className={styles.grid3}>
          <StatCard title="Total de" subtitle="Unidades" value="432" image={houseOrange.src} action={<Chip variant="glass" icon="building-2">Ver unidades</Chip>} />
          <StatCard title="Novos" subtitle="Contratos" value="32" delta="+12" deltaLabel="esta semana" />
          <StatCard title="Visitas" subtitle="Hoje" value="56" unit="pessoas" dots={false} image={buildingBrick.src} />
        </div>
        <div className={styles.grid2}>
          <Block title="Metric" note="sm · md · lg · xl · decimais">
            <div className={`${styles.row} ${styles.rowTop}`}>
              <Metric value="28" label="sm" size="sm" />
              <Metric value="36" label="md" size="md" />
              <Metric value="78%" label="Ocupação" size="lg" />
            </div>
            <Metric value="R$ 124K" label="Receita mensal" size="xl" />
            <Metric value="R$ 23680.00" decimals size="md" />
          </Block>
          <Block title="ProgressPill" note="tons · valores · responsáveis">
            <div className={styles.stack}>
              <ProgressPill label="Vistoria do ar-condicionado" value={100} tone="dark" people={[{ name: 'Ana Lima' }, { name: 'Bruno Reis' }]} />
              <ProgressPill label="Revisão do elevador" value={67} tone="light" people={[{ name: 'Caio Dias' }, { name: 'Duda Melo' }, { name: 'Enzo Paz' }, { name: 'Gabi Luz' }]} />
              <ProgressPill label="Reparo hidráulico" value={43} tone="brand" people={[{ name: 'Felipe Sá' }]} />
              <ProgressPill label="Pintura da fachada" value={0} tone="light" />
            </div>
          </Block>
        </div>
        <div className={styles.grid2}>
          <Block title="BarChart · Legend" note="hachurado / liso">
            <div className={styles.chartBox}>
              <Legend items={VIZ.map((v) => ({ label: v.label, color: v.color, value: `${v.value}%` }))} className={styles.legendCol} />
              <BarChart data={VIZ} height={110} className={styles.grow} />
            </div>
            <div className={styles.chartBox}>
              <BarChart data={VIZ} height={80} hatched={false} className={styles.grow} />
            </div>
            <Legend direction="row" items={[{ label: 'Visitantes', color: 'var(--viz-green)', line: true }, { label: 'Recorrentes', color: 'var(--brand)', line: true }]} />
          </Block>
          <Block title="HeatScale" note="níveis 0 · 3 · 6 · 8">
            <div className={`${styles.row} ${styles.rowTop}`}>
              <HeatScale level={0} label="Sem procura" />
              <HeatScale level={3} label="Média" />
              <HeatScale level={6} label="Alta procura" />
              <HeatScale level={8} label="Alto interesse" />
            </div>
          </Block>
        </div>
        <div className={styles.grid2}>
          <Block title="LineChart" note="série única · fundo hachurado · valor destacado">
            <SegmentedControl size="sm" options={['Dia', 'Semana', 'Mês']} value={range} onChange={setRange} />
            <LineChart
              height={180}
              series={[{ name: 'Receita', color: 'var(--chart-ink)', data: range === 'Dia' ? [10.4, 12.1, 11.2, 16.4, 23.6, 15.2, 18.4, 14.4] : range === 'Semana' ? [84, 92, 88, 101, 118, 109, 124, 116] : [310, 342, 356, 371, 388, 402, 431, 447] }]}
              labels={['10 out', '15 out', '20 out', '25 out', '31 out']}
              highlight={4}
              formatValue={(v) => (
                <span>
                  {brl(v)}
                  <span style={{ opacity: 0.55 }}>,00</span>
                </span>
              )}
            />
          </Block>
          <Block title="LineChart" note="duas séries · área · sem fundo">
            <LineChart
              height={180}
              backdrop={false}
              series={[
                { name: 'Visitantes', color: 'var(--success)', data: [3, 2.6, 4.2, 5.1, 4.9, 6.8, 8.1, 7.6, 9.4, 10.8], area: true },
                { name: 'Recorrentes', color: 'var(--brand)', data: [1, 1.2, 1.1, 2.4, 2.2, 3.1, 3.6, 3.4, 4.6, 5.4] },
              ]}
              labels={['10 out', '20 out', '31 out']}
              highlight={2}
              formatValue={(v) => `Visitantes: ${Math.round(v * 180).toLocaleString('pt-BR')}`}
            />
          </Block>
        </div>
        <div className={styles.grid2}>
          <Block title="DataTable" note="linhas clicáveis · hover">
            <DataTable<UnitRow>
              onRowClick={() => undefined}
              columns={[
                { key: 'unit', label: 'Unidade' },
                { key: 'tenant', label: 'Inquilino' },
                { key: 'rent', label: 'Aluguel', align: 'right' },
                { key: 'status', label: 'Status', render: (r) => <Badge size="sm" dot tone={r.tone}>{r.status}</Badge> },
              ]}
              rows={ROWS}
            />
          </Block>
          <Block title="DataTable" note="estado vazio">
            <DataTable<UnitRow>
              columns={[
                { key: 'unit', label: 'Unidade' },
                { key: 'tenant', label: 'Inquilino' },
                { key: 'status', label: 'Status' },
              ]}
              rows={[]}
              empty="Nenhuma unidade neste filtro."
            />
          </Block>
        </div>
      </Section>

      {/* ── Navigation ───────────────────────────────────── */}
      <Section id="navigation" title="Navigation" lead="NavPills (desktop e barra compacta mobile) · SideRail">
        <Block title="NavPills" note="item ativo em laranja">
          <NavPills items={NAV_ITEMS.slice(0, 3)} value={tab} onChange={setTab} label="Seções" />
          <NavPills compact bar items={NAV_ITEMS} value={tab} onChange={setTab} label="Seções (mobile)" className={styles.compactNav} />
          <StateMatrix rows={['item']} states={['default', 'hover', 'focus']} render={() => <NavPills items={NAV_ITEMS.slice(0, 2)} value="dash" />} />
        </Block>
        <Block title="SideRail" note="ativo em laranja · tooltip no hover/focus">
          <div className={styles.row}>
            <SideRail items={RAIL_ITEMS} value={rail} onChange={setRail} footer={<IconButton icon="log-out" label="Sair" variant="ghost" />} />
            <span className="ds-force-hover">
              <SideRail items={RAIL_ITEMS.slice(0, 1)} value="none" />
            </span>
            <span className={styles.note}>← hover forçado (tooltip)</span>
          </div>
        </Block>
      </Section>

      {/* ── Feedback ─────────────────────────────────────── */}
      <Section id="feedback" title="Feedback" lead="Dialog · Toast · Tooltip">
        <div className={styles.grid2}>
          <Block title="Toast" note="tons · com e sem fechar">
            <div className={styles.toastStack}>
              <Toast tone="success" title="Tarefa criada" message="A equipe de manutenção foi notificada." onClose={() => undefined} />
              <Toast tone="danger" title="Pagamento atrasado" message="Pinheiros · 118 — 5 dias" onClose={() => undefined} />
              <Toast tone="info" title="Nova visita agendada" />
              <Toast tone="neutral" title="Cobrança automática desativada" />
            </div>
          </Block>
          <div className={styles.stack}>
            <Block title="Tooltip" note="aberto (top / bottom) e no hover">
              <div className={`${styles.row} ${styles.tooltipStage}`}>
                <Tooltip content="Visitantes: 1.869" open>
                  <IconButton icon="info" label="Info" />
                </Tooltip>
                <Tooltip content="Abaixo" placement="bottom" open>
                  <IconButton icon="info" label="Info abaixo" />
                </Tooltip>
                <Tooltip content="Passe o mouse ou use Tab">
                  <IconButton icon="lightbulb" label="Dica" />
                </Tooltip>
              </div>
            </Block>
            <Block title="Dialog" note="Esc ou clique no fundo fecha">
              <div className={styles.row}>
                <Button onClick={() => setDialog(true)}>Abrir diálogo</Button>
              </div>
            </Block>
          </div>
        </div>
        <Dialog
          open={dialog}
          onClose={() => setDialog(false)}
          title="Nova tarefa"
          subtitle="Manutenção"
          footer={
            <>
              <Button variant="secondary" onClick={() => setDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setDialog(false)}>Salvar tarefa</Button>
            </>
          }
        >
          <Input label="Título" variant="white" placeholder="Ex.: Troca do chuveiro" />
          <Select label="Imóvel" options={['Ed. Aurora', 'Residencial Pinheiros', 'Casa Jardins']} />
          <Checkbox checked={checks.b} onChange={(b) => setChecks((c) => ({ ...c, b }))} label="Marcar como urgente" />
        </Dialog>
      </Section>

      {/* ── Templates ────────────────────────────────────── */}
      <Section id="templates" title="Templates" lead="Padrões de composição prontos em design-system/templates.">
        <div className={styles.grid2}>
          <Card>
            <CardHeader title="Painel administrativo" subtitle="Login → Painel → Imóveis → Manutenção → Financeiro" action={<IconButton icon="maximize-2" label="Abrir template" variant="dark" size={36} onClick={() => router.push('/design-system/admin')} />} />
            <p className={styles.note}>
              Responsivo: &lt;760px mobile (barra inferior), 760–1179px tablet, ≥1180px desktop (rail lateral). Rota: <code>/design-system/admin</code>.
            </p>
          </Card>
          <Card tone="sunken">
            <CardHeader title="Referências HTML" subtitle="originais do Claude Design" />
            <p className={styles.note}>
              Abra no navegador a partir de <code>design-system/reference/index.html</code> (funciona offline do projeto, sem servidor).
            </p>
          </Card>
        </div>
      </Section>
    </div>
  );
}

function Section({ id, title, lead, children }: { id: string; title: string; lead?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {title}
        <span>.</span>
      </h2>
      {lead && <p className={styles.sectionLead}>{lead}</p>}
      {children}
    </section>
  );
}

function Block({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className={styles.block}>
      <div className={styles.blockTitle}>
        {title}
        {note && <small>{note}</small>}
      </div>
      {children}
    </div>
  );
}

function Swatch({ token }: { token: string }) {
  return (
    <div className={styles.swatch}>
      <span className={styles.chipColor} style={{ background: `var(${token})` }} />
      <span className={styles.swatchName}>{token}</span>
    </div>
  );
}

function StateMatrix({ rows, states, render }: { rows: string[]; states: State[]; render: (row: string, state: State) => ReactNode }) {
  return (
    <div className={styles.matrix} style={{ '--cols': states.length } as CSSProperties}>
      <span />
      {states.map((s) => (
        <span key={s} className={styles.matrixHead}>
          {STATE_LABEL[s]}
        </span>
      ))}
      {rows.map((r) => (
        <Row key={r} row={r} states={states} render={render} />
      ))}
    </div>
  );
}

function Row({ row, states, render }: { row: string; states: State[]; render: (row: string, state: State) => ReactNode }) {
  return (
    <>
      <span className={styles.label}>{row}</span>
      {states.map((s) => (
        <span key={s} className={[styles.matrixCell, FORCE[s]].filter(Boolean).join(' ')}>
          {render(row, s)}
        </span>
      ))}
    </>
  );
}
