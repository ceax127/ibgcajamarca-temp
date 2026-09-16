import { NavLink } from 'react-router-dom'
import { LiveSermon } from '../components/LiveSermon'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { events } from '../data/events'
import { ministries } from '../data/ministries'

export function Home() {
  const { t, lang } = useLanguage()

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 to-brand-700 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{t.home.heroTitle}</h1>
          <p className="max-w-2xl text-lg text-brand-100">{t.home.heroSubtitle}</p>
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
          <p className="mt-2 max-w-xl text-sm italic text-brand-200">{t.home.verse}</p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-gold-600">
            {t.home.serviceTimesTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-brand-50 p-6 text-center">
              <p className="text-lg font-semibold text-brand-900">{t.home.sundayService}</p>
              <p className="mt-1 text-slate-600">{lang === 'es' ? 'Domingos, 10:00 a. m.' : 'Sundays, 10:00 a.m.'}</p>
            </div>
            <div className="rounded-xl bg-brand-50 p-6 text-center">
              <p className="text-lg font-semibold text-brand-900">{t.home.bibleStudy}</p>
              <p className="mt-1 text-slate-600">{lang === 'es' ? 'Miércoles, 7:00 p. m.' : 'Wednesdays, 7:00 p.m.'}</p>
            </div>
            <div className="rounded-xl bg-brand-50 p-6 text-center">
              <p className="text-lg font-semibold text-brand-900">{t.home.youthNight}</p>
              <p className="mt-1 text-slate-600">{lang === 'es' ? 'Sábados, 6:00 p. m.' : 'Saturdays, 6:00 p.m.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={t.home.sermonsTeaser} title={t.nav.sermons} />
          <div className="mx-auto mt-8 max-w-3xl">
            <LiveSermon variant="compact" />
          </div>
          <div className="mt-6 text-center">
            <NavLink to="/sermones" className="text-sm font-semibold text-brand-700 hover:underline">
              {t.home.seeAll} →
            </NavLink>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={t.nav.ministries} title={t.home.ministriesTeaser} subtitle={t.home.ministriesTeaserSubtitle} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.slice(0, 3).map((ministry) => (
              <div key={ministry.id} className="rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
                <div className="text-4xl">{ministry.icon}</div>
                <h3 className="mt-3 text-lg font-semibold text-brand-950">{ministry.name[lang]}</h3>
                <p className="mt-2 text-sm text-slate-600">{ministry.description[lang]}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <NavLink to="/ministerios" className="text-sm font-semibold text-brand-700 hover:underline">
              {t.home.seeAll} →
            </NavLink>
          </div>
        </div>
      </section>

      <section className="bg-brand-950 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={t.nav.events} title={t.home.eventsTeaser} />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="rounded-xl bg-brand-900 p-5">
                <p className="text-sm font-semibold text-gold-300">
                  {new Date(`${event.date}T00:00:00`).toLocaleDateString(lang === 'es' ? 'es-PE' : 'en-US', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{event.title[lang]}</h3>
                <p className="mt-1 text-sm text-brand-200">{event.time} · {event.location}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <NavLink to="/eventos" className="text-sm font-semibold text-gold-300 hover:underline">
              {t.home.seeAll} →
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  )
}
