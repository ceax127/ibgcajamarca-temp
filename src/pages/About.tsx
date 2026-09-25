import pastoresPhoto from '../assets/foto_pastores.jpg'
import { MinistryIcon } from '../components/MinistryIcon'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { usePageMeta } from '../hooks/usePageMeta'

// Belief/distinctive copy ends with a trailing "(scripture refs)" — split
// that off so it can be rendered as its own badge instead of buried inline.
function splitScripture(body: string): { text: string; refs: string | null } {
  const match = body.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
  if (!match) return { text: body, refs: null }
  return { text: match[1], refs: match[2] }
}

export function About() {
  const { t } = useLanguage()
  usePageMeta(`${t.about.title} — ${churchInfo.shortName}`, t.about.mission)

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
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

      {/* "Lo que Creemos" — an accordion instead of 12 continuous paragraphs,
          so the doctrinal declaration doesn't read like a PDF pasted onto
          the page. */}
      <div className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold text-brand-950 dark:text-white">{t.about.beliefsTitle}</h2>
        <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200 dark:divide-night-800 dark:border-night-800">
          {t.about.beliefs.map((belief) => {
            const { text, refs } = splitScripture(belief.body)
            return (
              <details key={belief.title} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 marker:content-none">
                  <span className="font-medium text-brand-950 dark:text-white">{belief.title}</span>
                  <span className="text-xl leading-none text-gold-500 transition-transform duration-200 group-open:rotate-45 dark:text-gold-400">
                    +
                  </span>
                </summary>
                <div className="mt-3 text-slate-700 dark:text-night-300">
                  <p>{text}</p>
                  {refs && (
                    <span className="mt-2 inline-block rounded bg-slate-100 px-2 py-1 text-xs text-slate-500 dark:bg-night-800 dark:text-night-400">
                      {refs}
                    </span>
                  )}
                </div>
              </details>
            )
          })}
        </div>
      </div>

      {/* "Nuestros Distintivos Centrales" — a card grid with an index badge
          instead of a plain numbered list. */}
      <div className="mt-16 border-t border-slate-200 pt-12 dark:border-night-800">
        <h2 className="text-2xl font-semibold text-brand-950 dark:text-white">{t.about.distinctivesTitle}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.about.distinctives.map((distinctive, i) => {
            const { text, refs } = splitScripture(distinctive.body)
            const title = distinctive.title.replace(/^\d+\.\s*/, '')
            return (
              <div
                key={distinctive.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-night-800 dark:bg-night-900 dark:shadow-none"
              >
                <span className="inline-flex w-fit items-center rounded bg-gold-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-gold-700 dark:text-gold-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-base font-semibold text-brand-950 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-night-300">{text}</p>
                {refs && (
                  <p className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-night-800 dark:text-night-400">
                    {refs}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* "Sobre la Ofrenda" — stands alone as its own message rather than
          being buried as the 8th item in the distinctives grid. */}
      <div className="mt-16 border-t border-slate-200 pt-12 dark:border-night-800">
        {(() => {
          const { text, refs } = splitScripture(t.about.giving)
          return (
            <div className="relative overflow-hidden rounded-2xl border border-gold-400/30 bg-brand-50 p-6 shadow-sm dark:border-gold-500/30 dark:bg-night-900 dark:shadow-none sm:p-8">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/15 blur-2xl dark:bg-gold-400/5" />
              <div className="text-gold-600 dark:text-gold-400">
                <MinistryIcon id="benevolencia" className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-semibold tracking-tight text-brand-950 dark:text-white">
                {t.about.givingTitle}
              </h2>
              <p className="mt-3 text-slate-700 dark:text-night-300">{text}</p>
              {refs && (
                <p className="mt-4 border-t border-brand-100 pt-3 text-xs text-slate-500 dark:border-night-700 dark:text-night-400">
                  {refs}
                </p>
              )}
            </div>
          )
        })()}
      </div>

      {/* "Nuestra Historia" — a 50/50 split instead of an orphan paragraph
          trailing off after the heavy doctrinal sections above. */}
      <div className="mt-16 grid gap-8 border-t border-slate-200 pt-12 dark:border-night-800 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-brand-950 dark:text-white">{t.about.historyTitle}</h2>
          <p className="mt-4 text-slate-700 dark:text-night-300">{t.about.history}</p>
        </div>
        <div className="aspect-video overflow-hidden rounded-2xl">
          <img src={pastoresPhoto} alt="" className="h-full w-full object-cover object-[center_35%]" />
        </div>
      </div>
    </div>
  )
}
