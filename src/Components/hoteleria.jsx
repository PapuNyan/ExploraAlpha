import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const AIRBNB_PINK = '#FF5A5F';

// 1. BASE DE DATOS CENTRALIZADA: Toda la info visual ahora vive aquí
const ubicaciones = {
  elim: { 
    nombre: "Casa de playa ELIM", 
    lngLat: [-97.31908, 20.99095],
    precio: "$2,000 MXN",
    etiqueta: "4.9",
    reviews: "(15 reseñas)",
    subtitulo: "Lugar completo • Tuxpan, Ver.",
    colorTema: "#222",
    marcadorImg: "url('/hotelElim.png')",
    marcadorHtml: "" // Vacío porque usa imagen
  },
  boketto: { 
    nombre: "Hotel Boketto", 
    lngLat: [-97.319921, 20.99048],
    precio: "$2,500 MXN",
    etiqueta: "Nuevo",
    reviews: "(0 reseñas)",
    subtitulo: "Habitación privada • Tuxpan, Ver.",
    colorTema: "#0f766e",
    marcadorImg: "none",
    marcadorHtml: "<span style='color:white; font-weight:bold; font-size:16px; font-family: sans-serif;'>B</span>"
  }
};

export default function Hoteleria({ onAbrirDetalles }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marcadoresRef = useRef({}); 

  const [busqueda, setBusqueda] = useState('');
  const [sugerencias, setSugerencias] = useState([]);

  const onAbrirDetallesRef = useRef(onAbrirDetalles);
  useEffect(() => { onAbrirDetallesRef.current = onAbrirDetalles; }, [onAbrirDetalles]);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-97.3195, 20.9907],
        zoom: 16.5,
        pitch: 65,      
        bearing: -40,   
        antialias: true 
      });

      map.current.on("load", () => {
        const style = map.current.getStyle();
        if (style?.sources?.composite) {
          const labelLayerId = style.layers.find(layer => layer.type === "symbol" && layer.layout["text-field"])?.id;
          map.current.addLayer({
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": ["get", "height"],
              "fill-extrusion-base": ["get", "min_height"],
              "fill-extrusion-opacity": 0.8, 
            },
          }, labelLayerId);
        }

        setTimeout(() => {
          if (map.current) map.current.easeTo({ pitch: 75, bearing: -60, zoom: 17.5, duration: 6000, essential: true });
        }, 500);
      });

      map.current.doubleClickZoom.disable();

      // =========================================================
      // 2. GENERACIÓN DINÁMICA DE MARCADORES (El código optimizado)
      // =========================================================
      Object.entries(ubicaciones).forEach(([id, data]) => {
        
        // Plantilla única de HTML que se llena con los datos de arriba
        const popupHtml = ` 
          <div style="width: 250px; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 16px rgba(0,0,0,0.12); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: left; background-color: #fff;">
            <img src="/hotelElim.png" style="width: 100%; height: 150px; object-fit: cover; border-bottom: 1px solid #f0f0f0; display: block;"/>
            <div style="padding: 12px 15px;">
              <div style="display: flex; align-items: center; justify-content: start; gap: 4px; font-size: 13px; color: #222; margin-bottom: 5px;">
                <span style="color: ${AIRBNB_PINK}; font-size: 14px;">★</span>
                <span style="font-weight: 600;">${data.etiqueta}</span>
                <span style="color: #717171; margin-left: 1px;">${data.reviews}</span>
              </div>
              <h3 style="margin: 0 0 2px 0; color: #222; font-weight: 600; font-size: 17px;">${data.nombre}</h3>
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #717171;">${data.subtitulo}</p>
              <p style="margin: 0 0 12px 0; font-size: 15px; color: #222;">
                <strong style="font-weight: 700;">${data.precio}</strong> noche
              </p>
              <button id="btnDetalles-${id}" style="cursor:pointer; background: ${data.colorTema}; color: white; padding: 10px 15px; border-radius: 8px; margin-top: 5px; border: none; font-weight: bold; width: 100%; font-size: 14px;">Ver Detalles</button>
            </div>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, className: 'airbnb-popup' }).setHTML(popupHtml);

        popup.on("open", () => {
          const btn = document.getElementById(`btnDetalles-${id}`);
          if (btn) btn.onclick = () => { if (onAbrirDetallesRef.current) onAbrirDetallesRef.current(id); };
        });

        const el = document.createElement("div");
        el.style.width = "45px";
        el.style.height = "45px";
        el.style.borderRadius = "50%";
        el.style.border = "3px solid white";
        el.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
        el.style.cursor = "pointer";
        
        // Diferenciamos si usa imagen (Elim) o color plano con texto (Boketto)
        if (data.marcadorImg !== "none") {
          el.style.backgroundImage = data.marcadorImg;
          el.style.backgroundSize = "cover";
        } else {
          el.style.backgroundColor = data.colorTema;
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.innerHTML = data.marcadorHtml;
        }

        marcadoresRef.current[id] = new mapboxgl.Marker(el)
          .setLngLat(data.lngLat)
          .setPopup(popup)
          .addTo(map.current);
      });

    } catch (error) {
      console.error("🚨 Error detectado en Mapbox:", error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const manejarBusqueda = (texto) => {
    setBusqueda(texto);
    if (texto.trim() === '') return setSugerencias([]);
    
    const filtrados = Object.entries(ubicaciones).filter(([, data]) =>
      data.nombre.toLowerCase().includes(texto.toLowerCase())
    );
    setSugerencias(filtrados);
  };

  const irAUbicacion = (id, lngLat) => {
    if (map.current) {
      map.current.flyTo({ center: lngLat, zoom: 18.5, pitch: 65, bearing: -40, duration: 2500, essential: true });

      Object.values(marcadoresRef.current).forEach(marcador => {
        if (marcador.getPopup()?.isOpen()) marcador.getPopup().remove();
      });

      if (marcadoresRef.current[id]) {
        const targetPopup = marcadoresRef.current[id].getPopup();
        if (!targetPopup.isOpen()) marcadoresRef.current[id].togglePopup();
      }
    }
    setBusqueda('');
    setSugerencias([]);
  };

  return (
    <>
      <style>{`
        .airbnb-popup .mapboxgl-popup-content { padding: 0 !important; background: transparent !important; box-shadow: none !important; }
        .airbnb-popup .mapboxgl-popup-tip { border-top-color: white !important; border-bottom-color: white !important; }
      `}</style>

      <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10, width: '320px', maxWidth: '90vw' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '24px', padding: '12px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <span style={{ marginRight: '12px', fontSize: '18px' }}>🔍</span>
          <input
            type="text" placeholder="Buscar destino o hotel..." value={busqueda}
            onChange={(e) => manejarBusqueda(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', color: '#222' }}
          />
        </div>

        {sugerencias.length > 0 && (
          <div style={{ marginTop: '8px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
            {sugerencias.map(([id, data]) => (
              <div
                key={id} onClick={() => irAUbicacion(id, data.lngLat)}
                style={{ padding: '14px 20px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: '15px', color: '#222', display: 'flex', alignItems: 'center' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <span style={{ backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '8px', marginRight: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📍</span>
                {data.nombre}
              </div>
            ))}
          </div>
        )}
      </div>

      <div ref={mapContainer} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
    </>
  );
}