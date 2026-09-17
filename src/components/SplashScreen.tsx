import { useEffect, useState } from 'react'
import logoMark from '../assets/Marca_IBG_placa.png'

type Stage = 'in' | 'hold' | 'out' | 'done'

/**
 * Full-screen intro shown once per page load: the logo fades/scales in,
 * holds briefly, then the whole overlay fades out to reveal the site. Purely
 * decorative — aria-hidden, no focusable content, and brief enough not to
 * meaningfully delay access to the page.
 */
export function SplashScreen() {
  const [stage, setStage] = useState<Stage>('in')

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('hold'), 50),
      setTimeout(() => setStage('out'), 900),
      setTimeout(() => setStage('done'), 1400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  if (stage === 'done') return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-brand-950 transition-opacity duration-500 dark:bg-black ${
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
    </div>
  )
}
