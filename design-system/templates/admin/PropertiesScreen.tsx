'use client';

import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  DataTable,
  Dialog,
  Input,
  MaskedInput,
  Metric,
  Select,
  type DataTableColumn,
} from '../../components';
import type { Breakpoint } from './useBreakpoint';
import type { ToastInput } from './AdminApp';
import type { ModuleId } from './Shell';
import {
  CURRENT_PLAN,
  PLAN_UNIT_LIMIT,
  PROPERTIES,
  PROPERTY_TYPES,
  UNITS,
  addressOf,
  limitBlock,
  ownersLabel,
  ownersSum,
  singleOwner,
  unitLabel,
  unitsOf,
  type Owner,
  type Property,
  type PropertyType,
  type Unit,
  type UnitStatus,
} from './propertiesData';
import s from './Screens.module.css';

/**
 * Imóveis e Unidades — cadastro da R2.
 *
 * A R2 manda, para o imóvel: apelido, tipo (casa, kitnet, comércio,
 * apartamento, outro), endereço com preenchimento pelo CEP e proprietários
 * com % de participação, somando 100%. Para a unidade: nome e status
 * (alugada ou vaga).
 *
 * A regra que define a forma desta tela é a segunda: "Imóvel de uma unidade
 * só cria a unidade sozinho, e o usuário não vê a diferença." O primeiro
 * caso do produto é a avó do Richard, com casas, uma kitnet e comércios —
 * imóveis de uma unidade só. Se a tela listasse imóveis com uma segunda
 * camada de unidades, ela mostraria duas coisas onde a pessoa pensa em uma.
 * Por isso a tabela lista UNIDADES, e o imóvel aparece como contexto: com
 * uma unidade só, a linha é o apelido do imóvel; com várias, é
 * "Imóvel · Unidade".
 *
 * Cadastrar imóvel cria a primeira unidade junto, pela mesma razão.
 *
 * Limite do plano (R2): ao criar a unidade N+1 acima do limite, aparece a
 * tela "Seu plano permite N unidades", com o plano que resolve e o botão
 * para trocar. O limite vem de PRODUCT.md; o plano da conta de
 * demonstração está em `CURRENT_PLAN`.
 */
export interface PropertiesScreenProps {
  bp: Breakpoint;
  toast: (t: ToastInput) => void;
  go: (m: ModuleId) => void;
}

const STATUS_LABEL: Record<UnitStatus, string> = {
  alugada: 'Alugada',
  vaga: 'Vaga',
};

const STATUS_TONE = {
  alugada: 'success',
  vaga: 'warning',
} as const;

const EMPTY_OWNER = (): Owner => ({ name: '', pct: 100 });

/** Estado da consulta de CEP. */
type CepState = 'vazio' | 'buscando' | 'ok' | 'nao-achou' | 'falhou';

interface PropertyDraft {
  nickname: string;
  type: PropertyType;
  cep: string;
  street: string;
  number: string;
  district: string;
  city: string;
  owners: Owner[];
}

interface UnitDraft {
  propertyId: string;
  name: string;
  status: UnitStatus;
  tenant: string;
}

