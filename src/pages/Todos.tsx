import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { LogOut } from 'lucide-react'

interface Todo { id: string; title: string; completed: boolean }

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTitle, setNewTitle] = useState('')

  const loadTodos = async () => {
    try {
      const res = await axios.get('/api/todos')
      setTodos(res.data)
    } catch {
      toast.error('Session expired')
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
  }

  useEffect(() => { loadTodos() }, [])

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const res = await axios.post('/api/todos', { title: newTitle })
    setTodos([...todos, res.data])
    setNewTitle('')
    toast.success('Added!')
  }

  const toggleTodo = async (id: string) => {
    const res = await axios.patch(`/api/todos/${id}`)
    setTodos(todos.map(t => t.id === id ? res.data : t))
  }

  const deleteTodo = async (id: string) => {
    await axios.delete(`/api/todos/${id}`)
    setTodos(todos.filter(t => t.id !== id))
    toast.success('Deleted')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Todos</h1>
          <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login' }} className="flex items-center gap-2 text-red-600">
            <LogOut size={20} /> Logout
          </button>
        </div>

        <form onSubmit={addTodo} className="flex gap-4 mb-8">
          <input
            value={newTitle} onChange={e => setNewTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 rounded-lg border dark:bg-gray-800"
          />
          <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">
            Add
          </button>
        </form>

        <div className="space-y-4">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} className="w-6 h-6" />
              <span className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo.id)} className="text-red-600 text-2xl">×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
