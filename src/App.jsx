import React, { useState, forwardRef, useEffect } from 'react';
import './App.css';
import Hoteleria from './Components/hoteleria.jsx';
import TourElim from './Components/TourElim.jsx'; 

// IMPORTAMOS LOS DATOS DESDE EL NUEVO ARCHIVO
import { hotelesInfo, TABS } from './data/hotelesData.js';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
registerLocale('es', es);

// ─── Visor de Galería a Pantalla Completa ──────────────────
function VisorGaleria({ imagenes, initialIndex, onCerrar }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const siguiente = (e) => {
    if(e) e.stopPropagation();
    if (currentIndex < imagenes.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const anterior = (e) => {
    if(e) e.stopPropagation();
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 10000, display: 'flex', 
      flexDirection: 'column', fontFamily: 'var(--font)'
    }}>
      <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20 }}>
        <p style={{ color: 'white', fontWeight: '800', margin: 0, fontSize: '15px' }}>
          {currentIndex + 1} / {imagenes.length}
        </p>
        <button onClick={onCerrar} style={{ background: 'none', border: 'none', color: 'white', fontSize: '28px', cursor: 'pointer', padding: '0' }}>✕</button>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', paddingBottom: '40px', boxSizing: 'border-box', gap: '16px' }}>
        <div style={{ width: '48px', flexShrink: 0, zIndex: 20 }}>
          {currentIndex > 0 && (
            <button onClick={anterior} style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>❮</button>
          )}
        </div>
        <div style={{ width: '100%', maxWidth: '900px', height: '70vh', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', backgroundColor: '#000', flexShrink: 1 }}>
          <img src={imagenes[currentIndex]} alt={`Vista ampliada ${currentIndex + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '48px', flexShrink: 0, zIndex: 20 }}>
          {currentIndex < imagenes.length - 1 && (
            <button onClick={siguiente} style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>❯</button>
          )}
        </div>
      </div>
      <div onClick={anterior} style={{ position: 'absolute', top: '100px', bottom: '100px', left: 0, width: '25%', zIndex: 10 }}></div>
      <div onClick={siguiente} style={{ position: 'absolute', top: '100px', bottom: '100px', right: 0, width: '25%', zIndex: 10 }}></div>
    </div>
  );
}

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
      <div style={{ position: 'absolute', width: '100%', maxWidth: '640px', display: 'flex', justifyContent: 'space-between', padding: '0 16px', pointerEvents: 'none', zIndex: 50 }}>
        {currentIndex > 0 ? (
          <button onClick={(e) => { e.stopPropagation(); anteriorSlide(); }} style={{ pointerEvents: 'auto', width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>❮</button>
        ) : <div style={{ width: '40px' }} />}
        <button onClick={(e) => { e.stopPropagation(); siguienteSlide(); }} style={{ pointerEvents: 'auto', width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>❯</button>
      </div>
      <div style={{ position: 'relative', width: '100%', maxWidth: '480px', height: '100%', backgroundColor: '#000', overflow: 'hidden' }}>
        {currentItem.tipo === 'img' ? (
          <img src={currentItem.url} alt="Story" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <video src={currentItem.url} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px 12px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)', zIndex: 20, pointerEvents: 'none' }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
            {memoria.contenido.map((_, i) => (
              <div key={i} style={{ flex: 1, height: '3px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', backgroundColor: '#fff', width: i < currentIndex ? '100%' : '0%', animation: i === currentIndex ? `fillStory ${DURATION}ms linear forwards` : 'none' }}></div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FF6B35', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: '2px solid white' }}>📸</div>
              <div>
                <p style={{ color: 'white', fontWeight: '800', fontSize: '13px', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>{memoria.titulo}</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', margin: 0, fontWeight: '500', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>Casa ELIM</p>
              </div>
            </div>
            <button onClick={onCerrar} style={{ background: 'none', border: 'none', color: 'white', fontSize: '28px', cursor: 'pointer', padding: '0' }}>✕</button>
          </div>
        </div>
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

  const AirbnbInput = forwardRef(({ onClick }, ref) => (
    <div onClick={onClick} ref={ref} style={{ display: 'flex', border: '1px solid #B0B0B0', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', width: '100%' }}>
      <div style={{ flex: 1, padding: '10px 14px', borderRight: '1px solid #B0B0B0' }}>
        <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--black)', marginBottom: '2px', textTransform: 'uppercase' }}>Llegada</div>
        <div style={{ fontSize: '14px', color: startDate ? 'var(--black)' : '#717171', fontWeight: startDate ? '600' : '400' }}>{startDate ? format(startDate, 'dd/MM/yyyy') : 'Agregar fecha'}</div>
      </div>
      <div style={{ flex: 1, padding: '10px 14px' }}>
        <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--black)', marginBottom: '2px', textTransform: 'uppercase' }}>Salida</div>
        <div style={{ fontSize: '14px', color: endDate ? 'var(--black)' : '#717171', fontWeight: endDate ? '600' : '400' }}>{endDate ? format(endDate, 'dd/MM/yyyy') : 'Agregar fecha'}</div>
      </div>
    </div>
  ));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--white)', fontFamily: 'var(--font)' }}>
      <style>{`.react-datepicker-wrapper { width: 100%; display: block; } .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range { background-color: ${colorTema} !important; color: white !important; border-radius: 50%; }`}</style>
      <div style={{ height: '32vh', minHeight: '220px', position: 'relative', backgroundImage: habitacion.imagen ? `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${habitacion.imagen})` : `linear-gradient(135deg, ${colorTema} 0%, #1A1A1A 100%)`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={onVolver} style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: 'var(--radius-full)', padding: '8px 16px', color: 'white', fontWeight: '700', fontSize: '14px', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>← Regresar</button>
        
        {/* --- CAMBIO 1: AQUÍ MANDAMOS EL NOMBRE DE LA HABITACIÓN AL HACER CLIC --- */}
        <button onClick={() => onVerTour(habitacion.nombre)} style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'white', border: 'none', borderRadius: 'var(--radius-full)', padding: '8px 16px', color: 'var(--black)', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}>🌐 Habitación 360</button>
      </div>
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--black)', margin: '0 0 8px 0' }}>{habitacion.nombre}</h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--gray-100)', padding: '6px 12px', borderRadius: 'var(--radius-full)', marginBottom: '24px' }}>
           <span style={{ fontSize: '14px' }}>👥</span><span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>{habitacion.capacidad}</span>
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--black)', marginBottom: '12px' }}>Sobre este espacio</h3>
        <p style={{ color: 'var(--gray-500)', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px' }}>{habitacion.descripcion}</p>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', padding: '20px', borderRadius: '16px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '16px' }}>
             <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--black)' }}>{habitacion.precio} MXN</span><span style={{ fontSize: '14px', color: 'var(--gray-500)', fontWeight: '500' }}>/ noche</span>
          </div>
          <DatePicker selectsRange={true} startDate={startDate} endDate={endDate} onChange={(update) => setDateRange(update)} minDate={new Date()} locale="es" withPortal customInput={<AirbnbInput />} />
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--black)', marginBottom: '16px' }}>¿Qué incluye?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '30px' }}>
            {habitacion.amenidades.map((amenidad, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'var(--gray-700)', fontWeight: '600' }}><span style={{ color: colorTema }}>✓</span> {amenidad}</div>
            ))}
        </div>
      </div>
    </div>
  );
}

