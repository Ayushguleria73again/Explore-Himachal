import React from "react";
import Image from "next/image";
import { Mountain, Waves, Compass, TreePine } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FactBlock } from "@/components/features/home/fact-block";
import { CultureItem } from "@/components/features/culture/culture-item";
import { InteractiveMap } from "@/components/features/home/InteractiveMap";
import { FestivalCalendar } from "@/components/features/home/festival-calendar";
import { ItineraryPlanner } from "@/components/features/home/itinerary-planner";
import { CommunityGallery } from "@/components/features/home/community-gallery";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { DiscoverySection } from "@/components/features/home/discovery-section";

export default function Home() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="overflow-hidden">
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070"
          bgImageSrc="/images/himachal_hero_bg.png"
          title="THE SOLITUDE OF HIGH PEAKS"
          date="Himalayan Archive"
          scrollToExpand="Discovery Series 01"
          textBlend
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-[11px] uppercase tracking-[0.5em] text-emerald-500 font-black mb-10">Historical Context</h2>
            <p className="text-2xl md:text-4xl font-bold leading-[1.15] text-gray-900 tracking-tight mb-12">
              Himachal is not just a state; it is a <span className="text-emerald-600 italic font-serif">silence</span> captured in mountains. From sub-tropical valleys to cold desert plateaus.
            </p>
            <p className="text-[13px] text-gray-500 uppercase tracking-widest leading-loose max-w-lg mx-auto font-medium">
              Archive of Himachal Pradesh — Eleven thousand feet above the mundane. 
              A vibrant exploration of the western Himalayas.
            </p>
          </div>
        </ScrollExpandMedia>
      </section>

      {/* Interactive Map */}
      <section className="bg-white pb-20 overflow-hidden">
        <InteractiveMap />
      </section>

      {/* Districts Grid (SSR/Discovery Section) */}
      <DiscoverySection />

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

      {/* Itinerary Planner */}
      <section className="bg-gray-50/50 border-t border-gray-100 pb-40">
        <ItineraryPlanner />
      </section>

      {/* Community Gallery */}
      <section className="bg-white border-t border-gray-100">
        <CommunityGallery />
      </section>

      {/* Festival Calendar */}
      <section className="bg-gray-50/30 border-t border-gray-100">
        <FestivalCalendar />
      </section>

      <Footer key="vibrant-footer-v2" />
    </main>
  );
}
