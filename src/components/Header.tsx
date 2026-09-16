import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logoMark from '../assets/Marca_IBG_placa.png'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { LanguageToggle } from './LanguageToggle'

export function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/nosotros', label: t.nav.about },
    { to: '/ministerios', label: t.nav.ministries },
    { to: '/eventos', label: t.nav.events },
    { to: '/sermones', label: t.nav.sermons },
    { to: '/contacto', label: t.nav.contact },
  ]

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'text-brand-700'
        : 'text-slate-600 hover:text-brand-700'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 text-brand-800" onClick={() => setOpen(false)}>
          <img src={logoMark} alt={churchInfo.name} className="h-10 w-10" />
          <span className="text-base font-semibold leading-tight sm:text-lg">
            {churchInfo.shortName}
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LanguageToggle />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 lg:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClasses}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="pt-3">
            <LanguageToggle />
          </div>
        </div>
      )}
    </header>
  )
}
