import { Pannellum } from "pannellum-react";
import "pannellum/build/pannellum.css";

export default function Vista360({ imagen }) {
    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <Pannellum
               width="100%"
               height="100%"
               image={imagen}
               pitch={10}
               yaw={180}
               hfov={110}
               autoLoad
               showZoomCtrl
            />
        </div>
    );
}