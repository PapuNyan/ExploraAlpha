import { useEffect, useRef } from "react";

export const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      s: Math.random() * 0.012 + 0.002,
      hue: Math.random() > 0.85 ? 22 : 270,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.a += s.s;
        const alpha = 0.3 + Math.abs(Math.sin(s.a)) * 0.7;
        ctx.beginPath();
        ctx.fillStyle =
          s.hue === 22
            ? `rgba(255, 140, 60, ${alpha * 0.9})`
            : `rgba(232, 224, 255, ${alpha * 0.85})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="star-field"
      className="fixed inset-0 -z-10 h-full w-full"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #1a0f3d 0%, #0a0719 45%, #050309 100%)",
      }}
    />
  );
};

export default StarField;