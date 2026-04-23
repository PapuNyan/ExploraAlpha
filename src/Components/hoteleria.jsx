import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Hoteleria({ onAbrir360, onAbrirDrawer }) { 
  const hoteleriaRef = useRef(null);

  useEffect(() => {
    // 1. Configuración cinemática inicial (FOV Effect)
    // En tu hoteleria.jsx
    const hoteleria = new mapboxgl.Map({
    container: hoteleriaRef.current,
    style: 'mapbox://styles/mapbox/streets-v12', // <--- AGREGA ESTA LÍNEA
    center: [-97.31908, 20.99095],
    zoom: 16,
    pitch: 65,
    bearing: -40,
    antialias: true 
    });

    hoteleria.on("load", () => {
      // Capa de edificios 3D
      const layers = hoteleria.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      )?.id;

      hoteleria.addLayer({
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
          "fill-extrusion-opacity": 0.8, // Un poco más opaco para estilo moderno
        },
      }, labelLayerId);

      // 2. Efecto de cámara al cargar (Cinematic In)
      setTimeout(() => {
        hoteleria.easeTo({
          pitch: 75,
          bearing: -60,
          zoom: 17.5,
          duration: 6000, // Duración de 6 segundos
          essential: true
        });
      }, 500);
    });

    hoteleria.doubleClickZoom.disable();

    // Popup del Hotel
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(` 
        <div style="text-align:center;">
          <img src="/hotelElim.png" style="width:80px; border-radius:10px;"/>
          <h3>Hotel Elim</h3>
          <p>Habitaciones cómodas, alberca y wifi.</p>
          <button id="verTour" style="cursor:pointer;">Ver Recorrido</button>
        </div>
    `);

    // En hoteleria.jsx, dentro del popup.on("open"):
    popup.on("open", () => {
    const btn = document.getElementById("verTour");
    if (btn) {
        btn.onclick = () => {
            if (onAbrir360) onAbrir360(); 
        };
    }
});

    // Marcador
    const el = document.createElement("div");
    el.style.backgroundImage = "url('/hotelElim.png')";
    el.style.width = "40px";
    el.style.height = "40px";
    el.style.backgroundSize = "cover";
    el.style.borderRadius = "50%";
    el.style.border = "2px solid white";

    const marker = new mapboxgl.Marker(el)
      .setLngLat([-97.31908, 20.99095])
      .setPopup(popup)
      .addTo(hoteleria);

    // Eventos
    marker.getElement().addEventListener("click", () => {
    if (onAbrirDrawer) onAbrirDrawer();
});

    return () => hoteleria.remove();
  }, [onAbrir360]);

  return (
    <div ref={hoteleriaRef} style={{ width: "100%", height: "100%" }} />
  );
}