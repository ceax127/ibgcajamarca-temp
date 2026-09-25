export interface MinistryLeader {
  name: string
  email: string
  // Real photo URL, once available. Falls back to the church logo mark as
  // a placeholder avatar everywhere this is unset.
  photo?: string
}

export type MinistryCategory = 'teaching' | 'community' | 'service'

export interface Ministry {
  id: string
  name: { es: string; en: string }
  // One-line summary shown on the ministry card in the listing grid.
  tagline: { es: string; en: string }
  category: MinistryCategory
  leaders: MinistryLeader[]
  mission: { es: string; en: string }
  vision: { es: string; en: string }
  // Omitted for Pastoral, Maestros, and Administración — these are
  // leadership-facing ministries that don't take volunteer requests.
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
    tagline: {
      es: 'Enseñanza, cuidado y guía espiritual para la congregación.',
      en: 'Teaching, care, and spiritual guidance for the congregation.',
    },
    category: 'teaching',
    leaders: [anthonyBGood, luisFlores],
    mission: {
      es: 'Pastorear a la congregación con la Palabra de Dios: predicar, aconsejar y velar por el cuidado espiritual de cada familia de la iglesia.',
      en: 'To shepherd the congregation with the Word of God: preaching, counseling, and watching over the spiritual care of every family in the church.',
    },
    vision: {
      es: 'Ver una iglesia madura en la fe, firme en la sana doctrina y comprometida con la Gran Comisión.',
      en: 'To see a church mature in the faith, firm in sound doctrine, and committed to the Great Commission.',
    },
  },
  {
    id: 'maestros',
    name: { es: 'Maestros', en: 'Teachers' },
    tagline: {
      es: 'Enseñanza bíblica sólida para todas las edades.',
      en: 'Sound biblical teaching for every age group.',
    },
    category: 'teaching',
    leaders: [anthonyBGood, luisFlores, charlyAlarcon],
    mission: {
      es: 'Enseñar la Palabra de Dios con precisión y claridad en cada clase y estudio bíblico, para todas las edades de la congregación.',
      en: 'To teach God’s Word with precision and clarity in every class and Bible study, for every age group in the congregation.',
    },
    vision: {
      es: 'Formar creyentes que conozcan y amen las Escrituras lo suficiente como para vivirlas y enseñarlas a otros.',
      en: 'To form believers who know and love the Scriptures well enough to live them out and teach them to others.',
    },
  },
  {
    id: 'administracion',
    name: { es: 'Administración', en: 'Administration' },
    tagline: {
      es: 'Gestión responsable de los recursos de la iglesia.',
      en: 'Responsible stewardship of the church’s resources.',
    },
    category: 'teaching',
    leaders: [erliMarin],
    mission: {
      es: 'Administrar con integridad y transparencia los recursos que Dios ha confiado a la iglesia, sirviendo de soporte a cada ministerio.',
      en: 'To manage with integrity and transparency the resources God has entrusted to the church, providing support to every ministry.',
    },
    vision: {
      es: 'Ser buenos mayordomos de lo que Dios nos da, para que la iglesia pueda enfocarse en su misión sin distracciones.',
      en: 'To be good stewards of what God provides, so the church can stay focused on its mission without distraction.',
    },
  },
  {
    id: 'adolescentes',
    name: { es: 'Adolescentes', en: 'Teens' },
    tagline: {
      es: 'Un espacio semanal de fe y comunidad para los adolescentes.',
      en: 'A weekly space of faith and community for teens.',
    },
    category: 'community',
    leaders: [joseLuisGuerrero],
    mission: {
      es: 'Acompañar semana a semana a los adolescentes con enseñanza bíblica y comunión, en un espacio donde puedan hacer preguntas difíciles con libertad.',
      en: 'To walk alongside teens week by week with biblical teaching and fellowship, in a space where they can ask hard questions freely.',
    },
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
    tagline: {
      es: 'Adoración que prepara los corazones para la Palabra.',
      en: 'Worship that prepares hearts for the Word.',
    },
    category: 'service',
    leaders: [bryanDeLaTorre],
    mission: {
      es: 'Dirigir la alabanza congregacional cada servicio, cuidando que la música señale siempre a Cristo y no a nosotros mismos.',
      en: 'To lead congregational worship every service, making sure the music always points to Christ and not to ourselves.',
    },
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
    tagline: {
      es: 'Ayuda práctica para quienes atraviesan necesidad.',
      en: 'Practical help for those in need.',
    },
    category: 'service',
    leaders: [charlyAlarcon],
    mission: {
      es: 'Identificar y atender con prontitud las necesidades materiales de los hermanos de la iglesia y de la comunidad a nuestro alrededor.',
      en: 'To identify and promptly respond to the material needs of our church family and the community around us.',
    },
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
    tagline: {
      es: 'Café y comunión antes y después de cada servicio.',
      en: 'Coffee and fellowship before and after every service.',
    },
    category: 'service',
    leaders: [],
    mission: {
      es: 'Preparar y servir café y refrigerio antes y después de cada servicio, cuidando cada detalle para que los visitantes se sientan bienvenidos.',
      en: 'To prepare and serve coffee and refreshments before and after each service, taking care of every detail so visitors feel welcome.',
    },
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
    tagline: {
      es: 'Actividades que fortalecen la comunión de la iglesia.',
      en: 'Activities that strengthen the church’s fellowship.',
    },
    category: 'service',
    leaders: [eddyMantilla],
    mission: {
      es: 'Planificar y ejecutar actividades especiales de la iglesia a lo largo del año, cuidando cada detalle logístico de principio a fin.',
      en: 'To plan and run the church’s special activities throughout the year, handling every logistical detail from start to finish.',
    },
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
    tagline: {
      es: 'Comunión y estudio de la Palabra para varones.',
      en: 'Fellowship and study of the Word for men.',
    },
    category: 'community',
    leaders: [luisFlores],
    mission: {
      es: 'Reunir semanalmente a los hombres de la iglesia para el estudio de la Palabra, la oración y la rendición de cuentas mutua.',
      en: 'To gather the men of the church weekly for the study of the Word, prayer, and mutual accountability.',
    },
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
    tagline: {
      es: 'Comunión y crecimiento espiritual para mujeres.',
      en: 'Fellowship and spiritual growth for women.',
    },
    category: 'community',
    leaders: [yamalyAlfaro],
    mission: {
      es: 'Reunir a las mujeres de la iglesia para el estudio bíblico, la oración y la comunión, apoyándose unas a otras en cada etapa de la vida.',
      en: 'To gather the women of the church for Bible study, prayer, and fellowship, supporting one another through every stage of life.',
    },
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
    tagline: {
      es: 'La Palabra de Dios enseñada de forma clara y segura.',
      en: 'God’s Word taught clearly and safely.',
    },
    category: 'community',
    leaders: [silviaFlores],
    mission: {
      es: 'Enseñar la Palabra de Dios a los niños durante el culto, en un ambiente seguro, divertido y apropiado para cada edad.',
      en: 'To teach God’s Word to children during the service, in an environment that’s safe, fun, and age-appropriate.',
    },
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
    tagline: {
      es: 'Audio, video y transmisión en vivo de cada servicio.',
      en: 'Audio, video, and live stream for every service.',
    },
    category: 'service',
    leaders: [anthonyMoreno],
    mission: {
      es: 'Operar el audio, video y transmisión en vivo de cada servicio, para que la Palabra llegue con claridad dentro y fuera del templo.',
      en: 'To run the audio, video, and live stream for every service, so the Word comes through clearly both inside and outside the building.',
    },
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
    tagline: {
      es: 'La primera bienvenida cálida a cada visitante.',
      en: 'The first warm welcome for every visitor.',
    },
    category: 'service',
    leaders: [],
    mission: {
      es: 'Recibir y acomodar a la congregación y a los visitantes en cada servicio, manteniendo el orden y resolviendo cualquier necesidad práctica.',
      en: 'To welcome and seat the congregation and visitors at every service, keeping things orderly and handling practical needs as they come up.',
    },
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
