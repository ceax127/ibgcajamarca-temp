import { NavLink } from 'react-router-dom'
import logoWhite from '../assets/Logo_IBG_blanco.png'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'

export function Footer() {
  const { t, lang } = useLanguage()

  return (
    <footer className="border-t border-slate-200 bg-brand-950 text-brand-100 dark:border-white/10 dark:bg-black">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:gap-16">
        <div>
          <div className="flex items-center gap-2 text-white">
            <img src={logoWhite} alt="" className="h-10 w-10" />
            <span className="text-lg font-semibold">{churchInfo.shortName}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-brand-200">{t.footer.tagline}</p>
          <div className="mt-4 flex gap-3">
            <a
              href={churchInfo.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-900 p-2 text-brand-100 hover:bg-brand-800"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
              </svg>
            </a>
            <a
              href={churchInfo.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-900 p-2 text-brand-100 hover:bg-brand-800"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 2.02.25 2.75.53.75.29 1.38.68 2 1.3.62.62 1.01 1.25 1.3 2 .28.73.48 1.58.53 2.75.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 2.02-.53 2.75-.29.75-.68 1.38-1.3 2-.62.62-1.25 1.01-2 1.3-.73.28-1.58.48-2.75.53-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-2.02-.25-2.75-.53-.75-.29-1.38-.68-2-1.3-.62-.62-1.01-1.25-1.3-2-.28-.73-.48-1.58-.53-2.75C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-2.02.53-2.75.29-.75.68-1.38 1.3-2 .62-.62 1.25-1.01 2-1.3.73-.28 1.58-.48 2.75-.53C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5.01-4.73.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.74-.35.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83-.06 1.23-.07 1.59-.07 4.73s.01 3.5.07 4.73c.04.96.2 1.48.34 1.83.18.46.39.79.74 1.13.34.35.67.56 1.13.74.35.14.87.3 1.83.34 1.23.06 1.59.07 4.73.07s3.5-.01 4.73-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.74.35-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.06-1.23.07-1.59.07-4.73s-.01-3.5-.07-4.73c-.04-.96-.2-1.48-.34-1.83a3.06 3.06 0 0 0-.74-1.13 3.06 3.06 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34-1.23-.06-1.59-.07-4.73-.07Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-1.99a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
              </svg>
            </a>
            <a
              href={churchInfo.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-900 p-2 text-brand-100 hover:bg-brand-800"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M21.8 8.1s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 5 12 5 12 5h0s-3.9 0-6.9.1c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2 9.8 2 11.6v1.2c0 1.8.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9C7.1 19.4 12 19.4 12 19.4s3.9 0 6.9-.1c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5v-1.2c0-1.8-.2-3.5-.2-3.5ZM9.9 14.6V9l5.4 2.8-5.4 2.8Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-300">
            {t.footer.quickLinks}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><NavLink to="/nosotros" className="hover:text-white">{t.nav.about}</NavLink></li>
            <li><NavLink to="/ministerios" className="hover:text-white">{t.nav.ministries}</NavLink></li>
            <li><NavLink to="/eventos" className="hover:text-white">{t.nav.events}</NavLink></li>
            <li><NavLink to="/sermones" className="hover:text-white">{t.nav.sermons}</NavLink></li>
            <li><NavLink to="/ofrendas" className="hover:text-white">{t.nav.giving}</NavLink></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-300">
            {t.footer.contact}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-brand-200">
            <li>{churchInfo.address[lang]}</li>
            <li>{churchInfo.phone}</li>
            <li>
              <a href={`mailto:${churchInfo.email}`} className="hover:text-white">
                {churchInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-900 py-4 text-center text-xs text-brand-300">
        © {new Date().getFullYear()} {churchInfo.name}. {t.footer.rights}
      </div>
    </footer>
  )
}
