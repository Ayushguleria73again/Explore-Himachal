import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CultureContent } from "@/components/features/culture/culture-content";

export default function CulturePage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar isDetail title="Culture." />
      <CultureContent />
      <Footer />
    </main>
  );
}
