import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ExploreContent } from "@/components/features/explore/explore-content";

export default function ExplorePage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar isDetail title="Explore." />
      <ExploreContent />
      <Footer />
    </main>
  );
}
