import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mountain, Wind, Waves, Trees } from "lucide-react";
import Image from "next/image";

export default function AdventurePage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar isDetail title="Adventure." />
      
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-24 text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-600 mb-6 font-black bg-emerald-50 px-3 py-1 rounded-full">Explore the Wild</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-950 leading-[0.95] mb-8">
              BEYOND THE <br />
              <span className="text-vibrant-gradient">TREELINE</span>
            </h1>
            <p className="text-[12px] text-gray-500 uppercase tracking-widest leading-loose max-w-lg font-medium">
              From the paragliding capital of the world to the highest mountain passes. 
              Himachal is the ultimate playground for the brave.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
           <AdventureCard 
             title="Paragliding" 
             location="Bir Billing"
             desc="Soar above the tea gardens of Kangra valley from the world's second-highest takeoff site."
             icon={<Wind className="text-sky-500" />}
             image="/images/kangra.png"
           />
           <AdventureCard 
             title="Trekking" 
             location="Spiti & Lahaul"
             desc="Traverse high-altitude cold deserts and ancient trade routes across the Pin Parvati pass."
             icon={<Mountain className="text-emerald-500" />}
             image="/images/spiti.png"
           />
           <AdventureCard 
             title="River Rafting" 
             location="Beas River"
             desc="Navigating grade II and III rapids through the scenic gorges of the Kullu valley."
             icon={<Waves className="text-blue-500" />}
             image="/images/kullu.png"
           />
           <AdventureCard 
             title="Skiing" 
             location="Solang Nala"
             desc="Pure powder and pristine slopes in the heart of the Pir Panjal range."
             icon={<Trees className="text-amber-500" />}
             image="/images/shimla.png"
           />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function AdventureCard({ title, location, desc, icon, image }: any) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gray-50 aspect-[16/9]">
        <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white">
                 {icon}
               </div>
               <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-black">{location}</span>
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{title}</h3>
            <p className="text-[13px] text-gray-300 leading-relaxed font-medium max-w-sm">{desc}</p>
        </div>
    </div>
  );
}
