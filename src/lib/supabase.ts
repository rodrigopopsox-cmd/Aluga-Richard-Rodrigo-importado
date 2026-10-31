import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Ponte com o Supabase.
 *
 * ESTE ARQUIVO AINDA NÃO ESTÁ LIGADO A NENHUMA TELA. Ele existe para que a
 * conexão possa ser testada antes de a gente trocar os dados de demonstração
 * pelos reais. Nenhuma tela importa daqui ainda — quando isso acontecer, o
 * painel passa a mostrar o que está no banco, e aí os `*Data.ts` saem.
 *
 * SEM CREDENCIAL NO CÓDIGO. A URL e a chave pública vêm de variáveis de
 * ambiente (`NEXT_PUBLIC_*`, que o Next injeta no navegador). Se elas não
 * existirem, `supabase` fica `null` e `supabaseConfigurado` fica `false` — o
 * app continua funcionando, só não conversa com o banco. Copie `.env.example`
 * para `.env.local` e preencha.
 *
 * SÓ A CHAVE PÚBLICA. A chave `anon` pode ir no navegador: quem a tem só
 * alcança o que as políticas de RLS deixarem, e as 17 tabelas têm RLS ativo.
 * A chave de serviço (`service_role`) ignora o RLS e **nunca** pode entrar
 * numa variável `NEXT_PUBLIC_*`.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** `true` quando as duas variáveis estão preenchidas. */
export const supabaseConfigurado = Boolean(url && anonKey);

/** O cliente, ou `null` enquanto não houver credencial. */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

// ── tipos que espelham os enums do banco ────────────────────────────────────

/** Enum `plan`: essencial, familia, patrimonio, investidor. */
export type Plano = 'essencial' | 'familia' | 'patrimonio' | 'investidor';

/** Enum `member_role`: owner, helper. */
export type Papel = 'owner' | 'helper';

// ── as funções que o app pode chamar ───────────────────────────────────────
//
// O banco tem 10 funções, mas só estas 5 são chamáveis de fora. As outras
// cinco são gatilhos que rodam sozinhos dentro do Postgres e com os quais a
// interface não conversa:
//
//   enforce_helper_limit   em members          — no máximo 2 ajudantes
//   enforce_owner_limit    em owners           — respeita o limite de titulares
//   enforce_unit_limit     em units            — respeita o limite de unidades
//   check_property_shares  em property_owners  — soma das participações = 100%
//   handle_new_user        em auth.users       — cria dono e organização no cadastro

/**
 * Quantas unidades o plano permite. `null` = ilimitado (plano investidor).
 *
 * Conferido no banco em 31/10/2026: essencial 5, familia 10, patrimonio 50,
 * investidor ilimitado. Bate com a tela de planos.
 */
export async function limiteUnidades(plano: Plano): Promise<number | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc('plan_unit_limit', { p: plano });
  if (error) throw error;
  return data;
}

/** Quantos titulares o plano permite. `null` = ilimitado. */
export async function limiteTitulares(plano: Plano): Promise<number | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc('plan_owner_limit', { p: plano });
  if (error) throw error;
  return data;
}

/** A pessoa logada pertence à organização? */
export async function souMembro(organizacao: string): Promise<boolean> {
  if (!supabase) return false;
  const { data, error } = await supabase.rpc('is_member', { org: organizacao });
  if (error) throw error;
  return Boolean(data);
}

/** A pessoa logada é dona da organização? */
export async function souDono(organizacao: string): Promise<boolean> {
  if (!supabase) return false;
  const { data, error } = await supabase.rpc('is_owner', { org: organizacao });
  if (error) throw error;
  return Boolean(data);
}

/**
 * Convida um ajudante para a organização.
 *
 * CUIDADO — isto tem efeito colateral real: a função cria o registro em
 * `members` e dispara e-mail de convite. Não é consulta de leitura. Só chame
 * a partir de uma ação deliberada do usuário, nunca em teste automático.
 */
export async function convidarAjudante(
  organizacao: string,
  email: string,
): Promise<string> {
  if (!supabase) throw new Error('Supabase não configurado.');
  const { data, error } = await supabase.rpc('invite_helper', {
    org: organizacao,
    invite_email: email,
  });
  if (error) throw error;
  return data;
}
