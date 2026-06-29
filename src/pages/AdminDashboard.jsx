import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminGetComunidades } from '../services/api'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [comunidades, setComunidades] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionStorage.getItem('admin_authenticated')) {
      navigate('/admin/login', { replace: true })
      return
    }
    adminGetComunidades()
      .then(setComunidades)
      .catch(() => navigate('/admin/login', { replace: true }))
      .finally(() => setLoading(false))
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  // Agrupar comunidades en columnas de 10 (01-10, 11-20, ...)
  const columns = [[], [], [], [], [], []]
  const sorted = [...comunidades].sort((a, b) => {
    const na = parseInt(a.numeroComunidad, 10) || 0
    const nb = parseInt(b.numeroComunidad, 10) || 0
    return na - nb
  })
  sorted.forEach((c) => {
    const num = parseInt(c.numeroComunidad, 10) || 0
    const col = Math.min(Math.floor((num - 1) / 10), 5)
    if (col >= 0) columns[col].push(c)
  })
  const colsVisibles = columns.filter((col) => col.length > 0)

  return (
    <div className="bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-accent">Panel de Administración</h1>
            <p className="text-text-gray text-sm mt-0.5">{comunidades.length} comunidades</p>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem('admin_authenticated')
              navigate('/admin/login', { replace: true })
            }}
            className="text-sm text-text-gray hover:text-accent transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {colsVisibles.map((col, i) => (
            <div key={i} className="flex flex-col gap-3 min-w-0">
              <h2 className="text-sm font-semibold text-text-gray uppercase tracking-wider px-1">
                {i * 10 + 1}–{Math.min((i + 1) * 10, i * 10 + col.length)}
              </h2>
              {col.map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/admin/comunidad/${c.claveAcceso}`)}
                  className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-left hover:shadow-lg hover:border-primary/30 transition-all group flex items-center gap-3"
                >
                  {/* Número de comunidad grande */}
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {c.numeroComunidad || '--'}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-accent group-hover:text-primary transition-colors truncate">
                      {c.nombre}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-text-gray font-mono">{c.claveAcceso}</span>
                      <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
                        {c.totalArchivos}
                      </span>
                    </div>
                    {c.ultimoArchivo && (
                      <p className="text-xs text-text-gray mt-1 truncate leading-tight">
                        {c.ultimoArchivo}
                      </p>
                    )}
                  </div>

                  {/* Flecha */}
                  <svg className="w-4 h-4 text-text-gray-light group-hover:text-primary transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
