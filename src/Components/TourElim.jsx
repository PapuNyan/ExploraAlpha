import React from 'react';

// --- DICCIONARIO DE ESCENAS (Basado en tu data.js) ---
const escenasMarzipano = {
  "Cabaña entrada": "19-cabaa-entrada", 
  "Cabaña intermedia": "20-cabaa-media",
  "Cabaña brisa de mar": "15-cabaa-grande",
  "Cabaña costa azul": "16-cabaa-de-2-pisos",
  "Cuarto con terraza": "13-cuarto-terraza",
  "Casa grande": "7-entrada" // Lo mandamos a la entrada de la casa principal
};

export default function TourElim({ onVolver, habitacionInicial }) {
  
  // Si recibimos una habitación y existe en el diccionario, agregamos el #
  const hashEscena = (habitacionInicial && escenasMarzipano[habitacionInicial]) 
    ? `#${escenasMarzipano[habitacionInicial]}` 
    : ''; // Si no hay match o abren el tour general, empieza en la alberca por defecto

  // La URL final que cargará el iframe
  const urlFinal = `/tour-elim/index.html${hashEscena}`;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, backgroundColor: '#000' }}>
      
      <button 
        onClick={onVolver}
        style={{
          position: 'absolute', top: '20px', left: '20px', zIndex: 10000, padding: '10px 20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '25px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          fontFamily: 'var(--font, sans-serif)', transition: 'background-color 0.2s'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'}
      >
        ← Volver a la App
      </button>

      <iframe 
        src={urlFinal} 
        title="Tour 360 Casa Elim - Marzipano"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        allowFullScreen
      />
    </div>
  );
}