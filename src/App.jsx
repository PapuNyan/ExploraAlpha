import { useState } from 'react'
import './App.css'
import Hoteleria from './Components/hoteleria.jsx'
import TourKoala from './Components/TourKoala'

// Componentes temporales en blanco
const Vivencias = () => <div className="p-10 text-center text-white h-screen"><h1>Vivencias</h1><p>En construcción...</p></div>;
const Comparacion = () => <div className="p-10 text-center text-white h-screen"><h1>Comparación de Precios</h1><p>En construcción...</p></div>;

function App() {
  const [verTour, setVerTour] = useState(false);
  const [view, setView] = useState('catalogo'); // Estado para controlar la pestaña activa

  // 1. Si estamos viendo el tour, mostramos el tour en pantalla completa (prioridad)
  if (verTour) {
    return <TourKoala onVolver={() => setVerTour(false)}/>;
  }

  // 2. Si NO estamos en el tour, mostramos el menú + el contenido dinámico
  return (
    <div className="flex flex-col h-screen">
      
      {/* Barra de Navegación */}
      <nav className="bg-gray-900 text-white p-4 flex justify-center gap-6 z-10 shadow-lg">
        <button 
          onClick={() => setView('catalogo')} 
          className={`font-bold transition-colors ${view === 'catalogo' ? 'text-blue-400' : 'text-gray-300'}`}
        >
          Catálogo Virtual
        </button>
        <button 
          onClick={() => setView('vivencias')} 
          className={`font-bold transition-colors ${view === 'vivencias' ? 'text-blue-400' : 'text-gray-300'}`}
        >
          Vivencias
        </button>
        <button 
          onClick={() => setView('comparacion')} 
          className={`font-bold transition-colors ${view === 'comparacion' ? 'text-blue-400' : 'text-gray-300'}`}
        >
          Comparación de Precios
        </button>
      </nav>

      {/* Contenido Dinámico */}
      <main className="flex-grow">
        {view === 'catalogo' && <Hoteleria onAbrir360={() => setVerTour(true)}/>}
        {view === 'vivencias' && <Vivencias />}
        {view === 'comparacion' && <Comparacion />}
      </main>
      
    </div>
  )
}

export default App