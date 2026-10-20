// Content for the Instituto Bíblico ("/seminario") page — the church's Bible
// institute. Bilingual fields follow the { es, en } convention used across
// src/data (see ministries.ts), so this stays a plain data file that both
// languages of the page can read from directly.

export interface Course {
  id: string
  title: { es: string; en: string }
  hours: number
  summary: { es: string; en: string }
}

export interface Level {
  id: string
  number: number
  name: { es: string; en: string }
  goal: { es: string; en: string }
  courses: Course[]
}

export const levels: Level[] = [
  {
    id: 'fundamentos',
    number: 1,
    name: { es: 'Fundamentos', en: 'Foundations' },
    goal: {
      es: 'Una base sólida en las Escrituras y la fe cristiana para todo creyente.',
      en: 'A solid foundation in Scripture and the Christian faith for every believer.',
    },
    courses: [
      {
        id: 'panorama-at',
        title: { es: 'Panorama del Antiguo Testamento', en: 'Old Testament Survey' },
        hours: 24,
        summary: {
          es: 'Recorrido libro por libro desde Génesis hasta Malaquías y su lugar en la historia de la redención.',
          en: 'A book-by-book journey from Genesis to Malachi and its place in redemptive history.',
        },
      },
      {
        id: 'panorama-nt',
        title: { es: 'Panorama del Nuevo Testamento', en: 'New Testament Survey' },
        hours: 24,
        summary: {
          es: 'Los Evangelios, Hechos, las epístolas y Apocalipsis, con su trasfondo histórico y teológico.',
          en: 'The Gospels, Acts, the epistles, and Revelation, with their historical and theological background.',
        },
      },
      {
        id: 'doctrina-salvacion',
        title: { es: 'Doctrina de la Salvación', en: 'Doctrine of Salvation' },
        hours: 16,
        summary: {
          es: 'Elección, regeneración, justificación, santificación y glorificación conforme a las doctrinas de la gracia.',
          en: 'Election, regeneration, justification, sanctification, and glorification according to the doctrines of grace.',
        },
      },
      {
        id: 'vida-devocional',
        title: { es: 'Vida Cristiana y Devocional', en: 'Christian & Devotional Life' },
        hours: 12,
        summary: {
          es: 'Disciplinas espirituales: oración, estudio personal de la Biblia, ayuno y comunión con Dios.',
          en: 'Spiritual disciplines: prayer, personal Bible study, fasting, and communion with God.',
        },
      },
    ],
  },
  {
    id: 'doctrina',
    number: 2,
    name: { es: 'Doctrina y Teología', en: 'Doctrine & Theology' },
    goal: {
      es: 'Teología sistemática completa, edificada verso por verso sobre el texto bíblico.',
      en: 'Complete systematic theology, built verse by verse on the biblical text.',
    },
    courses: [
      {
        id: 'teologia-1',
        title: { es: 'Teología Sistemática I: Dios y la Biblia', en: 'Systematic Theology I: God & Scripture' },
        hours: 20,
        summary: {
          es: 'Bibliología, la Trinidad y los atributos de Dios Padre, Hijo y Espíritu Santo.',
          en: 'Bibliology, the Trinity, and the attributes of God the Father, Son, and Holy Spirit.',
        },
      },
      {
        id: 'teologia-2',
        title: { es: 'Teología Sistemática II: El Hombre y el Pecado', en: 'Systematic Theology II: Man & Sin' },
        hours: 16,
        summary: {
          es: 'Antropología bíblica, la caída, la naturaleza del pecado y sus consecuencias.',
          en: 'Biblical anthropology, the fall, the nature of sin, and its consequences.',
        },
      },
      {
        id: 'teologia-3',
        title: { es: 'Teología Sistemática III: Cristo y la Salvación', en: 'Systematic Theology III: Christ & Salvation' },
        hours: 20,
        summary: {
          es: 'Cristología, la obra expiatoria de Cristo y la aplicación de la redención.',
          en: 'Christology, the atoning work of Christ, and the application of redemption.',
        },
      },
      {
        id: 'teologia-4',
        title: { es: 'Teología Sistemática IV: La Iglesia y las Últimas Cosas', en: 'Systematic Theology IV: The Church & Last Things' },
        hours: 20,
        summary: {
          es: 'Eclesiología y escatología dispensacional: el programa de Dios para Israel y la Iglesia.',
          en: 'Ecclesiology and dispensational eschatology: God’s program for Israel and the Church.',
        },
      },
      {
        id: 'historia-iglesia',
        title: { es: 'Historia de la Iglesia', en: 'Church History' },
        hours: 16,
        summary: {
          es: 'De los apóstoles a la Reforma y el evangelicalismo contemporáneo.',
          en: 'From the apostles to the Reformation and contemporary evangelicalism.',
        },
      },
    ],
  },
  {
    id: 'interpretacion',
    number: 3,
    name: { es: 'Interpretación y Herramientas', en: 'Interpretation & Tools' },
    goal: {
      es: 'Herramientas para manejar con precisión la Palabra de verdad y defender la fe.',
      en: 'Tools to rightly handle the word of truth and defend the faith.',
    },
    courses: [
      {
        id: 'hermeneutica',
        title: { es: 'Hermenéutica Bíblica', en: 'Biblical Hermeneutics' },
        hours: 20,
        summary: {
          es: 'El método literal-gramatical-histórico para interpretar cada género bíblico correctamente.',
          en: 'The literal-grammatical-historical method for correctly interpreting every biblical genre.',
        },
      },
      {
        id: 'metodos-estudio',
        title: { es: 'Métodos de Estudio Bíblico', en: 'Bible Study Methods' },
        hours: 12,
        summary: {
          es: 'Estudio inductivo, uso de idiomas originales en herramientas digitales y comentarios.',
          en: 'Inductive study, using original-language tools and commentaries.',
        },
      },
      {
        id: 'apologetica',
        title: { es: 'Apologética Cristiana', en: 'Christian Apologetics' },
        hours: 16,
        summary: {
          es: 'Defensa razonada de la fe frente al escepticismo y las cosmovisiones seculares.',
          en: 'A reasoned defense of the faith against skepticism and secular worldviews.',
        },
      },
      {
        id: 'contra-sectas',
        title: { es: 'Cosmovisión Bíblica y Contra Sectas', en: 'Biblical Worldview & Cults' },
        hours: 12,
        summary: {
          es: 'Discernimiento bíblico frente a sectas, religiones y movimientos pseudo-cristianos.',
          en: 'Biblical discernment regarding cults, world religions, and pseudo-Christian movements.',
        },
      },
    ],
  },
  {
    id: 'ministerio',
    number: 4,
    name: { es: 'Ministerio y Práctica', en: 'Ministry & Practice' },
    goal: {
      es: 'Formación práctica para predicar, aconsejar y servir en el cuerpo de Cristo.',
      en: 'Practical training to preach, counsel, and serve in the body of Christ.',
    },
    courses: [
      {
        id: 'homiletica',
        title: { es: 'Homilética: El Arte de Predicar', en: 'Homiletics: The Art of Preaching' },
        hours: 20,
        summary: {
          es: 'Construcción y entrega de sermones expositivos, verso por verso.',
          en: 'Building and delivering verse-by-verse expository sermons.',
        },
      },
      {
        id: 'consejeria',
        title: { es: 'Consejería Bíblica', en: 'Biblical Counseling' },
        hours: 16,
        summary: {
          es: 'Cómo aconsejar desde la suficiencia de las Escrituras, sin depender de la psicología secular.',
          en: 'Counseling from the sufficiency of Scripture, without relying on secular psychology.',
        },
      },
      {
        id: 'liderazgo',
        title: { es: 'Liderazgo y Ministerio Pastoral', en: 'Leadership & Pastoral Ministry' },
        hours: 16,
        summary: {
          es: 'Calificaciones bíblicas de ancianos y diáconos, y el pastoreo del rebaño de Dios.',
          en: 'Biblical qualifications for elders and deacons, and shepherding God’s flock.',
        },
      },
      {
        id: 'discipulado',
        title: { es: 'Discipulado y Multiplicación', en: 'Discipleship & Multiplication' },
        hours: 12,
        summary: {
          es: 'Cómo hacer discípulos que hagan discípulos, siguiendo el modelo de la Gran Comisión.',
          en: 'Making disciples who make disciples, following the model of the Great Commission.',
        },
      },
      {
        id: 'practica-supervisada',
        title: { es: 'Práctica Ministerial Supervisada', en: 'Supervised Ministry Practicum' },
        hours: 20,
        summary: {
          es: 'Servicio ministerial real dentro de la iglesia local, con acompañamiento pastoral.',
          en: 'Real ministry service within the local church, with pastoral mentorship.',
        },
      },
    ],
  },
]

// Where the Saturday class is right now. When a course ends, move its id into
// `completed` and set the next course's id as `current`.
export const instituteProgress: { completed: string[]; current: string | null } = {
  completed: ['hermeneutica'],
  current: 'panorama-at',
}

export type CourseStatus = 'completed' | 'current' | 'upcoming'

export function courseStatus(courseId: string): CourseStatus {
  if (instituteProgress.completed.includes(courseId)) return 'completed'
  if (instituteProgress.current === courseId) return 'current'
  return 'upcoming'
}

export function findCourse(courseId: string): Course | undefined {
  return levels.flatMap((level) => level.courses).find((course) => course.id === courseId)
}

export const totalCourses = levels.reduce((sum, level) => sum + level.courses.length, 0)
export const totalHours = levels.reduce(
  (sum, level) => sum + level.courses.reduce((s, c) => s + c.hours, 0),
  0,
)
