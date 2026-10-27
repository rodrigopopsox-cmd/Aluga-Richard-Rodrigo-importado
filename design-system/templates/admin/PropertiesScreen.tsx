'use client';

import { useState } from 'react';
import { Badge, Button, Card, CardHeader, DataTable, Dialog, Input, Metric, SegmentedControl } from '../../components';
import houseOrange from '../../assets/images/house-orange.png';
import { brl, STATUS_TONE, units, type Unit, type UnitStatus } from './data';
import type { ToastInput } from './AdminApp';
import type { Breakpoint } from './useBreakpoint';
import s from './Screens.module.css';

type Filter = 'Todos' | UnitStatus;

const SUMMARY: Array<[string, UnitStatus, string]> = [
  ['Ocupadas', 'Ocupado', '78%'],
  ['Livres', 'Livre', '14%'],
  ['Reservadas', 'Reservado', '3%'],
  ['Atrasadas', 'Atrasado', '5%'],
];

/** Imóveis — status summary cards (filters), searchable unit table (list on mobile), unit detail dialog. */
export function PropertiesScreen({ bp, toast }: { bp: Breakpoint; toast: (t: ToastInput) => void }) {
  const [filter, setFilter] = useState<Filter>('Todos');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Unit | null>(null);
  const mobile = bp === 'm';

  const rows = units.filter(
    (u) => (filter === 'Todos' || u.status === filter) && `${u.property}${u.unit}${u.tenant}`.toLowerCase().includes(query.toLowerCase()),
  );
  const count = (st: UnitStatus) => units.filter((u) => u.status === st).length;

  return (
    <div className={s.stack}>
      <div className={s.grid} style={{ gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, minmax(0, 1fr))' }}>
        {SUMMARY.map(([label, status, pct]) => (
          <Card key={label} onClick={() => setFilter(status)} selected={filter === status} padding="var(--space-5-5)">
            <CardHeader size="sm" title="Unidades" subtitle={label} />
            <Metric value={pct} label={`${count(status)} ${count(status) === 1 ? 'unidade' : 'unidades'}`} size="md" className={s.mt3} />
          </Card>
        ))}
      </div>

      <Card padding={mobile ? 'var(--space-4-5)' : 'var(--card-padding)'}>
        <div className={s.toolbar}>
          <CardHeader title="Unidades" subtitle={`${rows.length} resultados`} className={s.toolbarTitle} />
          <Input icon="search" placeholder="Filtrar" value={query} onChange={setQuery} className={mobile ? s.filterInputFull : s.filterInput} />
          <div className={s.scrollX}>
            <SegmentedControl size="sm" options={['Todos', 'Ocupado', 'Livre', 'Reservado', 'Atrasado']} value={filter} onChange={(v) => setFilter(v as Filter)} />
          </div>
          {!mobile && (
            <Button icon="plus" size="sm" onClick={() => toast({ tone: 'info', title: 'Cadastro de unidade', message: 'Formulário aberto em nova aba (demo).' })}>
              Nova unidade
            </Button>
          )}
        </div>
        {mobile ? (
          <div className={s.flexCol}>
            {rows.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setSelected(u)}
                className={s.rowButton}
                aria-label={`${u.property} · ${u.unit}, ${u.tenant}, ${brl(u.rent)}, ${u.status}`}
              >
                <div className={s.rowMain}>
                  <div className={s.rowTitle}>
                    {u.property} · {u.unit}
                  </div>
                  <div className={s.rowSub}>{u.tenant}</div>
                </div>
                <div className={s.rowSide}>
                  <span>{brl(u.rent)}</span>
                  <Badge size="sm" dot tone={STATUS_TONE[u.status]}>
                    {u.status}
                  </Badge>
                </div>
              </button>
            ))}
            {rows.length === 0 && <div className={s.empty}>Nenhuma unidade neste filtro.</div>}
          </div>
        ) : (
          <DataTable<Unit>
            onRowClick={setSelected}
            empty="Nenhuma unidade neste filtro."
            columns={[
              {
                key: 'u',
                label: 'Unidade',
                render: (r) => (
                  <div>
                    <div className={s.rowTitle}>
                      {r.property} · {r.unit}
                    </div>
                    <div className={s.rowSub}>{r.type}</div>
                  </div>
                ),
              },
              { key: 'tenant', label: 'Inquilino' },
              { key: 'due', label: 'Vencimento' },
              { key: 'rent', label: 'Aluguel', align: 'right', render: (r) => brl(r.rent) },
              {
                key: 'status',
                label: 'Status',
                render: (r) => (
                  <Badge size="sm" dot tone={STATUS_TONE[r.status]}>
                    {r.status}
                  </Badge>
                ),
              },
            ]}
            rows={rows}
          />
        )}
      </Card>

      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        width={520}
        title={selected ? `${selected.property} · ${selected.unit}` : ''}
        subtitle={selected?.type}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelected(null)}>
              Fechar
            </Button>
            <Button
              icon="file-text"
              onClick={() => {
                setSelected(null);
                toast({ title: 'Contrato enviado', message: 'Enviado para assinatura digital.' });
              }}
            >
              Enviar contrato
            </Button>
          </>
        }
      >
        {selected && (
          <>
            <div className={s.dialogPhoto}>
              <img src={houseOrange.src} alt="" />
            </div>
            <div className={s.infoGrid}>
              {(
                [
                  ['Inquilino', selected.tenant],
                  ['Aluguel', brl(selected.rent)],
                  ['Vencimento', selected.due],
                  [
                    'Status',
                    <Badge key="st" dot tone={STATUS_TONE[selected.status]}>
                      {selected.status}
                    </Badge>,
                  ],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className={s.infoTile}>
                  <div className={s.infoLabel}>{k}</div>
                  <div className={s.infoValue}>{v}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </Dialog>
    </div>
  );
}
