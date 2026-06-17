"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Volume2, Languages, Sparkles, BookOpen, VolumeX, Check } from "lucide-react";
import { motion } from "framer-motion";

type Dialect = "Kangri" | "Mandyali" | "Kinnauri" | "Lahauli";

interface Phrase {
  id: string;
  category: "Greetings" | "Directions" | "Shopping" | "Food";
  english: string;
  pahari: string;
  phonetics: string;
  speechText: string; // Text optimized for Indian speech synthesis engine
}

const DIALECT_INFO: Record<Dialect, { region: string; description: string; colors: string }> = {
  Kangri: {
    region: "Kangra, Una, Hamirpur",
    description: "Derived from Punjabi and Western Pahari, spoken with a sweet, lyrical rhythm in the lower Shivalik foothills.",
    colors: "bg-emerald-50 text-emerald-600 border-emerald-100"
  },
  Mandyali: {
    region: "Mandi, Bilaspur",
    description: "Has distinct Central Pahari structures, spoken mainly along the Beas River basin and the historic Mandi hills.",
    colors: "bg-amber-50 text-amber-600 border-amber-100"
  },
  Kinnauri: {
    region: "Kinnaur Valley",
    description: "Highly distinct dialect with Sino-Tibetan influences, spoken under the shadow of the sacred Kinnaur Kailash peaks.",
    colors: "bg-indigo-50 text-indigo-600 border-indigo-100"
  },
  Lahauli: {
    region: "Lahaul Valley",
    description: "Spoken in the cold alpine region of Lahaul, sharing vocabulary with Tibetan, Bhoti, and Western Himalayan groups.",
    colors: "bg-rose-50 text-rose-600 border-rose-100"
  }
};

const PHRASE_DATABASE: Record<Dialect, Phrase[]> = {
  Kangri: [
    {
      id: "k1",
      category: "Greetings",
      english: "Hello, how are you?",
      pahari: "राम राम जी, क्या हाल चाल है?",
      phonetics: "Ram Ram ji, kya haal chal hai?",
      speechText: "Ram Ram ji, kya haal chaal hai?"
    },
    {
      id: "k2",
      category: "Directions",
      english: "Where does this road go?",
      pahari: "एह सड़क कुथू जो जांदी है?",
      phonetics: "Eh sadak kuthu jo jandi hai?",
      speechText: "Eh sadak kuthu jo jandi hai?"
    },
    {
      id: "k3",
      category: "Shopping",
      english: "How much does this cost?",
      pahari: "एह कित्ते दा है?",
      phonetics: "Eh kitte da hai?",
      speechText: "Eh kitte da hai?"
    },
    {
      id: "k4",
      category: "Food",
      english: "The food is very delicious!",
      pahari: "रोटी बड़ी स्वाद बणी दी है!",
      phonetics: "Roti badi sward bani di hai!",
      speechText: "Roti badi swaad bani di hai!"
    }
  ],
  Mandyali: [
    {
      id: "m1",
      category: "Greetings",
      english: "Welcome to Mandi!",
      pahari: "मँड्याली धाम विच तुहाड़ा स्वागत है!",
      phonetics: "Mandyali dham vich tuhaada swagat hai!",
      speechText: "Mandyali dhaam vich tuhaada swagat hai!"
    },
    {
      id: "m2",
      category: "Directions",
      english: "Where is the temple located?",
      pahari: "मंदर कुथू ह?",
      phonetics: "Mander kuthu ha?",
      speechText: "Mandir kuthu ha?"
    },
    {
      id: "m3",
      category: "Shopping",
      english: "Please give me some tea.",
      pahari: "मिज्जो थोड़ी चाह देया।",
      phonetics: "Mizzo thodi chaa deya.",
      speechText: "Mizzo thodi chaa deya."
    },
    {
      id: "m4",
      category: "Food",
      english: "We want to eat Sepu Badi.",
      pahari: "अस्सी सेपू बड़ी खाणी है।",
      phonetics: "Assi Sepu Badi khaani hai.",
      speechText: "Assi Sepu Badi khaani hai."
    }
  ],
  Kinnauri: [
    {
      id: "kn1",
      category: "Greetings",
      english: "Hello / Namaste",
      pahari: "जूले! (or) राम राम!",
      phonetics: "Joolay! / Ram Ram!",
      speechText: "Joolay! Ram Ram!"
    },
    {
      id: "kn2",
      category: "Directions",
      english: "How is the route ahead?",
      pahari: "मोरंग रास्ता केने बा?",
      phonetics: "Morang rasta kene ba?",
      speechText: "Morang rasta kene ba?"
    },
    {
      id: "kn3",
      category: "Shopping",
      english: "Are apples available here?",
      pahari: "युगो रुंग शा शेबा?",
      phonetics: "Yugo rung sha sheba?",
      speechText: "Yugo rung sha sheba?"
    },
    {
      id: "kn4",
      category: "Food",
      english: "Give me some butter tea.",
      pahari: "मिज्जो चाह शुल देया।",
      phonetics: "Mizzo chaa shul deya.",
      speechText: "Mizzo chaa shool deya."
    }
  ],
  Lahauli: [
    {
      id: "l1",
      category: "Greetings",
      english: "Welcome / Greetings",
      pahari: "जूले! ताशी देलेक!",
      phonetics: "Joolay! Tashi Delek!",
      speechText: "Joolay! Tashi Delek!"
    },
    {
      id: "l2",
      category: "Directions",
      english: "Is the mountain pass open?",
      pahari: "ला खेड़ी बा?",
      phonetics: "La khedi ba?",
      speechText: "Laa khedi ba?"
    },
    {
      id: "l3",
      category: "Shopping",
      english: "Where can we sleep tonight?",
      pahari: "इमु चीमु ने कुथू?",
      phonetics: "Imu chimu ne kuthu?",
      speechText: "Imu chimu ne kuthu?"
    },
    {
      id: "l4",
      category: "Food",
      english: "Please give me hot Siddu.",
      pahari: "तत्ता सिड्डू देया।",
      phonetics: "Tatta Siddu deya.",
      speechText: "Tatta Siddu deya."
    }
  ]
};

