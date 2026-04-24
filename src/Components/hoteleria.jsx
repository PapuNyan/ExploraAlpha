import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Hoteleria({ onAbrirDetalles }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const onAbrirDetallesRef = useRef(onAbrirDetalles);
  useEffect(() => {
    onAbrirDetallesRef.current = onAbrirDetalles;
  }, [onAbrirDetalles]);

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

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
        if (style && style.sources && style.sources.composite) {
          const layers = style.layers;
          const labelLayerId = layers.find(
            (layer) => layer.type === "symbol" && layer.layout["text-field"]
          )?.id;

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
          if (map.current) {
            map.current.easeTo({
              pitch: 75,
              bearing: -60,
              zoom: 17.5,
              duration: 6000, 
              essential: true
            });
          }
        }, 500);
      });

      map.current.doubleClickZoom.disable();

      // ==========================================
      // 1. MARCADOR Y POPUP PARA CASA ELIM
      // ==========================================
      // NOTA: Agregamos className: 'airbnb-popup'
      const popupElim = new mapboxgl.Popup({ offset: 25, closeButton: false, className: 'airbnb-popup' }).setHTML(` 
          <div style="width: 250px; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 16px rgba(0,0,0,0.12); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: left; background-color: #fff;">
            <img src="/hotelElim.png" style="width: 100%; height: 150px; object-fit: cover; border-bottom: 1px solid #f0f0f0; display: block;"/>
            <div style="padding: 12px 15px;">
              <div style="display: flex; align-items: center; justify-content: start; gap: 4px; font-size: 13px; color: #222; margin-bottom: 5px;">
                <span style="color: #FF5A5F; font-size: 14px;">★</span>
                <span style="font-weight: 600;">4.9</span>
                <span style="color: #717171; margin-left: 1px;">(15 reseñas)</span>
              </div>
              <h3 style="margin: 0 0 2px 0; color: #222; font-weight: 600; font-size: 17px;">Casa de playa ELIM</h3>
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #717171;">Lugar completo • Tuxpan, Ver.</p>
              <p style="margin: 0 0 12px 0; font-size: 15px; color: #222;">
                <strong style="font-weight: 700;">$2,000 MXN</strong> noche
              </p>
              <button id="btnDetallesElim" style="cursor:pointer; background: #222; color: white; padding: 10px 15px; border-radius: 8px; margin-top: 5px; border: none; font-weight: bold; width: 100%; font-size: 14px;">Ver Detalles</button>
            </div>
          </div>
      `);

      popupElim.on("open", () => {
        const btn = document.getElementById("btnDetallesElim");
        if (btn) btn.onclick = () => { if (onAbrirDetallesRef.current) onAbrirDetallesRef.current('elim'); };
      });

      const elElim = document.createElement("div");
      elElim.style.backgroundImage = "url('/hotelElim.png')";
      elElim.style.width = "45px";
      elElim.style.height = "45px";
      elElim.style.backgroundSize = "cover";
      elElim.style.borderRadius = "50%";
      elElim.style.border = "3px solid white";
      elElim.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
      elElim.style.cursor = "pointer";

      new mapboxgl.Marker(elElim).setLngLat([-97.31908, 20.99095]).setPopup(popupElim).addTo(map.current);

      // ==========================================
      // 2. MARCADOR Y POPUP PARA HOTEL BOKETTO
      // ==========================================
      // NOTA: Agregamos className: 'airbnb-popup'
      const popupBoketto = new mapboxgl.Popup({ offset: 25, closeButton: false, className: 'airbnb-popup' }).setHTML(` 
          <div style="width: 250px; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 16px rgba(0,0,0,0.12); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: left; background-color: #fff;">
            <img src="/hotelElim.png" style="width: 100%; height: 150px; object-fit: cover; border-bottom: 1px solid #f0f0f0; display: block;"/>
            <div style="padding: 12px 15px;">
              <div style="display: flex; align-items: center; justify-content: start; gap: 4px; font-size: 13px; color: #222; margin-bottom: 5px;">
                <span style="color: #FF5A5F; font-size: 14px;">★</span>
                <span style="font-weight: 600;">Nuevo</span>
                <span style="color: #717171; margin-left: 1px;">(0 reseñas)</span>
              </div>
              <h3 style="margin: 0 0 2px 0; color: #222; font-weight: 600; font-size: 17px;">Hotel Boketto</h3>
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #717171;">Habitación privada • Tuxpan, Ver.</p>
              <p style="margin: 0 0 12px 0; font-size: 15px; color: #222;">
                <strong style="font-weight: 700;">$2,500 MXN</strong> noche
              </p>
              <button id="btnDetallesBoketto" style="cursor:pointer; background: #0f766e; color: white; padding: 10px 15px; border-radius: 8px; margin-top: 5px; border: none; font-weight: bold; width: 100%; font-size: 14px;">Ver Detalles</button>
            </div>
          </div>
      `);

      popupBoketto.on("open", () => {
        const btn = document.getElementById("btnDetallesBoketto");
        if (btn) btn.onclick = () => { if (onAbrirDetallesRef.current) onAbrirDetallesRef.current('boketto'); };
      });

      const elBoketto = document.createElement("div");
      elBoketto.style.backgroundColor = "#0f766e"; 
      elBoketto.style.width = "45px";
      elBoketto.style.height = "45px";
      elBoketto.style.borderRadius = "50%";
      elBoketto.style.border = "3px solid white";
      elBoketto.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
      elBoketto.style.cursor = "pointer";
      elBoketto.style.display = "flex";
      elBoketto.style.alignItems = "center";
      elBoketto.style.justifyContent = "center";
      elBoketto.innerHTML = "<span style='color:white; font-weight:bold; font-size:16px; font-family: sans-serif;'>B</span>";

      new mapboxgl.Marker(elBoketto).setLngLat([-97.319921, 20.99048]).setPopup(popupBoketto).addTo(map.current);

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

  return (
    <>
      {/* MAGIA CSS: Limpiamos el contenedor por defecto de Mapbox */}
      <style>{`
        .airbnb-popup .mapboxgl-popup-content {
          padding: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }
        /* Ajustamos el triangulito para que coincida con la tarjeta blanca */
        .airbnb-popup .mapboxgl-popup-tip {
          border-top-color: white !important;
          border-bottom-color: white !important;
        }
      `}</style>
      
      <div ref={mapContainer} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
    </>
  );
}