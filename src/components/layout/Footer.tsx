import React from "react";

export function Footer() {
  return (
    <footer id="main-footer" style={{backgroundColor: '#ffffff'}} className="pt-24 pb-16 text-gray-900 overflow-hidden relative border-t border-gray-100 print:hidden">
      {/* Subtle background elements */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-50 rounded-full blur-[100px]" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-50 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 pb-16 border-b border-gray-100">
          <div className="max-w-md">
            <span className="text-3xl font-black tracking-tighter uppercase mb-6 block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
              Himachal.
            </span>
            <p className="text-gray-500 text-sm leading-relaxed font-medium mb-8">
              The vibrant archive of the Western Himalayas. Documenting twelve worlds within one state—where ancient traditions meet the eternal silence of high peaks.
            </p>
            <div className="flex gap-4">
               <SocialIcon label="IG" />
               <SocialIcon label="TW" />
               <SocialIcon label="YT" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            <FooterGroup 
              title="Explore" 
              links={[
                { label: 'Districts', href: '#districts' },
                { label: 'Culture', href: '#culture' },
                { label: 'Adventure', href: '/adventure' }
              ]} 
            />
            <FooterGroup 
              title="Registry" 
              links={[
                { label: 'About Project', href: '/about' },
                { label: 'Content Policy', href: '/policy' },
                { label: 'Archive', href: '/archive' }
              ]} 
            />
            <FooterGroup 
              title="Contact" 
              links={[
                { label: 'Tourism Dept', href: '/contact' },
                { label: 'Help Center', href: '/contact' },
                { label: 'Emergency', href: '/contact' }
              ]} 
            />
          </div>
        </div>
        
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
             <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black">
                © MMXXVI Himachal Tourism Archive
             </p>
             <div className="hidden md:block w-8 h-px bg-gray-100" />
             <p className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-emerald-600/40 font-black">
                Series 01 / Phase 02
             </p>
          </div>
          <div className="flex gap-10">
            <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-emerald-600 transition-all font-black">Legal</a>
            <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-emerald-600 transition-all font-black">Archive Access</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label }: { label: string }) {
  return (
    <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[10px] font-black border border-gray-100 text-gray-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">
       {label}
    </a>
  );
}

function FooterGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="space-y-8">
      <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-emerald-600">{title}</h4>
      <div className="flex flex-col gap-5">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="text-[13px] font-bold text-gray-500 hover:text-emerald-600 transition-all transform hover:translate-x-1">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
