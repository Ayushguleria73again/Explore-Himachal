import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { districtsData } from "@/lib/data/districts";
import Image from "next/image";
import Link from "next/link";

export default function ArchivePage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar isDetail title="Archive." />
      
      <section className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
        <div className="mb-24">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-950 mb-8 uppercase leading-[0.9]">
            The District <br />
            <span className="text-vibrant-gradient">Collection.</span>
          </h1>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gray-400 font-black">Twelve Districts / One Heritage / Infinite Stories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {districtsData.map((d) => (
            <Link href={`/districts/${d.id}`} key={d.id} className="group">
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-8 bg-gray-50">
                <Image src={d.image} alt={d.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{d.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black">Main Town: {d.headquarters}</p>
                  </div>
                  <span className="text-[9px] font-black p-1 px-2 border border-gray-100 rounded text-gray-300 group-hover:border-emerald-200 group-hover:text-emerald-500 transition-all uppercase">Detail Archive →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
