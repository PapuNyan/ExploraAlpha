import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Heart, Play } from "lucide-react";

export const HotelCard = ({ hotel, onOpen }) => {
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  const handleEnter = () => {
    setHovered(true);
    if (hotel.video && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-testid={`hotel-card-${hotel.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:border-[#FF6B2B]/40 hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${hotel.image})` }}
        />
        {hotel.video && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={hotel.image}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
            src={hotel.video}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

        <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/85 px-3 py-1 font-[Manrope] text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-700 backdrop-blur-md">
          {hotel.category}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setSaved((s) => !s);
          }}
          data-testid={`hotel-save-${hotel.id}`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/85 backdrop-blur-md transition-colors hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              saved ? "fill-[#FF6B2B] text-[#FF6B2B]" : "text-gray-700"
            }`}
            strokeWidth={1.6}
          />
        </button>

        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            hovered ? "opacity-0" : "opacity-90"
          }`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/30 backdrop-blur-md">
            <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-[Outfit] text-xl font-bold leading-tight text-gray-900">
          {hotel.name}
        </h3>
        <div className="flex items-center gap-1.5 font-[Manrope] text-sm text-gray-600">
          <MapPin className="h-3.5 w-3.5" />
          {hotel.location}
        </div>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < Math.round(hotel.rating)
                  ? "fill-[#FF6B2B] text-[#FF6B2B]"
                  : "text-[#FF6B2B]/30"
              }`}
              strokeWidth={1.5}
            />
          ))}
          <span className="font-[Manrope] text-xs font-semibold text-gray-900">
            {hotel.rating.toFixed(2)}
          </span>
        </div>
        <p className="line-clamp-2 font-[Manrope] text-sm text-gray-500">
          {hotel.short}
        </p>
        <div className="mt-1 font-[Manrope] text-base font-bold text-[#FF6B2B]">
          Desde ${hotel.price.toLocaleString()}
          <span className="ml-1 text-xs font-medium text-gray-500">
            /noche
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpen(hotel)}
            data-testid={`hotel-gallery-${hotel.id}`}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 font-[Manrope] text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:border-gray-300"
          >
            Ver Galería
          </button>
          <button
            onClick={() => onOpen(hotel, "book")}
            data-testid={`hotel-reserve-${hotel.id}`}
            className="rounded-xl bg-[#FF6B2B] px-3 py-2.5 font-[Manrope] text-xs font-bold text-white shadow-[0_6px_16px_rgba(255,107,43,0.3)] transition-all hover:bg-[#E55A1F] hover:scale-[1.02]"
          >
            Reservar
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default HotelCard;