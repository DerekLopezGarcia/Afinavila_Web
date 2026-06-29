import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../services/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await adminLogin(password)
      if (res.role === 'admin') {
        sessionStorage.setItem('admin_authenticated', 'true')
        navigate('/admin', { replace: true })
      }
    } catch {
      setError('Contraseña incorrecta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-accent">Panel Admin</h1>
          <p className="text-text-gray text-sm mt-1">Acceso restringido</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-gray mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              placeholder="Introduzca la contraseña"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-sm text-error text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-accent text-white py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Acceder'}
          </button>
        </form>
      </div>
    </div>
  )
}
