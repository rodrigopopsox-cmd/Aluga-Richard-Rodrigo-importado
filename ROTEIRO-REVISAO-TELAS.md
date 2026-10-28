# Roteiro de revisão — 7 telas da v1

**Branch:** `arena/8e2745c8-aluga-richard-rodrigo-importado`
**Commits:** `f997f43` `528b6cc` `f4924d9` `c56e6c7` `59c7959` `50ebd2f` `8b1c812` `b993638` `ee8b8d4`

Para pegar tudo na sua máquina:

```powershell
cd "C:\Users\Digo Nego\Documents\Aluga-Richard-Rodrigo-importado"
git pull origin arena/8e2745c8-aluga-richard-rodrigo-importad
```

Depois abra `http://localhost:3000/design-system/admin` e faça **Ctrl+Shift+R** (o cache de CSS
em dev teima em servir o antigo).

---

## Antes de tudo: o Painel ainda está sujo

O **Painel** (primeira tela que abre) continua com os cards do template genérico que não existem
no produto: *Visitas*, *Novos Contratos*, *Manutenção*, *Insights (Assistente IA)* e *Saúde
Financeira* com um percentil inventado. **Não é das 7.** Ignore por enquanto — é a próxima da
lista, e eu não quis tocar nela no meio da revisão das outras.

---

## 1. Este mês (Modo simples)

Commit `f997f43` + `528b6cc`. É a tela que a Vó abre todo dia.

**O que a R7 pediu:** cabeçalho com mês e navegação; resumo "R$ recebidos de R$ esperados";
um card por unidade com status **em palavras**; botões **Recebi** e **Lembrar no WhatsApp**.

**Olhe:**
- O status está em frase, não em número? ("Recebido", "Falta receber", "Atrasado")
- Os botões **Recebi** e **Lembrar no WhatsApp** aparecem em cada unidade?
- A navegação de mês (‹ ›) funciona?

**Já ajustado por você:** as letras estavam grandes demais. Baixei para os tokens padrão do app
(`Metric lg` 48px, corpo 16px). Confirme se agora está no tamanho certo.

---

## 2. Cobranças

Commit `f4924d9`. É a R3 inteira.

**O que a R3 pediu:** 5 estados (`prevista → aberta → paga | atrasada | cancelada`); recebimento
manual com valor/data/origem; **recebimento parcial deixa em aberto e mostra o saldo**; desfazer
com registro de quem e quando.

**Teste de verdade — clique:**
1. Clique em **Registrar recebimento** numa cobrança em aberto.
2. Digite um valor **menor** que o total (ex.: 400 de 800). Veja se aparece o **saldo em aberto**.
3. Registre. A cobrança continua **Em aberto**, não Paga?
4. Numa cobrança **Paga**, clique em **Desfazer**. Volta para aberta?

**Números do mês 10/2026:** R$ 2.600 recebido · R$ 1.800 em aberto · R$ 4.400 previsto.
A Kitnet tem R$ 400 de R$ 800 de propósito — é o caso do recebimento parcial.

---

## 3. Recebimentos

Commits `c56e6c7` + `59c7959`. É a R7 do painel completo.

**O que a R7 pediu:** receita, despesas, resultado e ocupação por mês/trimestre/ano; fluxo de
caixa; lista "Precisa de atenção".

**Olhe:**
- Os 4 cards: **Recebido R$ 5.600,00** · **Despesas R$ 962,00** · **Resultado R$ 4.638,00** ·
  **Ocupação 78%**. Os valores aparecem **inteiros**, sem cortar? (Você reclamou que aparecia
  "R$ 5.600,0" — baixei de 48px para 36px nos 4 cards.)
- O **SegmentedControl Mês/Trimestre/Ano** troca o gráfico?
- O card **"Precisa de atenção"** tem 1 cobrança atrasada + WhatsApp desconectado?
- O **Switch "Lembretes no WhatsApp"** está no lugar do antigo "Cobrança automática"?

**Total de demonstração:** R$ 5.600,00 recebido · R$ 962,00 despesas · R$ 4.638,00 resultado ·
78% ocupação.

---

## 4. Inquilinos

Commit `50ebd2f`. R2 do inquilino.

**O que a R2 pediu:** nome, CPF/CNPJ, **WhatsApp obrigatório**, e-mail opcional.

**Teste de verdade — clique:**
1. **Novo inquilino**. Deixe o WhatsApp vazio → o botão **Salvar** fica desabilitado?
2. Digite um CPF incompleto → aparece "Faltam N dígitos"?
3. Troque para pessoa jurídica → o campo muda de CPF para **CNPJ** com a máscara certa?
4. Digite o WhatsApp → formata sozinho como `(41) 99999-0001`?

**Olhe:** quem está cadastrado mas não mora em lugar nenhum aparece como **"sem unidade"** —
isso é estado real, não espaço em branco.

**Os CPFs são inválidos de propósito** (sequências tipo 123.456.789-00). Não é bug: validação de
dígito verificador não existe em lugar nenhum do app, e isso é uma decisão que **precisa da sua
assinatura**. Me diz se você quer que eu faça.

---

## 5. Contratos

Commit `8b1c812`. R2 do contrato.

**O que a R2 pediu:** unidade, inquilino, valor, dia de vencimento (1 a 31), início, fim
opcional, índice de reajuste (IGP-M, IPCA, % fixo ou nenhum) e mês de aniversário.

