import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Todos from './pages/Todos.tsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser('logged')
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={user ? <Todos /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register setUser={setUser} />} />
    </Routes>
  )
}

export default App
