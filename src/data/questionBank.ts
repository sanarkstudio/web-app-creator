export interface QuestionOption {
  txt: string;
  patron: string;
  val: string;
  trampa?: boolean;
  nota?: string;
}

export interface Question {
  area: string;
  texto: string;
  sub: string;
  opciones: QuestionOption[];
}

export interface AnswerRecord {
  pregunta: number;
  tipo: "opcion" | "abierta";
  texto?: string;
  opcion?: number;
  patron: string;
  val: string;
  trampa?: boolean;
  area: string;
  txtElegido?: string;
  notaTrampa?: string;
  preguntaTexto?: string;
}

const BANCO: Record<string, Question[]> = {
  responsabilidad: [
    {
      area: "Responsabilidad",
      texto: "Cuando algo que querías salió diferente a lo que esperabas, ¿qué fue lo primero que buscaste?",
      sub: "No lo que hiciste después. El primer movimiento interno.",
      opciones: [
        { txt: "Una explicación de por qué ocurrió así.", patron: "responsabilidad", val: "infantil" },
        { txt: "Lo que yo hice o dejé de hacer que contribuyó a ese resultado.", patron: "responsabilidad", val: "adulta", trampa: true, nota: "Saber que uno contribuye es distinto a operar desde esa premisa como punto de partida real. Esta respuesta describe la intención — no necesariamente la operación." },
        { txt: "A quién o qué había fallado en el proceso.", patron: "responsabilidad", val: "externo" },
        { txt: "La forma de que no volviera a pasar.", patron: "responsabilidad", val: "base" },
      ],
    },
    {
      area: "Responsabilidad",
      texto: "¿Cuánto de lo que hoy no tienes, no eres o no has logrado, lo explicas con algo que te ocurrió antes de los 25 años?",
      sub: "Sin filtro. Solo una estimación honesta.",
      opciones: [
        { txt: "Casi nada. No conecto mi presente con mi historia pasada.", patron: "responsabilidad", val: "negacion" },
        { txt: "Bastante. Mi historia explica muchas de mis limitaciones actuales.", patron: "responsabilidad", val: "adolescente", trampa: true, nota: "Que la historia explique las limitaciones es comprensible — y también puede ser la forma más validada de no moverse. Entender no es lo mismo que dejar de repetir." },
        { txt: "Algo. Lo reconozco como influencia, pero no como excusa.", patron: "responsabilidad", val: "parcial" },
        { txt: "Mucho. Sin eso que pasó, mi vida sería radicalmente diferente.", patron: "responsabilidad", val: "infantil" },
      ],
    },
    {
      area: "Responsabilidad",
      texto: "Piensa en la última vez que alguien cercano te confrontó con algo tuyo. ¿Qué ocurrió en tu interior?",
      sub: "No lo que respondiste. Lo que ocurrió antes de responder.",
      opciones: [
        { txt: "Necesité tiempo para procesar antes de poder ver si era verdad.", patron: "responsabilidad", val: "adolescente" },
        { txt: "Sentí incomodidad, pero pude sostenerla y evaluar si era cierto.", patron: "responsabilidad", val: "adulta", trampa: true, nota: "Esta respuesta describe al adulto psicológicamente entrenado. La pregunta es si eso es lo que realmente ocurre o lo que ocurre después de un rato de reacción inicial." },
        { txt: "Reaccioné primero. La defensa llegó antes que la evaluación.", patron: "responsabilidad", val: "infantil" },
        { txt: "Escuché, asentí, y luego lo descarté internamente.", patron: "fuga", val: "disociado" },
      ],
    },
  ],

  emociones: [
    {
      area: "Emociones",
      texto: "Cuando algo te genera una emoción fuerte, ¿qué ocurre con esa energía en las horas siguientes?",
      sub: "No lo que decides hacer con ella. Lo que le pasa sola.",
      opciones: [
        { txt: "Se transforma en algo — acción, decisión, creación.", patron: "emocional", val: "activa" },
        { txt: "Se queda dando vueltas en mi cabeza sin llegar a resolverse.", patron: "emocional", val: "rumiacion" },
        { txt: "La trabajo internamente hasta que baja de intensidad.", patron: "emocional", val: "intelectualizada", trampa: true, nota: "Trabajar la emoción internamente puede ser procesamiento real — o puede ser contención sofisticada. La diferencia está en si algo cambia después o si la emoción vuelve con la misma fuerza en la siguiente situación similar." },
        { txt: "Se drena en cosas secundarias — trabajo, distracción, movimiento.", patron: "fuga", val: "disipacion" },
      ],
    },
    {
      area: "Emociones",
      texto: "¿Qué emoción te resulta más incómodo mostrar delante de personas que te importan?",
      sub: "No la que crees que deberías mostrar más. La que realmente guardas.",
      opciones: [
        { txt: "La necesidad. Necesitar algo de alguien me pone en una posición que no me gusta.", patron: "emocional", val: "necesidad" },
        { txt: "La rabia. Siento que si la muestro daño el vínculo.", patron: "emocional", val: "rabia_contenida" },
        { txt: "La tristeza. Me cuesta dejarme ver vulnerable.", patron: "emocional", val: "tristeza_contenida" },
        { txt: "La alegría plena. Me da cierta incomodidad celebrar sin contenerme.", patron: "emocional", val: "alegria_bloqueada", trampa: true, nota: "Esta es la respuesta del trabajo emocional avanzado — quien ya sabe que bloquea incluso lo positivo. También puede ser una forma de parecer más trabajado de lo que se está." },
      ],
    },
    {
      area: "Emociones",
      texto: "Cuando alguien que te importa está sufriendo, ¿qué es lo primero que haces?",
      sub: "No lo ideal. Lo primero que ocurre antes de pensar.",
      opciones: [
        { txt: "Busco cómo ayudarle, resolver o aliviar lo que le pasa.", patron: "similar", val: "sostenedor" },
        { txt: "Me conecto con su dolor y lo acompaño desde ahí.", patron: "emocional", val: "conexion_real" },
        { txt: "Siento el peso de lo que le ocurre como si fuera mío.", patron: "emocional", val: "fusion" },
        { txt: "Me genero distancia interior aunque esté presente físicamente.", patron: "fuga", val: "disociacion" },
      ],
    },
  ],

  relaciones: [
    {
      area: "Relaciones",
      texto: "¿En qué momento de una relación importante empiezas a sentir que algo ya no funciona — antes de que haya ningún problema evidente?",
      sub: "La señal interna. Antes de que haya palabras.",
      opciones: [
        { txt: "Cuando empiezo a necesitar más espacio del que estoy tomando.", patron: "fuga", val: "distancia" },
        { txt: "Cuando siento que estoy dando más de lo que me llega.", patron: "similar", val: "sostenedor" },
        { txt: "Cuando el otro deja de necesitarme con la misma intensidad.", patron: "similar", val: "dependencia_inversa" },
        { txt: "Cuando ya no puedo ser completamente honesto sin calcular el impacto.", patron: "fuga", val: "mascara" },
      ],
    },
    {
      area: "Relaciones",
      texto: "En las relaciones que más te importaron, ¿qué papel terminaste ocupando de forma más recurrente?",
      sub: "No el que elegiste. El que apareció solo.",
      opciones: [
        { txt: "El que sostenía cuando el otro no podía.", patron: "similar", val: "sostenedor" },
        { txt: "El que se adaptaba para que el vínculo funcionara.", patron: "similar", val: "camaleon", trampa: true, nota: "Adaptarse suena a madurez y flexibilidad. Y también puede ser la forma más refinada de no ocupar el propio lugar — de estar presente sin realmente estar." },
        { txt: "El que ponía el ritmo y la dirección de la relación.", patron: "fortaleza", val: "lider_vincular" },
        { txt: "El que esperaba que el otro se acercara primero.", patron: "fuga", val: "distancia" },
      ],
    },
    {
      area: "Relaciones",
      texto: "¿Qué es lo que más trabajo te cuesta hacer en una relación cuando algo no está bien?",
      sub: "El movimiento que sabes que necesitas hacer y que más postergas.",
      opciones: [
        { txt: "Decir con claridad lo que necesito, sin suavizarlo.", patron: "fuga", val: "necesidad_oculta" },
        { txt: "Mantener el desacuerdo sin ceder antes de tiempo.", patron: "responsabilidad", val: "adolescente" },
        { txt: "Salir de la relación cuando sé que ya no tiene sentido seguir.", patron: "fuga", val: "salida" },
        { txt: "Abrirme sin saber si el otro va a estar a la altura.", patron: "fuga", val: "vulnerabilidad" },
      ],
    },
  ],

  finanzas: [
    {
      area: "Finanzas",
      texto: "Cuando piensas en tu situación económica actual, ¿qué es lo que más claramente sientes que no estás haciendo?",
      sub: "No lo que deberías hacer en teoría. Lo que sabes que no estás haciendo.",
      opciones: [
        { txt: "Generar más de lo que genero. El techo lo pongo yo, aunque no sé exactamente cómo.", patron: "patroneado", val: "techo_propio" },
        { txt: "Administrar mejor lo que entra. Entra, pero no se queda.", patron: "patroneado", val: "fuga_dinero" },
        { txt: "Tomar decisiones de inversión que llevo tiempo posponiendo.", patron: "fuga", val: "profesional" },
        { txt: "Nada específico. Mi relación con el dinero está bastante bien.", patron: "fuga", val: "negacion", trampa: true, nota: "Esta respuesta puede ser completamente cierta. También es la que da quien ha hecho trabajo de mentalidad financiera y aprendió a decirlo — sin que la estructura subyacente haya cambiado." },
      ],
    },
    {
      area: "Finanzas",
      texto: "¿Qué ocurre en ti cuando tienes una cantidad de dinero significativa disponible que no está comprometida?",
      sub: "El movimiento interno antes de cualquier decisión consciente.",
      opciones: [
        { txt: "Urgencia de protegerlo o invertirlo antes de que algo lo consuma.", patron: "emocional", val: "escasez" },
        { txt: "Una relajación. Como si por fin pudiera respirar.", patron: "emocional", val: "alivio_temporal" },
        { txt: "Claridad. Lo ubico, lo asigno y decido sin ansiedad.", patron: "responsabilidad", val: "adulta", trampa: true, nota: "Esta describe la relación ideal con el dinero — y es la que aspira a tener quien ha trabajado su mentalidad financiera. La pregunta es si describe la operación real o la intención." },
        { txt: "Una presión a hacer algo con él que justifique tenerlo.", patron: "emocional", val: "merecimiento" },
      ],
    },
  ],

  proposito: [
    {
      area: "Propósito",
      texto: "¿Qué parte de ti sientes que no has puesto en juego todavía — no por falta de capacidad, sino porque algo en ti lo frena?",
      sub: "No la ambición. La capacidad que tienes y que no está operando.",
      opciones: [
        { txt: "La capacidad de crear o construir algo desde cero y en mis propios términos.", patron: "fortaleza", val: "creacion" },
        { txt: "La capacidad de ocupar un lugar de visibilidad o liderazgo sin disculparme.", patron: "fuga", val: "visibilidad" },
        { txt: "La capacidad de descansar y recibir sin tener que justificarlo.", patron: "fortaleza", val: "presencia" },
        { txt: "La capacidad de decir que no sin que me cueste el vínculo.", patron: "fuga", val: "limite" },
      ],
    },
    {
      area: "Propósito",
      texto: "Cuando piensas en la vida que quieres construir, ¿qué es lo que más claramente sientes que te falta — no materialmente, sino estructuralmente?",
      sub: "Lo que falta en la arquitectura, no en la lista de cosas.",
      opciones: [
        { txt: "Claridad sobre qué quiero realmente, más allá de lo que se supone que debería querer.", patron: "fuga", val: "desconexion" },
        { txt: "La valentía de ir a por ello sin esperar tener todo resuelto primero.", patron: "patroneado", val: "control" },
        { txt: "El permiso interno para que me ocupe de lo mío sin sentirme egoísta.", patron: "emocional", val: "merecimiento" },
        { txt: "No me falta nada estructural. Estoy en el camino correcto.", patron: "fuga", val: "negacion", trampa: true, nota: "Esta respuesta puede ser verdad. Y también puede ser el resultado de haber aprendido a construir un relato de suficiencia que protege de la incomodidad de ver qué falta realmente." },
      ],
    },
  ],

  energia: [
    {
      area: "Energía",
      texto: "¿Qué situación de tu vida actual consume más energía de la que conscientemente le has asignado?",
      sub: "Ese gasto que ocurre sin haberlo decidido.",
      opciones: [
        { txt: "Sostener a alguien o algo que no me corresponde sostener.", patron: "similar", val: "sostenedor" },
        { txt: "Anticipar escenarios que todavía no han ocurrido.", patron: "emocional", val: "ansiedad" },
        { txt: "Mantener una imagen o expectativa que ya no es completamente mía.", patron: "fuga", val: "mascara" },
        { txt: "No identifico nada así. Gestiono bien mi energía.", patron: "fuga", val: "negacion", trampa: true, nota: "La energía no gestionada rara vez se siente como tal — se siente como normalidad. Quien dice gestionar bien su energía casi siempre tiene una zona de gasto invisible que no ha nombrado todavía." },
      ],
    },
    {
      area: "Energía",
      texto: "¿Cuándo fue la última vez que al final del día sentiste que tu energía fue exactamente donde querías que fuera?",
      sub: "No un día perfecto. Un día donde lo que hiciste coincidió con lo que querías hacer.",
      opciones: [
        { txt: "Hace poco. Tengo bastante alineación entre lo que quiero y lo que hago.", patron: "fortaleza", val: "alineacion", trampa: true, nota: "La alineación puede ser real. También puede ser el resultado de haber ajustado las expectativas hacia abajo hasta que coincidan con lo disponible — lo cual se parece mucho a la resignación bien narrada." },
        { txt: "No lo recuerdo con claridad. Hay demasiado ruido en el día a día.", patron: "patroneado", val: "dispersion" },
        { txt: "Hace tiempo. Sé que hay una brecha entre lo que hago y lo que elegiría.", patron: "fuga", val: "brecha" },
        { txt: "Raramente. La mayor parte de mi energía va a lo urgente, no a lo importante.", patron: "patroneado", val: "urgencia" },
      ],
    },
  ],

  cuerpo: [
    {
      area: "Cuerpo",
      texto: "¿Cuál es la señal física que tu cuerpo te da cuando estás en una situación que no te conviene — y que sueles ignorar?",
      sub: "No el síntoma extremo. La señal sutil y recurrente.",
      opciones: [
        { txt: "Tensión en alguna zona específica del cuerpo que se activa siempre en el mismo contexto.", patron: "emocional", val: "tension_localizada" },
        { txt: "Un cansancio que no es proporcional al esfuerzo físico real.", patron: "fuga", val: "cuerpo_agotado" },
        { txt: "Una sensación de que quiero salir de ahí antes de que la situación termine.", patron: "fuga", val: "urgencia_salida" },
        { txt: "No suelo tener señales físicas claras. Proceso más desde lo mental.", patron: "emocional", val: "desconexion_cuerpo", trampa: true, nota: "Procesar desde lo mental puede ser inteligencia — o puede ser la forma más eficaz de no sentir lo que el cuerpo está diciendo. La ausencia de señales físicas claras casi siempre es en sí misma una señal." },
      ],
    },
    {
      area: "Cuerpo",
      texto: "¿Cuándo tu cuerpo descansa de verdad — no duerme, no para — sino realmente descansa?",
      sub: "El descanso que regenera, no el que solo corta el movimiento.",
      opciones: [
        { txt: "Cuando estoy en la naturaleza, en silencio o haciendo algo que no tiene objetivo.", patron: "fortaleza", val: "presencia" },
        { txt: "Cuando resuelvo todo lo pendiente y por fin puedo soltar.", patron: "patroneado", val: "control" },
        { txt: "No sé si mi cuerpo descansa de verdad. Hay algo que no se apaga.", patron: "fuga", val: "activacion_cronica" },
        { txt: "Cuando estoy con personas con las que no tengo que mantener ninguna imagen.", patron: "relaciones", val: "autenticidad" },
      ],
    },
  ],

  patron: [
    {
      area: "Patroneado",
      texto: "Si miraras los últimos cinco años de tu vida como si fueran de otra persona, ¿qué ciclo verías repetirse con más claridad?",
      sub: "No una situación aislada. Un ciclo completo que se ha repetido.",
      opciones: [
        { txt: "Empieza bien, llega a cierto punto, y algo lo interrumpe o pierde fuerza.", patron: "patroneado", val: "interrupcion" },
        { txt: "Genera, logra, y luego siente que no era exactamente eso lo que quería.", patron: "fuga", val: "desplazamiento" },
        { txt: "Se compromete con algo o alguien, y termina dando más de lo que recibe.", patron: "similar", val: "sostenedor" },
        { txt: "No vería un ciclo claro. Cada período ha sido diferente al anterior.", patron: "patroneado", val: "negacion" },
      ],
    },
    {
      area: "Patroneado",
      texto: "¿Qué tipo de situación tiendes a crear — aunque no sea tu intención — en diferentes áreas de tu vida?",
      sub: "No lo que te ocurre. Lo que aparece alrededor tuyo de forma recurrente.",
      opciones: [
        { txt: "Situaciones donde termino siendo imprescindible para que algo funcione.", patron: "similar", val: "sostenedor" },
        { txt: "Situaciones donde llego a cierto techo y no termino de atravesarlo.", patron: "patroneado", val: "techo_propio" },
        { txt: "Situaciones de urgencia que me obligan a activarme cuando ya no queda otra.", patron: "patroneado", val: "urgencia" },
        { txt: "Situaciones donde invierto mucho y el retorno llega a medias o no llega.", patron: "patroneado", val: "fuga_dinero" },
      ],
    },
  ],

  fuga: [
    {
      area: "Fuga",
      texto: "¿Qué es lo que sabes que tendrías que decidir o hacer — y que llevas meses o años sin hacer?",
      sub: "No lo que aún no sabes. Lo que ya sabes y no estás haciendo.",
      opciones: [
        { txt: "Tener una conversación que podría cambiar algo importante en mi vida.", patron: "fuga", val: "relacional" },
        { txt: "Nada urgente. Estoy al día con lo que me toca.", patron: "fuga", val: "negacion", trampa: true, nota: "Estar al día puede ser real — y también puede ser la versión más ordenada de la fuga: no hay pendiente porque el sistema se ha diseñado para que nada llegue a ser urgente y todo permanezca postergado sin que parezca postergado." },
        { txt: "Tomar una decisión sobre mi trabajo, dirección profesional o economía.", patron: "fuga", val: "profesional" },
        { txt: "Parar de verdad y revisar si lo que estoy construyendo es lo que quiero.", patron: "fuga", val: "revision" },
      ],
    },
    {
      area: "Fuga",
      texto: "¿Cuánto de tu trabajo de autoconocimiento o desarrollo personal ha producido cambios reales y medibles en tus resultados?",
      sub: "Medibles en resultados concretos — no en comprensión sobre ti mismo.",
      opciones: [
        { txt: "Mucho. Hay áreas de mi vida que son radicalmente distintas a como eran.", patron: "fortaleza", val: "cambio_real", trampa: true, nota: "El cambio en áreas de vida es el criterio correcto. La trampa está en si esas áreas son las que más importan o las más accesibles — a veces se transforma lo fácil para no tocar lo estructural." },
        { txt: "Algo. He crecido en comprensión pero los patrones de fondo siguen siendo similares.", patron: "fuga", val: "comprension_sin_cambio" },
        { txt: "Poco. Entiendo más sobre mí mismo, pero mis circunstancias no han cambiado tanto.", patron: "fuga", val: "insight_sin_accion" },
        { txt: "No lo sé. No suelo medir el desarrollo personal en términos de resultados.", patron: "fuga", val: "abstraccion" },
      ],
    },
  ],

  fortaleza: [
    {
      area: "Fortaleza",
      texto: "¿En qué contexto apareces tú con más claridad — sin esfuerzo, sin actuación, sin sostener nada?",
      sub: "No el contexto ideal. El que ya existe y en el que te encuentras a ti mismo.",
      opciones: [
        { txt: "Cuando creo, diseño o construyo algo que no existía antes.", patron: "fortaleza", val: "creacion" },
        { txt: "Cuando acompaño a alguien en un momento real de transformación.", patron: "fortaleza", val: "conexion" },
        { txt: "Cuando tengo que encontrar la salida donde otros no la ven.", patron: "fortaleza", val: "vision" },
        { txt: "Cuando todo funciona con precisión y las piezas encajan sin fricción.", patron: "fortaleza", val: "ejecucion" },
      ],
    },
    {
      area: "Fortaleza",
      texto: "¿Qué es lo que los demás ven en ti que tú tardas más en reconocer como algo tuyo?",
      sub: "No el halago. La capacidad que los otros detectan antes que tú.",
      opciones: [
        { txt: "La capacidad de ver lo que hay debajo de las situaciones — leer el fondo.", patron: "fortaleza", val: "vision" },
        { txt: "La capacidad de crear vínculos donde otros no logran conectar.", patron: "fortaleza", val: "conexion" },
        { txt: "La capacidad de sostener la claridad cuando todo está revuelto.", patron: "fortaleza", val: "presencia" },
        { txt: "La capacidad de hacer que algo que parecía imposible se vuelva concreto.", patron: "fortaleza", val: "creacion" },
      ],
    },
  ],

  identidad: [
    {
      area: "Identidad",
      texto: "¿Hay algo en la forma en que te presentas al mundo que sientes que no es completamente tuyo?",
      sub: "Una forma de ser, un rol, una imagen que llevas — que no elegiste del todo.",
      opciones: [
        { txt: "No. Lo que proyecto es una expresión real de lo que soy.", patron: "fuga", val: "negacion", trampa: true, nota: "Lo que proyectamos como 'lo que somos' casi siempre tiene capas que no elegimos. La certeza de que la imagen es auténtica puede ser el resultado de años de habituación — no de elección consciente." },
        { txt: "Sí. Hay una versión mía que es más para el entorno que para mí.", patron: "fuga", val: "mascara" },
        { txt: "Sí. Hay algo que fui construyendo para encajar que ya no necesito pero no he soltado.", patron: "patroneado", val: "identidad_heredada" },
        { txt: "No estoy seguro. Hay momentos en que no sé cuál es la capa real.", patron: "fuga", val: "confusion_identidad" },
      ],
    },
    {
      area: "Identidad",
      texto: "Si la persona que eras hace diez años pudiera verte hoy, ¿qué le sorprendería más?",
      sub: "No el logro. La sorpresa estructural — lo que no esperaba que fueras o que no fueras.",
      opciones: [
        { txt: "Que sigo en algunas de las mismas dinámicas, aunque con más vocabulario para describirlas.", patron: "patroneado", val: "loop_sofisticado" },
        { txt: "Que he logrado cosas que entonces parecían inalcanzables.", patron: "fortaleza", val: "creacion" },
        { txt: "Que he renunciado a algo que entonces era central y que ya no está.", patron: "fuga", val: "renuncia" },
        { txt: "Que por fuera parece que tengo más, pero por dentro hay algo que no se ha movido.", patron: "fuga", val: "brecha_interior" },
      ],
    },
  ],
};

