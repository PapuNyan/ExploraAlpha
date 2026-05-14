import { useState } from "react"; // Quitamos el prefijo React. de abajo
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Camera, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { initialMemories } from "../data/mockData";

const aspectClass = {
  "16/10": "aspect-[16/10]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "2/3": "aspect-[2/3]",
  "4/5": "aspect-[4/5]",
};

const formatLikes = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`);

// Componente de Highlights estilo Instagram
const Highlights = () => {
  const stories = [
    { title: "Alberca", img: "/CABAÑAMEDIO.jpg" },
    { title: "Cuartos", img: "/CUARTOTERRA.jpg" },
    { title: "Fachada", img: "/hotelElim.png" },
    { title: "Cabañas", img: "/CABAÑADEDO.jpg" },
    { title: "Boketto", img: "/hotelBoketto.jpg" },
  ];

  return (
    <div className="flex gap-6 overflow-x-auto py-6 no-scrollbar mb-10 border-b border-gray-100">
      {stories.map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-2 flex-none cursor-pointer group">
          <div className="h-20 w-20 rounded-full p-[3px] bg-gradient-to-tr from-[#FF6B2B] to-[#FFB07A] transition-transform group-hover:scale-110">
            <div className="h-full w-full rounded-full border-2 border-white overflow-hidden bg-gray-200">
              <img src={s.img} alt={s.title} className="h-full w-full object-cover" />
            </div>
          </div>
          <span className="text-xs font-bold text-gray-600 font-[Manrope]">{s.title}</span>
        </div>
      ))}
    </div>
  );
};

const FeaturedMemory = ({ m }) => {
  const galeriaElim = ["/hotelElim.png", "/CABAÑADEDO.jpg", "/CABAÑAMEDIO.jpg", "/CUARTOTERRA.jpg"];
  const [index, setIndex] = useState(0); // Corregido: sin el prefijo React.

  const siguiente = (e) => {
    e.stopPropagation();
    setIndex((index + 1) % galeriaElim.length);
  };
  
  const anterior = (e) => {
    e.stopPropagation();
    setIndex((index - 1 + galeriaElim.length) % galeriaElim.length);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md md:grid-cols-2"
    >
      <div className="relative group aspect-[4/3] md:aspect-auto bg-gray-100">
        <div 
          className="h-full w-full bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${galeriaElim[index]})` }}
        />
        
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={anterior} className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white text-gray-800 transition-transform active:scale-90">
            <ChevronLeft size={20} />
          </button>
          <button onClick={siguiente} className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white text-gray-800 transition-transform active:scale-90">
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
          {galeriaElim.map((_, i) => (
            <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all ${i === index ? 'bg-white w-3' : 'bg-white/50'}`} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <img src={m.avatar} alt={m.author} className="h-10 w-10 rounded-full border-2 border-[#FF6B2B]/40" />
          <div>
            <div className="font-[Manrope] text-sm font-semibold text-gray-900">{m.author}</div>
            <div className="font-[Manrope] text-xs text-[#FF6B2B]">{m.handle}</div>
          </div>
        </div>
        <h3 className="font-[Outfit] text-2xl font-black text-gray-900 sm:text-3xl">{m.title}</h3>
        <p className="font-[Manrope] text-sm text-gray-600 leading-relaxed">{m.quote}</p>
        <div className="mt-auto pt-4 flex items-center gap-3">
          <button className="rounded-xl bg-[#FF6B2B] px-6 py-2.5 font-bold text-white shadow-[0_8px_20px_rgba(255,107,43,0.3)] hover:bg-[#E55A1F] transition-all">
            Ver Hotel
          </button>
          <span className="font-[Manrope] text-sm text-gray-500">❤ {formatLikes(m.likes)}</span>
        </div>
      </div>
    </motion.article>
  );
};

const MemoryCard = ({ m, onAbrir }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    onClick={() => onAbrir(m)}
    className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md cursor-pointer"
  >
    <div
      className={`${aspectClass[m.aspect] || "aspect-[4/5]"} w-full bg-cover bg-center`}
      style={{ backgroundImage: `url(${m.image})` }}
    />
    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <div className="flex items-center gap-2">
        <img src={m.avatar} alt={m.author} className="h-7 w-7 rounded-full border border-white/30" />
        <span className="font-[Manrope] text-xs font-semibold text-white">{m.author}</span>
      </div>
      <div className="mt-1.5 flex items-center gap-1 font-[Manrope] text-[11px] text-[#FFB07A]">
        <MapPin className="h-3 w-3" /> {m.location}
      </div>
      <p className="mt-1 line-clamp-2 font-[Manrope] text-xs italic text-white/90">"{m.quote}"</p>
    </div>
  </motion.article>
);

const AddMemoryModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({ title: "", location: "", story: "", tags: "" });
  const [preview, setPreview] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.location) {
      toast.error("Completá título y ubicación.");
      return;
    }
    onSubmit({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      preview,
    });
    setForm({ title: "", location: "", story: "", tags: "" });
    setPreview(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            className="relative w-full max-w-lg space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="font-[Outfit] text-2xl font-bold text-gray-900">Compartí tu historia</h3>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Título"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#FF6B2B] focus:outline-none"
            />
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Ubicación"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#FF6B2B] focus:outline-none"
            />
            <label className="block cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6">
                {preview ? <img src={preview} alt="preview" className="h-32 w-full object-cover rounded-lg" /> : <Camera className="text-[#FF6B2B]" />}
              </div>
            </label>
            <button type="submit" className="w-full rounded-xl bg-[#FF6B2B] py-3 font-bold text-white">Publicar</button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MemoriasSection = ({ onAbrirMemoria }) => {
  const [memories, setMemories] = useState(initialMemories);
  const [open, setOpen] = useState(false);

  const featured = memories.find((m) => m.featured) || memories[0];
  const rest = memories.filter((m) => m.id !== featured.id);

  const handlePublish = (data) => {
    const id = `m-${Date.now()}`;
    setMemories((prev) => [
      {
        id,
        author: "Tú",
        handle: "@nuevoviajero",
        avatar: "https://i.pravatar.cc/96?img=5",
        title: data.title,
        location: data.location,
        quote: data.story || "Nueva historia compartida.",
        image: data.preview || "https://images.unsplash.com/photo-1504542982118-59308b40fe0c?auto=format&fit=crop&w=1000&q=80",
        likes: 0,
        tags: data.tags || ["México"],
        aspect: "4/5",
      },
      ...prev,
    ]); // <--- AQUÍ: Cerramos corchete, luego paréntesis y luego punto y coma.
    
    toast.success("Tu memoria fue publicada");
  };
  return (
    <section id="memorias" className="relative w-full px-4 py-24 sm:px-8 lg:px-16 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="font-[Outfit] text-4xl font-black text-gray-900 sm:text-5xl">Memorias</h2>
          <p className="mt-5 max-w-2xl font-[Manrope] text-base text-gray-600">
            Los momentos que coleccionas. Compartí tus viajes con la comunidad EXPLORA.
          </p>
        </motion.div>

        

        <div className="mb-12">
          <FeaturedMemory m={featured} />
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {rest.map((m) => (
            <MemoryCard key={m.id} m={m} onAbrir={onAbrirMemoria} />
          ))}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B2B] text-white shadow-2xl hover:scale-110 transition-all"
        >
          <Plus size={32} strokeWidth={3} />
        </button>

        <AddMemoryModal open={open} onClose={() => setOpen(false)} onSubmit={handlePublish} />
      </div>
    </section>
  );
};

export default MemoriasSection;