export function PropertiesScreen({ bp, toast, go }: PropertiesScreenProps) {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [units, setUnits] = useState<Unit[]>(UNITS);

  const [propOpen, setPropOpen] = useState(false);
  const [unitOpen, setUnitOpen] = useState(false);
  const [editing, setEditing] = useState<Unit | null>(null);
  const [limitOpen, setLimitOpen] = useState(false);

  const [pd, setPd] = useState<PropertyDraft>({
    nickname: '',
    type: 'casa',
    cep: '',
    street: '',
    number: '',
    district: '',
    city: '',
    owners: [EMPTY_OWNER()],
  });
  const [ud, setUd] = useState<UnitDraft>({ propertyId: '', name: '', status: 'alugada', tenant: '' });
  const [cepState, setCepState] = useState<CepState>('vazio');

  const mobile = bp === 'm';
  const pad = mobile ? 'var(--space-4-5)' : 'var(--card-padding)';
  const grid = mobile ? s.stack : s.formGrid;

  const limit = PLAN_UNIT_LIMIT[CURRENT_PLAN] ?? null;
  const rented = units.filter((u) => u.status === 'alugada').length;

  const closeAll = () => {
    setPropOpen(false);
    setUnitOpen(false);
    setEditing(null);
    setCepState('vazio');
  };

  const openNewProperty = () => {
    setPd({
      nickname: '',
      type: 'casa',
      cep: '',
      street: '',
      number: '',
      district: '',
      city: '',
      owners: [EMPTY_OWNER()],
    });
    setCepState('vazio');
    setPropOpen(true);
  };

  const openNewUnit = () => {
    setEditing(null);
    setUd({ propertyId: properties[0]?.id ?? '', name: '', status: 'vaga', tenant: '' });
    setUnitOpen(true);
  };

  const openEditUnit = (u: Unit) => {
    setEditing(u);
    setUd({ propertyId: u.propertyId, name: u.name, status: u.status, tenant: u.tenant ?? '' });
    setUnitOpen(true);
  };

  /**
   * Consulta o CEP e preenche o endereço. Se falhar, os campos continuam
   * editáveis — a pessoa digita na mão. Nenhum campo de endereço fica
   * travado atrás da consulta.
   */
  const lookupCep = async (formatted: string) => {
    const clean = formatted.replace(/\D/g, '');
    setPd((d) => ({ ...d, cep: formatted }));
    if (clean.length !== 8) {
      setCepState('vazio');
      return;
    }
    setCepState('buscando');
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = (await res.json()) as { erro?: boolean; logradouro?: string; bairro?: string; localidade?: string };
      if (data.erro) {
        setCepState('nao-achou');
        return;
      }
      setPd((d) => ({
        ...d,
        street: data.logradouro || d.street,
        district: data.bairro || d.district,
        city: data.localidade || d.city,
      }));
      setCepState('ok');
    } catch {
      setCepState('falhou');
    }
  };

  const ownersValid =
    pd.owners.length > 0 &&
    pd.owners.every((o) => o.name.trim() && o.pct > 0) &&
    ownersSum(pd.owners) === 100;

  const propertyInvalid = !pd.nickname.trim() || !ownersValid;

  const saveProperty = () => {
    if (propertyInvalid) return;
    if (limitBlock(units.length)) {
      setPropOpen(false);
      setLimitOpen(true);
      return;
    }
    const id = `p${Date.now()}`;
    setProperties((prev) => [
      ...prev,
      {
        id,
        nickname: pd.nickname.trim(),
        type: pd.type,
        cep: pd.cep,
        street: pd.street.trim(),
        number: pd.number.trim(),
        district: pd.district.trim(),
        city: pd.city.trim(),
        owners: pd.owners.map((o) => ({ name: o.name.trim(), pct: o.pct })),
      },
    ]);
    // Imóvel de uma unidade só cria a unidade sozinho (R2).
    setUnits((prev) => [
      ...prev,
      { id: `u${Date.now()}`, propertyId: id, name: pd.nickname.trim(), status: 'vaga' },
    ]);
    toast({
      tone: 'success',
      title: 'Imóvel cadastrado',
      message: `${pd.nickname.trim()} entrou como unidade vaga.`,
    });
    closeAll();
  };

  const unitInvalid = !ud.propertyId || !ud.name.trim() || (ud.status === 'alugada' && !ud.tenant.trim());

  const saveUnit = () => {
    if (unitInvalid) return;
    if (!editing && limitBlock(units.length)) {
      setUnitOpen(false);
      setLimitOpen(true);
      return;
    }
    if (editing) {
      setUnits((prev) =>
        prev.map((u) =>
          u.id === editing.id
            ? {
                ...u,
                propertyId: ud.propertyId,
                name: ud.name.trim(),
                status: ud.status,
                tenant: ud.status === 'alugada' ? ud.tenant.trim() : undefined,
              }
            : u,
        ),
      );
      toast({ tone: 'success', title: 'Unidade atualizada', message: ud.name.trim() });
    } else {
      setUnits((prev) => [
        ...prev,
        {
          id: `u${Date.now()}`,
          propertyId: ud.propertyId,
          name: ud.name.trim(),
          status: ud.status,
          tenant: ud.status === 'alugada' ? ud.tenant.trim() : undefined,
        },
      ]);
      toast({
        tone: 'success',
        title: 'Unidade cadastrada',
        message: ud.status === 'vaga' ? 'Entrou como vaga — dá para cadastrar o inquilino depois.' : ud.name.trim(),
      });
    }
    closeAll();
  };

  const removeUnit = (u: Unit) => {
    setUnits((prev) => prev.filter((x) => x.id !== u.id));
    toast({ tone: 'info', title: 'Unidade removida', message: `${unitLabel(u, properties, units)} saiu da lista.` });
  };

  const columns: Array<DataTableColumn<Unit>> = [
    {
      key: 'name',
      label: 'Unidade',
      render: (u) => {
        const p = properties.find((x) => x.id === u.propertyId);
        return (
          <div className={s.rowStack}>
            <span className={s.rowTitle}>{unitLabel(u, properties, units)}</span>
            <span className={s.rowSub}>{p ? p.type : '—'}</span>
          </div>
        );
      },
    },
    {
      key: 'address',
      label: 'Endereço',
      render: (u) => {
        const p = properties.find((x) => x.id === u.propertyId);
        return p ? <span className={s.rowSub}>{addressOf(p)}</span> : <span className={s.rowMuted}>—</span>;
      },
    },
    {
      key: 'owners',
      label: 'Titulares',
      render: (u) => {
        const p = properties.find((x) => x.id === u.propertyId);
        if (!p) return <span className={s.rowMuted}>—</span>;
        if (p.owners.length === 1) return <span>{p.owners[0].name}</span>;
        return (
          <div className={s.chips}>
            {p.owners.map((o) => (
              <Badge key={o.name} tone="neutral" size="sm">
                {o.name} · {o.pct}%
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      key: 'tenant',
      label: 'Inquilino',
      render: (u) => (u.tenant ? u.tenant : <span className={s.rowMuted}>ninguém</span>),
    },
    {
      key: 'status',
      label: 'Situação',
      render: (u) => (
        <Badge tone={STATUS_TONE[u.status]} size="sm">
          {STATUS_LABEL[u.status]}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: (u) => (
        <div className={s.rowActions}>
          <Button size="sm" variant="ghost" onClick={() => openEditUnit(u)}>
            Editar
          </Button>
          <Button size="sm" variant="ghost" onClick={() => removeUnit(u)}>
            Remover
          </Button>
        </div>
      ),
    },
  ];

  const cepHint: Record<CepState, string | undefined> = {
    vazio: 'O CEP preenche a rua, o bairro e a cidade.',
    buscando: 'Buscando o endereço…',
    ok: 'Endereço preenchido. Confira e complete o número.',
    'nao-achou': 'Esse CEP não existe — preencha o endereço na mão.',
    falhou: 'Não deu para buscar o CEP. Preencha o endereço na mão.',
  };

  return (
    <div className={s.stack}>
      <div className={s.grid} style={{ gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, minmax(0, 1fr))' }}>
        <Card padding="var(--space-5-5)">
          <CardHeader size="sm" title="Imóveis" subtitle="cadastrados" />
          <Metric value={String(properties.length)} size="md" className={s.mt3} />
        </Card>
        <Card padding="var(--space-5-5)">
          <CardHeader size="sm" title="Unidades" subtitle="é o que gera aluguel" />
          <Metric value={String(units.length)} size="md" className={s.mt3} />
        </Card>
        <Card padding="var(--space-5-5)">
          <CardHeader size="sm" title="Alugadas" subtitle="com inquilino" />
          <Metric value={String(rented)} size="md" className={s.mt3} />
        </Card>
        <Card padding="var(--space-5-5)">
          <CardHeader size="sm" title="Sem inquilino" subtitle="esperando" />
          <Metric value={String(units.length - rented)} size="md" className={s.mt3} />
        </Card>
      </div>

      <Card padding={pad}>
        <CardHeader
          title="Unidades"
          subtitle={`${units.length} no plano ${CURRENT_PLAN} (${limit === null ? 'ilimitadas' : `até ${limit}`})`}
          action={
            <div className={s.rowActions}>
              <Button variant="secondary" icon="plus" onClick={openNewProperty}>
                Novo imóvel
              </Button>
              <Button icon="plus" onClick={openNewUnit}>
                Nova unidade
              </Button>
            </div>
          }
        />
      </Card>

      <Card padding={0}>
        <DataTable columns={columns} rows={units} empty="Nenhuma unidade cadastrada ainda." />
      </Card>

      <Card padding={pad}>
        <CardHeader title="Como funciona" subtitle="O que cada campo quer dizer" />
        <div className={s.glossary}>
          {[
            [
              'Imóvel',
              'O lugar: uma casa, uma kitnet, um prédio com várias salas. Tem apelido, tipo, endereço e os titulares.',
            ],
            [
              'Unidade',
              'O que gera aluguel, e é o que o plano limita. Cada kitnet ou loja conta como uma unidade.',
            ],
            [
              'Titulares',
              'Quem é dono do imóvel, e de quanto. A soma dá 100%. Um imóvel com dois donos existe para o Imposto de Renda sair separado por pessoa.',
            ],
            [
              'Vaga',
              'Unidade sem inquilino. Dá para cadastrar antes de alugar, para o valor já entrar no plano.',
            ],
            [
              'Uma unidade só',
              'Imóvel com uma unidade só não mostra duas camadas — a casa é a casa. Imóvel com várias aparece como "Imóvel · Unidade".',
            ],
          ].map(([term, meaning]) => (
            <div key={term} className={s.glossaryItem}>
              <Badge tone="soft">{term}</Badge>
              <p className={s.glossaryText}>{meaning}</p>
            </div>
          ))}
        </div>
        <p className={s.caption}>
          O CEP preenche a rua, o bairro e a cidade quando o app consegue consultar. Se a consulta
          falhar, os campos continuam abertos e o endereço é digitado na mão — nada fica travado
          atrás disso.
        </p>
      </Card>

      {/* ---------------- Diálogo: novo imóvel ---------------- */}
      <Dialog
        open={propOpen}
        onClose={closeAll}
        title="Novo imóvel"
        subtitle="Apelido, tipo, endereço e titulares"
        width={mobile ? 440 : 560}
        footer={
          <>
            <Button variant="secondary" onClick={closeAll}>
              Cancelar
            </Button>
            <Button onClick={saveProperty} disabled={propertyInvalid}>
              Salvar
            </Button>
          </>
        }
      >
        <div className={grid}>
          <Input
            label="Apelido"
            value={pd.nickname}
            onChange={(v) => setPd((d) => ({ ...d, nickname: v }))}
            placeholder="Ex.: Casa do CIC"
          />
          <Select
            label="Tipo"
            options={PROPERTY_TYPES}
            value={pd.type}
            onChange={(v) => setPd((d) => ({ ...d, type: v as PropertyType }))}
          />
        </div>

        <MaskedInput
          label="CEP"
          mask="cep"
          value={pd.cep}
          onChange={lookupCep}
          placeholder="00000-000"
          hint={cepHint[cepState]}
        />

        <div className={grid}>
          <Input
            label="Rua"
            value={pd.street}
            onChange={(v) => setPd((d) => ({ ...d, street: v }))}
            placeholder="Rua das Palmeiras"
          />
          <Input
            label="Número"
            value={pd.number}
            onChange={(v) => setPd((d) => ({ ...d, number: v }))}
            placeholder="120"
          />
        </div>

        <div className={grid}>
          <Input
            label="Bairro"
            value={pd.district}
            onChange={(v) => setPd((d) => ({ ...d, district: v }))}
            placeholder="CIC"
          />
          <Input
            label="Cidade"
            value={pd.city}
            onChange={(v) => setPd((d) => ({ ...d, city: v }))}
            placeholder="Curitiba"
          />
        </div>

        <div className={s.ownersHead}>
          <span className={s.rowSub}>Titulares do imóvel</span>
          <Button
            size="sm"
            variant="ghost"
            icon="plus"
            onClick={() => setPd((d) => ({ ...d, owners: [...d.owners, EMPTY_OWNER()] }))}
          >
            Adicionar titular
          </Button>
        </div>

        {pd.owners.map((o, i) => (
          <div className={s.ownerRow} key={i}>
            <Input
              label={i === 0 ? 'Nome' : undefined}
              value={o.name}
              onChange={(v) =>
                setPd((d) => ({
                  ...d,
                  owners: d.owners.map((x, j) => (j === i ? { ...x, name: v } : x)),
                }))
              }
              placeholder="Ex.: Iara Alves"
            />
            <Input
              label={i === 0 ? '%' : undefined}
              value={String(o.pct)}
              inputMode="numeric"
              onChange={(v) =>
                setPd((d) => ({
                  ...d,
                  owners: d.owners.map((x, j) => (j === i ? { ...x, pct: Number(v.replace(/\D/g, '')) || 0 } : x)),
                }))
              }
            />
            {pd.owners.length > 1 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setPd((d) => ({ ...d, owners: d.owners.filter((_, j) => j !== i) }))}
              >
                Remover
              </Button>
            )}
          </div>
        ))}

        <p className={s.caption} role="status">
          {ownersValid
            ? 'A soma dos titulares dá 100%.'
            : `A soma dos titulares está em ${ownersSum(pd.owners)}% — precisa dar 100%.`}
        </p>
      </Dialog>

      {/* ---------------- Diálogo: unidade ---------------- */}
      <Dialog
        open={unitOpen}
        onClose={closeAll}
        title={editing ? 'Editar unidade' : 'Nova unidade'}
        subtitle="Nome, imóvel e situação"
        width={mobile ? 440 : 560}
        footer={
          <>
            <Button variant="secondary" onClick={closeAll}>
              Cancelar
            </Button>
            <Button onClick={saveUnit} disabled={unitInvalid}>
              Salvar
            </Button>
          </>
        }
      >
        <Input
          label="Nome da unidade"
          value={ud.name}
          onChange={(v) => setUd((d) => ({ ...d, name: v }))}
          placeholder="Ex.: Sala 2"
        />
        <Select
          label="Imóvel"
          options={properties.map((p) => ({ value: p.id, label: p.nickname }))}
          value={ud.propertyId}
          onChange={(v) => setUd((d) => ({ ...d, propertyId: v }))}
          hint={
            ud.propertyId && unitsOf(units, ud.propertyId).length > 0
              ? `Este imóvel já tem ${unitsOf(units, ud.propertyId).length} unidade(s).`
              : undefined
          }
        />
        <Select
          label="Situação"
          options={[
            { value: 'vaga', label: 'Vaga' },
            { value: 'alugada', label: 'Alugada' },
          ]}
          value={ud.status}
          onChange={(v) => setUd((d) => ({ ...d, status: v as UnitStatus }))}
        />
        {ud.status === 'alugada' && (
          <Input
            label="Inquilino"
            value={ud.tenant}
            onChange={(v) => setUd((d) => ({ ...d, tenant: v }))}
            placeholder="Ex.: Maria Silva"
            hint="Quem está na lista de inquilinos."
          />
        )}
      </Dialog>

      {/* ---------------- Diálogo: limite do plano (R2) ---------------- */}
      <Dialog
        open={limitOpen}
        onClose={() => setLimitOpen(false)}
        title={`Seu plano permite ${limit ?? 'várias'} unidades`}
        subtitle={`Você tem ${units.length} e o plano ${CURRENT_PLAN} vai até ${limit ?? '—'}.`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setLimitOpen(false)}>
              Depois
            </Button>
            <Button
              onClick={() => {
                setLimitOpen(false);
                go('plans');
              }}
            >
              Ver planos
            </Button>
          </>
        }
      >
        <p className={s.caption}>
          Unidade é o que gera aluguel, e é o que o plano limita. Para passar de {limit ?? '—'} é
          preciso trocar de plano — o plano que resolve aparece na tela de planos, com o preço.
        </p>
        <p className={s.caption}>
          Nada foi cadastrado. O que você digitou continua aqui se você voltar.
        </p>
      </Dialog>
    </div>
  );
}
