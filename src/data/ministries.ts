export interface MinistryLeader {
  name: string
  email: string
  // Real photo URL, once available. Falls back to the church logo mark as
  // a placeholder avatar everywhere this is unset.
  photo?: string
}

export interface Ministry {
  id: string
  name: { es: string; en: string }
  leaders: MinistryLeader[]
  // Whether this ministry gets its own detail page (/ministerios/:id) with
  // a vision statement and an invitation to get involved. Off for the
  // leadership-facing ministries (Pastoral, Maestros, Administración) —
  // those stay listing-only, no generated vision/invitation copy.
  hasPage: boolean
  vision?: { es: string; en: string }
  invitation?: { es: string; en: string }
}

// Email convention: first + last name(s) with no spaces, keeping the
// capitalization of each name, at @ibgcajamarca.org — e.g. "Anthony B Good"
// -> AnthonyBGood@ibgcajamarca.org.
const anthonyBGood: MinistryLeader = { name: 'Anthony B Good', email: 'AnthonyBGood@ibgcajamarca.org' }
const luisFlores: MinistryLeader = { name: 'Luis Flores', email: 'LuisFlores@ibgcajamarca.org' }
const charlyAlarcon: MinistryLeader = { name: 'Charly Alarcon', email: 'CharlyAlarcon@ibgcajamarca.org' }
const yamalyAlfaro: MinistryLeader = { name: 'Yamaly Alfaro', email: 'YamalyAlfaro@ibgcajamarca.org' }
const silviaFlores: MinistryLeader = { name: 'Silvia Flores', email: 'SilviaFlores@ibgcajamarca.org' }
const joseLuisGuerrero: MinistryLeader = { name: 'Jose Luis Guerrero', email: 'JoseLuisGuerrero@ibgcajamarca.org' }
const eddyMantilla: MinistryLeader = { name: 'Eddy Mantilla', email: 'EddyMantilla@ibgcajamarca.org' }
const erliMarin: MinistryLeader = { name: 'Erli Marin', email: 'ErliMarin@ibgcajamarca.org' }
const anthonyMoreno: MinistryLeader = { name: 'Anthony Moreno', email: 'AnthonyMoreno@ibgcajamarca.org' }
const bryanDeLaTorre: MinistryLeader = { name: 'Bryan de la Torre', email: 'BryanDelaTorre@ibgcajamarca.org' }

