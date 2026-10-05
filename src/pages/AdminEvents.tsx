import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { API_BASE_URL } from '../data/config'
import { flyerImageUrl } from '../hooks/useEventFlyers'
import { usePageMeta } from '../hooks/usePageMeta'

interface AdminFlyer {
  id: string
  title: string
  link: string
  details: string
  startDate: string
  endDate: string
  version: string
  active: boolean
}

const AUTH_KEY = 'ibg-admin-auth'
const MAX_DIMENSION = 1600

// sessionStorage (not localStorage): the login ends when the tab closes.
function loadAuth(): string | null {
  try {
    return sessionStorage.getItem(AUTH_KEY)
  } catch {
    return null
  }
}

function saveAuth(value: string | null) {
  try {
    if (value) sessionStorage.setItem(AUTH_KEY, value)
    else sessionStorage.removeItem(AUTH_KEY)
  } catch {
    /* private mode etc. — the login just won't survive a reload */
  }
}

// Shrinks and re-encodes the chosen picture as JPEG so uploads stay small
// (phone photos are often 5MB+) and the server only ever sees one format.
async function imageToJpegBase64(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas_unavailable')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  for (const quality of [0.88, 0.75, 0.6]) {
    const dataUrl = canvas.toDataURL('image/jpeg', quality)
    const base64 = dataUrl.split(',')[1]
    if (base64.length * 0.75 < 2.5 * 1024 * 1024) return base64
  }
  throw new Error('image_too_large')
}

const inputClasses =
  'mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-night-700 dark:bg-night-950/60 dark:text-white dark:focus:border-gold-500/60 dark:focus:ring-gold-500/40'
const labelClasses = 'text-sm font-medium text-slate-700 dark:text-night-300'
const cardClasses =
  'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-night-800 dark:bg-night-900 dark:shadow-none sm:p-8'
const primaryButton =
  'flex h-11 items-center justify-center rounded-xl bg-gold-400 px-6 text-sm font-semibold text-brand-950 transition-all hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60'

export function AdminEvents() {
  usePageMeta('Administración — IBG Cajamarca', undefined, { noIndex: true })
  const [auth, setAuth] = useState<string | null>(loadAuth)

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-center text-3xl font-bold text-brand-950 dark:text-white">Eventos del mes</h1>
      <p className="mt-2 text-center text-slate-600 dark:text-night-300">
        Las imágenes activas rotan en la página principal.
      </p>
      <div className="mt-10">
        {auth ? (
          <Manager
            auth={auth}
            onLogout={() => {
              saveAuth(null)
              setAuth(null)
            }}
          />
        ) : (
          <Login
            onLogin={(value) => {
              saveAuth(value)
              setAuth(value)
            }}
          />
        )}
      </div>
    </div>
  )
}

