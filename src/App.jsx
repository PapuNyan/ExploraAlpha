import { useState } from 'react';
import './App.css';
import Hoteleria from './Components/hoteleria.jsx';
import TourKoala from './Components/TourKoala';

const hotelData = {
  nombre: "Casa de playa ELIM",
  ubicacion: "TUXPAN, Veracruz",
  distancia: "a 9 Km de distancia",
  narrativa: "Disfruta de una experiencia única frente al mar con acceso privado y todas las comodidades."
};

function App() {
  const [verTour, setVerTour] = useState(false);
  const [activeTab, setActiveTab] = useState('catálogo');

  if (verTour) {
    return <TourKoala onVolver={() => setVerTour(false)} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
      
      {/* 1. CABECERA */}
      <div style={{ padding: '24px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', zIndex: 10 }}>
        
        {/* Título (Precios eliminados de aquí) */}
        <div style={{ marginBottom: '16px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#111827' }}>- {hotelData.nombre}</h1>
          <p style={{ margin: '4px 0', color: '#4b5563', fontWeight: 'bold' }}>- {hotelData.ubicacion}</p>
          <p style={{ margin: 0, color: '#2563eb', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>- {hotelData.distancia}</p>
        </div>

        {/* Contenido Narrativo */}
        <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
          <span style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            * Contenido Narrativo *
          </span>
          <p style={{ margin: '8px 0 0 0', color: '#4b5563', fontStyle: 'italic', fontSize: '15px' }}>
            {hotelData.narrativa}
          </p>
        </div>

        {/* Botón Reservar */}
        <button style={{ 
          width: '100%', padding: '16px', backgroundColor: '#000', color: '#fff', 
          border: 'none', borderRadius: '12px', fontWeight: '900', fontSize: '16px', 
          cursor: 'pointer', letterSpacing: '1px' 
        }}>
          RESERVAR
        </button>
      </div>

      {/* 2. PESTAÑAS DE NAVEGACIÓN */}
      <div style={{ display: 'flex', backgroundColor: 'white', borderBottom: '2px solid #e5e7eb', zIndex: 10 }}>
        {['catálogo', 'tour', 'memories'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1, padding: '16px', textTransform: 'uppercase', fontWeight: '900', 
              border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px',
              borderBottom: activeTab === tab ? '3px solid #000' : '3px solid transparent',
              color: activeTab === tab ? '#000' : '#9ca3af',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. CONTENIDO DINÁMICO */}
      <div style={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
        
        {activeTab === 'catálogo' && (
          <div style={{ padding: '24px', overflowY: 'auto', height: '100%' }}>
            <h2 style={{ marginTop: 0, color: '#374151' }}>Habitaciones Disponibles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#e5e7eb', height: '140px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontWeight: 'bold' }}>Foto 1</div>
              <div style={{ backgroundColor: '#e5e7eb', height: '140px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontWeight: 'bold' }}>Foto 2</div>
            </div>
          </div>
        )}

        {activeTab === 'tour' && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <Hoteleria onAbrir360={() => setVerTour(true)} />
          </div>
        )}

        {activeTab === 'memories' && (
          <div style={{ padding: '24px', overflowY: 'auto', height: '100%' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <p style={{ margin: 0, fontStyle: 'italic', color: '#4b5563' }}>"Próximamente: fotos y experiencias inolvidables."</p>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;