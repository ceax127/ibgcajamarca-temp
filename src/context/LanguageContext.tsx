import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { type Lang, type TranslationDict, translations } from '../i18n/translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: TranslationDict
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'ibg-cajamarca-lang'

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'es'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'es' || stored === 'en') return stored
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

// Whether the visitor has ever explicitly picked (or previously been
// auto-detected into) a language — used by SplashScreen to only prompt
// first-time visitors, not returning ones. Must be read before
// LanguageProvider's own effect below writes a default value.
export function hasStoredLanguagePreference(): boolean {
  if (typeof window === 'undefined') return true
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'es' || stored === 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Lang) => setLangState(next)
  const toggleLang = () => setLangState((prev) => (prev === 'es' ? 'en' : 'es'))

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t: translations[lang] }),
    [lang],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
