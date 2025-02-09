import { useState } from 'react'
import './App.css'
import Home from './components/pages/home'
import { CurrentDateContext } from './context/currentDateContext'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const queryClient = new QueryClient()

  return (
    <CurrentDateContext.Provider value={{ currentDate, setCurrentDate }} >
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </CurrentDateContext.Provider>
  )
}

export default App
