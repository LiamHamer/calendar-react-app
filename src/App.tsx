import { useState } from 'react'
import './App.css'
import Home from './components/pages/home'
import {CurrentDateContext} from './context/currentDateContext'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date('11/01/1999'));

  return (
    <CurrentDateContext.Provider value={{currentDate, setCurrentDate}} >
      <Home />
    </CurrentDateContext.Provider>
  )
}

export default App
