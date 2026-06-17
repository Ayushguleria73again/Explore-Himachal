"use client";

import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

interface DistrictGalleryProps {
  images?: string[];
  districtName: string;
}

export function DistrictGallery({ images, districtName }: DistrictGalleryProps) {
  // If no gallery images, just show the placeholder message
  if (!images || images.length === 0) return null;

  // We'll create a masonry-like grid
  return (
    <section className="relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.5em] text-sky-500 font-black mb-4 flex items-center gap-3">
            <Camera size={16} /> Visual Archive
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter text-gray-950">
            Capturing the <span className="text-sky-600">Heights.</span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl border border-gray-100 shadow-sm">
           <Camera className="text-gray-400" size={20} />
           <span className="text-[12px] uppercase tracking-widest font-black text-gray-700">District Photo Registry</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div 
            key={i} 
            className={`relative overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-50 group ${
              i === 0 ? "col-span-2 row-span-2 aspect-[16/9] md:aspect-auto" : "aspect-square"
            }`}
          >
            <Image 
              src={img} 
              alt={`${districtName} Gallery ${i + 1}`} 
              fill 
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {i === 0 && (
              <div className="absolute bottom-6 left-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                <p className="text-[10px] font-black uppercase tracking-widest text-white leading-none">Featured View</p>
                <p className="text-sm font-black text-white mt-1 leading-none">{districtName} Landscape</p>
              </div>
            )}
          </div>
        ))}
        
        {/* Placeholder for more */}
        <div className="aspect-square bg-gray-50 flex items-center justify-center rounded-[2rem] border-2 border-dashed border-gray-100 group hover:bg-white hover:border-emerald-200 transition-all duration-500">
          <div className="text-center px-6">
             <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                +
             </div>
             <p className="text-[9px] uppercase tracking-widest text-gray-400 font-black group-hover:text-emerald-600 transition-colors font-medium">
               Community <br/>stills incoming
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
