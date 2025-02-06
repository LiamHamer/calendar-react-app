import { useState } from 'react'
import './App.css'
import Datepicker from './components/datepicker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Datepicker />
    </>
  )
}

export default App
