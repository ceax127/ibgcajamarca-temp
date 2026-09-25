import { MinistryIcon } from '../components/MinistryIcon'
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

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {[
          { icon: 'mission', title: t.about.missionTitle, body: t.about.mission },
          { icon: 'vision', title: t.about.visionTitle, body: t.about.vision },
        ].map((card) => (
          <div
            key={card.icon}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-300 hover:shadow-md dark:border-night-800 dark:bg-night-900 dark:shadow-none dark:hover:border-gold-500/40"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl transition-colors group-hover:bg-gold-400/25 dark:bg-gold-400/5 dark:group-hover:bg-gold-400/10" />
            <div className="text-gold-600 transition-transform duration-300 group-hover:scale-105 dark:text-gold-400">
              <MinistryIcon id={card.icon} className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-brand-950 dark:text-white">{card.title}</h2>
            <p className="mt-3 text-slate-700 dark:text-night-300">{card.body}</p>
          </div>
        ))}
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
