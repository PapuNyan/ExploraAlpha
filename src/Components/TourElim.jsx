import React from 'react';

export default function TourElim({ onVolver }) {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: 9999, 
      backgroundColor: '#000' 
    }}>
      
      {/* Botón flotante para regresar a la App */}
      <button 
        onClick={onVolver}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10000,
          padding: '10px 20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '25px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          fontFamily: 'var(--font, sans-serif)',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'}
      >
        ← Volver a la App
      </button>

      {/* Iframe que carga la exportación limpia de Marzipano */}
      <iframe 
        src="/tour-elim/index.html" 
        title="Tour 360 Casa Elim - Marzipano"
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          display: 'block'
        }}
        allowFullScreen
      />
    </div>
  );
}