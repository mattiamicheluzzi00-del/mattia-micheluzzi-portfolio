import type { Metadata } from "next";
import { SkillsPage } from "@/components/portfolio-site";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Competenze di Mattia Micheluzzi in droni, tecnologia, ecosistema Apple, AI, fotografia, video e contenuti social."
};

export default function Page() {
  return <SkillsPage />;
}
