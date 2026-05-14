<<<<<<< HEAD
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
=======
import React, { useState, forwardRef, useEffect } from 'react';
import './App.css';
import Hoteleria from './Components/hoteleria.jsx';
import TourElim from './Components/TourElim.jsx'; 
>>>>>>> 3420b40cc5a91235b3c061d45df4eaf53ae7a566

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
registerLocale('es', es);

// ─── Base de datos de hoteles ────────────────────────────────────────────────
const hotelesInfo = {
  elim: {
    nombre: "Casa de playa ELIM",
    ubicacion: "Tuxpan, Veracruz",
    distancia: "9 km del centro",
    narrativa: "Disfruta de una experiencia única frente al mar con acceso privado a la playa y todas las comodidades de un hogar.",
    colorTema: "#FF6B35",
    rating: "4.9",
    reviews: "15 reseñas",
    habitaciones: [
      { 
        nombre: "Cabaña entrada", 
        precio: "$1,500", 
        capacidad: "2 a 3 personas", 
        descripcion: "Una cabaña acogedora y práctica, ubicada a unos pasos de la entrada principal. Perfecta para parejas que buscan descanso rápido tras un día de playa.", 
        amenidades: ["1 Cama Matrimonial", "Baño privado", "Ventilador", "Acceso rápido"],
        imagen: "/CABAÑAENTRADA.jpg" 
      },
      { 
        nombre: "Cabaña intermedia", 
        precio: "$1,800", 
        capacidad: "4 personas", 
        descripcion: "Espacio amplio y cómodo en la zona media de la propiedad. Ideal para familias pequeñas, con suficiente espacio para relajarse.", 
        amenidades: ["2 Camas Matrimoniales", "Baño privado", "Aire Acondicionado", "Pequeña sala"],
        imagen: "/CABAÑAMEDIO.jpg" 
      },
      { 
        nombre: "Cabaña grande", 
        precio: "$2,200", 
        capacidad: "6 personas", 
        descripcion: "Nuestra cabaña de mayor tamaño en un solo nivel. Ofrece gran comodidad y espacio de sobra para grupos familiares.", 
        amenidades: ["3 Camas", "Baño amplio", "Aire Acondicionado", "Frigobar"],
        imagen: "/CABAÑAGRANDE.jpg" 
      },
      { 
        nombre: "Cabaña de 2 pisos", 
        precio: "$2,500", 
        capacidad: "6 a 8 personas", 
        descripcion: "Una hermosa estructura de dos niveles que ofrece increíbles vistas desde la planta alta y una separación perfecta de ambientes.", 
        amenidades: ["Vistas panorámicas", "Múltiples camas", "2 Baños", "Terraza alta"],
        imagen: "/CABAÑADEDOSPISOS.jpg" 
      },
      { 
        nombre: "Cuarto con terraza", 
        precio: "$1,200", 
        capacidad: "2 personas", 
        descripcion: "Un rincón íntimo y especial. Despierta, sal a tu terraza privada y disfruta de la brisa del mar en tu propia hamaca.", 
        amenidades: ["Terraza privada", "Hamaca", "Cama Matrimonial", "Baño privado"],
        imagen: "/CUARTOTERRAZA.jpg" // <-- IMAGEN AÑADIDA
      },
      { 
        nombre: "Casa grande", 
        precio: "$3,500", 
        capacidad: "10+ personas", 
        descripcion: "Toda la comodidad de una casa completa frente a la playa. Ideal para vacaciones con toda la familia extendida o grupos de amigos.", 
        amenidades: ["Cocina completa", "Sala y comedor", "Múltiples baños", "Acceso directo a playa"],
        imagen: "/CASAGRANDE.jpg" // <-- IMAGEN AÑADIDA
      }
    ],
    memorias: [
      { 
        id: 1, 
        titulo: "UNDER SOULS MX", 
        portada: '/UnderSoulsMX1.JPG',
        contenido: [
          { tipo: "img", url: '/UnderSoulsMX1.JPG' },
          { tipo: "video", url: '/UnderSoulsMX2.mp4' },
          { tipo: "video", url: '/UnderSoulsMX3.mp4' }
        ]
      }
    ]
  },
  boketto: {
    nombre: "Hotel Boketto",
    ubicacion: "Playa San Antonio, Tuxpan",
    distancia: "12 km del centro",
    narrativa: "Un rincón de paz frente a la playa, diseñado para relajarte y desconectar del mundo.",
    colorTema: "#0f766e",
    rating: "Nuevo",
    reviews: "0 reseñas",
    habitaciones: [
      { 
        nombre: "Habitación privada", 
        precio: "$2,500", 
        capacidad: "2 personas", 
        descripcion: "Una suite de lujo con un diseño minimalista y moderno, pensada para la desconexión total.", 
        amenidades: ["Cama King Size", "Baño de lujo", "Vista al mar", "Minibar"],
        imagen: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=600&auto=format&fit=crop" // <-- IMAGEN AÑADIDA
      }
    ],
    memorias: []
  }
};

