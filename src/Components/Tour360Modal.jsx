import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const Tour360Modal = ({ open, destination, onClose }) => {
  return (
    <AnimatePresence>
      {open && destination && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="tour-360-modal"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-[#7B4FD4]/35 bg-[#150B33]/85 backdrop-blur-2xl shadow-[0_40px_120px_rgba(45,27,105,0.65)]"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              data-testid="close-tour-360"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/80"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-[#7B4FD4]/25 px-6 py-4">
              <div className="font-[Manrope] text-[11px] uppercase tracking-[0.22em] text-[#FF8F4D]">
                Tour Inmersivo 360°
              </div>
              <div className="font-[Outfit] text-2xl font-bold text-white">
                {destination.name}
                <span className="ml-2 text-[#E8E0FF]/60">·</span>
                <span className="ml-2 font-medium text-[#E8E0FF]/80 text-base">
                  {destination.hotel}
                </span>
              </div>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                key={destination.id}
                title={`Tour 360 ${destination.name}`}
                src={`https://www.youtube.com/embed/${destination.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
