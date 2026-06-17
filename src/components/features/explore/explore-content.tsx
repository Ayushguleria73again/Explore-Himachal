"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Gem, Compass, Map, Star, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PackingAssistant } from "./packing-assistant";

const hiddenGems = [
  {
    title: "Langza Village",
    location: "Spiti Valley",
    description: "One of the highest villages in the world, famous for its massive Buddha statue and prehistoric fossils.",
    image: "/images/spiti.png",
    tag: "Hidden Gem"
  },
  {
    title: "Prashar Lake",
    location: "Mandi",
    description: "A mysterious floating island in a crystal clear lake, situated next to a 14th-century pagoda temple.",
    image: "/images/mandi.png",
    tag: "Offbeat"
  }
];

const seasonalTracks = [
  {
    title: "Deotibba Base",
    season: "Summer",
    description: "Lush green meadows and high altitude glacial views. Best experienced from June to September.",
    image: "/images/kullu.png",
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    title: "Sethan Snow Trek",
    season: "Winter",
    description: "A magical snow-covered landscape perfect for igloo stays and snowboarding. Peak season: December to February.",
    image: "/images/shimla.png",
    color: "text-sky-500",
    bg: "bg-sky-50"
  }
];

const editorsPicks = [
  { name: "Kangra Fort", type: "History", id: "kangra" },
  { name: "Spiti Monastery", type: "Spirituality", id: "lahaul-spiti" },
  { name: "Khajjiar Meadows", type: "Nature", id: "chamba" },
  { name: "Kasauli Hills", type: "Colonial", id: "solan" }
];

export function ExploreContent() {
  return (
    <section className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-32"
      >
        <div className="flex justify-center mb-10">
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.5em] text-amber-500 font-black bg-amber-50 px-4 py-1.5 rounded-full">
             <Compass size={12} strokeWidth={3} /> Curated Discovery
          </span>
        </div>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-gray-950 text-center leading-[0.85] uppercase mb-12">
          Beyond The <br />
          <span className="text-vibrant-gradient">Beaten Path.</span>
        </h1>
        <p className="text-[14px] text-gray-500 uppercase tracking-widest text-center leading-loose max-w-2xl mx-auto font-medium">
          A guide to the hidden, the seasonal, and the extraordinary. Discover the secrets of the Himalayas through our curated archival picks.
        </p>
      </motion.div>

      {/* Hidden Gems Section */}
      <section className="mb-48">
        <div className="flex items-center justify-between mb-16 px-4">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
               <Gem size={24} strokeWidth={2.5} />
             </div>
             <h2 className="text-3xl font-black tracking-tighter uppercase text-gray-950">Hidden Gems</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {hiddenGems.map((gem) => (
            <motion.div 
              key={gem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl shadow-gray-200 group-hover:shadow-amber-500/10 transition-all duration-700">
                <Image src={gem.image} alt={gem.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-black text-amber-600 border border-white">
                  {gem.tag}
                </div>
              </div>
              <div className="px-4">
                <div className="flex items-center gap-2 mb-3">
                  <Map size={12} className="text-gray-400" />
                  <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">{gem.location}</span>
                </div>
                <h3 className="text-2xl font-black tracking-tighter text-gray-950 mb-4 group-hover:text-amber-500 transition-colors uppercase">{gem.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium line-clamp-2">{gem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Seasonal Tracks */}
      <section className="mb-48">
        <div className="flex items-center justify-between mb-16 px-4">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
               <Star size={24} strokeWidth={2.5} />
             </div>
             <h2 className="text-3xl font-black tracking-tighter uppercase text-gray-950">Seasonal Tracks</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {seasonalTracks.map((track) => (
            <div key={track.title} className="p-10 bg-gray-50/50 rounded-[3rem] border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl hover:shadow-gray-200 transition-all duration-700">
              <div className={`w-16 h-16 rounded-3xl ${track.bg} ${track.color} flex items-center justify-center mb-8 font-black text-xl rotate-3 group-hover:rotate-0 transition-transform`}>
                {track.season[0]}
              </div>
              <h4 className={`text-[10px] uppercase tracking-[0.4em] ${track.color} font-black mb-4`}>{track.season} Journey</h4>
              <h3 className="text-3xl font-black tracking-tighter text-gray-950 mb-6 uppercase">{track.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium mb-10 max-w-sm">{track.description}</p>
              <div className="relative w-full aspect-[2/1] rounded-3xl overflow-hidden shadow-xl grayscale group-hover:grayscale-0 transition-all duration-700">
                 <Image src={track.image} alt={track.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Smart Packing Assistant */}
      <PackingAssistant />

      {/* Editor's Picks */}
      <section>
        <div className="bg-gray-950 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
           <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
              <div>
                 <span className="text-[10px] uppercase tracking-[0.5em] text-emerald-400 font-black mb-8 block">Selected Heritage</span>
                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-[0.95]">Archival <br/>Essentials.</h2>
              </div>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed font-medium">The definitive list of sites that constitute the core architectural and natural soul of Himachal.</p>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {editorsPicks.map((pick) => (
                 <Link href={`/districts/${pick.id}`} key={pick.name} className="group p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white hover:shadow-2xl transition-all duration-500">
                    <div className="flex justify-between items-start mb-12">
                       <span className="text-[9px] uppercase tracking-widest font-black text-emerald-400">{pick.type}</span>
                       <ArrowUpRight size={16} className="text-white/20 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <h4 className="text-xl font-black tracking-tighter text-white group-hover:text-gray-950 transition-colors uppercase">{pick.name}</h4>
                 </Link>
              ))}
           </div>
        </div>
      </section>
    </section>
  );
}
