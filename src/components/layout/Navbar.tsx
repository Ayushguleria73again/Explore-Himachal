"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Landmark, Map, Compass, Info, Sliders } from "lucide-react";
import NextLink from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar({ isDetail = false, title = "Himachal." }: { isDetail?: boolean; title?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Explore", href: "/explore", icon: <Compass size={14} strokeWidth={2.5} /> },
    { name: "Districts", href: "/archive", icon: <Map size={14} strokeWidth={2.5} /> },
    { name: "Culture", href: "/culture", icon: <Landmark size={14} strokeWidth={2.5} /> },
    { name: "Planner", href: "/planner", icon: <Sliders size={14} strokeWidth={2.5} /> },
    { name: "About", href: "/about", icon: <Info size={14} strokeWidth={2.5} /> },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 print:hidden transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-4" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-12">
          <NextLink href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-emerald-600/20 group-hover:bg-emerald-500 transition-all duration-500">
              H
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black tracking-tighter uppercase text-emerald-900 leading-none">Himachal</span>
               <span className="text-[9px] uppercase tracking-[0.4em] text-emerald-500 font-black mt-1">Archive.</span>
            </div>
          </NextLink>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10 border-l border-gray-200 pl-12 h-10">
            {navLinks.map((link) => (
              <NextLink 
                key={link.name}
                href={link.href}
                className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-emerald-800/70 hover:text-emerald-900 transition-all font-black relative"
              >
                <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-emerald-500">
                   {link.icon}
                </span>
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
              </NextLink>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <NextLink 
            href="/contact" 
            className="hidden sm:flex px-8 py-3 bg-emerald-600 text-white text-[10px] uppercase tracking-[0.3em] font-black rounded-full hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
          >
            Connect
          </NextLink>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-emerald-900 bg-emerald-50 rounded-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-200 overflow-hidden lg:hidden shadow-2xl"
          >
            <div className="p-8 space-y-4 bg-white">
              {navLinks.map((link) => (
                <NextLink 
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-5 bg-emerald-50/50 rounded-2xl text-[14px] uppercase tracking-widest text-emerald-900 font-black hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                >
                  <span className="flex items-center gap-4">
                    {link.icon}
                    {link.name}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </NextLink>
              ))}
              <div className="pt-4">
                <NextLink 
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center p-6 bg-emerald-600 text-white rounded-2xl text-[12px] uppercase tracking-widest font-black shadow-lg shadow-emerald-600/20"
                >
                  Contact Support
                </NextLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
