import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PlannerContent } from "@/components/features/planner/planner-content";

export const metadata = {
  title: "Travel Toolkit | Explore Himachal",
  description: "Plan your trip to Himachal Pradesh using our interactive mapping, day-wise route generator, weather checklist generator, and AI chatbot.",
};

export default function PlannerPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar isDetail title="Toolkit." />
      <PlannerContent />
      <Footer />
    </main>
  );
}
