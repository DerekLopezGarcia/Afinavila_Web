import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-surface">
      <div className="text-center">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h1 className="text-2xl font-bold text-accent mb-2">Página no encontrada</h1>
        <p className="text-text-gray mb-8">La página que busca no existe o ha sido movida.</p>
        <Link
          to="/"
          className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-semibold transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
