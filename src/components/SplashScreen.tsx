import { useEffect, useState } from 'react'
import logoMark from '../assets/Marca_IBG_placa.png'
import { hasStoredLanguagePreference, useLanguage } from '../context/LanguageContext'

type Stage = 'in' | 'choose' | 'hold' | 'out' | 'done'

/**
 * Full-screen intro shown once per page load: the logo fades/scales in,
 * then either holds briefly and fades out (returning visitors, who already
 * have a language preference stored), or — for first-time visitors — waits
 * on an explicit Español/English choice before fading out. This is in
 * addition to, not instead of, the language toggle in the header.
 */
export function SplashScreen() {
  const { setLang } = useLanguage()
  const [needsChoice] = useState(() => !hasStoredLanguagePreference())
  const [stage, setStage] = useState<Stage>('in')

  useEffect(() => {
    if (needsChoice) {
      const t = setTimeout(() => setStage('choose'), 400)
      return () => clearTimeout(t)
    }
    const timers = [
      setTimeout(() => setStage('hold'), 50),
      setTimeout(() => setStage('out'), 900),
      setTimeout(() => setStage('done'), 1400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [needsChoice])

  function choose(lang: 'es' | 'en') {
    setLang(lang)
    setStage('out')
    setTimeout(() => setStage('done'), 500)
  }

  if (stage === 'done') return null

  return (
    <div
      aria-hidden={stage !== 'choose'}
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-brand-950 transition-opacity duration-500 dark:bg-black ${
        stage === 'out' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <img
        src={logoMark}
        alt=""
        className={`h-24 w-24 transition-all duration-700 ease-out sm:h-28 sm:w-28 ${
          stage === 'in' ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      />

      {stage === 'choose' && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-brand-200">Elige tu idioma · Choose your language</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => choose('es')}
              className="rounded-full border border-white/25 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-gold-400/50 hover:bg-white/10"
            >
              Español
            </button>
            <button
              type="button"
              onClick={() => choose('en')}
              className="rounded-full border border-white/25 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-gold-400/50 hover:bg-white/10"
            >
              English
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
