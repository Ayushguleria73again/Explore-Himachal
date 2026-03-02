"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { UtensilsCrossed, Info } from "lucide-react";

interface CuisineProps {
  cuisine: {
    name: string;
    description: string;
    history: string;
    image: string;
    tip: string;
  };
}

export function CuisineSpotlight({ cuisine }: CuisineProps) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center text-emerald-600">
          <UtensilsCrossed size={24} />
        </div>
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-black mb-1">District Flavors</h2>
          <p className="text-3xl font-black tracking-tighter text-gray-950 dark:text-white">Culinary Heritage</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden group shadow-2xl shadow-gray-950/20"
        >
          <Image
            src={cuisine.image}
            alt={cuisine.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-10 left-10">
             <span className="px-6 py-2 bg-emerald-600 text-white text-[10px] uppercase font-black tracking-widest rounded-full">Archival Entry</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-5xl font-black tracking-tighter text-gray-950 dark:text-white mb-6 uppercase">{cuisine.name}</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed italic">
              "{cuisine.description}"
            </p>
          </div>

          <div className="p-8 bg-gray-50 dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 space-y-4">
             <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-400 flex items-center gap-2">
                <Info size={14} className="text-emerald-500" /> Archival Context
             </h4>
             <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-bold">
               {cuisine.history}
             </p>
          </div>

          <div className="flex items-start gap-4 p-6 border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-r-3xl">
             <div className="text-emerald-600 font-black text-xs uppercase tracking-widest pt-1">Taste Tip:</div>
             <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
               {cuisine.tip}
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
