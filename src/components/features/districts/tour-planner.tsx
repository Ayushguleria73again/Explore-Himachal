"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin, Compass, Sparkles, Music } from "lucide-react";
import { Itinerary } from "@/lib/data/districts";
import { motion, AnimatePresence } from "framer-motion";

interface TourPlannerProps {
  itineraries?: Itinerary[];
}

export function TourPlanner({ itineraries }: TourPlannerProps) {
  if (!itineraries || itineraries.length === 0) return null;

  const [activeItinerary, setActiveItinerary] = useState(0);
  const [activeDay, setActiveDay] = useState(0);

  const itinerary = itineraries[activeItinerary];

  return (
    <section className="relative">
      {/* Header section matches the upscale style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.5em] text-indigo-500 font-black mb-4 flex items-center gap-3">
            <Compass size={16} /> Expedition Planning
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter text-gray-950">
            Curated <span className="text-indigo-600">Journeys.</span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl border border-gray-100 shadow-sm">
           <Calendar className="text-gray-400" size={20} />
           <span className="text-[12px] uppercase tracking-widest font-black text-gray-700">Expert Itinerary Guide</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Itinerary Selector */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
             <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-6">Select Experience</h3>
             <div className="space-y-4">
               {itineraries.map((plan, idx) => (
                 <button
                   key={idx}
                   onClick={() => { setActiveItinerary(idx); setActiveDay(0); }}
                   className={`w-full text-left p-6 rounded-3xl transition-all duration-500 group relative overflow-hidden ${
                     activeItinerary === idx 
                      ? "bg-indigo-600 text-white shadow-xl shadow-indigo-900/20" 
                      : "bg-gray-50 text-gray-600 hover:bg-white hover:border-indigo-100 border border-transparent"
                   }`}
                 >
                   <div className="relative z-10">
                     <div className="flex items-center justify-between mb-2">
                       <span className={`text-[10px] font-black uppercase tracking-widest ${activeItinerary === idx ? "text-indigo-100" : "text-gray-400"}`}>
                         {plan.duration}
                       </span>
                       {activeItinerary === idx && <Sparkles size={14} className="text-indigo-300" />}
                     </div>
                     <h4 className="text-lg font-black tracking-tight leading-tight">{plan.title}</h4>
                   </div>
                 </button>
               ))}
             </div>
          </div>

          {/* District Highlights / Summary */}
          <div className="bg-indigo-50/50 border border-indigo-100 p-8 rounded-[2.5rem]">
             <div className="flex items-center gap-3 mb-4">
                <Clock className="text-indigo-500" size={18} />
                <h4 className="text-[11px] font-black uppercase tracking-widest text-indigo-700">Experience Profile</h4>
             </div>
             <p className="text-sm text-indigo-900/70 font-medium leading-relaxed italic">
               "{itinerary.description}"
             </p>
          </div>
        </div>

        {/* Right: Day by Day Breakdown */}
        <div className="lg:col-span-8">
           <div className="bg-white border border-gray-100 rounded-[3rem] p-10 md:p-16 shadow-sm relative overflow-hidden">
             {/* Timeline Visual Progress */}
             <div className="absolute top-0 left-0 w-full h-2 bg-gray-50">
                <motion.div 
                  className="h-full bg-indigo-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${((activeDay + 1) / (itinerary.days.length || 1)) * 100}%` }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                />
             </div>

             <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
               {itinerary.days.map((day, idx) => (
                 <button
                   key={idx}
                   onClick={() => setActiveDay(idx)}
                   className={`shrink-0 flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all ${
                     activeDay === idx 
                      ? "bg-gray-950 text-white shadow-xl translate-y-[-2px]" 
                      : "bg-gray-50 text-gray-400 hover:text-gray-950"
                   }`}
                 >
                   Day {day.day}
                 </button>
               ))}
             </div>

             <AnimatePresence mode="wait">
               <motion.div
                 key={`${activeItinerary}-${activeDay}`}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.4, ease: "easeOut" }}
                 className="space-y-12"
               >
                 <div>
                   <h3 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter mb-6 leading-tight">
                     {itinerary.days[activeDay].title}
                   </h3>
                   <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
                     {itinerary.days[activeDay].description}
                   </p>
                 </div>

                 <div className="pt-12 border-t border-gray-100">
                    <h4 className="text-[11px] uppercase tracking-[0.4em] text-indigo-500 font-black mb-8 flex items-center gap-3">
                      <MapPin size={16} /> Key Milestones & Activities
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {itinerary.days[activeDay].activities.map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-5 bg-gray-50/50 p-6 rounded-[2rem] border border-transparent hover:border-indigo-100 hover:bg-white transition-all group">
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 font-black text-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                            {idx + 1}
                          </div>
                          <span className="text-[13px] font-black text-gray-800 uppercase tracking-tight">{activity}</span>
                        </div>
                      ))}
                    </div>
                 </div>
               </motion.div>
             </AnimatePresence>
           </div>
        </div>
      </div>
    </section>
  );
}
