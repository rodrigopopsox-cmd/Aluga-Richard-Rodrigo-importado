# Contexto do projeto — Aluga (para o sócio Rodrigo e para qualquer IA que for assumir)

> Documento de handoff. Ele existe para que **qualquer IA** (ou pessoa) consiga entrar no
> projeto sem perguntar nada: o que já está pronto, o que está quebrado, como rodar e
> quais são as regras inegociáveis.
>
> Última atualização: 2026-10-27.

---

## 1. O que é o projeto

Site do **Aluga** (gestão de aluguéis para o mercado brasileiro), composto de duas frentes:

| Frente | O que é | Onde vive |
|---|---|---|
| **Vitrine do Design System** | Página `/design-system` que exibe todos os componentes, tokens e telas de exemplo | `src/app/design-system/` |
| **Template do painel admin** | Telas reais do produto (Painel, Imóveis, Manutenção, Financeiro, Login) montadas só com componentes do design system | `design-system/templates/admin/` |

O design system é a **fonte da verdade visual**: nada de CSS solto, nada de cor/tamanho
inventado fora dos tokens.

---

## 2. Ambientes e fonte da verdade

- **Fonte da verdade dos arquivos do projeto: Google Drive** — pasta `Aluga Richard/Rodrigo`
  (id `1GQtEFPQAQUzX6KLQJjpDvi4uBSjknV3c`). O Drive é onde os arquivos são editados/versionados.
- **Repo git:** `rodrigopopsox-cmd/Aluga-Richard-Rodrigo-importado` (espelho de validação).
- **Preview local:** extração de `origin/main` + patches de sandbox, rodando em `http://localhost:3000`.

Pastas relevantes no Drive:

| Pasta | id |
|---|---|
| `templates/admin` | `1OZyIhifpA6fTfXQeuPlDivLFam33B-eh` |
| `src/app/design-system` | `1kQ36-EOqYOtWeaJR-RIkFsrNUFcJu_bY` |
| tokens (`design-system/tokens`) | `1zFBOWwKL4YlR3vERg-3X8s_Bivi24UiQ` |
| `DESIGN.md` | arquivo `1JyZPbSGWDQWkJwPqq5kEHqv2rwW343B8` |

---

## 3. Como rodar

```bash
npm install
npm run dev          # http://localhost:3000
```

Páginas úteis:

- `http://localhost:3000/design-system` — vitrine
- `http://localhost:3000/design-system/admin` — template do painel (login: `admin` / `admin`)

Validações obrigatórias antes de dizer "pronto":

```bash
node scripts/check-tokens.mjs    # tokens ↔ DESIGN.md (precisa dar 208 OK)
npx tsc --noEmit                 # TypeScript sem erro
```

---

## 4. Estado atual (o que já está entregue e validado)

### 4.1 Tokens corrigidos (acessibilidade de cor e tamanho)

| Token | Valor | Por quê |
|---|---|---|
| `--brand` | laranja 700 `#C2410C` | contraste 5,18:1 com texto branco (AA) |
| `--brand-hover` | laranja 800 `#9A3412` | 7,31:1 (AA) |
| `--focus-ring` | `rgba(154,52,18,.4)` | anel de foco visível |
| `--text-base` | **16px** | antes 14px, pequeno demais |
| `--type-label` | passa a usar `--text-sm` | |
| alturas de controle (`sm`/`md`/`field`) | **48px** | alvo de toque confortável |

`#F75831` (laranja vivo) continua existindo, mas **só** para dados/urgência — nunca como
cor de ação principal.

### 4.2 Camada de acessibilidade opt-in (`design-system/tokens/a11y.css`)

- Ativada por `<html data-a11y="on">`.
- Amplia a escala tipográfica em ~1,125 (base 18px) e todos os `--control-h-*` para 56px.
- **Não mexe em cor, espaçamento ou raio** — é só texto e alvo de toque.
- Importada **por último** em `tokens/index.css`, para sobrescrever a base.
- É deliberadamente **externa** ao espelho `DESIGN.md ↔ tokens` (o validador só lê
  `colors/typography/spacing/radii/effects.css`).

### 4.3 Acessibilidade + tema como configuração no template do painel

- `design-system/templates/admin/useSettings.ts` — hook com persistência em
  `localStorage` (`aluga_a11y`, `aluga_theme`).
- `design-system/templates/admin/SettingsMenu.tsx` + `SettingsMenu.module.css` — o menu
  da engrenagem (ícone `settings`, no mesmo estilo `IconButton` dos demais ícones).
- Duas superfícies compartilham o mesmo estado: o menu do painel e o Switch da vitrine.
- Overrides por URL: `?a11y=on`, `?theme=dark`.

---

## 5. 🔴 BUG CONHECIDO E CORREÇÃO (leia isso se o menu sumir/ficar atrás)

### Sintoma

Clica na engrenagem (menu esquerdo, embaixo dos ícones) e o painel **não aparece**, ou
aparece só um fio branco atrás dos cards. Ou os tooltips dos ícones do rail não aparecem.

### Causa raiz (não é cache — é stacking context)

1. `design-system/templates/admin/Shell.module.css` → `.railColumn { position: sticky }`.
   **`position: sticky` cria um stacking context.**
2. `design-system/components/data/Card.module.css` → `.card { position: relative }`.
3. Os dois ficam com `z-index: auto` no contexto raiz, então são pintados **na ordem do DOM**.
   Os cards vêm **depois** do rail → os cards passam por cima de **tudo** que está dentro
   do rail, inclusive o popover, mesmo ele tendo `z-index: 30` — porque esse `30` fica
   preso *dentro* do stacking context do rail e não compara com os cards.

### Correção (1 linha)

Em `design-system/templates/admin/Shell.module.css`:

