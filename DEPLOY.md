# Subir o Aluga Vibe no ar

Guia para publicar em `https://aluga.vibeai.com.br`.

> **Não consigo fazer este passo por você.** Eu não tenho acesso ao VPS da
> Hostinger nem ao painel do Easypanel, e não peço credenciais. O que está
> aqui é tudo preparado e testado — o último comando é seu.

---

## O que sobe

| Rota | O que é | Acesso |
|---|---|---|
| `/` | Landing | público |
| `/demonstracao` | Painel navegável, sem login | público |
| `/termos` | Termos de uso | público |
| `/privacidade` | Política de privacidade | público |

## O que não sobe

`/design-system`, `/design-system/admin` e `/design-system/identidade` são
rotas de template e de revisão do time. Em produção elas devolvem **404** — o
bloqueio está em `src/proxy.ts`.

O motivo: o login do painel **não verifica senha**. Ele só escreve
`aluga_kit_auth='1'` no navegador e monta o painel. Não existe back-end de
autenticação ainda, porque a conexão com o Supabase ainda não foi feita. Se
essas rotas ficassem abertas, qualquer visitante veria os dados de
demonstração — Casa do CIC, Casa Água Verde, R$ 2.600 de R$ 6.000 previstos —
como se fossem a conta de alguém.

Em desenvolvimento (`npm run dev`) as rotas continuam funcionando normalmente.
É assim que o time revisa as telas.

---

## Antes de publicar: pendências

As páginas legais têm avisos `⚠️` visíveis no lugar onde falta dado real.
**Enquanto eles estiverem lá, não publique:**

- [ ] `/privacidade` — razão social e CNPJ do controlador, endereço, e e-mail do
      encarregado de proteção de dados
- [ ] `/termos` — razão social e CNPJ, e foro (comarca)

Sem o CNPJ e o canal do encarregado, a política de privacidade não atende a
LGPD. O aviso fica propositalmente saltando aos olhos, para não passar
despercebido como se o texto estivesse completo.

---

## Passo a passo

No VPS, dentro da pasta do projeto:

```bash
git pull
npm install
npm run build
npm start
```

O `npm start` sobe na porta 3000. Se o Easypanel já gerencia o processo do
Segundo Cérebro, este app entra como mais um serviço apontando para a porta
3000 — ou a porta que você definir.

### Nenhuma variável de ambiente é necessária

Confiri: o projeto não tem cliente de Supabase, não lê `process.env` em tempo
de execução e não busca serviço externo. A landing e a demonstração são
estáticas. Não há chave, token ou URL para configurar.

### Depois de subir, confira

```bash
curl -I https://aluga.vibeai.com.br/              # 200
curl -I https://aluga.vibeai.com.br/termos        # 200
curl -I https://aluga.vibeai.com.br/privacidade   # 200
curl -I https://aluga.vibeai.com.br/demonstracao  # 200
curl -I https://aluga.vibeai.com.br/design-system/admin  # 404
```

A última linha é a mais importante. Se der 200, o bloqueio não subiu.

---

## O que ainda falta para o app de verdade

Publicar a landing não publica o produto. Em ordem:

1. **Cliente Supabase** — a dependência não está no `package.json` e não há
   nenhuma query no código.
2. **Trocar os `*Data.ts` por dados reais** — as telas leem de
   `contractsData.ts`, `chargesData.ts`, `propertiesData.ts`, `tenantsData.ts`.
3. **Autenticação real** — hoje é `localStorage`; precisa ser Supabase Auth.
4. **Rota `/app`** — a spec R10 fala em `/app`, mas o painel está em
   `/design-system/admin`. Isso é divergência a resolver junto com o item 3.

Quando os itens 1 a 3 estiverem prontos, `src/proxy.ts` pode ser apagado — o
comentário no topo do arquivo explica.

---

## Estado atual

- Commit da marca e das páginas legais: `89e1b4f`
- Commit do bloqueio de produção: `0d15744`
- Branch: `arena/8e2745c8-aluga-richard-rodrigo-importad`
- Para voltar atrás: `git checkout rodrigo/antes-aluga-vibe -- <arquivos>`
