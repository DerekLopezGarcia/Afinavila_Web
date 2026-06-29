import { Link } from 'react-router-dom'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

  return (
    <footer className="bg-footer text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div>
          <h4 className="text-white font-semibold mb-4">Afinavila</h4>
          <p className="text-text-gray-light text-sm leading-relaxed">
            Gestión integral de comunidades de vecinos. Profesionalidad, transparencia
            y cercanía a su servicio desde hace más de 13 años.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Servicios</h4>
          <ul className="space-y-2 text-sm text-text-gray-light">
            <li>Gestión de cuotas</li>
            <li>Actas y documentación</li>
            <li>Seguimiento económico</li>
            <li>Asesoría legal</li>
            <li>Mantenimiento de fincas</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Área de Clientes</h4>
          <ul className="space-y-2 text-sm text-text-gray-light">
            <li>
              <Link to="/clientes" onClick={scrollTop} className="hover:text-primary-light transition-colors">Acceder a mi comunidad</Link>
            </li>
            <li>
              <Link to="/legal" onClick={scrollTop} className="hover:text-primary-light transition-colors">Información Legal</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-footer-light">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Afinavila &mdash; Juan Carlos López García. Todos los derechos reservados.<br />
          <span className="text-text-muted/50">Diseñado por Derek López García</span>
        </div>
      </div>
    </footer>
  )
}
