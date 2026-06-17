import { notFound } from "next/navigation";
import Image from "next/image";
import { districtsData } from "@/lib/data/districts";
import { MapPin, History, Camera, Info } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MetaItem } from "@/components/features/districts/meta-item";
import { WeatherWidget } from "@/components/features/districts/weather-widget";
import { CuisineSpotlight } from "@/components/features/districts/cuisine-spotlight";
import { NatureArchive } from "@/components/features/districts/nature-archive";
import { WeatherGuide } from "@/components/features/districts/weather-guide";
import { ActivityTags } from "@/components/features/districts/activity-tags";
import { ConnectivityHub } from "@/components/features/districts/connectivity-hub";
import { DistrictFestivals } from "@/components/features/districts/district-festivals";
import { DistrictGallery } from "@/components/features/districts/district-gallery";
import { TourPlanner } from "@/components/features/districts/tour-planner";

export async function generateStaticParams() {
  const params = districtsData.map((district) => ({
    id: district.id,
  }));
  return params;
}

export default async function DistrictPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const district = districtsData.find((d) => d.id === id);

  if (!district) {
    notFound();
  }

  return (
    <main className="bg-white text-gray-900 min-h-screen pb-20">
      <Navbar isDetail title={`${district.name}.`} />

      <div className="pt-24 max-w-5xl mx-auto px-6">
        {/* Hero Area */}
        <div className="relative aspect-[21/9] w-full bg-emerald-50 overflow-hidden mb-16 rounded-3xl shadow-2xl shadow-emerald-900/10 border border-emerald-100">
          <Image
            src={district.image}
            alt={district.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {/* Left Column - Meta */}
          <div className="space-y-12">
            <WeatherWidget lat={district.latitude} lon={district.longitude} name={district.name} />
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-black mb-8">Vital Stats</h2>
              <div className="space-y-6">
                 <MetaItem label="Main Town" value={district.headquarters} icon={<MapPin className="text-emerald-500" size={16} />} />
                 <MetaItem label="Total Area" value={district.stats.area || "N/A"} icon={<Info className="text-emerald-500" size={16} />} />
                 <MetaItem label="Population" value={district.stats.population || "N/A"} icon={<div className="w-4 h-4 rounded-full bg-emerald-500/20" />} />
              </div>
            </div>

            <div className="pt-10 border-t border-gray-100">
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-amber-500 font-black mb-8">Points of Interest</h2>
              <div className="space-y-8">
                {district.topSpots.map((spot) => (
                  <div key={spot.name} className="group">
                    <h4 className="text-sm font-black uppercase tracking-tight mb-2 group-hover:text-emerald-600 transition-colors">{spot.name}</h4>
                    <p className="text-[12px] text-gray-500 leading-relaxed font-medium">{spot.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Main Info */}
          <div className="md:col-span-2 space-y-20">
            <section>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-950 mb-10 leading-[1.05]">
                {district.name} — <br />
                <span className="text-vibrant-gradient">{district.shortFact}</span>
              </h1>
              <p className="text-xl text-gray-600 font-medium leading-relaxed">
                {district.description}
              </p>
            </section>

            <section className="pt-20 border-t border-gray-100 relative">
               <div className="absolute -top-px left-0 w-24 h-px bg-emerald-500" />
               <div className="flex items-center gap-4 mb-10">
                 <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                   <History size={20} strokeWidth={2.5} />
                 </div>
                 <h2 className="text-[11px] uppercase tracking-[0.4em] text-gray-950 font-black">Heritage Timeline</h2>
               </div>
               <p className="text-gray-500 text-sm leading-[1.8] font-medium first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:text-emerald-600 first-letter:leading-[0.8]">
                 {district.history}
               </p>
            </section>

            <section className="pt-20 border-t border-gray-100 relative">
               <div className="absolute -top-px left-0 w-24 h-px bg-vibrant/50" />
               <div className="flex items-center gap-4 mb-10">
                 <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                   <div className="w-5 h-5 border-2 border-amber-600 rounded-full flex items-center justify-center font-black text-[10px]">C</div>
                 </div>
                 <h2 className="text-[11px] uppercase tracking-[0.4em] text-gray-950 font-black">Cultural Essence</h2>
               </div>
               <p className="text-gray-500 text-sm leading-[1.8] font-medium">
                 {district.culture}
               </p>
            </section>
          </div>
        </div>
      </div>

      {/* Full Width Info sections - Upscaled Presence */}
      <div className="mt-32 border-t border-gray-100 pt-32 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-6 space-y-40">
           {/* Travel Intelligence Group */}
           <div className="space-y-40">
              <WeatherGuide weather={district.weather} />
              <ActivityTags activities={district.activities} />
              <TourPlanner itineraries={district.itineraries} />
              <ConnectivityHub connectivity={district.connectivity} />
              <DistrictFestivals festivals={district.festivals} />
            </div>

            {/* Photo Gallery */}
            <DistrictGallery images={district.gallery} districtName={district.name} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Phase 4 Deep Dive Sections */}
        <div className="mt-40 space-y-40">
          {district.cuisine && (
            <CuisineSpotlight cuisine={district.cuisine} />
          )}

          {(district.wildlife || district.flora) && (
            <NatureArchive wildlife={district.wildlife} flora={district.flora} />
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
