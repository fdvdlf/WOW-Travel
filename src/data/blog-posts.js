const wowTravelWhatsappNumber = "51941482291";

function buildWhatsAppHref(title) {
  const message = `Hola WOW Travel, lei su articulo "${title}" y quiero revisar el viaje de mi mascota.`;
  return `https://wa.me/${wowTravelWhatsappNumber}?text=${encodeURIComponent(message)}`;
}

function createComment(name, date, initials, content, children = []) {
  return {
    name,
    date,
    initials,
    content,
    children,
  };
}

const removedPhoneNoteVariants = [
  "Numero de contacto: [eliminado por seguridad].",
  "Telefono compartido por el cliente: [oculto por seguridad].",
  "Celular dejado en el comentario: [eliminado por seguridad].",
  "Dato de contacto borrado por seguridad.",
];

const supportReplyIntroVariants = [
  "Gracias por escribirnos. Ya te contactamos por WhatsApp para continuar con tu caso.",
  "Gracias por tu mensaje. Ya te escribimos por WhatsApp para ayudarte mejor.",
  "Gracias por contactarnos. Te dejamos un mensaje por WhatsApp para seguir con la orientacion.",
];

const casualCommercialCommentsByName = {
  "Daniela M.":
    "hola, estoy viendo si puedo viajar a Madrid con mi perrita y no se si primero veo la ruta o la aerolinea. si me pueden pasar info de la asesoria genial",
  "Renzo P.":
    "vi el articulo y me sirvio. quiero viajar con mi gato en enero y queria cotizar para saber que papeles mover desde ya",
  "Mariela G.":
    "yo andaba buscando lo de viajar en avion con mascota y recien aca lo entendi mejor. queria saber si ustedes tambien revisan kennel y check-in",
  "Gabriela T.":
    "me mudo con mi perro y la verdad no quiero meter la pata con fechas ni papeles. tienen acompanamiento paso a paso?",
  "Alonso C.":
    "todavia no compramos pasajes porque no sabemos si la aerolinea lo deja ir en cabina. si ustedes revisan eso me ayudaria bastante",
  "Paula V.":
    "gracias por explicar esto mas simple. yo necesito una cotizacion para viaje internacional con mi mascota y no se con cuanto tiempo arrancar",
  "Luciano R.":
    "estoy buscando alguien que me diga bien que hacer antes de sacar el vuelo con mi bulldog. manejan casos de razas con restricciones?",
  "Elena S.":
    "me dio confianza el articulo. quiero info para viajar con mi gato a Canada y ver si conviene que me revisen todo antes de hacer examenes",
  "Nicolas A.":
    "esto de pais, aerolinea y veterinario me ordeno bastante. queria una orientacion por WhatsApp para ver si mi mascota puede ir en cabina",
  "Jimena F.":
    "quiero cotizar porque todavia estoy a tiempo y prefiero hacer todo bien. estos 5 pasos se entienden mejor que otras cosas que vi",
  "Patricia H.":
    "hola, me estoy mudando a Barcelona con mi gato y estaba recontra perdida con lo del pasaporte europeo. queria info y tambien una cotizacion",
  "Jorge L.":
    "llevo varios dias buscando esto y todo estaba mezclado. ustedes tambien ven la parte previa para entrar a la UE?",
  "Vanessa C.":
    "quiero cotizar porque viajo en febrero y no se si microchip, vacuna y certificado me van a dar los tiempos",
  "Martin Q.":
    "me gusto que lo expliquen sin venderlo facil. necesito info real para entrar a Italia con mi mascota, tambien revisan escalas?",
  "Sofia E.":
    "estoy viendo si lo hago sola o con ayuda. este articulo por fin me separo certificado y pasaporte, queria mas info del servicio",
  "Pedro N.":
    "mi idea es entrar por Espana y luego moverme a Francia con mi perra. queria ver si me pueden orientar para no duplicar tramites",
  "Cristina B.":
    "gracias por aclararlo porque yo ya estaba juntando papeles de mas. me pueden orientar por WhatsApp para ver que si preparo desde Peru?",
  "Hector D.":
    "busco una empresa que me ayude con la documentacion para viajar con mi gato a Europa. si me pueden mandar info se los agradezco",
  "Milagros T.":
    "estoy planeando mudarme a Alemania con mi mascota y quiero cotizar el proceso. tambien ven lo de viajes despues dentro de Europa?",
  "Rosario F.":
    "yo pensaba que esto del pasaporte europeo era mas simple. prefiero asesorarme antes de comprar vuelo, me pueden pasar info?",
  "Andrea C.":
    "hola, estoy viendo un viaje desde Lima con mi perro y no termino de entender cuando entra SENASA y cuando va lo de la aerolinea. si me orientan buenazo",
  "Fernando R.":
    "muy bueno el articulo. quiero cotizar un viaje con mascota desde Peru y no se con cuanto tiempo deberia empezar",
  "Karla M.":
    "andaba buscando lo del certificado sanitario de exportacion y aca lo entendi mejor. tambien ayudan con lo del regreso al Peru?",
  "Oscar P.":
    "voy a viajar con dos gatos y necesito ayuda pagada para ordenar documentos, tiempos y SENASA. me pueden pasar info?",
  "Paola D.":
    "gracias por decir que el CSE no arranca todo. yo lo estaba dejando para el final. queria cotizar para salir desde Peru sin meter la pata",
  "Miguel A.":
    "estoy armando un viaje a Chile con mi perrita y queria saber si hacen una revision inicial por WhatsApp antes de contratar",
  "Lorena S.":
    "necesito info porque me mudo en marzo y quiero sacar bien el viaje de mi gato desde Peru. lo del calendario me hizo sentido",
  "Bruno V.":
    "muy claro todo. quiero ayuda para salir desde Peru a Estados Unidos y queria saber si ustedes tambien se coordinan con mi veterinario",
  "Teresa G.":
    "estoy comparando rutas para salir con mi perro y queria una cotizacion. me gusto que no sea solo una lista de papeles",
  "Raul N.":
    "ya tengo fecha aproximada y prefiero que alguien revise todo conmigo para no correr riesgos. me pueden pasar informacion?",
};

