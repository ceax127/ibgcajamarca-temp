import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { events } from '../data/events'

export function Events() {
  const { t, lang } = useLanguage()

  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeading title={t.events.title} subtitle={t.events.subtitle} />

      {sorted.length === 0 ? (
        <p className="mt-10 text-center text-slate-500 dark:text-night-400">{t.events.empty}</p>
      ) : (
        <div className="mt-10 space-y-4">
          {sorted.map((event) => {
            const date = new Date(`${event.date}T00:00:00`)
            return (
              <div
                key={event.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-6 sm:flex-row sm:items-center dark:border-night-700 dark:bg-night-900"
              >
                <div className="flex w-24 flex-shrink-0 flex-col items-center rounded-xl bg-brand-700 py-3 text-white dark:bg-gold-600 dark:text-night-950">
                  <span className="text-xs font-semibold uppercase">
                    {date.toLocaleDateString(lang === 'es' ? 'es-PE' : 'en-US', { month: 'short' })}
                  </span>
                  <span className="text-2xl font-bold">{date.getDate()}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-950 dark:text-white">{event.title[lang]}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-night-400">
                    {event.time} · {event.location}
                  </p>
                  <p className="mt-2 text-slate-700 dark:text-night-300">{event.description[lang]}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
