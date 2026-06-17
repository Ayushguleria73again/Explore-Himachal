"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Compass, CloudSun, MessageSquare, Activity, Volume2, Calendar } from "lucide-react";
import { InteractiveMap } from "../home/InteractiveMap";
import { ItineraryPlanner } from "../home/itinerary-planner";
import { PackingAssistant } from "../explore/packing-assistant";
import { ChatConsole } from "../chat/chat-console";
import { AdventureCalculator } from "./adventure-calculator";
import { DialectGlossary } from "./dialect-glossary";
import { FestivalFinder } from "./festival-finder";

type Tab = "map" | "itinerary" | "packing" | "assistant" | "adventure" | "glossary" | "festivals";

interface TabConfig {
  id: Tab;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export function PlannerContent() {
  const [activeTab, setActiveTab] = useState<Tab>("itinerary");

  const tabs: TabConfig[] = [
    {
      id: "itinerary",
      label: "Itinerary Planner",
      icon: <Compass size={16} />,
      description: "Generate customized day-wise itineraries using AI."
    },
    {
      id: "packing",
      label: "Packing & Weather",
      icon: <CloudSun size={16} />,
      description: "Verify climate zones and generate custom packing checklists."
    },
    {
      id: "adventure",
      label: "Altitude Safety",
      icon: <Activity size={16} />,
      description: "Calculate oxygen levels and mountain sickness risk indexes."
    },
    {
      id: "glossary",
      label: "Dialect Soundboard",
      icon: <Volume2 size={16} />,
      description: "Learn regional travel phrases with audio pronunciation guides."
    },
    {
      id: "festivals",
      label: "Festival Finder",
      icon: <Calendar size={16} />,
      description: "Search and plan trips around historic local fair timelines."
    },
    {
      id: "map",
      label: "Geography Map",
      icon: <Map size={16} />,
      description: "Interactive visual map to explore regional weather and landmarks."
    },
    {
      id: "assistant",
      label: "Mela Ram AI",
      icon: <MessageSquare size={16} />,
      description: "A full conversation suite with your local Himalayan guide."
    }
  ];

  return (
    <section className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-20 text-center"
      >
        <span className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.5em] text-emerald-500 font-black bg-emerald-50 px-4 py-1.5 rounded-full w-max mx-auto mb-10">
           <Compass size={12} strokeWidth={3} /> Voyager Tools
        </span>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-950 leading-[0.85] uppercase mb-12">
          Himalayan <br />
          <span className="text-vibrant-gradient">Travel Toolkit.</span>
        </h1>
        <p className="text-[14px] text-gray-500 uppercase tracking-widest text-center leading-loose max-w-2xl mx-auto font-medium">
          A centralized suite of interactive travel planning applications to map routes, calculate packing lists, assess climates, and consult our AI guide.
        </p>
      </motion.div>

      {/* Tab Selectors */}
      <div className="flex flex-wrap justify-center gap-4 mb-20">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                // Cancel any ongoing dialect pronunciation speech
                window.speechSynthesis?.cancel();
              }}
              className={`relative px-6 py-4 rounded-2xl flex items-center gap-3 transition-all border outline-none ${
                isActive 
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-600/10 font-black" 
                  : "bg-white text-gray-500 border-gray-100 hover:border-gray-200 font-bold hover:text-gray-900"
              }`}
            >
              {tab.icon}
              <div className="flex flex-col items-start text-left">
                <span className="text-[11px] uppercase tracking-wider leading-none">
                  {tab.label}
                </span>
              </div>
              
              {isActive && (
                <motion.div 
                  className="absolute inset-0 rounded-2xl border-2 border-emerald-500 -m-[2px] pointer-events-none"
                  layoutId="activeTabBorder"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="bg-white rounded-[3.5rem] min-h-[600px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "itinerary" && (
              <div className="border border-gray-100 rounded-[3.5rem] bg-gray-50/20">
                <ItineraryPlanner />
              </div>
            )}
            {activeTab === "packing" && (
              <div className="border border-gray-100 rounded-[3.5rem] bg-white">
                <PackingAssistant />
              </div>
            )}
            {activeTab === "adventure" && (
              <div className="border border-gray-100 rounded-[3.5rem] bg-white">
                <AdventureCalculator />
              </div>
            )}
            {activeTab === "glossary" && (
              <div className="border border-gray-105 rounded-[3.5rem] bg-white">
                <DialectGlossary />
              </div>
            )}
            {activeTab === "festivals" && (
              <div className="border border-gray-100 rounded-[3.5rem] bg-white">
                <FestivalFinder />
              </div>
            )}
            {activeTab === "map" && (
              <div className="border border-gray-100 rounded-[3.5rem] bg-white p-6 md:p-12 shadow-sm">
                <InteractiveMap />
              </div>
            )}
            {activeTab === "assistant" && (
              <div className="border border-gray-105 rounded-[3.5rem]">
                <ChatConsole />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
