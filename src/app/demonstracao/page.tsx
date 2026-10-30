import type { Metadata } from 'next';
import { AdminApp } from '@design-system/templates/admin';

export const metadata: Metadata = {
  title: 'Demonstração do painel · Aluga',
  description:
    'Demonstração navegável do painel do Aluga: imóveis, contratos, cobranças, recebimentos e despesas. Dados ilustrativos, sem precisar criar conta.',
};

/**
 * Experiência comercial: o painel abre direto, sem login e sem onboarding.
 *
 * É o MESMO `AdminApp` da rota `/design-system/admin`, só que no modo `demo` —
 * nenhuma tela é duplicada. A diferença está só na entrada: aqui a verificação
 * de autenticação é dispensada e a saída volta para a landing.
 */
export default function DemonstracaoPage() {
  return <AdminApp mode="demo" />;
}
