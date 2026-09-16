import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { ministries } from '../data/ministries'

export function Ministries() {
  const { t, lang } = useLanguage()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading title={t.ministries.title} subtitle={t.ministries.subtitle} />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ministries.map((ministry) => (
          <div key={ministry.id} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="text-4xl">{ministry.icon}</div>
            <h3 className="mt-3 text-lg font-semibold text-brand-950">{ministry.name[lang]}</h3>
            <p className="mt-2 text-sm text-slate-600">{ministry.description[lang]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