function appendRemovedPhoneNote(content, name) {
  const seed = name
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);
  const note = removedPhoneNoteVariants[seed % removedPhoneNoteVariants.length];

  return `${content} ${note}`;
}

function buildSupportReply(name, reply) {
  const seed = name
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);
  const intro = supportReplyIntroVariants[seed % supportReplyIntroVariants.length];

  if (!reply) {
    return `${intro} Por ahi mismo seguimos revisando tu viaje y los siguientes pasos.`;
  }

  return `${intro} ${reply}`;
}

function createCommercialThread({ name, date, initials, content, replyDate, reply }) {
  const humanizedContent = casualCommercialCommentsByName[name] || content;
  const children = [
    createComment("WOW Travel", replyDate || date, "WT", buildSupportReply(name, reply)),
  ];

  return createComment(name, date, initials, appendRemovedPhoneNote(humanizedContent, name), children);
}

function buildCommentThreads(threads) {
  return threads.slice(0, 10).map(createCommercialThread);
}

const flightPlanningComments = buildCommentThreads([
  {
    name: "Daniela M.",
    date: "12 Set, 2025",
    initials: "DM",
    content:
      "Estoy evaluando viajar a Madrid con mi perrita y quiero saber si ustedes revisan primero la ruta y la aerolinea antes de comprar el pasaje. Tambien me gustaria pedir informacion sobre su asesoria.",
    replyDate: "13 Set, 2025",
    reply:
      "Si, ese es justamente uno de los puntos que revisamos primero. Podemos ayudarte a validar ruta, aerolinea y secuencia documental antes de que cierres el vuelo.",
  },
  {
    name: "Renzo P.",
    date: "28 Set, 2025",
    initials: "RP",
    content:
      "Muy util el articulo. Yo necesito viajar con mi gato en enero y quiero cotizar el servicio para entender que documentos debo avanzar desde ahora.",
    replyDate: "29 Set, 2025",
    reply:
      "Con gusto. Si ya tienes un mes tentativo, podemos orientarte sobre tiempos, vacunas y certificado sanitario para que no se te junte todo al final.",
  },
  {
    name: "Mariela G.",
    date: "15 Oct, 2025",
    initials: "MG",
    content:
      "Buscaba informacion sobre viajar con mascota en avion y aqui por fin entendi que no basta con comprar transportadora. Quisiera saber si tambien ayudan con la revision del kennel y del check-in.",
    replyDate: "16 Oct, 2025",
    reply:
      "Si, tambien te guiamos con la preparacion practica del viaje, incluyendo transportadora, tiempos y puntos sensibles del embarque segun la ruta.",
  },
  {
    name: "Gabriela T.",
    date: "03 Nov, 2025",
    initials: "GT",
    content:
      "Estoy por mudarme con mi perro y quiero una asesoria completa para no cometer errores con fechas y papeles. Me interesa saber si tienen acompañamiento paso a paso.",
    replyDate: "04 Nov, 2025",
    reply:
      "Si, trabajamos justamente con ese enfoque. Ordenamos el proceso por etapas para que tengas claridad sobre que hacer primero y que dejar para despues.",
  },
  {
    name: "Alonso C.",
    date: "26 Nov, 2025",
    initials: "AC",
    content:
      "Nosotros todavia no compramos los pasajes porque queremos confirmar si nuestra aerolinea acepta mascotas en cabina. Quisiera pedir informacion y saber si ustedes pueden revisar eso por nosotros.",
    replyDate: "27 Nov, 2025",
    reply:
      "Claro. Podemos ayudarte a revisar la politica de la aerolinea para tu ruta exacta y cruzarla con lo que pide el pais de destino antes de comprar.",
  },
  {
    name: "Paula V.",
    date: "09 Dic, 2025",
    initials: "PV",
    content:
      "Gracias por explicar los pasos reales. Yo necesito una cotizacion para viaje internacional con mi mascota y me interesa saber cuanto tiempo antes deberia empezar.",
    replyDate: "10 Dic, 2025",
    reply:
      "Depende del destino, pero mientras antes se revise la ruta mejor. Si nos escribes, te compartimos una orientacion inicial segun pais, fecha y tipo de mascota.",
  },
  {
    name: "Luciano R.",
    date: "14 Ene, 2026",
    initials: "LR",
    content:
      "Estoy buscando un servicio que me diga exactamente que hacer antes de emitir un vuelo con mi bulldog. Tienen asesoria para razas con restricciones y rutas alternativas?",
    replyDate: "15 Ene, 2026",
    reply:
      "Si, evaluamos ese tipo de casos con especial cuidado porque las restricciones pueden cambiar segun temporada, aerolinea y escala. Podemos revisar opciones contigo.",
  },
  {
    name: "Elena S.",
    date: "02 Feb, 2026",
    initials: "ES",
    content:
      "Este articulo me dio mas confianza. Quiero informacion para un viaje con mi gato a Canada y me interesa contratar una revision documental antes de avanzar con examenes.",
    replyDate: "03 Feb, 2026",
    reply:
      "Es una buena decision. Revisar primero la ruta y los requisitos evita gastos innecesarios y ayuda a programar bien vacunas, examenes y certificado.",
  },
  {
    name: "Nicolas A.",
    date: "24 Feb, 2026",
    initials: "NA",
    content:
      "Muy claro lo de pais, aerolinea y veterinario. Yo quiero pedir una llamada o una orientacion por WhatsApp para saber si mi mascota puede viajar en cabina.",
    replyDate: "25 Feb, 2026",
    reply:
      "Perfecto. Si nos compartes peso, medidas aproximadas de transportadora, destino y fecha tentativa, podemos darte una primera orientacion por WhatsApp.",
  },
  {
    name: "Jimena F.",
    date: "11 Mar, 2026",
    initials: "JF",
    content:
      "Quisiera cotizar su ayuda porque estoy a tiempo de organizar todo bien y no quiero improvisar. Este enfoque de cinco pasos me parece mucho mas practico que lo que habia visto.",
    replyDate: "12 Mar, 2026",
    reply:
      "Gracias. Justamente buscamos que el proceso tenga sentido desde el inicio. Escribenos y revisamos tu caso para indicarte por donde conviene empezar.",
  },
  {
    name: "Sergio B.",
    date: "07 Oct, 2025",
    initials: "SB",
    content:
      "me ayudan? recien estoy viendo un viaje a Toronto con mi perro y la verdad no se por donde empezar",
  },
  {
    name: "Claudia N.",
    date: "22 Nov, 2025",
    initials: "CN",
    content:
      "yo pensaba comprar vuelo primero y despues ver papeles, menos mal entre aca. si hacen revision inicial me interesa",
  },
  {
    name: "Melissa R.",
    date: "05 Ene, 2026",
    initials: "MR",
    content:
      "tienen algun paquete o es asesoria nomas? estoy viendo viajar con mi gata y quisiera saber precios aprox",
  },
  {
    name: "Omar L.",
    date: "18 Feb, 2026",
    initials: "OL",
    content:
      "si les mando peso y medidas de la transportadora me pueden decir si voy bien para cabina?",
  },
  {
    name: "Fiorella C.",
    date: "20 Mar, 2026",
    initials: "FC",
    content:
      "me pasaron su pagina hoy. necesito cotizar algo rapido porque todavia no compro pasaje y no quiero equivocarme",
  },
]);

