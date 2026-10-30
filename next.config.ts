import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // O preview do sandbox usa um host próprio (ex.: 3000-<sandbox>.e2b.app).
  // Sem isso o Next.js bloqueia os recursos de dev por origem cruzada.
  // Restrito a hosts que começam com "3000-" no domínio da plataforma: pega o
  // preview da porta do app sem liberar `*.e2b.app` inteiro.
  allowedDevOrigins: ["3000-*.e2b.app"],
};

export default nextConfig;
