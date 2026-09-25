import { NavLink } from 'react-router-dom'
import pastoresPhoto from '../assets/foto_pastores.jpg'
import { LiveSermon } from '../components/LiveSermon'
import { MinistryIcon } from '../components/MinistryIcon'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { dayName, weeklySchedule } from '../data/schedule'
import { usePageMeta } from '../hooks/usePageMeta'

const ministryPillarIcons = ['pillar-teaching', 'pillar-adults', 'pillar-youth', 'pillar-service'] as const

export function Home() {
  const { t, lang } = useLanguage()
  usePageMeta(churchInfo.name, t.home.heroSubtitle)

  const sundayService = weeklySchedule.find((s) => s.dayOfWeek === 0) ?? weeklySchedule[0]
  const midweek = weeklySchedule.filter((s) => s.id !== sundayService.id).sort((a, b) => a.dayOfWeek - b.dayOfWeek)

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden text-white">
        <img
          src={pastoresPhoto}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/95 via-brand-900/90 to-brand-700/85 dark:from-black/95 dark:via-night-950/92 dark:to-night-800/85" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{t.home.heroTitle}</h1>
          <p className="max-w-2xl text-lg text-brand-100 dark:text-night-200">{t.home.heroSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <NavLink
              to="/contacto"
              className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-brand-950 hover:bg-gold-300"
            >
              {t.home.planVisit}
            </NavLink>
            <NavLink
              to="/sermones"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t.home.watchLive}
            </NavLink>
          </div>
          <p className="mt-2 max-w-xl text-sm italic text-brand-200 dark:text-night-300">{t.home.verse}</p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white dark:border-night-700 dark:bg-night-950">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
            {t.home.serviceTimesTitle}
          </h2>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
            {/* Sunday: the primary gathering, given its own hero card. */}
            <div className="relative overflow-hidden rounded-3xl border border-gold-400/30 bg-brand-50 p-8 dark:border-gold-500/30 dark:bg-night-900 lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-700 dark:bg-gold-500/15 dark:text-gold-400">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500 dark:bg-gold-400" />
                {t.home.mainGathering}
              </span>
              <h3 className="mt-6 text-3xl font-bold text-brand-950 sm:text-4xl dark:text-white">
                {sundayService.title[lang]}
              </h3>
              <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-night-300">{t.home.sundayServiceDesc}</p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-brand-100 pt-6 dark:border-night-700">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-night-400">
                    {t.home.everyWeek}
                  </span>
                  <span className="text-2xl font-extrabold text-brand-800 sm:text-3xl dark:text-gold-400">
                    {dayName(sundayService.dayOfWeek, lang)} {sundayService.time[lang]}
                  </span>
                </div>
                <NavLink
                  to="/contacto"
                  className="rounded-xl bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-brand-800 dark:bg-white/10 dark:hover:bg-white/15"
                >
                  {t.home.planVisit}
                </NavLink>
              </div>
            </div>

            {/* Everything else: a compact chronological list, no need for a
                full card per item. */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 p-7 dark:border-night-800 dark:bg-white/[0.02] lg:col-span-5">
              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-night-400">
                  {t.home.midweekGatherings}
                </h4>
                <div className="divide-y divide-slate-200 dark:divide-night-800">
                  {midweek.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-brand-950 dark:text-white">{item.title[lang]}</p>
                        <span className="text-xs text-gold-600 dark:text-gold-400">
                          {dayName(item.dayOfWeek, lang)}
                        </span>
                      </div>
                      <span className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-600 dark:bg-night-800 dark:text-night-300">
                        {item.time[lang]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 border-t border-slate-200 pt-4 text-right dark:border-night-800">
                <NavLink
                  to="/eventos"
                  className="text-xs font-semibold text-brand-700 hover:underline dark:text-gold-400"
                >
                  {t.home.seeAll} →
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-night-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={t.home.sermonsTeaser} title={t.nav.sermons} />
          <div className="mx-auto mt-8 max-w-3xl">
            <LiveSermon variant="compact" />
          </div>
          <div className="mt-6 text-center">
            <NavLink
              to="/sermones"
              className="text-sm font-semibold text-brand-700 hover:underline dark:text-gold-400"
            >
              {t.home.seeAll} →
            </NavLink>
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-night-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow={t.ministries.eyebrow}
              title={t.home.ministriesTeaser}
              subtitle={t.home.ministriesTeaserSubtitle}
            />
            <NavLink
              to="/ministerios"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline dark:text-gold-400"
            >
              {t.home.seeAll} →
            </NavLink>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.ministryPillars.map((pillar, i) => (
              <NavLink
                key={pillar.title}
                to="/ministerios"
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-300 hover:shadow-md dark:border-night-800 dark:bg-night-900 dark:shadow-none dark:hover:border-gold-500/40"
              >
                {/* Ambient hover glow, not a hard-edged box around the icon. */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl transition-colors group-hover:bg-gold-400/25 dark:bg-gold-400/5 dark:group-hover:bg-gold-400/10" />

                <div>
                  <div className="text-gold-600 transition-transform duration-300 group-hover:scale-105 dark:text-gold-400">
                    <MinistryIcon id={ministryPillarIcons[i]} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-brand-950 transition-colors group-hover:text-brand-800 dark:text-white dark:group-hover:text-gold-300">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-night-400">{pillar.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-500 transition-colors group-hover:text-brand-700 dark:border-night-800 dark:text-night-400 dark:group-hover:text-gold-400">
                  <span>{t.ministries.learnMore}</span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
