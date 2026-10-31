import type { Metadata } from 'next';
import s from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Privacidade · Aluga Vibe',
  description:
    'Quais dados o Aluga Vibe guarda, por que guarda, com quem compartilha e como você pede acesso ou exclusão.',
};

/**
 * Política de privacidade — item da R10 da spec.
 *
 * REGRA DESTA PÁGINA: só fato. O que o produto faz de verdade está descrito
 * com os nomes reais das tabelas e dos serviços. O que ainda não existe
 * (portal do inquilino, consulta a órgãos de proteção ao crédito) NÃO está
 * aqui, porque prometer coleta que não acontece é pior que omitir.
 *
 * LGPD: Lei 13.709/2018.
 */
export default function PrivacidadePage() {
  return (
    <main className={s.page}>
      <a className={s.back} href="/">
        Voltar ao site
      </a>

      <h1 className={s.title}>Privacidade</h1>
      <p className={s.updated}>Última atualização: 31 de outubro de 2026.</p>

      <div className={s.pending}>
        <strong>⚠️ Falta preencher antes de publicar:</strong> razão social e CNPJ de quem
        controla os dados, endereço, e e-mail do encarregado de proteção de dados. Sem esses
        três itens esta página não pode ir ao ar — a LGPD exige a identificação do controlador
        e um canal de contato.
      </div>

      <div className={s.body}>
        <h2>Quem cuida dos seus dados</h2>
        <p>
          O controlador dos dados é a pessoa ou empresa que opera o Aluga Vibe. ⚠️ Razão
          social e CNPJ a preencher. Qualquer dúvida sobre esta página pode ser enviada ao
          encarregado de proteção de dados pelo e-mail ⚠️ a preencher.
        </p>

        <h2>O que guardamos</h2>
        <p>Só o que é necessário para o aluguel funcionar. Nada além disso.</p>
        <ul>
          <li>
            <strong>Sobre você:</strong> nome, e-mail, senha (guardada como código, não como
            texto) e WhatsApp, se você informar.
          </li>
          <li>
            <strong>Imóveis e unidades:</strong> endereço, tipo (casa, kitnet, sala, apartamento)
            e quantas unidades cada imóvel tem.
          </li>
          <li>
            <strong>Inquilinos:</strong> nome e WhatsApp, para a cobrança chegar.
          </li>
          <li>
            <strong>Contratos:</strong> valor do aluguel, dia de vencimento, índice de reajuste
            e data de início.
          </li>
          <li>
            <strong>Cobranças e recebimentos:</strong> valor, vencimento, situação e por onde
            entrou o dinheiro — Mercado Pago, WhatsApp ou registro manual.
          </li>
          <li>
            <strong>Despesas:</strong> categoria (IPTU, condomínio, manutenção, taxa) e valor.
          </li>
        </ul>

        <h2>Por que guardamos</h2>
        <p>
          Para executar o que você contratou: organizar imóveis e unidades, gerar a cobrança do
          mês a partir do contrato, registrar o que foi recebido, calcular o resultado e separar
          os valores por titular no fim do ano. Não usamos seus dados para outra coisa, e não
          vendemos para ninguém.
        </p>

        <h2>Com quem compartilhamos</h2>
        <p>Três serviços, cada um com um papel definido:</p>
        <ul>
          <li>
            <strong>Supabase</strong> — onde o banco de dados e o login funcionam. Os dados
            ficam em servidor em São Paulo.
          </li>
          <li>
            <strong>Mercado Pago</strong> — processa a assinatura e os recebimentos. Os dados de
            cartão e Pix passam por eles, não por nós.
          </li>
          <li>
            <strong>Evolution API</strong> — a conexão de WhatsApp. As mensagens de cobrança
            saem do WhatsApp do próprio proprietário, usando a conexão que ele autorizou.
          </li>
        </ul>
        <p>
          Quando um inquilino responde a uma cobrança, a resposta é lida por um serviço
          automatizado para saber se ele pagou. Quando a leitura não tem certeza, o sistema
          pergunta em vez de adivinhar.
        </p>

        <h2>Por quanto tempo guardamos</h2>
        <p>
          Enquanto sua conta existir. Se você pedir exclusão, apagamos os dados em até 30 dias,
          exceto o que a lei obriga a guardar — recibos e documentos fiscais, por exemplo.
        </p>

        <h2>Seus direitos</h2>
        <p>A Lei Geral de Proteção de Dados garante que você possa, a qualquer momento:</p>
        <ul>
          <li>saber quais dados temos sobre você;</li>
          <li>corrigir dados errados ou desatualizados;</li>
          <li>pedir a exclusão dos seus dados;</li>
          <li>levar seus dados para outro serviço;</li>
          <li>retirar um consentimento que você tinha dado;</li>
          <li>reclamar sobre o tratamento dos seus dados.</li>
        </ul>
        <p>
          Para exercer qualquer um desses direitos, escreva para o encarregado no e-mail ⚠️ a
          preencher. Respondemos em até 15 dias.
        </p>

        <h2>Segurança</h2>
        <p>
          O acesso aos dados é protegido por regras no próprio banco: cada pessoa só alcança o
          que é dela. As senhas não são guardadas em texto. A conexão entre o site e o servidor é
          criptografada.
        </p>

        <h2>Crianças e adolescentes</h2>
        <p>
          O Aluga Vibe é feito para quem administra imóveis. Não é destinado a menores de 18
          anos e não coletamos dados de crianças ou adolescentes de propósito.
        </p>

        <h2>Mudanças nesta página</h2>
        <p>
          Se esta política mudar, avisamos por e-mail com pelo menos 15 dias de antecedência.
          A data no topo da página mostra quando ela foi alterada pela última vez.
        </p>
      </div>
    </main>
  );
}
