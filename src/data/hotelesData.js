// src/data/hotelesData.js

export const BRAND = '#ff6b00';

export const TABS = [
  { id: 'HABITACIONES', icon: '🛏️' },
  { id: 'TOUR',         icon: '🌐' },
  { id: 'MEMORIES',     icon: '📸' },
];

export const ubicaciones = {
  elim: { 
    nombre: "Casa de playa ELIM", 
    lngLat: [-97.31908, 20.99095], 
    precio: "$2,000 MXN", 
    etiqueta: "4.9 ★", 
    reviews: "15 reseñas", 
    subtitulo: "Lugar completo · Tuxpan, Ver.", 
    colorTema: BRAND, 
    marcadorImg: "url('https://res.cloudinary.com/dozdbgz1h/image/upload/v1780546706/hotelElim_eic4a5.png')", 
    imagenPopup: "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780546706/hotelElim_eic4a5.png" 
  },
  boketto: { 
    nombre: "Hotel Boketto", 
    lngLat: [-97.319873, 20.990532], 
    precio: "$2,500 MXN", 
    etiqueta: "Nuevo", 
    reviews: "0 reseñas", 
    subtitulo: "Habitación privada · Tuxpan, Ver.", 
    colorTema: "#FF6B35", 
    marcadorImg: "url('/hotelBoketto.jpg')", 
    imagenPopup: "/hotelBoketto.jpg" 
  }
};

export const bokettoPoly = {
  type: 'FeatureCollection', 
  features: [{ 
    type: 'Feature', 
    geometry: { 
      type: 'Polygon', 
      coordinates: [[ [-97.32002, 20.990538], [-97.319755, 20.990638], [-97.319728, 20.99058], [-97.319747, 20.990569], [-97.319726, 20.990519], [-97.319972, 20.990427], [-97.32002, 20.990538] ]] 
    } 
  }]
};

export const hotelesInfo = {
  elim: {
    nombre: "Casa de playa ELIM",
    ubicacion: "Tuxpan, Veracruz",
    distancia: "9 km del centro",
    narrativa: "Disfruta de una experiencia única frente al mar con acceso privado a la playa y todas las comodidades de un hogar.",
    galeria: [
      "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780545634/CasaElim6_qyz9tq.jpg", 
      "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780546370/CasaElim7_mcaozz.jpg", 
      "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780546466/CasaElim10_xb1dlu.jpg", 
      "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780545642/CasaElim5_olhyxb.jpg", 
      "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780546369/CasaElim9_cic6ep.jpg", 
      "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780546367/CasaElim8_cryssw.jpg", 
      "https://res.cloudinary.com/dozdbgz1h/image/upload/v1779848956/hotelElim_bil5vz.png"
    ],
    colorTema: "#FF6B35",
    rating: "4.9",
    reviews: "15 reseñas",
    habitaciones: [
      { 
        nombre: "Cabaña entrada", precio: "$1,000", capacidad: "2 a 3 personas", 
        descripcion: "Una cabaña acogedora y práctica. Perfecta para parejas que buscan descanso rápido tras un día de playa.", 
        amenidades: ["1 Cama Matrimonial", "Baño privado", "Ventilador", "Acceso rápido"],
        imagen: "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780452121/CABA%C3%91AENTRADA_cpm41q.jpg" 
      },
      { 
        nombre: "Cabaña intermedia", precio: "$1,800", capacidad: "4 personas", 
        descripcion: "Espacio amplio y cómodo en la zona media de la propiedad. Ideal para familias pequeñas.", 
        amenidades: ["2 Camas Matrimoniales", "Baño privado", "Aire Acondicionado", "Pequeña sala"],
        imagen: "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780452113/CABA%C3%91AMEDIO_qf5vkg.jpg" 
      },
      { 
        nombre: "Cabaña brisa de mar", precio: "$1,600", capacidad: "6 personas", 
        descripcion: "Nuestra cabaña de mayor tamaño en un solo nivel. Ofrece gran comodidad y espacio de sobra.", 
        amenidades: ["Cama matrimonial", "Clima", "Tv", "Wc agua caliente", "Wifi", "Acceso a área común"],
        imagen: "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780452119/CABA%C3%91AGRANDE_xs4guu.jpg" 
      },
      { 
        nombre: "Cabaña costa azul", precio: "$3,000", capacidad: "6 a 8 personas", 
        descripcion: "Hermosa estructura de dos niveles con increíbles vistas y separación perfecta de ambientes.", 
        amenidades: ["2 Camas matrimoniales y 1 individual", "Clima", "TV", "Baño propio", "Wifi", "Terraza vista al mar"],
        imagen: "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780452107/CABA%C3%91ADEDOSPISOS_byusbk.jpg" 
      },
      { 
        nombre: "Cuarto con terraza", precio: "$2,600", capacidad: "5 personas", 
        descripcion: "Un rincón íntimo y especial con terraza privada y excelente vista al mar.", 
        amenidades: ["2 Camas matrimoniales y 1 individual", "Baño propio", "Habitación climatizada", "Tv", "Wifi", "Balcón"],
        imagen: "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780452121/CUARTOTERRAZA_ktoyyq.jpg" 
      },
      { 
        nombre: "Casa grande", precio: "$7,500", capacidad: "12 personas ($300 p/p extra)", 
        descripcion: "Toda la comodidad de una casa completa frente a la playa. Ideal para grupos grandes.", 
        amenidades: ["2 Habitaciones (6 matrimoniales)", "Baño propio", "Climatizada", "Tv", "Wifi", "Cocina", "Sala", "Asador"],
        imagen: "https://res.cloudinary.com/dozdbgz1h/image/upload/v1780452120/CASAGRANDE_b1ym8y.jpg" 
      }
    ],
    memorias: [
      { 
        id: 1, titulo: "UNDER SOULS MX", portada: 'https://res.cloudinary.com/dozdbgz1h/image/upload/v1780545634/CasaElim6_qyz9tq.jpg',
        contenido: [{ 
            tipo: "img", url: 'https://res.cloudinary.com/dozdbgz1h/image/upload/v1780545634/CasaElim6_qyz9tq.jpg' }, 
          { tipo: "video", url: 'https://res.cloudinary.com/dozdbgz1h/video/upload/v1780546161/UnderSoulsMX3_i6j8ki.mp4' }, 
          { tipo: "video", url: 'https://res.cloudinary.com/dozdbgz1h/video/upload/v1780546105/UnderSoulsMX2_klrdp7.mp4' }]
      }
    ]
  },
  boketto: {
    nombre: "Hotel Boketto",
    ubicacion: "Playa San Antonio, Tuxpan",
    distancia: "12 km del centro",
    narrativa: "Un rincón de paz frente a la playa.",
    galeria: [], colorTema: "#FF6B35", rating: "Nuevo", reviews: "0 reseñas",
    habitaciones: [{ nombre: "Habitación privada", precio: "$2,500", capacidad: "2 personas", descripcion: "Suite de lujo.", amenidades: ["Cama King Size", "Baño de lujo"], imagen: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=600&auto=format&fit=crop" }],
    memorias: []
  }
};