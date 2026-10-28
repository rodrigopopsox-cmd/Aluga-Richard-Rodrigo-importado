import type { MetadataRoute } from 'next';

/**
 * Manifest do PWA. Os PNGs são gerados por `scripts/build-icons.mjs` — não edite
 * os binários à mão, edite o SVG mestre e rode o script.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aluga',
    short_name: 'Aluga',
    description: 'Gestão de imóveis para aluguel — unidades, inquilinos, contratos, cobranças e recebimentos.',
    lang: 'pt-BR',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#FFFFFF',
    theme_color: '#C2410C',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        // Android recorta até 20% das bordas: por isso o maskable tem a marca
        // dentro do safe zone central, com fundo full-bleed.
        purpose: 'maskable',
      },
    ],
  };
}
