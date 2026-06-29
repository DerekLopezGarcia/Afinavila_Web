import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { adminGetComunidad, getPdfUrl } from '../services/api'

function encodePath(part) {
  return encodeURIComponent(part)
}

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

export default function AdminComunidad() {
  const { codigo } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('Actas')
  const [pdfOpen, setPdfOpen] = useState(null)

  useEffect(() => {
    if (!sessionStorage.getItem('admin_authenticated')) {
      navigate('/admin/login', { replace: true })
      return
    }
    adminGetComunidad(codigo)
      .then((d) => setData(d))
      .catch((err) => setError(err.message || 'Error al cargar la comunidad'))
      .finally(() => setLoading(false))
  }, [codigo, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h2 className="text-lg font-bold text-accent mb-2">Error al cargar</h2>
          <p className="text-text-gray text-sm mb-6">{error}</p>
          <button
            onClick={() => navigate('/admin')}
            className="bg-primary text-white px-6 py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors"
          >
            Volver al panel
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const archivos = data.archivos || []
  const hasLecturas = archivos.some((a) => a.categoria === 'Lecturas')
  const tabs = hasLecturas ? [...BASE_TABS, 'Lecturas'] : BASE_TABS
  const filtered = archivos.filter((a) => (a.categoria || 'Otros') === tabToCategoria[tab])

  return (
    <div className="bg-surface">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-2">
        <button
          onClick={() => navigate('/admin')}
          className="text-text-gray hover:text-accent text-sm inline-flex items-center gap-1 mb-3 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al panel
        </button>
        <h1 className="text-2xl font-bold text-accent">{data.nombre}</h1>
        <p className="text-text-gray text-sm mt-0.5">
          Clave: <span className="font-mono">{data.claveAcceso}</span> · {archivos.length} archivos
        </p>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 shadow-sm">
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

      {/* File grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-12 h-12 text-text-gray-light mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-text-gray">No hay documentos en esta categoría.</p>
          </div>
        ) : (
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

      {/* PDF Viewer */}
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
                src={getPdfUrl(encodeURIComponent(data.claveAcceso), pdfOpen.id)}
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