<<<<<<< HEAD
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
=======
const TABS = [
  { id: 'CATÁLOGO', icon: '🛏️' },
  { id: 'TOUR',     icon: '🌐' },
  { id: 'MEMORIES', icon: '📸' },
];
>>>>>>> 3420b40cc5a91235b3c061d45df4eaf53ae7a566

// ─── Componente del Visor Estilo Instagram Stories ───────────────────────────
function VisorMemoria({ memoria, onCerrar }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const DURATION = 30000; 

  useEffect(() => {
    const timer = setTimeout(() => {
      siguienteSlide();
    }, DURATION);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const siguienteSlide = () => {
    if (currentIndex < memoria.contenido.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onCerrar(); 
    }
  };

  const anteriorSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(0); 
    }
  };

  const currentItem = memoria.contenido[currentIndex];

<<<<<<< HEAD
  if (pantalla === 'hotel') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
        <div style={{ padding: '24px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', zIndex: 10 }}>
          <button onClick={() => setPantalla('home')} style={{
            background: 'none', border: 'none', color: '#C97B4B',
            fontSize: '13px', cursor: 'pointer', marginBottom: '12px', padding: 0
          }}>
            ← Volver al inicio
=======
  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: '#111', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center',
      fontFamily: 'var(--font)'
    }}>
      
      <style>{`
        @keyframes fillStory {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* --- FLECHAS POR FUERA DEL REPRODUCTOR --- */}
      <div style={{
        position: 'absolute', width: '100%', maxWidth: '640px',
        display: 'flex', justifyContent: 'space-between', padding: '0 16px',
        pointerEvents: 'none', zIndex: 50 
      }}>
        {currentIndex > 0 ? (
          <button 
            onClick={(e) => { e.stopPropagation(); anteriorSlide(); }}
            style={{
              pointerEvents: 'auto', width: '40px', height: '40px', borderRadius: '50%', border: 'none',
              backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'background 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
          >
            ❮
          </button>
        ) : <div style={{ width: '40px' }} />}

        <button 
          onClick={(e) => { e.stopPropagation(); siguienteSlide(); }}
          style={{
            pointerEvents: 'auto', width: '40px', height: '40px', borderRadius: '50%', border: 'none',
            backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'background 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
        >
          ❯
        </button>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '480px', height: '100%', backgroundColor: '#000', overflow: 'hidden' }}>
        
        {currentItem.tipo === 'img' ? (
          <img src={currentItem.url} alt="Story" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <video src={currentItem.url} autoPlay playsInline controls style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}

        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, padding: '16px 12px', 
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)', zIndex: 20,
          pointerEvents: 'none' 
        }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
            {memoria.contenido.map((_, i) => (
              <div key={i} style={{ 
                flex: 1, height: '3px', backgroundColor: 'rgba(255,255,255,0.3)', 
                borderRadius: '4px', overflow: 'hidden' 
              }}>
                <div style={{
                  height: '100%', backgroundColor: '#fff',
                  width: i < currentIndex ? '100%' : '0%',
                  animation: i === currentIndex ? `fillStory ${DURATION}ms linear forwards` : 'none'
                }}></div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FF6B35', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                border: '2px solid white'
              }}>
                📸
              </div>
              <div>
                <p style={{ color: 'white', fontWeight: '800', fontSize: '13px', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                  {memoria.titulo}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', margin: 0, fontWeight: '500', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                  Casa ELIM
                </p>
              </div>
            </div>
            <button onClick={onCerrar} style={{ 
              background: 'none', border: 'none', color: 'white', fontSize: '28px', 
              cursor: 'pointer', padding: '0', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' 
            }}>
              ✕
            </button>
          </div>
        </div>

        {/* Zonas de Tap invisibles para celulares ajustadas para no tapar los controles del video */}
        <div onClick={anteriorSlide} style={{ position: 'absolute', top: '80px', bottom: '80px', left: 0, width: '35%', zIndex: 10 }}></div>
        <div onClick={siguienteSlide} style={{ position: 'absolute', top: '80px', bottom: '80px', right: 0, width: '65%', zIndex: 10 }}></div>
      </div>
    </div>
  );
}

// ─── Pantalla Específica de una Habitación ───────────────────────────────────
function PantallaHabitacion({ habitacion, colorTema, onVolver, onVerTour }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  let noches = 0;
  if (startDate && endDate) {
    const diferenciaMs = endDate.getTime() - startDate.getTime();
    noches = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
  }

  const precioNumerico = parseInt(habitacion.precio.replace(/[^0-9]/g, ''), 10);
  const total = noches > 0 ? precioNumerico * noches : precioNumerico;
  const totalFormateado = `$${total.toLocaleString('es-MX')}`;

  const procesarReserva = () => {
    if (!startDate || !endDate) {
      alert("⚠️ Por favor selecciona tu fecha de llegada y salida en el calendario.");
      return;
    }
    const checkInStr = format(startDate, 'dd/MM/yyyy');
    const checkOutStr = format(endDate, 'dd/MM/yyyy');
    alert(`✅ ¡Simulación Exitosa!\n\n🏨 ${habitacion.nombre}\n📅 Llegada: ${checkInStr}\n📅 Salida: ${checkOutStr}\n🌙 Noches: ${noches}\n💰 Total a pagar: ${totalFormateado}`);
  };

  const AirbnbInput = forwardRef(({ onClick }, ref) => (
    <div 
      onClick={onClick} 
      ref={ref}
      style={{
        display: 'flex', border: '1px solid #B0B0B0', borderRadius: '8px', 
        overflow: 'hidden', cursor: 'pointer', backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', width: '100%'
      }}
    >
      <div style={{ flex: 1, padding: '10px 14px', borderRight: '1px solid #B0B0B0' }}>
        <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--black)', marginBottom: '2px', textTransform: 'uppercase' }}>
          Llegada
        </div>
        <div style={{ fontSize: '14px', color: startDate ? 'var(--black)' : '#717171', fontWeight: startDate ? '600' : '400' }}>
          {startDate ? format(startDate, 'dd/MM/yyyy') : 'Agregar fecha'}
        </div>
      </div>
      <div style={{ flex: 1, padding: '10px 14px' }}>
        <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--black)', marginBottom: '2px', textTransform: 'uppercase' }}>
          Salida
        </div>
        <div style={{ fontSize: '14px', color: endDate ? 'var(--black)' : '#717171', fontWeight: endDate ? '600' : '400' }}>
          {endDate ? format(endDate, 'dd/MM/yyyy') : 'Agregar fecha'}
        </div>
      </div>
    </div>
  ));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--white)', fontFamily: 'var(--font)' }}>
      
      <style>{`
        .react-datepicker-wrapper { width: 100%; display: block; }
        .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range {
            background-color: ${colorTema} !important;
            color: white !important;
            border-radius: 50%;
        }
        .react-datepicker__day--keyboard-selected { background-color: transparent; }
      `}</style>

      {/* --- CABECERA DE LA HABITACIÓN CON IMAGEN DE FONDO --- */}
      <div style={{ 
        height: '32vh', minHeight: '220px', position: 'relative',
        /* Si la habitación tiene imagen, la usamos de fondo. Si no, usamos el gradiente por defecto */
        backgroundImage: habitacion.imagen ? `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${habitacion.imagen})` : `linear-gradient(135deg, ${colorTema} 0%, #1A1A1A 100%)`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center' 
      }}>
        <button onClick={onVolver} style={{
            position: 'absolute', top: '20px', left: '20px',
            background: 'rgba(255,255,255,0.25)', border: 'none',
            borderRadius: 'var(--radius-full)', padding: '8px 16px',
            color: 'white', fontWeight: '700', fontSize: '14px',
            cursor: 'pointer', backdropFilter: 'blur(8px)', display: 'flex', gap: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          ← Regresar al hotel
        </button>

        <button onClick={onVerTour} style={{
            position: 'absolute', bottom: '16px', right: '16px',
            background: 'white', border: 'none',
            borderRadius: 'var(--radius-full)', padding: '8px 16px',
            color: 'var(--black)', fontWeight: '800', fontSize: '13px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)', transition: 'transform 0.1s'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ fontSize: '16px' }}>🌐</span> Habitación 360
        </button>

        {/* Solo mostramos el emoji si NO hay imagen configurada */}
        {!habitacion.imagen && (
          <div style={{ fontSize: '80px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>🛏️</div>
        )}
      </div>

      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--black)', margin: '0 0 8px 0', lineHeight: 1.2 }}>
          {habitacion.nombre}
        </h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--gray-100)', padding: '6px 12px', borderRadius: 'var(--radius-full)', marginBottom: '24px' }}>
           <span style={{ fontSize: '14px' }}>👥</span>
           <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>{habitacion.capacidad}</span>
        </div>

        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--black)', marginBottom: '12px' }}>Sobre este espacio</h3>
        <p style={{ color: 'var(--gray-500)', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px' }}>
            {habitacion.descripcion}
        </p>

        <div style={{ 
          background: 'white', border: '1px solid #E5E7EB', padding: '20px', 
          borderRadius: '16px', marginBottom: '28px', boxShadow: '0 6px 20px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '16px' }}>
             <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--black)' }}>{habitacion.precio} MXN</span>
             <span style={{ fontSize: '14px', color: 'var(--gray-500)', fontWeight: '500', marginBottom: '2px' }}>/ noche</span>
          </div>

          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            minDate={new Date()} 
            locale="es" 
            withPortal 
            customInput={<AirbnbInput />}
          />
          
          {(startDate || endDate) && (
            <div style={{ textAlign: 'right', marginTop: '10px' }}>
              <button 
                onClick={() => setDateRange([null, null])}
                style={{ background: 'none', border: 'none', color: 'var(--black)', textDecoration: 'underline', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                Borrar fechas
              </button>
            </div>
          )}
        </div>

        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--black)', marginBottom: '16px' }}>¿Qué incluye?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '30px' }}>
            {habitacion.amenidades.map((amenidad, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'var(--gray-700)', fontWeight: '600' }}>
                    <span style={{ color: colorTema, fontWeight: '900' }}>✓</span> {amenidad}
                </div>
            ))}
        </div>
      </div>

      <div style={{ 
          padding: '16px 24px', backgroundColor: 'var(--white)', 
          borderTop: '1px solid var(--gray-100)', 
          boxShadow: '0 -4px 24px rgba(0,0,0,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
          <div>
              {noches > 0 ? (
                <>
                  <p style={{ margin: 0, color: 'var(--gray-500)', fontSize: '12px', fontWeight: '600', marginBottom: '2px' }}>
                    Total por {noches} {noches === 1 ? 'noche' : 'noches'}
                  </p>
                  <p style={{ margin: 0, fontSize: '22px', fontWeight: '900', color: colorTema }}>
                    {totalFormateado}
                  </p>
                </>
              ) : (
                <p style={{ margin: 0, color: 'var(--black)', fontSize: '14px', fontWeight: '800' }}>
                  Ingresa fechas
                  <br/><span style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: '500' }}>Para ver el precio total</span>
                </p>
              )}
          </div>
          <button 
             onClick={procesarReserva}
             style={{
              background: (startDate && endDate) ? colorTema : 'var(--black)', color: 'white', border: 'none',
              borderRadius: 'var(--radius-md)', padding: '14px 24px',
              fontWeight: '800', fontSize: '15px', cursor: 'pointer',
              boxShadow: (startDate && endDate) ? `0 4px 14px ${colorTema}66` : 'none', 
              transition: 'all 0.2s'
          }}>
              { (startDate && endDate) ? 'Reservar' : 'Verificar' }
          </button>
      </div>
    </div>
  );
}


// ─── Pantalla de detalles del Hotel ──────────────────────────────────────────
function PantallaDetalles({ hotel, onVolver, onVerTour }) {
  const [activeTab, setActiveTab] = useState('CATÁLOGO');
  const [habitacionActiva, setHabitacionActiva] = useState(null);
  const [memoriaActiva, setMemoriaActiva] = useState(null);
  
  const datos = hotelesInfo[hotel];

  if (habitacionActiva) {
    return (
      <PantallaHabitacion 
        habitacion={habitacionActiva} 
        colorTema={datos.colorTema} 
        onVolver={() => setHabitacionActiva(null)} 
        onVerTour={onVerTour} 
      />
    );
  }

  if (memoriaActiva) {
    return (
      <VisorMemoria 
        memoria={memoriaActiva} 
        onCerrar={() => setMemoriaActiva(null)} 
      />
    );
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100vh',
      backgroundColor: 'var(--white)', fontFamily: 'var(--font)',
      overflowY: 'auto',
    }}>

      <style>{`
        .historias-container::-webkit-scrollbar { display: none; }
        .historias-container { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div style={{
        background: `linear-gradient(135deg, ${datos.colorTema} 0%, #FF8C5A 100%)`,
        padding: '16px 24px 28px',
        position: 'relative',
      }}>
        <button
          onClick={onVolver}
          style={{
            background: 'rgba(255,255,255,0.25)', border: 'none',
            borderRadius: 'var(--radius-full)', padding: '8px 16px',
            color: 'white', fontWeight: '700', fontSize: '14px',
            cursor: 'pointer', fontFamily: 'var(--font)',
            display: 'flex', alignItems: 'center', gap: '6px',
            backdropFilter: 'blur(8px)', marginBottom: '20px',
          }}
        >
          ← Volver al mapa
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{
              color: 'white', fontSize: '22px', fontWeight: '900',
              marginBottom: '4px', lineHeight: '1.2',
            }}>
              {datos.nombre}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: '500' }}>
              📍 {datos.ubicacion}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', marginTop: '2px' }}>
              A {datos.distancia}
            </p>
          </div>
        </div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)',
          padding: '6px 12px', marginTop: '12px',
          backdropFilter: 'blur(8px)',
        }}>
          <span style={{ color: 'white', fontSize: '13px' }}>⭐</span>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>{datos.rating}</span>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}>· {datos.reviews}</span>
        </div>
      </div>

      <div style={{ padding: '20px 24px 0', borderBottom: '1px solid var(--gray-100)' }}>
        <p style={{
          color: 'var(--gray-500)', fontSize: '14px', lineHeight: '1.6',
          paddingBottom: '20px',
        }}>
          {datos.narrativa}
        </p>
      </div>

      <div style={{
        display: 'flex', borderBottom: '2px solid var(--gray-100)',
        backgroundColor: 'var(--white)', position: 'sticky', top: 0, zIndex: 10,
      }}>
        {TABS.map(({ id, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              flex: 1, padding: '14px 8px',
              border: 'none', background: 'transparent',
              cursor: 'pointer', fontFamily: 'var(--font)',
              fontSize: '13px', fontWeight: '700',
              color: activeTab === id ? datos.colorTema : 'var(--gray-500)',
              borderBottom: activeTab === id ? `2px solid ${datos.colorTema}` : '2px solid transparent',
              marginBottom: '-2px', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
            }}
          >
            <span>{icon}</span>{id}
>>>>>>> 3420b40cc5a91235b3c061d45df4eaf53ae7a566
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

<<<<<<< HEAD
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
=======
      <div style={{ flex: 1, backgroundColor: 'var(--gray-100)', padding: '20px 24px' }}>

        {activeTab === 'CATÁLOGO' && (
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--black)' }}>
              Habitaciones disponibles
            </h3>
            {datos.habitaciones.map((hab, i) => (
              <div 
                key={i} 
                onClick={() => setHabitacionActiva(hab)}
                style={{
                  background: 'white', borderRadius: 'var(--radius-md)',
                  marginBottom: '12px', overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center',
                  cursor: 'pointer', transition: 'transform 0.1s, box-shadow 0.1s'
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                {/* --- MINIATURA DE LA HABITACIÓN --- */}
                {hab.imagen ? (
                  <div style={{
                    width: '90px', height: '80px', flexShrink: 0,
                    backgroundImage: `url(${hab.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center'
                  }} />
                ) : (
                  <div style={{
                    width: '90px', height: '80px', backgroundColor: 'var(--brand-mid)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '28px', flexShrink: 0,
                  }}>🛏️</div>
                )}
                
                <div style={{ padding: '12px 16px', flex: 1 }}>
                  <p style={{ fontWeight: '700', color: 'var(--black)', fontSize: '14px', margin: 0 }}>
                    {hab.nombre}
                  </p>
                  <p style={{ color: 'var(--gray-500)', fontSize: '12px', marginTop: '4px', margin: 0 }}>
                    👥 {hab.capacidad}
                  </p>
                </div>
                <div style={{ paddingRight: '16px', textAlign: 'right' }}>
                  <p style={{ fontWeight: '900', color: datos.colorTema, fontSize: '15px', margin: 0 }}>{hab.precio}</p>
                  <p style={{ color: 'var(--gray-500)', fontSize: '11px', margin: 0 }}>/ noche</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'TOUR' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--black)', alignSelf: 'flex-start' }}>
              Recorrido virtual
            </h3>
            {hotel === 'elim' ? (
              <div
                onClick={onVerTour}
                style={{
                  width: '100%', maxWidth: '400px', background: 'white', borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden', boxShadow: 'var(--shadow-md)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              >
                <div style={{
                  height: '180px', background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px',
                }}>🏖️</div>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <p style={{ fontWeight: '900', fontSize: '17px', color: 'var(--black)', marginBottom: '8px' }}>
                    Tour 360° Completo
                  </p>
                  <p style={{ color: 'var(--gray-500)', fontSize: '13px', marginBottom: '16px' }}>
                    Explora cada rincón de la propiedad
                  </p>
                  <div style={{
                    background: '#FF6B35', color: 'white', borderRadius: 'var(--radius-full)',
                    padding: '10px 24px', fontWeight: '800', fontSize: '14px', display: 'inline-block',
                  }}>
                    Ver Recorrido →
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--gray-500)' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏗️</div>
                <p style={{ fontWeight: '700', fontSize: '16px', color: 'var(--gray-700)' }}>Tour próximamente</p>
                <p style={{ fontSize: '13px', marginTop: '6px' }}>Estamos preparando el recorrido virtual.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'MEMORIES' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--black)', fontWeight: '900', margin: '0 0 4px 0' }}>
                Eventos Destacados
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--gray-500)', margin: 0, lineHeight: '1.4' }}>
                Conoce las celebraciones y retiros que toman vida aquí.
              </p>
            </div>

            {datos.memorias && datos.memorias.length > 0 ? (
              <div className="historias-container" style={{
                display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '12px'
              }}>
                {datos.memorias.map((memoria) => (
                  <div key={memoria.id} onClick={() => setMemoriaActiva(memoria)} style={{ 
                    display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', flexShrink: 0, width: '105px' 
                  }}>
                    <div style={{
                      width: '100%', height: '160px', borderRadius: '14px', padding: '2px',
                      background: `linear-gradient(45deg, ${datos.colorTema}, #FFB347)`
                    }}>
                      <div style={{
                        width: '100%', height: '100%', borderRadius: '12px',
                        overflow: 'hidden', border: '2px solid white', position: 'relative',
                        backgroundColor: 'white'
                      }}>
                        <img src={memoria.portada} alt={memoria.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '40%', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}></div>
                      </div>
                    </div>
                    <p style={{
                      color: 'var(--black)', fontSize: '12px', fontWeight: '800',
                      margin: 0, textAlign: 'center', whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis', width: '100%'
                    }}>
                      {memoria.titulo}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                background: 'white', borderRadius: 'var(--radius-md)', padding: '32px 20px', textAlign: 'center', boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📸</div>
                <p style={{ fontWeight: '700', color: 'var(--gray-700)', fontSize: '15px' }}>
                  Aún no hay memorias
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// ─── App principal ───────────────────────────────────────────────────────────
function App() {
  const [pantalla, setPantalla] = useState('mapa');
  const [hotelSeleccionado, setHotelSeleccionado] = useState('elim');
  const [verTourEnVivo, setVerTourEnVivo] = useState(false);

  if (verTourEnVivo) {
    return <TourElim onVolver={() => setVerTourEnVivo(false)} />;
  }

  if (pantalla === 'detalles') {
    return (
      <PantallaDetalles
        hotel={hotelSeleccionado}
        onVolver={() => setPantalla('mapa')}
        onVerTour={() => setVerTourEnVivo(true)}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <Hoteleria
          onAbrirDetalles={(idHotel) => {
            setHotelSeleccionado(idHotel);
            setPantalla('detalles');
          }}
        />
>>>>>>> 3420b40cc5a91235b3c061d45df4eaf53ae7a566
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