import type { Metadata } from "next";
import { ContactPage } from "@/components/portfolio-site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contatta Mattia Micheluzzi per progetti, idee, collaborazioni, riprese drone e tecnologia."
};

export default function Page() {
  return <ContactPage />;
}
