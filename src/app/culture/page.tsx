/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush, Utensils, Music, Sparkles, X, History, ScrollText, BookOpen } from "lucide-react";

interface CultureDetail {
  title: string;
  history: string;
  technique: string;
  fact: string;
  image: string;
}

const CULTURE_DETAILS: Record<string, CultureDetail> = {
  "Kangra Miniatures": {
    title: "Kangra Miniatures",
    history: "Flourished in the 18th century under Maharaja Sansar Chand. It evolved from Basholi art but gained a lyrical grace, heavily influenced by Mughal artists who sought refuge in the hills.",
    technique: "Uses delicate brushwork and natural mineral colors. Themes primarily center on 'Sringara' (love), specifically the divine romance of Radha and Krishna.",
    fact: "The colors are made from real gold, silver, and stones like lapis lazuli.",
    image: "/images/culture_kangra_miniature.png"
  },
  "Chamba Rumal": {
    title: "Chamba Rumal",
    history: "A tradition favored by 18th-century royalty. These handkerchiefs were embroidered by queens and royal ladies as ceremonial gifts.",
    technique: "Famous for the 'Dorukha' (double-sided) stitch, where the design appears identical on both sides. No knots are used in the embroidery.",
    fact: "It is often called 'Needlework Miniature Painting' because its designs mirror Kangra art.",
    image: "/images/culture_chamba_rumal.png"
  },
  "Thangka Art": {
    title: "Thangka Art",
    history: "Ancient Tibetan scroll paintings dating back to the 7th century. They serve as portable meditation tools for nomadic monks.",
    technique: "Painted on cotton or silk. Artists use 24-carat gold and mineral pigments. Each geometric proportion follows strict spiritual iconometry.",
    fact: "A single large Thangka can take over a year to complete.",
    image: "/images/culture_thangka_art.png"
  },
  "Metal Casting": {
    title: "Metal Casting",
    history: "Focuses on 'Mohras'—sacred metal masks of deities dating to the 8th-10th centuries. These icons were essential for portable Himalayan temples.",
    technique: "Employs the 'Cire Perdu' (lost-wax) casting method. Artisans meticulously carve models in wax before casting them in brass or bronze.",
    fact: "Every village deity (Devta) has a unique 'Mohra' representing their distinct personality.",
    image: "/images/culture_metal_casting.png"
  },
  "Sepu Badi": {
    title: "Sepu Badi",
    history: "The soul of Mandi's culinary identity, officially part of the 'Mandi Dham' tradition for centuries.",
    technique: "Soaked black lentils are grounded, steamed, fried, and then slow-cooked in a tangy yogurt-based gravy with spinach.",
    fact: "It is considered a 'royal' dish because of its complex, multi-stage preparation process.",
    image: "/images/culture_sepu_badi.png"
  },
  "Siddu": {
    title: "Siddu",
    history: "Originates from the Gaddi shepherd community. It was a high-energy food for long winter mountain crossings.",
    technique: "Fermented wheat dough is filled with walnut paste or poppy seeds and then steamed to a soft, fluffy texture.",
    fact: "Traditionally served drenched in pure desi ghee (clarified butter).",
    image: "/images/culture_siddu.png"
  },
  "Madra": {
    title: "Madra",
    history: "Hails from the Chamba district. It is regarded as the 'King of Dishes' in the royal Himachali Dham feast.",
    technique: "Chickpeas or rajma are slow-cooked in yogurt and ghee with over 20 aromatic spices until the oil separates.",
    fact: "Authentic Madra is never cooked with onions or garlic.",
    image: "/images/culture_madra.png"
  },
  "Kulluvi Trout": {
    title: "Kulluvi Trout",
    history: "Introduced to the Beas river by the British back in 1909 (primarily for angling). It has since become a local staple.",
    technique: "Freshly caught from cold glacial streams, traditionally pan-seared with local herbs and lemon.",
    fact: "Himachal is one of the very few places in India where wild Brown Trout flourish.",
    image: "/images/culture_trout.png"
  },
  "Kullu Dussehra": {
    title: "Kullu Dussehra",
    history: "Dating back to 1660 under Raja Jagat Singh. It begins when Dussehra ends in the rest of India.",
    technique: "A mega-congregation where 200+ village deities arrive on hand-carried palanquins to pay homage to Lord Raghunath.",
    fact: "Unlike other celebrations, no effigy of Ravana is burnt here.",
    image: "/images/culture_kullu_dussehra.jpg"
  },
  "Minjar Mela": {
    title: "Minjar Mela",
    history: "Celebrates the 935 A.D. victory of the Chamba King. 'Minjar' refers to silk tassels worn by locals.",
    technique: "Includes a grand procession to the Ravi river where silk tassels (symbolizing maize shoots) are offered for prosperity.",
    fact: "It is one of the oldest communal fairs in the Himalayas, uniting Muslims and Hindus.",
    image: "/images/culture_minjar_mela.jpg"
  },
  "Nati Dance": {
    title: "Nati Dance",
    history: "A communal harvest dance. Holds the Guinness World Record for the largest folk dance with nearly 10,000 participants.",
    technique: "Synchronized footwork in a circular formation, accompanied by the echo of large traditional trumpets like 'Karnals'.",
    fact: "Every valley in Himachal has its own slightly different version of the Nati step.",
    image: "/images/culture_nati_dance.jpg"
  },
  "Masked Cham": {
    title: "Masked Cham",
    history: "A 1,300-year-old ritual introduced by Guru Padmasambhava to cleanse evil forces from the high valleys.",
    technique: "Monks wear elaborate, fearsome masks and heavy silk costumes, performing rhythmic movements to the beat of cymbals.",
    fact: "The dance is considered a form of meditation; the monks believe they embody the protective deities.",
    image: "/images/culture_masked_cham.jpg"
  }

};

