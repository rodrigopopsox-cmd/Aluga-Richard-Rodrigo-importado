import type { Metadata } from 'next';
import s from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Termos de uso · Aluga Vibe',
  description:
    'As regras para usar o Aluga Vibe: contas, planos, teste grátis, o que o serviço não faz e como cancelar.',
};

/**
 * Termos de uso — item da R10 da spec.
 *
 * REGRA DESTA PÁGINA: os preços, limites e condições são os que o documento de
 * produto define e que a tela de planos mostra. Nada foi inventado aqui — se
 * um número aparece nesta página, ele aparece também no produto.
 *
 * O parágrafo "o que o Aluga Vibe não faz" é o mais importante. Ele existe
 * para deixar claro que a ferramenta organiza e calcula, mas não substitui
 * contrato, contador nem advogado.
 */
export default function TermosPage() {
  return (
    <main className={s.page}>
      <a className={s.back} href="/">
        Voltar ao site
      </a>

      <h1 className={s.title}>Termos de uso</h1>
      <p className={s.updated}>Última atualização: 31 de outubro de 2026.</p>

      <div className={s.pending}>
        <strong>⚠️ Falta preencher antes de publicar:</strong> razão social e CNPJ, e o foro
        (comarca) onde eventuais disputas serão resolvidas.
      </div>

      <div className={s.body}>
        <h2>O que é o Aluga Vibe</h2>
        <p>
          Um sistema para quem administra os próprios imóveis. Ele organiza imóveis e unidades,
          guarda os contratos, gera a cobrança do mês, registra o que foi recebido, acompanha as
          despesas e mostra o resultado. Quem tem imóvel em nome de mais de uma pessoa pode
          separar os valores por titular.
        </p>

        <h2>Sua conta</h2>
        <p>
          Você cria a conta com nome, e-mail e senha. A conta é pessoal e intransferível. Você
          pode convidar até dois ajudantes por plano, sem custo — um ajudante acessa o que você
          liberar e não pode convidar mais ninguém.
        </p>
        <p>
          Se você esquecer a senha, recuperamos pelo e-mail cadastrado. Não temos como descobrir
          sua senha — ela fica guardada como código, nem nós conseguimos ler.
        </p>

        <h2>Teste grátis</h2>
        <p>
          São 14 dias de teste, sem pedir cartão. Durante o teste você usa tudo. Se não fizer
          nada ao fim dos 14 dias, a conta simplesmente para de funcionar — não cobramos
          automaticamente e não pedimos dados de pagamento para começar.
        </p>
        <p>
          Quem entrar no período de fundadores tem o primeiro mês grátis.
        </p>

        <h2>Planos e pagamento</h2>
        <p>O plano muda pelo número de unidades e de titulares:</p>
        <ul>
          <li>
            <strong>Essencial</strong> — R$ 59 por mês, até 5 unidades, 1 titular.
          </li>
          <li>
            <strong>Família</strong> — R$ 99 por mês, até 10 unidades, 3 titulares.
          </li>
          <li>
            <strong>Patrimônio</strong> — R$ 209 por mês, até 50 unidades, 5 titulares.
          </li>
          <li>
            <strong>Investidor</strong> — R$ 269 por mês, unidades e titulares ilimitados.
          </li>
        </ul>
        <p>
          Titular adicional custa R$ 9 por mês. No plano anual você paga 10 meses e usa os 12.
          O pagamento é por assinatura, processado pelo Mercado Pago. Os valores podem ser
          reajustados, e avisamos com pelo menos 30 dias de antecedência.
        </p>

        <h2>O que o Aluga Vibe não faz</h2>
        <p>
          Este é o ponto mais importante destes termos. O Aluga Vibe organiza, calcula e avisa.
          Ele <strong>não</strong>:
        </p>
        <ul>
          <li>escreve, revisa ou assina contrato de aluguel por você;</li>
          <li>substitui contador, advogado ou consultoria tributária;</li>
          <li>
            calcula imposto de renda — ele apenas separa os valores por titular para você levar
            a quem declare;
          </li>
          <li>cobra o inquilino no seu lugar — as mensagens saem do seu WhatsApp, com sua autorização;</li>
          <li>garante que o inquilino vai pagar.</li>
        </ul>
        <p>
          Os números de reajuste (IGP-M, IPCA) são informados por você no contrato. O Aluga Vibe
          não busca índice em nenhum banco central.
        </p>

        <h2>Uso aceito</h2>
        <p>
          Você concorda em usar o serviço de forma legal. Não pode usar o Aluga Vibe para
          enviar spam, assediar inquilinos, armazenar dados de terceiros sem autorização, nem
          tentar acessar dados de outra conta.
        </p>

        <h2>Seus dados</h2>
        <p>
          O que coletamos, por que e com quem compartilhamos está na{' '}
          <a href="/privacidade">política de privacidade</a>, que faz parte destes termos.
        </p>

        <h2>Cancelamento</h2>
        <p>
          Você cancela quando quiser, sem multa e sem falar com ninguém. O acesso continua até o
          fim do período já pago. Não há reembolso proporcional de dias não usados, exceto onde a
          lei exigir.
        </p>
        <p>
          Nós podemos suspender uma conta que descumpra estes termos, avisando antes — exceto em
          caso de uso ilegal, onde a suspensão pode ser imediata.
        </p>

        <h2>Responsabilidade</h2>
        <p>
          Fazemos o possível para o serviço funcionar sem parar, mas não garantimos
          disponibilidade ininterrupta. Não nos responsabilizamos por prejuízo causado por
          atraso ou falta de pagamento de inquilino, nem por decisão tomada com base apenas nos
          números do sistema.
        </p>

        <h2>Mudanças nestes termos</h2>
        <p>
          Se estes termos mudarem, avisamos por e-mail com pelo menos 30 dias de antecedência. A
          data no topo da página mostra quando ela foi alterada pela última vez.
        </p>

        <h2>Foro</h2>
        <p>⚠️ Comarca a definir.</p>
      </div>
    </main>
  );
}
