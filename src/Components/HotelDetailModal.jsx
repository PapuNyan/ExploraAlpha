import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Star, Wifi, Waves, Utensils, Car, Coffee, ShieldCheck, Dumbbell } from "lucide-react";

import { hotels } from "../data/mockData";
import { Tour360Modal } from "./Tour360Modal";
import { BookingModal } from "./BookingModal";
import TourElim from "./TourElim"; 

const getAmenityIcon = (name) => {
  const iconMap = {
    wifi: { icon: <Wifi size={20} />, label: "Wi-Fi" },
    alberca: { icon: <Waves size={20} />, label: "Alberca" },
    restaurante: { icon: <Utensils size={20} />, label: "Restaurante" },
    spa: { icon: <Star size={20} />, label: "Spa" },
    gimnasio: { icon: <Dumbbell size={20} />, label: "Gimnasio" },
    estacionamiento: { icon: <Car size={20} />, label: "Estacionamiento" },
    seguridad: { icon: <ShieldCheck size={20} />, label: "Seguridad" }
  };
  const data = iconMap[name.toLowerCase()] || { icon: <Star size={20} />, label: name };
  return data.icon;
};

export const HotelDetailModal = ({ hotel: initialHotel, open, onClose }) => {
  const [tourOpen, setTourOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Descripción');
  const [activeImg, setActiveImg] = useState(null);

  const hotel = hotels.find(h => h.id === initialHotel?.id) || initialHotel;

  useEffect(() => {
    if (hotel) setActiveImg(hotel.image);
  }, [hotel]);

  if (!hotel) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm overflow-y-auto pt-10"
          onClick={onClose}
        >
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }}
            className="relative mx-auto mb-20 w-[95%] max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute right-6 top-6 z-20 bg-white/80 backdrop-blur-md p-3 rounded-full hover:bg-white transition-all">
              <X size={24} className="text-gray-800" />
            </button>

            {/* IMAGEN PRINCIPAL */}
            <div className="h-[400px] w-full overflow-hidden bg-gray-100 relative">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImg}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  src={activeImg || hotel.image} 
                  className="h-full w-full object-cover" 
                  alt={hotel.name} 
                />
              </AnimatePresence>
            </div>

            <div className="p-10">
              
              {/* SECCIÓN DE HIGHLIGHTS  */}
<div className="flex gap-6 overflow-x-auto pb-8 mb-4 no-scrollbar">
  {hotel.highlights?.map((item, idx) => (
    <button 
      key={idx}
      onClick={() => setActiveImg(item.image || item.img || item.url)} // Intenta diferentes nombres de propiedad
      className="flex-shrink-0 group flex flex-col items-center gap-3"
    >
      <div className={`w-20 h-20 rounded-full p-1 border-2 transition-all duration-300 ${
        (activeImg === item.image || activeImg === item.img) 
        ? 'border-[#FF6B2B] scale-110 shadow-lg' 
        : 'border-transparent group-hover:border-gray-200'
      }`}>
        <img 
          src={item.image || item.img || item.url} 
          className="w-full h-full object-cover rounded-full bg-gray-200" 
          alt={item.title}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Error'; }} // Imagen de error si no carga
        />
      </div>
      <span className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${
        (activeImg === item.image || activeImg === item.img) ? 'text-[#FF6B2B]' : 'text-gray-400'
      }`}>
        {item.title}
      </span>
    </button>
  ))}
</div>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-5xl font-black text-gray-900">{hotel.name}</h2>
                  <p className="flex items-center gap-2 text-gray-500 mt-2 text-lg">
                    <MapPin size={20} className="text-[#FF6B2B]" /> {hotel.location}
                  </p>
                </div>
                <div className="bg-orange-50 px-5 py-2 rounded-2xl flex items-center gap-2 border border-orange-100">
                  <Star className="fill-[#FF6B2B] text-[#FF6B2B]" size={22} />
                  <span className="text-xl font-bold text-[#FF6B2B]">{hotel.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t pt-10">
                <div className="lg:col-span-2">
                  <div className="flex gap-8 border-b border-gray-100 mb-8">
                    {['Descripción', 'Amenidades', 'Ubicación'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-lg font-bold transition-all relative ${
                          activeTab === tab ? 'text-[#FF6B2B]' : 'text-gray-400'
                        }`}
                      >
                        {tab}
                        {activeTab === tab && (
                          <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF6B2B] rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="min-h-[250px]"
                    >
                      {activeTab === 'Descripción' && (
                        <p className="text-gray-600 text-lg leading-relaxed">{hotel.description}</p>
                      )}

                      {activeTab === 'Amenidades' && (
                        <div className="grid grid-cols-2 gap-4">
                          {hotel.amenities?.map((am) => (
                            <div key={am} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#FF6B2B]">
                                {getAmenityIcon(am)}
                              </div>
                              <span className="font-bold text-gray-700 capitalize">{am}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'Ubicación' && (
                        <div className="space-y-4">
                          <div className="w-full h-[350px] bg-slate-100 rounded-[32px] overflow-hidden relative border-4 border-white shadow-xl">
                            <TourElim 
                              lat={hotel.coords?.lat} 
                              lng={hotel.coords?.lng} 
                            />
                          </div>
                          <div className="flex justify-between items-center p-4 bg-orange-50 rounded-2xl border border-orange-100">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-orange-900 font-bold text-sm">Ubicación GPS Confirmada</span>
                            </div>
                            <code className="text-[#FF6B2B] font-mono font-bold bg-white px-3 py-1 rounded-lg shadow-sm text-xs">
                              {hotel.coords?.lat}, {hotel.coords?.lng}
                            </code>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 h-fit sticky top-4">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Precio estimado</span>
                  <div className="flex items-baseline gap-1 mt-1 mb-8">
                    <span className="text-4xl font-black text-[#FF6B2B]">${hotel.price}</span>
                    <span className="text-gray-500 font-medium">/ noche</span>
                  </div>
                  <button onClick={() => setBookOpen(true)} className="w-full bg-[#FF6B2B] text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-orange-200 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Reservar Ahora
                  </button>
                  <p className="text-center text-gray-400 text-xs mt-4 font-medium">No se te cobrará nada todavía</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <Tour360Modal open={tourOpen} destination={hotel} onClose={() => setTourOpen(false)} />
      <BookingModal open={bookOpen} destination={hotel} onClose={() => setBookOpen(false)} />
    </AnimatePresence>
  );
};