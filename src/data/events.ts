export interface ChurchEvent {
  id: string
  date: string // ISO date, e.g. "2026-10-04"
  time: string
  title: { es: string; en: string }
  description: { es: string; en: string }
  location: string
}

// Placeholder events — replace with real dates, or later fetch these from
// a database/API once the site moves off static content.
export const events: ChurchEvent[] = [
  {
    id: 'culto-dominical',
    date: '2026-09-20',
    time: '10:00 a. m.',
    title: { es: 'Culto Dominical', en: 'Sunday Service' },
    description: {
      es: 'Servicio principal de adoración, enseñanza de la Palabra y comunión.',
      en: 'Our main worship service, with teaching from the Word and fellowship.',
    },
    location: 'Templo principal, Cajamarca',
  },
  {
    id: 'noche-jovenes',
    date: '2026-09-26',
    time: '6:00 p. m.',
    title: { es: 'Noche de Jóvenes', en: 'Youth Night' },
    description: {
      es: 'Un tiempo de alabanza, enseñanza y comunión para adolescentes y jóvenes.',
      en: 'A time of worship, teaching, and fellowship for teens and young adults.',
    },
    location: 'Salón de jóvenes',
  },
  {
    id: 'estudio-biblico',
    date: '2026-09-24',
    time: '7:00 p. m.',
    title: { es: 'Estudio Bíblico', en: 'Bible Study' },
    description: {
      es: 'Estudio semanal en grupos pequeños para profundizar en la Palabra de Dios.',
      en: 'Weekly small-group study to dig deeper into God’s Word.',
    },
    location: 'Varios hogares / templo',
  },
]
