import { NavLink } from 'react-router-dom'
import { MinistryIcon } from '../components/MinistryIcon'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { dayName, weeklySchedule } from '../data/schedule'
import { usePageMeta } from '../hooks/usePageMeta'

export function Events() {
  const { t, lang } = useLanguage()
  usePageMeta(`${t.events.title} — ${churchInfo.shortName}`, t.events.subtitle)

  const sundayService = weeklySchedule.find((s) => s.dayOfWeek === 0)
  const midweek = weeklySchedule.filter((s) => s.id !== sundayService?.id).sort((a, b) => a.dayOfWeek - b.dayOfWeek)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeading title={t.events.title} subtitle={t.events.subtitle} />

      {weeklySchedule.length === 0 ? (
        <p className="mt-10 text-center text-slate-500 dark:text-night-400">{t.events.empty}</p>
      ) : (
        <div className="mt-10 flex flex-col gap-4">
          {/* Sunday: the main gathering, given its own elevated treatment. */}
          {sundayService && (
            <div className="relative overflow-hidden rounded-2xl border border-gold-400/30 bg-brand-50 p-6 dark:border-gold-500/30 dark:bg-night-900 sm:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-700 dark:bg-gold-500/15 dark:text-gold-400">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500 dark:bg-gold-400" />
                {t.events.mainService}
              </span>
              <h3 className="mt-4 text-2xl font-bold text-brand-950 sm:text-3xl dark:text-white">
                {sundayService.title[lang]}
              </h3>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-night-300">
                <span className="font-semibold text-brand-800 dark:text-gold-400">
                  {dayName(sundayService.dayOfWeek, lang)} · {sundayService.time[lang]}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MinistryIcon id="contact-address" className="h-4 w-4" />
                  {churchInfo.address}
                </span>
              </div>
              <NavLink
                to="/contacto"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-gold-400 px-6 text-sm font-semibold text-brand-950 shadow-[0_0_16px_rgba(214,184,108,0.3)] transition-all hover:scale-[1.02] hover:bg-gold-300"
              >
                {t.home.planVisit}
              </NavLink>
            </div>
          )}

          {midweek.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:border-brand-300 hover:shadow-md sm:flex-row sm:items-center dark:border-night-800 dark:bg-night-900 dark:hover:border-gold-500/40"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl transition-colors group-hover:bg-gold-400/25 dark:bg-gold-400/5 dark:group-hover:bg-gold-400/10" />

              <div className="flex w-24 flex-shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl border border-gold-500/20 bg-gold-500/10 py-3 text-gold-700 dark:border-gold-400/25 dark:bg-gold-400/10 dark:text-gold-400">
                <span className="text-sm font-bold uppercase">{dayName(item.dayOfWeek, lang).slice(0, 3)}</span>
                <span className="text-xs">{item.time[lang]}</span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-brand-950 dark:text-white">{item.title[lang]}</h3>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-night-400">
                  <MinistryIcon id="contact-address" className="h-4 w-4 shrink-0" />
                  {churchInfo.address}
                </span>
              </div>

              <NavLink
                to="/contacto"
                className="shrink-0 text-sm font-semibold text-brand-700 hover:underline dark:text-gold-400"
              >
                {t.events.details} →
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
