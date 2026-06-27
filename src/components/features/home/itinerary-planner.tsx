"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { districtsData } from "@/lib/data/districts";
import { Compass, Clock, MapPin, Zap, Coffee, Landmark } from "lucide-react";

type Vibe = "Adventure" | "Peace" | "Culture";
type Duration = 3 | 5 | 7;

interface ItineraryStep {
  day: number;
  district: string;
  activity: string;
  location: string;
}

const VIBE_DATA: Record<Vibe, { icon: React.ReactNode; color: string; districts: string[] }> = {
  Adventure: { 
    icon: <Zap size={18} />, 
    color: "bg-orange-500",
    districts: ["lahaul-spiti", "kullu", "kinnaur", "kangra"]
  },
  Peace: { 
    icon: <Coffee size={18} />, 
    color: "bg-blue-500",
    districts: ["chamba", "sirmaur", "solan", "mandi"]
  },
  Culture: { 
    icon: <Landmark size={18} />, 
    color: "bg-emerald-500",
    districts: ["shimla", "kangra", "mandi", "chamba"]
  },
};

export function ItineraryPlanner() {
  const [duration, setDuration] = useState<Duration>(3);
  const [vibe, setVibe] = useState<Vibe>("Adventure");
  const [result, setResult] = useState<ItineraryStep[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateItinerary = async () => {
    setIsGenerating(true);
    setResult(null);
    setError(null);
    
    try {
      const response = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration, vibe }),
      });

      if (!response.ok) {
        throw new Error("Gemini AI not available.");
      }

      const data = await response.json();
      setResult(data);
      setIsGenerating(false);
    } catch (err) {
      console.warn("Falling back to local logic:", err);
      setError("AI generation is temporarily busy due to high demand. Crafted a recommended route from our local database.");
      
      setTimeout(() => {
        const selectedDistricts = VIBE_DATA[vibe].districts;
        const steps: ItineraryStep[] = [];
        
        for (let i = 1; i <= duration; i++) {
          const dId = selectedDistricts[Math.floor((i-1) / (duration === 7 ? 2.5 : 2)) % selectedDistricts.length];
          const district = districtsData.find(d => d.id === dId);
          const spot = district?.topSpots[i % (district?.topSpots.length || 1)] || { name: "Local Village Walk", type: "Exploration" };
          
          steps.push({
            day: i,
            district: district?.name || "Local Region",
            location: spot.name,
            activity: vibe === "Adventure" ? `Trek to ${spot.name}` : 
                      vibe === "Peace" ? `Meditative visit to ${spot.name}` : 
                      `Explore the history of ${spot.name}`
          });
        }
        setResult(steps);
        setIsGenerating(false);
      }, 1200);
    }
  };

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto print:py-0 print:px-0">
      <div className="text-center mb-20 print:hidden">
        <h2 className="text-[11px] uppercase tracking-[0.5em] text-emerald-500 font-black mb-4">The Route Maker</h2>
        <p className="text-4xl md:text-6xl font-black tracking-tighter text-gray-950">Design your <br/>Himalayan journey.</p>
      </div>

      <div className="bg-gray-50 p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-emerald-900/5 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Duration Selector */}
          <div>
            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-4 block">Duration</label>
            <div className="flex gap-4">
              {[3, 5, 7].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d as Duration)}
                  className={`flex-1 py-4 rounded-2xl text-sm font-black transition-all duration-300 border ${
                    duration === d 
                      ? "bg-gray-950 text-white border-gray-950" 
                      : "bg-white border-gray-200 text-gray-400 hover:border-emerald-500"
                  }`}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          {/* Vibe Selector */}
          <div>
            <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-4 block">Preferred Vibe</label>
            <div className="flex gap-4">
              {(Object.keys(VIBE_DATA) as Vibe[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setVibe(v)}
                  className={`flex-1 py-4 px-2 rounded-2xl text-xs font-black transition-all duration-300 border flex flex-col items-center gap-2 ${
                    vibe === v 
                      ? "bg-gray-950 text-white border-gray-950" 
                      : "bg-white border-gray-200 text-gray-400 hover:border-emerald-500"
                  }`}
                >
                  {VIBE_DATA[v].icon}
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={generateItinerary}
          disabled={isGenerating}
          className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl transition-all shadow-xl shadow-emerald-900/20 active:scale-[0.98] disabled:opacity-50"
        >
          {isGenerating ? "Crafting Your Path..." : "Generate Itinerary"}
        </button>
      </div>

      {/* Results Display */}
      <div className="mt-20">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-amber-50 border border-amber-100 rounded-3xl text-[12px] font-bold text-amber-800 flex items-center gap-4 shadow-sm"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <p className="leading-relaxed">{error}</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-12">
                 <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    <Compass size={24} />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-gray-900 tracking-tight">Your Route is Ready</h4>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{duration} Days in the Realm of {vibe}</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-1 print:gap-4">
                {result.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group print:p-6 print:rounded-2xl print:border-gray-200 print:shadow-none print:break-inside-avoid"
                  >
                    <div className="absolute top-0 right-0 p-8 text-[4rem] font-black text-gray-50 -z-10 group-hover:text-emerald-500/5 transition-colors">
                      {step.day}
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-4">
                      <Clock size={12} /> Day {step.day}
                    </div>
                    <h5 className="text-lg font-black text-gray-950 mb-2">{step.district}</h5>
                    <p className="text-sm text-gray-500 font-bold mb-6 flex items-center gap-2">
                       <MapPin size={12} className="text-gray-300" /> {step.location}
                    </p>
                    <div className="p-4 bg-gray-50 rounded-xl text-xs font-black text-emerald-700 border border-emerald-100">
                      {step.activity}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-12 text-center print:hidden">
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-4">Note: This is a suggested route. Every mountain path has its own timing.</p>
                 <button 
                   onClick={() => window.print()}
                   className="text-emerald-600 font-black text-xs uppercase tracking-widest hover:underline"
                 >
                   Download Archive PDF
                 </button>
              </div>

              {/* Print Footer */}
              <div className="hidden print:block mt-16 pt-8 border-t border-gray-100 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Document generated at explore-himachal.archive — Keep the Himalayas clean and trash-free.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
