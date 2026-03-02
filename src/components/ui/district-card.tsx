import React from "react";
import Image from "next/image";
import Link from "next/link";
import { District } from "@/lib/data/districts";

export function DistrictCard({ district, index }: { district: District; index: number }) {
  return (
    <Link href={`/districts/${district.id}`} className="group cursor-pointer block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6 rounded-2xl shadow-xl shadow-emerald-900/5 group-hover:shadow-2xl group-hover:shadow-emerald-900/10 transition-all duration-700">
        <Image
          src={district.image}
          alt={district.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
          <p className="text-[10px] font-bold uppercase tracking-widest">Explore District</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <h3 className="text-lg font-black tracking-tighter uppercase text-gray-900 group-hover:text-emerald-600 transition-colors">
            {district.name}
          </h3>
          <span className="text-xs text-emerald-200 font-black">/ {String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">
            Main Town: {district.headquarters}
          </p>
        </div>
        <p className="text-[13px] leading-relaxed text-gray-600 font-medium line-clamp-2">
          {district.shortFact}
        </p>
      </div>
    </Link>
  );
}
