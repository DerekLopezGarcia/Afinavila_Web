import { useState } from 'react'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=es.afinavila'
const GOOGLE_PLAY_NOTICE_KEY = 'afinavila-google-play-notice-dismissed'

export default function GooglePlaySticker() {
  const [showPopup, setShowPopup] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(GOOGLE_PLAY_NOTICE_KEY) !== 'true'
  })

  const dismissPopup = () => {
    window.localStorage.setItem(GOOGLE_PLAY_NOTICE_KEY, 'true')
    setShowPopup(false)
  }

  return (
    <>
      <aside className="google-play-sticker" aria-label="Aplicación Afinavila disponible en Google Play">
        <div className="google-play-sticker__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3.5 3.2 14.7 12 3.5 20.8a1.7 1.7 0 0 1-.5-1.2V4.4c0-.45.18-.87.5-1.2Z" fill="#34A853" />
            <path d="m3.5 3.2 11.2 8.8 3.2-2.5-12.2-7a1.7 1.7 0 0 0-2.2.7Z" fill="#4285F4" />
            <path d="m3.5 20.8 11.2-8.8 3.2 2.5-12.2 7a1.7 1.7 0 0 1-2.2-.7Z" fill="#EA4335" />
            <path d="m14.7 12 3.2-2.5 2.1 1.2a1.5 1.5 0 0 1 0 2.6l-2.1 1.2-3.2-2.5Z" fill="#FBBC04" />
          </svg>
        </div>
        <div className="google-play-sticker__copy">
          <span className="google-play-sticker__eyebrow">Nueva app móvil</span>
          <strong>Ya puedes probar Afinavila</strong>
          <span>Disponible únicamente en Google Play</span>
        </div>
        <a
          className="google-play-sticker__link"
          href={GOOGLE_PLAY_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Probar Afinavila en Google Play"
          onClick={dismissPopup}
        >
          Probar app
          <span aria-hidden="true">↗</span>
        </a>
      </aside>

      {showPopup && (
        <div className="google-play-modal" role="presentation">
          <div className="google-play-modal__backdrop" onClick={dismissPopup} />
          <section className="google-play-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="google-play-modal-title">
            <button className="google-play-modal__close" type="button" onClick={dismissPopup} aria-label="Cerrar aviso">
              ×
            </button>
            <div className="google-play-modal__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3.5 3.2 14.7 12 3.5 20.8a1.7 1.7 0 0 1-.5-1.2V4.4c0-.45.18-.87.5-1.2Z" fill="#34A853" />
                <path d="m3.5 3.2 11.2 8.8 3.2-2.5-12.2-7a1.7 1.7 0 0 0-2.2.7Z" fill="#4285F4" />
                <path d="m3.5 20.8 11.2-8.8 3.2 2.5-12.2 7a1.7 1.7 0 0 1-2.2-.7Z" fill="#EA4335" />
                <path d="m14.7 12 3.2-2.5 2.1 1.2a1.5 1.5 0 0 1 0 2.6l-2.1 1.2-3.2-2.5Z" fill="#FBBC04" />
              </svg>
            </div>
            <p className="google-play-sticker__eyebrow">Nueva app móvil</p>
            <h2 id="google-play-modal-title">Ya puedes probar Afinavila</h2>
            <p>La aplicación ya está disponible para Android en Google Play.</p>
            <div className="google-play-modal__actions">
              <button type="button" className="google-play-modal__secondary" onClick={dismissPopup}>Ahora no</button>
              <a href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer" className="google-play-modal__primary" onClick={dismissPopup}>
                Probar en Google Play <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
