"use client";

import React from "react";
import { Compass, Trophy, Mountain, Trees, Waves } from "lucide-react";

interface ActivityTagsProps {
  activities?: string[];
}

const ACTIVITY_ICON_MAP: Record<string, React.ReactNode> = {
  "Trekking": <Mountain size={14} className="text-emerald-500" />,
  "Paragliding": <Compass size={14} className="text-sky-500" />,
  "Rafting": <Waves size={14} className="text-blue-500" />,
  "River Rafting": <Waves size={14} className="text-blue-500" />,
  "Nature": <Trees size={14} className="text-green-500" />,
  "Adventure": <Trophy size={14} className="text-amber-500" />,
};

export function ActivityTags({ activities }: ActivityTagsProps) {
  if (!activities || activities.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.5em] text-emerald-500 font-black mb-4 flex items-center gap-3">
            <Compass size={16} /> Expedition Hub
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter text-gray-950">
            Adventure & <span className="text-emerald-600">Pure Nature.</span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl border border-gray-100 shadow-sm">
           <Trophy className="text-gray-400" size={20} />
           <span className="text-[12px] uppercase tracking-widest font-black text-gray-700">Official Activity Registry</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {activities.map((activity) => {
          // Try to match icon by partial string if possible
          const matchedIcon = Object.entries(ACTIVITY_ICON_MAP).find(([key]) => 
            activity.toLowerCase().includes(key.toLowerCase())
          )?.[1];

          return (
            <div 
              key={activity}
              className="flex items-center gap-4 bg-white border border-gray-100 px-8 py-5 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-200 transition-all duration-500 group cursor-default"
            >
              <div className="group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500 shrink-0">
                {matchedIcon || <div className="w-2 h-2 rounded-full bg-emerald-400" />}
              </div>
              <span className="text-sm font-black uppercase tracking-tight text-gray-800">{activity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
