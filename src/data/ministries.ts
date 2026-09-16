export interface Ministry {
  id: string
  icon: string
  name: { es: string; en: string }
  description: { es: string; en: string }
}

export const ministries: Ministry[] = [
  {
    id: 'ninos',
    icon: '🧒',
    name: { es: 'Ministerio Infantil', en: 'Children’s Ministry' },
    description: {
      es: 'Enseñamos la Palabra de Dios a los más pequeños de una forma divertida y memorable.',
      en: 'We teach God’s Word to the youngest members of our church in a fun, memorable way.',
    },
  },
  {
    id: 'jovenes',
    icon: '🔥',
    name: { es: 'Jóvenes', en: 'Youth' },
    description: {
      es: 'Un espacio para adolescentes y jóvenes que buscan crecer en su fe y en comunidad.',
      en: 'A space for teens and young adults growing in faith and community together.',
    },
  },
  {
    id: 'adoracion',
    icon: '🎵',
    name: { es: 'Adoración', en: 'Worship' },
    description: {
      es: 'Nuestro equipo de alabanza guía a la congregación a adorar a Dios en cada servicio.',
      en: 'Our worship team leads the congregation in praise during every service.',
    },
  },
  {
    id: 'matrimonios',
    icon: '💍',
    name: { es: 'Matrimonios y Familia', en: 'Marriage & Family' },
    description: {
      es: 'Fortaleciendo hogares con principios bíblicos sólidos para el matrimonio y la crianza.',
      en: 'Strengthening homes with solid biblical principles for marriage and parenting.',
    },
  },
  {
    id: 'discipulado',
    icon: '📖',
    name: { es: 'Discipulado', en: 'Discipleship' },
    description: {
      es: 'Grupos pequeños de estudio bíblico para crecer en el conocimiento de la Palabra.',
      en: 'Small group Bible studies to grow in the knowledge of the Word.',
    },
  },
  {
    id: 'mision',
    icon: '🌍',
    name: { es: 'Misiones', en: 'Missions' },
    description: {
      es: 'Llevando el evangelio más allá de nuestras fronteras a través de acción social y misiones.',
      en: 'Taking the gospel beyond our walls through outreach and mission trips.',
    },
  },
]