```css
.railColumn {
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 20;   /* ← ADICIONAR. sticky cria stacking context; sem isso o popover
                    da engrenagem e os tooltips do rail ficam atrás dos cards. */
  /* ...resto igual... */
}
```

Com isso o rail vira um stacking context em `z-index: 20`, pintado acima dos cards
(`position: relative; z-index: auto`), e o popover (`z-index: 30`, dentro do rail)
aparece por cima de tudo. Continua abaixo de `Dialog` (`z-index: 100`) e do toast
(`z-index: 200`), que devem mesmo ficar por cima.

### Armadilha de cache em dev (Turbopack)

O Turbopack serve o CSS de módulo por uma **URL estável** que não muda quando você edita o
arquivo. Ou seja: editar o CSS **não garante** que o navegador/proxy pegue a versão nova.

- Confie no conteúdo servido, não na URL: baixe o chunk e procure a regra.
- Sempre peça um **Ctrl+Shift+R** após mudança de CSS.
- Se precisar furar o cache de verdade, crie um **arquivo CSS module novo** (muda o chunk).

---

## 6. Armadilhas conhecidas (já pagamos por elas)

1. **`edit_file` em lote no MESMO arquivo perde edições.** Duas ou três edições no mesmo
   arquivo numa mesma resposta podem ser descartadas em silêncio. → Aplique **uma edição
   por chamada** e confira com `grep` depois.
2. **Push pro Drive altera o mime type** (`.ts` sobe como `text/javascript`, `.css` como
   `text/css`). Não é problema funcional, mas não estranhe.
3. **Sempre leia de volta o arquivo do Drive** antes de re-enviar, para não sobrescrever
   edição de outra pessoa.
4. **Transcrição perde bytes** em comentários JSDoc longos (já aconteceu: 2 bytes). Confira
   o tamanho após o push.
5. **`grep` em CSS não-minificado engana:** `-A 4` corta propriedades e `.{0,180}` para na
   primeira newline. Use `grep -A 12 "<seletor> {"` e inspecione o arquivo.
6. **`next/font/google` não funciona em sandbox** (sem acesso à internet). Use
   `@fontsource/plus-jakarta-sans`.
7. **Componente `Switch`** fica em `design-system/components/forms/Switch.tsx` e usa
   `Toggle.module.css` (não existe `Switch.module.css`).

---

## 7. Regras inegociáveis do combinado

1. **Só executa tarefas do Rodrigo (Marca).** Tarefas do Richard (Produto) ficam com ele —
   inclusive o trabalho dele já feito, os projetos Supabase e o repo `black-navalha`.
2. **Diagnóstico antes de mudança.** Nada de sair editando.
3. **Nada de operação destrutiva** em banco, **nada de desligar RLS**, **nada de bucket
   público**, **nada de push/publicar na `main` sem autorização**.
4. **Nunca expor segredos, chaves ou dados pessoais** em docs, prints ou memória. Não pedir
   nem aceitar senha de terceiros em chat.
5. **Nada de dado mockado ou "pronto" inventado.** Produção de verdade, validada.
6. **Atualizar docs existentes no Drive, sem duplicar.**
7. **A vitrine é aditiva:** o design aprovado não muda, só ganha função.
8. **Acessibilidade: só texto e alvo de toque.** Sem mudança de cor.
9. **Acessibilidade/tema como configuração fica no template do painel**, com ícone de
   engrenagem **seguindo o estilo dos ícones já existentes** (`IconButton`). O foco é a área
   do template.
10. **Texto de ajuda é para o cliente final:** sem jargão técnico. Ex.: "Deixa o texto e os
    botões maiores." (não mencionar px).

---

## 8. Próximas tarefas em aberto

- [ ] Conferir no navegador, após Ctrl+Shift+R, que o painel da engrenagem abre **por cima**
      dos cards (correção da seção 5).
- [ ] Sincronizar o `Showcase.tsx` da vitrine com a versão que compartilha o
      `localStorage` com o painel (hoje o Drive ainda tem a versão antiga, só com URL).
- [ ] Engenharia reversa do **Aluga Pro** (produto já no ar) a partir de prints ou exports
      "Salvar como"/PDF — **bloqueado** até o usuário mandar o material. Não é possível
      acessar sites externos do ambiente atual, e não aceitamos credenciais em chat.

---

## 9. Mapa rápido de arquivos

```
design-system/
  tokens/
    colors.css  typography.css  spacing.css  radii.css  effects.css   ← validados por check-tokens
    index.css                                                          ← importa tokens + a11y (por último)
    a11y.css                                                          ← camada opt-in (fora do validador)
  components/
    core/IconButton.tsx        ← botão circular de ícone (variants: soft/dark/brand/white/ghost/inverse)
    forms/Switch.tsx           ← usa Toggle.module.css
    data/Card.tsx              ← .card { position: relative }  ← envolvido no bug da seção 5
    navigation/SideRail.tsx    ← props: items, value, onChange, footer, className, style
  templates/admin/
    AdminApp.tsx               ← usa useSettings
    Shell.tsx                  ← rail + topbar + bottom bar (mobile)
    Shell.module.css           ← .railColumn (onde entra o z-index: 20)
    SettingsMenu.tsx           ← engrenagem + popover (align: 'rail' | 'header')
    SettingsMenu.module.css    ← .panel / .fromRail / .fromHeader / .hint
    useSettings.ts             ← localStorage aluga_a11y / aluga_theme
    useBreakpoint.ts  data.ts  index.ts  README.md
    DashboardScreen  AnalyticsScreen  PropertiesScreen  MaintenanceScreen  FinanceScreen  LoginScreen
src/app/design-system/
    page.tsx  Showcase.tsx  Showcase.module.css
    admin/page.tsx            ← renderiza <AdminApp />
```
