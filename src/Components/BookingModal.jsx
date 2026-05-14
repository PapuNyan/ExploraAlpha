import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Calendar, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import es from "date-fns/locale/es"; // Importación del idioma

registerLocale("es", es); // Registro obligatorio del idioma

export const BookingModal = ({ open, destination, onClose }) => {
  const [step, setStep] = useState("form");
  const [guests, setGuests] = useState(2);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const nights = endDate ? differenceInDays(endDate, startDate) : 0;

  const reset = () => {
    setStep("form");
    setGuests(2);
    setStartDate(new Date());
    setEndDate(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!endDate) {
      toast.error("Por favor selecciona una fecha de salida");
      return;
    }
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-[32px] border border-gray-100 bg-white shadow-2xl overflow-visible"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-orange-50 hover:text-[#FF6B2B]"
            >
              <X className="h-5 w-5" />
            </button>

            {step === "form" ? (
              <form onSubmit={handleSubmit} className="space-y-6 p-8">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] font-black text-[#FF6B2B] mb-1">
                    Reserva tu estancia
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">{destination.location}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                    <Calendar size={14} /> Selecciona tus fechas
                  </div>
                  <div className="flex justify-center bg-gray-50 rounded-2xl p-2 border border-gray-100">
                    <DatePicker
                      selected={startDate}
                      onChange={(dates) => {
                        const [start, end] = dates;
                        setStartDate(start);
                        setEndDate(end);
                      }}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      minDate={new Date()}
                      inline
                      locale="es" // Forzado a español
                      calendarClassName="modern-calendar"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1">
                      <Users size={12} /> Huéspedes
                    </div>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-transparent text-xl font-black text-gray-800 focus:outline-none"
                    />
                  </div>
                  <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                    <div className="text-[10px] uppercase font-bold text-[#FF6B2B] mb-1">Total</div>
                    <div className="text-xl font-black text-[#FF6B2B]">
                      ${(destination.price * (nights || 1)).toLocaleString()}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF6B2B] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-orange-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} /> Confirmar {nights} noches
                </button>
              </form>
            ) : (
              <div className="p-10 text-center flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-[#FF6B2B] rounded-full flex items-center justify-center shadow-lg shadow-orange-200">
                  <Check size={40} className="text-white" strokeWidth={4} />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-gray-900">¡Todo listo!</h3>
                  <p className="text-gray-500 mt-2 leading-relaxed">
                    Tu viaje a <strong>{destination.name}</strong> ha sido reservado con éxito.
                  </p>
                </div>
                <button onClick={onClose} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold">
                  Excelente
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};