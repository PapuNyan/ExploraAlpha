import { useState } from 'react';
import './App.css';
import Hoteleria from './Components/hoteleria.jsx';
import TourKoala from './Components/TourKoala';

// Nuestra base de datos de hoteles (Volvemos a textos originales)
const hotelesInfo = {
  elim: {
    nombre: "Casa de playa ELIM",
    ubicacion: "TUXPAN, Veracruz",
    distancia: "A 9 KM DE DISTANCIA",
    narrativa: "Disfruta de una experiencia única frente al mar con acceso privado y todas las comodidades.",
    colorTema: "#000000" // Negro
  },
  boketto: {
    nombre: "Hotel Boketto",
    ubicacion: "Playa San Antonio, TUXPAN",
    distancia: "A 12 KM DE LA TERMOELÉCTRICA",
    narrativa: "Un rincón de paz frente a la playa, diseñado para relajarte y desconectar del mundo.",
    colorTema: "#0f766e" // Un verde azulado (Teal) para diferenciarlo
  }
};

function App() {
  const [pantallaActiva, setPantallaActiva] = useState('mapa'); 
  const [activeTab, setActiveTab] = useState('CATÁLOGO');
  const [hotelSeleccionado, setHotelSeleccionado] = useState('elim'); 
  const [verTourEnVivo, setVerTourEnVivo] = useState(false); 

  const datosActuales = hotelesInfo[hotelSeleccionado];

  // Si se abre el visor 360, ocupa toda la pantalla
  if (verTourEnVivo) {
    return <TourKoala onVolver={() => setVerTourEnVivo(false)} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#ffffff', fontFamily: 'sans-serif' }}>
      
      {/* 1. EL MAPA (Lo primero que carga) */}
      {pantallaActiva === 'mapa' && (
        <div style={{ flexGrow: 1, position: 'relative' }}>
          <Hoteleria onAbrirDetalles={(idHotel) => {
            setHotelSeleccionado(idHotel);
            setPantallaActiva('detalles');
          }} />
        </div>
      )}

      {/* 2. LA INTERFAZ DE DETALLES (Volvemos al diseño simple centrado) */}
      {pantallaActiva === 'detalles' && (
        <>
          {/* Botón para volver al mapa */}
          <div 
            style={{ padding: '12px 24px', backgroundColor: '#f9fafb', cursor: 'pointer', color: '#2563eb', fontWeight: 'bold', borderBottom: '1px solid #e5e7eb' }} 
            onClick={() => setPantallaActiva('mapa')}
          >
            ← Volver al mapa
          </div>

          {/* CABECERA (Centrada) */}
          <div style={{ padding: '24px', textAlign: 'center', zIndex: 10 }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#111827' }}>- {datosActuales.nombre}</h1>
            <p style={{ margin: '4px 0', color: '#4b5563', fontWeight: 'bold' }}>- {datosActuales.ubicacion}</p>
            <p style={{ margin: '4px 0 16px 0', color: '#2563eb', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>- {datosActuales.distancia}</p>

            <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
              <span style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                * Contenido Narrativo *
              </span>
              <p style={{ margin: '8px 0 0 0', color: '#4b5563', fontStyle: 'italic', fontSize: '15px' }}>
                {datosActuales.narrativa}
              </p>
            </div>

            <button style={{ 
              width: '100%', padding: '16px', backgroundColor: datosActuales.colorTema, color: '#fff', 
              border: 'none', borderRadius: '12px', fontWeight: '900', fontSize: '16px', 
              cursor: 'pointer', letterSpacing: '1px' 
            }}>
              RESERVAR
            </button>
          </div>

          {/* PESTAÑAS */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb', zIndex: 10 }}>
            {['CATÁLOGO', 'TOUR', 'MEMORIES'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: '16px', textTransform: 'uppercase', fontWeight: '900', 
                  border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px',
                  borderBottom: activeTab === tab ? `3px solid ${datosActuales.colorTema}` : '3px solid transparent',
                  color: activeTab === tab ? datosActuales.colorTema : '#9ca3af',
                  transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CONTENIDO DINÁMICO */}
          <div style={{ flexGrow: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#ffffff' }}>
            
            {activeTab === 'CATÁLOGO' && (
              <div style={{ padding: '24px', overflowY: 'auto', height: '100%', textAlign: 'center' }}>
                <h2 style={{ marginTop: 0, color: '#374151', fontSize: '20px', marginBottom: '20px' }}>Habitaciones Disponibles</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ backgroundColor: '#e5e7eb', height: '140px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontWeight: 'bold' }}>Foto 1</div>
                  <div style={{ backgroundColor: '#e5e7eb', height: '140px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontWeight: 'bold' }}>Foto 2</div>
                </div>
              </div>
            )}

            {activeTab === 'TOUR' && (
              <div style={{ padding: '24px', overflowY: 'auto', height: '100%', backgroundColor: '#f9fafb' }}>
                
                {hotelSeleccionado === 'elim' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ marginTop: 0, color: '#374151', fontSize: '20px', marginBottom: '24px', textAlign: 'center' }}>Explora nuestras instalaciones</h2>
                    <div 
                      style={{
                        backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', width: '280px', maxWidth: '100%'
                      }}
                      onClick={() => setVerTourEnVivo(true)}
                    >
                      <img src="/hotelElim.png" alt="Tour Completo" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                      <div style={{ padding: '16px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 12px 0', fontWeight: '900', fontSize: '18px', color: '#1f2937' }}>Tour Completo</p>
                        <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: 'bold', backgroundColor: '#eff6ff', padding: '8px 16px', borderRadius: '20px' }}>
                          Ver Recorrido →
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {hotelSeleccionado === 'boketto' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textRendering: 'optimizeLegibility' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                      <span style={{ fontSize: '40px' }}>🏗️</span>
                    </div>
                    <p style={{ margin: 0, fontWeight: '900', fontSize: '24px', color: '#6b7280', textAlign: 'center', textTransform: 'uppercase' }}>Tour próximamente</p>
                    <p style={{ margin: '8px 0 0 0', color: '#9ca3af', textAlign: 'center' }}>Estamos trabajando en un recorrido para el Hotel Boketto.</p>
                  </div>
                )}

              </div>
            )}

            {activeTab === 'MEMORIES' && (
              <div style={{ padding: '24px', overflowY: 'auto', height: '100%' }}>
                <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '16px' }}>
                  <p style={{ margin: 0, fontStyle: 'italic', color: '#4b5563' }}>"Un lugar increíble para descansar."</p>
                  <p style={{ margin: '10px 0 0 0', fontWeight: 'bold', fontSize: '14px', color: '#111827' }}>- Valdo</p>
                </div>
              </div>
            )}
            
          </div>
        </>
      )}
    </div>
  );
}

export default App;