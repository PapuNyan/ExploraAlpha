import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";

/**
 * Glassmorphism search bar that geocodes through OpenStreetMap Nominatim
 * (no key required) and reports the resulting coordinates upward.
 */
export const SearchBar = ({ onResult, suggestions = [] }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearch = async (q) => {
    const query = (q ?? value).trim();
    if (!query) return;
    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
        query
      )}`;
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        onResult?.({
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          label: display_name,
          query,
        });
      } else {
        toast.error("No encontramos ese destino. Probá con otro nombre.");
      }
    } catch (e) {
      toast.error("Hubo un problema con la búsqueda.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = suggestions
    .filter((s) =>
      `${s.name} ${s.country}`.toLowerCase().includes(value.toLowerCase())
    )
    .slice(0, 5);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      data-testid="search-container"
      className="relative w-[min(92vw,640px)]"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
          setOpen(false);
        }}
        className="group flex items-center gap-2 rounded-2xl border border-[#7B4FD4]/40 bg-[#1A0F3D]/55 p-2 pl-5 backdrop-blur-xl shadow-[0_20px_60px_rgba(45,27,105,0.55)] transition-all focus-within:border-[#FF6B2B]/60 focus-within:shadow-[0_24px_80px_rgba(255,107,43,0.25)]"
      >
        <Search className="h-5 w-5 shrink-0 text-[#E8E0FF]/70" strokeWidth={1.7} />
        <input
          data-testid="search-input"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Descubre tu próximo destino..."
          className="flex-1 bg-transparent font-[Manrope] text-base text-white placeholder:text-[#E8E0FF]/50 focus:outline-none"
        />
        <button
          type="submit"
          data-testid="search-submit"
          disabled={loading}
          className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B2B] to-[#FF8F4D] px-4 font-[Manrope] text-sm font-semibold text-[#1A0B33] shadow-[0_0_24px_rgba(255,107,43,0.5)] transition-transform hover:scale-[1.04] disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" strokeWidth={2.2} />
          )}
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </form>

      {open && value && filtered.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          data-testid="search-suggestions"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-[#7B4FD4]/30 bg-[#150B33]/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(45,27,105,0.55)]"
        >
          {filtered.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                data-testid={`suggestion-${s.id}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setValue(s.name);
                  setOpen(false);
                  onResult?.({
                    lat: s.lat,
                    lng: s.lng,
                    label: `${s.name}, ${s.country}`,
                    query: s.name,
                    matchedId: s.id,
                  });
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left font-[Manrope] text-sm text-[#E8E0FF] transition-colors hover:bg-[#4A2C8F]/40"
              >
                <MapPin className="h-4 w-4 text-[#FF8F4D]" />
                <span className="font-medium text-white">{s.name}</span>
                <span className="text-[#E8E0FF]/60">· {s.country}</span>
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};
