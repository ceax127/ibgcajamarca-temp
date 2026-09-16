import { NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-brand-800">404</h1>
      <p className="text-slate-600">
        {t.nav.home === 'Inicio' ? 'Página no encontrada.' : 'Page not found.'}
      </p>
      <NavLink to="/" className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800">
        {t.nav.home}
      </NavLink>
    </div>
  )
}
