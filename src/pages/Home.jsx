import { Link } from 'react-router-dom'

const servicios = [
  {
    title: 'Gestión Administrativa',
    desc: 'Gestión de cuotas, pagos, presupuestos y toda la documentación legal de su comunidad.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Mantenimiento y Conservación',
    desc: 'Coordinación de reparaciones, limpieza, jardinería y mantenimiento de zonas comunes.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.56 5.56a2.12 2.12 0 01-3-3l5.56-5.56m2.83-2.83L8.72 6.81a2.12 2.12 0 013-3l2.53 2.53m2.83 2.83l2.53 2.53a2.12 2.12 0 01-3 3l-5.56-5.56" />
      </svg>
    ),
  },
  {
    title: 'Transparencia Digital',
    desc: 'Portal web y app con acceso 24/7 a actas, extractos, evoluciones y toda la documentación.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
]

const stats = [
  { value: '2013', label: 'Desde' },
  { value: '+50', label: 'Comunidades gestionadas' },
  { value: '+2.000', label: 'Vecinos satisfechos' },
  { value: '24/7', label: 'Acceso a documentación' },
]

const valores = [
  { title: 'Transparencia total', desc: 'Todos los documentos de su comunidad disponibles en línea en tiempo real.' },
  { title: 'Atención personalizada', desc: 'Trato cercano y respuesta ágil a todas sus consultas y necesidades.' },
  { title: 'Tecnología moderna', desc: 'Plataforma web y app móvil para acceder donde y cuando quiera.' },
  { title: 'Experiencia contrastada', desc: 'Más de 13 años de experiencia en gestión de fincas y comunidades.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-accent">
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto space-y-6">
          <p className="font-[Skyline] text-6xl md:text-8xl lg:text-9xl text-primary tracking-widest">
            AFINAVILA
          </p>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Administracion
            <br />
            <span className="text-primary-light">de Fincas</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto">
            Su comunidad en buenas manos
          </p>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Confie la gestion de su finca a profesionales con experiencia.
            Transparencia, cercania y eficacia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/clientes"
              className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
            >
              Area de Clientes
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-24 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">Nuestros Servicios</h2>
            <p className="text-text-gray text-lg max-w-2xl mx-auto">
              Ofrecemos una gestión integral para que su comunidad funcione sin preocupaciones
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {servicios.map((s) => (
              <div key={s.title} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <h3 className="font-semibold text-accent text-xl mb-3">{s.title}</h3>
                <p className="text-text-gray text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confianza / Valores */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">¿Por qué elegir Afinavila?</h2>
            <p className="text-text-gray text-lg max-w-2xl mx-auto">
              Somos una empresa dedicada a la gestión de comunidades de vecinos con un enfoque moderno y cercano
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-6 rounded-2xl bg-surface border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{s.value}</div>
                <div className="text-sm text-text-gray">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {valores.map((item) => (
              <div key={item.title} className="flex gap-4 items-start p-6 rounded-xl hover:bg-surface transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-accent text-lg mb-1">{item.title}</h4>
                  <p className="text-text-gray text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGESFI */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="shrink-0">
            <img
              src="/img/agesfi-logo.jpg"
              alt="AGESFI"
              className="w-40 h-auto rounded-xl shadow-sm"
            />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-accent mb-3">
              Asociación Profesional
            </h2>
            <p className="text-text-gray leading-relaxed text-sm md:text-base">
              Administrador asociado a <strong>AGESFI</strong>, Asociación Española de Gestores
              Fiscales y Gestores de Fincas, con el <strong>número de socio 42</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
