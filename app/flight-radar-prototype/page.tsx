import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RadarComparison from "@/components/flight-radar/RadarComparison";

export const metadata: Metadata = {
  title: "Flight radar comparison",
  robots: { index: false, follow: false },
};

export default function FlightRadarPrototype() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <main id="content"><RadarComparison /></main>;
}
