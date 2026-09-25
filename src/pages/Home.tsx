import { Link, NavLink } from 'react-router-dom'
import pastoresPhoto from '../assets/foto_pastores.jpg'
import { LiveSermon } from '../components/LiveSermon'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { ministries } from '../data/ministries'
import { dayName, weeklySchedule } from '../data/schedule'
import { usePageMeta } from '../hooks/usePageMeta'

export function Home() {
  const { t, lang } = useLanguage()
  usePageMeta(churchInfo.name, t.home.heroSubtitle)

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
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
            {t.home.serviceTimesTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {weeklySchedule.map((item) => (
              <div key={item.id} className="rounded-xl bg-brand-50 p-6 text-center dark:bg-night-800">
                <p className="text-lg font-semibold text-brand-900 dark:text-white">{item.title[lang]}</p>
                <p className="mt-1 text-slate-600 dark:text-night-300">
                  {dayName(item.dayOfWeek, lang)}, {item.time[lang]}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <NavLink
              to="/eventos"
              className="text-sm font-semibold text-brand-700 hover:underline dark:text-gold-400"
            >
              {t.home.seeAll} →
            </NavLink>
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
          <SectionHeading eyebrow={t.ministries.eyebrow} title={t.home.ministriesTeaser} subtitle={t.home.ministriesTeaserSubtitle} />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {ministries.map((ministry) => (
              <Link
                key={ministry.id}
                to={`/ministerios/${ministry.id}`}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-brand-900 transition-colors hover:border-brand-300 hover:bg-brand-50 dark:border-night-700 dark:bg-night-900 dark:text-white dark:hover:border-gold-400 dark:hover:bg-night-800"
              >
                {ministry.name[lang]}
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <NavLink
              to="/ministerios"
              className="text-sm font-semibold text-brand-700 hover:underline dark:text-gold-400"
            >
              {t.home.seeAll} →
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  )
}
