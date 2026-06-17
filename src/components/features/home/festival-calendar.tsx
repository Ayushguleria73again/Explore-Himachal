"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { festivalsData, Festival } from "@/lib/data/festivals";
import { Sparkles, Calendar as CalendarIcon, MapPin } from "lucide-react";
import Link from "next/link";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const VIBE_COLORS: Record<string, string> = {
  Spiritual: "bg-blue-500",
  Vibrant: "bg-amber-500",
  Cultural: "bg-emerald-500",
  Mystical: "bg-purple-500",
};

export function FestivalCalendar() {
  const currentMonth = new Date().getMonth();
  
  const activeFestivals = useMemo(() => {
    // Current month festivals
    const current = festivalsData.filter(f => f.month === currentMonth);
    // Next month festivals for "Coming Up"
    const next = festivalsData.filter(f => f.month === (currentMonth + 1) % 12);
    return { current, next };
  }, [currentMonth]);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.5em] text-emerald-500 font-black mb-4 flex items-center gap-2">
            <Sparkles size={14} /> Season of Soul
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter text-gray-950">
            Current in <span className="text-emerald-600">{MONTHS[currentMonth]}.</span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
           <CalendarIcon className="text-gray-400" size={18} />
           <span className="text-[10px] uppercase tracking-widest font-black text-gray-500">Festival Registry 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeFestivals.current.length > 0 ? (
          activeFestivals.current.map((fest, idx) => (
            <FestivalCard key={fest.id} fest={fest} idx={idx} isCurrent />
          ))
        ) : (
          <div className="col-span-full py-12 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">A Moment of Quiet</p>
            <p className="text-gray-600 text-sm">No major festivals currently. The mountains are gathering their breath.</p>
          </div>
        )}
      </div>

      {activeFestivals.next.length > 0 && (
        <div className="mt-20">
          <h3 className="text-xs uppercase tracking-[0.3em] text-gray-400 font-black mb-8">Coming up in {MONTHS[(currentMonth + 1) % 12]}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
             {activeFestivals.next.map((fest, idx) => (
               <FestivalCard key={fest.id} fest={fest} idx={idx} />
             ))}
          </div>
        </div>
      )}
    </section>
  );
}

function FestivalCard({ fest, idx, isCurrent = false }: { fest: Festival; idx: number; isCurrent?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 ${
        isCurrent 
          ? "bg-white border-gray-100 hover:border-emerald-500/30 shadow-xl shadow-emerald-900/5"
          : "bg-gray-50/50 border-transparent hover:border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white ${VIBE_COLORS[fest.vibe]}`}>
          {fest.vibe}
        </div>
        <div className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
           <Sparkles size={16} />
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-2xl font-black tracking-tighter text-gray-950 mb-2">{fest.name}</h4>
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin size={12} />
          <span className="text-[10px] uppercase font-black tracking-widest">{fest.district}</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-8">
        {fest.description}
      </p>

      <Link 
        href={`/districts/${fest.districtId}`}
        className="pt-6 border-t border-gray-100 flex items-center justify-between"
      >
         <span className="text-[10px] font-black uppercase text-emerald-600 tracking-tighter">Plan Arrival</span>
         <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all text-emerald-600">
            →
         </div>
      </Link>
    </motion.div>
  );
}
