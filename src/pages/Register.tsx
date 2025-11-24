import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function Register({ setUser }: { setUser: (u: string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/api/register', { email, password })
      toast.success('Account created! Now log in')
      navigate('/login')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border dark:bg-gray-700" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg border dark:bg-gray-700" />
          <button type="submit" className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg">
            Register
          </button>
        </form>
        <p className="text-center">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
      </div>
    </div>
  )
}
