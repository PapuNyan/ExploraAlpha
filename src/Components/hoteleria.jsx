import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

{/* NUEVO: Importamos el SVG como un componente de React */}
import exploraLogo from './ExploraNaranja.png';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const BRAND = '#ff6b00';

// --- 1. BASE DE DATOS COMPACTADA ---
const ubicaciones = {
  elim: { nombre: "Casa de playa ELIM", lngLat: [-97.31908, 20.99095], precio: "$2,000 MXN", etiqueta: "4.9 ★", reviews: "15 reseñas", subtitulo: "Lugar completo · Tuxpan, Ver.", colorTema: BRAND, marcadorImg: "url('/hotelElim.png')", imagenPopup: "/hotelElim.png", marcadorHtml: "" },
  boketto: { nombre: "Hotel Boketto", lngLat: [-97.319873, 20.990532], precio: "$2,500 MXN", etiqueta: "Nuevo", reviews: "0 reseñas", subtitulo: "Habitación privada · Tuxpan, Ver.", colorTema: "#FF6B35", marcadorImg: "url('/hotelBoketto.jpg')", imagenPopup: "/hotelBoketto.jpg", marcadorHtml: "" }
};

const bokettoPoly = {
  type: 'FeatureCollection', features: [{ type: 'Feature', geometry: { type: 'Polygon', coordinates: [[ [-97.32002, 20.990538], [-97.319755, 20.990638], [-97.319728, 20.99058], [-97.319747, 20.990569], [-97.319726, 20.990519], [-97.319972, 20.990427], [-97.32002, 20.990538] ]] } }]
};

// --- 2. FUNCIONES HELPER ---
const getPopupHtml = (id, d) => `
  <div class="popup-card">
    <div class="popup-header">
      <img src="${d.imagenPopup}" />
      <div class="popup-badge" style="color:${d.colorTema}">${d.etiqueta}</div>
    </div>
    <div class="popup-body">
      <h3>${d.nombre}</h3><p class="subtitle">${d.subtitulo}</p>
      <div class="price-row"><span><strong>${d.precio}</strong> <small>/ noche</small></span><span class="reviews">${d.reviews}</span></div>
      <button id="btnDet-${id}" style="background:${d.colorTema}">Ver detalles →</button>
    </div>
  </div>`;

const createMarker = (d) => {
  const p = document.createElement("div");
  const c = document.createElement("div");
  
  // Le asignamos la nueva clase estilo Airbnb
  c.className = "marcador-precio"; 
  
  // Le inyectamos el precio que viene desde tu base de datos (ej. "$2,000 MXN")
  c.innerHTML = d.precio; 
  
  p.appendChild(c); 
  return p;
};

