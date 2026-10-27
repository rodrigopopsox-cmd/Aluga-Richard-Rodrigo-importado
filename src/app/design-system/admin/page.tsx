import type { Metadata } from "next";
import { AdminApp } from "@design-system/templates/admin";

export const metadata: Metadata = {
  title: "Template · Painel administrativo · Aluga",
  description: "Template navegável do painel: login, painel, análises, imóveis, manutenção e financeiro.",
};

export default function AdminTemplatePage() {
  return <AdminApp />;
}
