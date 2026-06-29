export default function ContactSection() {
  return (
    <section id="contacto" className="py-20 px-4 bg-accent text-white scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Contacto</h2>
        <p className="text-white/60 text-center mb-12 max-w-xl mx-auto">
          ¿Necesita más información o quiere que gestionemos su comunidad?
          Estaremos encantados de atenderle.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-xs text-white/50 uppercase tracking-wide">Dirección</div>
            <div className="text-sm leading-relaxed">Pso. San Roque 36, Bajo B<br />05003 Ávila</div>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="text-xs text-white/50 uppercase tracking-wide">Teléfono</div>
            <div className="text-sm">
              <a href="tel:+34920048921" className="hover:text-primary-light transition-colors">920 048 921</a>
              <br />
              <a href="tel:+34615116290" className="hover:text-primary-light transition-colors">615 116 290</a>
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-xs text-white/50 uppercase tracking-wide">Email</div>
            <a href="mailto:info@afinavila.es" className="text-sm hover:text-primary-light transition-colors">info@afinavila.es</a>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-xs text-white/50 uppercase tracking-wide">Horario</div>
            <div className="text-sm leading-relaxed">
              L–J: 9:30–14:30 y 16:30–19:30
              <br />V: 9:30–14:30
              <br /><span className="text-white/50 text-xs">Verano L–V: 8:00–14:30</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
