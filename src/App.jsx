import { useState, useRef } from 'react';
import './App.css';
import Hoteleria from './Components/hoteleria.jsx';
import TourKoala from './Components/TourKoala';
import { Navbar } from './Components/Navbar';
import { GlobeView } from './Components/GlobeView';
import { HotelesSection } from './Components/HotelesSection';
import { ExperienciasSection } from './Components/ExperienciasSection';
import { MemoriasSection } from './Components/MemoriasSection';
import { StarField } from './Components/StarField';
import { SectionDots } from './Components/SectionDots';
import { motion } from 'framer-motion';

const hotelData = {
  nombre: "Casa de playa ELIM",
  ubicacion: "TUXPAN, Veracruz",
  distancia: "a 9 Km de distancia",
  narrativa: "Disfruta de una experiencia única frente al mar con acceso privado y todas las comodidades."
};

const quickDestinations = [
  { id: 1, name: 'Santorini', lat: 36.39, lng: 25.46 },
  { id: 2, name: 'Kioto', lat: 35.01, lng: 135.76 },
  { id: 3, name: 'Maldivas', lat: 3.20, lng: 73.22 },
  { id: 4, name: 'Marrakech', lat: 31.63, lng: -7.99 },
  { id: 5, name: 'Patagonia', lat: -51.62, lng: -69.21 },
  { id: 6, name: 'Bali', lat: -8.34, lng: 115.09 },
];

function HeroSection() {
  const globeRef = useRef(null);
  const [busqueda, setBusqueda] = useState('');

  const handleSearch = async (query) => {
    if (!query) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
      const data = await res.json();
      if (data[0]) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        globeRef.current?.flyTo({ lat, lng, altitude: 1.1, ms: 1900 });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const flyTo = (dest) => {
    globeRef.current?.flyTo({ lat: dest.lat, lng: dest.lng, altitude: 1.1, ms: 1500 });
  };

  return (
    <div className="relative h-[100svh] w-full overflow-hidden">
      <GlobeView ref={globeRef} points={quickDestinations.map(d => ({ ...d, lat: d.lat, lng: d.lng }))} />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.35) 70%, rgba(255,255,255,0.85) 100%)",
        }}
      />

      {/* Hero content */}
      <div className="pointer-events-none absolute inset-x-0 top-[18%] z-20 flex flex-col items-center gap-6 px-4 sm:top-[22%]">
        
      
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="text-center text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl"
  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
>
          Un mundo de viajes
          <br />
          <span className="bg-gradient-to-r from-[#FF6B2B] via-[#FF8F4D] to-[#FFB07A] bg-clip-text text-transparent">
            extraordinarios
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="max-w-xl text-center text-sm leading-relaxed text-gray-600 sm:text-base"
        >
          Toca cualquier punto del globo o escribe a dónde quieres ir. Te llevaremos en un instante.
        </motion.p>

        {/* Search bar */}
        <div className="pointer-events-auto w-full max-w-sm">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            borderRadius: '50px',
            padding: '8px 8px 8px 20px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            border: '1px solid #e5e7eb'
          }}>
            <input
              type="text"
              placeholder="Descubre tu próximo destino..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch(busqueda)}
              style={{
                border: 'none', outline: 'none', flex: 1,
                fontSize: '15px', color: '#333', background: 'transparent'
              }}
            />
            <button
             onClick={() => handleSearch(busqueda)}
             style={{
             background: '#FF6B2B', color: 'white', border: 'none',
             borderRadius: '40px', padding: '10px 24px',
              fontSize: '14px', fontWeight: '600', cursor: 'pointer'
  }}
>
  Buscar
</button>
          </div>
        </div>

        {/* Quick destinations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 px-2"
        >
          {quickDestinations.map((d) => (
            <button
              key={d.id}
              onClick={() => flyTo(d)}
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: '1px solid #e5e7eb',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '13px',
                color: '#555',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)'
              }}
            >
              {d.name}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Bottom tagline */}
      <div className="pointer-events-none absolute bottom-6 left-6 z-20 hidden items-center gap-2 lg:flex">
        <div className="h-px w-10 bg-[#FF6B2B]" />
        <span className="text-[11px] uppercase tracking-[0.28em] text-gray-500">
          {quickDestinations.length} destinos curados
        </span>
      </div>
    </div>
  );
}

function App() {
  const [pantalla, setPantalla] = useState('home');
  const [verTour, setVerTour] = useState(false);
  const [activeTab, setActiveTab] = useState('catálogo');

  if (verTour) {
    return <TourKoala onVolver={() => setVerTour(false)} />;
  }

  if (pantalla === 'hotel') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
        <div style={{ padding: '24px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', zIndex: 10 }}>
          <button onClick={() => setPantalla('home')} style={{
            background: 'none', border: 'none', color: '#C97B4B',
            fontSize: '13px', cursor: 'pointer', marginBottom: '12px', padding: 0
          }}>
            ← Volver al inicio
          </button>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111827' }}>{hotelData.nombre}</h1>
          <p style={{ margin: '4px 0', color: '#7C6FA0', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>{hotelData.ubicacion}</p>
          <p style={{ margin: 0, color: '#C97B4B', fontSize: '13px' }}>{hotelData.distancia}</p>
          <div style={{ backgroundColor: '#F7F5F2', padding: '14px', borderRadius: '12px', margin: '16px 0' }}>
            <p style={{ margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.6', fontStyle: 'italic' }}>
              {hotelData.narrativa}
            </p>
          </div>
          <button style={{
            width: '100%', padding: '14px', backgroundColor: '#C97B4B', color: '#fff',
            border: 'none', borderRadius: '12px', fontWeight: '600', fontSize: '15px', cursor: 'pointer'
          }}>
            Reservar
          </button>
        </div>

        <div style={{ display: 'flex', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
          {['catálogo', 'tour', 'memories'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '14px', textTransform: 'uppercase', fontWeight: '600',
              border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '12px',
              borderBottom: activeTab === tab ? `2px solid #C97B4B` : '2px solid transparent',
              color: activeTab === tab ? '#C97B4B' : '#9ca3af', transition: 'all 0.2s'
            }}>
              {tab}
            </button>
          ))}
        </div>

        <div style={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
          {activeTab === 'catálogo' && (
            <div style={{ padding: '24px', overflowY: 'auto', height: '100%' }}>
              <HotelesSection />
            </div>
          )}
          {activeTab === 'tour' && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <Hoteleria onAbrir360={() => setVerTour(true)} />
            </div>
          )}
          {activeTab === 'memories' && (
            <div style={{ padding: '24px' }}>
              <MemoriasSection />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100svh] w-full bg-white text-white">
      <StarField />
      <Navbar />
      <SectionDots />

      <main>
        <section id="explorar">
          <HeroSection />
        </section>
        <section id="hoteles">
          <HotelesSection onVerHotel={() => setPantalla('hotel')} />
        </section>
        <section id="experiencias">
          <ExperienciasSection />
        </section>
        <section id="memorias">
          <MemoriasSection />
        </section>
      </main>
    </div>
  );
}

export default App;