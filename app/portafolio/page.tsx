'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NuevoPortafolio() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans p-4 md:p-8">
      
      {/* --- GRID PRINCIPAL --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[200px]">
        
        {/* 1. Header & Intro (Grande) */}
        <motion.div 
          whileHover={{ scale: 0.99 }}
          className="md:col-span-8 md:row-span-2 bg-[#1a1a1a] rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden border border-white/5"
        >
          <div className="relative z-10">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              VISUAL<br/>CULTURE.
            </h1>
            <p className="mt-4 text-gray-400 max-w-md uppercase tracking-widest text-xs">
              Directora de Arte & Creadora Visual / Basada en la estética del contraste y la luz.
            </p>
          </div>
          {/* Círculo de luz de fondo */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/20 blur-[100px] rounded-full" />
        </motion.div>

        {/* 2. Foto Principal (Vertical Alta) - USA Fprincipal.jpg */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="md:col-span-4 md:row-span-4 relative rounded-3xl overflow-hidden group shadow-2xl"
        >
          <Image 
            src="/images/Fprincipal.jpg" 
            alt="Main Identity" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-6 left-6">
            <span className="bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
              Principal Identity
            </span>
          </div>
        </motion.div>

        {/* 3. Social / Selfie - USA la selfie con lentes */}
        <motion.div 
          className="md:col-span-4 md:row-span-2 bg-[#1a1a1a] rounded-3xl relative overflow-hidden group border border-white/5"
        >
          <Image 
            src="/images/social-1.jpg" 
            alt="Social Identity" 
            fill 
            className="object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <h3 className="font-black text-xl">SOCIAL</h3>
            <div className="flex gap-4 text-2xl">
               <span className="hover:text-red-500 cursor-pointer transition-colors">IG</span>
               <span className="hover:text-red-500 cursor-pointer transition-colors">BE</span>
            </div>
          </div>
        </motion.div>

        {/* 4. Skills (Caja de Texto Limpia) */}
        <div className="md:col-span-4 md:row-span-2 bg-[#4ade80] text-black rounded-3xl p-8 flex flex-col justify-between">
          <h3 className="font-black text-2xl uppercase italic">Expertise</h3>
          <ul className="text-sm font-bold leading-tight uppercase">
            <li>Art Direction</li>
            <li>Branding</li>
            <li>AI Visuals</li>
            <li>Photography</li>
          </ul>
        </div>

        {/* 5. Foto de Contexto - USA la de la pared de platos */}
        <motion.div 
          className="md:col-span-4 md:row-span-2 relative rounded-3xl overflow-hidden"
        >
          <Image 
            src="/images/dna-1.jpg" 
            alt="Context" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* 6. Creative Journey (Largo) */}
        <div className="md:col-span-8 md:row-span-2 bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 flex flex-col justify-center">
          <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-6 underline decoration-red-600 underline-offset-8">
            Experience Timeline
          </h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <p className="font-black text-xl uppercase">Senior Art</p>
              <p className="text-gray-500 text-xs">2024 - PRESENT</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/10" />
            <div>
              <p className="font-black text-xl uppercase">Visual Creator</p>
              <p className="text-gray-500 text-xs">2022 - 2024</p>
            </div>
          </div>
        </div>

      </div>

      {/* --- FOOTER FLOTANTE --- */}
      <footer className="mt-8 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest px-4">
        <p>© 2026 VISUAL ARCHIVE</p>
        <div className="flex gap-6">
          <p>hello@tuweb.com</p>
          <p>Location: Cairo / Remote</p>
        </div>
      </footer>

    </main>
  );
}