# Componentes — guia de uso

Notas de uso de cada componente, migradas na íntegra dos arquivos `*.prompt.md` do export do Claude Design.
As props tipadas (fonte da verdade da API) estão em cada `design-system/components/<grupo>/<Nome>.tsx`;
a vitrine viva com todos os estados está em `/design-system`.

Acréscimos feitos na migração (não existiam no export):
- `Button`: prop `loading` (spinner + `aria-busy`).
- `IconButton`: variante `inverse` (círculo translúcido sobre cards escuros/laranja — antes era um `style` avulso nas telas).
- `Card`: prop `selected` (contorno laranja do card-filtro ativo — antes era `style` avulso).
- `DataTable`: prop `empty` (estado vazio).
- `Select`: `error`, `hint`, `disabled`, `defaultValue`, `name` (paridade com `Input`).
- `Input`: `name`, `id`, `autoComplete`, `inputMode`, `required`.
- `Tooltip`: prop `open` (forçar visível).
- Todos: `className`.

## core

### Icon

Thin-stroke line icon (Lucide, 1.5px) — use for every glyph in nav, buttons, cards; never emoji.
```jsx
<Icon name="layout-grid" size={20} />
<Icon name="maximize-2" size={16} color="#fff" />
```
- Loads Lucide 0.460 from unpkg on first use; names are kebab-case.
- Keep strokeWidth 1.5 (1.75 at ≤16px is acceptable).

### Button

Pill button for actions; orange primary for the one main action per view, dark pill for in-card actions.
```jsx
<Button icon="plus">Novo contrato</Button>
<Button variant="dark" size="sm" icon="plus">Adicionar tarefa</Button>
<Button variant="secondary">Cancelar</Button>
```
- Variants: primary · dark · secondary · outline · ghost. Sizes sm 32 / md 40 / lg 48.
- Always fully rounded. Press = scale(.97).

### IconButton

Circular icon-only button — header actions (chat, bell), card expand, rail items.
```jsx
<IconButton icon="message-circle" label="Mensagens" dot />
<IconButton icon="maximize-2" label="Expandir" variant="dark" size={36} />
```
- Variants: soft (default gray) · dark · brand · white · ghost. `dot` adds the orange unread dot.

### Badge

Small status label with softly-rounded (not pill) corners; or a red count bubble.
```jsx
<Badge tone="success" dot>Ocupado</Badge>
<Badge tone="brand">Problema 01</Badge>
<Badge count={2} />
```

### Chip

Tiny secondary pill link inside cards — "Saiba mais", "Ver unidades", "Vista 3D".
```jsx
<Chip icon="lightbulb">Saiba mais</Chip>
<Chip icon="building-2" variant="glass">Ver unidades</Chip>
<Chip icon="box" variant="dark">Vista 3D</Chip>
```

### Avatar

Circular user photo / initials; AvatarGroup overlaps assignees on task bars.
```jsx
<Avatar name="Rodrigo Alves" size={40} />
<AvatarGroup people={[{name:'Ana'},{name:'Bruno'},{name:'Caio'}]} size={24} />
```

### Wordmark

Typeset brand name (no graphic logo exists yet) — use wherever a logo would go.
```jsx
<Wordmark size={64} />
<Wordmark variant="spaced" size={15} />
```

## forms

### Input

Pill text field — search bar in the top bar and form fields in dialogs.
```jsx
<Input icon="search" placeholder="Buscar aqui" shortcut="⌘+K" />
<Input label="Inquilino" placeholder="Nome completo" variant="white" />
```

### Select

Native select styled as a pill — compact filter in card headers or full form field.
```jsx
<Select size="sm" options={['Todos os imóveis','Ed. Aurora','Residencial Pinheiros']} />
```

### Checkbox

Square-ish (6px) checkbox; fills brand orange when checked.
```jsx
<Checkbox checked={v} onChange={setV} label="Enviar lembrete ao inquilino" />
```

### Switch

On/off toggle for settings; orange track when on.
```jsx
<Switch checked={on} onChange={setOn} label="Cobrança automática" />
```

### SegmentedControl

Gray pill track with a white active segment — time-range switches on charts (Dia / Semana / Mês).
```jsx
<SegmentedControl options={['Dia','Semana','Mês']} value={range} onChange={setRange} size="sm" />
```

## data

### Card

