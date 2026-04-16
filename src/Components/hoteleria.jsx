import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"

mapboxgl.accessToken  = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Hoteleria({ onAbrir360 }){
    const hoteleriaRef = useRef(null);

    useEffect(() => {
        const hoteleria = new mapboxgl.Map({
            container: hoteleriaRef.current,
            center: [-97.31908, 20.99095], //[lng, lat]
            zoom: 15,
        });

        hoteleria.doubleClickZoom.disable();

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(` 
            <div style="text-align:center;">
            <img src="/hotelElim.png" style="width:80px; border-radius:10px;"/>
            <h3>Hotel Elim</h3>
            <p>Habitaciones cómodas, alberca y wifi.</p>
            <button id="VerTour">Ver Recorrido</button>
            </div>
        `);

        popup.on("open", () => {
            setTimeout(() => {
                const btn = document.getElementById("VerTour");
                if(btn) {
                    btn.onclick = () => {
                        if (onAbrir360) onAbrir360()
                    };
                }
            }, 0);
        });

        // const el = document.createElement("div");
        // el.style.backgroundImage = "url('/hotelElim.png')";
        // el.style.width = "40px";
        // el.style.height = "40px";
        // el.style.backgroundSize = "cover";

        const marker = new mapboxgl.Marker()
        .setLngLat([-97.31908, 20.99095])
        .setPopup(popup)
        .addTo(hoteleria);

        // marker .getElement().addEventListener("dblclick", () => {
        //     if(onAbrir360) onAbrir360();
        // });

        // marker .getElement().addEventListener("click", () => {
        //     console.log("click en marker");
        //     if (onAbrir360) onAbrir360();
        // });

         //hoteleria.on("click", () => {
           // onAbrir360();
        //});

        return () => hoteleria.remove();
    }, [onAbrir360]);

    return ( <div 
    ref={hoteleriaRef} style={{width:"100%", height:"1000px"}} />
    );
}