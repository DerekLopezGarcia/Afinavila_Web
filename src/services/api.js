const API_BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
    ...options,
  })
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
  const text = await res.text()
  try { return JSON.parse(text) } catch { return text }
}

export async function login(codigoAcceso) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ codigoAcceso }),
  })
}

export async function getComunidad(codigoAcceso) {
  return request(`/comunidad/${codigoAcceso}`)
}

export async function getArchivosByComunidad(codigoAcceso) {
  return request(`/archivos/${codigoAcceso}`)
}

export async function getMe() {
  return request('/auth/me')
}

export async function getArchivosSession() {
  return request('/archivos/session')
}

export function getPdfUrlSession(archivoId) {
  return `${API_BASE}/archivo/pdf/session/${archivoId}`
}

export function getPdfUrl(codigoAcceso, archivoId) {
  return `${API_BASE}/archivo/pdf/${codigoAcceso}/${archivoId}`
}

// === Admin API ===
export async function adminLogin(password) {
  return request('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
}

export async function adminGetMe() {
  return request('/admin/me')
}

export async function adminGetComunidades() {
  return request('/admin/comunidades')
}

export async function adminGetComunidad(codigoAcceso) {
  return request(`/admin/comunidad/${encodeURIComponent(codigoAcceso)}`)
}

export async function adminGetPdfUrl(codigoAcceso, archivoId) {
  return `${API_BASE}/archivo/pdf/${encodeURIComponent(codigoAcceso)}/${archivoId}`
}