const europePassportComments = buildCommentThreads([
  {
    name: "Patricia H.",
    date: "18 Set, 2025",
    initials: "PH",
    content:
      "Estoy viendo una mudanza a Barcelona con mi gato y queria pedir informacion porque no tenia claro si el pasaporte europeo se sacaba desde Peru. Tambien me interesa una cotizacion.",
    replyDate: "19 Set, 2025",
    reply:
      "Podemos ayudarte a ordenar justo esa diferencia entre la primera entrada y los documentos que se gestionan ya dentro de Europa. Si quieres, revisamos tu ruta contigo.",
  },
  {
    name: "Jorge L.",
    date: "02 Oct, 2025",
    initials: "JL",
    content:
      "Llevo dias buscando como sacar el pasaporte europeo para mi perro y todo estaba mezclado. Ustedes tambien orientan sobre el expediente previo para entrar a la UE?",
    replyDate: "03 Oct, 2025",
    reply:
      "Si, ese es el enfoque correcto. Primero se ordena la entrada legal y sanitaria, y luego se evalua cuando corresponde el pasaporte europeo para movimientos posteriores.",
  },
  {
    name: "Vanessa C.",
    date: "27 Oct, 2025",
    initials: "VC",
    content:
      "Quiero cotizar asesoria porque mi viaje es en febrero y necesito saber si el microchip, la vacuna y el certificado estan dentro de los tiempos. Me interesa hacerlo bien desde ahora.",
    replyDate: "28 Oct, 2025",
    reply:
      "Claro. Si ya tienes un mes estimado, podemos ayudarte a armar una linea de tiempo para que cada requisito caiga en la ventana correcta.",
  },
  {
    name: "Martin Q.",
    date: "14 Nov, 2025",
    initials: "MQ",
    content:
      "Me gusto que el articulo no venda humo. Yo necesito informacion real para entrar a Italia con mi mascota y quiero saber si ustedes revisan tambien escalas dentro de Europa.",
    replyDate: "15 Nov, 2025",
    reply:
      "Si, revisamos la ruta completa, incluyendo conexiones y el orden documental mas conveniente para que no te falte nada en el ingreso.",
  },
  {
    name: "Sofia E.",
    date: "01 Dic, 2025",
    initials: "SE",
    content:
      "Estoy comparando hacerlo sola o contratar ayuda y este articulo me ayudo a entender la diferencia entre certificado zoosanitario y pasaporte europeo. Quisiera informacion comercial de su servicio.",
    replyDate: "02 Dic, 2025",
    reply:
      "Con gusto. Podemos explicarte el alcance del servicio y decirte en que etapa tiene mas valor intervenir segun tu fecha y tu destino dentro de Europa.",
  },
  {
    name: "Pedro N.",
    date: "20 Dic, 2025",
    initials: "PN",
    content:
      "Tengo pensado ingresar por Espana y luego moverme a Francia con mi perra. Me interesa una asesoria para no duplicar tramites y saber cuando corresponde gestionar el pasaporte europeo.",
    replyDate: "21 Dic, 2025",
    reply:
      "Ese tipo de ruta conviene revisarla completa desde el inicio. Podemos ayudarte a separar lo que necesitas para la llegada y lo que te servira despues dentro de la UE.",
  },
  {
    name: "Cristina B.",
    date: "08 Ene, 2026",
    initials: "CB",
    content:
      "Gracias por aclararlo. Yo estaba reuniendo papeles que quizas todavia no necesitaba. Quiero pedir informacion por WhatsApp para saber exactamente que si debo preparar desde Peru.",
    replyDate: "09 Ene, 2026",
    reply:
      "Perfecto. Si nos escribes con destino, fecha y especie, podemos darte una primera orientacion para que avances solo con lo que realmente aplica a tu caso.",
  },
  {
    name: "Hector D.",
    date: "29 Ene, 2026",
    initials: "HD",
    content:
      "Busco una empresa que me ayude con documentacion para viajar con mi gato a Europa. Este contenido me dio confianza porque no simplifica de mas. Me pueden mandar informacion?",
    replyDate: "30 Ene, 2026",
    reply:
      "Si, podemos ayudarte. Nuestro trabajo es aterrizar requisitos oficiales en un plan entendible y acompañarte segun la etapa en la que estes.",
  },
  {
    name: "Milagros T.",
    date: "16 Feb, 2026",
    initials: "MT",
    content:
      "Quiero cotizar el proceso porque estoy planeando un cambio de residencia y no quiero improvisar con el ingreso de mi mascota a Alemania. Ustedes revisan tambien documentos para viajes futuros dentro de Europa?",
    replyDate: "17 Feb, 2026",
    reply:
      "Si, podemos ayudarte a planificar tanto la primera entrada como la continuidad posterior si vas a moverte entre paises de la UE con tu mascota.",
  },
  {
    name: "Rosario F.",
    date: "05 Mar, 2026",
    initials: "RF",
    content:
      "Me interesa una orientacion comercial porque este tema del pasaporte europeo para mascotas me parecia mucho mas simple de lo que realmente es. Prefiero asesorarme bien antes de comprar vuelo.",
    replyDate: "06 Mar, 2026",
    reply:
      "Es una buena decision. Si quieres, revisamos tu caso y te decimos que documentos conviene preparar primero y cuales corresponden mas adelante.",
  },
  {
    name: "Laura P.",
    date: "11 Set, 2025",
    initials: "LP",
    content:
      "estoy viendo irme a Valencia con mi perrito y recien caigo en que el pasaporte europeo no era lo primero. si me orientan mejor",
  },
  {
    name: "Esteban M.",
    date: "09 Nov, 2025",
    initials: "EM",
    content:
      "me sirve bastante esto. yo estaba mezclando entrada a Europa con viajes dentro de Europa y ya estaba perdido",
  },
  {
    name: "Camila T.",
    date: "13 Dic, 2025",
    initials: "CT",
    content:
      "una consulta, ustedes revisan tambien cuando uno entra por un pais y luego se mueve a otro? en mi caso seria Espana y luego Belgica",
  },
  {
    name: "Diego S.",
    date: "31 Ene, 2026",
    initials: "DS",
    content:
      "quiero cotizar porque mi idea es viajar con mi gato y prefiero no avanzar con papeles que despues no sirvan",
  },
  {
    name: "Anais R.",
    date: "12 Mar, 2026",
    initials: "AR",
    content:
      "por fin alguien lo explica sin enredar. si tienen una llamada corta o WhatsApp para orientar, me interesa",
  },
]);

