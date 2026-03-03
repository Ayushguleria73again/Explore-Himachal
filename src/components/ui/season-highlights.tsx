"use client";

import React from "react";
import { Sparkles, Calendar, MapPin, ArrowRight } from "lucide-react";
import { District } from "@/lib/data/districts";
import { motion } from "framer-motion";
import Link from "next/link";

interface SeasonHighlightsProps {
  districts: District[];
}

export function SeasonHighlights({ districts }: SeasonHighlightsProps) {
  // Current Month: March
  const currentMonth = "March";
  
  // Find festivals in the current month across all districts
  const currentFestivals = districts.flatMap(d => 
    (d.festivals || [])
      .filter(f => f.month.toLowerCase().includes(currentMonth.toLowerCase()))
      .map(f => ({ ...f, districtName: d.name, districtId: d.id }))
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-20">
      {/* Season of Soul Card */}
      <div className="lg:col-span-5 relative group overflow-hidden rounded-[3rem] bg-indigo-900 aspect-[4/5] lg:aspect-auto">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588615419957-bf66d53c6b49?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" />
         <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-900/40 to-transparent" />
         
         <div className="relative h-full flex flex-col justify-end p-12 md:p-16">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-indigo-400" size={20} />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-300">Seasonal Essence</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Season of <br/><span className="text-indigo-400">Soul.</span>
            </h2>
            <div className="space-y-6">
               <p className="text-lg text-indigo-100/70 font-medium leading-relaxed max-w-sm">
                 As {currentMonth} unfolds, the snow begins its slow retreat, revealing the first bloom of rhododendrons across the Shivaliks.
               </p>
               <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                  <Calendar className="text-indigo-300" size={18} />
                  <span className="text-[12px] font-black text-white uppercase tracking-widest leading-none">March Archive</span>
               </div>
            </div>
         </div>
      </div>

      {/* Festival Registry */}
      <div className="lg:col-span-7 flex flex-col">
         <div className="mb-12 flex items-end justify-between">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.5em] text-emerald-500 font-black mb-4">Registry 2026</h3>
              <p className="text-4xl font-black tracking-tighter text-gray-950 italic font-serif">Vibrant Celebrations.</p>
            </div>
            <div className="hidden md:flex flex-col items-end">
               <span className="text-5xl font-black text-gray-100 mb-[-10px] select-none">FESTIVALS</span>
               <div className="w-24 h-[2px] bg-gray-100" />
            </div>
         </div>

         <div className="grid grid-cols-1 gap-6 flex-grow">
            {currentFestivals.length > 0 ? (
              currentFestivals.slice(0, 3).map((festival, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-gray-200/50 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-8">
                   <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 transition-colors">
                        <Calendar className="text-gray-400 group-hover:text-emerald-500 transition-colors" size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                           <MapPin size={14} className="text-emerald-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{festival.districtName}</span>
                        </div>
                        <h4 className="text-2xl font-black tracking-tight text-gray-950 mb-2">{festival.name}</h4>
                        <p className="text-sm text-gray-400 font-medium max-w-md">{festival.description}</p>
                      </div>
                   </div>
                   <Link 
                     href={`/districts/${festival.districtId}`}
                     className="shrink-0 w-full md:w-auto h-14 px-8 rounded-2xl bg-gray-50 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-950 hover:text-white transition-all"
                   >
                     District Detail <ArrowRight size={14} />
                   </Link>
                </div>
              ))
            ) : (
              <div className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-100 rounded-[2rem] p-20 text-center">
                 <p className="text-gray-400 font-black text-[11px] uppercase tracking-widest">No active festivals recorded for {currentMonth} yet.</p>
              </div>
            )}
         </div>

         <div className="mt-8 p-10 bg-gray-50 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-[13px] text-gray-500 font-medium max-w-sm">
               Himachal’s festivals are deep spiritual links to the mountain deities. March marks the transition of energy in the high valleys.
            </p>
            <button className="text-[11px] font-black uppercase tracking-widest text-gray-950 group flex items-center gap-3">
               Full Year Calendar <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:translate-x-1 transition-transform"><ArrowRight size={14} /></div>
            </button>
         </div>
      </div>
    </div>
  );
}
