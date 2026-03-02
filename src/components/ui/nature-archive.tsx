"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf, Bird, ShieldCheck, Microscope } from "lucide-react";

interface NatureProps {
  wildlife?: {
    name: string;
    scientificName: string;
    status: string;
    description: string;
    image: string;
  };
  flora?: {
    name: string;
    scientificName: string;
    description: string;
    image: string;
  };
}

export function NatureArchive({ wildlife, flora }: NatureProps) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-100 dark:border-slate-900">
      <div className="flex items-center gap-4 mb-16">
        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center text-emerald-600">
          <Microscope size={24} />
        </div>
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-black mb-1">Nature Registry</h2>
          <p className="text-3xl font-black tracking-tighter text-gray-950 dark:text-white">Biodiversity Archive</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {wildlife && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="group relative bg-white dark:bg-slate-950 rounded-[3rem] p-10 border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
               <div className="w-14 h-14 bg-gray-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-emerald-500 transition-colors">
                  <Bird size={28} />
               </div>
               <div className="px-5 py-2 border border-emerald-500/30 rounded-full flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600">{wildlife.status}</span>
               </div>
            </div>

            <div className="space-y-4 mb-10">
               <div>
                  <h3 className="text-4xl font-black tracking-tighter text-gray-950 dark:text-white leading-none">{wildlife.name}</h3>
                  <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mt-2 italic">{wildlife.scientificName}</p>
               </div>
               <p className="text-gray-600 dark:text-gray-400 text-sm font-bold leading-relaxed">
                 {wildlife.description}
               </p>
            </div>

            <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
               <Image 
                 src={wildlife.image} 
                 alt={wildlife.name} 
                 fill 
                 className="object-cover"
               />
            </div>
          </motion.div>
        )}

        {flora && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative bg-white dark:bg-slate-950 rounded-[3rem] p-10 border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
               <div className="w-14 h-14 bg-gray-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-emerald-500 transition-colors">
                  <Leaf size={28} />
               </div>
            </div>

            <div className="space-y-4 mb-10">
               <div>
                  <h3 className="text-4xl font-black tracking-tighter text-gray-950 dark:text-white leading-none">{flora.name}</h3>
                  <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mt-2 italic">{flora.scientificName}</p>
               </div>
               <p className="text-gray-600 dark:text-gray-400 text-sm font-bold leading-relaxed">
                 {flora.description}
               </p>
            </div>

            <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
               <Image 
                 src={flora.image} 
                 alt={flora.name} 
                 fill 
                 className="object-cover"
               />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
