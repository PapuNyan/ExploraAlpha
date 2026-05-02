import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

export const GlobeView = forwardRef(function GlobeView(
  { points = [], onPointClick },
  ref
) {
  const globeRef = useRef();
  const wrapperRef = useRef();
  const [size, setSize] = useState({ w: 800, h: 800 });

  useImperativeHandle(ref, () => ({
    flyTo: ({ lat, lng, altitude = 1.4, ms = 1800 }) => {
      const g = globeRef.current;
      if (!g) return;
      g.controls().autoRotate = false;
      g.pointOfView({ lat, lng, altitude }, ms);
      window.setTimeout(() => {
        const ctrl = g.controls();
        if (ctrl) ctrl.autoRotate = true;
      }, ms + 4500);
    },
  }));

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const ctrl = g.controls();
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 0.45;
    ctrl.enableZoom = false;
    g.pointOfView({ lat: 18, lng: 0, altitude: 2.4 }, 0);

    const scene = g.scene();
    const haloGeom = new THREE.SphereGeometry(102, 64, 64);
    const haloMat = new THREE.ShaderMaterial({
      uniforms: { c: { value: 0.6 }, p: { value: 4.2 } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float c; uniform float p; varying vec3 vNormal;
        void main() {
          float intensity = pow(c - dot(vNormal, vec3(0.0,0.0,1.0)), p);
          gl_FragColor = vec4(0.48, 0.31, 0.83, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const halo = new THREE.Mesh(haloGeom, haloMat);
    scene.add(halo);
    return () => {
      scene.remove(halo);
      haloGeom.dispose();
      haloMat.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      data-testid="globe-canvas"
      className="absolute inset-0 h-full w-full"
    >
      <Globe
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor="#7B4FD4"
        atmosphereAltitude={0.22}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showGraticules
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "#FF6B2B"}
        pointAltitude={0.018}
        pointRadius={0.55}
        pointLabel={(d) =>
          `<div style="font-family:Manrope,sans-serif;background:rgba(26,11,51,0.85);border:1px solid rgba(123,79,212,0.4);backdrop-filter:blur(12px);padding:8px 12px;border-radius:12px;color:#fff;font-size:13px">
            <div style="color:#FF8F4D;font-weight:700;letter-spacing:0.06em">${d.name.toUpperCase()}</div>
            <div style="color:#E8E0FF;opacity:0.8">${d.country}</div>
          </div>`
        }
        onPointClick={onPointClick}
        ringsData={points}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => (t) => `rgba(255, 143, 77, ${1 - t})`}
        ringMaxRadius={2.2}
        ringPropagationSpeed={1.4}
        ringRepeatPeriod={1800}
      />
    </div>
  );
});

export default GlobeView;