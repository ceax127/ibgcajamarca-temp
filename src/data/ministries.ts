export interface MinistryLeader {
  name: string
  email: string
}

export interface Ministry {
  id: string
  name: { es: string; en: string }
  leaders: MinistryLeader[]
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

export const ministries: Ministry[] = [
  {
    id: 'pastoral',
    name: { es: 'Pastoral', en: 'Pastoral' },
    leaders: [anthonyBGood, luisFlores],
  },
  {
    id: 'maestros',
    name: { es: 'Maestros', en: 'Teachers' },
    leaders: [anthonyBGood, luisFlores, charlyAlarcon],
  },
  {
    id: 'hombres',
    name: { es: 'Hombres', en: 'Men' },
    leaders: [luisFlores],
  },
  {
    id: 'mujeres',
    name: { es: 'Mujeres', en: 'Women' },
    leaders: [yamalyAlfaro],
  },
  {
    id: 'ninos',
    name: { es: 'Niños', en: 'Children' },
    leaders: [silviaFlores],
  },
  {
    id: 'adolescentes',
    name: { es: 'Adolescentes', en: 'Teens' },
    leaders: [joseLuisGuerrero],
  },
  {
    id: 'eventos-especiales',
    name: { es: 'Eventos Especiales', en: 'Special Events' },
    leaders: [eddyMantilla],
  },
  {
    id: 'benevolencia',
    name: { es: 'Benevolencia', en: 'Benevolence' },
    leaders: [charlyAlarcon],
  },
  {
    id: 'administracion',
    name: { es: 'Administración', en: 'Administration' },
    leaders: [erliMarin],
  },
  {
    id: 'produccion',
    name: { es: 'Producción', en: 'Production' },
    leaders: [anthonyMoreno],
  },
  {
    id: 'alabanza',
    name: { es: 'Alabanza', en: 'Worship' },
    leaders: [bryanDeLaTorre],
  },
]
