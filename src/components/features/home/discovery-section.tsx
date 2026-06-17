"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { districtsData } from "@/lib/data/districts";
import { DiscoveryFilter } from "./discovery-filter";
import { DistrictCard } from "../districts/district-card";

export function DiscoverySection() {
  const [filters, setFilters] = useState<{ interests: string[]; vibe: string[] }>({ interests: [], vibe: [] });

  const filteredDistricts = useMemo(() => {
    if (filters.interests.length === 0 && filters.vibe.length === 0) return districtsData;

    return districtsData.filter(d => {
      const interestsMatch = filters.interests.length === 0 || 
        filters.interests.some(i => (d.interests || []).includes(i as any));
      
      const vibeMatch = filters.vibe.length === 0 || 
        filters.vibe.some(v => (d.vibe || []).includes(v as any));
      
      return interestsMatch && vibeMatch;
    });
  }, [filters]);

  return (
    <section id="districts" className="max-w-7xl mx-auto px-6 py-40 border-t border-gray-100">
      <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.5em] text-amber-500 font-black mb-4 flex items-center gap-3">
            <Sparkles size={16} /> District Discovery
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter text-gray-950">
             State of <span className="text-amber-500">Diversity.</span>
          </p>
        </div>
        <div className="flex-grow max-w-2xl">
          <DiscoveryFilter onFilterChange={setFilters} />
        </div>
      </div>
      
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16"
      >
        <AnimatePresence mode="popLayout">
          {filteredDistricts.length > 0 ? (
            filteredDistricts.map((d, index) => (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <DistrictCard district={d} index={index} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-gray-50 rounded-[3rem] border border-gray-100">
               <p className="text-gray-400 font-black text-[12px] uppercase tracking-[0.4em]">No districts match your specific vibe yet.</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
