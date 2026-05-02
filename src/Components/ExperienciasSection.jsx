import { motion } from "framer-motion";
import { Compass, Utensils, Heart, Mountain, Wine, Music } from "lucide-react";
import { experiences } from "../data/mockData";

const iconByCategory = {
  Aventura: Mountain,
  Gastronomía: Utensils,
  Wellness: Heart,
  Cultura: Wine,
  Vida: Music,
};

export const ExperienciasSection = () => {
  return (
    <section
      id="experiencias"
      data-testid="section-experiencias"
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
            Experiencias
            <span className="absolute -bottom-2 left-0 h-1 w-2/3 rounded-full bg-gradient-to-r from-[#FF6B2B] to-transparent" />
          </h2>
          <p className="mt-5 max-w-2xl font-[Manrope] text-base text-gray-600">
            Momentos que trascienden el viaje
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[260px]">
          {experiences.map((e, i) => {
            const Icon = iconByCategory[e.category] || Compass;
            const span =
              e.span === "large"
                ? "lg:col-span-2 lg:row-span-2"
                : "lg:col-span-1 lg:row-span-1";
            return (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                data-testid={`experience-${e.id}`}
                className={`group relative overflow-hidden rounded-2xl border border-gray-200 shadow-md ${span} ${
                  e.span !== "large" ? "min-h-[260px]" : "min-h-[300px]"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.06]"
                  style={{ backgroundImage: `url(${e.image})` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/5" />

                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/40 bg-white/85 text-[#FF6B2B] backdrop-blur-md">
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                </div>
                <span className="absolute right-4 top-4 rounded-full border border-white/40 bg-white/85 px-3 py-1 font-[Manrope] text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-700 backdrop-blur-md">
                  {e.duration}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3
                    className={`font-[Outfit] font-bold leading-tight text-white ${
                      e.span === "large" ? "text-3xl" : "text-xl"
                    }`}
                  >
                    {e.title}
                  </h3>
                  <p className="mt-1 font-[Manrope] text-sm text-white/85">
                    {e.location}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-[Outfit] text-lg font-bold text-[#FFB07A]">
                      ${e.price.toLocaleString()}
                    </span>
                    <button
                      data-testid={`experience-cta-${e.id}`}
                      className="rounded-xl border border-white/30 bg-white/15 px-4 py-2 font-[Manrope] text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-gray-900"
                    >
                      Descubrir
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienciasSection;