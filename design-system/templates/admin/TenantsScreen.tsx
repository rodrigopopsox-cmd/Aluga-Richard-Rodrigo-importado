'use client';

import { useState } from 'react';
import { Badge, Button, Card, CardHeader, DataTable, Dialog, Input, MaskedInput, type DataTableColumn } from '../../components';
import type { Breakpoint } from './useBreakpoint';
import type { ToastInput } from './AdminApp';
import { TENANTS, isTaxIdComplete, kindLabel, taxIdDigits, type Tenant } from './tenantsData';
import s from './Screens.module.css';

/**
 * Inquilinos — cadastro da R2.
 *
 * A R2 manda: nome, CPF/CNPJ validado, WhatsApp **obrigatório** e e-mail
 * opcional. O WhatsApp é obrigatório porque é por ele que sai o lembrete
 * (R5) — inquilino sem WhatsApp não pode ser cobrado pelo app.
 *
 * O campo de documento usa `MaskedInput`, componente novo: CPF, CNPJ,
 * telefone e CEP precisam de formato fixo, e repetir a máscara em cada tela
 * espalharia a mesma lógica. A máscara formata; a validação de dígito
 * verificador é regra de formulário e não está aqui.
 *
 * Dados de demonstração em `tenantsData.ts`.
 */
export interface TenantsScreenProps {
  bp: Breakpoint;
  toast: (t: ToastInput) => void;
}

interface Draft {
  name: string;
  taxId: string;
  kind: Tenant['kind'];
  whatsapp: string;
  email: string;
}

const EMPTY: Draft = { name: '', taxId: '', kind: 'pf', whatsapp: '', email: '' };

