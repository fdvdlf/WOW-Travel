const wowTravelWhatsappNumber = "51941482291";

function buildWhatsAppHref(title) {
  const message = `Hola WOW Travel, lei su articulo "${title}" y quiero revisar el viaje de mi mascota.`;
  return `https://wa.me/${wowTravelWhatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const blogPosts = [
  {
    id: 1,
    slug: "mascota-viajar-en-avion-5-pasos",
    title: "Tu mascota puede viajar en avion? Descubrelo en 5 pasos",
    date: "18 Mar, 2026",
    category: "Planificacion de vuelo",
    image: "/blog/blog_post01.jpg",
    imageAlt: "Perro junto a una maleta y una viajera planificando un vuelo",
    tags: ["Pet", "Viajes"],
    excerpt:
      "Antes de reservar, conviene alinear pais de destino, aerolinea y ventana sanitaria. Estos cinco pasos te ayudan a ordenar el viaje sin improvisar.",
    body: {
      intro: [
        "La pregunta correcta no es solo si tu mascota puede subir al avion, sino bajo que condiciones puede hacerlo sin contratiempos. En la practica, el viaje se define por tres capas que hay que alinear: pais de destino, politica de la aerolinea y estado sanitario del animal.",
        "Las guias oficiales de viaje con mascotas coinciden en algo: primero se validan requisitos, luego se cierran vacunas, examenes y certificado sanitario, y recien ahi conviene fijar la ventana final del viaje. Cuando ese orden se invierte, aparecen las urgencias.",
      ],
      quote:
        "Un viaje tranquilo casi nunca depende de un unico papel; depende de ordenar bien la secuencia.",
      sectionTitle: "Los 5 pasos que ordenan el viaje de verdad",
      sectionParagraphs: [
        "1. Define ruta y aerolinea. Antes de comprar, confirma si el trayecto acepta mascotas, si aplica cabina o bodega y si existen restricciones por temporada, raza o conexion.",
        "2. Revisa el pais de destino. Algunos destinos piden microchip, vacuna antirrabica vigente, certificado sanitario, tratamientos adicionales o ingreso por puntos autorizados.",
        "3. Agenda la parte veterinaria con margen. No conviene correr con vacunas, refuerzos o examenes al final porque varios requisitos se miden por fechas exactas.",
      ],
      innerTitle: "Checklist rapido antes de emitir tu reserva",
      innerParagraph:
        "Si quieres una lectura practica, este es el orden que mas ayuda a una familia que viaja por primera vez:",
      bullets: [
        "Pide los requisitos oficiales del pais y guardalos en una sola carpeta.",
        "Solicita por escrito la politica de tu aerolinea para tu ruta exacta.",
        "Valida que el microchip pueda leerse y que la vacuna antirrabica este en fecha.",
        "Entrena el kennel o transportadora antes del vuelo, no el dia anterior.",
        "Programa el certificado sanitario dentro de la ventana que acepta tu destino.",
      ],
      closing: [
        "Cuando ese checklist se trabaja con tiempo, el viaje deja de sentirse caotico y pasa a ser un proceso de control.",
        "Si ya tienes fecha tentativa o pais de destino, en WOW Travel podemos ayudarte a revisar la ruta completa y detectar lo que falta antes de que compres o cierres el vuelo.",
      ],
    },
    cta: {
      title: "Quieres revisar tu ruta con tiempo?",
      body: "Si ya tienes fecha tentativa o pais de destino, podemos ayudarte a validar documentos, secuencia y puntos sensibles antes de cerrar tu viaje.",
      label: "Hablar por WhatsApp",
      href: buildWhatsAppHref("Tu mascota puede viajar en avion? Descubrelo en 5 pasos"),
    },
    author: {
      name: "Equipo WOW Travel",
      role: "Guia editorial de viajes con mascotas",
      initials: "WT",
      bio: "Preparamos estos articulos para traducir requisitos oficiales en decisiones practicas, con enfoque realista y sin prometer atajos.",
    },
    comments: [
      {
        name: "Camila R.",
        date: "21 Mar, 2026",
        initials: "CR",
        content:
          "Me ayudo entender que la aerolinea y el pais de destino no revisan lo mismo. Ordenar eso antes de comprar el pasaje cambia todo.",
        children: [
          {
            name: "WOW Travel",
            date: "21 Mar, 2026",
            initials: "WT",
            content:
              "Exacto. Cuando ruta, aerolinea y parte sanitaria se revisan juntas, el proceso se vuelve mucho mas predecible.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "pasaporte-europeo-para-tu-mascota",
    title: "Como sacar el pasaporte europeo para tu mascota",
    date: "14 Mar, 2026",
    category: "Documentacion europea",
    image: "/blog/blog_post02.jpg",
    imageAlt: "Perro con un documento de pasaporte para mascota y papeles sanitarios",
    tags: ["Pasaporte", "Requisitos"],
    excerpt:
      "La clave es entender que no se tramita igual que un pasaporte humano. Antes de salir desde Peru normalmente viajas con certificado zoosanitario; el pasaporte europeo entra despues, dentro de la UE.",
    body: {
      intro: [
        "El nombre 'pasaporte europeo' suele confundir. Muchas familias creen que pueden tramitarlo en Peru antes de salir, como si fuera un documento independiente. No funciona asi.",
        "Segun las reglas europeas, el pasaporte para perros, gatos y hurones se expide a propietarios que residen en la UE y lo emite un veterinario autorizado. Para entrar desde un pais no perteneciente a la UE, lo habitual es viajar con el certificado zoosanitario correspondiente y con la documentacion sanitaria en regla.",
      ],
      quote:
        "Para la primera entrada a Europa manda el certificado correcto; el pasaporte europeo simplifica sobre todo los movimientos posteriores dentro de la UE.",
      sectionTitle: "Que necesitas antes de llegar a Europa",
      sectionParagraphs: [
        "Microchip identificable y datos que coincidan con toda la documentacion.",
        "Vacuna antirrabica vigente y, si el destino o la ruta lo exige, pruebas o tratamientos adicionales.",
        "Certificado zoosanitario emitido dentro de la ventana permitida por la UE. Hoy la referencia general para entrar desde fuera de la UE es que se expida como maximo diez dias antes del ingreso.",
      ],
      innerTitle: "Cuando aparece realmente el pasaporte europeo",
      innerParagraph:
        "Una vez que tu mascota ya ingreso correctamente y tu situacion en Europa lo permite, un veterinario autorizado puede dejar la historia sanitaria ordenada en un pasaporte europeo para viajes futuros dentro de la UE.",
      bullets: [
        "Sirve para acreditar identidad, vacuna antirrabica y datos sanitarios al dia.",
        "No reemplaza por si solo el trabajo previo de la primera salida desde Peru.",
        "Es util cuando vas a moverte entre paises de la UE con la mascota.",
        "Conviene revisar si tu ruta incluye paises con tratamientos adicionales para perros.",
      ],
      closing: [
        "La mejor forma de evitar frustraciones es no venderte un tramite que todavia no corresponde. Primero se resuelve la entrada legal y sanitaria; despues se ordena la continuidad dentro de Europa.",
        "En WOW Travel trabajamos justamente esa secuencia para que el proceso tenga sentido y no termines reuniendo documentos que tu ruta aun no necesita.",
      ],
    },
    cta: {
      title: "Quieres aterrizar en Europa con el expediente ordenado?",
      body: "Podemos ayudarte a diferenciar lo que necesitas para la primera entrada, lo que se obtiene dentro de la UE y lo que conviene preparar desde Peru.",
      label: "Pedir orientacion",
      href: buildWhatsAppHref("Como sacar el pasaporte europeo para tu mascota"),
    },
    author: {
      name: "Equipo WOW Travel",
      role: "Documentacion y rutas internacionales",
      initials: "WT",
      bio: "Convertimos requisitos oficiales en un plan entendible para familias que viajan con perros y gatos sin sobredocumentar ni perder tiempos valiosos.",
    },
    comments: [
      {
        name: "Luis M.",
        date: "16 Mar, 2026",
        initials: "LM",
        content:
          "No sabia que el pasaporte europeo no se gestiona igual desde Peru. Esa diferencia aclara un monton de dudas.",
        children: [
          {
            name: "WOW Travel",
            date: "16 Mar, 2026",
            initials: "WT",
            content:
              "Es una confusion super comun. Lo importante es no mezclar el documento de primera entrada con el que te ayuda despues a moverte dentro de Europa.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "viajar-con-tu-mascota-desde-peru",
    title: "Viajar con tu mascota desde Peru: Lo que nadie te cuenta",
    date: "10 Mar, 2026",
    category: "Salida desde Peru",
    image: "/blog/blog_post03.jpg",
    imageAlt: "Perro con una maleta frente a un paisaje de Peru",
    tags: ["Experiencias", "Consejos"],
    excerpt:
      "Lo que mas complica no suele ser el vuelo, sino los tiempos: laboratorio, ventana del certificado, inspeccion clinica y la coordinacion entre tu veterinario, SENASA y la aerolinea.",
    body: {
      intro: [
        "Salir desde Peru con tu mascota no suele trabarse por un unico documento. Lo que complica de verdad es el calendario: requisitos del pais de destino, documentos del veterinario tratante, inspeccion de SENASA y reglas de la aerolinea corriendo en paralelo.",
        "Por eso tanta gente siente que 'todo se le vino encima' la ultima semana. El Certificado Sanitario de Exportacion se emite al final del proceso, cuando ya puedes demostrar que la mascota cumple lo que pide el destino.",
      ],
      quote: "El certificado sale al final; la planificacion empieza mucho antes.",
      sectionTitle: "Lo que conviene tener claro antes de mover una fecha",
      sectionParagraphs: [
        "SENASA recuerda que el CSE debe solicitarse con anticipacion y que, para salir del Peru, se presenta documentacion sanitaria, vacunacion vigente e inspeccion clinica.",
        "Desde 2025, SENASA anuncio una plataforma digital para iniciar el proceso en plazas habilitadas, lo que ayuda a ordenar documentos y pagos con mas tiempo.",
        "Eso no elimina la parte critica: cada pais puede pedir ventanas distintas para vacunas, desparasitacion, laboratorio o certificados.",
      ],
      innerTitle: "Errores que mas retrasan una salida desde Peru",
      innerParagraph:
        "Estos son los cuatro que mas vemos cuando una familia ya tiene pasaje comprado:",
      bullets: [
        "Suponer que todos los paises piden lo mismo.",
        "Dejar la verificacion de la aerolinea para el final.",
        "Pensar que las 72 horas del CSE reemplazan toda la planificacion previa.",
        "No separar el viaje de ida de los requisitos para el regreso al Peru.",
      ],
      closing: [
        "Cuando la ruta se trabaja con criterio, el viaje desde Peru deja de ser una carrera de ultimo minuto y se vuelve una salida bien preparada.",
        "Si quieres ordenar tu caso real, podemos ayudarte a traducir requisitos, tiempos y ventanas documentarias a un plan claro, paso por paso.",
      ],
    },
    cta: {
      title: "Quieres salir desde Peru sin improvisar?",
      body: "Si ya sabes a que pais viajas o estas comparando rutas, te ayudamos a construir una linea de tiempo sensata para documentos, inspeccion y vuelo.",
      label: "Conversar con WOW Travel",
      href: buildWhatsAppHref("Viajar con tu mascota desde Peru: Lo que nadie te cuenta"),
    },
    author: {
      name: "Equipo WOW Travel",
      role: "Operacion y acompanamiento de viaje",
      initials: "WT",
      bio: "Acompanamos familias que salen desde Peru con sus mascotas y transformamos requisitos dispersos en una hoja de ruta clara y accionable.",
    },
    comments: [
      {
        name: "Andrea P.",
        date: "12 Mar, 2026",
        initials: "AP",
        content:
          "El dato de no dejar el CSE para el final fue clave. Nosotros estabamos viendo todo como si ese tramite iniciara el proceso.",
        children: [
          {
            name: "WOW Travel",
            date: "12 Mar, 2026",
            initials: "WT",
            content:
              "Tal cual. El certificado ordena el cierre, pero la preparacion real empieza antes con destino, vacunas, examenes y politica de aerolinea.",
          },
        ],
      },
    ],
  },
];

export function getAllBlogPosts() {
  return blogPosts;
}

export function getHomeBlogPosts() {
  return blogPosts.slice(0, 3);
}

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRecentBlogPosts(currentSlug) {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, 3);
}

export function getBlogCategories() {
  const categoryMap = blogPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(categoryMap).map(([name, count]) => ({
    name,
    count,
  }));
}

export function getBlogTags() {
  return [...new Set(blogPosts.flatMap((post) => post.tags))];
}
