import type { Metadata } from "next";
import "./globals.css";

/*
 * A fonte é AUTO-HOSPEDADA, não baixada do Google.
 *
 * `next/font/google` buscava a Plus Jakarta Sans em fonts.googleapis.com
 * durante o build. Onde não há acesso à internet — sandbox, CI, build
 * air-gapped — ele falha em silêncio e o app inteiro cai na fonte
 * substituta do sistema. Foi exatamente o que aconteceu: a landing ficou
 * renderizando com outra letra, e a revisão de tipografia passou a julgar
 * uma fonte que não é a do produto.
 *
 * `@fontsource/plus-jakarta-sans` empacota os mesmos arquivos .woff2 no
 * node_modules. Nada de rede em build. Os pesos são os que o design system
 * declara em `--weight-light/regular/medium/semibold/bold` (300 a 700),
 * mais o itálico 400.
 *
 * O nome da família continua "Plus Jakarta Sans", então
 * `--font-sans: var(--font-plus-jakarta, 'Plus Jakarta Sans'), …` em
 * `design-system/tokens/typography.css` segue valendo sem alteração — o
 * fallback agora é um @font-face real, não um chute.
 */
import "@fontsource/plus-jakarta-sans/300.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/400-italic.css";

export const metadata: Metadata = {
  title: "Aluga",
  description:
    "Gestão de imóveis para aluguel — unidades, inquilinos, contratos, cobranças e recebimentos.",
  // Ícones: os PNGs vêm de `scripts/build-icons.mjs`. `icon.svg` e `apple-icon.png`
  // são convenções de arquivo do App Router e entram sozinhos no <head>.
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Aluga",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