// Order: Pastoral, Maestros, Administración always first (in that order),
// then every other ministry alphabetically by Spanish name.
export const ministries: Ministry[] = [
  {
    id: 'pastoral',
    name: { es: 'Pastoral', en: 'Pastoral' },
    leaders: [anthonyBGood, luisFlores],
    hasPage: false,
  },
  {
    id: 'maestros',
    name: { es: 'Maestros', en: 'Teachers' },
    leaders: [anthonyBGood, luisFlores, charlyAlarcon],
    hasPage: false,
  },
  {
    id: 'administracion',
    name: { es: 'Administración', en: 'Administration' },
    leaders: [erliMarin],
    hasPage: false,
  },
  {
    id: 'adolescentes',
    name: { es: 'Adolescentes', en: 'Teens' },
    leaders: [joseLuisGuerrero],
    hasPage: true,
    vision: {
      es: 'Guiar a los adolescentes a construir su fe sobre fundamentos sólidos, ayudándolos a enfrentar los retos de esta etapa con la verdad de la Palabra de Dios.',
      en: 'To guide teens in building their faith on solid foundations, helping them face the challenges of this stage with the truth of God’s Word.',
    },
    invitation: {
      es: 'Si eres adolescente, o tienes uno en casa, te invitamos a nuestras reuniones semanales. Contáctanos para conocer horarios y actividades.',
      en: 'If you’re a teen — or have one at home — we invite you to our weekly meetings. Contact us for schedules and activities.',
    },
  },
  {
    id: 'alabanza',
    name: { es: 'Alabanza', en: 'Worship' },
    leaders: [bryanDeLaTorre],
    hasPage: true,
    vision: {
      es: 'Guiar a la congregación a adorar a Dios en espíritu y en verdad, preparando los corazones para recibir Su Palabra en cada servicio.',
      en: 'To lead the congregation in worshiping God in spirit and truth, preparing hearts to receive His Word in every service.',
    },
    invitation: {
      es: 'Si tienes un don musical y deseas usarlo para glorificar a Dios, te invitamos a formar parte de nuestro equipo de alabanza.',
      en: 'If you have a musical gift and want to use it to glorify God, we invite you to join our worship team.',
    },
  },
  {
    id: 'benevolencia',
    name: { es: 'Benevolencia', en: 'Benevolence' },
    leaders: [charlyAlarcon],
    hasPage: true,
    vision: {
      es: 'Ser las manos de Cristo para los que atraviesan necesidad, mostrando el amor de Dios de manera práctica dentro y fuera de la iglesia.',
      en: 'To be the hands of Christ for those in need, showing God’s love in practical ways inside and outside the church.',
    },
    invitation: {
      es: 'Si Dios ha puesto en tu corazón servir a los necesitados, este ministerio es para ti. Contáctanos para conocer cómo participar.',
      en: 'If God has placed a desire in your heart to serve those in need, this ministry is for you. Contact us to find out how to get involved.',
    },
  },
  {
    id: 'cafeteria',
    name: { es: 'Cafetería', en: 'Cafeteria' },
    leaders: [],
    hasPage: true,
    vision: {
      es: 'Servir con alegría una taza de café y un espacio cálido de comunión antes y después de cada servicio, para que cada visita se sienta como en familia.',
      en: 'To joyfully serve a cup of coffee and a warm space for fellowship before and after each service, so every visit feels like family.',
    },
    invitation: {
      es: 'Si te gusta servir con una sonrisa y recibir a las personas, este ministerio es para ti. Contáctanos para unirte al equipo.',
      en: 'If you enjoy serving with a smile and welcoming people, this ministry is for you. Contact us to join the team.',
    },
  },
  {
    id: 'eventos-especiales',
    name: { es: 'Eventos Especiales', en: 'Special Events' },
    leaders: [eddyMantilla],
    hasPage: true,
    vision: {
      es: 'Organizar actividades que fortalezcan la comunión de la iglesia y sirvan como puerta de entrada para que otros conozcan a Cristo.',
      en: 'To organize activities that strengthen the church’s fellowship and serve as an entry point for others to come to know Christ.',
    },
    invitation: {
      es: 'Si te gustaría ayudar a planear y organizar nuestros próximos eventos, contáctanos: siempre hay un lugar para servir.',
      en: 'If you’d like to help plan and organize our upcoming events, reach out — there’s always a place to serve.',
    },
  },
  {
    id: 'hombres',
    name: { es: 'Hombres', en: 'Men' },
    leaders: [luisFlores],
    hasPage: true,
    vision: {
      es: 'Formar hombres que honren a Dios en su hogar, su trabajo y su iglesia, creciendo juntos en integridad, oración y estudio de la Palabra.',
      en: 'To form men who honor God in their home, work, and church, growing together in integrity, prayer, and the study of the Word.',
    },
    invitation: {
      es: 'Si eres hombre y buscas una comunidad que te anime a crecer en tu fe, te invitamos a unirte a nuestras reuniones. Escríbele a nuestro líder para más información.',
      en: 'If you’re a man looking for a community that will encourage you to grow in your faith, we invite you to join our meetings. Reach out to our leader to learn more.',
    },
  },
  {
    id: 'mujeres',
    name: { es: 'Mujeres', en: 'Women' },
    leaders: [yamalyAlfaro],
    hasPage: true,
    vision: {
      es: 'Acompañar a las mujeres de nuestra iglesia en su caminar con Cristo, fortaleciendo su fe, su familia y su servicio a través de la comunión y el estudio bíblico.',
      en: 'To walk alongside the women of our church in their journey with Christ, strengthening their faith, family, and service through fellowship and Bible study.',
    },
    invitation: {
      es: 'Buscamos mujeres que deseen crecer juntas en la Palabra y en amistad. Contacta a nuestra líder para conocer nuestros próximos encuentros.',
      en: 'We’re looking for women who want to grow together in the Word and in friendship. Contact our leader to find out about our next gathering.',
    },
  },
  {
    id: 'ninos',
    name: { es: 'Niños', en: 'Children' },
    leaders: [silviaFlores],
    hasPage: true,
    vision: {
      es: 'Sembrar la Palabra de Dios en el corazón de los niños desde temprana edad, enseñándoles a amar a Jesús de una manera clara, segura y alegre.',
      en: 'To plant God’s Word in children’s hearts from an early age, teaching them to love Jesus in a clear, safe, and joyful way.',
    },
    invitation: {
      es: 'Si tienes hijos, te invitamos a traerlos a nuestra clase infantil durante el culto. Escríbenos para conocer más sobre nuestro programa.',
      en: 'If you have children, we invite you to bring them to our children’s class during the service. Reach out to learn more about our program.',
    },
  },
  {
    id: 'produccion',
    name: { es: 'Producción', en: 'Production' },
    leaders: [anthonyMoreno],
    hasPage: true,
    vision: {
      es: 'Servir con excelencia detrás de cámaras para que la Palabra de Dios se transmita con claridad, tanto dentro del templo como a quienes nos siguen en línea.',
      en: 'To serve with excellence behind the scenes so God’s Word comes through clearly, both inside the building and for those following online.',
    },
    invitation: {
      es: 'Si tienes interés en audio, video o tecnología, te invitamos a servir en este equipo. Escríbenos para más información.',
      en: 'If you’re interested in audio, video, or technology, we invite you to serve on this team. Reach out to learn more.',
    },
  },
  {
    id: 'ujieres',
    name: { es: 'Ujieres', en: 'Ushers' },
    leaders: [],
    hasPage: true,
    vision: {
      es: 'Recibir a cada persona que llega a la iglesia con una sonrisa y disposición a servir, ayudando a que cada servicio se desarrolle en orden y con excelencia.',
      en: 'To welcome everyone who comes to church with a smile and a readiness to serve, helping every service run in order and with excellence.',
    },
    invitation: {
      es: 'Si te gustaría ser de los primeros rostros que reciben a nuestros visitantes, te invitamos a servir como ujier. Escríbenos para más información.',
      en: 'If you’d like to be one of the first faces our visitors see, we invite you to serve as an usher. Reach out to learn more.',
    },
  },
]
