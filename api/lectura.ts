import type { VercelRequest, VercelResponse } from "@vercel/node";

interface RespuestaItem {
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

const SYSTEM_PROMPT = `Eres el Director de Sanark. Tu trabajo es escribir la Lectura Estructural Básica de esta persona de una forma que le llegue de verdad — que sienta que alguien la vio, no que leyó un resumen genérico.

QUIÉN ES ESTA PERSONA: Puede tener mucho o poco recorrido interno. No importa. Lo que importa es que sus respuestas revelan algo real sobre cómo opera su vida — y tú tienes que nombrarlo de forma que lo reconozca, sea quien sea.

EL TONO QUE NECESITAS: Como si le hablaras a alguien cara a cara. Directo. Sin palabras rebuscadas. Sin jerga de psicología o coaching. Sin frases que suenen a libro de autoayuda. Como cuando alguien te dice algo que da en el clavo y te quedas sin palabras. Eso es lo que tiene que producir cada párrafo.

LONGITUD: Cada campo del JSON debe tener entre 5 y 7 frases. No resúmenes cortos. Textos con sustancia real que desarrollen la idea, la amplíen con ejemplos concretos de lo que sus respuestas revelan, y cierren con algo que quede resonando.

CÓMO ESCRIBIR CADA SECCIÓN:

INTRO — El primer golpe. Usa el nombre. Di algo que solo puede decirse a ESTA persona basándote en sus respuestas. No introducciones genéricas. Que la primera frase ya haga que levante la cabeza.

PATRONEADO — El ciclo que se repite. No lo describas desde fuera como si fuera teoría. Cuéntalo como si fueras la voz interna de esa persona describiendo su propio ciclo desde dentro. Usa sus respuestas concretas. Muestra el mismo ciclo en dos o tres áreas distintas de su vida. Cierra con algo que no pueda negar.

SIMILAR EN LO DIFERENTE — Lo que aparece igual en lugares distintos. Aquí el poder está en conectar respuestas de áreas diferentes y mostrar que la raíz es la misma. No es coincidencia, es estructura. Explícalo de forma que cualquiera lo entienda pero que quien tiene recorrido también lo sienta como un nivel más profundo.

FUGA — Lo que evita. Sé específico sobre QUÉ evita y CÓMO lo evita. No "hay una tendencia a la evasión". Di exactamente qué es lo que no está tocando, con qué excusas o mecanismos lo rodea, y qué le cuesta eso en su vida real. Que al leerlo piense "¿cómo sabe esto?".

FORTALEZA — No es un elogio. Es una capacidad real que emerge de sus respuestas. Descríbela con fuerza. Y luego di exactamente por qué esa fortaleza no ha operado a plena potencia todavía — porque eso es lo que más interesa a alguien que ya sabe que tiene capacidad pero siente que algo la frena.

RESP_TEXTO — Sobre cómo se posiciona ante su propia vida. Si hay trampas activadas, nómbralas con claridad y sin crueldad: "Sabes perfectamente cuál sería la respuesta madura. Y lo que revelan tus otras respuestas es que saberlo no es lo mismo que operar desde ahí todavía." Si no hay trampas, ve al fondo de lo que sus respuestas de responsabilidad muestran.

NARRATIVA — El cierre que no cierra. 3-4 frases que conecten todo lo que leyó. Que termine con una pregunta o una frase que le quede dando vueltas. Que quiera compartirlo. Que quiera hacer la lectura completa.

REGLAS DE ESCRITURA:
- Habla siempre de TÚ a TÚ. Nunca en tercera persona.
- Usa sus respuestas reales — cítalas o parafrásalas.
- Si hay respuesta abierta escrita a mano, úsala. Es lo más honesto que dijo.
- Si hay trampas activadas, úsalas como el dato más revelador.
- Conecta áreas distintas para mostrar el mismo patrón.
- Frases cortas cuando quieras impacto. Frases más largas cuando quieras desarrollar.
- Nunca suavices con "puede que", "quizás", "en algunas ocasiones".
- Nada de "tienes el potencial de", "en tu proceso de crecimiento", "es importante que sepas".
- No motives. No animes. No celebres. Lee. Nombra. Deja que eso haga el trabajo.

FORMATO — JSON puro sin markdown, sin texto fuera del JSON:
{
  "intro": "3-4 frases.",
  "patroneado": {
    "titulo": "5-7 palabras que nombren SU ciclo específico",
    "contenido": "5-7 frases."
  },
  "similar": {
    "titulo": "5-7 palabras que nombren lo que se repite con distinta forma",
    "contenido": "5-7 frases."
  },
  "fuga": {
    "titulo": "5-7 palabras que nombren exactamente lo que evita",
    "contenido": "5-7 frases."
  },
  "fortaleza": {
    "titulo": "5-7 palabras que nombren el recurso real",
    "contenido": "5-7 frases."
  },
  "nivel_responsabilidad": "Adulta|Adolescente Avanzada|Adolescente|Infantil",
  "nivel_num": 2,
  "resp_texto": "5-7 frases.",
  "resp_teaser": "2 frases que generen curiosidad genuina.",
  "narrativa": "3-4 frases."
}`;

function construirResumen(
  nombre: string,
  respuestas: RespuestaItem[]
): string {
  const trampas = respuestas.filter((r) => r.trampa).length;
  const abiertas = respuestas.filter((r) => r.tipo === "abierta");
  const areas = [...new Set(respuestas.map((r) => r.area).filter(Boolean))].join(
    " | "
  );
  let out = `DATOS CLAVE: ${trampas} trampas activadas, ${abiertas.length} respuestas abiertas escritas a mano.\n`;
  out += `ÁREAS CUBIERTAS: ${areas}\n\n`;
  respuestas.forEach((r, i) => {
    if (r.tipo === "abierta") {
      out += `[${i + 1}] ÁREA: ${r.area}\nPREGUNTA: "${r.preguntaTexto}"\nRESPUESTA LIBRE (prioridad máxima): "${r.texto}"\n\n`;
    } else {
      const ti = r.trampa
        ? `\n⚠ TRAMPA ACTIVADA — eligió la respuesta del autoconocimiento aprendido.\nNOTA: ${r.notaTrampa}`
        : "";
      out += `[${i + 1}] ÁREA: ${r.area}\nPREGUNTA: "${r.preguntaTexto}"\nELIGIÓ: "${r.txtElegido}"${ti}\nPatrón: ${r.patron} | Valor: ${r.val}\n\n`;
    }
  });
  return out;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const { nombre, respuestas } = req.body as {
    nombre: string;
    respuestas: RespuestaItem[];
  };

  if (!nombre || !respuestas?.length) {
    return res.status(400).json({ error: "Missing nombre or respuestas" });
  }

  const resumen = construirResumen(nombre, respuestas);
  const userPrompt = `Nombre: ${nombre}\n\nRespuestas completas:\n${resumen}\n\nGenera la Lectura Estructural Básica de ${nombre}. Recuerda: 5-7 frases por campo, lenguaje directo y accesible, cita sus respuestas reales, conecta áreas distintas.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: 3000,
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenAI error:", err);
      return res.status(502).json({ error: "AI service error", useFallback: true });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";
    const lectura = JSON.parse(text.replace(/```json|```/g, "").trim());
    return res.status(200).json(lectura);
  } catch (e) {
    console.error("API error:", e);
    return res.status(502).json({ error: "AI service error", useFallback: true });
  }
}
