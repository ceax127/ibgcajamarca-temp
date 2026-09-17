export interface ScheduleItem {
  id: string
  /** 0 = Sunday ... 6 = Saturday, matching Date#getDay(). */
  dayOfWeek: number
  time: { es: string; en: string }
  title: { es: string; en: string }
}

// The church's recurring weekly schedule (not one-off dated events, so
// there's nothing here to go stale week to week).
export const weeklySchedule: ScheduleItem[] = [
  {
    id: 'culto-dominical',
    dayOfWeek: 0,
    time: { es: '10:00 a. m.', en: '10:00 a.m.' },
    title: { es: 'Culto Dominical', en: 'Sunday Service' },
  },
  {
    id: 'reunion-hombres',
    dayOfWeek: 2,
    time: { es: '7:00 p. m.', en: '7:00 p.m.' },
    title: { es: 'Reunión de Hombres', en: 'Men’s Meeting' },
  },
  {
    id: 'estudio-doctrinal',
    dayOfWeek: 3,
    time: { es: '7:30 p. m.', en: '7:30 p.m.' },
    title: { es: 'Estudio Bíblico Doctrinal', en: 'Doctrinal Bible Study' },
  },
  {
    id: 'reunion-mujeres',
    dayOfWeek: 4,
    time: { es: '7:00 p. m.', en: '7:00 p.m.' },
    title: { es: 'Reunión de Mujeres', en: 'Women’s Meeting' },
  },
  {
    id: 'instituto-biblico',
    dayOfWeek: 6,
    time: { es: '7:30 p. m.', en: '7:30 p.m.' },
    title: { es: 'Instituto Bíblico', en: 'Bible Institute' },
  },
]

/** Capitalized weekday name (e.g. "Domingo", "Sunday") for a given dayOfWeek. */
export function dayName(dayOfWeek: number, lang: 'es' | 'en'): string {
  // Jan 1, 2023 was a Sunday, so this reference date maps dayOfWeek 0-6 to
  // the right weekday without needing a hardcoded name list per language.
  const reference = new Date(Date.UTC(2023, 0, 1 + dayOfWeek))
  const name = new Intl.DateTimeFormat(lang === 'es' ? 'es-PE' : 'en-US', {
    weekday: 'long',
    timeZone: 'UTC',
  }).format(reference)
  return name.charAt(0).toUpperCase() + name.slice(1)
}
