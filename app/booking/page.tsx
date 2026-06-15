import type { Metadata } from "next";
import { BookingPage } from "@/components/portfolio-site";

export const metadata: Metadata = {
  title: "Booking",
  description:
    "Prenota un incontro con Mattia Micheluzzi per consulenze drone, tecnologia o meeting generali."
};

export default function Page() {
  return <BookingPage />;
}
