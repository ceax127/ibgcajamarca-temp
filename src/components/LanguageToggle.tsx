import { useLanguage } from '../context/LanguageContext'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="inline-flex items-center rounded-full border border-brand-200 bg-white p-0.5 text-sm font-medium">
      <button
        type="button"
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === 'es' ? 'bg-brand-700 text-white' : 'text-brand-700 hover:bg-brand-50'
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === 'en' ? 'bg-brand-700 text-white' : 'text-brand-700 hover:bg-brand-50'
        }`}
      >
        EN
      </button>
    </div>
  )
}
