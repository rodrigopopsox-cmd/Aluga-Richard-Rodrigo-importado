import type { Metadata } from "next";
import { IdentityShowcase } from "./IdentityShowcase";

export const metadata: Metadata = {
  title: "Identidade provisória · Aluga",
  description: "Marca provisória do Aluga e ícones do PWA gerados a partir do design system.",
};

export default function IdentityPage() {
  return <IdentityShowcase />;
}
