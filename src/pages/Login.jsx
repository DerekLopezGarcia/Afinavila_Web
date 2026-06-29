import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'

export default function Login() {
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!codigo.trim()) {
      setError('Introduzca su código de acceso')
      return
    }
    setLoading(true)
    setError('')
    try {
      const comunidad = await login(codigo.trim())
      sessionStorage.setItem('comunidad_nombre', comunidad.nombre)
      sessionStorage.setItem('authenticated', 'true')
      navigate('/cliente', { replace: true })
    } catch {
      setError('Código incorrecto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-surface">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <img src="/img/logo.png" alt="Afinavila" className="h-14 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-accent">Área de Clientes</h2>
            <p className="text-text-gray mt-2">
              Introduzca su código de acceso para consultar la documentación de su comunidad
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-gray mb-2">
                Código de Acceso
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-gray-light">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={codigo}
                  onChange={(e) => { setCodigo(e.target.value); setError('') }}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl border text-base transition-all outline-none placeholder:text-text-gray-light ${
                    error
                      ? 'border-error focus:ring-2 focus:ring-error/20'
                      : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-error text-sm mt-2 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-semibold text-base transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verificando...
                </span>
              ) : 'Acceder'}
            </button>
          </form>

          <p className="text-sm text-text-muted text-center mt-8">
            Si no conoce su código de acceso, contacte con la administración.
          </p>
        </div>
      </div>
    </div>
  )
}
