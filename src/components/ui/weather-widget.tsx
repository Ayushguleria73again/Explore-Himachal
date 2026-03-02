"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cloud, 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  CloudSun, 
  Sun,
  ChevronDown
} from "lucide-react";

interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
}

interface Weather {
  temp: number;
  condition: string;
  forecast: ForecastDay[];
}

const WEATHER_ICONS: Record<string, React.ReactNode> = {
  clear: <Sun className="text-amber-400" size={24} />,
  partlyCloudy: <CloudSun className="text-amber-300" size={24} />,
  cloudy: <Cloud className="text-gray-400" size={24} />,
  foggy: <CloudFog className="text-gray-300" size={24} />,
  rainy: <CloudRain className="text-blue-400" size={24} />,
  stormy: <CloudLightning className="text-purple-400" size={24} />,
  snowy: <CloudSnow className="text-sky-300" size={24} />,
};

const WEATHER_CODE_MAP: Record<number, string> = {
  0: "clear",
  1: "partlyCloudy", 2: "partlyCloudy", 3: "partlyCloudy",
  45: "foggy", 48: "foggy",
  51: "rainy", 53: "rainy", 55: "rainy",
  61: "rainy", 63: "rainy", 65: "rainy",
  71: "snowy", 73: "snowy", 75: "snowy",
  80: "rainy", 81: "rainy", 82: "rainy",
  95: "stormy",
};

interface WeatherWidgetProps {
  lat: number;
  lon: number;
  name: string;
}

export function WeatherWidget({ lat, lon, name }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        const data = await res.json();
        
        const forecast = data.daily.time.slice(1, 6).map((time: string, i: number) => ({
          date: new Date(time).toLocaleDateString("en-US", { weekday: "short" }),
          tempMax: Math.round(data.daily.temperature_2m_max[i+1]),
          tempMin: Math.round(data.daily.temperature_2m_min[i+1]),
          condition: WEATHER_CODE_MAP[data.daily.weathercode[i+1]] || "cloudy",
        }));

        setWeather({
          temp: Math.round(data.current_weather.temperature),
          condition: WEATHER_CODE_MAP[data.current_weather.weathercode] || "cloudy",
          forecast,
        });
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (loading) return (
    <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-900 px-6 py-4 rounded-3xl animate-pulse border border-gray-100 dark:border-slate-800">
      <div className="w-10 h-10 bg-gray-200 dark:bg-slate-800 rounded-xl" />
      <div className="space-y-2">
        <div className="h-4 w-12 bg-gray-200 dark:bg-slate-800 rounded" />
        <div className="h-2 w-20 bg-gray-100 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );

  if (!weather) return null;

  return (
    <div className="relative group">
      <div 
        onClick={() => setShowForecast(!showForecast)}
        className="flex items-center gap-4 bg-gray-50 dark:bg-slate-900 px-6 py-4 rounded-3xl border border-gray-100 dark:border-slate-800 group hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 cursor-pointer"
      >
        <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-500">
          {WEATHER_ICONS[weather.condition] || <Cloud size={24} />}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-gray-900 dark:text-white">{weather.temp}°C</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{weather.condition}</span>
          </div>
          <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Live in {name}</p>
        </div>
        <div className={`text-gray-300 transition-transform duration-300 ${showForecast ? "rotate-180" : ""}`}>
           <ChevronDown size={14} />
        </div>
      </div>

      <AnimatePresence>
        {showForecast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 z-20"
          >
            <div className="grid grid-cols-5 gap-2 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md p-3 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-2xl">
               {weather.forecast.map((day, i) => (
                 <div key={i} className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">
                    <span className="text-[7px] font-black uppercase tracking-tighter text-gray-400">{day.date}</span>
                    <div className="text-emerald-500 scale-75">
                      {WEATHER_ICONS[day.condition] || <Cloud size={16} />}
                    </div>
                    <div className="flex flex-col items-center">
                       <span className="text-[9px] font-black text-gray-900 dark:text-white leading-none">{day.tempMax}°</span>
                       <span className="text-[7px] font-bold text-gray-400">{day.tempMin}°</span>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
