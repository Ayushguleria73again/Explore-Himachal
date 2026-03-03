"use client";

import React from "react";
import { Plane, Train, MapPin, Navigation } from "lucide-react";

interface ConnectivityHubProps {
  connectivity?: {
    nearest_airport: string;
    nearest_railway: string;
    distance_from_chandigarh: string;
    distance_from_delhi: string;
  };
}

export function ConnectivityHub({ connectivity }: ConnectivityHubProps) {
  if (!connectivity) return null;

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.5em] text-sky-500 font-black mb-4 flex items-center gap-3">
            <Navigation size={16} /> Travel Intelligence
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter text-gray-950">
            Getting to <span className="text-sky-600">Basecamp.</span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl border border-gray-100 shadow-sm">
           <MapPin className="text-gray-400" size={20} />
           <span className="text-[12px] uppercase tracking-widest font-black text-gray-700">Himachal Connectivity Hub</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Airport */}
        <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] hover:border-sky-200 hover:shadow-2xl hover:shadow-sky-900/5 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="p-4 bg-sky-50 rounded-2xl text-sky-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
              <Plane size={24} />
            </div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-black">Air Travel</h4>
          </div>
          <p className="text-xl font-black text-gray-950 truncate relative z-10" title={connectivity.nearest_airport}>
            {connectivity.nearest_airport}
          </p>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-2 relative z-10">Primary Hub</p>
        </div>

        {/* Railway */}
        <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] hover:border-sky-200 hover:shadow-2xl hover:shadow-sky-900/5 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="p-4 bg-sky-50 rounded-2xl text-sky-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
              <Train size={24} />
            </div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-black">Rail Link</h4>
          </div>
          <p className="text-xl font-black text-gray-950 truncate relative z-10" title={connectivity.nearest_railway}>
            {connectivity.nearest_railway}
          </p>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-2 relative z-10">Nearest Station</p>
        </div>

        {/* Chandigarh */}
        <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 group">
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform duration-500">
              <Navigation size={24} />
            </div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-black">From CHD</h4>
          </div>
          <p className="text-3xl font-black text-gray-950">
            {connectivity.distance_from_chandigarh}
          </p>
          <p className="text-[11px] text-emerald-600 font-black uppercase tracking-widest mt-2">Road Distance</p>
        </div>

        {/* Delhi */}
        <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500 group">
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform duration-500">
              <Navigation size={24} />
            </div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-black">From Delhi</h4>
          </div>
          <p className="text-3xl font-black text-gray-950">
            {connectivity.distance_from_delhi}
          </p>
          <p className="text-[11px] text-amber-600 font-black uppercase tracking-widest mt-2">Road Distance</p>
        </div>
      </div>
    </div>
  );
}
