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
            className="rounded-2xl border border-slate-200 p-6 shadow-sm dark:border-night-700 dark:bg-night-900"
          >
            <h3 className="text-lg font-semibold text-brand-950 dark:text-white">{ministry.name[lang]}</h3>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
              {t.ministries.leadBy}
            </p>
            <ul className="mt-1 space-y-1">
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
          </div>
        ))}
      </div>
    </div>
  )
}
