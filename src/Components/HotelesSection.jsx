import { useState } from "react";
import { motion } from "framer-motion";
import { hotels, hotelCategories } from "../data/mockData";
import { HotelCard } from "./HotelCard";
import { HotelDetailModal } from "./HotelDetailModal";

export const HotelesSection = () => {
  const [filter, setFilter] = useState("Todos");
  const [active, setActive] = useState(null);
  const [action, setAction] = useState(null);
  const filtered =
    filter === "Todos" ? hotels : hotels.filter((h) => h.category === filter);
  return (
    <section
      id="hoteles"
      data-testid="section-hoteles"
      className="relative w-full px-4 py-24 sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <h2 className="relative inline-block font-[Outfit] text-4xl font-black text-gray-900 sm:text-5xl">
            Hoteles Destacados
            <span className="absolute -bottom-2 left-0 h-1 w-2/3 rounded-full bg-gradient-to-r from-[#FF6B2B] to-transparent" />
          </h2>
          <p className="mt-5 max-w-2xl font-[Manrope] text-base text-gray-600">
            Experiencias de lujo en destinos únicos
          </p>
        </motion.div>

        <div
          className="-mx-1 mb-8 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible"
          data-testid="hotel-filters"
        >
          {hotelCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-testid={`filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
              className={[
                "shrink-0 rounded-full border px-4 py-2 font-[Manrope] text-sm font-semibold transition-all duration-300",
                filter === c
                  ? "border-transparent bg-[#FF6B2B] text-white shadow-[0_6px_18px_rgba(255,107,43,0.35)]"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50",
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((h) => (
            <HotelCard
              key={h.id}
              hotel={h}
              onOpen={(hotel, act) => {
                setActive(hotel);
                setAction(act || null);
              }}
            />
          ))}
        </div>
      </div>

      <HotelDetailModal
        hotel={active}
        open={!!active}
        initialAction={action}
        onClose={() => {
          setActive(null);
          setAction(null);
        }}
      />
    </section>
  );
};

export default HotelesSection;