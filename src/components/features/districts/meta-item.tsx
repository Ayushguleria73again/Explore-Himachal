import React from "react";

interface MetaItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export function MetaItem({ label, value, icon }: MetaItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-gray-300 mt-1">{icon}</div>
      <div>
        <h4 className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">{label}</h4>
        <p className="text-xs text-gray-900 font-medium">{value}</p>
      </div>
    </div>
  );
}
