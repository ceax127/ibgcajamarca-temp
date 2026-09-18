import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { usePageMeta } from '../hooks/usePageMeta'

export function About() {
  const { t } = useLanguage()
  usePageMeta(`${t.about.title} — ${churchInfo.shortName}`, t.about.mission)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeading title={t.about.title} />

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl bg-brand-50 p-6 dark:bg-night-800">
          <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t.about.missionTitle}</h2>
          <p className="mt-3 text-slate-700 dark:text-night-300">{t.about.mission}</p>
        </div>
        <div className="rounded-2xl bg-brand-50 p-6 dark:bg-night-800">
          <h2 className="text-xl font-semibold text-brand-900 dark:text-white">{t.about.visionTitle}</h2>
          <p className="mt-3 text-slate-700 dark:text-night-300">{t.about.vision}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-brand-950 dark:text-white">{t.about.beliefsTitle}</h2>
        <ul className="mt-6 space-y-4">
          {t.about.beliefs.map((belief) => (
            <li key={belief.title} className="flex gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gold-500" />
              <span className="text-slate-700 dark:text-night-300">
                <span className="font-semibold text-brand-900 dark:text-white">{belief.title}: </span>
                {belief.body}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 border-t border-slate-200 pt-10 dark:border-night-700">
        <h2 className="text-2xl font-semibold text-brand-950 dark:text-white">{t.about.distinctivesTitle}</h2>
        <ul className="mt-6 space-y-4">
          {t.about.distinctives.map((distinctive) => (
            <li key={distinctive.title} className="flex gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-700 dark:bg-gold-500" />
              <span className="text-slate-700 dark:text-night-300">
                <span className="font-semibold text-brand-900 dark:text-white">{distinctive.title}: </span>
                {distinctive.body}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 border-t border-slate-200 pt-10 dark:border-night-700">
        <h2 className="text-2xl font-semibold text-brand-950 dark:text-white">{t.about.historyTitle}</h2>
        <p className="mt-4 text-slate-700 dark:text-night-300">{t.about.history}</p>
      </div>
    </div>
  )
}