Widget surface + the signature two-line title (ink line + muted gray line).
```jsx
<Card>
  <CardHeader title="Manutenção" subtitle="Atividade" action={<Button variant="dark" size="sm" icon="plus">Adicionar</Button>} />
  …
</Card>
<Card tone="dark"><CardHeader inverse title="Próximo" subtitle="pagamento" /></Card>
```
- Split titles across two words/lines: "Total de / Unidades", "Visitas / Hoje", "Novos / Contratos".

### Metric

Large light-weight number with a small baseline label — the core KPI typography.
```jsx
<Metric value="78%" label="Ocupação" />
<Metric value="R$ 124K" label="Receita mensal" size="xl" />
```

### StatCard

Dashboard KPI tile (top row). Pair a two-word title with a big light number; add a building/door photo on the right.
```jsx
<StatCard title="Total de" subtitle="Unidades" value="432" image="assets/images/house-orange.png" action={<Chip variant="glass" icon="building-2">Ver unidades</Chip>} />
<StatCard title="Novos" subtitle="Contratos" value="32" delta="+12" deltaLabel="esta semana" />
```

### ProgressPill

Rounded progress bar with the task label inside the fill — maintenance activity rows.
```jsx
<ProgressPill label="Vistoria HVAC" value={100} tone="dark" people={[{name:'Ana Lima'}]} />
<ProgressPill label="Reparo hidráulico" value={43} tone="brand" />
```

### BarChart

Hatched rounded bars + dot legend — "Visitantes por origem" style breakdowns.
```jsx
<BarChart data={[{label:'Direto',value:27,color:'var(--viz-blue)'},{label:'Site',value:28,color:'var(--viz-green)'},{label:'Instagram',value:34,color:'var(--viz-orange)'},{label:'Parceiro',value:11,color:'var(--viz-lilac)'}]} />
<Legend items={[{label:'Direto',color:'var(--viz-blue)',value:'27%'}]} />
```

### LineChart

Smooth line chart over hatched gray columns, with dark pill value tooltip — price/visitor trends.
```jsx
<LineChart series={[{name:'Receita',color:'var(--ink-700)',data:[12,14,11,18,23,16,19]}]} labels={['10 abr','15 abr','20 abr']} highlight={4} formatValue={v=>'R$ '+v+'.000'} />
```
- Use green (`--viz-green`) + orange for two-series comparisons (Visitantes vs Recorrentes).

### HeatScale

Row of pill segments shading peach→red — interest / urgency intensity.
```jsx
<HeatScale level={8} label="Alto interesse" />
```

### DataTable

Hairline-divided list table for units, tenants, payments. Place inside a Card. Horizontal-scrolls on mobile.
```jsx
<DataTable columns={[{key:'unit',label:'Unidade'},{key:'status',label:'Status',render:r=><Badge tone="success" dot>{r.status}</Badge>}]} rows={rows} onRowClick={open} />
```

## navigation

### NavPills

Primary section switcher. Desktop: labeled pills in a gray track. Mobile: `compact bar` floating bottom bar.
```jsx
<NavPills items={[{id:'dash',label:'Painel',icon:'layout-grid'},{id:'an',label:'Análises',icon:'chart-spline'}]} value={tab} onChange={setTab} />
<NavPills compact bar items={items} value={tab} onChange={setTab} />
```

### SideRail

Vertical stack of circular icon buttons on the desktop left edge; active = orange. Hover shows a dark tooltip label.
```jsx
<SideRail items={[{id:'props',label:'Imóveis',icon:'building-2'},{id:'fin',label:'Financeiro',icon:'wallet'}]} value={sec} onChange={setSec} />
```

## feedback

### Dialog

Centered 36px-radius modal over a blurred ink scrim; Esc / scrim click closes.
```jsx
<Dialog open={open} onClose={close} title="Nova tarefa" subtitle="Manutenção" footer={<><Button variant="secondary" onClick={close}>Cancelar</Button><Button>Salvar</Button></>}>
  <Input label="Título" variant="white" />
</Dialog>
```

### Toast

White floating notice with a solid colored circle icon. Stack bottom-right (desktop) / top (mobile).
```jsx
<Toast tone="success" title="Tarefa criada" message="Equipe notificada." onClose={dismiss} />
```

### Tooltip

Dark ink pill tooltip on hover/focus — same shape as chart value pills.
```jsx
<Tooltip content="Visitantes: 1.869"><IconButton icon="info" label="Info" /></Tooltip>
```
