import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const scrollToContacto = (e) => {
    e.preventDefault()
    const el = document.getElementById('contacto')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.location.href = '/#contacto'
  }

  const navTo = (close) => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (close) close()
  }

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
          className="flex items-center gap-3"
        >
          <span className="font-[Skyline] text-5xl md:text-7xl text-accent tracking-wider">AFINAVILA</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" onClick={() => navTo()} className="text-white/90 hover:text-white transition-colors">Inicio</Link>
          <Link to="/clientes" onClick={() => navTo()} className="text-white/90 hover:text-white transition-colors">Área de Clientes</Link>
          <a href="/#contacto" onClick={scrollToContacto} className="text-white/90 hover:text-white transition-colors">Contacto</a>
          <Link to="/legal" onClick={() => navTo()} className="text-white/90 hover:text-white transition-colors">Información Legal</Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white"
          aria-label="Menú"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/20 bg-primary-dark">
          <nav className="flex flex-col px-4 py-3 gap-2 text-sm font-medium">
            <Link to="/" onClick={() => { setOpen(false); navTo(); }} className="text-white/90 hover:text-white transition-colors py-1">Inicio</Link>
            <Link to="/clientes" onClick={() => { setOpen(false); navTo(); }} className="text-white/90 hover:text-white transition-colors py-1">Área de Clientes</Link>
            <a href="/#contacto" onClick={(e) => { setOpen(false); scrollToContacto(e); }} className="text-white/90 hover:text-white transition-colors py-1">Contacto</a>
            <Link to="/legal" onClick={() => { setOpen(false); navTo(); }} className="text-white/90 hover:text-white transition-colors py-1">Información Legal</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
