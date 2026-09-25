import { Link } from 'react-router-dom'
import logoMark from '../assets/Marca_IBG_placa.png'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { ministries } from '../data/ministries'
import { usePageMeta } from '../hooks/usePageMeta'

export function Ministries() {
  const { t, lang } = useLanguage()
  usePageMeta(`${t.ministries.title} — ${churchInfo.shortName}`, t.ministries.subtitle)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading title={t.ministries.title} subtitle={t.ministries.subtitle} />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ministries.map((ministry) => (
          <div
            key={ministry.id}
            className="relative flex flex-col rounded-2xl border border-slate-200 p-6 shadow-sm transition-shadow hover:shadow-md dark:border-night-700 dark:bg-night-900"
          >
            {/* "Stretched link" pattern: this invisible overlay makes the whole
                card clickable, while real, later-in-DOM interactive elements
                (the leader mailto links below) still receive clicks first —
                nesting a real <a> inside this Link would be invalid HTML. */}
            <Link
              to={`/ministerios/${ministry.id}`}
              className="absolute inset-0 rounded-2xl"
              aria-label={ministry.name[lang]}
            />

            <div className="flex -space-x-3">
              {(ministry.leaders.length > 0 ? ministry.leaders : [{ name: ministry.name[lang], photo: undefined }]).map(
                (leader, i) => (
                  <img
                    key={leader.name + i}
                    src={leader.photo ?? logoMark}
                    alt=""
                    className="h-12 w-12 rounded-full border-2 border-white object-cover dark:border-night-900"
                  />
                ),
              )}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-brand-950 dark:text-white">{ministry.name[lang]}</h3>
            {ministry.leaders.length > 0 && (
              <>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
                  {t.ministries.leadBy}
                </p>
                <ul className="relative mt-1 space-y-1">
                  {ministry.leaders.map((leader) => (
                    <li key={leader.email}>
                      <a
                        href={`mailto:${leader.email}`}
                        className="text-sm text-slate-700 hover:text-brand-700 hover:underline dark:text-night-300 dark:hover:text-gold-300"
                      >
                        {leader.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <span className="relative mt-auto pt-4 text-sm font-semibold text-brand-700 dark:text-gold-400">
              {t.ministries.learnMore} →
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
