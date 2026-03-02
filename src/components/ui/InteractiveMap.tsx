"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { districtsData, District } from "@/lib/data/districts";
import svgPaths from "@/lib/data/map/districts_svg.json";
import { WeatherWidget } from "./weather-widget";
import { useTheme } from "next-themes";

const DISTRICT_ID_MAP: Record<string, string> = {
  "Lahaul and Spiti": "lahaul-spiti",
  "Kinnaur": "kinnaur",
  "Chamba": "chamba",
  "Kangra": "kangra",
  "Kullu": "kullu",
  "Mandi": "mandi",
  "Hamirpur": "hamirpur",
  "Una": "una",
  "Bilaspur": "bilaspur",
  "Shimla": "shimla",
  "Solan": "solan",
  "Sirmaur": "sirmaur"
};

export function InteractiveMap() {
  const router = useRouter();
  const { theme } = useTheme();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const activeDistrict = hoveredId 
    ? districtsData.find(d => d.id === DISTRICT_ID_MAP[hoveredId]) 
    : null;

  return (
    <div className="relative w-full max-w-4xl mx-auto py-20 px-6" onMouseMove={handleMouseMove}>
      <div className="text-center mb-16">
        <h2 className="text-[11px] uppercase tracking-[0.5em] text-emerald-500 font-black mb-4">Interactive Archive</h2>
        <p className="text-4xl font-black tracking-tighter text-gray-950">Tap to traverse the geography.</p>
      </div>

      <div className="relative aspect-square w-full bg-emerald-50/30 dark:bg-emerald-950/10 rounded-[3rem] border border-emerald-100 dark:border-emerald-900/30 p-8 md:p-12 overflow-hidden shadow-inner flex items-center justify-center">
        <svg 
          viewBox="0 0 1000 1000" 
          className="w-full h-full drop-shadow-2xl filter dark:drop-shadow-[0_20px_50px_rgba(16,185,129,0.15)]"
        >
          {Object.entries(svgPaths).map(([name, d]) => {
            const districtId = DISTRICT_ID_MAP[name];
            const isHovered = hoveredId === name;

            return (
              <motion.path
                key={name}
                d={d}
                initial={{ fill: "#f0fdf4", stroke: "#10b981", strokeWidth: 1 }}
                animate={{ 
                  fill: isHovered ? "#10b981" : (theme === "dark" ? "#064e3b" : "#f0fdf4"),
                  stroke: isHovered ? (theme === "dark" ? "#6ee7b7" : "#064e3b") : "#10b981",
                  strokeWidth: isHovered ? 3 : 1,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="cursor-pointer"
                style={{ transformOrigin: "center" }}
                onMouseEnter={() => setHoveredId(name)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => router.push(`/districts/${districtId}`)}
              />
            );
          })}
        </svg>

        {/* Hover Card */}
        <AnimatePresence>
          {activeDistrict && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-50 pointer-events-none"
              style={{
                left: mousePos.x - 20, // Offset to avoid cursor overlap
                top: mousePos.y - 100, // Position above cursor
                position: "fixed",
              }}
            >
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800 w-72">
                <div className="mb-4">
                  <h4 className="text-[10px] uppercase tracking-widest text-emerald-500 font-black mb-1">Explore District</h4>
                  <p className="text-2xl font-black text-gray-950 dark:text-white tracking-tighter">{activeDistrict.name}</p>
                </div>
                
                <div className="space-y-4">
                  <WeatherWidget lat={activeDistrict.latitude} lon={activeDistrict.longitude} name={activeDistrict.name} />
                  
                  <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                    <p className="text-[10px] font-black uppercase tracking-tighter text-amber-600 mb-1">Top Spot</p>
                    <p className="text-[13px] font-bold text-gray-600 dark:text-gray-400 leading-tight">
                      {activeDistrict.topSpots[0]?.name || "Cultural Heritage Center"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {districtsData.map(d => (
          <button
            key={d.id}
            onMouseEnter={() => {
              const geoName = Object.keys(DISTRICT_ID_MAP).find(k => DISTRICT_ID_MAP[k] === d.id);
              if (geoName) setHoveredId(geoName);
            }}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => router.push(`/districts/${d.id}`)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              hoveredId && DISTRICT_ID_MAP[hoveredId] === d.id
                ? "bg-emerald-600 text-white"
                : "bg-emerald-50 dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>
    </div>
  );
}
