"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Heart, Share2, Instagram, Loader2 } from "lucide-react";
import { SubmissionModal } from "./submission-modal";
import { useState, useEffect } from "react";

const GALLERY_IMAGES = [
  {
    id: 1,
    src: "/images/culture_nati_dance.jpg",
    alt: "Nati Dance Celebration",
    author: "@mountain_soul",
    likes: "1.2k",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    src: "/images/culture_kullu_dussehra.jpg",
    alt: "Kullu Dussehra Festival",
    author: "@himalayan_brews",
    likes: "840",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    src: "/images/culture_minjar_mela.jpg",
    alt: "Minjar Mela Chamba",
    author: "@trail_blazer",
    likes: "2.1k",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: 4,
    src: "/images/culture_masked_cham.jpg",
    alt: "Traditional Mask Dance",
    author: "@culture_keeper",
    likes: "956",
    span: "md:col-span-1 md:row-span-1",
  }
];

export function CommunityGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"curated" | "live">("curated");
  const [livePosts, setLivePosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "live" && livePosts.length === 0) {
      const fetchLivePosts = async () => {
        setIsLoading(true);
        try {
          const res = await fetch("/api/social/hashtag");
          const data = await res.json();
          setLivePosts(data);
        } catch (err) {
          console.error("Failed to fetch social feed", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchLivePosts();
    }
  }, [activeTab, livePosts]);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.5em] text-emerald-500 font-black mb-4 flex items-center gap-2">
            <Camera size={14} /> Shared Echoes
          </h2>
          <p className="text-4xl md:text-6xl font-black tracking-tighter text-gray-950">
            Live from the <br/>highest peaks.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-6">
           {/* Tab Switcher */}
           <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-100">
              <button 
                onClick={() => setActiveTab("curated")}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "curated" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                Curated
              </button>
              <button 
                onClick={() => setActiveTab("live")}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === "live" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Live Feed
              </button>
           </div>

           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-8 py-4 bg-gray-950 text-white text-[10px] uppercase tracking-[0.3em] font-black rounded-full hover:bg-emerald-600 transition-all shadow-xl shadow-gray-950/20 active:scale-95"
           >
              Submit Your View
           </button>
        </div>
      </div>

      <div className="relative min-h-[600px]">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-4">
             <Loader2 className="animate-spin" size={32} />
             <span className="text-[10px] font-black uppercase tracking-widest">Gathering #ExploreHimachal Posts...</span>
          </div>
        ) : (
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[1200px] md:h-[800px]"
          >
            {(activeTab === "curated" ? GALLERY_IMAGES : livePosts).map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative group overflow-hidden rounded-[2.5rem] bg-gray-100 border border-gray-100 ${img.span || "col-span-1 row-span-1"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt || img.caption || "Community Post"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                   {img.caption && (
                     <p className="text-white/90 text-xs font-bold mb-4 line-clamp-2 leading-relaxed italic">
                        "{img.caption}"
                     </p>
                   )}
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                         <Instagram size={14} />
                      </div>
                      <div>
                        <span className="text-sm font-black text-white tracking-tight block leading-none">{img.author}</span>
                        {img.timestamp && <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest">{img.timestamp}</span>}
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-white/80 text-xs font-black">
                         <Heart size={14} /> {img.likes}
                      </div>
                      <div className="flex items-center gap-2 text-white/80 text-xs font-black">
                         <Share2 size={14} /> Share
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <SubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