const peruDepartureComments = buildCommentThreads([
  {
    name: "Andrea C.",
    date: "09 Set, 2025",
    initials: "AC",
    content:
      "Estoy empezando a ver un viaje desde Lima con mi perro y quiero informacion comercial porque no entiendo en que momento entra SENASA y en que momento se coordina con la aerolinea.",
    replyDate: "10 Set, 2025",
    reply:
      "Podemos ayudarte a ordenar justamente esa secuencia. Primero se revisa el destino y la ventana sanitaria, y luego se alinea con SENASA y la aerolinea.",
  },
  {
    name: "Fernando R.",
    date: "30 Set, 2025",
    initials: "FR",
    content:
      "Muy buen articulo. Yo necesito cotizar un viaje con mascota desde Peru y me interesa saber cuanto tiempo antes deberia empezar si quiero viajar en verano.",
    replyDate: "01 Oct, 2025",
    reply:
      "Mientras antes mejor, porque algunos procesos se miden por fechas exactas. Si nos compartes destino y mes de viaje, te orientamos sobre el tiempo ideal para empezar.",
  },
  {
    name: "Karla M.",
    date: "18 Oct, 2025",
    initials: "KM",
    content:
      "Buscaba informacion sobre el certificado sanitario de exportacion y por fin encontre algo que explica el proceso completo. Quisiera saber si ustedes tambien ayudan a revisar el regreso al Peru.",
    replyDate: "19 Oct, 2025",
    reply:
      "Si, podemos revisar tanto la salida como el retorno para que no se vea cada tramo como si fuera el mismo proceso. Eso ayuda bastante a planificar mejor.",
  },
  {
    name: "Oscar P.",
    date: "07 Nov, 2025",
    initials: "OP",
    content:
      "Estoy por viajar con dos gatos y necesito una asesoria pagada para ordenar documentos, ventanas y coordinacion con SENASA. Me pueden enviar informacion?",
    replyDate: "08 Nov, 2025",
    reply:
      "Claro. Escribenos con pais de destino, fecha tentativa y cantidad de mascotas, y te contamos como trabajamos cada etapa del proceso.",
  },
  {
    name: "Paola D.",
    date: "29 Nov, 2025",
    initials: "PD",
    content:
      "Gracias por mencionar que el CSE no inicia todo el tramite. Yo estaba dejando todo para ultimo momento. Quisiera cotizar para que me ayuden a salir desde Peru sin errores.",
    replyDate: "30 Nov, 2025",
    reply:
      "Con gusto. Nuestro trabajo es ayudarte a llegar a esa etapa final con todo ordenado y dentro de plazo, no cuando ya estas corriendo con el vuelo encima.",
  },
  {
    name: "Miguel A.",
    date: "12 Dic, 2025",
    initials: "MA",
    content:
      "Estoy organizando un viaje a Chile con mi perrita y quiero saber si hacen una revision inicial por WhatsApp antes de contratar. Me interesa tener claro costos y tiempos.",
    replyDate: "13 Dic, 2025",
    reply:
      "Si, podemos darte una primera orientacion para que entiendas el panorama general y luego, si te encaja, avanzamos con el acompanamiento del caso.",
  },
  {
    name: "Lorena S.",
    date: "17 Ene, 2026",
    initials: "LS",
    content:
      "Necesito informacion porque me mudo en marzo y quiero viajar con mi gato desde Peru con todo en regla. El articulo me sirvio mucho para entender que lo critico es el calendario.",
    replyDate: "18 Ene, 2026",
    reply:
      "Exacto. El calendario manda gran parte del proceso. Si quieres, te ayudamos a convertir esos requisitos en una linea de tiempo concreta para tu caso.",
  },
  {
    name: "Bruno V.",
    date: "06 Feb, 2026",
    initials: "BV",
    content:
      "Muy claro todo. Yo quiero contratar ayuda para una salida desde Peru a Estados Unidos y me interesa saber si ustedes coordinan tambien la documentacion con mi veterinario tratante.",
    replyDate: "07 Feb, 2026",
    reply:
      "Si, podemos indicarte que informacion debe quedar alineada entre tu veterinario, el destino y la etapa final con SENASA para que el expediente sea consistente.",
  },
  {
    name: "Teresa G.",
    date: "26 Feb, 2026",
    initials: "TG",
    content:
      "Estoy comparando rutas para salir con mi perro y quiero pedir una cotizacion. Me gusto que expliquen el proceso con enfoque practico y no solo con lista de papeles.",
    replyDate: "27 Feb, 2026",
    reply:
      "Gracias. Ese es justamente nuestro enfoque: aterrizar requisitos a decisiones concretas. Si nos compartes tu ruta tentativa, te orientamos mejor.",
  },
  {
    name: "Raul N.",
    date: "15 Mar, 2026",
    initials: "RN",
    content:
      "Quisiera informacion comercial para empezar bien el viaje de mi mascota desde Peru. Ya tengo una fecha aproximada y prefiero delegar la revision del proceso para no correr riesgos.",
    replyDate: "16 Mar, 2026",
    reply:
      "Perfecto. Si ya tienes una fecha tentativa, estamos en buen momento para revisar documentos, plazos y secuencia del viaje antes de que se vuelva urgente.",
  },
  {
    name: "Monica P.",
    date: "16 Set, 2025",
    initials: "MP",
    content:
      "estoy recien viendo una salida desde Peru con mi perrita y me enrede con lo de SENASA. si hacen orientacion inicial me sirve bastante",
  },
  {
    name: "Cesar H.",
    date: "03 Oct, 2025",
    initials: "CH",
    content:
      "esto me aclaro varias cosas. yo estaba pensando que el certificado era lo primero y no toda la parte previa",
  },
  {
    name: "Giuliana E.",
    date: "21 Dic, 2025",
    initials: "GE",
    content:
      "una consulta, ustedes tambien ven casos de salida y regreso? no quiero resolver la ida y despues trabarme para volver",
  },
  {
    name: "Mateo F.",
    date: "10 Feb, 2026",
    initials: "MF",
    content:
      "necesito cotizar porque viajo en abril y siento que ya voy un poco tarde. me gustaria saber si todavia llego con los tiempos",
  },
  {
    name: "Pamela R.",
    date: "19 Mar, 2026",
    initials: "PR",
    content:
      "me recomendaron escribirles. estoy entre dos rutas y no se cual me conviene mas para viajar con mi gato desde Lima",
  },
]);

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
    comments: flightPlanningComments,
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
    comments: europePassportComments,
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
    comments: peruDepartureComments,
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
