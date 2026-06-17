"use client";

import React, { useState, useMemo } from "react";
import { Activity, ShieldAlert, Heart, Calendar, Compass, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FitnessLevel = "Beginner" | "Intermediate" | "Expert";

interface Trek {
  id: string;
  name: string;
  altitude: number; // in feet
  level: FitnessLevel;
  durationDays: number;
  description: string;
  location: string;
  coordinates: string;
}

const TREK_DATABASE: Trek[] = [
  // Beginner
  {
    id: "triund",
    name: "Triund Hill",
    altitude: 9350,
    level: "Beginner",
    durationDays: 1,
    description: "A popular, scenic ridge trek above McLeod Ganj. Safe, well-defined trail offering panoramic views of the Dhauladhars.",
    location: "Kangra District",
    coordinates: "32.2562° N, 76.3533° E"
  },
  {
    id: "prashar",
    name: "Prashar Lake",
    altitude: 8960,
    level: "Beginner",
    durationDays: 2,
    description: "A peaceful forest trek leading to a sacred oval alpine lake featuring a mysterious floating grass island.",
    location: "Mandi District",
    coordinates: "31.7542° N, 77.1011° E"
  },
  {
    id: "kheerganga",
    name: "Kheerganga Meadows",
    altitude: 9710,
    level: "Beginner",
    durationDays: 2,
    description: "A beautiful trek through the pine forests of Parvati Valley, ending in natural therapeutic hot spring pools.",
    location: "Kullu District",
    coordinates: "31.9845° N, 77.3912° E"
  },
  // Intermediate
  {
    id: "hampta",
    name: "Hampta Pass Crossover",
    altitude: 14100,
    level: "Intermediate",
    durationDays: 5,
    description: "A magnificent crossover trek starting from the lush meadows of Kullu and ending in the cold desert landscapes of Spiti Valley.",
    location: "Kullu to Lahaul-Spiti",
    coordinates: "32.2230° N, 77.2910° E"
  },
  {
    id: "beas_kund",
    name: "Beas Kund Trail",
    altitude: 12770,
    level: "Intermediate",
    durationDays: 3,
    description: "High-altitude alpine lake trek to the source of the river Beas, surrounded by giant glaciers and snow-capped peaks.",
    location: "Kullu District",
    coordinates: "32.3685° N, 77.0850° E"
  },
  {
    id: "bhrigu",
    name: "Bhrigu Lake Alpine Meadows",
    altitude: 14100,
    level: "Intermediate",
    durationDays: 3,
    description: "High-altitude meadow trek leading to a glacial lake that is believed to change color and never fully freeze.",
    location: "Kullu District",
    coordinates: "32.2905° N, 77.2405° E"
  },
  // Expert
  {
    id: "pin_parvati",
    name: "Pin Parvati Pass Traverse",
    altitude: 17450,
    level: "Expert",
    durationDays: 11,
    description: "Extremely challenging trans-Himalayan traverse crossing deep crevices, high altitude glaciers, and steep scree slopes.",
    location: "Kullu to Lahaul-Spiti",
    coordinates: "31.8610° N, 77.8390° E"
  },
  {
    id: "kinnaur_kailash",
    name: "Kinnaur Kailash Circuit",
    altitude: 17250,
    level: "Expert",
    durationDays: 8,
    description: "A sacred circumambulation of the home of Lord Shiva. Demanding moraine paths, steep climbs, and unpredictable weather.",
    location: "Kinnaur District",
    coordinates: "31.5290° N, 78.3615° E"
  },
  {
    id: "friendship",
    name: "Friendship Peak Expedition",
    altitude: 17350,
    level: "Expert",
    durationDays: 8,
    description: "A popular non-technical mountaineering summit trek. Requires basic glacier walking, crampon usage, and rope coordination.",
    location: "Kullu District",
    coordinates: "32.3955° N, 77.1010° E"
  }
];

export function AdventureCalculator() {
  const [fitness, setFitness] = useState<FitnessLevel>("Intermediate");
  const [duration, setDuration] = useState<number>(2); // Stay duration prior to high push
  const [targetAlt, setTargetAlt] = useState<number>(11000); // target altitude in ft

  const calculation = useMemo(() => {
    // Acclimatization rule calculations
    // Rule: above 9,000 ft, you need at least 2 full days of stay at mid-altitudes (6,000ft-8000ft)
    // above 12,000 ft, you need at least 3 days.
    // above 15,000 ft, you need at least 4 days.
    let recommendedRest = 1;
    if (targetAlt >= 15000) {
      recommendedRest = 4;
    } else if (targetAlt >= 12000) {
      recommendedRest = 3;
    } else if (targetAlt >= 9000) {
      recommendedRest = 2;
    }

    const restGap = recommendedRest - duration;
    const isSafe = restGap <= 0;

    // AMS Risk calculation
    // Low: Alt < 9,000 ft
    // Moderate: Alt between 9k and 12k with safe stay duration, or Alt > 12k with safe stay duration
    // Critical: Alt >= 9k with inadequate stay duration, or Alt >= 14k
    let amsRisk: "Low" | "Moderate" | "Critical" = "Low";
    if (targetAlt < 9000) {
      amsRisk = "Low";
    } else if (targetAlt >= 9000 && targetAlt < 13000) {
      amsRisk = isSafe ? "Moderate" : "Critical";
    } else {
      // above 13000 ft is inherently critical or moderate if extensively acclimatized
      amsRisk = (isSafe && duration >= 4) ? "Moderate" : "Critical";
    }

    // Oxygen level calculation (Barometric approximation)
    // Oxygen drops by ~3% per 1000 ft above sea level
    const oxygenPct = Math.round(100 - (targetAlt / 1000) * 3);

    return {
      recommendedRest,
      restGap,
      isSafe,
      amsRisk,
      oxygenPct
    };
  }, [targetAlt, duration]);

  const recommendedTreks = useMemo(() => {
    return TREK_DATABASE.filter(t => t.level === fitness);
  }, [fitness]);

  return (
    <div className="p-10 md:p-12 space-y-12">
      <div className="text-center md:text-left">
        <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.5em] text-emerald-500 font-black bg-emerald-50 px-4 py-1.5 rounded-full w-max mx-auto md:mx-0 mb-4">
           <Activity size={12} strokeWidth={3} /> Altitude Safety
        </span>
        <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">
          Adventure & Altitude Risk Calculator
        </h3>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
          Calculate oxygen depletion and acclimatization windows before climbing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left Input controls */}
        <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 space-y-8">
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-3 block">Fitness Experience</label>
            <div className="grid grid-cols-3 gap-2">
              {(["Beginner", "Intermediate", "Expert"] as FitnessLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setFitness(level)}
                  className={`py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border outline-none ${
                    fitness === level 
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/10" 
                      : "bg-white border-gray-100 hover:border-gray-200 text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Target Altitude</label>
              <span className="text-sm font-black text-gray-900">{targetAlt.toLocaleString()} ft</span>
            </div>
            <input
              type="range"
              min={5000}
              max={18000}
              step={500}
              value={targetAlt}
              onChange={(e) => setTargetAlt(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[9px] text-gray-400 font-extrabold uppercase mt-2">
              <span>Shimla (7k)</span>
              <span>Spiti (12k)</span>
              <span>Passes (17k+)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Rest / Acclimatization Days</label>
              <span className="text-sm font-black text-gray-900">{duration} {duration === 1 ? "Day" : "Days"}</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`w-10 h-10 rounded-xl font-black text-xs transition-all border flex items-center justify-center outline-none ${
                    duration === d 
                      ? "bg-emerald-600 border-emerald-600 text-white" 
                      : "bg-white border-gray-100 hover:border-gray-200 text-gray-500"
                  }`}
                >
                  {d === 5 ? "5+" : d}
                </button>
              ))}
            </div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mt-3 leading-normal">
              Number of days you plan to rest at intermediate elevations (e.g. 7,000ft - 9,000ft) before pushing higher.
            </span>
          </div>
        </div>

        {/* Center: Acclimatization analysis */}
        <div className="bg-white border border-gray-150 p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 space-y-6">
          <div className="pb-4 border-b border-gray-50">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Altitude Risk Profile</span>
            
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500 font-bold uppercase">AMS Hazard Level</span>
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                calculation.amsRisk === "Low" ? "bg-emerald-50 text-emerald-600" :
                calculation.amsRisk === "Moderate" ? "bg-amber-50 text-amber-600" :
                "bg-red-50 text-red-600 animate-pulse"
              }`}>
                {calculation.amsRisk} Risk
              </span>
            </div>
          </div>

          {/* Warning card if safety checklist fails */}
          <AnimatePresence mode="wait">
            {!calculation.isSafe ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4"
              >
                <ShieldAlert size={20} className="text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-[11px] font-black text-red-900 uppercase tracking-wide">Acclimatization Failure Alert</h4>
                  <p className="text-[11px] text-red-700 font-bold leading-normal">
                    Climbing to {targetAlt.toLocaleString()} ft requires at least {calculation.recommendedRest} days of rest at intermediate altitudes. Please add {calculation.restGap} more rest days to reduce AMS risks.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-4"
              >
                <Heart size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-[11px] font-black text-emerald-900 uppercase tracking-wide">Acclimatization Profile Safe</h4>
                  <p className="text-[11px] text-emerald-700 font-bold leading-normal">
                    You have allocated sufficient rest days for this climb. Remember to walk slowly, avoid alcohol, and drink plenty of fluids.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Oxygen bar */}
          <div className="space-y-3 pt-4 border-t border-gray-50">
            <div className="flex justify-between items-baseline text-[10px] uppercase font-black text-gray-400 tracking-wider">
              <span>Effective Oxygen Level</span>
              <span className="text-sm font-black text-gray-900">{calculation.oxygenPct}% of sea level</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  calculation.oxygenPct > 80 ? "bg-emerald-500" :
                  calculation.oxygenPct > 65 ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${calculation.oxygenPct}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase leading-normal">
              At {targetAlt.toLocaleString()} ft, barometric pressure is lower, meaning molecules of oxygen per breath are depleted.
            </p>
          </div>
        </div>

        {/* Right Panel: Trek Recommendations */}
        <div className="space-y-6">
          <span className="text-[10px] uppercase tracking-widest font-black text-gray-400 block pb-2 border-b border-gray-100">
            Recommended Routes for {fitness}s
          </span>

          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
            {recommendedTreks.map((trek) => (
              <div 
                key={trek.id} 
                className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-100 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-black uppercase text-gray-950 tracking-tight">{trek.name}</h4>
                    <span className="px-2 py-0.5 bg-emerald-50 text-[9px] font-black text-emerald-600 uppercase tracking-widest rounded">
                      {trek.durationDays} {trek.durationDays === 1 ? "Day" : "Days"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <MapPin size={10} />
                    <span className="text-[9px] uppercase font-black tracking-widest">{trek.location}</span>
                  </div>
                  
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                    {trek.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-extrabold uppercase mt-4">
                  <span className="flex items-center gap-1"><Compass size={12} /> Alt: {trek.altitude.toLocaleString()} ft</span>
                  <span className="text-gray-300 text-[9px] font-semibold">{trek.coordinates}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