// --- 3. COMPONENTE PRINCIPAL ---
export default function Hoteleria({ onAbrirDetalles }) {
  const mapContainer = useRef(null), map = useRef(null), marcadoresRef = useRef({});
  const [busqueda, setBusqueda] = useState(''), [sugerencias, setSugerencias] = useState([]), [is3D, setIs3D] = useState(true);
  
  const onAbrirRef = useRef(onAbrirDetalles);
  useEffect(() => { onAbrirRef.current = onAbrirDetalles; }, [onAbrirDetalles]);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current, style: 'mapbox://styles/mapbox/streets-v12',
      center: [-97.3195, 20.9907], zoom: 16.5, pitch: 65, bearing: -40, antialias: true, projection: 'globe'
    });
    map.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'bottom-right');

    map.current.on("load", () => {
      map.current.setFog({ 'color': '#bad2eb', 'high-color': '#245cdf', 'horizon-blend': 0.02, 'space-color': '#0b0b19', 'star-intensity': 0.6 });
      
      map.current.addSource('boketto-src', { type: 'geojson', data: bokettoPoly });
      map.current.addLayer({
        id: 'boketto-layer', type: 'fill-extrusion', source: 'boketto-src',
        paint: { 'fill-extrusion-color': '#ff6b00', 'fill-extrusion-height': 15, 'fill-extrusion-base': 0, 'fill-extrusion-opacity': 0.9 }
      });
      
      map.current.on('click', 'boketto-layer', () => {
        Object.values(marcadoresRef.current).forEach(m => m.getPopup()?.remove());
        marcadoresRef.current['boketto']?.togglePopup();
      });
      map.current.on('mouseenter', 'boketto-layer', () => map.current.getCanvas().style.cursor = 'pointer');
      map.current.on('mouseleave', 'boketto-layer', () => map.current.getCanvas().style.cursor = '');
      
      setTimeout(() => map.current?.easeTo({ pitch: 75, bearing: -60, zoom: 17.5, duration: 6000 }), 500);
    });

    Object.entries(ubicaciones).forEach(([id, data]) => {
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, className: 'explora-popup' }).setHTML(getPopupHtml(id, data));
      popup.on("open", () => {
        const btn = document.getElementById(`btnDet-${id}`);
        if (btn) btn.onclick = () => onAbrirRef.current?.(id);
      });
      marcadoresRef.current[id] = new mapboxgl.Marker(createMarker(data)).setLngLat(data.lngLat).setPopup(popup).addTo(map.current);
    });
    
    return () => { map.current?.remove(); map.current = null; };
  }, []);

  const buscar = (txt) => {
    setBusqueda(txt);
    setSugerencias(!txt.trim() ? [] : Object.entries(ubicaciones).filter(([, d]) => d.nombre.toLowerCase().includes(txt.toLowerCase())));
  };

  const ir = (id, lngLat) => {
    map.current?.flyTo({ center: lngLat, zoom: 18.5, pitch: is3D ? 65 : 0, bearing: -40, duration: 2500 });
    Object.values(marcadoresRef.current).forEach(m => m.getPopup()?.remove());
    marcadoresRef.current[id]?.togglePopup();
    setBusqueda(''); setSugerencias([]);
  };

  const alternar = () => { map.current?.easeTo({ pitch: is3D ? 0 : 65, duration: 1200 }); setIs3D(!is3D); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&display=swap');
        .ui-font { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        /* Popups de Mapbox */
        .explora-popup .mapboxgl-popup-content { padding: 0 !important; background: transparent !important; box-shadow: none !important; border-radius: 16px !important; }
        .explora-popup .mapboxgl-popup-tip { border-top-color: white !important; }
        .popup-card { width: 260px; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.14); background: #fff; }
        .popup-header { position: relative; } .popup-header img { width: 100%; height: 145px; object-fit: cover; display: block; }
        .popup-badge { position: absolute; top: 10px; left: 10px; background: #fff; border-radius: 20px; padding: 4px 10px; font-size: 12px; font-weight: 800; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
        .popup-body { padding: 14px 16px; } .popup-body h3 { margin: 0 0 2px; font-weight: 800; font-size: 15px; color: #1A1A1A; }
        .subtitle { margin: 0 0 8px; font-size: 12px; color: #6B7280; }
        .price-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .price-row strong { font-weight: 900; color: #1A1A1A; font-size: 14px; } .price-row small, .reviews { color: #6B7280; font-size: 12px; }
        .popup-body button { width: 100%; padding: 10px; border: none; border-radius: 10px; color: #fff; font-weight: 800; font-size: 13px; cursor: pointer; }
        
        /* Animación Marcadores (Estilo Precio) */
        .marcador-precio { 
          background-color: white; 
          color: #1A1A1A; 
          font-weight: 800; 
          padding: 8px 14px; 
          border-radius: 20px; 
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2); 
          cursor: pointer; 
          font-size: 14px; 
          transition: transform 0.2s ease, background-color 0.2s ease; 
          white-space: nowrap;
          border: 1px solid #E5E7EB;
        }
        .marcador-precio:hover { 
          transform: scale(1.1); 
          background-color: #f7f7f7; 
          color: #ff6b00; 
        }
        
        /* UI Buscador y Botones */
        .search-box { position: absolute; top: 24px; left: 24px; z-index: 10; width: 340px; max-width: 90vw; }
        .logo-pill { text-align: left; margin-bottom: 10px; padding-left: 10px; } 

        {/* MODIFICADO: Nuevos estilos para la píldora naranja que contiene el SVG */}
        .logo-pill-inner { 
          display: inline-flex; /* Centrado vertical */
          align-items: center; 
          background: linear-gradient(135deg, #ff6b00, #ff6b00); 
          border-radius: 20px; 
          padding: 8px 20px; /* Ajustamos padding para el SVG */
          box-shadow: 0 2px 8px rgba(255,107,53,0.4); 
        }

        {/* MODIFICADO: Estilos para controlar el tamaño del SVG */}
        .logo-svg {
          height: 20px; /* Ajusta la altura del SVG para que quepa bien en la píldora */
          width: auto; /* Mantiene la proporción */
          color: #fff; /* Asegura que el logo herede el blanco si usa currentColor */
        }
        
        .input-wrapper { display: flex; align-items: center; background: #fff; border-radius: 24px; padding: 12px 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); border: 1.5px solid rgba(255,107,53,0.15); }
        .input-wrapper input { border: none; width: 100%; font-size: 14px; font-weight: 500; color: #1A1A1A; outline: none; } .input-wrapper input::placeholder { color: #9CA3AF; }
        .sugg-hbox { margin-top: 8px; background: #fff; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); overflow: hidden; }
        .sugg-item { padding: 13px 18px; cursor: pointer; border-bottom: 1px solid #F3F4F6; font-size: 14px; font-weight: 600; color: #1A1A1A; display: flex; align-items: center; gap: 10px; transition: background 0.15s; }
        .sugg-item:hover { background: #FFF0EB; } .sugg-icon { background: #FFF0EB; padding: 7px; border-radius: 8px; font-size: 16px; }
        
        .btn-3d { position: absolute; top: 10px; right: 24px; z-index: 10; background: #fff; border: 1.5px solid rgba(255,107,53,0.2); border-radius: 24px; padding: 10px 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.12); cursor: pointer; font-size: 13px; font-weight: 700; color: #1A1A1A; transition: 0.2s; }
        .btn-3d:hover { background: #FFF0EB; color: #FF6B35; }
      `}</style>

      {/* Interfaz Gráfica */}
      <div className="search-box ui-font">
        {/* MODIFICADO: Cambiamos el <span> con texto por el SVG con una nueva clase contenedora */}
        <div className="logo-pill">
          <span className="logo-pill-inner">
            <img src={exploraLogo} className="logo-svg" alt="Explora Logo" />
          </span>
        </div>

        <div className="input-wrapper">
          <span style={{ marginRight: '10px' }}>🔍</span>
          <input className="ui-font" type="text" placeholder="Buscar destino o alojamiento..." value={busqueda} onChange={e => buscar(e.target.value)} />
        </div>
        
        {sugerencias.length > 0 && (
          <div className="sugg-box">
            {sugerencias.map(([id, d]) => (
              <div key={id} className="sugg-item" onClick={() => ir(id, d.lngLat)}>
                <span className="sugg-icon">📍</span>
                <div>
                  <p style={{ margin: 0 }}>{d.nombre}</p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#6B7280' }}>{d.subtitulo}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="btn-3d ui-font" onClick={alternar}>{is3D ? '🗺️ 2D' : '🏙️ 3D'}</button>
      
      {/* Contenedor del Mapa */}
      <div ref={mapContainer} style={{ position: "absolute", inset: 0 }} />
    </>
  );
}