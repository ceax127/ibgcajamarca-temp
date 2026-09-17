import { useLanguage } from '../context/LanguageContext'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="inline-flex items-center rounded-full border border-brand-200 bg-white p-0.5 text-sm font-medium dark:border-night-600 dark:bg-night-800">
      <button
        type="button"
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === 'es'
            ? 'bg-brand-700 text-white dark:bg-gold-500 dark:text-night-950'
            : 'text-brand-700 hover:bg-brand-50 dark:text-night-300 dark:hover:bg-night-700'
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === 'en'
            ? 'bg-brand-700 text-white dark:bg-gold-500 dark:text-night-950'
            : 'text-brand-700 hover:bg-brand-50 dark:text-night-300 dark:hover:bg-night-700'
        }`}
      >
        EN
      </button>
    </div>
  )
}
