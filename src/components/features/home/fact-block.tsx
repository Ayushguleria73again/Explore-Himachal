import React from "react";

interface FactBlockProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  desc: string;
  dark?: boolean;
}

export function FactBlock({ icon, label, value, desc, dark }: FactBlockProps) {
  return (
    <div className="space-y-6">
      <div className="p-3 bg-emerald-900/50 rounded-xl w-fit">{icon}</div>
      <div>
        <h4 className={`text-[10px] uppercase tracking-[0.3em] font-black mb-3 ${dark ? 'text-emerald-500' : 'text-emerald-600'}`}>
          {label}
        </h4>
        <div className={`text-2xl font-black tracking-tight mb-4 ${dark ? 'text-white' : 'text-gray-950'}`}>
          {value}
        </div>
        <p className={`text-[13px] leading-relaxed font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          {desc}
        </p>
      </div>
    </div>
  );
}
