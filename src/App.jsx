import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Cliente from './pages/Cliente'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminComunidad from './pages/AdminComunidad'

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  const adminPages = isAdmin ? (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/comunidad/:codigo" element={<AdminComunidad />} />
    </Routes>
  ) : null

  const publicPages = !isAdmin ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes" element={<Login />} />
      <Route path="/clientes/:codigo" element={<Navigate to="/cliente" replace />} />
      <Route path="/cliente" element={<Cliente />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : null

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {adminPages}
        {publicPages}
      </main>
      <ContactSection />
      <Footer />
    </div>
  )
}