function Login({ onLogin }: { onLogin: (auth: string) => void }) {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    // Basic auth over HTTPS; the server does the real check on every request.
    const auth = `Basic ${btoa(unescape(encodeURIComponent(`${user}:${password}`)))}`
    try {
      const res = await fetch(`${API_BASE_URL}/manage/events`, { headers: { Authorization: auth } })
      if (res.status === 401) setError('Usuario o contraseña incorrectos.')
      else if (!res.ok) setError('No se pudo conectar con el servidor. Inténtalo de nuevo.')
      else onLogin(auth)
    } catch {
      setError('No se pudo conectar con el servidor. Inténtalo de nuevo.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${cardClasses} mx-auto flex max-w-md flex-col gap-4`}>
      <div>
        <label htmlFor="admin-user" className={labelClasses}>
          Usuario
        </label>
        <input
          id="admin-user"
          type="text"
          required
          autoComplete="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="admin-password" className={labelClasses}>
          Contraseña
        </label>
        <div className="relative">
          <input
            id="admin-password"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputClasses} pr-20`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 mt-1 flex items-center px-4 text-sm font-medium text-brand-700 hover:underline dark:text-gold-300"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>
      <button type="submit" disabled={busy} className={primaryButton}>
        {busy ? 'Ingresando…' : 'Ingresar'}
      </button>
      {error && <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p>}
    </form>
  )
}

function Manager({ auth, onLogout }: { auth: string; onLogout: () => void }) {
  const [events, setEvents] = useState<AdminFlyer[] | null>(null)
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [details, setDetails] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  const editingEvent = events?.find((e) => e.id === editingId) ?? null
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(`${API_BASE_URL}/manage/events`, { headers: { Authorization: auth } })
        if (cancelled) return
        if (res.status === 401) return onLogout()
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = (await res.json()) as { events: AdminFlyer[] }
        if (!cancelled) setEvents(json.events.sort((a, b) => b.startDate.localeCompare(a.startDate)))
      } catch {
        if (!cancelled) setMessage({ kind: 'error', text: 'No se pudo cargar la lista de eventos.' })
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [auth, onLogout, refreshKey])

  function resetForm() {
    setTitle('')
    setLink('')
    setDetails('')
    setStartDate('')
    setEndDate('')
    setFile(null)
    setEditingId(null)
  }

  function startEdit(event: AdminFlyer) {
    setTitle(event.title)
    setLink(event.link)
    setDetails(event.details)
    setStartDate(event.startDate)
    setEndDate(event.endDate)
    setFile(null)
    setEditingId(event.id)
    setMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!file && !editingId) return setMessage({ kind: 'error', text: 'Selecciona una imagen.' })
    if (endDate < startDate) {
      return setMessage({ kind: 'error', text: 'La fecha final no puede ser anterior a la inicial.' })
    }
    setBusy(true)
    setMessage(null)
    try {
      // When editing, omitting the image keeps the current one.
      const image = file ? await imageToJpegBase64(file) : undefined
      const res = await fetch(`${API_BASE_URL}/manage/events${editingId ? `/${editingId}` : ''}`, {
        method: editingId ? 'PUT' : 'POST',
        headers: { Authorization: auth, 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, link, details, startDate, endDate, image }),
      })
      if (res.status === 401) return onLogout()
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const wasEditing = editingId !== null
      resetForm()
      setMessage({ kind: 'ok', text: wasEditing ? 'Cambios guardados.' : 'Evento publicado.' })
      setRefreshKey((k) => k + 1)
    } catch {
      setMessage({ kind: 'error', text: 'No se pudo guardar el evento. Revisa los datos e inténtalo de nuevo.' })
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(event: AdminFlyer) {
    if (!window.confirm(`¿Eliminar "${event.title}"?`)) return
    try {
      const res = await fetch(`${API_BASE_URL}/manage/events/${event.id}`, {
        method: 'DELETE',
        headers: { Authorization: auth },
      })
      if (res.status === 401) return onLogout()
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setRefreshKey((k) => k + 1)
    } catch {
      setMessage({ kind: 'error', text: 'No se pudo eliminar el evento.' })
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onLogout}
          className="text-sm font-medium text-slate-600 hover:underline dark:text-night-300"
        >
          Cerrar sesión
        </button>
      </div>

      <form onSubmit={handleSubmit} className={`${cardClasses} flex flex-col gap-4`}>
        <h2 className="text-xl font-semibold text-brand-950 dark:text-white">
          {editingId ? 'Editar evento' : 'Nuevo evento'}
        </h2>
        <div>
          <label htmlFor="ev-title" className={labelClasses}>
            Título
          </label>
          <input
            id="ev-title"
            type="text"
            required
            maxLength={120}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ev-start" className={labelClasses}>
              Mostrar desde
            </label>
            <input
              id="ev-start"
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="ev-end" className={labelClasses}>
              Mostrar hasta (inclusive)
            </label>
            <input
              id="ev-end"
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>
        <div>
          <label htmlFor="ev-link" className={labelClasses}>
            Enlace (opcional)
          </label>
          <input
            id="ev-link"
            type="url"
            placeholder="https://"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="ev-details" className={labelClasses}>
            Detalles (opcional)
          </label>
          <textarea
            id="ev-details"
            rows={5}
            maxLength={1500}
            placeholder="Fechas, horarios, lugar, oradores… Se muestra como texto junto a la imagen. Los saltos de línea se respetan."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className={inputClasses}
          />
          <p className="mt-1 text-right text-xs text-slate-500 dark:text-night-400">{details.length}/1500</p>
        </div>
        <div>
          <label htmlFor="ev-image" className={labelClasses}>
            {editingId ? 'Cambiar imagen (opcional)' : 'Imagen del evento'}
          </label>
          <input
            id="ev-image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            required={!editingId}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-800 dark:text-night-300 dark:file:bg-night-800 dark:file:text-gold-300"
          />
          {(preview || editingEvent) && (
            <img
              src={preview ?? flyerImageUrl(editingEvent!.id, editingEvent!.version)}
              alt={preview ? 'Vista previa' : 'Imagen actual'}
              className="mt-3 max-h-64 rounded-xl border border-slate-200 dark:border-night-700"
            />
          )}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={busy} className={`${primaryButton} flex-1`}>
            {editingId ? (busy ? 'Guardando…' : 'Guardar cambios') : busy ? 'Publicando…' : 'Publicar evento'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex h-11 items-center justify-center rounded-xl border border-slate-300 px-6 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-night-700 dark:text-night-300 dark:hover:bg-white/5"
            >
              Cancelar
            </button>
          )}
        </div>
        {message && (
          <p
            className={`text-sm font-medium ${
              message.kind === 'ok' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
            }`}
          >
            {message.text}
          </p>
        )}
      </form>

      <div className={cardClasses}>
        <h2 className="text-xl font-semibold text-brand-950 dark:text-white">Eventos publicados</h2>
        {events === null ? (
          <p className="mt-4 text-sm text-slate-500 dark:text-night-400">Cargando…</p>
        ) : events.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500 dark:text-night-400">Aún no hay eventos.</p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-200 dark:divide-night-800">
            {events.map((event) => (
              <li key={event.id} className="flex items-center gap-4 py-4">
                <img
                  src={flyerImageUrl(event.id, event.version)}
                  alt=""
                  className="h-16 w-16 shrink-0 rounded-lg border border-slate-200 object-cover dark:border-night-700"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-brand-950 dark:text-white">{event.title}</p>
                  <p className="text-xs text-slate-500 dark:text-night-400">
                    {event.startDate} → {event.endDate}{' '}
                    <span
                      className={`ml-1 rounded-full px-2 py-0.5 font-semibold ${
                        event.active
                          ? 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-400'
                          : 'bg-slate-100 text-slate-600 dark:bg-night-800 dark:text-night-300'
                      }`}
                    >
                      {event.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:gap-4">
                  <button
                    type="button"
                    onClick={() => startEdit(event)}
                    className="text-sm font-medium text-brand-700 hover:underline dark:text-gold-300"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(event)}
                    className="text-sm font-medium text-red-700 hover:underline dark:text-red-400"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