// ─── Pantalla de detalles del Hotel ──────────────────────────────────────────
function PantallaDetalles({ hotel, onVolver, onVerTour }) {
  const [activeTab, setActiveTab] = useState('HABITACIONES');
  const [habitacionActiva, setHabitacionActiva] = useState(null);
  const [memoriaActiva, setMemoriaActiva] = useState(null);
  const [indiceGaleriaActiva, setIndiceGaleriaActiva] = useState(null);
  
  const datos = hotelesInfo[hotel];

  if (indiceGaleriaActiva !== null) return <VisorGaleria imagenes={datos.galeria} initialIndex={indiceGaleriaActiva} onCerrar={() => setIndiceGaleriaActiva(null)} />;
  if (habitacionActiva) return <PantallaHabitacion habitacion={habitacionActiva} colorTema={datos.colorTema} onVolver={() => setHabitacionActiva(null)} onVerTour={onVerTour} />;
  if (memoriaActiva) return <VisorMemoria memoria={memoriaActiva} onCerrar={() => setMemoriaActiva(null)} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--white)', fontFamily: 'var(--font)', overflowY: 'auto' }}>
      <div style={{ background: `linear-gradient(135deg, ${datos.colorTema} 0%, #FF8C5A 100%)`, padding: '16px 24px 28px', position: 'relative' }}>
        <button onClick={onVolver} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: 'var(--radius-full)', padding: '8px 16px', color: 'white', fontWeight: '700', marginBottom: '20px' }}>← Volver al mapa</button>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: '900' }}>{datos.nombre}</h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>📍 {datos.ubicacion}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)', padding: '6px 12px', marginTop: '12px' }}>
          <span style={{ color: 'white' }}>⭐</span><span style={{ color: 'white', fontWeight: '700' }}>{datos.rating}</span>
        </div>
      </div>
      <div style={{ padding: '20px 24px 16px' }}><p style={{ color: 'var(--gray-500)', fontSize: '14px', lineHeight: '1.6' }}>{datos.narrativa}</p></div>
      {datos.galeria && datos.galeria.length > 0 && (
        <div style={{ paddingBottom: '20px', borderBottom: '1px solid var(--gray-100)' }}>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '0 24px' }}>
            {datos.galeria.map((img, index) => (
              <div key={index} onClick={() => setIndiceGaleriaActiva(index)} style={{ flexShrink: 0, width: '260px', height: '160px', borderRadius: '16px', overflow: 'hidden' }}>
                <img src={img} alt={`Galeria ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', borderBottom: '2px solid var(--gray-100)', backgroundColor: 'var(--white)', position: 'sticky', top: 0, zIndex: 10 }}>
        {TABS.map(({ id, icon }) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{ flex: 1, padding: '14px 8px', background: 'transparent', border: 'none', color: activeTab === id ? datos.colorTema : 'var(--gray-500)', borderBottom: activeTab === id ? `2px solid ${datos.colorTema}` : 'none' }}><span>{icon}</span>{id}</button>
        ))}
      </div>
      <div style={{ flex: 1, backgroundColor: 'var(--gray-100)', padding: '20px 24px' }}>
        {activeTab === 'HABITACIONES' && datos.habitaciones.map((hab, i) => (
          <div key={i} onClick={() => setHabitacionActiva(hab)} style={{ background: 'white', borderRadius: 'var(--radius-md)', marginBottom: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            {hab.imagen && <div style={{ width: '90px', height: '80px', flexShrink: 0, backgroundImage: `url(${hab.imagen})`, backgroundSize: 'cover' }} />}
            <div style={{ padding: '12px 16px', flex: 1 }}><p style={{ fontWeight: '700', fontSize: '14px', margin: 0 }}>{hab.nombre}</p><p style={{ color: 'var(--gray-500)', fontSize: '12px' }}>👥 {hab.capacidad}</p></div>
            <div style={{ paddingRight: '16px', textAlign: 'right' }}><p style={{ fontWeight: '900', color: datos.colorTema }}>{hab.precio}</p></div>
          </div>
        ))}
        {/* --- CAMBIO 2: SI ES EL TOUR GENERAL, MANDAMOS NULL PARA QUE EMPIECE EN LA ALBERCA --- */}
        {activeTab === 'TOUR' && <div style={{ textAlign: 'center', padding: '40px' }}><button onClick={() => onVerTour(null)} style={{ background: datos.colorTema, color: 'white', padding: '12px 24px', border: 'none', borderRadius: '24px', fontWeight: '800' }}>Ver Recorrido →</button></div>}
        {activeTab === 'MEMORIES' && <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '10px' }}>{datos.memorias.map((memoria) => (<div key={memoria.id} onClick={() => setMemoriaActiva(memoria)} style={{ width: '180px', flexShrink: 0, cursor: 'pointer' }}><div style={{ height: '260px', borderRadius: '16px', border: `3px solid ${datos.colorTema}`, padding: '3px', backgroundColor: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}><img src={memoria.portada} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '11px' }} /></div><p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '800', marginTop: '8px', color: 'var(--black)' }}>{memoria.titulo}</p></div>))}</div>}
      </div>
    </div>
  );
}

// ─── App principal ───────────────────────────────────────────────────────────
function App() {
  const [pantalla, setPantalla] = useState('mapa');
  const [hotelSeleccionado, setHotelSeleccionado] = useState('elim');
  const [verTourEnVivo, setVerTourEnVivo] = useState(false);
  const [habitacionParaTour, setHabitacionParaTour] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      
      {/* CAMBIO CLAVE: El Tour ahora flota por encima de todo, sin borrar la app */}
      {verTourEnVivo && (
        <TourElim 
          habitacionInicial={habitacionParaTour} 
          onVolver={() => { 
            setVerTourEnVivo(false); 
            setHabitacionParaTour(null); 
          }} 
        />
      )}

      {/* La app decide si mostrar los detalles o el mapa interactivo en el fondo */}
      {pantalla === 'detalles' ? (
        <PantallaDetalles 
          hotel={hotelSeleccionado} 
          onVolver={() => setPantalla('mapa')} 
          onVerTour={(nombreHab) => { 
            setHabitacionParaTour(nombreHab); 
            setVerTourEnVivo(true); 
          }} 
        />
      ) : (
        <div style={{ flexGrow: 1, position: 'relative' }}>
          <Hoteleria onAbrirDetalles={(idHotel) => { 
            setHotelSeleccionado(idHotel); 
            setPantalla('detalles'); 
          }} />
        </div>
      )}

    </div>
  );
}

export default App;