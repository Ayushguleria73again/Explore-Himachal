"use client";

import React from "react";
import { Calendar, Music, Sparkles, MapPin } from "lucide-react";

interface Festival {
  name: string;
  month: string;
  description?: string;
}

interface DistrictFestivalsProps {
  festivals?: Festival[];
}

export function DistrictFestivals({ festivals }: DistrictFestivalsProps) {
  if (!festivals || festivals.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.5em] text-amber-500 font-black mb-4 flex items-center gap-3">
            <Calendar size={16} /> Cultural Calendar
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter text-gray-950">
            Heritage & <span className="text-amber-600">Fairs.</span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl border border-gray-100 shadow-sm">
           <Music className="text-gray-400" size={20} />
           <span className="text-[12px] uppercase tracking-widest font-black text-gray-700">Annual Cultural Schedule</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {festivals.map((festival, i) => (
          <div 
            key={i} 
            className="group bg-white border border-gray-100 p-10 rounded-[3rem] hover:border-amber-100 hover:shadow-2xl hover:shadow-amber-900/5 shadow-sm transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                {i % 2 === 0 ? <Music size={28} /> : <Sparkles size={28} />}
              </div>
              <div className="px-6 py-2.5 bg-gray-950 rounded-full text-white">
                <span className="text-[11px] font-black uppercase tracking-widest leading-none">{festival.month}</span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-gray-950 mb-4 group-hover:text-amber-600 transition-colors tracking-tight">
              {festival.name}
            </h3>
            <p className="text-[15px] text-gray-500 leading-relaxed font-medium mb-8">
              {festival.description || "A major cultural celebration bringing traditions and local flavor to the heart of the district."}
            </p>

            <div className="pt-8 border-t border-gray-50 flex items-center gap-3 text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <MapPin size={14} />
              <span className="text-[11px] font-black uppercase tracking-widest">District Fairgrounds</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
