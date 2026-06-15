import type { Metadata } from "next";
import { AboutPage } from "@/components/portfolio-site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Storia personale di Mattia Micheluzzi: studente, creator e appassionato di tecnologia, droni e contenuti in Alto Adige."
};

export default function Page() {
  return <AboutPage />;
}