export function DialectGlossary() {
  const [selectedDialect, setSelectedDialect] = useState<Dialect>("Kangri");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);
  const [audioCache, setAudioCache] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined" && !window.speechSynthesis) {
      setIsSpeechSupported(false);
    }
  }, []);

  // Stop audio and cleanup cached object URLs on unmount
  useEffect(() => {
    return () => {
      if (activeAudio) {
        activeAudio.pause();
      }
      // Revoke all created URLs to avoid memory leaks
      Object.values(audioCache).forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {}
      });
    };
  }, [activeAudio, audioCache]);

  const handleSpeak = async (text: string, id: string) => {
    // Stop any currently playing audio
    if (activeAudio) {
      activeAudio.pause();
      setActiveAudio(null);
    }

    setSpeakingId(id);

    // Check client-side session cache first
    if (audioCache[id]) {
      const audio = new Audio(audioCache[id]);
      
      audio.onplay = () => {
        audio.playbackRate = 0.72; // Slow down the pronunciation speed for clarity
      };
      
      audio.onended = () => {
        setSpeakingId(null);
        setActiveAudio(null);
      };

      audio.onerror = () => {
        setSpeakingId(null);
        setActiveAudio(null);
      };

      setActiveAudio(audio);
      audio.play();
      return;
    }

    try {
      const response = await fetch("/api/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("audio")) {
          const rawBlob = await response.blob();
          const blob = new Blob([rawBlob], { type: "audio/mpeg" });
          const url = URL.createObjectURL(blob);
          
          // Save in client session cache
          setAudioCache((prev) => ({ ...prev, [id]: url }));

          const audio = new Audio(url);
          
          audio.onplay = () => {
            audio.playbackRate = 0.72; // Slow down the pronunciation speed for clarity
          };

          audio.onended = () => {
            setSpeakingId(null);
            setActiveAudio(null);
          };

          audio.onerror = () => {
            setSpeakingId(null);
            setActiveAudio(null);
          };

          setActiveAudio(audio);
          audio.play();
          return;
        }
      }

      // If ElevenLabs is not configured or fails, use browser fallback
      fallbackSpeak(text, id);
    } catch (error) {
      console.warn("ElevenLabs TTS failed, playing local SpeechSynthesis fallback:", error);
      fallbackSpeak(text, id);
    }
  };

  const fallbackSpeak = (text: string, id: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSpeakingId(null);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      
      const indianVoice = voices.find(
        (v) => v.lang.includes("hi-IN") || v.lang.includes("en-IN")
      );
      if (indianVoice) {
        utterance.voice = indianVoice;
      }
      utterance.pitch = 1.0;
      utterance.rate = 0.75;

      utterance.onend = () => {
        setSpeakingId(null);
      };
      utterance.onerror = () => {
        setSpeakingId(null);
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn("Speech Synthesis error:", error);
      setSpeakingId(null);
    }
  };

  const filteredPhrases = useMemo(() => {
    const list = PHRASE_DATABASE[selectedDialect];
    if (activeCategory === "All") return list;
    return list.filter((p) => p.category === activeCategory);
  }, [selectedDialect, activeCategory]);

  const categories = ["All", "Greetings", "Directions", "Shopping", "Food"];

  return (
    <div className="p-10 md:p-12 space-y-12">
      <div className="text-center md:text-left">
        <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.5em] text-emerald-500 font-black bg-emerald-50 px-4 py-1.5 rounded-full w-max mx-auto md:mx-0 mb-4">
           <Languages size={12} strokeWidth={3} /> Oral Tradition
        </span>
        <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">
          Pahari Dialect Glossary & Soundboard
        </h3>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
          Learn local regional dialects and speak like a local in the high valleys
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left Dialect Selectors */}
        <div className="space-y-6 lg:col-span-1">
          <span className="text-[10px] uppercase tracking-widest font-black text-gray-400 block pb-2 border-b border-gray-100">
            Select Dialect
          </span>
          
          <div className="flex flex-col gap-3">
            {(["Kangri", "Mandyali", "Kinnauri", "Lahauli"] as Dialect[]).map((dialect) => {
              const info = DIALECT_INFO[dialect];
              const isSelected = selectedDialect === dialect;
              return (
                <button
                  key={dialect}
                  onClick={() => {
                    setSelectedDialect(dialect);
                    window.speechSynthesis?.cancel();
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all outline-none ${
                    isSelected 
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/10" 
                      : "bg-gray-50 border-gray-100 hover:bg-white hover:border-gray-200 text-gray-800"
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-black uppercase tracking-tight">{dialect}</span>
                    <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? "bg-emerald-700 text-white" : "bg-gray-200 text-gray-500"
                    }`}>
                      {info.region.split(",")[0]}
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed mt-2 ${isSelected ? "text-emerald-100" : "text-gray-400"}`}>
                    {info.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Phrase Grid */}
        <div className="lg:col-span-2 space-y-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border outline-none ${
                  activeCategory === cat 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                    : "bg-white border-gray-100 hover:border-gray-200 text-gray-400 hover:text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Soundboard cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPhrases.map((phrase) => {
              const isSpeaking = speakingId === phrase.id;
              return (
                <div 
                  key={phrase.id}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start gap-4 hover:shadow-md transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-gray-50 text-[8px] text-gray-400 font-extrabold uppercase tracking-widest rounded">
                        {phrase.category}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">English</span>
                      <p className="text-[13px] text-gray-600 font-medium leading-relaxed">{phrase.english}</p>
                    </div>

                    <div>
                      <span className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider block">Pahari (Devanagari)</span>
                      <p className="text-lg font-bold text-gray-950 leading-tight font-serif">{phrase.pahari}</p>
                    </div>

                    <div>
                      <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">Pronunciation</span>
                      <p className="text-xs font-bold text-gray-500 italic font-sans">{phrase.phonetics}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSpeak(phrase.speechText, phrase.id)}
                    disabled={!isSpeechSupported}
                    title={isSpeechSupported ? "Speak phrase" : "Speech Synthesis not supported in your browser"}
                    className={`p-4 rounded-xl border shrink-0 transition-all active:scale-95 outline-none ${
                      isSpeaking 
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                        : "bg-emerald-50 border-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-600 group-hover:scale-105"
                    }`}
                  >
                    {isSpeaking ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                      >
                        <Volume2 size={16} />
                      </motion.div>
                    ) : (
                      <Volume2 size={16} />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {!isSpeechSupported && (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-3">
              <VolumeX size={16} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-[11px] text-amber-800 font-bold leading-normal">
                Audio speech synthesis is disabled or unsupported in this browser environment. You can still use the phonetics pronunciation guide.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
