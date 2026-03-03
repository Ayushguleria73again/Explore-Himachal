"use client";

import React from "react";
import { Sun, Snowflake, CloudRain, Briefcase } from "lucide-react";

interface WeatherGuideProps {
  weather?: {
    temp_summer: string;
    temp_winter: string;
    monsoon_impact: string;
    packing_essentials: string;
  };
}

export function WeatherGuide({ weather }: WeatherGuideProps) {
  if (!weather) return null;

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.5em] text-amber-500 font-black mb-4 flex items-center gap-3">
            <Sun size={16} /> Seasonal Guide
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter text-gray-950">
            Climate & <span className="text-amber-600">Packing.</span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl border border-gray-100 shadow-sm">
           <Briefcase className="text-gray-400" size={20} />
           <span className="text-[12px] uppercase tracking-widest font-black text-gray-700">Mountain Readiness Guide</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Summer */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 group hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="p-4 bg-amber-50 rounded-2xl shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
              <Sun className="text-amber-500" size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] leading-none mb-2">Peak Summer</p>
              <p className="text-5xl font-black text-gray-950 leading-none tracking-tighter">{weather.temp_summer}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium leading-[1.8] relative z-10">
            Usually spanning March to June. This is the golden window for high-altitude trekking and escaping the tropical heat of the Indian plains. The air is crisp, and the trails are clear.
          </p>
        </div>

        {/* Winter */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 group hover:shadow-2xl hover:shadow-sky-900/5 transition-all duration-500 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="p-4 bg-sky-50 rounded-2xl shadow-sm group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
              <Snowflake className="text-sky-500" size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-sky-600 uppercase tracking-[0.2em] leading-none mb-2">Deep Winter</p>
              <p className="text-5xl font-black text-gray-950 leading-none tracking-tighter">{weather.temp_winter}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium leading-[1.8] relative z-10">
            Usually November to February. Upper reaches transform into a white desert of snow, while the valleys enjoy a sharp, cold sun. Perfect for winter sports and cozy mountain living.
          </p>
        </div>
      </div>

      {/* Monsoon & Packing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 bg-emerald-50/50 p-12 rounded-[3rem] border border-emerald-100 flex gap-8 items-start">
          <div className="p-4 bg-white rounded-2xl shadow-sm shrink-0">
            <CloudRain className="text-emerald-500" size={32} />
          </div>
          <div>
            <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Monsoon Dynamics</h4>
            <p className="text-xl text-gray-700 font-bold italic leading-relaxed">
              "{weather.monsoon_impact}"
            </p>
          </div>
        </div>

        <div className="bg-gray-950 p-12 rounded-[3rem] text-white flex flex-col justify-center group overflow-hidden relative">
          <div className="absolute -top-4 -right-4 p-4 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <Briefcase size={120} />
          </div>
          <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-6 relative z-10">Essential Packing</h4>
          <p className="text-lg font-bold leading-relaxed relative z-10">
            {weather.packing_essentials}
          </p>
        </div>
      </div>
    </div>
  );
}
