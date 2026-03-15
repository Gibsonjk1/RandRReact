
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.tsx'
import Home from './routes/Home.tsx'
import Exercise from './routes/Exercise.tsx'
import Footer from './components/Footer.tsx'
import type { User } from './interfaces/User.ts'
import { useState, useEffect } from 'react'
import { convertApiUserToDomain } from './Helpers/userMapper.ts'

function App() {
   const [userData, setUserData] = useState<User | null>(null);

    
  
    useEffect(() => {
  const fetchUser = async () => {
    const res = await fetch("/api/user/6987ddb8da0cdff9b1cdd0d8")
    const apiUser = await res.json()

    const domainUser = convertApiUserToDomain(apiUser)

    setUserData(domainUser)
  }

  fetchUser()
}, [])

  return (
    <>
     <Header />
     <Routes>
      <Route path="/" element={<Home userData={userData} />} />
      <Route path="/exercise" element={<Exercise userData={userData} />} />
     </Routes>
     <Footer />
    </>
  )
}

export default App
