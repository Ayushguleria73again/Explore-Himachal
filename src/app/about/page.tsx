import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar isDetail title="About." />
      
      <section className="pt-40 pb-32 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-950 mb-12 uppercase leading-[1.05]">
          Preserving the <br />
          <span className="text-vibrant-gradient">Mountain Spirit.</span>
        </h1>
        
        <div className="space-y-12 text-lg text-gray-600 font-medium leading-relaxed">
          <p>
            Himachal. is a digital archive dedicated to documenting the vibrant heritage, diverse landscapes, and ancient traditions of Himachal Pradesh. 
          </p>
          <p>
            Our mission is to provide a premium, visually engaging guide for those who seek to understand the Western Himalayas beyond the surface. From the ritualistic feasts of the lower valleys to the monastic silence of the high deserts.
          </p>
          
          <div className="pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-emerald-600 font-black mb-6">Our Vision</h3>
              <p className="text-sm">To become the definitive cultural registry for the 12 districts of Himachal Pradesh, showcasing their unique identities through high-fidelity visual storytelling.</p>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-amber-600 font-black mb-6">Our Values</h3>
              <p className="text-sm">Authenticity in representation, excellence in design, and a deep respect for the sacred geography of the Himalayas.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
