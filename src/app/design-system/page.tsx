import type { Metadata } from "next";
import { Showcase } from "./Showcase";

export const metadata: Metadata = {
  title: "Design system · Aluga",
  description: "Biblioteca completa do design system Aluga: tokens, componentes, estados e temas.",
};

export default function DesignSystemPage() {
  return <Showcase />;
}
