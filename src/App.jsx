import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Componentes Externos
import { Navbar } from './Components/Navbar';
import { GlobeView } from './Components/GlobeView';
import { ExperienciasSection } from './Components/ExperienciasSection';
import { MemoriasSection } from './Components/MemoriasSection';
import { StarField } from './Components/StarField';
import { SectionDots } from './Components/SectionDots';
import { HotelDetailModal } from './Components/HotelDetailModal';

// ─── IMPORTACIÓN DE DATOS REPRODUCIDA ───
// Asegúrate de que el archivo se llame mockData.js en la carpeta data
import { hotels } from './data/mockData'; 

// ─── COMPONENTES DE APOYO ───

function HeroSection() {
  const globeRef = useRef(null);
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <GlobeView ref={globeRef} />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-[Outfit] font-black text-white text-center drop-shadow-2xl"
        >
          Explora lo <br/><span className="text-[#FF6B2B]">Extraordinario</span>
        </motion.h1>
        <div className="mt-8 pointer-events-auto bg-white p-2 rounded-2xl shadow-2xl flex w-full max-w-md border border-gray-200">
          <input type="text" placeholder="¿A dónde quieres ir?" className="flex-1 px-4 outline-none font-[Manrope]" />
          <button className="bg-[#FF6B2B] text-white px-6 py-3 rounded-xl font-bold font-[Manrope] hover:bg-[#E55A1F] transition-colors">
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}

function NuestrosHoteles({ onVerHotel }) {
  // Verificación de seguridad para evitar que la página se rompa si no cargan los datos
  if (!hotels) return null;

  return (
    <section id="hoteles" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-[Outfit] font-black mb-4 text-gray-900">Nuestros Hoteles</h2>
        <p className="font-[Manrope] text-gray-600 mb-12">Seleccionados cuidadosamente para tu comodidad.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {hotels.map((hotel) => (
            <motion.div 
              key={hotel.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 group cursor-pointer"
              onClick={() => onVerHotel(hotel.id)}
            >
              <div className="relative h-72">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                  ⭐ {hotel.rating}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-[Outfit] font-bold mb-2">{hotel.name}</h3>
                <p className="text-gray-500 font-[Manrope] text-sm mb-6">📍 {hotel.location}</p>
                <button 
                  className="w-full py-4 rounded-2xl text-white font-bold font-[Manrope] bg-[#FF6B2B] transition-all hover:bg-[#E55A1F]"
                >
                  Ver Detalles
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── APP PRINCIPAL ───
export default function App() {
  // 1. Asegúrate de tener estos dos estados
  const [hotelDetalle, setHotelDetalle] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Esta función conecta la lista con el modal
  const handleVerHotel = (id) => {
    const seleccionado = hotels.find(h => h.id === id);
    setHotelDetalle(seleccionado);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-white text-gray-900">
      <StarField />
      <Navbar />
      <SectionDots />

      {/* 3. EL MODAL PROFESIONAL VA AQUÍ */}
      <AnimatePresence>
        {isModalOpen && (
          <HotelDetailModal 
            open={isModalOpen} 
            hotel={hotelDetalle} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>

      <main>
        <section id="explorar">
          <HeroSection />
        </section>

        <section id="hoteles">
          {/* 4. IMPORTANTE: Pasa la función correcta aquí */}
          <NuestrosHoteles onVerHotel={handleVerHotel} />
        </section>

        <section id="experiencias">
          <ExperienciasSection />
        </section>

        <section id="memorias">
          <MemoriasSection onAbrirMemoria={setHotelDetalle} />
        </section>
      </main>
    </div>
  );
}