import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Em produção, as rotas de template e showcase do design system saem do ar.
 *
 * POR QUE. O `AdminLogin` de `design-system/templates/admin/AdminApp.tsx` não
 * verifica senha: ele só escreve `aluga_kit_auth = '1'` no localStorage e
 * monta o painel. Não existe back-end de autenticação ainda — a conexão com o
 * Supabase ainda não foi feita. Publicar `/design-system/admin` exporia os
 * dados de demonstração (Casa do CIC, Casa Água Verde, R$ 2.600 de R$ 6.000
 * previstos) como se fossem a conta de alguém.
 *
 * O QUE CONTINUA NO AR. `/`, `/demonstracao`, `/termos` e `/privacidade`. A
 * demonstração é comercial, carrega o selo "Demonstração · dados ilustrativos"
 * e foi feita para ser vista por qualquer pessoa — não precisa de bloqueio.
 *
 * EM DESENVOLVIMENTO NADA MUDA. O time revisa as telas por
 * `/design-system/admin` e `/design-system` todos os dias; bloquear em dev
 * quebraria a revisão. A trava é só quando `NODE_ENV` é `production`, que é o
 * que o `npm run build` produz.
 *
 * Se um dia o login virar Supabase Auth de verdade, este arquivo pode sair.
 *
 * Convenção `proxy`, não `middleware`: o Next.js 16 renomeou o arquivo.
 */
const BLOQUEADAS = ['/design-system'];

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const bloqueada = BLOQUEADAS.some(
    (prefixo) => pathname === prefixo || pathname.startsWith(`${prefixo}/`),
  );

  if (bloqueada) {
    // 404, não 403: não dá nem confirmação de que a rota existe.
    return new NextResponse('Not Found', { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/design-system', '/design-system/:path*'],
};
