export type Lang = 'es' | 'en'

export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      ministries: 'Ministerios',
      events: 'Eventos',
      sermons: 'Sermones',
      seminario: 'Instituto Bíblico',
      contact: 'Contacto',
    },
    home: {
      heroBadge: 'Bienvenido a Nuestra Congregación',
      heroSubtitle:
        'Una comunidad comprometida con la exposición fiel de las Escrituras, la adoración reverente y el discipulado centrado en Cristo.',
      planVisit: 'Planea tu visita',
      watchLive: 'Ver en vivo',
      serviceTimesTitle: 'Horarios de Servicio',
      verseQuote: '"Porque por gracia habéis sido salvados por medio de la fe."',
      verseRef: '— Efesios 2:8',
      ministriesTeaser: 'Nuestros Ministerios',
      ministriesTeaserSubtitle: 'Hay un lugar para ti en nuestra familia de la fe.',
      seeAll: 'Ver todos',
      sermonsTeaser: 'Últimas Prédicas',
      mainGathering: 'Reunión Principal',
      everyWeek: 'Cada Semana',
      sundayServiceDesc:
        'Únete a nosotros mientras adoramos a través del canto congregacional, la oración y la predicación expositiva de la Palabra de Dios.',
      midweekGatherings: 'Reuniones Entre Semana',
      ministryPillars: [
        {
          title: 'Liderazgo y Enseñanza',
          desc: 'Predicación expositiva e instrucción doctrinal.',
        },
        {
          title: 'Hombres y Mujeres',
          desc: 'Comunión y discipulado intencional para adultos.',
        },
        {
          title: 'Niños y Adolescentes',
          desc: 'Arraigando a la próxima generación en la verdad bíblica.',
        },
        {
          title: 'Adoración y Servicio',
          desc: 'Sirviendo al cuerpo local con reverencia y cuidado.',
        },
      ],
    },
    about: {
      title: 'Nosotros',
      missionTitle: 'Nuestra Misión',
      mission:
        'Glorificar a Dios proclamando la verdad sin concesiones de Su Palabra, edificando a los santos hasta alcanzar la madurez a la semejanza de Cristo, y haciendo discípulos en todas las naciones a través del evangelio de Jesucristo nuestro Señor.',
      visionTitle: 'Nuestra Visión',
      vision:
        'Ser una iglesia sana y en crecimiento, arraigada en la Palabra de Dios, que impacte a Cajamarca y más allá.',
      beliefsTitle: 'Lo que Creemos',
      beliefs: [
        {
          title: 'La Biblia',
          body: 'Creo que la Biblia es la Palabra de Dios, inspirada por Él, completamente verdadera y suficiente, y que es la autoridad final para lo que creo y cómo vivo. (2 Timoteo 3:16)',
        },
        {
          title: 'El Dios Triuno',
          body: 'Creo que hay un solo Dios verdadero, eterno, santo y soberano, el Creador de todas las cosas, que existe eternamente en tres personas: Padre, Hijo y Espíritu Santo. (Génesis 1:1-2; Mateo 28:19)',
        },
        {
          title: 'Dios el Padre',
          body: 'Creo que Dios el Padre es el Soberano del universo que gobierna todas las cosas según Su propósito perfecto. Por Su inmensa gracia y amor, nos ha elegido y adoptado para ser Sus hijos a través de Jesucristo. (Efesios 1:3-5; 1 Juan 3:1)',
        },
        {
          title: 'Jesucristo',
          body: 'Creo que Jesucristo es verdaderamente Dios y verdaderamente hombre, quien vivió una vida sin pecado, murió en la cruz como un sacrificio perfecto para pagar por mis pecados, resucitó corporalmente y es el único Salvador y Redentor. (Juan 1:14; 1 Corintios 15:3–4)',
        },
        {
          title: 'El Espíritu Santo',
          body: 'Creo que el Espíritu Santo es Dios, quien da nueva vida al creyente. Creo que recibimos al Espíritu Santo plenamente en el momento de la salvación, quien mora en nosotros, nos empodera para vivir en obediencia a Dios y nos capacita para servir con Sus dones para el servicio a la iglesia. (1 Corintios 6:19; 1 Corintios 12:4-7)',
        },
        {
          title: 'La Humanidad y el Pecado',
          body: 'Creo que todos los seres humanos han pecado y están separados de Dios, y que por sí mismos no pueden salvarse. (Romanos 3:23)',
        },
        {
          title: 'La Salvación',
          body: 'Creo que la salvación es un regalo de la gracia de Dios y se recibe únicamente a través de la fe en Jesucristo, no por obras humanas. (Efesios 2:8–9)',
        },
        {
          title: 'La Vida Cristiana',
          body: 'Creo que Dios transforma al creyente y lo llama a una vida de arrepentimiento continuo, obediencia y crecimiento espiritual. (2 Corintios 5:17; Filipenses 1:6)',
        },
        {
          title: 'La Iglesia',
          body: 'Creo que la iglesia es el cuerpo de Cristo, que Él es su cabeza, y que cada creyente está llamado a vivir comprometido con una iglesia local bajo un liderazgo bíblico. (Colosenses 1:18; Hebreos 13:17)',
        },
        {
          title: 'Liderazgo de la Iglesia',
          body: 'Creo que hombres y mujeres son absolutamente iguales en valor, dignidad y salvación ante Dios. Sin embargo, creo que Dios, en Su sabiduría, ha establecido roles distintos y complementarios, reservando los oficios y funciones de evangelistas, pastores-maestros (quienes son también ancianos) y ancianos exclusivamente para hombres bíblicamente calificados. (1 Timoteo 2:12-13; Tito 1:5-6; Efesios 4:11)',
        },
        {
          title: 'Las Ordenanzas (Bautismo y Cena del Señor)',
          body: 'Creo que Jesucristo estableció dos ordenanzas para Su iglesia: el bautismo del creyente por inmersión y la Cena del Señor. Este bautismo es un acto público de obediencia donde el creyente demuestra su fe y simboliza su unión con Cristo en Su muerte, sepultura y resurrección. La Cena del Señor es un recordatorio constante del sacrificio de Cristo en la cruz, que los creyentes celebramos juntos hasta que Él venga. (Mateo 28:19; Romanos 6:4; 1 Corintios 11:23-26)',
        },
        {
          title: 'Esperanza Futura',
          body: 'Creo que Jesucristo regresará y que los creyentes vivirán eternamente con Él. (Juan 14:3)',
        },
      ],
      distinctivesTitle: 'Nuestros Distintivos Centrales',
      distinctives: [
        {
          title: '1. Calvinistas',
          body: 'Nos sostenemos firmemente en las doctrinas de la gracia, afirmando la soberanía absoluta de Dios en todas las cosas, especialmente en la obra histórica y sobrenatural de la salvación. (Efesios 1:4-6, Romanos 9:15-16, Juan 6:44)',
        },
        {
          title: '2. Dispensacionales',
          body: 'Abordamos las Escrituras con un método de interpretación consistente, literal-gramatical-histórico, manteniendo una clara distinción bíblica entre el programa de Dios para Israel y Su programa para la Iglesia. (Efesios 3:1-6, Romanos 11:25-29, 1 Tesalonicenses 4:13-18)',
        },
        {
          title: '3. Creacionistas',
          body: 'Creemos que Dios creó el universo, la tierra y toda la vida de la nada en seis días literales de 24 horas, tal como se revela claramente en el libro de Génesis. (Génesis 1:1-31, Éxodo 20:11, Colosenses 1:16)',
        },
        {
          title: '4. Cesacionistas',
          body: 'Creemos que los dones de señales de la iglesia del Nuevo Testamento (tales como lenguas, profecía y sanidad apostólica) cumplieron su propósito durante la era fundacional de los Apóstoles y han cesado, mientras que Dios continúa obrando milagros de acuerdo con Su voluntad soberana. (1 Corintios 13:8-10, 2 Corintios 12:12, Hebreos 2:3-4)',
        },
        {
          title: '5. Consejería Bíblica',
          body: 'Rechazamos la psicología secular como cura para los problemas espirituales, creyendo en cambio que las Escrituras son completamente suficientes y autoritativas para aconsejar, sanar y restaurar el corazón humano. (2 Timoteo 3:16-17, 2 Pedro 1:3, Salmo 19:7-9)',
        },
        {
          title: '6. Gobierno de Ancianos',
          body: 'Nuestra iglesia es guiada por pastores en lugar de ser gobernada por la congregación. Somos dirigidos por una pluralidad de ancianos bíblicamente calificados que pastorean, protegen y guían al rebaño bajo la jefatura de Jesucristo. (1 Timoteo 3:1-7, Tito 1:5-9, Hebreos 13:17, 1 Pedro 5:1-3)',
        },
        {
          title: '7. Enseñanza Expositiva',
          body: 'El ministerio principal de nuestro púlpito es la predicación expositiva verso por verso. Predicamos el texto de las Escrituras en su contexto adecuado para desatar la verdadera voz y autoridad de Dios. (Nehemías 8:8, 2 Timoteo 4:1-2, Hechos 20:27)',
        },
        {
          title: '8. Ofrenda Escritural',
          body: '¡Aquí no se exige ofrendar, sino solo según Dios le guíe! ¡No queremos su dinero! ¡Queremos el nacimiento y crecimiento en Jesucristo, quien es el SEÑOR (YAHWEH)! (2 Corintios 9:7, Hechos 8:20, Filipenses 4:17)',
        },
      ],
      historyTitle: 'Nuestra Historia',
      history:
        'Iglesia Bíblica Gracia Cajamarca nació del deseo de predicar fielmente la Palabra de Dios y servir a la comunidad de Cajamarca. Desde nuestros inicios hemos crecido como familia de la fe, comprometidos con la enseñanza bíblica y el discipulado.',
    },
    ministries: {
      eyebrow: 'Comunidad y Servicio',
      title: 'Nuestros Ministerios',
      subtitle: 'Cada ministerio es una oportunidad para servir, crecer y conectar.',
      leadBy: 'A cargo de',
      learnMore: 'Conocer más',
      missionTitle: 'Nuestra Misión',
      visionTitle: 'Nuestra Visión',
      joinTitle: 'Únete a Nosotros',
      backToMinistries: 'Volver a Ministerios',
      notFound: 'No encontramos este ministerio.',
      sectionTeaching: 'Enseñanza y Cuidado Pastoral',
      sectionCommunity: 'Comunidad y Discipulado',
      sectionService: 'Servicio y Hospitalidad',
    },
    events: {
      title: 'Eventos',
      subtitle: 'Este es nuestro horario semanal de reuniones. ¡Te esperamos!',
      empty: 'Aún no hay un horario publicado. Vuelve pronto.',
    },
    sermons: {
      title: 'Sermones',
      subtitle: 'Escucha las últimas enseñanzas de la Palabra de Dios.',
      liveBadge: 'EN VIVO',
      latestSermon: 'Última prédica',
      pastSermons: 'Prédicas Anteriores',
      visitChannel: 'Visitar nuestro canal de YouTube',
      closeVideo: 'Cerrar video',
      openInYoutube: 'Abrir en YouTube',
      notConfigured:
        'La transmisión en vivo se activará pronto. Mientras tanto, síguenos en nuestras redes sociales.',
    },
    seminario: {
      eyebrow: 'Formación Bíblica y Teológica',
      title: 'Instituto Bíblico Gracia',
      subtitle:
        'Formando siervos fieles que manejan con precisión la Palabra de verdad, con clases electivas abiertas a todos y un programa completo para quienes se preparan para el ministerio.',
      ctaEnroll: 'Inscríbeme',
      ctaCourses: 'Ver el plan de estudios',
      statLevels: 'Niveles',
      statCourses: 'Cursos',
      statHours: 'Horas de clase',
      statModality: 'Modalidades',
      statModalityValue: 'Presencial y virtual',
      pathsTitle: 'Dos formas de estudiar',
      pathsSubtitle: 'Elige el camino que se ajuste a tu llamado y tu tiempo disponible.',
      pathElectiveTitle: 'Cursos Electivos',
      pathElectiveBadge: 'Abierto a todos',
      pathElectiveDesc:
        'Toma cualquier curso de forma individual, sin requisitos previos ni matrícula al programa completo. Ideal para creyentes que quieren crecer en un área específica.',
      pathElectiveBullets: [
        'Sin prerrequisitos ni examen de admisión',
        'Avanza a tu propio ritmo, un curso a la vez',
        'Acceso a las clases grabadas por 90 días',
      ],
      pathFullTitle: 'Programa Completo',
      pathFullBadge: 'Diplomado · 2 años',
      pathFullDesc:
        'Los 4 niveles en secuencia, con evaluaciones, práctica ministerial y un certificado de finalización avalado por el liderazgo de la iglesia.',
      pathFullBullets: [
        'Carta de recomendación de tu pastor local',
        'Evaluaciones y práctica ministerial supervisada',
        'Certificado al completar el programa',
      ],
      curriculumEyebrow: 'Plan de Estudios',
      curriculumTitle: 'Currícula Completa',
      curriculumSubtitle:
        '4 niveles progresivos que cubren la Biblia, la doctrina, la interpretación y el ministerio práctico.',
      level: 'Nivel',
      hours: 'h',
      modalityEyebrow: 'Cómo Estudiar',
      modalityTitle: 'Clases y Evaluaciones',
      modalityInPersonTitle: 'Clases presenciales',
      modalityInPersonDesc:
        'Sábados en las instalaciones de la iglesia, con interacción directa con los maestros y compañeros de clase.',
      modalityLiveTitle: 'Clases en vivo por Zoom',
      modalityLiveDesc:
        'Para quienes no pueden asistir presencialmente. Las sesiones se transmiten en vivo y quedan grabadas.',
      modalityVideoTitle: 'Videoteca de clases',
      modalityVideoDesc:
        'Cada clase grabada y organizada por curso, disponible para repasar el contenido cuando lo necesites.',
      modalityTestsTitle: 'Evaluaciones en línea',
      modalityTestsDesc:
        'Cuestionarios cortos por curso y un examen final en el programa completo, con retroalimentación del maestro.',
      admissionEyebrow: 'Requisitos',
      admissionTitle: 'Admisión',
      admissionElectiveTitle: 'Para cursos electivos',
      admissionElectiveBullets: [
        'Ser mayor de 16 años',
        'Deseo de aprender la Palabra de Dios',
        'Completar el formulario de inscripción',
      ],
      admissionFullTitle: 'Para el programa completo',
      admissionFullBullets: [
        'Testimonio claro de fe en Jesucristo',
        'Carta de recomendación de tu pastor o líder local',
        'Compromiso de asistencia y participación activa',
        'Entrevista breve con la dirección del instituto',
      ],
      offeringNote:
        'Como iglesia, no exigimos una cuota fija: el instituto se sostiene por ofrenda voluntaria, según cada uno propone en su corazón (2 Corintios 9:7).',
      faqEyebrow: 'Preguntas Frecuentes',
      faqTitle: 'Preguntas Frecuentes',
      faq: [
        {
          q: '¿Cuánto cuesta el instituto?',
          a: 'No hay una matrícula obligatoria. Sostenemos el instituto por ofrenda voluntaria, tal como cada uno decide en su corazón, sin ninguna presión.',
        },
        {
          q: '¿Necesito experiencia previa en teología?',
          a: 'No. Los cursos electivos y el Nivel 1 del programa completo están diseñados para cualquier creyente, sin conocimiento previo requerido.',
        },
        {
          q: '¿Puedo estudiar si no vivo en Cajamarca?',
          a: 'Sí. Todas las clases se transmiten en vivo y quedan grabadas, así que puedes participar de forma remota desde cualquier lugar.',
        },
        {
          q: '¿Recibiré un certificado?',
          a: 'Quienes completen el programa completo (los 4 niveles, sus evaluaciones y la práctica ministerial) reciben un certificado de finalización avalado por el liderazgo de la iglesia.',
        },
      ],
      ctaBannerTitle: '¿Listo para profundizar en la Palabra?',
      ctaBannerSubtitle: 'Escríbenos y te ayudamos a elegir el camino correcto para ti.',
      ctaBannerButton: 'Contáctanos',
    },
    contact: {
      title: 'Contacto',
      subtitle: '¿Tienes preguntas o quieres visitarnos? Escríbenos.',
      addressTitle: 'Dirección',
      phoneTitle: 'Teléfono',
      emailTitle: 'Correo',
      followUs: 'Síguenos',
      formName: 'Nombre',
      formEmail: 'Correo electrónico',
      formMessage: 'Mensaje',
      formSend: 'Enviar mensaje',
      formSending: 'Enviando…',
      formSuccess: '¡Mensaje enviado! Te responderemos pronto.',
      formError: 'No pudimos enviar tu mensaje. Intenta de nuevo, o escríbenos directamente por correo.',
    },
    footer: {
      tagline: 'Una comunidad que ama a Dios, estudia su Palabra y sirve a su prójimo.',
      quickLinks: 'Enlaces',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      ministries: 'Ministries',
      events: 'Events',
      sermons: 'Sermons',
      seminario: 'Bible Institute',
      contact: 'Contact',
    },
    home: {
      heroBadge: 'Welcome to Our Congregation',
      heroSubtitle:
        'A community committed to the faithful exposition of Scripture, reverent worship, and Christ-centered discipleship.',
      planVisit: 'Plan your visit',
      watchLive: 'Watch live',
      serviceTimesTitle: 'Service Times',
      verseQuote: '"For by grace you have been saved through faith."',
      verseRef: '— Ephesians 2:8',
      ministriesTeaser: 'Our Ministries',
      ministriesTeaserSubtitle: 'There’s a place for you in our family of faith.',
      seeAll: 'See all',
      sermonsTeaser: 'Latest Sermons',
      mainGathering: 'Main Gathering',
      everyWeek: 'Every Week',
      sundayServiceDesc:
        'Join us as we worship through congregational singing, prayer, and the expository preaching of God’s Word.',
      midweekGatherings: 'Midweek Gatherings',
      ministryPillars: [
        {
          title: 'Leadership & Teaching',
          desc: 'Expository preaching and doctrinal instruction.',
        },
        {
          title: 'Men & Women',
          desc: 'Intentional fellowship and discipleship for adults.',
        },
        {
          title: 'Children & Youth',
          desc: 'Grounding the next generation in biblical truth.',
        },
        {
          title: 'Worship & Service',
          desc: 'Serving the local body with reverence and care.',
        },
      ],
    },
    about: {
      title: 'About Us',
      missionTitle: 'Our Mission',
      mission:
        'To glorify God by proclaiming the uncompromised truth of His Word, edifying the saints unto mature Christlikeness, and making disciples of all nations through the gospel of Jesus Christ our Lord.',
      visionTitle: 'Our Vision',
      vision:
        'To be a healthy, growing church, rooted in God’s Word, impacting Cajamarca and beyond.',
      beliefsTitle: 'What We Believe',
      beliefs: [
        {
          title: 'The Bible',
          body: 'I believe the Bible is the Word of God, inspired by Him, completely true and sufficient, and that it is the final authority for what I believe and how I live. (2 Timothy 3:16)',
        },
        {
          title: 'The Triune God',
          body: 'I believe there is one true God, eternal, holy, and sovereign, the Creator of all things, who exists eternally in three persons: Father, Son, and Holy Spirit. (Genesis 1:1-2; Matthew 28:19)',
        },
        {
          title: 'God the Father',
          body: 'I believe God the Father is the Sovereign of the universe who governs all things according to His perfect purpose. By His immense grace and love, He has chosen and adopted us to be His children through Jesus Christ. (Ephesians 1:3-5; 1 John 3:1)',
        },
        {
          title: 'Jesus Christ',
          body: 'I believe Jesus Christ is truly God and truly man, who lived a sinless life, died on the cross as a perfect sacrifice to pay for my sins, rose bodily, and is the only Savior and Redeemer. (John 1:14; 1 Corinthians 15:3–4)',
        },
        {
          title: 'The Holy Spirit',
          body: 'I believe the Holy Spirit is God, who gives new life to the believer. We receive the Holy Spirit fully at the moment of salvation; He indwells us, empowers us to live in obedience to God, and equips us to serve with His gifts for the service of the church. (1 Corinthians 6:19; 1 Corinthians 12:4-7)',
        },
        {
          title: 'Humanity and Sin',
          body: 'I believe all human beings have sinned and are separated from God, and that by themselves they cannot save themselves. (Romans 3:23)',
        },
        {
          title: 'Salvation',
          body: 'I believe salvation is a gift of God’s grace, received only through faith in Jesus Christ, not by human works. (Ephesians 2:8–9)',
        },
        {
          title: 'The Christian Life',
          body: 'I believe God transforms the believer and calls him to a life of continual repentance, obedience, and spiritual growth. (2 Corinthians 5:17; Philippians 1:6)',
        },
        {
          title: 'The Church',
          body: 'I believe the church is the body of Christ, that He is its head, and that every believer is called to live committed to a local church under biblical leadership. (Colossians 1:18; Hebrews 13:17)',
        },
        {
          title: 'Church Leadership',
          body: 'I believe men and women are absolutely equal in value, dignity, and salvation before God. However, God, in His wisdom, has established distinct and complementary roles, reserving the offices and functions of evangelists, pastor-teachers (who are also elders), and elders exclusively for biblically qualified men. (1 Timothy 2:12-13; Titus 1:5-6; Ephesians 4:11)',
        },
        {
          title: 'The Ordinances (Baptism and the Lord’s Supper)',
          body: 'I believe Jesus Christ established two ordinances for His church: believer’s baptism by immersion and the Lord’s Supper. This baptism is a public act of obedience in which the believer demonstrates his faith and symbolizes his union with Christ in His death, burial, and resurrection. The Lord’s Supper is a constant reminder of Christ’s sacrifice on the cross, which believers celebrate together until He comes. (Matthew 28:19; Romans 6:4; 1 Corinthians 11:23-26)',
        },
        {
          title: 'Future Hope',
          body: 'I believe Jesus Christ will return and that believers will live eternally with Him. (John 14:3)',
        },
      ],
      distinctivesTitle: 'Our Core Distinctives',
      distinctives: [
        {
          title: '1. Calvinist',
          body: 'We hold firmly to the doctrines of grace, affirming the absolute sovereignty of God in all things, especially in the historic, supernatural work of salvation. (Ephesians 1:4-6, Romans 9:15-16, John 6:44)',
        },
        {
          title: '2. Dispensational',
          body: 'We approach the Scriptures with a consistent literal-grammatical-historical method of interpretation, maintaining a clear biblical distinction between God’s program for Israel and His program for the Church. (Ephesians 3:1-6, Romans 11:25-29, 1 Thessalonians 4:13-18)',
        },
        {
          title: '3. Creationist',
          body: 'We believe that God created the universe, the earth, and all life out of nothing in six literal, 24-hour days, as plainly revealed in the book of Genesis. (Genesis 1:1-31, Exodus 20:11, Colossians 1:16)',
        },
        {
          title: '4. Cessationist',
          body: 'We believe that the sign gifts of the New Testament church (such as tongues, prophecy, and apostolic healing) fulfilled their purpose during the foundational age of the Apostles and have ceased, while God continues to perform miracles according to His sovereign will. (1 Corinthians 13:8-10, 2 Corinthians 12:12, Hebrews 2:3-4)',
        },
        {
          title: '5. Biblical Counseling',
          body: 'We reject secular psychology as a cure for spiritual issues, believing instead that the Scriptures are entirely sufficient and authoritative to counsel, heal, and restore the human heart. (2 Timothy 3:16-17, 2 Peter 1:3, Psalm 19:7-9)',
        },
        {
          title: '6. Elders Rule',
          body: 'Our church is shepherd-led rather than congregation-ruled. We are governed by a plurality of biblically qualified elders who shepherd, protect, and guide the flock under the headship of Jesus Christ. (1 Timothy 3:1-7, Titus 1:5-9, Hebrews 13:17, 1 Peter 5:1-3)',
        },
        {
          title: '7. Expository Teaching',
          body: 'Our primary pulpit ministry is verse-by-verse expository preaching. We preach the text of Scripture in its proper context to unleash the true voice and authority of God. (Nehemiah 8:8, 2 Timothy 4:1-2, Acts 20:27)',
        },
        {
          title: '8. Scriptural Giving',
          body: 'Giving is not demanded here, but only as God leads you! We don’t want your money! We want birth and growth in Jesus Christ who is LORD (YAHWEH)! (2 Corinthians 9:7, Acts 8:20, Philippians 4:17)',
        },
      ],
      historyTitle: 'Our History',
      history:
        'Iglesia Bíblica Gracia Cajamarca was born from a desire to faithfully preach God’s Word and serve the Cajamarca community. Since our beginnings we have grown as a family of faith, committed to biblical teaching and discipleship.',
    },
    ministries: {
      eyebrow: 'Community & Service',
      title: 'Our Ministries',
      subtitle: 'Every ministry is a chance to serve, grow, and connect.',
      leadBy: 'Led by',
      learnMore: 'Learn more',
      missionTitle: 'Our Mission',
      visionTitle: 'Our Vision',
      joinTitle: 'Join Us',
      backToMinistries: 'Back to Ministries',
      notFound: 'We couldn’t find this ministry.',
      sectionTeaching: 'Teaching & Pastoral Care',
      sectionCommunity: 'Community & Discipleship',
      sectionService: 'Service & Hospitality',
    },
    events: {
      title: 'Events',
      subtitle: 'This is our weekly schedule of meetings. We hope to see you there!',
      empty: 'No schedule has been published yet. Check back soon.',
    },
    sermons: {
      title: 'Sermons',
      subtitle: 'Listen to the latest teachings from God’s Word.',
      liveBadge: 'LIVE',
      latestSermon: 'Latest sermon',
      pastSermons: 'Past Sermons',
      visitChannel: 'Visit our YouTube channel',
      closeVideo: 'Close video',
      openInYoutube: 'Open in YouTube',
      notConfigured:
        'Live streaming will be enabled soon. In the meantime, follow us on social media.',
    },
    seminario: {
      eyebrow: 'Biblical & Theological Training',
      title: 'Gracia Bible Institute',
      subtitle:
        'Forming faithful servants who rightly handle the word of truth, with elective classes open to all and a full program for those preparing for ministry.',
      ctaEnroll: 'Enroll me',
      ctaCourses: 'View the curriculum',
      statLevels: 'Levels',
      statCourses: 'Courses',
      statHours: 'Class hours',
      statModality: 'Modalities',
      statModalityValue: 'In-person & online',
      pathsTitle: 'Two ways to study',
      pathsSubtitle: 'Choose the path that fits your calling and your available time.',
      pathElectiveTitle: 'Elective Courses',
      pathElectiveBadge: 'Open to all',
      pathElectiveDesc:
        'Take any course individually, with no prerequisites and no enrollment in the full program. Ideal for believers who want to grow in a specific area.',
      pathElectiveBullets: [
        'No prerequisites or admission exam',
        'Go at your own pace, one course at a time',
        'Access to recorded classes for 90 days',
      ],
      pathFullTitle: 'Full Program',
      pathFullBadge: 'Diploma · 2 years',
      pathFullDesc:
        'All 4 levels in sequence, with evaluations, ministry practicum, and a completion certificate endorsed by the church leadership.',
      pathFullBullets: [
        'Recommendation letter from your local pastor',
        'Evaluations and supervised ministry practicum',
        'Certificate upon completing the program',
      ],
      curriculumEyebrow: 'Curriculum',
      curriculumTitle: 'Full Curriculum',
      curriculumSubtitle:
        '4 progressive levels covering the Bible, doctrine, interpretation, and practical ministry.',
      level: 'Level',
      hours: 'h',
      modalityEyebrow: 'How to Study',
      modalityTitle: 'Classes & Evaluations',
      modalityInPersonTitle: 'In-person classes',
      modalityInPersonDesc:
        'Saturdays at the church facilities, with direct interaction with teachers and classmates.',
      modalityLiveTitle: 'Live classes on Zoom',
      modalityLiveDesc:
        'For those who cannot attend in person. Sessions are streamed live and recorded.',
      modalityVideoTitle: 'Class video library',
      modalityVideoDesc:
        'Every recorded class organized by course, available to review the content whenever you need.',
      modalityTestsTitle: 'Online evaluations',
      modalityTestsDesc:
        'Short quizzes per course and a final exam in the full program, with feedback from the teacher.',
      admissionEyebrow: 'Requirements',
      admissionTitle: 'Admission',
      admissionElectiveTitle: 'For elective courses',
      admissionElectiveBullets: [
        'Be 16 years or older',
        'A desire to learn God’s Word',
        'Complete the enrollment form',
      ],
      admissionFullTitle: 'For the full program',
      admissionFullBullets: [
        'A clear testimony of faith in Jesus Christ',
        'Recommendation letter from your local pastor or leader',
        'Commitment to attendance and active participation',
        'A brief interview with the institute’s leadership',
      ],
      offeringNote:
        'As a church, we do not require a fixed fee: the institute is sustained by voluntary giving, as each one purposes in their heart (2 Corinthians 9:7).',
      faqEyebrow: 'Frequently Asked Questions',
      faqTitle: 'Frequently Asked Questions',
      faq: [
        {
          q: 'How much does the institute cost?',
          a: 'There is no mandatory tuition. We sustain the institute through voluntary giving, as each person decides in their heart, with no pressure.',
        },
        {
          q: 'Do I need previous theology experience?',
          a: 'No. The elective courses and Level 1 of the full program are designed for any believer, with no prior knowledge required.',
        },
        {
          q: 'Can I study if I don’t live in Cajamarca?',
          a: 'Yes. All classes are streamed live and recorded, so you can participate remotely from anywhere.',
        },
        {
          q: 'Will I receive a certificate?',
          a: 'Those who complete the full program (all 4 levels, evaluations, and the ministry practicum) receive a completion certificate endorsed by the church leadership.',
        },
      ],
      ctaBannerTitle: 'Ready to go deeper in the Word?',
      ctaBannerSubtitle: 'Reach out and we’ll help you choose the right path for you.',
      ctaBannerButton: 'Contact Us',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Have questions or want to visit us? Reach out.',
      addressTitle: 'Address',
      phoneTitle: 'Phone',
      emailTitle: 'Email',
      followUs: 'Follow Us',
      formName: 'Name',
      formEmail: 'Email',
      formMessage: 'Message',
      formSend: 'Send message',
      formSending: 'Sending…',
      formSuccess: 'Message sent! We’ll get back to you soon.',
      formError: 'We couldn’t send your message. Please try again, or email us directly.',
    },
    footer: {
      tagline: 'A community that loves God, studies His Word, and serves its neighbors.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      rights: 'All rights reserved.',
    },
  },
} satisfies Record<Lang, unknown>

export type TranslationDict = (typeof translations)['es']
