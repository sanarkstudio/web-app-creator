import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// ═══════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════
interface Question {
  id: string;
  category: string;
  text: string;
  note: string;
  options: { letter: string; text: string }[];
}

interface PatternResult {
  title: string;
  body: string;
}

type Answers = Record<string, string>;

// ═══════════════════════════════════════════════════════════
// PREGUNTAS
// ═══════════════════════════════════════════════════════════
const questions: Question[] = [
  {
    id: "q1", category: "Área de vida",
    text: "Cuando piensas en el área de tu vida donde más frecuentemente sientes frustración, bloqueo o insatisfacción... ¿cuál es la primera que viene a tu mente?",
    note: "Responde desde el primer impulso. No hay respuesta correcta.",
    options: [
      { letter: "A", text: "Relaciones personales o afectivas" },
      { letter: "B", text: "Carrera, trabajo o propósito profesional" },
      { letter: "C", text: "Finanzas o abundancia material" },
      { letter: "D", text: "Salud, energía o bienestar físico" },
      { letter: "E", text: "Bienestar emocional o paz interior" },
    ],
  },
  {
    id: "q2", category: "Patrón de experiencia",
    text: "¿Cuál de estas frases describe mejor lo que vives con más frecuencia en ese ámbito?",
    note: "Elige la que más resuene, aunque no sea perfecta.",
    options: [
      { letter: "A", text: "Empiezo con energía pero con el tiempo pierdo el impulso o el interés" },
      { letter: "B", text: "Me esfuerzo mucho pero los resultados no reflejan lo que invierto" },
      { letter: "C", text: "Sé lo que quiero, pero algo interno me frena antes de llegar" },
      { letter: "D", text: "Me cuesta definir qué es realmente lo que quiero o hacia dónde ir" },
      { letter: "E", text: "Llego a cierto nivel y ahí me estanco, como si hubiera un techo invisible" },
    ],
  },
  {
    id: "q3", category: "Transferencia de patrón",
    text: "Ese patrón que acabas de identificar... ¿lo reconoces también en alguna otra área de tu vida?",
    note: "Esta pregunta es clave. Responde con honestidad.",
    options: [
      { letter: "A", text: "Sí, en relaciones — llego a cierto nivel de intimidad y algo se interrumpe" },
      { letter: "B", text: "Sí, en proyectos personales — los inicio pero rara vez los llevo al siguiente nivel" },
      { letter: "C", text: "Sí, en finanzas — hay un nivel económico del que no logro salir" },
      { letter: "D", text: "Sí, lo veo claramente en más de una área" },
      { letter: "E", text: "No, siento que es específico al área que mencioné" },
    ],
  },
  {
    id: "q4", category: "Mecanismo interno",
    text: "Cuando estás cerca de un salto importante — profesional, económico o personal — ¿qué ocurre generalmente en ti?",
    note: "No hay respuesta más válida que otra.",
    options: [
      { letter: "A", text: "Aparece una razón 'lógica' por la que no es el momento adecuado" },
      { letter: "B", text: "Siento ansiedad o tensión que me lleva a frenar o postergar" },
      { letter: "C", text: "Actúo, pero inconscientemente hago algo que sabotea el resultado" },
      { letter: "D", text: "Me desconecto emocionalmente del objetivo, como si dejara de importarme" },
      { letter: "E", text: "Avanzo, pero algo externo siempre aparece para interrumpirlo" },
    ],
  },
  {
    id: "q5", category: "Capa profunda",
    text: "Cuando reflexionas con honestidad sobre ese freno interno... ¿con cuál de estas ideas conectas más?",
    note: "Lo que tocamos aquí pocas veces se verbaliza. Tómate el tiempo necesario.",
    options: [
      { letter: "A", text: "En el fondo no me siento completamente merecedor de ese nivel de éxito" },
      { letter: "B", text: "Temo lo que cambiaría en mi vida o relaciones si realmente lo lograra" },
      { letter: "C", text: "Creo que el éxito grande trae consecuencias o responsabilidades que no quiero" },
      { letter: "D", text: "Me identifico tanto con el esfuerzo y la lucha que no sé quién sería sin ellos" },
      { letter: "E", text: "No lo tengo del todo claro, pero sé que algo interno interfiere" },
    ],
  },
  {
    id: "q6", category: "Zona de fortaleza",
    text: "En los momentos donde sí has avanzado y superado obstáculos difíciles... ¿qué ha estado presente en ti?",
    note: "Esta es tu zona de fortaleza estructural.",
    options: [
      { letter: "A", text: "Capacidad de análisis y pensamiento estratégico para encontrar salidas" },
      { letter: "B", text: "Persistencia o resistencia interna que me hace seguir aunque todo se complique" },
      { letter: "C", text: "Habilidad para conectar con personas clave que me abren puertas" },
      { letter: "D", text: "Visión clara de hacia dónde voy que me mantiene orientado en la incertidumbre" },
      { letter: "E", text: "Intuición o sensibilidad especial para leer situaciones y personas" },
    ],
  },
  {
    id: "q7", category: "La Fuga",
    text: "¿Hay algún tema o decisión relacionada con tu crecimiento que sabes que deberías enfrentar... pero que sistemáticamente evitas o postpones?",
    note: "Lo que evitamos con más consistencia suele ser donde está la clave.",
    options: [
      { letter: "A", text: "Reconocer y declarar mi propio valor — cobrar lo que merezco o pedir lo que necesito" },
      { letter: "B", text: "Tener conversaciones difíciles con personas clave de mi vida o trabajo" },
      { letter: "C", text: "Tomar una decisión grande que implicaría dejar algo conocido o seguro atrás" },
      { letter: "D", text: "Mirar de frente mi situación real — económica, emocional o relacional — y actuar" },
      { letter: "E", text: "Comprometerme plenamente con algo sin tener garantías de que funcionará" },
    ],
  },
  {
    id: "q8", category: "El cambio deseado",
    text: "Si pudieras transformar una sola cosa en cómo operas internamente — no en el mundo exterior, sino en ti — ¿qué sería?",
    note: "Tu respuesta aquí cerrará el ciclo de detección.",
    options: [
      { letter: "A", text: "Sentirme genuinamente merecedor y capaz de resultados grandes y sostenidos" },
      { letter: "B", text: "Dejar de sabotearme justo cuando estoy cerca de lograr lo que quiero" },
      { letter: "C", text: "Actuar desde la confianza plena en lugar de desde el miedo o la duda" },
      { letter: "D", text: "Sostener el éxito cuando llega, sin minimizarlo ni destruirlo inconscientemente" },
      { letter: "E", text: "Tener claridad real sobre lo que quiero y el coraje de ir por ello sin frenar" },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// BANCO DE RESULTADOS
// ═══════════════════════════════════════════════════════════
const areaLabels: Record<string, string> = { A: "relaciones", B: "carrera", C: "finanzas", D: "salud", E: "bienestar" };

const PATRONEADO: Record<string, PatternResult> = {
  "A-A": { title: "El Ciclo de la Energía Fugaz", body: "Tu patrón central es un ciclo de entusiasmo que se agota antes de completarse. Comienzas desde un lugar genuino de impulso, pero una razón lógica aparece en el trayecto para justificar el abandono. No es falta de motivación: es una estructura que racionaliza el freno justo cuando el compromiso se vuelve real." },
  "A-B": { title: "El Arranque sin Aterrizaje", body: "Inicias desde un lugar de posibilidad real, pero la tensión o ansiedad que surge cuando el compromiso se concreta interrumpe el ciclo antes de cerrarse. El patrón se activa especialmente cuando comenzar a ser visto en lo que haces se vuelve inevitable." },
  "A-C": { title: "El Impulso que se Deshace", body: "La energía inicial es genuina, pero una acción inconsciente aparece en el momento más crítico para deshacer el avance. Este sabotaje no se experimenta como tal desde adentro — se vive como mala suerte, mal momento o circunstancias que escapan a tu control." },
  "A-D": { title: "La Desconexión Progresiva", body: "Comienzas con entusiasmo real, pero en algún punto del proceso te desconectas emocionalmente del objetivo. Lo que antes importaba deja de importar — no por decisión consciente, sino como un mecanismo protector ante lo que podría ocurrir si llegas de verdad." },
  "A-E": { title: "El Ciclo de la Interferencia Oportuna", body: "Tu ciclo tiene una regularidad llamativa: la energía aparece, el inicio ocurre, y justo cuando el avance se consolida, algo externo lo interrumpe. Lo externo cambia de forma constantemente; el momento exacto en que aparece, no." },
  "B-A": { title: "El Esfuerzo Justificado", body: "Hay un patrón claro de alta inversión que no se traduce en resultados proporcionales. La razón lógica siempre aparece para explicar el desequilibrio — 'aún no es el momento', 'falta solo un poco más' — postergando indefinidamente el cierre de la ecuación." },
  "B-B": { title: "La Trampa del Movimiento Constante", body: "El esfuerzo se convierte en un estado permanente que genera sensación de avance sin resultados reales. La ansiedad que surge ante la posibilidad de que los resultados lleguen de verdad mantiene el ciclo girando sin que se cierre." },
  "B-C": { title: "El Sabotaje de la Proporcionalidad", body: "Inviertes genuinamente, pero en el momento en que los resultados deberían materializarse, una acción inconsciente desajusta la ecuación. El patrón protege de algo que ocurriría si el esfuerzo y el resultado finalmente se alinearan de manera sostenida." },
  "B-D": { title: "La Anestesia del Trabajo", body: "El trabajo intenso ocupa el espacio donde deberían estar los resultados. Cuando los resultados se acercan, la desconexión emocional aparece como un mecanismo de protección ante lo que implicaría recibirlos y sostenerlos." },
  "B-E": { title: "El Esfuerzo Interrumpido", body: "Trabajas genuinamente, pero algo externo aparece con regularidad para desbalancear la ecuación antes de que el resultado se consolide. La interrupción cambia de forma; el momento en que ocurre, no." },
  "C-A": { title: "El Freno Racional", body: "Sabes lo que quieres con claridad, pero justo antes del paso definitivo, una razón lógica y bien construida aparece para justificar la espera. El freno no es externo ni irracional — es sofisticado, convincente, y siempre llega antes de tiempo." },
  "C-B": { title: "El Freno de la Tensión", body: "La dirección está clara, pero la ansiedad que se activa ante la posibilidad real de lograrlo detiene el movimiento. Esa tensión no responde al peligro — responde a la proximidad del éxito y lo que significa alcanzarlo realmente." },
  "C-C": { title: "El Sabotaje del Umbral", body: "Avanzas con claridad hacia lo que quieres, pero en el momento de mayor acercamiento — en el umbral mismo — algo se deshace. Una acción, una omisión, una decisión. El sabotaje opera en el punto exacto de llegada." },
  "C-D": { title: "El Freno de la Distancia Emocional", body: "La visión es nítida hasta que se vuelve alcanzable. En ese punto exacto, la conexión emocional con el objetivo se diluye, como si la posibilidad real de lograrlo activara una necesidad automática de poner distancia." },
  "C-E": { title: "El Freno desde Afuera", body: "Cuando el objetivo está al alcance, algo del entorno aparece para re-establecer la distancia con el nivel siguiente. El freno parece externo y circunstancial, pero su puntualidad revela una arquitectura interna que lo convoca." },
  "D-A": { title: "La Búsqueda sin Norte Justificada", body: "La falta de claridad sobre la dirección se sostiene mediante razones lógicas que justifican seguir explorando. El 'no saber todavía' funciona como un estado que posterga indefinidamente la decisión de comprometerse con algo concreto." },
  "D-B": { title: "La Niebla Ansiosa", body: "La indefinición coexiste con una tensión de fondo. No es tranquilidad ante la apertura — es ansiedad ante la decisión. La falta de dirección no es neutral: tiene un peso emocional que se intensifica justo cuando la claridad comienza a asomarse." },
  "D-C": { title: "La Indefinición Protegida", body: "Cada vez que una dirección comienza a perfilarse, algo ocurre que la desdibuja nuevamente. La indefinición no es un punto de partida transitorio — es un estado al que se regresa con regularidad, sostenido por acciones que disuelven lo que comenzaba a tomar forma." },
  "D-D": { title: "La Distancia de la Claridad", body: "Cuando una dirección comienza a volverse real y requiere compromiso, la conexión emocional con ella se retira. La indefinición es el espacio seguro; la claridad, una amenaza que activa distancia antes de que pueda arraigar." },
  "D-E": { title: "El Laberinto Renovado", body: "Justo cuando una dirección toma forma y podría consolidarse, una circunstancia externa la interrumpe o complica, renovando la necesidad de seguir explorando. El laberinto tiene salidas que se cierran antes de ser cruzadas." },
  "E-A": { title: "El Techo Argumentado", body: "Existe un nivel al que llegas con consistencia, y desde ahí, una razón lógica siempre aparece para explicar por qué el siguiente paso no es posible ahora. El techo no es circunstancial — está intelectualmente justificado y estructuralmente sostenido." },
  "E-B": { title: "El Techo de la Tensión", body: "Llegas a un nivel con regularidad, y en ese punto exacto, la ansiedad o tensión se intensifica de manera que frenar se vuelve la respuesta más razonable. El techo no es una pared externa — es el umbral donde el sistema interno activa la alarma." },
  "E-C": { title: "El Techo Saboteado", body: "Llegas al límite conocido y, en ese momento preciso, una acción inconsciente re-establece la distancia con el nivel siguiente. El techo se mantiene activo no desde afuera, sino desde adentro — con una precisión que pocas veces se reconoce." },
  "E-D": { title: "El Techo de la Desconexión", body: "Al alcanzar el nivel conocido, el interés o la motivación se diluyen de manera que continuar ya no parece necesario o deseable. La desconexión hace que el techo se sienta como un punto de llegada natural, no como el límite que realmente es." },
  "E-E": { title: "El Techo desde el Exterior", body: "Con una regularidad llamativa, justo cuando estás en el umbral del siguiente nivel, algo externo aparece para interrumpir el avance. El techo parece impuesto por las circunstancias, pero su puntualidad sistemática revela que tiene raíces más profundas." },
};

const SIMILAR: Record<string, PatternResult> = {
  "A-A": { title: "El Límite en la Intimidad", body: "La misma estructura que opera en tus relaciones —llegar hasta cierto nivel de cercanía y luego interrumpir— aparece también en el área de vida que señalaste. En ambos espacios, el patrón se activa justo antes del compromiso real y sostenido." },
  "A-B": { title: "El Inicio sin Completar", body: "En tus relaciones y en tus proyectos personales, la estructura es la misma: arranques genuinos que no llegan a consolidarse. El patrón no discrimina entre el vínculo emocional y la iniciativa personal." },
  "A-C": { title: "El Techo Emocional y Material", body: "Las relaciones y las finanzas comparten la misma arquitectura: hay un nivel de intimidad y un nivel económico al que llegas con regularidad y desde el cual algo te mantiene. El límite no es emocional ni económico — es estructural." },
  "A-D": { title: "Una Estructura que Lo Atraviesa Todo", body: "El patrón que identificaste en tus relaciones no es exclusivo de ellas — aparece en múltiples áreas de tu vida. Esto confirma que no se trata de circunstancias particulares: es la arquitectura desde la que operas, independientemente del contexto." },
  "A-E": { title: "Una Concentración Significativa", body: "La intensidad del patrón en las relaciones, sin que aparezca con la misma fuerza en otras áreas, es en sí misma información estructural importante. Hay algo específico en el dominio del vínculo que activa tu estructura de forma particular." },
  "B-A": { title: "El Mismo Techo Profesional y Vincular", body: "Lo que vives en tu carrera y en tus relaciones comparte una arquitectura idéntica: un límite no declarado sobre cuánto te permites recibir — ya sea reconocimiento, intimidad o éxito. El contexto cambia; la estructura, no." },
  "B-B": { title: "El Esfuerzo sin Cierre en Dos Dominios", body: "Lo que ocurre en tu carrera con los proyectos también ocurre en tus iniciativas personales: hay inversión real pero el ciclo no se cierra. Lo similar no está en el tema — está en el momento exacto donde algo interrumpe la llegada." },
  "B-C": { title: "El Mismo Límite en Carrera y Finanzas", body: "Carrera y finanzas operan bajo la misma lógica de techo: hay un nivel de reconocimiento profesional y un nivel económico que se repiten. Lo que logras y lo que ganas están limitados por la misma estructura interna." },
  "B-D": { title: "Una Sola Estructura, Múltiples Escenarios", body: "Lo que vives en tu carrera se replica en otras áreas de tu vida con llamativa consistencia. Eso descarta que el problema sea el trabajo, el dinero o las relaciones — y apunta a una estructura más profunda que los atraviesa a todos." },
  "B-E": { title: "El Foco en la Carrera", body: "El hecho de que el patrón se concentre especialmente en el área profesional indica que algo particular de ese dominio — el rendimiento, la visibilidad, el juicio externo — activa la estructura con especial intensidad." },
  "C-A": { title: "El Techo Económico y Vincular", body: "Las finanzas y las relaciones comparten la misma arquitectura: hay un nivel de abundancia y un nivel de intimidad al que llegas con regularidad y desde el cual algo te mantiene. El límite no es ni económico ni emocional — es estructural." },
  "C-B": { title: "El Patrón de lo Incompleto", body: "En finanzas y en proyectos personales, la estructura comparte la misma característica: avances que no se consolidan. El dinero y las metas personales parecen dominios distintos, pero obedecen al mismo límite interno." },
  "C-C": { title: "El Ciclo Financiero Consolidado", body: "Las finanzas son el espejo más claro de tu patrón: hay un nivel que se alcanza y un nivel del que no se sale. La claridad con la que lo reconoces en ambos registros sugiere que esta es la expresión más directa de tu arquitectura." },
  "C-D": { title: "El Patrón que No Es Financiero", body: "Aunque lo reconoces primero en las finanzas, el patrón está presente en múltiples áreas. Eso significa que trabajar solo la dimensión económica no resuelve la raíz — la raíz está en la estructura que las une a todas." },
  "C-E": { title: "El Dinero como Espejo Específico", body: "Que el patrón aparezca principalmente en el ámbito financiero revela que el dinero carga un peso simbólico particular en tu estructura. No es solo un tema económico — es el área donde tu arquitectura interna se vuelve más visible y medible." },
  "D-A": { title: "El Límite en lo Vital y lo Vincular", body: "La estructura que limita tu bienestar físico opera con la misma lógica en tus relaciones: hay un nivel de plenitud — física o emocional — que alcanzas y desde el cual algo activa la desconexión o el freno." },
  "D-B": { title: "La Energía que No Llega", body: "Tu bienestar físico y tus proyectos personales comparten el mismo patrón: inicios con energía que no llegan a su destino. Lo que falla no es la capacidad — es la estructura que sostiene el recorrido completo hasta el cierre." },
  "D-C": { title: "La Energía y el Dinero Limitados", body: "Tu bienestar físico y tu realidad financiera comparten el mismo patrón: hay techos en ambos. El cuerpo y las finanzas operan como espejos de la misma estructura que administra cuánto puedes sostener." },
  "D-D": { title: "El Cuerpo como Mapa General", body: "Tu bienestar físico era el punto de entrada, pero el patrón se extiende a múltiples áreas. El cuerpo raramente miente — y en este caso, estaba señalando una estructura que opera de forma transversal en tu vida entera." },
  "D-E": { title: "El Cuerpo como Territorio Propio", body: "La concentración del patrón en el bienestar físico indica que el cuerpo es el terreno donde tu estructura se expresa con más claridad. Lo que ocurre a nivel físico suele ser el eco de algo que opera en capas más profundas y menos visibles." },
  "E-A": { title: "La Misma Distancia Interior", body: "En tu mundo emocional y en tus relaciones, el patrón es idéntico: existe un umbral de bienestar o cercanía que, al ser alcanzado, activa un mecanismo de distancia. La paz y la intimidad reales se vuelven incómodas antes de consolidarse." },
  "E-B": { title: "El Proyecto Emocional sin Resolver", body: "Tu mundo emocional y tus proyectos personales obedecen a la misma lógica: se inician pero no se completan, se sienten pero no se integran. Lo similar está en la dificultad de sostener el proceso hasta el cierre real." },
  "E-C": { title: "El Límite en lo Emocional y lo Material", body: "Tu mundo emocional y tus finanzas comparten la misma frontera: hay un nivel de plenitud interna y un nivel económico que se repiten con consistencia. Ambos dominios obedecen al mismo límite sobre cuánto es posible tener o sostener." },
  "E-D": { title: "El Patrón Total", body: "Lo que comenzó como una observación de tu mundo emocional resulta ser una estructura que opera en la mayoría de las áreas de tu vida. Esta transversalidad es la señal más clara de que estamos ante un patrón estructural profundo, no ante síntomas aislados." },
  "E-E": { title: "El Territorio Interior", body: "Que el patrón se concentre especialmente en tu mundo emocional sugiere que es ahí donde la estructura opera con más fuerza. El bienestar emocional no es un síntoma aislado — es el sistema central desde el que se organiza todo lo demás en tu vida." },
};

const FUGA: Record<string, PatternResult> = {
  A: { title: "La Evasión del Propio Valor", body: "El área de mayor evasión estructural es el reconocimiento y la declaración de tu valor. Postergar lo que cobras, lo que pides o lo que declaras merecer no es un problema de estrategia ni de contexto — es una desconexión sistemática de lo que vales. Esta evasión tiene un costo directo y medible en tus resultados." },
  B: { title: "Las Conversaciones Aplazadas", body: "Hay conversaciones clave que sabes que deben ocurrir y que sistemáticamente postpones. No es cobardía — es un mecanismo de protección ante lo que podría cambiar si esas conversaciones se dan. Lo que evitas decir define tanto como lo que dices; a veces más." },
  C: { title: "La Decisión que Orbita sin Aterrizar", body: "Hay una decisión grande que orbita tu vida sin aterrizar. El costo percibido de tomarla — dejar algo conocido, seguro o familiar — aparece como mayor que el costo de no tomarla. Pero esa ecuación está distorsionada por la estructura, no por la realidad objetiva." },
  D: { title: "La Realidad Mantenida en la Periferia", body: "Hay información sobre tu situación real — económica, emocional o relacional — que mantienes en la periferia de tu consciencia. Mirarla de frente implicaría actuar, y actuar implicaría cambiar. La evasión de esa mirada mantiene todo exactamente en su lugar." },
  E: { title: "La Evasión del Compromiso Total", body: "Hay una resistencia específica al compromiso pleno con algo — sin redes de seguridad, sin garantías previas. Esa resistencia no es prudencia ni madurez: es una estructura que requiere condiciones perfectas para actuar, condiciones que nunca terminan de llegar." },
};

const FORTALEZA: Record<string, PatternResult> = {
  "A-A": { title: "La Inteligencia Estratégica al Servicio del Merecimiento", body: "Tu capacidad de análisis y pensamiento estratégico es un recurso real y probado. La transformación que deseas — sentirte genuinamente merecedor de resultados grandes — tiene en esa inteligencia su mejor aliada. El siguiente paso es dirigirla hacia adentro con la misma precisión que la diriges hacia afuera." },
  "A-B": { title: "La Estrategia contra el Sabotaje", body: "Tu pensamiento estratégico es genuino y valioso. La clave está en aplicarlo al patrón de sabotaje con la misma claridad que lo aplicas a los problemas externos. Puedes diseñar la salida — primero necesitas ver la estructura completa desde la que operas." },
  "A-C": { title: "La Mente Clara en Terreno Incierto", body: "Tu capacidad de análisis te permite operar con claridad en situaciones complejas. Esa misma claridad, dirigida hacia la estructura interna que genera la falta de confianza, puede transformar la confianza en un punto de partida en lugar de en un destino lejano." },
  "A-D": { title: "La Inteligencia que Puede Sostener", body: "Tu pensamiento estratégico ha sido el recurso que te ha permitido construir lo que tienes. Desarrollar la capacidad de sostener el éxito requiere dirigir esa misma inteligencia hacia los mecanismos que activan la entrega o el auto-destrucción en el momento del logro." },
  "A-E": { title: "La Claridad como Brújula hacia la Dirección", body: "Tu capacidad analítica es el recurso que puede transformar la nebulosa de la indefinición en una dirección real. La claridad no llega sola — se construye con las mismas herramientas que ya tienes, aplicadas con consistencia en la dirección correcta." },
  "B-A": { title: "La Resistencia que Merece su Recompensa", body: "Tu capacidad de mantenerte en pie cuando todo se complica es excepcional. Esa misma resistencia, sostenida desde un sentido genuino de merecimiento, puede llevar tus resultados a un nivel que aún no has experimentado. Tienes la durabilidad — falta integrar el derecho." },
  "B-B": { title: "La Resistencia al Servicio del Cambio Interior", body: "Has demostrado que puedes sostenerte en circunstancias difíciles. Esa capacidad de permanecer es exactamente lo que se necesita para atravesar el umbral del patrón de sabotaje — que también requiere mantenerse firme, pero hacia adentro." },
  "B-C": { title: "La Fortaleza de la Permanencia", body: "Tu resistencia interna es el recurso que puede hacer posible una confianza real y duradera. Confiar no requiere la ausencia de miedo — requiere la capacidad de mantenerse en movimiento a pesar de él. Eso ya lo tienes demostrado." },
  "B-D": { title: "La Durabilidad como Base del Sostenimiento", body: "Has podido sostenerte en situaciones donde otros no habrían podido. Esa misma capacidad de resistencia es la base sobre la cual se puede construir la habilidad de sostener el éxito — que también requiere permanecer, pero en la abundancia y no solo en la adversidad." },
  "B-E": { title: "La Resistencia en la Incertidumbre", body: "Tu capacidad de persistir en lo difícil es un recurso real y verificado. La claridad y el coraje que deseas no vienen de condiciones perfectas — vienen de la capacidad de avanzar en la incertidumbre. Eso ya lo has demostrado que puedes hacer." },
  "C-A": { title: "La Red como Espejo del Merecimiento", body: "Tu habilidad para conectar con personas clave es una expresión de tu valor que el entorno ya reconoce con claridad. La distancia entre ese reconocimiento externo y lo que sientes internamente sobre tu propio merecimiento es el mapa exacto de la transformación posible." },
  "C-B": { title: "El Vínculo como Recurso del Cambio", body: "Tu capacidad de generar conexiones significativas es el recurso que puede sostener el cambio de patrón. La transformación del sabotaje no ocurre en soledad — ocurre en contacto con otros que ven en ti lo que tú aún no ves completamente." },
  "C-C": { title: "La Confianza Relacional hacia la Interna", body: "Sabes cómo generar confianza en otros con naturalidad. El siguiente paso es dirigir esa misma capacidad hacia ti mismo — construir la confianza interna con la misma facilidad con que generas conexión genuina con el entorno." },
  "C-D": { title: "Las Personas como Ancla del Sostenimiento", body: "Tu habilidad relacional es el recurso que puede ayudarte a sostener lo que logres. Las personas clave con quienes conectas son también quienes pueden sostenerte en los momentos donde el impulso interno de deshacer lo construido se activa." },
  "C-E": { title: "La Red como Espejo de la Dirección", body: "Las personas clave con quienes conectas suelen tener claridad sobre lo que ven en ti — a veces más de lo que tú mismo ves. Esa perspectiva externa puede ser el recurso que te ayude a encontrar y comprometerte con la dirección que deseas desde adentro." },
  "D-A": { title: "La Visión que Merece Ser Habitada", body: "Tienes la capacidad de saber hacia dónde vas incluso cuando el camino es turbulento. Esa visión es real y merece ser habitada completamente — no desde la orilla. El trabajo estructural es el puente entre saber hacia dónde ir y sentirte merecedor de llegar." },
  "D-B": { title: "La Visión más Allá del Sabotaje", body: "Tu capacidad de mantener la orientación en la incertidumbre es el recurso que puede mantenerte en curso cuando el patrón de sabotaje se activa. La visión no elimina el patrón — pero puede ser más fuerte que él cuando está completamente integrada." },
  "D-C": { title: "La Dirección como Forma de Confianza", body: "Saber hacia dónde vas es una forma de confianza que ya tienes integrada. El siguiente paso es trasladar esa confianza orientadora al plano de la acción — confiar no solo en el destino que ves, sino en tu capacidad real de llegar a él." },
  "D-D": { title: "La Visión que Puede Sostener", body: "Tu claridad de dirección es el recurso que puede hacer posible la capacidad de sostener el éxito. Saber a dónde vas te permite reconocer cuándo has llegado — y resistir el impulso de deshacer lo construido en el momento del logro." },
  "D-E": { title: "La Visión como Puente al Compromiso", body: "Tu capacidad de orientarte en la incertidumbre es exactamente el recurso que necesitas para comprometerte plenamente con algo. No necesitas garantías cuando tienes visión real. Eso ya lo tienes — falta integrar la confianza para actuar desde ella sin frenos." },
  "E-A": { title: "La Intuición del Merecimiento", body: "Tu sensibilidad especial para leer situaciones y personas es una forma de inteligencia que pocas veces es reconocida — incluyendo por ti mismo. Esa misma sensibilidad, dirigida hacia tu propio valor, puede alinear lo que mereces con lo que te permites tener." },
  "E-B": { title: "La Intuición como Detector del Patrón", body: "Tu capacidad de leer situaciones y personas también te permite, cuando la diriges hacia adentro, detectar cuándo el patrón de sabotaje está a punto de activarse. Esa consciencia temprana es el primer paso real para interrumpirlo antes de que actúe." },
  "E-C": { title: "La Sensibilidad como Brújula de la Confianza", body: "Tu intuición es el recurso que puede transformar la confianza desde adentro. Aprender a confiar en lo que sientes antes de que la mente lo racionalice — esa es la confianza más real y la más difícil de sabotear con argumentos." },
  "E-D": { title: "La Intuición como Guardiana del Logro", body: "Tu sensibilidad para leer lo que ocurre en situaciones y personas puede ser tu mejor aliada para sostener el éxito. Percibir cuándo el impulso de auto-sabotaje se activa — antes de que se traduzca en acción — es la clave para sostener lo que construyes." },
  "E-E": { title: "La Intuición hacia la Claridad", body: "Tu sensibilidad es el recurso más subestimado que tienes. En un estado de mayor claridad estructural interna, esa intuición se vuelve más precisa y accesible — y puede señalarte la dirección con mayor contundencia de lo que cualquier análisis externo podría." },
};

const CTA_BODIES: Record<string, string> = {
  "A-A": "Tu estructura relacional está gobernada por un límite sobre el merecimiento cuya transformación es completamente posible y mapeada. La Lectura Completa revela la arquitectura exacta y el proceso preciso para habitarla desde un lugar radicalmente distinto.",
  "A-B": "Lo que cambiaría en tus relaciones si el nivel siguiente llegara de verdad es exactamente lo que la Lectura Completa explora — porque ese miedo tiene una forma precisa que puede ser identificada, comprendida y trabajada.",
  "A-C": "La creencia de que lograr más en tus relaciones trae consecuencias no deseadas opera de forma sistemática en tu estructura. La Lectura Completa mapea el origen de esa creencia y el camino concreto para desactivarla.",
  "A-D": "Tu identidad relacional está entretejida con el esfuerzo de una manera que la Lectura Completa puede destejer con precisión — para que puedas operar desde el vínculo pleno en lugar de desde la lucha constante.",
  "A-E": "Hay algo que interfiere en tus relaciones cuya forma exacta esta lectura básica no puede capturar. La Lectura Completa está diseñada para encontrarlo, mapearlo y ofrecer el camino de transformación.",
  "B-A": "Tu carrera está limitada no por capacidad, sino por una estructura de merecimiento que tiene raíces específicas y completamente mapeables. La Lectura Completa revela esas raíces y el proceso exacto para transformar ese límite de forma sostenida.",
  "B-B": "Lo que cambiaría en tu vida profesional si el éxito llegara de verdad es exactamente lo que la Lectura Completa explora — porque ese miedo tiene una forma precisa que puede ser identificada y trabajada con profundidad.",
  "B-C": "La creencia de que el éxito grande trae consecuencias negativas opera en tu carrera de forma sistemática y silenciosa. La Lectura Completa mapea el origen exacto de esa creencia y el camino concreto para desactivarla.",
  "B-D": "Tu identidad profesional está entretejida con el esfuerzo de una manera que la Lectura Completa puede destejer con precisión — para que puedas operar desde el logro natural en lugar de desde la lucha perpetua.",
  "B-E": "Hay algo que interfiere en tu desarrollo profesional que esta lectura básica apenas puede esbozar. La Lectura Completa está diseñada exactamente para encontrarlo, nombrarlo y trabajarlo en profundidad.",
  "C-A": "Tu realidad financiera está gobernada por una estructura de merecimiento cuya transformación es posible y tiene un proceso mapeado. La Lectura Completa revela ese proceso completo con la profundidad que este espacio no puede alcanzar.",
  "C-B": "El miedo a lo que cambiaría si tu situación financiera se transformara realmente es el núcleo que la Lectura Completa trabaja con profundidad y precisión. Ese miedo tiene una forma específica — y tiene una salida.",
  "C-C": "La creencia sobre el éxito y sus consecuencias es lo que mantiene tu techo financiero exactamente en su lugar. La Lectura Completa mapea esa creencia con una precisión que esta lectura básica no puede alcanzar.",
  "C-D": "La identidad construida alrededor de la lucha económica tiene una arquitectura específica y mapeada. La Lectura Completa la revela por completo y ofrece el proceso para habitarla desde un lugar radicalmente diferente.",
  "C-E": "Hay algo que mantiene tu realidad financiera en el nivel actual cuya forma exacta requiere una exploración más profunda. La Lectura Completa está diseñada para encontrarlo con precisión y trabajarlo.",
  "D-A": "Tu bienestar físico está conectado con una estructura de merecimiento que opera también en los niveles más profundos de tu vida. La Lectura Completa revela esa conexión y el camino concreto para transformarla.",
  "D-B": "El cuerpo raramente miente sobre lo que evitamos sentir o recibir. La Lectura Completa explora la conexión entre tu bienestar físico y lo que temes que cambiaría si te sintieras bien de manera real y sostenida.",
  "D-C": "La relación entre tu salud y tus creencias sobre el éxito es más directa de lo que parece. La Lectura Completa mapea esa relación con la profundidad y precisión que esta lectura básica no puede alcanzar.",
  "D-D": "El cuerpo que se identifica con el esfuerzo y el malestar tiene una historia estructural específica. La Lectura Completa revela esa historia con precisión y ofrece el proceso para escribir una radicalmente diferente.",
  "D-E": "Hay algo que tu cuerpo está señalando que esta lectura básica apenas puede esbozar. La Lectura Completa está diseñada para leer esa señal con profundidad y traducirla en un mapa de transformación real.",
  "E-A": "Tu mundo emocional está organizado desde un sentido de merecimiento que puede ser transformado de forma real y sostenida. La Lectura Completa revela la arquitectura completa de esa organización y el camino preciso para rehacerla.",
  "E-B": "Lo que sientes ante la posibilidad del bienestar emocional real tiene una forma precisa que la Lectura Completa puede mapear y trabajar con la profundidad que este espacio inicial no permite.",
  "E-C": "Las creencias sobre el éxito y sus consecuencias que operan en tu mundo emocional tienen raíces específicas. La Lectura Completa las revela con una profundidad que esta lectura básica no puede alcanzar.",
  "E-D": "La identidad emocional construida alrededor del esfuerzo y la lucha tiene una arquitectura que puede ser transformada con un proceso específico. La Lectura Completa ofrece ese mapa completo.",
  "E-E": "Hay algo que opera en tu mundo emocional cuya forma exacta requiere una exploración más profunda de lo que este espacio permite. La Lectura Completa está diseñada para encontrarlo y trabajarlo con precisión.",
};

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function lookup(map: Record<string, PatternResult>, key: string, fallbackKey: string): PatternResult {
  return map[key] || map[fallbackKey] || Object.values(map)[0];
}

function truncate(t: string, max = 19): string {
  return t.length > max ? t.slice(0, max - 1) + "\u2026" : t;
}

function buildDiagramSvg(areaLabel: string, patron: PatternResult, similar: PatternResult, fuga: PatternResult, fortaleza: PatternResult): string {
  const s = (t: string) => truncate(t);
  return `<svg viewBox="0 0 600 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="300" y1="0" x2="300" y2="260" stroke="#2a2a26" stroke-width="0.5" stroke-dasharray="4 4"/>
    <line x1="0" y1="130" x2="600" y2="130" stroke="#2a2a26" stroke-width="0.5" stroke-dasharray="4 4"/>
    <ellipse cx="300" cy="130" rx="240" ry="108" stroke="#2a2a26" stroke-width="1"/>
    <ellipse cx="300" cy="130" rx="155" ry="70" stroke="#2a2a26" stroke-width="0.5" stroke-dasharray="2 4"/>
    <circle cx="300" cy="130" r="30" fill="rgba(201,169,110,0.08)" stroke="#c9a96e" stroke-width="1"/>
    <circle cx="300" cy="130" r="14" fill="rgba(201,169,110,0.15)" stroke="#c9a96e" stroke-width="0.5"/>
    <circle cx="300" cy="130" r="4" fill="#c9a96e"/>
    <text x="300" y="136" text-anchor="middle" fill="#7a6340" font-family="monospace" font-size="7" letter-spacing="0.08em">${areaLabel.toUpperCase()}</text>
    <line x1="300" y1="130" x2="100" y2="38" stroke="#c9a96e" stroke-width="0.5" opacity="0.5"/>
    <line x1="300" y1="130" x2="500" y2="38" stroke="#c9a96e" stroke-width="0.5" opacity="0.5"/>
    <line x1="300" y1="130" x2="100" y2="222" stroke="#7a6340" stroke-width="0.5" opacity="0.5" stroke-dasharray="3 3"/>
    <line x1="300" y1="130" x2="500" y2="222" stroke="#c9a96e" stroke-width="0.5" opacity="0.5"/>
    <circle cx="100" cy="38" r="22" fill="rgba(201,169,110,0.1)" stroke="#c9a96e" stroke-width="1"/>
    <text x="100" y="42" text-anchor="middle" fill="#c9a96e" font-family="monospace" font-size="9">01</text>
    <text x="100" y="72" text-anchor="middle" fill="#7a7870" font-family="serif" font-size="10" font-style="italic">${s(patron.title)}</text>
    <circle cx="500" cy="38" r="22" fill="rgba(201,169,110,0.1)" stroke="#c9a96e" stroke-width="1"/>
    <text x="500" y="42" text-anchor="middle" fill="#c9a96e" font-family="monospace" font-size="9">02</text>
    <text x="500" y="72" text-anchor="middle" fill="#7a7870" font-family="serif" font-size="10" font-style="italic">${s(similar.title)}</text>
    <circle cx="100" cy="222" r="22" fill="rgba(122,99,64,0.08)" stroke="#7a6340" stroke-width="1" stroke-dasharray="3 3"/>
    <text x="100" y="226" text-anchor="middle" fill="#7a6340" font-family="monospace" font-size="9">03</text>
    <text x="100" y="254" text-anchor="middle" fill="#4a4840" font-family="serif" font-size="10" font-style="italic">${s(fuga.title)}</text>
    <circle cx="500" cy="222" r="22" fill="rgba(201,169,110,0.1)" stroke="#c9a96e" stroke-width="1"/>
    <text x="500" y="226" text-anchor="middle" fill="#c9a96e" font-family="monospace" font-size="9">04</text>
    <text x="500" y="254" text-anchor="middle" fill="#7a7870" font-family="serif" font-size="10" font-style="italic">${s(fortaleza.title)}</text>
    <circle cx="300" cy="130" r="30" fill="none" stroke="#c9a96e" stroke-width="0.5" opacity="0.6">
      <animate attributeName="r" values="30;52;30" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite"/>
    </circle>
  </svg>`;
}

// ═══════════════════════════════════════════════════════════
// COMPONENTE
// ═══════════════════════════════════════════════════════════
type Screen = "welcome" | "question" | "processing" | "capture" | "results";

const LecturaBasica = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [results, setResults] = useState<{
    patron: PatternResult; similar: PatternResult; fuga: PatternResult;
    fortaleza: PatternResult; ctaBody: string; areaLabel: string; firstName: string;
  } | null>(null);
  const [fadingOut, setFadingOut] = useState(false);

  const progress = screen === "welcome" ? 0 : screen === "question" ? ((currentQ + 1) / questions.length) * 100 : 100;
  const stepLabel = screen === "welcome" ? "00" : screen === "question" ? String(currentQ + 1).padStart(2, "0") : "08";

  const handlePick = useCallback((letter: string, qIndex: number, qId: string) => {
    setSelectedOption(letter);
    const newAnswers = { ...answers, [qId]: letter };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (qIndex < questions.length - 1) {
        setFadingOut(true);
        setTimeout(() => {
          setCurrentQ(qIndex + 1);
          setSelectedOption(null);
          setFadingOut(false);
        }, 300);
      } else {
        setScreen("processing");
        setTimeout(() => {
          const q1 = newAnswers.q1 || "B", q2 = newAnswers.q2 || "E", q3 = newAnswers.q3 || "C";
          const q4 = newAnswers.q4 || "C", q5 = newAnswers.q5 || "A", q6 = newAnswers.q6 || "B";
          const q7 = newAnswers.q7 || "A", q8 = newAnswers.q8 || "D";
          setResults({
            patron: lookup(PATRONEADO, `${q2}-${q4}`, "E-C"),
            similar: lookup(SIMILAR, `${q1}-${q3}`, "B-D"),
            fuga: FUGA[q7] || FUGA["A"],
            fortaleza: lookup(FORTALEZA, `${q6}-${q8}`, "B-D"),
            ctaBody: CTA_BODIES[`${q1}-${q5}`] || CTA_BODIES["B-A"],
            areaLabel: areaLabels[q1] || "vida",
            firstName: "",
          });
          setScreen("capture");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 2400);
      }
    }, 350);
  }, [answers]);

  const handleSubmitCapture = () => {
    const newErrors: { name?: boolean; email?: boolean } = {};
    if (!userName.trim()) newErrors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.trim())) newErrors.email = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const firstName = userName.trim().split(" ")[0];
    console.log("LEAD CAPTURADO:", JSON.stringify({ name: userName.trim(), email: userEmail.trim(), answers, timestamp: new Date().toISOString() }));

    if (results) {
      setResults({ ...results, firstName });
    }
    setScreen("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const q = questions[currentQ];

  return (
    <>
      <Helmet>
        <title>Lectura Estructural Básica — Sanark</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen" style={{ background: "#0a0a08", color: "#e8e4dc", fontFamily: "'Cormorant Garamond', serif" }}>
        {/* Ambient glow */}
        <div className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 -top-[200px] -right-[200px]" style={{ background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)", animation: "drift 8s ease-in-out infinite alternate" }} />

        <div className="relative z-10 max-w-[680px] mx-auto px-6 min-h-screen flex flex-col">
          {/* Header */}
          <div className="pt-12 pb-8 flex items-center justify-between border-b" style={{ borderColor: "#2a2a26" }}>
            <div>
              <Link to="/" className="block font-mono text-[13px] tracking-[0.3em] uppercase font-light" style={{ color: "#c9a96e" }}>Sanark</Link>
              <div className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: "#7a7870" }}>Decodificación Estructural de Vida</div>
            </div>
            <div className="font-mono text-[11px] tracking-[0.1em]" style={{ color: "#4a4840" }}>
              <span style={{ color: "#c9a96e" }}>{stepLabel}</span> / 08
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-px mt-6 overflow-visible" style={{ background: "#2a2a26" }}>
            <div className="h-px relative transition-all duration-700" style={{ background: "linear-gradient(90deg, #7a6340, #c9a96e)", width: `${progress}%` }}>
              <div className="absolute -right-1 -top-[3px] w-[7px] h-[7px] rounded-full" style={{ background: "#c9a96e", boxShadow: "0 0 12px #c9a96e" }} />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 py-16">
            {/* Welcome Screen */}
            {screen === "welcome" && (
              <div className="animate-fadeUp">
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: "#7a6340" }}>Lectura Estructural Básica</div>
                <h1 className="text-4xl md:text-[58px] font-light leading-[1.1] mb-2" style={{ color: "#e8e4dc" }}>
                  Tu estructura<br /><em className="italic" style={{ color: "#c9a96e" }}>invisible</em><br />al descubierto.
                </h1>
                <div className="w-12 h-px my-8" style={{ background: "#7a6340" }} />
                <p className="text-lg font-light leading-[1.8] max-w-[520px] mb-4" style={{ color: "#7a7870" }}>
                  Lo que estás a punto de experimentar no es un test de personalidad.<br /><br />
                  Es un proceso de <strong style={{ color: "#e8e4dc", fontWeight: 400 }}>detección estructural</strong> — un espejo que revela los patrones desde los cuales operas en tu vida, muchas veces sin saberlo.
                </p>
                <p className="text-lg font-light leading-[1.8] mb-10" style={{ color: "#7a7870" }}>Analizaremos cuatro dimensiones clave de tu arquitectura interna:</p>
                <div className="grid grid-cols-2 gap-3 mb-12">
                  {["Patroneado Repetitivo", "Lo Similar en lo Diferente", "La Fuga", "La Fortaleza"].map((name, i) => (
                    <div key={i} className="border relative pl-5 py-4 pr-5" style={{ borderColor: "#2a2a26" }}>
                      <div className="absolute left-0 top-0 w-0.5 h-full" style={{ background: "#7a6340" }} />
                      <div className="font-mono text-[10px] tracking-[0.2em] mb-1.5" style={{ color: "#7a6340" }}>0{i + 1}</div>
                      <div className="text-sm font-normal tracking-[0.05em]" style={{ color: "#e8e4dc" }}>{name}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => { setScreen("question"); setCurrentQ(0); }} className="group inline-flex items-center gap-3 border px-9 py-[18px] font-mono text-xs tracking-[0.25em] uppercase cursor-pointer transition-all duration-300 relative overflow-hidden" style={{ borderColor: "#c9a96e", color: "#c9a96e", background: "transparent" }} onMouseEnter={e => { e.currentTarget.style.background = "#c9a96e"; e.currentTarget.style.color = "#0a0a08"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c9a96e"; }}>
                  <span>Iniciar lectura</span><span className="text-base transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            )}

            {/* Question Screen */}
            {screen === "question" && q && (
              <div className={`transition-all duration-300 ${fadingOut ? "opacity-0 -translate-y-2" : "animate-fadeUp"}`} key={currentQ}>
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: "#7a6340" }}>{q.category}</div>
                <p className="text-xl md:text-[28px] font-light leading-[1.45] mb-10 max-w-[580px]" style={{ color: "#e8e4dc" }}>{q.text}</p>
                <div className="flex flex-col gap-2.5">
                  {q.options.map((opt, i) => (
                    <button key={opt.letter} onClick={() => handlePick(opt.letter, currentQ, q.id)} className="flex items-start gap-4 py-[18px] px-5 border text-left transition-all duration-200 w-full" style={{ borderColor: selectedOption === opt.letter ? "#c9a96e" : "#2a2a26", color: selectedOption === opt.letter ? "#e8e4dc" : "#7a7870", background: selectedOption === opt.letter ? "rgba(201,169,110,0.06)" : "transparent", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", lineHeight: 1.5, animationDelay: `${i * 0.07}s` }} onMouseEnter={e => { if (selectedOption !== opt.letter) { e.currentTarget.style.borderColor = "#7a6340"; e.currentTarget.style.color = "#e8e4dc"; }}} onMouseLeave={e => { if (selectedOption !== opt.letter) { e.currentTarget.style.borderColor = "#2a2a26"; e.currentTarget.style.color = "#7a7870"; }}}>
                      <span className="font-mono text-[11px] tracking-[0.1em] min-w-[20px] pt-0.5" style={{ color: selectedOption === opt.letter ? "#c9a96e" : "#7a6340" }}>{opt.letter}</span>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-7 font-mono text-[11px] leading-[1.6] tracking-[0.05em] italic" style={{ color: "#4a4840" }}>{q.note}</p>
              </div>
            )}

            {/* Processing Screen */}
            {screen === "processing" && (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeUp">
                <div className="w-20 h-20 border rounded-full mb-8 animate-spin" style={{ borderColor: "#2a2a26", borderTopColor: "#c9a96e" }} />
                <div className="font-mono text-[11px] tracking-[0.4em] uppercase animate-pulse" style={{ color: "#7a6340" }}>Procesando tu estructura</div>
              </div>
            )}

            {/* Lead Capture Screen */}
            {screen === "capture" && (
              <div className="animate-fadeUp">
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-7" style={{ color: "#7a6340" }}>Tu lectura está lista</div>
                <h2 className="text-3xl md:text-[42px] font-light leading-[1.2] mb-3">Hemos detectado<br />tu <em className="italic" style={{ color: "#c9a96e" }}>estructura.</em></h2>
                <div className="w-12 h-px my-7" style={{ background: "#7a6340" }} />
                <p className="text-[17px] font-light leading-[1.8] max-w-[500px] mb-10" style={{ color: "#7a7870" }}>
                  En un momento verás los 4 patrones que operan en tu vida.<br /><br />
                  Déjanos un nombre y email para enviarte también la lectura completa por escrito — y notificarte cuando haya una plaza disponible para la <strong style={{ color: "#e8e4dc", fontWeight: 400 }}>Lectura Estructural Completa</strong>.
                </p>

                {/* Preview items */}
                <div className="flex flex-col gap-px mb-10" style={{ background: "#2a2a26" }}>
                  {["Patroneado Repetitivo", "Lo Similar en lo Diferente", "La Fuga", "La Fortaleza"].map((name, i) => (
                    <div key={i} className="flex items-center gap-3.5 py-3.5 px-5" style={{ background: "#111110" }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#7a6340" }} />
                      <div className="text-[15px] font-light italic" style={{ color: "#7a7870" }}>
                        0{i + 1} · {name} — <span style={{ filter: "blur(4px)", userSelect: "none", opacity: 0.5 }}>{i === 0 ? "detectado en tu estructura" : i === 1 ? "patrón transversal identificado" : i === 2 ? "zona de evasión activa" : "recurso estructural clave"}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <div className="flex flex-col gap-3.5 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#7a6340" }}>Nombre</label>
                    <input type="text" value={userName} onChange={e => { setUserName(e.target.value); setErrors(prev => ({ ...prev, name: false })); }} placeholder="¿Cómo te llamas?" autoComplete="given-name" className="w-full py-4 px-5 text-[17px] outline-none transition-colors" style={{ background: "#111110", border: `1px solid ${errors.name ? "#8b4040" : "#2a2a26"}`, color: "#e8e4dc", fontFamily: "'Cormorant Garamond', serif" }} onFocus={e => (e.currentTarget.style.borderColor = "#7a6340")} onBlur={e => (e.currentTarget.style.borderColor = errors.name ? "#8b4040" : "#2a2a26")} />
                    {errors.name && <div className="font-mono text-[11px] tracking-[0.05em]" style={{ color: "#8b4040" }}>Por favor ingresa tu nombre.</div>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#7a6340" }}>Email</label>
                    <input type="email" value={userEmail} onChange={e => { setUserEmail(e.target.value); setErrors(prev => ({ ...prev, email: false })); }} placeholder="tu@email.com" autoComplete="email" className="w-full py-4 px-5 text-[17px] outline-none transition-colors" style={{ background: "#111110", border: `1px solid ${errors.email ? "#8b4040" : "#2a2a26"}`, color: "#e8e4dc", fontFamily: "'Cormorant Garamond', serif" }} onFocus={e => (e.currentTarget.style.borderColor = "#7a6340")} onBlur={e => (e.currentTarget.style.borderColor = errors.email ? "#8b4040" : "#2a2a26")} />
                    {errors.email && <div className="font-mono text-[11px] tracking-[0.05em]" style={{ color: "#8b4040" }}>Por favor ingresa un email válido.</div>}
                  </div>
                </div>
                <button onClick={handleSubmitCapture} className="group inline-flex items-center gap-3 border px-9 py-[18px] font-mono text-xs tracking-[0.25em] uppercase cursor-pointer transition-all duration-300" style={{ borderColor: "#c9a96e", color: "#c9a96e", background: "transparent" }} onMouseEnter={e => { e.currentTarget.style.background = "#c9a96e"; e.currentTarget.style.color = "#0a0a08"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c9a96e"; }}>
                  <span>Ver mi Lectura Estructural</span><span className="text-base transition-transform group-hover:translate-x-1">→</span>
                </button>
                <div className="font-mono text-[10px] tracking-[0.05em] leading-[1.6] mt-3" style={{ color: "#4a4840" }}>Tu información es privada. No compartimos datos con terceros.</div>
              </div>
            )}

            {/* Results Screen */}
            {screen === "results" && results && (
              <div className="animate-fadeUp">
                {/* Header */}
                <div className="text-center pb-12 mb-10 border-b" style={{ borderColor: "#2a2a26" }}>
                  <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: "#7a6340" }}>Resultado · Sanark</div>
                  <h2 className="text-3xl md:text-[44px] font-light leading-[1.2]">
                    {results.firstName ? <>La Lectura de <em className="italic" style={{ color: "#c9a96e" }}>{results.firstName}</em></> : <>Tu <em className="italic" style={{ color: "#c9a96e" }}>Lectura Estructural</em><br />Básica</>}
                  </h2>
                </div>

                {/* Diagram */}
                <div className="mb-10">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-center mb-5 uppercase" style={{ color: "#4a4840" }}>Mapa de estructura detectada</div>
                  <div className="w-full h-[260px]" dangerouslySetInnerHTML={{ __html: buildDiagramSvg(results.areaLabel, results.patron, results.similar, results.fuga, results.fortaleza) }} />
                </div>

                {/* Pattern cards */}
                <div className="flex flex-col gap-px mb-12" style={{ background: "#2a2a26" }}>
                  {[
                    { num: "01 · Patroneado Repetitivo", data: results.patron },
                    { num: "02 · Lo Similar en lo Diferente", data: results.similar },
                    { num: "03 · La Fuga", data: results.fuga },
                    { num: "04 · La Fortaleza", data: results.fortaleza },
                  ].map((item, i) => (
                    <div key={i} className="relative py-7 px-8 animate-fadeUp" style={{ background: "#111110", animationDelay: `${i * 0.15}s` }}>
                      <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "#7a6340" }} />
                      <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "#7a6340" }}>{item.num}</div>
                      <div className="text-xl font-normal mb-3 tracking-[0.02em]" style={{ color: "#c9a96e" }}>{item.data.title}</div>
                      <div className="text-base font-light leading-[1.75]" style={{ color: "#7a7870" }}>{item.data.body}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="border relative overflow-hidden p-12 animate-fadeUp" style={{ borderColor: "#2a2a26", animationDelay: "0.65s" }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(201,169,110,0.06) 0%, transparent 60%)" }} />
                  <div className="relative">
                    <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: "#7a6340" }}>El siguiente paso</div>
                    <h3 className="text-[28px] font-light leading-[1.3] mb-4" style={{ color: "#e8e4dc" }}>Esta lectura es solo<br />el umbral.</h3>
                    <p className="text-base font-light leading-[1.8] max-w-[480px] mb-8" style={{ color: "#7a7870" }}>{results.ctaBody}</p>
                    <Link to="/lectura-estructural" className="inline-flex items-center gap-3.5 px-10 py-5 font-mono text-xs tracking-[0.2em] uppercase font-normal no-underline transition-all duration-300" style={{ background: "#c9a96e", border: "1px solid #c9a96e", color: "#0a0a08" }} onMouseEnter={e => { e.currentTarget.style.background = "#e8c98a"; e.currentTarget.style.boxShadow = "0 0 40px rgba(201,169,110,0.2)"; }} onMouseLeave={e => { e.currentTarget.style.background = "#c9a96e"; e.currentTarget.style.boxShadow = "none"; }}>
                      <span>Accede a tu Lectura Completa</span><span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="py-8 border-t flex items-center justify-between" style={{ borderColor: "#2a2a26" }}>
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: "#4a4840" }}>Sanark © 2025</div>
            <div className="text-[13px] italic" style={{ color: "#4a4840" }}>Decodificación Estructural de Vida</div>
          </div>
        </div>

        <style>{`
          @keyframes drift { from { transform: translate(0,0); } to { transform: translate(-40px,40px); } }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fadeUp { animation: fadeUp 0.6s ease forwards; }
        `}</style>
      </div>
    </>
  );
};

export default LecturaBasica;
