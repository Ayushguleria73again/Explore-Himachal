"use client";

import React, { useState, useMemo } from "react";
import { districtsData } from "@/lib/data/districts";
import { ShieldCheck, CloudSun, Compass, CheckSquare, Square, Printer, Info, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface PackingItem {
  id: string;
  category: "essentials" | "clothing" | "medical";
  name: string;
  desc: string;
}

export function PackingAssistant() {
  const [selectedDistrict, setSelectedDistrict] = useState("lahaul-spiti");
  const [selectedMonth, setSelectedMonth] = useState(0); // Jan
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const district = useMemo(() => {
    return districtsData.find(d => d.id === selectedDistrict) || districtsData[0];
  }, [selectedDistrict]);

  // Determine Climate and Packing Rules
  const climateInfo = useMemo(() => {
    const isHighAltitude = district.id === "lahaul-spiti" || district.id === "kinnaur" || district.id === "kullu";
    const month = selectedMonth;

    // Seasons: 0,1,10,11 (Winter) | 2,3,9 (Spring/Autumn) | 4,5 (Summer) | 6,7,8 (Monsoon)
    const isWinter = [0, 1, 10, 11].includes(month);
    const isSpringAutumn = [2, 3, 9].includes(month);
    const isSummer = [4, 5].includes(month);
    const isMonsoon = [6, 7, 8].includes(month);

    let tempRange = "";
    let description = "";
    let warning = "";

    if (isHighAltitude) {
      if (isWinter) {
        tempRange = "-15°C to -2°C";
        description = "Subzero freeze, heavy snow blockages likely. Critical winter conditions.";
        warning = "Extreme cold. Check road conditions (Atal Tunnel / passes) before departure.";
      } else if (isSpringAutumn) {
        tempRange = "-2°C to 10°C";
        description = "Cold winds, thawing snow. Crisp mountain sunshine.";
        warning = "High diurnal temperature variation. Sun glare is strong.";
      } else if (isSummer) {
        tempRange = "5°C to 20°C";
        description = "Pleasant alpine summer. Clear blue skies, chilly nights.";
        warning = "UV index is extremely high. Sun protection is mandatory.";
      } else {
        tempRange = "5°C to 15°C";
        description = "Monsoon showers, sparse but prone to flash floods in valleys.";
        warning = "Watch out for active cloudburst advisories in the river basins.";
      }
    } else {
      // Lower/Mid altitude districts (Una, Bilaspur, Kangra, etc.)
      if (isWinter) {
        tempRange = "5°C to 18°C";
        description = "Chilly mornings/nights, warm sunny afternoons.";
        warning = "Thick morning fog in plains and river valleys.";
      } else if (isSpringAutumn) {
        tempRange = "15°C to 28°C";
        description = "Moderate, breezy, and pleasant spring/autumn climate.";
        warning = "Comfortable weather, ideal for general sightseeing.";
      } else if (isSummer) {
        tempRange = "25°C to 38°C";
        description = "Hot and dry summer. Warm winds in valleys.";
        warning = "High humidity. Ensure you carry hydration salts/drinks.";
      } else {
        tempRange = "20°C to 30°C";
        description = "Heavy monsoon rain, high landslide risk in hilly terrains.";
        warning = "Landslide warnings active on steep national highway stretches.";
      }
    }

    return {
      isHighAltitude,
      isWinter,
      isSpringAutumn,
      isSummer,
      isMonsoon,
      tempRange,
      description,
      warning
    };
  }, [district, selectedMonth]);

  // Generate dynamic checklist
  const checklistItems = useMemo(() => {
    const items: PackingItem[] = [
      // Always included essentials
      { id: "id_permits", category: "essentials", name: "ID Proofs & Permits", desc: "Government IDs (Aadhaar/Passport). Inner Line Permit required for foreign nationals in Kinnaur/Spiti." },
      { id: "cash", category: "essentials", name: "Hard Cash", desc: "ATMs are scarce and network connectivity is highly unreliable in remote valleys." },
      { id: "power_bank", category: "essentials", name: "High-Capacity Power Bank", desc: "Cold weather rapidly drains phone and camera batteries." },
      { id: "first_aid", category: "essentials", name: "Personal First-Aid Kit", desc: "Include pain relievers, motion sickness tablets, and antiseptic creams." },
      { id: "shoes", category: "essentials", name: "Sturdy Trekking/Walking Shoes", desc: "Shoes with good grip, preferably broken-in, to handle mountain gravel." },
    ];

    const climate = climateInfo;

    // Clothing & Layers
    if (climate.isWinter || climate.isHighAltitude) {
      items.push(
        { id: "thermals", category: "clothing", name: "Thermal Innerwear (2-3 pairs)", desc: "Warm base layer (tops and bottoms) is critical for heat retention." },
        { id: "down_jacket", category: "clothing", name: "Insulated Down Jacket", desc: "Heavy windproof outer coat rated for subzero temperatures." },
        { id: "gloves", category: "clothing", name: "Fleece-Lined Gloves", desc: "Windproof and water-resistant gloves to protect fingers from frostbite." },
        { id: "socks_wool", category: "clothing", name: "Merino Wool Socks (3+ pairs)", desc: "Thick woolen socks. Keep a dry spare pair strictly for sleeping." },
        { id: "beanie", category: "clothing", name: "Woolen Beanie & Muffler", desc: "Protects ears and neck from biting Himalayan winds." }
      );
    }

    if (climate.isSummer && !climate.isHighAltitude) {
      items.push(
        { id: "light_cottons", category: "clothing", name: "Lightweight Cottons", desc: "Breathable t-shirts and shirts for warm valley temperatures." },
        { id: "sun_hat", category: "clothing", name: "Wide-Brimmed Sun Hat", desc: "Shields face and neck from direct solar heating." }
      );
    }

    if (climate.isMonsoon) {
      items.push(
        { id: "raincoat", category: "clothing", name: "Waterproof Poncho / Raincoat", desc: "Heavy duty raincoat to survive unexpected cloudbursts." },
        { id: "dry_bags", category: "clothing", name: "Dry Bags for Electronics", desc: "Protects cameras, phones, and power banks inside your bag." },
        { id: "quick_dry", category: "clothing", name: "Quick-Dry Trousers", desc: "Polyester/nylon blend pants that do not hold moisture." },
        { id: "backpack_cover", category: "clothing", name: "Waterproof Backpack Cover", desc: "Essential shield for your primary luggage." }
      );
    }

    // Medical & Specialist
    if (climate.isHighAltitude) {
      items.push(
        { id: "sunscreen", category: "medical", name: "High-SPF Sunscreen (SPF 50+)", desc: "High altitude UV rays cause severe sunburns quickly." },
        { id: "lip_balm", category: "medical", name: "Lip Balm with SPF", desc: "Prevents dry mountain air from painfully cracking lips." },
        { id: "ams_meds", category: "medical", name: "Altitude Sickness Pills (AMS)", desc: "Consult a doctor for Diamox. Carry hydration/ORS salts." },
        { id: "sunglasses", category: "medical", name: "Polarized Sunglasses", desc: "Crucial for protecting eyes from high UV index and snow glare." }
      );
    }

    if (climate.isMonsoon) {
      items.push(
        { id: "repellent", category: "medical", name: "Mosquito & Insect Repellent", desc: "Heavy rain breeds bugs in lower valleys and forests." }
      );
    }

    if (climate.isSummer) {
      items.push(
        { id: "hydration", category: "medical", name: "Electrolytes / Glucose", desc: "Helps combat exhaustion and dehydration on sunny walks." }
      );
    }

    return items;
  }, [climateInfo]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const clearAll = () => {
    setCheckedItems({});
  };

  const progressPercentage = useMemo(() => {
    if (checklistItems.length === 0) return 0;
    const checkedCount = checklistItems.filter(item => checkedItems[item.id]).length;
    return Math.round((checkedCount / checklistItems.length) * 100);
  }, [checklistItems, checkedItems]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto border-t border-gray-100 print:py-0 print:border-none">
      <div className="text-center mb-20 print:hidden">
        <span className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.5em] text-emerald-500 font-black bg-emerald-50 px-4 py-1.5 rounded-full w-max mx-auto mb-4">
           <CloudSun size={12} strokeWidth={3} /> Weather Intelligence
        </span>
        <p className="text-4xl md:text-6xl font-black tracking-tighter text-gray-950">Smart Packing Assistant.</p>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-4">Cross-reference climate layers before ascending</p>
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start print:grid-cols-1">
        {/* Left Side: Config & expected weather */}
        <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 space-y-8 print:hidden">
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-3 block">Target District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm font-black text-gray-800 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {districtsData.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-3 block">Month of Journey</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm font-black text-gray-800 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {MONTHS.map((m, idx) => (
                <option key={idx} value={idx}>{m}</option>
              ))}
            </select>
          </div>

          {/* Climate card info */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Climate Zone</span>
              <span className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest ${climateInfo.isHighAltitude ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"}`}>
                {climateInfo.isHighAltitude ? "Alpine High Altitude" : "Sub-Tropical Valley"}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Expected Temp</span>
              <p className="text-3xl font-black text-gray-950 tracking-tight">{climateInfo.tempRange}</p>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">{climateInfo.description}</p>
            </div>

            <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start gap-3">
              <Info size={16} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-[11px] text-amber-800 font-bold leading-normal">{climateInfo.warning}</p>
            </div>
          </div>
        </div>

        {/* Right Side: The Printable Checklist Card */}
        <div className="lg:col-span-2 bg-white border border-gray-100 shadow-2xl rounded-[3.5rem] p-10 md:p-12 relative overflow-hidden print:border-none print:shadow-none print:p-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[80px] -z-10 print:hidden" />
          
          {/* Header */}
          <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-100 print:mb-4 print:pb-4">
            <div>
              <span className="hidden print:block text-[9px] uppercase tracking-widest text-emerald-500 font-bold">Himachal Archival Guide</span>
              <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter print:text-xl">
                {district.name} Checklist
              </h3>
              <p className="text-[11px] text-gray-400 uppercase tracking-widest font-black mt-1">
                Target Season: {MONTHS[selectedMonth]} ({climateInfo.tempRange})
              </p>
            </div>

            <div className="flex gap-3 print:hidden">
              <button
                onClick={clearAll}
                className="px-4 py-2 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100 font-black text-[9px] uppercase tracking-widest rounded-xl transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-md shadow-emerald-600/10 flex items-center gap-2 active:scale-95"
              >
                <Printer size={12} /> Save PDF
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-10 print:hidden">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Acclimatization Packing</span>
              <span className="text-sm font-black text-emerald-600">{progressPercentage}% Ready</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Checklist Area */}
          <div className="space-y-10">
            {/* Essentials Section */}
            <ChecklistGroup
              title="01. Critical Essentials (Always)"
              items={checklistItems.filter(item => item.category === "essentials")}
              checkedItems={checkedItems}
              onToggle={toggleItem}
            />

            {/* Clothing Section */}
            <ChecklistGroup
              title="02. Recommended Apparel & Layers"
              items={checklistItems.filter(item => item.category === "clothing")}
              checkedItems={checkedItems}
              onToggle={toggleItem}
            />

            {/* Medical / Specialty Section */}
            <ChecklistGroup
              title="03. Pharmacy & Mountain Specialty"
              items={checklistItems.filter(item => item.category === "medical")}
              checkedItems={checkedItems}
              onToggle={toggleItem}
            />
          </div>

          {/* Print Footer */}
          <div className="hidden print:block mt-16 pt-8 border-t border-gray-100 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Document generated at explore-himachal.archive — Keep the Himalayas clean and trash-free.
          </div>
        </div>
      </div>
    </section>
  );
}

function ChecklistGroup({ title, items, checkedItems, onToggle }: {
  title: string;
  items: PackingItem[];
  checkedItems: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-4 print:break-inside-avoid">
      <h4 className="text-[11px] font-black uppercase tracking-widest text-emerald-600 pb-2 border-b border-emerald-50 print:text-black">
        {title}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-1">
        {items.map((item) => {
          const isChecked = checkedItems[item.id] || false;
          return (
            <div 
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start select-none print:border-none print:p-1 ${
                isChecked 
                  ? "bg-emerald-50/30 border-emerald-100 shadow-sm" 
                  : "bg-white hover:bg-gray-50 border-gray-100"
              }`}
            >
              <div className="text-emerald-500 mt-0.5 print:text-black">
                {isChecked ? (
                  <CheckCircle2 size={18} strokeWidth={2.5} />
                ) : (
                  <Square size={18} className="text-gray-300" strokeWidth={2.5} />
                )}
              </div>
              <div>
                <span className={`text-[13px] font-black uppercase tracking-tight block ${isChecked ? "text-gray-500 line-through decoration-emerald-200" : "text-gray-950"}`}>
                  {item.name}
                </span>
                <span className="text-[11px] text-gray-400 font-medium mt-1 leading-normal block print:text-gray-600">
                  {item.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
