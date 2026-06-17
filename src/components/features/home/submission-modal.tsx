"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Instagram, CheckCircle2, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmissionModal({ isOpen, onClose }: SubmissionModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#34d399", "#ffffff"]
      });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-950/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-950 transition-colors"
            >
              <X size={24} />
            </button>

            {step === "form" ? (
              <div className="p-10 md:p-16">
                <div className="mb-10">
                  <h3 className="text-3xl font-black tracking-tighter text-gray-950 mb-2">Submit to Archive</h3>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Share your Himalayan story with the world.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Your Identity</label>
                    <input 
                      required
                      placeholder="@mountain_soul"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Social link</label>
                      <div className="relative">
                        <Instagram size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          placeholder="instagram.com/..."
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-10 text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">District</label>
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold outline-none">
                        <option>Spiti Valley</option>
                        <option>Manali</option>
                        <option>Dharamshala</option>
                        <option>Shimla</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Upload Image</label>
                     <div className="border-2 border-dashed border-gray-100 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 hover:bg-gray-50 transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                           <Upload size={24} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Drag & Drop or Click to Browse</p>
                     </div>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-6 bg-gray-950 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-gray-950/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Processing...
                      </>
                    ) : (
                      "Submit Capture"
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-16 text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-8 animate-bounce">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-4xl font-black tracking-tighter text-gray-950 mb-4">Awaiting Review</h3>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest leading-relaxed mb-10">
                  Your story has been sent to the archivists. <br/>You'll be notified when it goes live.
                </p>
                <button 
                  onClick={onClose}
                  className="px-12 py-4 bg-emerald-600 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-full hover:bg-emerald-500 transition-all"
                >
                  Return to Archive
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
