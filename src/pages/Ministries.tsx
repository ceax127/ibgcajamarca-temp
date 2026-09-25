import { Link } from 'react-router-dom'
import { MinistryIcon } from '../components/MinistryIcon'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { ministries, type MinistryCategory } from '../data/ministries'
import { usePageMeta } from '../hooks/usePageMeta'

export function Ministries() {
  const { t, lang } = useLanguage()
  usePageMeta(`${t.ministries.title} — ${churchInfo.shortName}`, t.ministries.subtitle)

  // Column counts chosen per section so a section's card count never
  // leaves a single card stranded alone in the last row at the lg
  // breakpoint (3 teaching / 4 community / 6 service — see ministries.ts).
  const sections: { key: MinistryCategory; label: string; gridCols: string }[] = [
    { key: 'teaching', label: t.ministries.sectionTeaching, gridCols: 'lg:grid-cols-3' },
    { key: 'community', label: t.ministries.sectionCommunity, gridCols: 'lg:grid-cols-4' },
    { key: 'service', label: t.ministries.sectionService, gridCols: 'lg:grid-cols-3' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
          {t.ministries.eyebrow}
        </span>
        <h1 className="text-3xl font-bold text-brand-950 sm:text-4xl dark:bg-gradient-to-b dark:from-white dark:to-night-300 dark:bg-clip-text dark:text-transparent">
          {t.ministries.title}
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-night-300">{t.ministries.subtitle}</p>
      </div>

      {sections.map((section) => (
        <div key={section.key} className="mt-16 first:mt-12">
          <h2 className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-gold-600 after:h-px after:flex-1 after:bg-slate-200 dark:text-gold-400 dark:after:bg-night-800">
            {section.label}
          </h2>
          <div className={`grid gap-5 sm:grid-cols-2 ${section.gridCols}`}>
            {ministries
              .filter((m) => m.category === section.key)
              .map((ministry) => (
                <div
                  key={ministry.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-300 hover:shadow-md dark:border-night-800 dark:bg-night-900 dark:shadow-none dark:hover:border-gold-500/40"
                >
                  {/* Ambient hover glow, not a hard-edged box around the icon. */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl transition-colors group-hover:bg-gold-400/25 dark:bg-gold-400/5 dark:group-hover:bg-gold-400/10" />

                  {/* "Stretched link" pattern: this invisible overlay makes the
                      whole card clickable, while real, later-in-DOM interactive
                      elements would still receive clicks first — nesting a real
                      <a> inside this Link would be invalid HTML. */}
                  <Link
                    to={`/ministerios/${ministry.id}`}
                    className="absolute inset-0 rounded-2xl"
                    aria-label={ministry.name[lang]}
                  />

                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-gold-700 transition-transform duration-300 group-hover:scale-105 dark:text-gold-300">
                      <MinistryIcon id={ministry.id} className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-brand-950 transition-colors group-hover:text-brand-800 dark:text-white">
                      {ministry.name[lang]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-night-300">
                      {ministry.tagline[lang]}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-500 transition-colors group-hover:text-brand-700 dark:border-night-800 dark:text-night-400 dark:group-hover:text-gold-400">
                    <span>{t.ministries.learnMore}</span>
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
