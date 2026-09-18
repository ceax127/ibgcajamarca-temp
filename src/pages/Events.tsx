import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { dayName, weeklySchedule } from '../data/schedule'
import { usePageMeta } from '../hooks/usePageMeta'

export function Events() {
  const { t, lang } = useLanguage()
  usePageMeta(`${t.events.title} — ${churchInfo.shortName}`, t.events.subtitle)

  const sorted = [...weeklySchedule].sort((a, b) => a.dayOfWeek - b.dayOfWeek)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeading title={t.events.title} subtitle={t.events.subtitle} />

      {sorted.length === 0 ? (
        <p className="mt-10 text-center text-slate-500 dark:text-night-400">{t.events.empty}</p>
      ) : (
        <div className="mt-10 space-y-4">
          {sorted.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-6 sm:flex-row sm:items-center dark:border-night-700 dark:bg-night-900"
            >
              <div className="flex w-24 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-brand-700 py-3 text-white dark:bg-gold-600 dark:text-night-950">
                <span className="text-lg font-bold uppercase">{dayName(item.dayOfWeek, lang).slice(0, 3)}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-950 dark:text-white">{item.title[lang]}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-night-400">
                  {dayName(item.dayOfWeek, lang)} · {item.time[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
