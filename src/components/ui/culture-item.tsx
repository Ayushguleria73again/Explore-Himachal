import React from "react";

export function CultureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="group">
      <h4 className="text-lg font-black uppercase tracking-tighter mb-3 text-gray-900 group-hover:text-emerald-600 transition-colors">
        {title}
      </h4>
      <p className="text-[14px] text-gray-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
