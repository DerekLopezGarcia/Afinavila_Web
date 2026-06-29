import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getMe, getArchivosSession, getPdfUrlSession } from '../services/api'

const BASE_TABS = ['Actas', 'Evoluciones anuales', 'Extractos bancarios', 'Otros']

// Mapeo: nombre visible → categoría interna (de la API)
const tabToCategoria = {
  'Actas': 'Actas',
  'Evoluciones anuales': 'Evoluciones',
  'Extractos bancarios': 'Extractos',
  'Otros': 'Otros',
  'Lecturas': 'Lecturas',
}

// Iconos por categoría interna (de la API)
const iconSrc = {
  'Actas': '/img/icons/acta.png',
  'Evoluciones': '/img/icons/evolucion.png',
  'Extractos': '/img/icons/extracto.png',
  'Otros': '/img/icons/otros.png',
  'Lecturas': '/img/icons/lectura.png',
}

const defaultIcon = '/img/icons/otros.png'

export default function Cliente() {
  const navigate = useNavigate()

  const [comunidadNombre, setComunidadNombre] = useState(sessionStorage.getItem('comunidad_nombre') || '')
  const [archivos, setArchivos] = useState([])
  const [tab, setTab] = useState('Actas')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pdfOpen, setPdfOpen] = useState(null)

  useEffect(() => {
    if (!sessionStorage.getItem('authenticated')) {
      navigate('/clientes', { replace: true })
      return
    }
    setLoading(true)
    setError('')
    Promise.all([
      getMe().then((c) => {
        setComunidadNombre(c.nombre)
        sessionStorage.setItem('comunidad_nombre', c.nombre)
      }).catch(() => navigate('/clientes', { replace: true })),
      getArchivosSession().then(setArchivos).catch(() => setError('Error al cargar los documentos.')),
    ]).finally(() => setLoading(false))
  }, [navigate])

  const hasLecturas = archivos.some((a) => a.categoria === 'Lecturas')
  const tabs = hasLecturas ? [...BASE_TABS, 'Lecturas'] : BASE_TABS
  const filtered = archivos.filter((a) => (a.categoria || 'Otros') === tabToCategoria[tab])

  return (
    <div className="min-h-[70vh] bg-surface">
      <div className="bg-accent text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/clientes" className="text-white/60 hover:text-white text-sm inline-flex items-center gap-1 mb-3 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">
            {comunidadNombre || 'Documentación'}
          </h1>
          <p className="text-white/60 text-sm mt-1">
            {archivos.length} documento{archivos.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="sticky top-16 bg-white border-b border-gray-200 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === t
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-gray hover:text-accent'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mb-4" />
            <p className="text-text-gray">Cargando documentos...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-20 text-error">{error}</div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-12 h-12 text-text-gray-light mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-text-gray">No hay documentos en esta categoría.</p>
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((a) => {
              const cat = a.categoria || 'Otros'
              return (
                <button
                  key={a.id}
                  onClick={() => setPdfOpen(a)}
                  className="bg-white rounded-xl border border-gray-200 p-5 text-center hover:shadow-lg hover:border-primary/30 transition-all group cursor-pointer"
                >
                  <div className="mb-3 flex justify-center">
                    <img
                      src={iconSrc[cat] || defaultIcon}
                      alt={cat}
                      className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </div>
                  <p className="text-sm text-accent font-semibold truncate">{a.nombreMostrar || a.nombre}</p>
                  <p className="text-xs text-text-muted mt-1 truncate">{a.descripcion}</p>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {pdfOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setPdfOpen(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full max-w-5xl"
            style={{ height: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 bg-accent text-white shrink-0">
              <button
                onClick={() => setPdfOpen(null)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="font-medium truncate flex-1">{pdfOpen.nombreMostrar || pdfOpen.nombre}</span>
            </div>
            <div className="flex-1 bg-gray-100">
              <iframe
                src={getPdfUrlSession(pdfOpen.id)}
                className="w-full h-full border-0"
                title={pdfOpen.nombreMostrar || pdfOpen.nombre}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
