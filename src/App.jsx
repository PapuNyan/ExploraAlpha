import { useState } from 'react'
import './App.css'
import Hoteleria from './Components/hoteleria.jsx'
// import Vista360 from './Components/Vista360.jsx'
import TourKoala from './Components/TourKoala'

function App() {
  const [verTour, setVerTour] = useState(false);

  return (
    <>
      {verTour ? (
        <TourKoala onVolver={() => setVerTour(false)}/>
      ):(
        <Hoteleria onAbrir360={() => setVerTour(true)}/>
      )}
    </>
  )
}

export default App