export function seleccionarPreguntas(): Question[] {
  const obligatorias = ["fuga", "fortaleza", "responsabilidad", "patron", "emociones"];
  const seleccionadas: Question[] = [];
  const usadas: Record<string, number[]> = {};

  obligatorias.forEach((area) => {
    const b = BANCO[area];
    const idx = Math.floor(Math.random() * b.length);
    seleccionadas.push(b[idx]);
    usadas[area] = [idx];
  });

  const opcionales = Object.keys(BANCO).filter((a) => !obligatorias.includes(a));
  opcionales.sort(() => Math.random() - 0.5);

  for (const area of opcionales) {
    if (seleccionadas.length >= 15) break;
    const b = BANCO[area];
    const ya = usadas[area] || [];
    const disp = b.map((_, i) => i).filter((i) => !ya.includes(i));
    if (!disp.length) continue;
    const idx = disp[Math.floor(Math.random() * disp.length)];
    seleccionadas.push(b[idx]);
    usadas[area] = [...ya, idx];
  }

  if (seleccionadas.length < 15) {
    for (const area of Object.keys(BANCO)) {
      if (seleccionadas.length >= 15) break;
      const b = BANCO[area];
      const ya = usadas[area] || [];
      if (ya.length >= 2) continue;
      const disp = b.map((_, i) => i).filter((i) => !ya.includes(i));
      if (!disp.length) continue;
      const idx = disp[Math.floor(Math.random() * disp.length)];
      seleccionadas.push(b[idx]);
      usadas[area] = [...ya, idx];
    }
  }

  seleccionadas.sort(() => Math.random() - 0.5);
  return seleccionadas.slice(0, 15);
}