function ItemModal({ isOpen, onClose, itemName }: { isOpen: boolean; onClose: () => void; itemName: string }) {
  const detail = CULTURE_DETAILS[itemName];
  if (!detail) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-gray-950 transition-all shadow-xl"
            >
              <X size={24} />
            </button>

            {/* Modal Image */}
            <div className="w-full lg:w-1/2 relative bg-gray-100 min-h-[16rem]">
              <img 
                src={detail.image}
                alt={detail.title}
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent lg:hidden" />
              <div className="absolute bottom-6 left-8 block lg:hidden">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{detail.title}</h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="w-full lg:w-1/2 p-10 sm:p-12 overflow-y-auto custom-scrollbar">
              <div className="hidden lg:block mb-10">
                <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-black mb-3 block">Cultural Detail</span>
                <h3 className="text-4xl font-black text-gray-950 uppercase tracking-tighter leading-none">{detail.title}</h3>
              </div>

              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-emerald-600">
                    <History size={18} strokeWidth={2.5} />
                    <span className="text-[10px] uppercase tracking-widest font-black">Historical Context</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">{detail.history}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-amber-600">
                    <ScrollText size={18} strokeWidth={2.5} />
                    <span className="text-[10px] uppercase tracking-widest font-black">Artistic Technique</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">{detail.technique}</p>
                </div>

                <div className="pt-8 border-t border-gray-100 italic">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                    <BookOpen size={16} className="text-gray-400 mt-1 shrink-0" />
                    <p className="text-gray-400 text-[12px] font-medium leading-relaxed">
                      <span className="font-black uppercase text-[10px] text-gray-900 block mb-1">Did you know?</span>
                      {detail.fact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function CulturePage() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const categories = [
    {
      title: "Sacred Arts",
      icon: <Paintbrush className="text-emerald-500" size={24} />,
      description: "From the delicate lines of Kangra miniature paintings to the cosmic geometry of Tibetan Thangkas, the arts of Himachal are a spiritual dialogue with the divine.",
      items: ["Kangra Miniatures", "Chamba Rumal", "Thangka Art", "Metal Casting"],
      image: "/images/kangra.png",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Culinary Heritage",
      icon: <Utensils className="text-amber-500" size={24} />,
      description: "The 'Dham' is more than a feast; it is a ritual. Slow-cooked in brass vessels, the flavors of Himachal are seasonal, soulful, and deeply communal.",
      items: ["Sepu Badi", "Siddu", "Madra", "Kulluvi Trout"],
      image: "/images/shimla.png",
      color: "bg-amber-50 text-amber-600"
    },
    {
      title: "Living Traditions",
      icon: <Music className="text-sky-500" size={24} />,
      description: "Every valley rings with the sound of the 'Karnal' and the rhythmic step of the 'Nati'. Festivals here aren't events; they are the pulse of the community.",
      items: ["Kullu Dussehra", "Minjar Mela", "Nati Dance", "Masked Cham"],
      image: "/images/kullu.png",
      color: "bg-sky-50 text-sky-600"
    }
  ];

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar isDetail title="Culture." />

      <ItemModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        itemName={selectedItem || ""} 
      />

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-emerald-500 font-black mb-10 block text-center">Cultural Discovery</span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-gray-950 text-center leading-[0.85] uppercase mb-12">
            The Soul of <br />
            <span className="text-vibrant-gradient">The Hills.</span>
          </h1>
          <p className="text-[14px] text-gray-500 uppercase tracking-widest text-center leading-loose max-w-2xl mx-auto font-medium">
            A vibrant tapestry of sacred arts, celebratory traditions, and communal feasts that have defined Himalayan life for millennia.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="space-y-40">
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-20 items-center`}
            >
              <div className="flex-1 space-y-12">
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${cat.color}`}>
                    {cat.icon}
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter uppercase text-gray-950">{cat.title}</h2>
                </div>
                
                <p className="text-xl text-gray-600 font-medium leading-relaxed">
                  {cat.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {cat.items.map((item) => (
                    <button 
                      key={item} 
                      onClick={() => setSelectedItem(item)}
                      className="flex items-center justify-between group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-white hover:shadow-lg transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-[11px] uppercase tracking-widest font-black text-gray-900">{item}</span>
                      </div>
                      <span className="text-[9px] font-black text-gray-300 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all">+ Detail</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`flex-1 w-full aspect-[4/3] relative rounded-[3rem] overflow-hidden shadow-2xl ${index % 2 === 1 ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-transform duration-700`}>
                <img 
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[3rem]" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 bg-gray-950 mt-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-12 leading-[1.05]">Experience the living <br/>heritage firsthand.</h3>
          <p className="text-gray-400 text-sm uppercase tracking-[0.3em] font-medium mb-12">Join our seasonal cultural walks</p>
          <button className="px-12 py-5 bg-emerald-500 text-white text-[11px] uppercase tracking-[0.4em] font-black rounded-full hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 active:scale-95">
            Book Experience
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