**Olhe:**
- 5 contratos. A **Kitnet** mostra **"termina em 38 dias"** (fim 05/12/2026).
- A **Loja Centro** mostra **Encerrado** e "terminou há 89 dias" — o contrato dela acabou em
  31/07/2026, e é por isso que a unidade está vaga na tela de Imóveis.
- O reajuste aparece como **IGP-M**, **IPCA**, **7% fixo** ou **Sem reajuste**.

**Teste de verdade — clique:**
1. **Novo contrato**. Sem escolher unidade, a mensagem de erro **não** aparece (só depois de
   tentar salvar). Confirma?
2. Clique em **Salvar** sem preencher → aparece "Escolha a unidade."?
3. Escolha reajuste **% fixo** → aparece o campo **Percentual fixo**?

**O que não tem, de propósito:** multa, juros de mora, garantia, carência. A spec deixa o
documento do contrato fora da v1. Também **não** tem alerta de fim de contrato — o aviso de 60/30
dias é v1.1. A lista só mostra o prazo.

---

## 6. Imóveis

Commit `b993638`. R2 do imóvel e da unidade. **A tela que mudou de forma.**

**Olhe primeiro:** a tabela lista **UNIDADES**, não imóveis. Imóvel de uma unidade só aparece
como o próprio apelido ("Casa do CIC"). Imóvel com várias aparece como **"Ed. Comercial Centro ·
Loja Centro"**. Isso é a regra da R2: *"Imóvel de uma unidade só cria a unidade sozinho, e o
usuário não vê a diferença."*

**Olhe:**
- 4 imóveis, 5 unidades. **Loja Centro está Vaga** (contrato encerrado).
- A **Kitnet** tem **dois titulares: Iara Alves 60% · Rodrigo Alves 40%**. É o caso "meu e do meu
  marido" da spec, e o que prova a regra da soma dar 100%.
- 4 cards de resumo: Imóveis 4 · Unidades 5 · Alugadas 4 · Vagas 1.

**TESTE MAIS IMPORTANTE DE TODOS — o CEP:**

1. Clique em **Novo imóvel**.
2. Digite um CEP (ex.: `80600-000`) e saia do campo.
3. **A rua, o bairro e a cidade preenchem sozinhos?**

> **Eu não pude testar isso.** O ViaCEP dá timeout neste sandbox (aqui só acessa github, npm e
> pypi). No seu navegador deve funcionar — mas eu não vi funcionar, então não posso afirmar.
> Se não preencher, o hint diz "Não deu para buscar o CEP. Preencha o endereço na mão" e os
> campos ficam abertos. **Me diz o que aconteceu.**

**Teste de verdade — clique:**
4. Em **Titulares**, deixe a soma em 90% → aparece "A soma dos titulares está em 90% — precisa
   dar 100%."?
5. Clique em **Adicionar titular** → aparece a segunda linha com nome e %?

---

## 7. Despesas

Commit `ee8b8d4`. A R8 inteira. **A última.**

**Olhe:**
- 3 cards: **Despesas de 2026 R$ 2.840** · **Recebido no ano R$ 65.000** · **Resultado R$ 62.160**
- 6 despesas, com chips por categoria (IPTU · R$ 1.000 etc.)
- **Informe de rendimentos**: mês a mês, com **Total de 2026 — R$ 61.160 recebido · R$ 2.490 de
  despesas · R$ 58.670 de resultado** (fatia da Iara)
- **Recebido por inquilino**: separado por **Pessoa física** / **Pessoa jurídica** (Clínica Vida
  Ltda é PJ)

**Teste de verdade — clique:**
1. Troque o **Titular** no informe para **Rodrigo Alves** → os números mudam? (Deve dar R$ 3.840
   recebido, que são os 40% dele na Kitnet.)
2. Clique em **Baixar extrato CSV** → baixa `extrato-aluga-2026-01-a-2026-12.csv`?
3. Abra no Excel. As colunas estão separadas? Os valores com vírgula decimal?

**Duas coisas que a tela repete e você deve ler:**
- **O reajuste não entra na conta.** A receita é o valor atual de cada contrato repetido em cada
  mês ativo — histórico de reajuste não existe na v1. O informe fecha por titular e por mês, mas
  **não é o número para declarar**.
- **Em PDF ainda não.** Sai em tabela e CSV. Falta o formato, não a informação.

---

## O que eu não validei em nenhuma das 7

Minha validação é SSR: eu provo que **compila** e que a **lista renderiza certa**. Os diálogos de
cadastro só aparecem com estado aberto, então **digitar, salvar, encerrar e remover não foram
testados por mim**. São exatamente os itens "Teste de verdade — clique" acima.

---

## Resumo do que pode estar errado

| # | Tela | Risco |
|---|---|---|
| 1 | Este mês | tamanho da letra — você já reclamou uma vez, pode ter errado a mão de novo |
| 2 | Cobranças | recebimento parcial e desfazer — cliquei em nada |
| 3 | Recebimentos | proporcionamento dos cards e do gráfico |
| 4 | Inquilinos | máscaras e validação do diálogo |
| 5 | Contratos | validação dos 8 campos e encerrar |
| 6 | Imóveis | **CEP não testado** · titulares · limite do plano |
| 7 | Despesas | download do CSV · troca de titular no informe |

**Limite do plano ainda não testado:** com 5 unidades no plano Essencial (até 5), clicar em
**Nova unidade** e salvar deve aparecer a tela *"Seu plano permite 5 unidades"*. Não testei.
