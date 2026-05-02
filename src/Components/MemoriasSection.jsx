import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Camera, MapPin } from "lucide-react";
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

const FeaturedMemory = ({ m }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    data-testid={`memory-featured-${m.id}`}
    className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md md:grid-cols-2"
  >
    <div
      className="aspect-[4/3] bg-cover bg-center md:aspect-auto"
      style={{ backgroundImage: `url(${m.image})` }}
    />
    <div className="flex flex-col gap-3 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <img
          src={m.avatar}
          alt={m.author}
          className="h-10 w-10 rounded-full border-2 border-[#FF6B2B]/40"
        />
        <div>
          <div className="font-[Manrope] text-sm font-semibold text-gray-900">
            {m.author}
          </div>
          <div className="font-[Manrope] text-xs text-[#FF6B2B]">{m.handle}</div>
        </div>
      </div>
      <h3 className="font-[Outfit] text-2xl font-black leading-tight text-gray-900 sm:text-3xl">
        {m.title}
      </h3>
      <p className="font-[Manrope] text-sm leading-relaxed text-gray-600">
        {m.quote}
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        {m.tags.map((t) => (
          <span key={t} className="font-[Manrope] text-xs font-semibold text-[#FF6B2B]">
            #{t}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button className="rounded-xl bg-[#FF6B2B] px-5 py-2.5 font-[Manrope] text-sm font-bold text-white shadow-[0_8px_22px_rgba(255,107,43,0.32)] transition-all hover:bg-[#E55A1F]">
          Leer más
        </button>
        <span className="font-[Manrope] text-sm text-gray-500">
          ❤ {formatLikes(m.likes)}
        </span>
      </div>
    </div>
  </motion.article>
);

const MemoryCard = ({ m }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    data-testid={`memory-${m.id}`}
    className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
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
      <div className="mt-2 flex items-center justify-between">
        <span className="font-[Manrope] text-xs text-white">❤ {formatLikes(m.likes)}</span>
        <button className="font-[Manrope] text-[11px] font-semibold text-[#FFB07A] underline-offset-4 hover:underline">
          Ver historia completa
        </button>
      </div>
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
          data-testid="add-memory-modal"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_30px_80px_rgba(17,24,39,0.2)]"
          >
            <button
              type="button"
              onClick={onClose}
              data-testid="close-add-memory"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
            </button>
            <div>
              <div className="font-[Manrope] text-[11px] uppercase tracking-[0.2em] text-[#FF6B2B]">
                Tu memoria
              </div>
              <h3 className="font-[Outfit] text-2xl font-bold text-gray-900">
                Compartí tu historia
              </h3>
            </div>
            <input
              data-testid="memory-title-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Título"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-[Manrope] text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF6B2B]/50 focus:outline-none"
            />
            <input
              data-testid="memory-location-input"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Ubicación"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-[Manrope] text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF6B2B]/50 focus:outline-none"
            />
            <label className="block">
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
                data-testid="memory-file-input"
              />
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors hover:border-[#FF6B2B]/55">
                {preview ? (
                  <img src={preview} alt="preview" className="h-32 w-full rounded-lg object-cover" />
                ) : (
                  <>
                    <Camera className="h-7 w-7 text-[#FF6B2B]" />
                    <span className="font-[Manrope] text-sm text-gray-700">Arrastrá tu foto o video aquí</span>
                    <span className="font-[Manrope] text-xs text-gray-500">o tocá para elegir un archivo</span>
                  </>
                )}
              </div>
            </label>
            <textarea
              data-testid="memory-story-input"
              value={form.story}
              onChange={(e) => setForm({ ...form, story: e.target.value })}
              placeholder="Tu historia..."
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 font-[Manrope] text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF6B2B]/50 focus:outline-none"
            />
            <input
              data-testid="memory-tags-input"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="Tags separados por coma (Veracruz, Playa)"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-[Manrope] text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF6B2B]/50 focus:outline-none"
            />
            <button
              type="submit"
              data-testid="memory-submit"
              className="w-full rounded-xl bg-[#FF6B2B] px-4 py-3 font-[Manrope] text-sm font-bold text-white shadow-[0_10px_28px_rgba(255,107,43,0.32)] transition-all hover:bg-[#E55A1F]"
            >
              Publicar Memoria
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MemoriasSection = () => {
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
        tags: data.tags.length > 0 ? data.tags : ["México"],
        aspect: "4/5",
      },
      ...prev,
    ]);
    toast.success("Tu memoria fue publicada");
  };

  return (
    <section
      id="memorias"
      data-testid="section-memorias"
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
            Memorias
            <span className="absolute -bottom-2 left-0 h-1 w-2/3 rounded-full bg-gradient-to-r from-[#FF6B2B] to-transparent" />
          </h2>
          <p className="mt-5 max-w-2xl font-[Manrope] text-base text-gray-600">
            Los momentos que coleccionas. Compartí tus viajes con la comunidad EXPLORA.
          </p>
        </motion.div>

        <div className="mb-6">
          <FeaturedMemory m={featured} />
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {rest.map((m) => (
            <MemoryCard key={m.id} m={m} />
          ))}
        </div>
      </div>

      <button
        onClick={() => setOpen(true)}
        data-testid="add-memory-fab"
        className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF6B2B] text-white shadow-[0_12px_30px_rgba(255,107,43,0.45)] transition-all hover:bg-[#E55A1F] hover:scale-110 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
        aria-label="Agregar memoria"
      >
        <Plus className="h-6 w-6" strokeWidth={3} />
      </button>

      <AddMemoryModal open={open} onClose={() => setOpen(false)} onSubmit={handlePublish} />
    </section>
  );
};

export default MemoriasSection;