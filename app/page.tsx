'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';

// Constantes movidas fuera para evitar re-creaciones en cada renderizado
const SLIDER_IMAGES = [
  "/images/DISEÑO 1.jpg",
  "/images/DISEÑO 2.jpg",
  "/images/DISEÑO 3.jpg",
  "/images/DISEÑO 4.jpg",
  "/images/DISEÑO 5.jpeg",
  "/images/DISEÑO 6.jpg",
];

// --- COMPONENTE DEL SLIDER NORMAL (CUADRO 6) ---
function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % SLIDER_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full group">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1.5, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image 
            src={SLIDER_IMAGES[index]} 
            alt={`Slide ${index}`} 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {SLIDER_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === i ? "w-6 bg-red-600" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>

      <div className="absolute top-4 left-4 z-20">
        <h3 className="text-xl xl:text-2xl font-black text-white italic bg-transparent ">
          MODA
        </h3>
      </div>
    </div>
  );
}

// --- SUB-FUNCIÓN: LA TARJETA 3D QUE GIRA Y HACE ZOOM ---
function Card3D({ imageSrc }: { imageSrc: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rawScale = useMotionValue(1); 
  const smoothScale = useSpring(rawScale, { stiffness: 150, damping: 25, mass: 0.5 });

  const rotateX = useTransform(y, [-300, 300], [60, -60]);
  const rotateY = useTransform(x, [-400, 400], [-180, 180]);

  const handleWheel = (e: React.WheelEvent) => {
    const zoomSensitivity = 0.001; 
    const newScale = rawScale.get() - e.deltaY * zoomSensitivity;
    rawScale.set(Math.min(Math.max(newScale, 0.5), 4)); 
  };

  return (
    <div 
      className="relative flex items-center justify-center [perspective:1200px] w-full h-full"
      onWheel={handleWheel}
    >
      <motion.div
        style={{ x, y, rotateX, rotateY, scale: smoothScale, z: 100 }}
        drag
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragElastic={0.15}
        whileTap={{ cursor: "grabbing" }}
        className="relative cursor-grab [transform-style:preserve-3d]"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] border border-white/20 [backface-visibility:hidden] bg-transparent">
          <img 
            src={imageSrc} 
            alt="Detalle" 
            loading="lazy"
            decoding="async"
            className="w-auto h-auto max-w-[80vw] max-h-[75vh] block pointer-events-none" 
            draggable={false}
          />
        </div>
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] border border-white/20 bg-[#0a0a0a] flex items-center justify-center [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <img 
            src={imageSrc} 
            alt="Back" 
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl grayscale pointer-events-none" 
            draggable={false}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
            <span className="text-white font-black tracking-[0.3em] uppercase opacity-70 text-center">Jormali<br/>Cevallos</span>
            <span className="text-red-500 text-[10px] tracking-widest uppercase">Visual Archive</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- INTERFAZ DE PROPIEDADES ---
interface GalleryModalProps {
  title?: string;
  subtitle?: string;
  description?: string;
  reverseLayout?: boolean;
  images?: string[];
  documents?: string[];
}

// --- COMPONENTE: SLIDER CON VENTANA EMERGENTE (REUTILIZABLE) ---
function GalleryModalComponent({
  title = "RoseLab",
  subtitle = "Design Variations",
  description = "Dirección de arte y creación de identidad visual para la campaña. Este proyecto explora la paleta de colores vibrantes y el diseño de interfaces enfocadas en la experiencia del usuario.",
  reverseLayout = false, 
  images = [
    "/images/ROSELAN1.jpeg",
    "/images/ROSELAN2.jpeg",
    "/images/ROSELAN3.jpeg",
  ],
  documents = [
    "/images/ROSELAN/1.1.jpeg",
    "/images/ROSELAN/1.2.jpeg",
    "/images/ROSELAN/1.3.jpeg",
  ]
}: GalleryModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedIndex(null), 300);
  };

  return (
    <>
      <div 
        className="relative w-full h-full group cursor-pointer bg-[#0a0a0a]"
        onClick={() => setIsModalOpen(true)}
      >
        <Image 
          src={images[0]} 
          alt="Portada Galería" 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-300" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <span className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
            Ver Opciones
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20">
          <h3 className="font-black text-xl xl:text-2xl uppercase italic text-white drop-shadow-md shadow-black">{title}</h3>
          <p className="text-red-500 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">{subtitle}</p>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto"
            onClick={handleClose} 
          >
            <div className="min-h-full w-full grid place-items-center p-4 md:p-12 py-16 md:py-24">
              
              <button 
                onClick={(e) => { e.stopPropagation(); handleClose(); }}
                className="fixed top-4 right-4 md:top-10 md:right-10 text-white/50 hover:text-red-500 transition-colors z-[110] p-2 bg-black/50 rounded-full md:bg-transparent"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {selectedIndex === null ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-full max-w-7xl"
                  onClick={(e) => e.stopPropagation()} 
                >
                  <div className={`flex flex-col gap-8 md:gap-12 lg:gap-16 items-start ${reverseLayout ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                    
                    <div className="w-full lg:w-1/3 flex flex-col pt-4 lg:pt-0 lg:sticky lg:top-24">
                      <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter leading-none mb-2">
                        {title}
                      </h2>
                      <h3 className="text-red-600 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-6 border-b border-white/10 pb-4 w-fit">
                        {subtitle}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed text-justify">
                        {description}
                      </p>
                    </div>

                    <div className="w-full lg:w-2/3">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                        {images.map((img, i) => (
                          <div 
                            key={i} 
                            onClick={() => setSelectedIndex(i)}
                            className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/5 bg-[#1a1a1a] flex items-center justify-center"
                          >
                            <Image 
                              src={img} 
                              alt={`Opción ${i + 1}`} 
                              fill 
                              className="object-contain transition-transform duration-700 group-hover:scale-110 p-2 md:p-4 opacity-90 group-hover:opacity-100" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
                            
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                              <span className="bg-red-600 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                Ver en 3D
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 30 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="w-full h-[80vh] flex flex-col items-center justify-center relative"
                  onClick={(e) => e.stopPropagation()} 
                >
                  <button 
                    onClick={() => setSelectedIndex(null)}
                    className="fixed top-4 left-4 md:top-10 md:left-10 flex items-center gap-2 text-white/50 hover:text-white transition-colors z-[110] bg-black/50 px-4 py-2 rounded-full backdrop-blur-md"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Volver a galería</span>
                  </button>

                  <div className="fixed bottom-6 text-white/50 text-[10px] uppercase tracking-widest animate-pulse pointer-events-none z-50 text-center w-full">
                    Arrastra la imagen para girar en 360° • Usa la rueda para hacer zoom
                  </div>

                  <Card3D imageSrc={documents[selectedIndex]} />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- SUB-COMPONENTE: ESTRUCTURA DE PÁGINA PARA EL FLIPBOOK ---
const Page = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div className="bg-transparent w-full h-full relative" ref={ref}>
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden m-0 p-0 block">
        {props.children}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/50 via-black/5 to-transparent pointer-events-none mix-blend-multiply z-10" />
      <div className="absolute inset-y-0 left-4 w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/10 to-transparent pointer-events-none mix-blend-multiply z-10" />
    </div>
  );
});
Page.displayName = 'Page';

const MAGAZINE_PAGES = [
  "/images/1.jpeg", "/images/2.jpeg", "/images/3.jpeg", "/images/4.jpeg",
  "/images/5.jpeg", "/images/6.jpeg", "/images/7.jpeg", "/images/8.jpeg",
  "/images/9.jpeg", "/images/10.jpeg", "/images/11.jpeg", "/images/12.jpeg",
  "/images/13.jpeg", "/images/14.jpeg", "/images/15.jpeg", "/images/16.jpeg", 
];

// --- COMPONENTE: REVISTA HTMLFlipBook ---
function MagazineFlipBookComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); 
  const bookRef = useRef<any>(null); 

  const rawScale = useMotionValue(1); 
  const smoothScale = useSpring(rawScale, { stiffness: 200, damping: 30, mass: 0.5 });
  const bookPointerEvents = useTransform(rawScale, (s) => s > 1.05 ? "none" : "auto");

  const handleWheel = (e: React.WheelEvent) => {
    const zoomSensitivity = 0.002; 
    const newScale = rawScale.get() - e.deltaY * zoomSensitivity;
    rawScale.set(Math.min(Math.max(newScale, 1), 3)); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    rawScale.set(1); 
    if (bookRef.current) {
      bookRef.current.pageFlip().flip(0);
    }
  };

  const handlePageChange = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  const goNextPage = () => { if (bookRef.current) bookRef.current.pageFlip().flipNext(); };
  const goPrevPage = () => { if (bookRef.current) bookRef.current.pageFlip().flipPrev(); };

  return (
    <>
      <div className="relative w-full h-full group cursor-pointer bg-[#0a0a0a]" onClick={() => setIsModalOpen(true)}>
        <Image src="/images/0.jpg" alt="Portada Revista" fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-6 left-6 z-20">
          <h3 className="font-black text-xl xl:text-2xl uppercase italic text-white drop-shadow-md shadow-black">Editorial</h3>
          <p className="text-red-500 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">Click para leer</p>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto"
            onClick={handleCloseModal} 
          >
            <div className="min-h-full w-full grid place-items-center p-4 md:p-12 py-16 md:py-24">
              <button onClick={(e) => { e.stopPropagation(); goPrevPage(); }} className="fixed left-4 md:left-12 top-1/2 -translate-y-1/2 z-[110] p-4 bg-black/50 hover:bg-red-600 transition-colors rounded-full text-white backdrop-blur-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>

              <button onClick={(e) => { e.stopPropagation(); goNextPage(); }} className="fixed right-4 md:right-12 top-1/2 -translate-y-1/2 z-[110] p-4 bg-black/50 hover:bg-red-600 transition-colors rounded-full text-white backdrop-blur-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>

              <button onClick={handleCloseModal} className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-red-500 transition-colors z-[110] p-2 bg-black/50 rounded-full md:bg-transparent">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <motion.div className="fixed bottom-6 text-white/50 text-[10px] uppercase tracking-widest animate-pulse pointer-events-none z-50 text-center w-full">
                Usa la rueda para zoom • Usa las flechas cuando acerques la imagen
              </motion.div>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
                style={{ scale: smoothScale, pointerEvents: bookPointerEvents }} 
                onWheel={handleWheel}
                onClick={(e) => e.stopPropagation()}
                className="relative flex items-center justify-center w-[80vw] max-w-[800px] aspect-[3/4] md:aspect-[2/1.33]"
              >
                
                {/* TEXTO MOVIDO A LA IZQUIERDA (left-[5%] md:left-[10%]) */}
                <AnimatePresence>
                  {currentPage === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.4 } }}
                      transition={{ delay: 0.1, duration: 0.6 }}
                      className="absolute left-[0%] md:left-[2%] top-0 w-1/2 h-full flex flex-col justify-center pr-4 md:pr-8 z-0"
                    >
                      <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter leading-none mb-4">
                        The<br/>Editorial
                      </h2>
                      <div className="w-8 h-1 bg-red-600 mb-4" />
                      <p className="text-gray-400 text-[10px] md:text-xs lg:text-sm leading-relaxed">
                        Explora la recopilación de nuestros mejores trabajos de dirección de arte, diseño de identidad y composición visual. 
                        <br/><br/>
                        Pasa la portada hacia la izquierda para sumergirte en el archivo completo de nuestra colección.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* @ts-ignore */}
                <HTMLFlipBook 
                  ref={bookRef}
                  width={400} height={550} size="stretch"
                  minWidth={200} maxWidth={500} minHeight={200} maxHeight={700}
                  showCover={true} mobileScrollSupport={true}
                  onFlip={handlePageChange} 
                  className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10" 
                  style={{ margin: "0 auto", backgroundColor: 'transparent' }}
                >
                  {MAGAZINE_PAGES.map((src, idx) => (
                    <Page key={idx}>
                      <Image src={src} alt={`Página ${idx + 1}`} fill quality={100} className="object-cover pointer-events-none select-none" draggable={false} />
                    </Page>
                  ))}
                </HTMLFlipBook>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- TU CÓDIGO PRINCIPAL ---
export default function NuevoPortafolio() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans p-4 md:p-8 flex flex-col gap-6">
      
      {/* SECCIÓN SUPERIOR: 3 CUADROS GRANDES */}
      <div className="max-w-[1800px] w-[98%] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px] md:auto-rows-[150px]">
        
        {/* 1. Header & Intro */}
        <motion.div 
          whileHover={{ scale: 0.99 }}
          className="md:col-span-7 md:row-span-2 bg-[#1a1a1a] rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden border border-white/5"
        >
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
              JORMALI<br/>CEVALLOS.
            </h1>
            <p className="mt-4 text-gray-400 max-w-md uppercase tracking-widest text-[10px] sm:text-xs">
              Diseñadora grafica y Diseñadora de Interiores.
            </p>
          </div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/20 blur-[100px] rounded-full" />
        </motion.div>

        {/* 2. Foto Principal */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="md:col-span-5 md:row-span-4 relative rounded-3xl overflow-hidden group shadow-2xl"
        >
          <Image 
            src="/images/Fprincipal.jpeg" 
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

        {/* 3. Creative Journey */}
        <div className="md:col-span-7 md:row-span-2 bg-[#1a1a1a] rounded-3xl border border-white/5 relative overflow-hidden flex flex-col p-6 md:p-8">
          <h3 className="text-gray-500 font-bold text-[8px] uppercase tracking-[0.3em] mb-2 md:mb-2 border-b border-red-600/30 pb-2 w-fit z-10">
            Experiencia
          </h3>

          <div className="flex flex-1 relative gap-8 z-10">
            <div className="flex-1 pr-4 space-y-2 md:space-y-3 overflow-y-auto custom-scrollbar">
              <div>
                <p className="font-black text-xl md:text-1xl uppercase text-white leading-none">Diseñadora Grafica</p>
                <p className="text-red-600 text-[9px] md:text-[10px] font-bold mt-1 uppercase tracking-wider">2025 - Actual</p>
                <p className="text-gray-400 text-[10px] md:text-xs mt-2 leading-relaxed">
                <p> - Creación de identidad visual corporativa, branding y material publicitario.</p>
                  <p> - Desarrollo de señalética y adaptación gráfica al entorno arquitectónico.</p>
                  <p> - Elaboración de moodboards y presentaciones visuales para clientes.</p>
                </p>
              </div>
              <div>
                <p className="font-black text-xl md:text-1xl uppercase text-white leading-none">Diseñadora de Interiores</p>
                <p className="text-gray-500 text-[9px] md:text-[10px] font-bold mt-1 uppercase tracking-wider">2024 - 2025</p>
                <p className="text-gray-400 text-[10px] md:text-xs mt-2 leading-relaxed">
                <p> - Planificación de espacios, selección de acabados, iluminación y mobiliario.</p>
                  <p> - Diseño de logotipos, empaques y catálogos.</p>
                </p>
              </div>
            </div>

            <div className="w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            <div className="flex-none w-10 md:w-10 flex flex-col items-center justify-around pb-1">
              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="relative w-full aspect-square cursor-pointer scale-[1.5]">
                <Image src="/icons/photoshop.png" alt="photoshop" fill className="object-contain" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="relative w-full aspect-square cursor-pointer scale-[1.5]">
                <Image src="/icons/canva.png" alt="canva" fill className="object-contain" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="relative w-full aspect-square cursor-pointer scale-[1.5]">
                <Image src="/icons/illustrator.png" alt="illustrator" fill className="object-contain" />
              </motion.div>
            </div>
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 blur-[50px] rounded-full pointer-events-none" />
        </div>

      </div>

      {/* SECCIÓN INFERIOR: 5 CUADROS PEQUEÑOS ALINEADOS */}
      <div className="max-w-[1800px] w-[98%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 h-auto lg:h-[280px] xl:h-[300px]">
        
        {/* 4.1 CUADRO ORIGINAL (RoseLab) - MODO NORMAL */}
        <motion.div className="bg-[#1a1a1a] relative rounded-3xl overflow-hidden border border-white/5 h-[300px] lg:h-full">
          <GalleryModalComponent 
            title="ROSELAB"
            subtitle="Identity Design"
            description="Creación de identidad visual y campaña 360 para RoseLab Cosmetics. Enfoque en colores atrevidos y texturas de alta fidelidad. Los materiales promueven una estética elegante."
            reverseLayout={false}
          />
        </motion.div>

        {/* 4.2 NUEVO CUADRO (BANNER) - MODO INVERTIDO */}
        <motion.div className="bg-[#1a1a1a] relative rounded-3xl overflow-hidden border border-white/5 h-[300px] lg:h-full">
          <GalleryModalComponent 
            title="BANNER"
            subtitle="Design Variations"
            description="Variaciones de banners digitales optimizados para campañas publicitarias web. Pruebas de contraste tipográfico y posicionamiento para asegurar una alta tasa de conversión."
            reverseLayout={true} 
            images={["/images/BANNER/1.png", "/images/BANNER/2.png", "/images/BANNER/3.png", "/images/BANNER/4.png", "/images/BANNER/5.jpeg"]}
            documents={["/images/BANNER/1.png", "/images/BANNER/2.png", "/images/BANNER/3.png", "/images/BANNER/4.png", "/images/BANNER/5.jpeg"]}
          />
        </motion.div>

        {/* 4.3 NUEVO CUADRO (NAVIDAD) - MODO NORMAL */}
        <motion.div className="bg-[#1a1a1a] relative rounded-3xl overflow-hidden border border-white/5 h-[300px] lg:h-full">
          <GalleryModalComponent 
            title="NAVIDAD"
            subtitle="Visual Identity"
            description="Campaña gráfica de fin de año. Integración de elementos tradicionales con una línea editorial moderna y minimalista. Uso intensivo de paletas doradas y fondos oscuros."
            reverseLayout={false}
            images={["/images/NAVIDAD/1 (5).png", "/images/NAVIDAD/1 (1).png", "/images/NAVIDAD/1 (3).png", "/images/NAVIDAD/1 (4).png", "/images/NAVIDAD/1 (2).png", "/images/NAVIDAD/1 (6).png", "/images/NAVIDAD/1 (7).png", "/images/NAVIDAD/1 (8).png", "/images/NAVIDAD/1 (9).png"]}
            documents={["/images/NAVIDAD/1 (5).png", "/images/NAVIDAD/1 (1).png", "/images/NAVIDAD/1 (3).png", "/images/NAVIDAD/1 (4).png", "/images/NAVIDAD/1 (2).png", "/images/NAVIDAD/1 (6).png", "/images/NAVIDAD/1 (7).png", "/images/NAVIDAD/1 (8).png", "/images/NAVIDAD/1 (9).png"]}
          />
        </motion.div>

        {/* 5. REVISTA CON REACT-PAGEFLIP */}
        <motion.div className="bg-[#1a1a1a] relative rounded-3xl overflow-hidden border border-white/5 h-[300px] lg:h-full">
          <MagazineFlipBookComponent />
        </motion.div>

        {/* 6. GALERÍA CON SLIDER NORMAL */}
        <motion.div className="bg-[#1a1a1a] relative rounded-3xl overflow-hidden border border-white/5 h-[300px] lg:h-full">
          <ImageSlider />
        </motion.div>

      </div>

      {/* --- FOOTER --- */}
      <footer className="max-w-[1800px] w-[98%] mx-auto mt-4 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest px-4">
        <p>© 2026 VISUAL ARCHIVE</p>
        <div className="flex gap-6">
          <p>hello@tuweb.com</p>
          <p>Location: Cairo / Remote</p>
        </div>
      </footer>

    </main>
  );
}