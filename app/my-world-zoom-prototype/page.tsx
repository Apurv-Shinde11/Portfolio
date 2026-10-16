import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MumbaiZoomPrototype from "@/components/mumbai-zoom/MumbaiZoomPrototype";

export const metadata: Metadata = { title: "Earth to Mumbai — development study", robots: { index: false, follow: false } };
export default function MumbaiZoomPage() {
  if(process.env.NODE_ENV!=="development")notFound();
  return <main id="content"><MumbaiZoomPrototype /></main>;
}
