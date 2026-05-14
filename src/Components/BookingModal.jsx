import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Calendar, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const BookingModal = ({ open, destination, onClose }) => {
  const [step, setStep] = useState("form"); // form | success
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(5);

  const reset = () => {
    setStep("form");
    setGuests(2);
    setNights(5);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep("success");
    toast.success("¡Reserva confirmada!");
  };

  return (
    <AnimatePresence onExitComplete={reset}>
      {open && destination && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="booking-modal"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_30px_80px_rgba(17,24,39,0.2)]"
          >
            <button
              onClick={onClose}
              data-testid="close-booking"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
            </button>

            {step === "form" ? (
              <form onSubmit={handleSubmit} className="space-y-5 p-6">
                <div>
                  <div className="font-[Manrope] text-[11px] uppercase tracking-[0.22em] text-[#FF6B2B]">
                    Reserva privada
                  </div>
                  <h3 className="font-[Outfit] text-2xl font-bold text-gray-900">
                    {destination.hotel}
                  </h3>
                  <p className="font-[Manrope] text-sm text-gray-500">
                    {destination.name}, {destination.country}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="space-y-1.5 rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center gap-1.5 font-[Manrope] text-[10px] uppercase tracking-[0.16em] text-gray-500">
                      <Calendar className="h-3 w-3" /> Noches
                    </div>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                      data-testid="booking-nights"
                      className="w-full bg-transparent font-[Outfit] text-2xl font-bold text-gray-900 focus:outline-none"
                    />
                  </label>
                  <label className="space-y-1.5 rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center gap-1.5 font-[Manrope] text-[10px] uppercase tracking-[0.16em] text-gray-500">
                      <Users className="h-3 w-3" /> Huéspedes
                    </div>
                    <input
                      type="number"
                      min={1}
                      max={8}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      data-testid="booking-guests"
                      className="w-full bg-transparent font-[Outfit] text-2xl font-bold text-gray-900 focus:outline-none"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div className="font-[Manrope] text-sm text-gray-600">
                    Total estimado
                  </div>
                  <div className="font-[Outfit] text-2xl font-bold text-[#FF6B2B]">
                    ${(destination.price * nights).toLocaleString()}
                  </div>
                </div>

                <button
                  type="submit"
                  data-testid="confirm-booking"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B2B] px-4 py-3 font-[Manrope] text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,107,43,0.35)] transition-all hover:bg-[#E55A1F] hover:scale-[1.02]"
                >
                  <Sparkles className="h-4 w-4" /> Confirmar reserva
                </button>
              </form>
            ) : (
              <div
                data-testid="booking-success"
                className="flex flex-col items-center gap-4 p-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B2B] shadow-[0_10px_30px_rgba(255,107,43,0.35)]">
                  <Check className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="font-[Outfit] text-2xl font-bold text-gray-900">
                    ¡Tu viaje está reservado!
                  </h3>
                  <p className="mt-1 font-[Manrope] text-sm text-gray-600">
                    {nights} noches en {destination.hotel} para {guests}{" "}
                    huéspedes. Te enviamos los detalles a tu email.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 font-[Manrope] text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Cerrar
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};