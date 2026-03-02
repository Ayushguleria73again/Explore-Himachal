import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { Mountain, Waves, Compass, TreePine } from "lucide-react";
import { districtsData } from "@/lib/data/districts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FactBlock } from "@/components/ui/fact-block";
import { DistrictCard } from "@/components/ui/district-card";
import { CultureItem } from "@/components/ui/culture-item";
import { InteractiveMap } from "@/components/ui/InteractiveMap";
import { FestivalCalendar } from "@/components/ui/festival-calendar";
import { ItineraryPlanner } from "@/components/ui/itinerary-planner";
import { CommunityGallery } from "@/components/ui/community-gallery";

export default function Home() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-40 overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center max-w-4xl mx-auto mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-600 mb-6 font-bold bg-emerald-50 px-3 py-1 rounded-full">Discovery Series 01</span>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-950 text-center leading-[0.95] mb-8">
                THE SOLITUDE OF <br />
                <span className="text-vibrant-gradient">HIGH PEAKS</span>
              </h1>
              <p className="text-[12px] text-gray-500 uppercase tracking-widest text-center leading-loose max-w-lg font-medium">
                Archive of Himachal Pradesh — Eleven thousand feet above the mundane. 
                A vibrant exploration of the western Himalayas.
              </p>
            </div>
          }
        >
          <div className="w-full h-full bg-emerald-50 flex items-center justify-center relative">
             <Image
              src="/images/hero.png"
              alt="Himachal Hero"
              fill
              sizes="100vw"
              className="object-cover transition-all duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </ContainerScroll>
      </section>

      {/* Introduction */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-40 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-emerald-200 to-transparent" />
        <h2 className="text-[11px] uppercase tracking-[0.5em] text-emerald-500 font-black mb-10">Historical Context</h2>
        <p className="text-2xl md:text-4xl font-bold leading-[1.15] text-gray-900 tracking-tight">
          Himachal is not just a state; it is a <span className="text-emerald-600 italic font-serif">silence</span> captured in mountains. From sub-tropical valleys to cold desert plateaus.
        </p>
      </section>

      {/* Interactive Map */}
      <section className="bg-white border-t border-gray-100 pb-20 overflow-hidden">
        <InteractiveMap />
      </section>

      {/* Districts Grid */}
      <section id="districts" className="max-w-7xl mx-auto px-6 py-32 border-t border-gray-100">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-[11px] uppercase tracking-[0.5em] text-amber-500 font-black mb-4">The Regions</h2>
            <p className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">Twelve Worlds <br/>In One State.</p>
          </div>
          <p className="text-[13px] text-gray-500 max-w-xs leading-relaxed font-medium">
            Each administrative region carries its own dialect, costume, and historical weight.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
          {districtsData.map((d, index) => (
            <DistrictCard key={d.id} district={d} index={index} />
          ))}
        </div>
      </section>

      {/* Facts Section */}
      <section className="bg-emerald-950 py-40 mt-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            <FactBlock 
              icon={<Mountain className="text-emerald-400" size={20} strokeWidth={2.5} />}
              label="Territory"
              value="Western Himalayas"
              desc="Vast stretches of alpine meadows and high mountain passes."
              dark
            />
             <FactBlock 
              icon={<TreePine className="text-emerald-400" size={20} strokeWidth={2.5} />}
              label="Biodiversity"
              value="Ancient Forests"
              desc="Pristine deodar and blue pine woodlands covering 66% area."
              dark
            />
             <FactBlock 
              icon={<Waves className="text-emerald-400" size={20} strokeWidth={2.5} />}
              label="Waterways"
              value="Five Glacial Rivers"
              desc="Feeding the northern plains with perennial glacial melt."
              dark
            />
             <FactBlock 
              icon={<Compass className="text-emerald-400" size={20} strokeWidth={2.5} />}
              label="Spiritual"
              value="Land of Gods"
              desc="Home to thousands of ancient temples and monasteries."
              dark
            />
          </div>
        </div>
      </section>

      {/* Culture */}
      <section id="culture" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="relative aspect-square bg-emerald-50 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/10">
            <Image 
              src="/images/chamba.png"
              alt="Himalayan Culture"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
          </div>
          <div>
            <h2 className="text-[11px] uppercase tracking-[0.5em] text-emerald-500 font-black mb-8">Cultural Fabric</h2>
            <h3 className="text-5xl font-black mb-12 leading-[1.05] tracking-tighter text-gray-950">A Rich tapestry <br/>of Himalayan life.</h3>
            <div className="space-y-10">
              <CultureItem title="Fairs & Festivals" desc="Vibrant celebrations like Kullu Dussehra and Lavi Fair depict the rich local customs." />
              <CultureItem title="The Dham" desc="A traditional ritualistic feast that represents the soul of Himachali hospitality." />
              <CultureItem title="Handicrafts" desc="Intricate shawls, metalwork, and woodcarving that dates back centuries." />
            </div>
          </div>
        </div>
      </section>

      {/* Festival Calendar */}
      <section className="bg-white border-t border-gray-100">
        <FestivalCalendar />
      </section>

      {/* Itinerary Planner */}
      <section className="bg-gray-50/50 border-t border-gray-100">
        <ItineraryPlanner />
      </section>

      {/* Community Gallery */}
      <section className="bg-white border-t border-gray-100">
        <CommunityGallery />
      </section>

      <Footer key="vibrant-footer-v2" />
    </main>
  );
}
