import { useEffect, useState } from "react";
import { Globe, BedDouble, Sparkles, Heart } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Explorar", Icon: Globe },
  { id: "hoteles", label: "Hoteles", Icon: BedDouble },
  { id: "experiencias", label: "Experiencias", Icon: Sparkles },
  { id: "memorias", label: "Memorias", Icon: Heart },
];

const useActiveSection = () => {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
};

export const SectionDots = () => {
  const active = useActiveSection();
  return (
    <nav
      data-testid="section-dots"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          data-testid={`dot-${s.id}`}
          aria-label={s.label}
          className="group relative flex items-center"
        >
          <span
            className={`block h-2.5 rounded-full transition-all duration-300 ${
              active === s.id
                ? "w-6 bg-[#FF6B2B] shadow-[0_0_12px_rgba(255,107,43,0.7)]"
                : "w-2.5 bg-white/20 hover:bg-white/45"
            }`}
          />
          <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-white/[0.08] bg-[#0F0A22]/85 px-2 py-1 font-[Manrope] text-[11px] font-semibold text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
            {s.label}
          </span>
        </a>
      ))}
    </nav>
  );
};

export const MobileTabBar = () => {
  const active = useActiveSection();
  return (
    <nav
      data-testid="mobile-tab-bar"
      className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-2xl border border-white/[0.08] bg-[#0F0A22]/85 px-2 py-2 backdrop-blur-xl shadow-[0_-12px_40px_rgba(8,11,20,0.6)] md:hidden"
    >
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          data-testid={`tab-${s.id}`}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 font-[Manrope] text-[10px] font-semibold transition-colors ${
            active === s.id
              ? "bg-gradient-to-r from-[#FF6B2B]/20 to-[#FF8F4D]/15 text-[#FF8F4D]"
              : "text-[#C4B5FD]/70"
          }`}
        >
          <s.Icon className="h-5 w-5" strokeWidth={1.6} />
          {s.label}
        </a>
      ))}
    </nav>
  );
};
