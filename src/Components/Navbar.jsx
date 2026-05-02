import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Compass, BedDouble, Sparkles, Heart, Menu, X } from "lucide-react";

const links = [
  { to: "explorar", label: "Explorar", icon: Compass, testid: "nav-explorar" },
  { to: "hoteles", label: "Hoteles", icon: BedDouble, testid: "nav-hoteles" },
  { to: "experiencias", label: "Experiencias", icon: Sparkles, testid: "nav-experiencias" },
  { to: "memorias", label: "Memorias", icon: Heart, testid: "nav-memorias" },
];

const useActive = () => {
  const [active, setActive] = useState("explorar");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    links.forEach(({ to }) => {
      const el = document.getElementById(to);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
};

export const Navbar = () => {
  const active = useActive();
  const [open, setOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -40, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      data-testid="main-navbar"
      className="fixed left-1/2 top-4 z-50 w-[min(96%,1180px)]"
    >
      <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white/85 px-4 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(17,24,39,0.06)] sm:px-6">
        <a href="#explorar" data-testid="nav-logo" className="group flex items-center gap-2">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-[#FF6B2B] shadow-[0_6px_20px_rgba(255,107,43,0.35)]">
            <span className="absolute inset-[3px] rounded-[10px] border border-white/40" />
            <span className="font-[Outfit] text-sm font-black text-white">E</span>
          </span>
          <span className="font-[Outfit] text-xl font-black tracking-[0.18em] text-[#FF6B2B] transition-all group-hover:tracking-[0.22em]">
            EXPLORA
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = active === l.to;
            return (
              <a
                key={l.to}
                href={`#${l.to}`}
                data-testid={l.testid}
                className={`relative flex items-center gap-2 rounded-xl px-3 py-2 font-[Manrope] text-sm font-medium transition-all duration-300 ${
                  isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <l.icon className="h-4 w-4" strokeWidth={1.7} />
                <span>{l.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-[#FF6B2B] shadow-[0_0_8px_rgba(255,107,43,0.55)]"
                  />
                )}
              </a>
            );
          })}
        </div>

        <a
          href="#hoteles"
          data-testid="nav-cta"
          className="hidden rounded-xl bg-[#FF6B2B] px-4 py-2 font-[Manrope] text-sm font-semibold text-white shadow-[0_6px_18px_rgba(255,107,43,0.3)] transition-all hover:bg-[#E55A1F] hover:scale-[1.04] sm:inline-block"
        >
          Reservar
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          data-testid="nav-hamburger"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-md md:hidden"
          data-testid="mobile-menu"
        >
          {links.map((l) => (
            <a
              key={l.to}
              href={`#${l.to}`}
              onClick={() => setOpen(false)}
              data-testid={`${l.testid}-mobile`}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 font-[Manrope] text-sm transition-colors ${
                active === l.to
                  ? "bg-orange-50 text-[#FF6B2B]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <l.icon className="h-4 w-4" /> {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};
export default Navbar;