export function TenantsScreen({ bp, toast }: TenantsScreenProps) {
  const [rows, setRows] = useState<Tenant[]>(TENANTS);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Tenant | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const mobile = bp === 'm';
  const pad = mobile ? 'var(--space-4-5)' : 'var(--card-padding)';

  /** Só o que a R2 exige: nome, documento completo e WhatsApp. */
  const invalid =
    !draft.name.trim() || !isTaxIdComplete(draft.taxId) || taxIdDigits(draft.whatsapp).length < 10;

  const close = () => {
    setOpen(false);
    setEditing(null);
    setDraft(EMPTY);
  };

  const openNew = () => {
    setEditing(null);
    setDraft(EMPTY);
    setOpen(true);
  };

  const openEdit = (t: Tenant) => {
    setEditing(t);
    setDraft({
      name: t.name,
      taxId: t.taxId,
      kind: t.kind,
      whatsapp: t.whatsapp,
      email: t.email ?? '',
    });
    setOpen(true);
  };

  const save = () => {
    if (invalid) return;
    const tenant: Tenant = {
      id: editing?.id ?? `t${Date.now()}`,
      name: draft.name.trim(),
      taxId: draft.taxId,
      kind: draft.kind,
      whatsapp: draft.whatsapp,
      email: draft.email.trim() || undefined,
      units: editing?.units ?? [],
    };
    setRows((prev) => (editing ? prev.map((x) => (x.id === editing.id ? tenant : x)) : [...prev, tenant]));
    toast({
      tone: 'success',
      title: editing ? 'Inquilino atualizado' : 'Inquilino cadastrado',
      message: editing
        ? `${tenant.name} · ${tenant.whatsapp}`
        : 'Lembre que o WhatsApp é por onde sai a cobrança.',
    });
    close();
  };

  const remove = (t: Tenant) => {
    setRows((prev) => prev.filter((x) => x.id !== t.id));
    toast({ tone: 'info', title: 'Inquilino removido', message: `${t.name} saiu da lista.` });
  };

  const columns: Array<DataTableColumn<Tenant>> = [
    {
      key: 'name',
      label: 'Nome',
      render: (t) => (
        <div className={s.rowStack}>
          <span className={s.rowTitle}>{t.name}</span>
          <span className={s.rowSub}>{kindLabel(t.kind)}</span>
        </div>
      ),
    },
    { key: 'whatsapp', label: 'WhatsApp', render: (t) => t.whatsapp },
    { key: 'taxId', label: 'Documento', render: (t) => t.taxId },
    {
      key: 'units',
      label: 'Unidades',
      render: (t) =>
        t.units.length === 0 ? (
          <span className={s.rowMuted}>sem unidade</span>
        ) : (
          <div className={s.chips}>
            {t.units.map((u) => (
              <Badge key={u} tone="neutral" size="sm">
                {u}
              </Badge>
            ))}
          </div>
        ),
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: (t) => (
        <div className={s.rowActions}>
          <Button size="sm" variant="ghost" onClick={() => openEdit(t)}>
            Editar
          </Button>
          <Button size="sm" variant="ghost" onClick={() => remove(t)}>
            Remover
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.stack}>
      <Card padding={pad}>
        <CardHeader
          title="Inquilinos"
          subtitle="Quem paga o aluguel"
          action={
            <Button icon="plus" onClick={openNew}>
              Novo inquilino
            </Button>
          }
        />
      </Card>

      <Card padding={0}>
        <DataTable columns={columns} rows={rows} empty="Nenhum inquilino cadastrado ainda." />
      </Card>

      <Card padding={pad}>
        <CardHeader title="Como funciona" subtitle="O que cada campo quer dizer" />
        <p className={s.caption}>
          <strong>WhatsApp é obrigatório</strong> porque é por ele que sai o lembrete de
          pagamento — 3 dias antes, no dia e 3 dias depois. Sem WhatsApp, o app não consegue
          cobrar por você. O <strong>documento</strong> pode ser CPF, para pessoa física, ou CNPJ,
          para empresa. O <strong>e-mail é opcional</strong> e serve só para contato. Um inquilino{' '}
          <strong>sem unidade</strong> está cadastrado mas ainda não mora em nenhum lugar — ele
          entra num contrato depois.
        </p>
      </Card>

      <Dialog
        open={open}
        onClose={close}
        title={editing ? 'Editar inquilino' : 'Novo inquilino'}
        subtitle="Nome, documento e WhatsApp"
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              Cancelar
            </Button>
            <Button onClick={save} disabled={invalid}>
              Salvar
            </Button>
          </>
        }
      >
        <Input
          label="Nome"
          value={draft.name}
          onChange={(v) => setDraft((d) => ({ ...d, name: v }))}
          placeholder="Ex.: Maria Silva"
        />
        <MaskedInput
          label={draft.kind === 'pj' ? 'CNPJ' : 'CPF'}
          mask={draft.kind === 'pj' ? 'cnpj' : 'cpf'}
          value={draft.taxId}
          onChange={(formatted) => setDraft((d) => ({ ...d, taxId: formatted }))}
          placeholder={draft.kind === 'pj' ? '00.000.000/0000-00' : '000.000.000-00'}
          hint={
            draft.taxId && !isTaxIdComplete(draft.taxId)
              ? `Faltam ${(draft.kind === 'pj' ? 14 : 11) - taxIdDigits(draft.taxId).length} dígitos.`
              : undefined
          }
        />
        <MaskedInput
          label="WhatsApp"
          mask="phone"
          value={draft.whatsapp}
          onChange={(formatted) => setDraft((d) => ({ ...d, whatsapp: formatted }))}
          placeholder="(00) 00000-0000"
          hint="Obrigatório — é por aqui que sai o lembrete."
          error={
            draft.whatsapp && taxIdDigits(draft.whatsapp).length < 10
              ? 'Informe o DDD e o número.'
              : undefined
          }
        />
        <Input
          label="E-mail (opcional)"
          value={draft.email}
          onChange={(v) => setDraft((d) => ({ ...d, email: v }))}
          placeholder="exemplo@email.com"
        />
      </Dialog>
    </div>
  );
}
