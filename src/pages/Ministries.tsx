import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MinistryIcon } from '../components/MinistryIcon'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { ministries, type MinistryCategory } from '../data/ministries'
import { usePageMeta } from '../hooks/usePageMeta'

type CategoryFilter = 'all' | MinistryCategory

export function Ministries() {
  const { t, lang } = useLanguage()
  usePageMeta(`${t.ministries.title} — ${churchInfo.shortName}`, t.ministries.subtitle)

  const [active, setActive] = useState<CategoryFilter>('all')

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: t.ministries.categoryAll },
    { key: 'leadership', label: t.ministries.categoryLeadership },
    { key: 'ages', label: t.ministries.categoryAges },
    { key: 'service', label: t.ministries.categoryService },
  ]

  const visible = active === 'all' ? ministries : ministries.filter((m) => m.category === active)

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

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setActive(c.key)}
            aria-pressed={active === c.key}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === c.key
                ? 'border-brand-700 bg-brand-700 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-night-950'
                : 'border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-brand-50 dark:border-night-700 dark:text-night-300 dark:hover:border-gold-500/50 dark:hover:bg-white/5'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((ministry) => (
          <div
            key={ministry.id}
            className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-brand-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-gold-500/50 dark:hover:bg-white/[0.05] dark:hover:shadow-[0_0_24px_-8px_rgba(207,172,82,0.4)]"
          >
            {/* "Stretched link" pattern: this invisible overlay makes the whole
                card clickable, while real, later-in-DOM interactive elements
                would still receive clicks first — nesting a real <a> inside
                this Link would be invalid HTML. */}
            <Link
              to={`/ministerios/${ministry.id}`}
              className="absolute inset-0 rounded-2xl"
              aria-label={ministry.name[lang]}
            />

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/5 dark:text-gold-300">
              <MinistryIcon id={ministry.id} className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-brand-950 dark:text-white">{ministry.name[lang]}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-night-400">{ministry.tagline[lang]}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-gold-400">
              {t.ministries.learnMore}
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