export function generarLecturaLocal(nombre: string, respuestas: AnswerRecord[]) {
  const trampas = respuestas.filter((r) => r.trampa).length;
  const fugas = respuestas.filter((r) => r.patron === "fuga");
  const abierta = respuestas.find((r) => r.tipo === "abierta");
  const respResp = respuestas.find((r) => r.patron === "responsabilidad");
  const fortalezaR = respuestas.find((r) => r.patron === "fortaleza");
  const sostenedor = respuestas.find((r) => r.val === "sostenedor");
  const sabotaje = respuestas.find((r) => r.val === "techo_propio" || r.val === "interrupcion");
  const dispersion = respuestas.find((r) => r.val === "dispersion" || r.val === "urgencia");
  const carencia = respuestas.find((r) => r.val === "desplazamiento" || r.val === "brecha_interior");
  const mascara = respuestas.find((r) => r.val === "mascara" || r.val === "identidad_heredada");
  const ansiedad = respuestas.find((r) => r.val === "ansiedad" || r.val === "escasez");
  const disociacion = respuestas.find((r) => r.val === "disociacion" || r.val === "disociado");

  let nivelResp = "Adolescente";
  let nivelNum = 2;
  if (respResp?.val === "adulta" && trampas > 2) { nivelResp = "Adolescente Avanzada"; nivelNum = 3; }
  else if (respResp?.val === "adulta") { nivelResp = "Adulta"; nivelNum = 4; }
  else if (respResp?.val === "infantil" || respResp?.val === "externo") { nivelResp = "Infantil"; nivelNum = 1; }

  const areasConFuga = [...new Set(fugas.map((r) => r.area).filter(Boolean))];

  // INTRO
  let intro: string;
  if (abierta) {
    intro = `${nombre}, cuando escribiste con tus propias palabras "${abierta.texto?.substring(0, 100)}${(abierta.texto?.length || 0) > 100 ? "..." : ""}" — eso fue el momento más honesto del cuestionario. Y también el más revelador. Porque lo que nadie escoge de una lista, sino que escribe solo, es lo que realmente está pasando. Lo que sigue es lo que eso, junto con el resto de tus respuestas, dice sobre cómo está operando tu vida ahora mismo.`;
  } else if (trampas >= 3) {
    intro = `${nombre}, en varias preguntas elegiste exactamente la respuesta que elegiría alguien que ha trabajado en sí mismo. Eso no es casual y no es un defecto — es el primer dato de tu lectura. Porque la distancia entre saber la respuesta correcta y operar desde ella en la vida real es exactamente donde vive la estructura que esta lectura busca. Y en tu caso, esa distancia tiene forma, tiene áreas concretas, y tiene un coste que ya conoces aunque quizás no hayas podido nombrarlo así.`;
  } else {
    intro = `${nombre}, lo que revelan tus respuestas juntas no es lo mismo que lo que revela cada una por separado. Individualmente, todo tiene sentido. Juntas, aparece un mapa de cómo funciona realmente tu vida — no cómo la describes, sino cómo opera. Lo que sigue no es un análisis de tu personalidad. Es una lectura de los patrones que están dirigiendo tus decisiones, tus relaciones y tus resultados, probablemente desde mucho antes de que pudieras elegirlos.`;
  }

  // PATRONEADO
  let patronTitulo: string, patronContenido: string;
  if (sabotaje) {
    patronTitulo = "Llegas hasta justo antes — y ahí para";
    patronContenido = "Hay un momento en tu historia que se ha repetido más de una vez: estás cerca de algo real, algo que importa, y justo ahí aparece algo que lo frena. A veces es externo — una circunstancia, una persona, un cambio inesperado. A veces es interno — pierdes la energía, el interés, la certeza de que valía la pena. Lo que tus respuestas revelan es que ese momento no es accidente. Ocurre siempre en el mismo punto: cuando el logro real ya no es una posibilidad sino una realidad inminente. Tu estructura heredada tiene programado un freno en ese punto exacto. No para sabotearte — sino para proteger algo que en algún momento fue necesario proteger. El problema es que ya no lo es, pero el freno sigue activo.";
  } else if (dispersion) {
    patronTitulo = "Empiezas fuerte. A mitad, algo se pierde";
    patronContenido = "Si miras los últimos años como si fueran de otra persona, verías un patrón claro: empieza con convicción, con energía, con una dirección clara — y en algún punto del camino esa energía se dispersa. A veces hacia lo urgente. A veces hacia un proyecto nuevo que parece más interesante. Lo que tus respuestas revelan es que esto no ocurre solo en un área — ocurre en varias. Y eso no es falta de disciplina ni de carácter. Es que la estructura que organiza tu energía tiene un techo. Cuando llegas a cierto nivel de compromiso real, de exposición — algo redirige la energía hacia zonas más seguras. El resultado es que produces mucho a medias y casi nada terminado del todo.";
  } else if (carencia) {
    patronTitulo = "Lo que buscas siempre viene desde lo que te faltó";
    patronContenido = "Hay una diferencia entre querer algo porque lo deseas y querer algo porque su ausencia duele. Lo que tus respuestas revelan es que buena parte de lo que construyes, de lo que buscas y de lo que persigues tiene como motor lo segundo: el hueco, la carencia, lo que no estuvo. Eso no es un defecto — es una forma de moverse que tiene mucha energía. El problema es que ese tipo de energía nunca llega a saciarse. Cuando alcanzas lo que buscabas, el hueco no desaparece — se mueve. El objetivo cambia. Y terminas en el mismo lugar de insatisfacción con distintos logros encima.";
  } else {
    patronTitulo = "El mismo resultado con distintos personajes";
    patronContenido = "Si miraras los últimos cinco o diez años de tu vida como si fueran de otra persona, verías algo curioso: los personajes cambian, las situaciones cambian, el contexto cambia — pero hay un tipo de resultado que aparece con más frecuencia de lo que debería si fuera solo casualidad. Una dinámica que se repite. Lo que tus respuestas revelan es que esa repetición no es mala suerte. Es estructura. Es la arquitectura que construiste — o que heredaste — para sobrevivir, funcionar y relacionarte, operando exactamente como fue diseñada. El problema es que fue diseñada en otro momento, para otra versión de ti, y nadie la ha actualizado.";
  }

  // SIMILAR
  let similarTitulo: string, similarContenido: string;
  if (sostenedor) {
    similarTitulo = "En todos lados terminas siendo el que sostiene";
    similarContenido = "En el trabajo, en casa, en tus relaciones más importantes — hay un rol que te encuentras ocupando sin haberlo decidido conscientemente: el que sostiene. El que resuelve lo que otros no pueden o no quieren resolver. El que está disponible cuando los demás necesitan. Eso apareció en más de un área de tus respuestas, y no es coincidencia — es estructura. Hay una parte de ti que aprendió que estar disponible para otros es la forma de tener un lugar, de ser necesario, de que el vínculo funcione. Lo que eso te cuesta en energía, en tiempo propio, en lo que no construyes porque estás sosteniendo lo de los demás — eso es lo que la lectura completa trabaja.";
  } else if (disociacion) {
    similarTitulo = "Cuando aprieta, te desconectas y funcionas en automático";
    similarContenido = "En momentos de presión alta — en el trabajo, en relaciones difíciles, cuando algo se complica de verdad — tu sistema hace algo muy específico: se desconecta emocionalmente y sigue funcionando. Es eficiente. Resuelves, produces, gestionas. Pero no estás del todo presente. Lo que tus respuestas revelan es que eso ocurre en más de un contexto. Y lo que revela ese patrón es que en algún momento aprendiste que la forma más segura de sobrevivir a lo intenso era no sentirlo demasiado. Eso tiene un coste en la profundidad de tus vínculos y en la capacidad de conectarte con lo que realmente importa.";
  } else if (ansiedad) {
    similarTitulo = "La anticipación consume lo que el presente podría darte";
    similarContenido = "Hay algo que apareció en distintas respuestas con formas diferentes pero con la misma raíz: una parte de tu energía se va en anticipar lo que podría salir mal, en protegerte de escenarios que todavía no han ocurrido. En el dinero apareció. En las relaciones también. Eso no es cobardía ni ansiedad como diagnóstico — es una estructura que aprendió que la seguridad se construye anticipando el peligro. El precio es que esa anticipación consume la energía que podría ir a construir lo que quieres. Y que el presente nunca es suficientemente seguro para estar del todo en él.";
  } else {
    similarTitulo = "La misma raíz con distinta forma en cada área";
    similarContenido = "Lo que parece un problema en el trabajo, un problema diferente en tus relaciones y otro problema distinto en tu economía o tu energía — cuando los ves juntos, tienen la misma raíz. La misma lógica interna operando en distintos escenarios. Eso es lo que Sanark llama 'lo similar en lo diferente': no son tres problemas, es un solo patrón que se expresa de tres formas. Cuando tocas la raíz, todo lo de arriba cambia. Pero para tocar la raíz, primero tienes que verla.";
  }

  // FUGA
  let fugaTitulo: string, fugaContenido: string;
  if (areasConFuga.length >= 2) {
    fugaTitulo = "Lo que sabes que necesitas hacer — y no estás haciendo";
    fugaContenido = `Hay algo en tu vida que llevas tiempo sin tocar. No porque no lo veas — lo ves. No porque no sepas lo que necesitas hacer — lo sabes. Sino porque cada vez que te acercas, aparece algo más urgente, algo que justifica esperarse un poco más. Tus respuestas lo mostraron en más de una área: en ${areasConFuga.slice(0, 2).join(" y ")}. El mecanismo no es el mismo en todas partes, pero el resultado sí: ese punto permanece intocado. Lo que eso revela es que tu estructura tiene una zona de no-tocar muy bien protegida. Y lo que hay detrás de esa zona es exactamente desde donde se podría construir algo genuinamente diferente.`;
  } else if (mascara) {
    fugaTitulo = "Hay una versión tuya que llevas para el mundo y otra que guardas";
    fugaContenido = "Tus respuestas revelan algo específico: hay una imagen que proyectas, una forma de presentarte y de relacionarte, que no es completamente tuya. No es mentira — tiene partes reales. Pero tiene también partes que construiste para encajar, para que el entorno te aceptara. Y esa construcción es tan antigua que a veces ya no sabes cuál es la capa real. Lo que eso te cuesta es energía. Toda la que va a mantener coherente esa imagen ante los demás. Y lo que te cuesta también es profundidad — porque los vínculos que se forman con la versión construida nunca llegan al nivel de los que podrían formarse con la versión real.";
  } else {
    fugaTitulo = "Lo que evitas con tanta inteligencia que ni lo llamas evasión";
    fugaContenido = "Hay algo que tu estructura evita con sofisticación. No con huida obvia — eso sería demasiado visible. Lo evita con análisis, con esperar el momento adecuado, con prioridades que cambian justo cuando ese punto se vuelve inevitable. Lo que hay detrás de esa evasión no es cobardía. Es un sistema de protección que aprendió que acercarse a ciertas cosas tiene un coste. Y prefiere evitar el coste aunque eso signifique también evitar lo que podría estar al otro lado.";
  }

  // FORTALEZA
  let fortalezaTitulo: string, fortalezaContenido: string;
  if (fortalezaR?.val === "creacion") {
    fortalezaTitulo = "Tienes la capacidad de hacer existir lo que no existe";
    fortalezaContenido = "Cuando respondiste sobre cuándo te sientes más tú, elegiste la creación — cuando algo que no existía pasa a existir gracias a ti. Eso no es una preferencia estética ni un hobby. Es la forma en que tu estructura está diseñada para operar en su máxima potencia. Hay algo en ti que sabe leer el vacío y construir desde ahí. Lo que tus otras respuestas revelan es que esa capacidad no ha operado todavía en las áreas más importantes de tu vida porque la estructura heredada la ha redirigido hacia otras prioridades — sostener, anticipar, no exponerse.";
  } else if (fortalezaR?.val === "conexion") {
    fortalezaTitulo = "Creas vínculos que transforman — y casi no te das cuenta";
    fortalezaContenido = "Elegiste la conexión como el espacio donde más eres tú — cuando acompañas a alguien en un momento real y algo en esa persona cambia. Eso no es empatía genérica. Es una capacidad estructural de estar presente de una forma que crea transformación. Lo que tus otras respuestas revelan es que esa capacidad ha estado al servicio de sostenerte en los vínculos — de ser necesario, de ser el que está disponible — más que al servicio de crear desde tu propio lugar. Usas tu mayor fortaleza para mantener estructuras que no elegiste.";
  } else if (fortalezaR?.val === "vision") {
    fortalezaTitulo = "Ves lo que otros no ven — y eso te aísla más de lo que te conecta";
    fortalezaContenido = "Tu estructura tiene la capacidad de leer sistemas complejos, de encontrar el punto que otros no ven, de llegar a conclusiones que a los demás les llevan mucho más tiempo. Es una fortaleza real y poderosa. Lo que tus otras respuestas revelan es que esa misma capacidad te pone en una posición de soledad. Quien ve más que los demás a veces no sabe cómo comunicar lo que ve. Y termina operando solo, sosteniendo solo, resolviendo solo. Eso no es el uso óptimo de esa fortaleza — es la consecuencia de no haber encontrado todavía el contexto donde se despliega completamente.";
  } else {
    fortalezaTitulo = "Hay algo en ti que funciona incluso cuando tú no puedes";
    fortalezaContenido = "Lo que tus respuestas revelan es que hay una capacidad en ti que ha operado incluso en los momentos más difíciles. No es la capacidad que te han dicho que tienes, ni la que apareces gestionando públicamente. Es algo más silencioso y más constante — una forma de mantenerte funcionando, de encontrar la salida, de producir resultados cuando todo lo demás falla. Eso es una fortaleza estructural real. Lo que tus otras respuestas también revelan es que esa fortaleza ha estado operando al servicio de sostener lo que hay en lugar de construir lo que quieres.";
  }

  // RESPONSABILIDAD
  const respTexto = trampas >= 2
    ? `${nombre}, en más de una pregunta elegiste la respuesta que daría alguien que opera desde la responsabilidad adulta — que se hace cargo, que evalúa con calma, que no culpa al entorno. Eso revela algo importante: sabes perfectamente cómo debería responder alguien maduro en esas situaciones. Y lo que el resto de tus respuestas muestra es que hay una distancia entre ese saber y cómo operas realmente en la vida cotidiana. Esa distancia no es hipocresía. Es que la estructura puede aprender el lenguaje sin cambiar la operación. Y hasta que la operación cambia, el lenguaje funciona como cobertura — muy sofisticada, muy convincente, pero cobertura.`
    : "Lo que revelan tus respuestas sobre cómo te posicionas ante tu propia vida es específico: hay áreas donde te haces cargo completamente y áreas donde la responsabilidad se difumina — donde el entorno, la historia, las circunstancias tienen más peso que tu propia elección. Eso no es un juicio. Es una lectura del nivel desde donde operas. Y ese nivel determina directamente qué tipo de realidad puedes construir. No porque seas más o menos capaz, sino porque el tipo de responsabilidad que asumes define el rango de lo que puedes mover.";

  return {
    intro,
    patroneado: { titulo: patronTitulo, contenido: patronContenido },
    similar: { titulo: similarTitulo, contenido: similarContenido },
    fuga: { titulo: fugaTitulo, contenido: fugaContenido },
    fortaleza: { titulo: fortalezaTitulo, contenido: fortalezaContenido },
    nivel_responsabilidad: nivelResp,
    nivel_num: nivelNum,
    resp_texto: respTexto,
    resp_teaser: "Lo que esta lectura no muestra — de dónde vienen exactamente estos patrones, qué los mantiene activos y cómo se trabaja sobre ellos de forma concreta — eso es lo que la Lectura Estructural Completa hace contigo, en 90 minutos, en directo.",
    narrativa: `${nombre}, lo que acabas de leer es real. No es un perfil genérico — son tus respuestas, leídas juntas. Si algo de esto te incomodó es porque nombró algo que ya sabías pero que quizás no habías puesto en estas palabras. Lo que opera debajo de todo esto — el origen, los mecanismos exactos, el mapa de cómo cambiarlo — eso es lo que viene después. La pregunta no es si quieres verlo. Es si estás en el momento en que te resulta necesario.`,
  };
}

export default BANCO;
