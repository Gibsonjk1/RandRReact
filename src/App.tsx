//import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.tsx'
import Home from './routes/Home.tsx'
import Exercise from './routes/Exercise.tsx'
import Footer from './components/Footer.tsx'

function App() {

  return (
    <>
     <Header />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exercise" element={<Exercise />} />
     </Routes>
     <Footer />
    </>
  )
}

export default App
