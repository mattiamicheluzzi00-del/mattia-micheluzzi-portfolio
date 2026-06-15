import type { Metadata } from "next";
import { WorkPage } from "@/components/portfolio-site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Portfolio lavori di Mattia Micheluzzi: drone photography, drone videos, biking content e technology projects."
};

export default function Page() {
  return <WorkPage />;
}
