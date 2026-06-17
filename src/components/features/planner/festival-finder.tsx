"use client";

import React, { useState, useMemo } from "react";
import { festivalsData, Festival } from "@/lib/data/festivals";
import { districtsData } from "@/lib/data/districts";
import { Sparkles, Calendar, MapPin, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

export function FestivalFinder() {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [selectedVibe, setSelectedVibe] = useState<string>("all");

  const filteredFestivals = useMemo(() => {
    return festivalsData.filter((fest) => {
      const matchMonth = selectedMonth === "all" || fest.month === Number(selectedMonth);
      const matchDistrict = selectedDistrict === "all" || fest.districtId === selectedDistrict;
      const matchVibe = selectedVibe === "all" || fest.vibe === selectedVibe;
      return matchMonth && matchDistrict && matchVibe;
    });
  }, [selectedMonth, selectedDistrict, selectedVibe]);

  return (
    <div className="p-10 md:p-12 space-y-12">
      <div className="text-center md:text-left">
        <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.5em] text-emerald-500 font-black bg-emerald-50 px-4 py-1.5 rounded-full w-max mx-auto md:mx-0 mb-4">
           <Calendar size={12} strokeWidth={3} /> Culture Registry
        </span>
        <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">
          Himalayan Festival & Fair Finder
        </h3>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
          Search and plan your travel timeline around historic regional celebrations
        </p>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-2.5 block">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm font-black text-gray-800 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
          >
            <option value="all">All Months</option>
            {MONTHS.map((m, idx) => (
              <option key={idx} value={idx}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-2.5 block">District</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm font-black text-gray-800 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
          >
            <option value="all">All Districts</option>
            {districtsData.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-2.5 block">Vibe</label>
          <select
            value={selectedVibe}
            onChange={(e) => setSelectedVibe(e.target.value)}
            className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm font-black text-gray-800 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
          >
            <option value="all">All Vibes</option>
            <option value="Spiritual">Spiritual</option>
            <option value="Vibrant">Vibrant</option>
            <option value="Cultural">Cultural</option>
            <option value="Mystical">Mystical</option>
          </select>
        </div>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredFestivals.length > 0 ? (
            filteredFestivals.map((fest) => (
              <motion.div
                key={fest.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-white p-6 border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:border-emerald-100 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white ${VIBE_COLORS[fest.vibe]}`}>
                      {fest.vibe}
                    </span>
                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                      {MONTHS[fest.month]}
                    </span>
                  </div>

                  <h4 className="text-xl font-black tracking-tighter text-gray-950 mb-2">{fest.name}</h4>
                  <div className="flex items-center gap-1.5 text-gray-400 mb-4">
                    <MapPin size={10} />
                    <span className="text-[9px] uppercase font-black tracking-widest">{fest.district}</span>
                  </div>

                  <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
                    {fest.description}
                  </p>
                </div>

                <Link
                  href={`/districts/${fest.districtId}`}
                  className="pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-black uppercase text-emerald-600 tracking-tighter group hover:text-emerald-500 transition-colors mt-auto"
                >
                  <span>Explore District</span>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all text-xs">
                    →
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-6"
            >
              <Tag size={24} className="text-gray-300 mb-4" />
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-2">No celebrations found</p>
              <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
                No festivals match your selected filter criteria. Try adjusting the month, district, or cultural vibe options.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
