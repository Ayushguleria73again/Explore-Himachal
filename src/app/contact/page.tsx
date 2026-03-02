import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Phone, Mail, MapPin, ShieldAlert } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar isDetail title="Contact." />
      
      <section className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-950 mb-12 uppercase leading-[0.9]">
              Reach <br />
              <span className="text-vibrant-gradient">The Source.</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-sm mb-16">
              Connect with the official departments and emergency services of Himachal Pradesh.
            </p>
            
            <div className="space-y-12">
               <ContactLink 
                 icon={<Phone size={18} />} 
                 label="Official Helpline" 
                 value="+91 (177) 262-5818" 
               />
               <ContactLink 
                 icon={<Mail size={18} />} 
                 label="General Inquiry" 
                 value="archive@himachal.gov.in" 
               />
               <ContactLink 
                 icon={<MapPin size={18} />} 
                 label="Headquarters" 
                 value="H.P. Tourism Development Corp. Ltd., Ritz Annexe, Shimla" 
               />
            </div>
          </div>
          
          <div className="bg-emerald-50/50 p-12 rounded-[40px] border border-emerald-100 self-start">
             <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-white rounded-2xl text-amber-500 shadow-sm shadow-amber-200/50">
                  <ShieldAlert size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-[12px] uppercase tracking-widest font-black text-gray-900">Emergency Registry</h2>
             </div>
             
             <div className="space-y-10">
                <EmergencyItem label="Police" number="100 / 112" desc="For immediate safety and security concerns." />
                <EmergencyItem label="Ambulance" number="108" desc="Integrated medical emergency response services." />
                <EmergencyItem label="Disaster Management" number="1070" desc="State-level emergency response for natural calamities." />
                <EmergencyItem label="Forest Fire" number="101" desc="Immediate reporting of forest wildfires." />
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactLink({ icon, label, value }: any) {
  return (
    <div className="flex gap-6 items-start">
      <div className="text-emerald-500 mt-1">{icon}</div>
      <div>
        <h4 className="text-[9px] uppercase tracking-widest text-gray-400 font-black mb-2">{label}</h4>
        <p className="text-xl font-black text-gray-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function EmergencyItem({ label, number, desc }: any) {
  return (
    <div className="group">
       <div className="flex justify-between items-center mb-2">
          <h4 className="text-[13px] font-black uppercase tracking-tight text-gray-900 group-hover:text-amber-600 transition-colors">{label}</h4>
          <span className="text-lg font-black text-amber-500">{number}</span>
       </div>
       <p className="text-[12px] text-gray-500 font-medium">{desc}</p>
    </div>
  );
}
