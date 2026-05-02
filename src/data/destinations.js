// Mocked luxury travel destinations for EXPLORA
// Each destination contains coordinates, a hero image, hotel info, rating,
// and a real YouTube 360° tour video ID.

export const destinations = [
  {
    id: "santorini",
    name: "Santorini",
    country: "Grecia",
    lat: 36.3932,
    lng: 25.4615,
    hotel: "Canaves Oia Suites",
    rating: 4.9,
    price: 1240,
    description:
      "Acantilados blancos suspendidos sobre el Egeo. Atardeceres de cobre y suites talladas en la caldera.",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1600&q=80",
    youtubeId: "VrwsBGXDuJk",
    tags: ["Romántico", "Mar Egeo", "Caldera"],
  },
  {
    id: "kyoto",
    name: "Kioto",
    country: "Japón",
    lat: 35.0116,
    lng: 135.7681,
    hotel: "Aman Kyoto",
    rating: 4.95,
    price: 1890,
    description:
      "Templos centenarios, jardines de musgo y un ryokan moderno escondido entre cerezos silvestres.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80",
    youtubeId: "QouQSWqHRnk",
    tags: ["Cultural", "Zen", "Sakura"],
  },
  {
    id: "maldivas",
    name: "Maldivas",
    country: "Maldivas",
    lat: 3.2028,
    lng: 73.2207,
    hotel: "Soneva Jani",
    rating: 4.97,
    price: 2450,
    description:
      "Villas sobre agua turquesa, toboganes al océano y cielos sin contaminación lumínica.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
    youtubeId: "1La4QzGeaaQ",
    tags: ["Overwater", "Buceo", "Estrellas"],
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Marruecos",
    lat: 31.6295,
    lng: -7.9811,
    hotel: "Royal Mansour",
    rating: 4.88,
    price: 1320,
    description:
      "Riads dorados, zocos perfumados y patios con fuentes de mosaico bajo palmeras.",
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c5cdfd?auto=format&fit=crop&w=1600&q=80",
    youtubeId: "dDTqf3KiBb8",
    tags: ["Desierto", "Arquitectura", "Spa"],
  },
  {
    id: "patagonia",
    name: "Patagonia",
    country: "Chile",
    lat: -50.9423,
    lng: -73.4068,
    hotel: "Tierra Patagonia",
    rating: 4.86,
    price: 1680,
    description:
      "Glaciares, vientos y cumbres de granito. Un refugio de lujo a la sombra del Paine.",
    image:
      "https://images.unsplash.com/photo-1531722596126-77f5d39ec07d?auto=format&fit=crop&w=1600&q=80",
    youtubeId: "qopMpL7HCfA",
    tags: ["Aventura", "Glaciares", "Trekking"],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    lat: -8.4095,
    lng: 115.1889,
    hotel: "Capella Ubud",
    rating: 4.91,
    price: 1430,
    description:
      "Tiendas de safari de lujo entre arrozales esmeralda y selva tropical.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    youtubeId: "85S6UkSrQCM",
    tags: ["Selva", "Wellness", "Templos"],
  },
  {
    id: "dubai",
    name: "Dubái",
    country: "EAU",
    lat: 25.2048,
    lng: 55.2708,
    hotel: "Burj Al Arab Jumeirah",
    rating: 4.92,
    price: 2100,
    description:
      "El icónico velero de oro y mármol con suites duplex sobre el Golfo Pérsico.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    youtubeId: "GqQ5vC8q9Vc",
    tags: ["Skyline", "Lujo", "Desierto"],
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    country: "Perú",
    lat: -13.1631,
    lng: -72.545,
    hotel: "Sanctuary Lodge",
    rating: 4.85,
    price: 1180,
    description:
      "Despertarse al pie de la ciudadela inca, antes que llegue el primer turista.",
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=80",
    youtubeId: "WdjJ6gOzkMs",
    tags: ["Histórico", "Andes", "Inca"],
  },
  {
    id: "islandia",
    name: "Islandia",
    country: "Islandia",
    lat: 64.9631,
    lng: -19.0208,
    hotel: "Deplar Farm",
    rating: 4.89,
    price: 1990,
    description:
      "Auroras boreales, baños geotermales y heli-ski en una granja remota del norte.",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&q=80",
    youtubeId: "Vz9KFKXOXRE",
    tags: ["Aurora", "Volcán", "Geotermal"],
  },
  {
    id: "paris",
    name: "París",
    country: "Francia",
    lat: 48.8566,
    lng: 2.3522,
    hotel: "Ritz Paris",
    rating: 4.94,
    price: 1750,
    description:
      "La leyenda de la Place Vendôme. Suites Coco Chanel y bar Hemingway.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    youtubeId: "sUWP-SEmxGU",
    tags: ["Romance", "Couture", "Sena"],
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "Nueva Zelanda",
    lat: -45.0312,
    lng: 168.6626,
    hotel: "Matakauri Lodge",
    rating: 4.87,
    price: 1560,
    description:
      "Lago alpino y picos nevados. Adrenalina y silencio en la misma postal.",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    youtubeId: "L_LUpnjgPso",
    tags: ["Aventura", "Lago", "Alpino"],
  },
  {
    id: "ciudad-cabo",
    name: "Cape Town",
    country: "Sudáfrica",
    lat: -33.9249,
    lng: 18.4241,
    hotel: "Ellerman House",
    rating: 4.9,
    price: 1410,
    description:
      "Mansión de coleccionista frente al Atlántico, con vista a Lion's Head.",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1600&q=80",
    youtubeId: "tbf3SvWqf8E",
    tags: ["Costa", "Safari", "Vinos"],
  },
];

// Lightweight points fed to react-globe.gl
export const globePoints = destinations.map((d) => ({
  id: d.id,
  name: d.name,
  country: d.country,
  lat: d.lat,
  lng: d.lng,
  size: 0.6,
}));

export function findDestinationById(id) {
  return destinations.find((d) => d.id === id);
}

// Find the nearest mocked destination to a [lat, lng] returned by geocoder.
// We snap to closest known destination when within ~600km, otherwise return null
// so the UI shows a generic discovery card.
export function findNearestDestination(lat, lng, maxKm = 600) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  let best = null;
  let bestDist = Infinity;
  for (const d of destinations) {
    const dLat = toRad(d.lat - lat);
    const dLng = toRad(d.lng - lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat)) * Math.cos(toRad(d.lat)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;
    if (dist < bestDist) {
      bestDist = dist;
      best = d;
    }
  }
  return bestDist <= maxKm ? best : null;
}
