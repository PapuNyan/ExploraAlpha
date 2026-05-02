import { motion, AnimatePresence } from "framer-motion";
import { Star, X, View, Calendar, MapPin } from "lucide-react";

const StarRating = ({ value }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1" data-testid="star-rating">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              filled
                ? "fill-[#FF6B2B] text-[#FF6B2B]"
                : "text-[#FF6B2B]/30"
            }`}
            strokeWidth={1.5}
          />
        );
      })}
      <span className="ml-1 font-[Manrope] text-xs font-semibold text-[#E8E0FF]">
        {value.toFixed(2)}
      </span>
    </div>
  );
};

export const DestinationSheet = ({
  destination,
  open,
  onClose,
  onOpenTour,
  onBook,
}) => {
  return (
    <AnimatePresence>
      {open && destination && (
        <motion.div
          key="sheet"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ type: "spring", damping: 26, stiffness: 240 }}
          data-testid="destination-card"
          className="fixed inset-x-2 bottom-2 z-40 sm:inset-x-4 sm:bottom-4 lg:left-auto lg:right-6 lg:bottom-6 lg:w-[440px]"
        >
          <div className="overflow-hidden rounded-2xl border border-[#7B4FD4]/35 bg-[#150B33]/65 backdrop-blur-2xl shadow-[0_30px_80px_rgba(45,27,105,0.55)]">
            <div
              className="relative h-44 w-full overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(8,11,20,0.05) 0%, rgba(21,11,51,0.85) 100%), url(${destination.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <button
                onClick={onClose}
                data-testid="close-destination"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute left-4 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-[Manrope] text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF8F4D] backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B2B]" />
                Hero video
              </div>
              <div className="absolute bottom-3 left-4 flex items-center gap-1.5 font-[Manrope] text-xs text-white/85">
                <MapPin className="h-3.5 w-3.5" />
                {destination.country}
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  {destination.tags?.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#7B4FD4]/40 bg-[#4A2C8F]/30 px-2.5 py-0.5 font-[Manrope] text-[10px] font-medium uppercase tracking-[0.14em] text-[#E8E0FF]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3
                  data-testid="destination-name"
                  className="font-[Outfit] text-3xl font-bold leading-tight text-white"
                >
                  {destination.name}
                </h3>
                <p className="mt-1 font-[Manrope] text-sm font-medium text-[#FF8F4D]">
                  {destination.hotel}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <StarRating value={destination.rating} />
                <div className="text-right">
                  <div className="font-[Manrope] text-[10px] uppercase tracking-[0.16em] text-[#E8E0FF]/55">
                    desde
                  </div>
                  <div className="font-[Outfit] text-xl font-bold text-white">
                    ${destination.price}
                    <span className="ml-1 text-xs font-medium text-[#E8E0FF]/60">
                      / noche
                    </span>
                  </div>
                </div>
              </div>

              <p className="font-[Manrope] text-sm leading-relaxed text-[#E8E0FF]/80">
                {destination.description}
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={onOpenTour}
                  data-testid="open-tour-360"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#7B4FD4]/45 bg-[#4A2C8F]/30 px-4 py-3 font-[Manrope] text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-[#4A2C8F]/55 hover:shadow-[0_0_24px_rgba(123,79,212,0.45)]"
                >
                  <View className="h-4 w-4" strokeWidth={1.8} />
                  Ver Tour 360°
                </button>
                <button
                  onClick={onBook}
                  data-testid="open-booking"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B2B] to-[#FF8F4D] px-4 py-3 font-[Manrope] text-sm font-semibold text-[#1A0B33] shadow-[0_0_24px_rgba(255,107,43,0.5)] transition-transform hover:scale-[1.03]"
                >
                  <Calendar className="h-4 w-4" strokeWidth={2} />
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
