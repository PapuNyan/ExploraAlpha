import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  MapPin,
  Wifi,
  Waves,
  Utensils,
  Dumbbell,
  Car,
  Sparkles,
  View,
  MessageCircle,
} from "lucide-react";
import { reviewsByHotel } from "../data/mockData";
import { Tour360Modal } from "./Tour360Modal";
import { BookingModal } from "./BookingModal";

const amenityMap = {
  wifi: { Icon: Wifi, label: "Wi-Fi" },
  pool: { Icon: Waves, label: "Piscina" },
  restaurant: { Icon: Utensils, label: "Restaurante" },
  spa: { Icon: Sparkles, label: "Spa" },
  gym: { Icon: Dumbbell, label: "Gimnasio" },
  parking: { Icon: Car, label: "Estacionamiento" },
};

const TABS = [
  { id: "desc", label: "Descripción" },
  { id: "amen", label: "Amenidades" },
  { id: "ubic", label: "Ubicación" },
  { id: "rev", label: "Reseñas" },
];

export const HotelDetailModal = ({ hotel, open, onClose, initialAction }) => {
  const [tab, setTab] = useState("desc");
  const [activeMedia, setActiveMedia] = useState(0);
  const [tourOpen, setTourOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setTab("desc");
      setActiveMedia(0);
      setTourOpen(false);
      setBookOpen(initialAction === "book");
    }
  }, [open, initialAction, hotel?.id]);

  const reviews = reviewsByHotel.default;
  const media = hotel ? [hotel.image, ...hotel.gallery] : [];

  const adapted = hotel
    ? { ...hotel, hotel: hotel.name, country: hotel.location }
    : null;

  return (
    <AnimatePresence>
      {open && hotel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="hotel-detail-modal"
          className="fixed inset-0 z-[55] overflow-y-auto bg-black/40 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto my-6 w-[min(96vw,1100px)] overflow-hidden rounded-2xl border border-gray-200 bg-white pb-24 shadow-[0_30px_80px_rgba(17,24,39,0.18)]"
          >
            <button
              onClick={onClose}
              data-testid="close-hotel-detail"
              className="fixed right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-50"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative">
              <div
                className="aspect-[16/9] w-full bg-cover bg-center transition-all duration-500"
                style={{ backgroundImage: `url(${media[activeMedia]})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <button
                onClick={() => setTourOpen(true)}
                data-testid="hotel-360-cta"
                className="absolute bottom-6 right-6 flex items-center gap-2 rounded-xl bg-[#FF6B2B] px-4 py-2.5 font-[Manrope] text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,107,43,0.4)] transition-all hover:bg-[#E55A1F]"
              >
                <View className="h-4 w-4" /> Ver Tour 360°
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto px-6 py-3">
              {media.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMedia(i)}
                  data-testid={`hotel-thumb-${i}`}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    i === activeMedia
                      ? "border-[#FF6B2B]"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  style={{
                    backgroundImage: `url(${m})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </div>

            <div className="border-b border-gray-200 px-6 pb-5 pt-2">
              <div className="font-[Manrope] text-[11px] uppercase tracking-[0.2em] text-[#FF6B2B]">
                {hotel.category}
              </div>
              <h2 className="font-[Outfit] text-3xl font-black text-gray-900 sm:text-4xl">
                {hotel.name}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-3 font-[Manrope] text-sm">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <MapPin className="h-3.5 w-3.5" /> {hotel.location}
                </span>
                <span className="flex items-center gap-1 text-gray-900">
                  <Star className="h-3.5 w-3.5 fill-[#FF6B2B] text-[#FF6B2B]" />
                  {hotel.rating.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-1 overflow-x-auto border-b border-gray-200 px-4">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  data-testid={`hotel-tab-${t.id}`}
                  className={`relative shrink-0 px-4 py-3 font-[Manrope] text-sm font-semibold transition-colors ${
                    tab === t.id ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {t.label}
                  {tab === t.id && (
                    <motion.span
                      layoutId="hotel-tab-line"
                      className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-[#FF6B2B]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[180px] px-6 py-6">
              {tab === "desc" && (
                <p className="font-[Manrope] text-base leading-relaxed text-gray-700">
                  {hotel.description}
                </p>
              )}
              {tab === "amen" && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {hotel.amenities.map((a) => {
                    const meta = amenityMap[a];
                    if (!meta) return null;
                    return (
                      <div
                        key={a}
                        className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4"
                      >
                        <meta.Icon className="h-5 w-5 text-[#FF6B2B]" />
                        <span className="font-[Manrope] text-sm font-medium text-gray-900">
                          {meta.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              {tab === "ubic" && (
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <iframe
                    title="map"
                    className="h-[280px] w-full"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                      hotel.coords.lng - 0.05
                    }%2C${hotel.coords.lat - 0.05}%2C${
                      hotel.coords.lng + 0.05
                    }%2C${hotel.coords.lat + 0.05}&layer=mapnik&marker=${
                      hotel.coords.lat
                    }%2C${hotel.coords.lng}`}
                  />
                </div>
              )}
              {tab === "rev" && (
                <div className="space-y-3">
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={r.avatar}
                          alt={r.author}
                          className="h-10 w-10 rounded-full border border-gray-200"
                        />
                        <div className="flex-1">
                          <div className="font-[Manrope] text-sm font-semibold text-gray-900">
                            {r.author}
                          </div>
                          <div className="font-[Manrope] text-xs text-gray-500">
                            {r.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < r.rating
                                  ? "fill-[#FF6B2B] text-[#FF6B2B]"
                                  : "text-[#FF6B2B]/25"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 font-[Manrope] text-sm leading-relaxed text-gray-700">
                        {r.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-x-0 bottom-0 z-[56] border-t border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-xl shadow-[0_-8px_30px_rgba(17,24,39,0.06)]"
          >
            <div className="mx-auto flex w-[min(96vw,1100px)] items-center gap-3">
              <div className="flex-1">
                <div className="font-[Manrope] text-[10px] uppercase tracking-[0.18em] text-gray-500">
                  Por noche
                </div>
                <div className="font-[Outfit] text-xl font-bold text-[#FF6B2B]">
                  ${hotel.price.toLocaleString()}
                </div>
              </div>
              
              <a
                href={`https://wa.me/525555555555?text=Quiero%20info%20sobre%20${encodeURIComponent(hotel.name)}`}
                target="_blank"
                rel="noreferrer"
                data-testid="hotel-whatsapp"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#25D366] transition-colors hover:bg-gray-50"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <button
                onClick={() => setBookOpen(true)}
                data-testid="hotel-book-now"
                className="flex-[2] rounded-xl bg-[#FF6B2B] px-6 py-3 font-[Manrope] text-sm font-bold text-white shadow-[0_10px_30px_rgba(255,107,43,0.35)] transition-all hover:bg-[#E55A1F]"
              >
                Reservar Ahora
              </button>
            </div>
          </div>

          <Tour360Modal
            open={tourOpen}
            destination={adapted}
            onClose={() => setTourOpen(false)}
          />
          <BookingModal
            open={bookOpen}
            destination={adapted}
            onClose={() => setBookOpen(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HotelDetailModal;
