"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Wind, Mountain, Landmark, Heart, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DiscoveryFilterProps {
  onFilterChange: (filters: { interests: string[]; vibe: string[] }) => void;
}

const INTERESTS = [
  { id: "Adventure", icon: <Mountain size={14} />, label: "Adventure" },
  { id: "Peace", icon: <Heart size={14} />, label: "Peace" },
  { id: "Heritage", icon: <Landmark size={14} />, label: "Heritage" },
];

const VIBES = [
  { id: "Snowy", icon: <Wind size={14} />, label: "Snowy" },
  { id: "Tropical", icon: <Sparkles size={14} />, label: "Tropical" },
  { id: "High Altitude", icon: <Mountain size={14} />, label: "High Altitude" },
];

export function DiscoveryFilter({ onFilterChange }: DiscoveryFilterProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onFilterChange({ interests: selectedInterests, vibe: selectedVibes });
  }, [selectedInterests, selectedVibes]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleVibe = (id: string) => {
    setSelectedVibes(prev => 
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedInterests([]);
    setSelectedVibes([]);
  };

  const activeCount = selectedInterests.length + selectedVibes.length;

  return (
    <div className="relative z-[40]">
       <div className="flex flex-wrap items-center gap-4 mb-12">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all ${
              isOpen || activeCount > 0
                ? "bg-gray-950 text-white shadow-xl translate-y-[-2px]" 
                : "bg-white border border-gray-100 text-gray-500 hover:text-gray-950 shadow-sm"
            }`}
          >
            <Filter size={16} className={activeCount > 0 ? "text-indigo-400" : ""} />
            {activeCount > 0 ? `Filtered Districts (${activeCount})` : "Find My District"}
          </button>

          {activeCount > 0 && (
             <button 
               onClick={clearFilters}
               className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-gray-50 text-gray-400 hover:text-red-500 font-black text-[11px] uppercase tracking-widest transition-colors"
             >
               <X size={14} /> Clear
             </button>
          )}

          <div className="hidden md:flex flex-wrap gap-2 ml-auto">
             {INTERESTS.map(item => (
               <button
                 key={item.id}
                 onClick={() => toggleInterest(item.id)}
                 className={`px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-tight flex items-center gap-2 transition-all ${
                   selectedInterests.includes(item.id)
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-y-[-1px]"
                    : "bg-gray-50 text-gray-400 hover:bg-white hover:border-gray-200 border border-transparent"
                 }`}
               >
                 {item.icon} {item.label}
               </button>
             ))}
             <div className="w-[1px] h-8 bg-gray-100 mx-2" />
             {VIBES.map(item => (
               <button
                 key={item.id}
                 onClick={() => toggleVibe(item.id)}
                 className={`px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-tight flex items-center gap-2 transition-all ${
                   selectedVibes.includes(item.id)
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 translate-y-[-1px]"
                    : "bg-gray-50 text-gray-400 hover:bg-white hover:border-gray-200 border border-transparent"
                 }`}
               >
                 {item.icon} {item.label}
               </button>
             ))}
          </div>
       </div>

       <AnimatePresence>
         {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full md:w-[600px] bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50"
            >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-6">By Interest</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {INTERESTS.map(item => (
                        <button
                          key={item.id}
                          onClick={() => toggleInterest(item.id)}
                          className={`w-full text-left px-6 py-4 rounded-xl text-[12px] font-black uppercase tracking-widest flex items-center justify-between group ${
                            selectedInterests.includes(item.id)
                             ? "bg-indigo-50 text-indigo-600"
                             : "hover:bg-gray-50 text-gray-600"
                          }`}
                        >
                          <span className="flex items-center gap-3">{item.icon} {item.label}</span>
                          <div className={`w-2 h-2 rounded-full transition-transform ${selectedInterests.includes(item.id) ? "bg-indigo-600 scale-125 shadow-lg shadow-indigo-300" : "bg-gray-200 group-hover:scale-150"}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-6">By Vibe</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {VIBES.map(item => (
                        <button
                          key={item.id}
                          onClick={() => toggleVibe(item.id)}
                          className={`w-full text-left px-6 py-4 rounded-xl text-[12px] font-black uppercase tracking-widest flex items-center justify-between group ${
                            selectedVibes.includes(item.id)
                             ? "bg-emerald-50 text-emerald-600"
                             : "hover:bg-gray-50 text-gray-600"
                          }`}
                        >
                          <span className="flex items-center gap-3">{item.icon} {item.label}</span>
                          <div className={`w-2 h-2 rounded-full transition-transform ${selectedVibes.includes(item.id) ? "bg-emerald-600 scale-125 shadow-lg shadow-emerald-400" : "bg-gray-200 group-hover:scale-150"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
               </div>
            </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}
