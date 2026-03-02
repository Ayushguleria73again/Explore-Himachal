import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PolicyPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar isDetail title="Policy." />
      
      <section className="pt-40 pb-32 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-950 mb-16 uppercase">
          Content & <br />
          <span className="text-vibrant-gradient">Registry Policy</span>
        </h1>
        
        <div className="space-y-16">
          <PolicySection title="01. Accuracy of Content">
            All historical data and geographical information are sourced from official district records and verified archaeological archives. While we strive for absolute accuracy, mountain legends and oral histories are documented as such.
          </PolicySection>
          
          <PolicySection title="02. Image Usage">
            The visual assets on Himachal. are curated specifically for this archive. Unauthorized reproduction for commercial use is strictly prohibited. We use a combination of historical archives and high-resolution generative photography to represent the vibrancy of the state.
          </PolicySection>
          
          <PolicySection title="03. Respect for Traditions">
            We operate with a strict policy of cultural sensitivity. Sacred sites and ritualistic practices are documented with the highest level of respect for local communities and their privacy.
          </PolicySection>
          
          <PolicySection title="04. Privacy Policy">
            We do not collect personal data from our visitors. This is a public archive intended for educational and inspirational purposes only.
          </PolicySection>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PolicySection({ title, children }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-[12px] uppercase tracking-widest text-emerald-600 font-black">{title}</h3>
      <p className="text-[15px] text-gray-500 leading-relaxed font-medium">{children}</p>
    </div>
  );
}
