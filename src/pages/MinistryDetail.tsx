import { Link, useParams } from 'react-router-dom'
import logoMark from '../assets/Marca_IBG_placa.png'
import { MinistryIcon } from '../components/MinistryIcon'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { ministries } from '../data/ministries'
import { usePageMeta } from '../hooks/usePageMeta'

export function MinistryDetail() {
  const { id } = useParams<{ id: string }>()
  const { t, lang } = useLanguage()
  const ministry = ministries.find((m) => m.id === id)

  usePageMeta(
    ministry ? `${ministry.name[lang]} — ${churchInfo.shortName}` : t.ministries.notFound,
    ministry?.mission[lang],
    { noIndex: !ministry },
  )

  if (!ministry) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
        <p className="text-slate-600 dark:text-night-300">{t.ministries.notFound}</p>
        <Link
          to="/ministerios"
          className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800 dark:bg-gold-500 dark:text-night-950 dark:hover:bg-gold-400"
        >
          {t.ministries.backToMinistries}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        to="/ministerios"
        className="text-sm font-semibold text-brand-700 hover:underline dark:text-gold-400"
      >
        ← {t.ministries.backToMinistries}
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-brand-950 dark:text-white sm:text-4xl">{ministry.name[lang]}</h1>

      {ministry.leaders.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-6">
          {ministry.leaders.map((leader) => (
            <a
              key={leader.email}
              href={`mailto:${leader.email}`}
              className="group flex items-center gap-3"
            >
              <img
                src={leader.photo ?? logoMark}
                alt=""
                className="h-14 w-14 rounded-full object-cover ring-2 ring-brand-100 dark:ring-night-700"
              />
              <span className="text-sm font-medium text-brand-900 group-hover:text-brand-700 group-hover:underline dark:text-white dark:group-hover:text-gold-300">
                {leader.name}
              </span>
            </a>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {[
          { icon: 'mission', title: t.ministries.missionTitle, body: ministry.mission[lang] },
          { icon: 'vision', title: t.ministries.visionTitle, body: ministry.vision[lang] },
        ].map((card) => (
          <div
            key={card.icon}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-300 hover:shadow-md dark:border-night-800 dark:bg-night-900 dark:shadow-none dark:hover:border-gold-500/40"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl transition-colors group-hover:bg-gold-400/25 dark:bg-gold-400/5 dark:group-hover:bg-gold-400/10" />
            <div className="text-gold-600 transition-transform duration-300 group-hover:scale-105 dark:text-gold-400">
              <MinistryIcon id={card.icon} className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-lg font-semibold tracking-tight text-brand-950 dark:text-white">{card.title}</h2>
            <p className="mt-3 text-slate-700 dark:text-night-300">{card.body}</p>
          </div>
        ))}
      </div>

      {ministry.invitation && (
        <div className="group relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-300 hover:shadow-md dark:border-night-800 dark:bg-night-900 dark:shadow-none dark:hover:border-gold-500/40">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl transition-colors group-hover:bg-gold-400/25 dark:bg-gold-400/5 dark:group-hover:bg-gold-400/10" />
          <div className="text-gold-600 transition-transform duration-300 group-hover:scale-105 dark:text-gold-400">
            <MinistryIcon id="invite" className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold tracking-tight text-brand-950 dark:text-white">
            {t.ministries.joinTitle}
          </h2>
          <p className="mt-3 text-slate-700 dark:text-night-300">{ministry.invitation[lang]}</p>
        </div>
      )}
    </div>
  )
}
