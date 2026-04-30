import { useState, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  seleccionarPreguntas,
  generarLecturaLocal,
  type Question,
  type AnswerRecord,
} from "@/data/questionBank";

// ═══════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════
interface LecturaResult {
  intro: string;
  patroneado: { titulo: string; contenido: string };
  similar: { titulo: string; contenido: string };
  fuga: { titulo: string; contenido: string };
  fortaleza: { titulo: string; contenido: string };
  nivel_responsabilidad: string;
  nivel_num: number;
  resp_texto: string;
  resp_teaser: string;
  narrativa: string;
}

type Screen = "welcome" | "question" | "capture" | "processing" | "results";

const PROCESSING_PHASES = [
  "Leyendo patrones estructurales",
  "Detectando similitudes",
  "Identificando fugas y fortalezas",
  "Director Sanark validando lectura",
  "Generando mapa estructural",
];

// ═══════════════════════════════════════════════════════════
// COMPONENTE
// ═══════════════════════════════════════════════════════════
const LecturaBasica = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [preguntas, setPreguntas] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [respuestas, setRespuestas] = useState<AnswerRecord[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [openText, setOpenText] = useState("");
  const [openMode, setOpenMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [results, setResults] = useState<LecturaResult | null>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const [processingPhase, setProcessingPhase] = useState(0);

  const total = preguntas.length || 15;
  const progress = screen === "welcome" ? 0 : screen === "question" ? ((currentQ + 1) / total) * 100 : 100;
  const stepLabel = screen === "welcome" ? "00" : screen === "question" ? String(currentQ + 1).padStart(2, "0") : String(total);

  // Iniciar quiz
  const startQuiz = useCallback(() => {
    const qs = seleccionarPreguntas();
    setPreguntas(qs);
    setCurrentQ(0);
    setRespuestas([]);
    setSelectedOption(null);
    setOpenText("");
    setOpenMode(false);
    setScreen("question");
  }, []);

  // Seleccionar opción
  const handlePick = useCallback((idx: number) => {
    setSelectedOption(idx);
    setOpenMode(false);
    setOpenText("");
  }, []);

  // Toggle texto libre
  const toggleOpen = useCallback(() => {
    setOpenMode((prev) => {
      if (!prev) setSelectedOption(null);
      return !prev;
    });
  }, []);

  // Siguiente pregunta
  const handleNext = useCallback(() => {
    const q = preguntas[currentQ];
    if (!q) return;

    let record: AnswerRecord;
    if (openMode && openText.trim()) {
      record = {
        pregunta: currentQ, tipo: "abierta", texto: openText.trim(),
        patron: "abierta", val: "abierta", area: q.area, preguntaTexto: q.texto,
      };
    } else if (selectedOption !== null) {
      const op = q.opciones[selectedOption];
      record = {
        pregunta: currentQ, tipo: "opcion", opcion: selectedOption,
        patron: op.patron, val: op.val, trampa: op.trampa || false,
        area: q.area, txtElegido: op.txt, notaTrampa: op.nota, preguntaTexto: q.texto,
      };
    } else return;

    const newRespuestas = [...respuestas, record];
    setRespuestas(newRespuestas);

    if (currentQ >= preguntas.length - 1) {
      setScreen("capture");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setFadingOut(true);
      setTimeout(() => {
        setCurrentQ((prev) => prev + 1);
        setSelectedOption(null);
        setOpenText("");
        setOpenMode(false);
        setFadingOut(false);
      }, 300);
    }
  }, [preguntas, currentQ, respuestas, selectedOption, openMode, openText]);

  // Procesar lectura
  const handleSubmitCapture = useCallback(async () => {
    const newErrors: { name?: boolean; email?: boolean } = {};
    if (!userName.trim()) newErrors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.trim())) newErrors.email = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const firstName = userName.trim().split(" ")[0];
    console.log("LEAD:", JSON.stringify({ name: userName.trim(), email: userEmail.trim(), timestamp: new Date().toISOString() }));

    setScreen("processing");
    setProcessingPhase(0);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const response = await fetch("/api/lectura", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: firstName, respuestas }),
      });

      if (!response.ok) throw new Error("API error");
      const lectura: LecturaResult = await response.json();
      setTimeout(() => {
        setResults(lectura);
        setScreen("results");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 500);
    } catch {
      const lectura = generarLecturaLocal(firstName, respuestas);
      setTimeout(() => {
        setResults(lectura as LecturaResult);
        setScreen("results");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 500);
    }
  }, [userName, userEmail, respuestas]);

  // Animación de fases de procesamiento
  useEffect(() => {
    if (screen !== "processing") return;
    const interval = setInterval(() => {
      setProcessingPhase((prev) => (prev < PROCESSING_PHASES.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, [screen]);

  const q = preguntas[currentQ];
  const canProceed = selectedOption !== null || (openMode && openText.trim().length > 0);

  return (
    <>
      <Helmet>
        <title>Lectura Estructural Básica — Sanark</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-display">
        {/* Ambient glow */}
        <div className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 -top-[200px] -right-[200px] bg-[radial-gradient(circle,hsl(var(--gold)/0.06)_0%,transparent_70%)] animate-drift" />

        <div className="relative z-10 max-w-[720px] mx-auto px-6 min-h-screen flex flex-col">
          {/* Header */}
          <div className="pt-12 pb-8 flex items-center justify-between border-b border-border">
            <div>
              <Link to="/" className="block font-mono text-[13px] tracking-[0.3em] uppercase font-light text-gold">Sanark</Link>
              <div className="text-[10px] tracking-[0.2em] uppercase mt-1 text-muted-foreground">Decodificación Estructural de Vida</div>
            </div>
            <div className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
              <span className="text-gold">{stepLabel}</span> / {total}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-px mt-6 overflow-visible bg-border">
            <div className="h-px relative transition-all duration-700 gradient-progress-gold" style={{ width: `${progress}%` }}>
              <div className="absolute -right-1 -top-[3px] w-[7px] h-[7px] rounded-full bg-gold glow-gold-dot" />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 py-16">

            {/* ─── Welcome ─── */}
            {screen === "welcome" && (
              <div className="animate-fade-up">
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-8 text-gold-dark">Lectura Estructural Básica</div>
                <h1 className="text-4xl md:text-[58px] font-light leading-[1.1] mb-2 text-foreground">
                  Lo que dirige tu vida<br /><em className="italic text-gold">no es lo que crees</em><br />que es.
                </h1>
                <div className="w-12 h-px my-8 bg-gold-dark" />
                <p className="text-lg font-light leading-[1.8] max-w-[560px] mb-4 text-muted-foreground">
                  Lo que estás a punto de experimentar no es un test de personalidad.<br /><br />
                  Es un proceso de <strong className="text-foreground font-normal">detección estructural</strong> — un espejo que revela los patrones desde los cuales operas en tu vida, muchas veces sin saberlo.
                </p>
                <p className="text-lg font-light leading-[1.8] mb-10 text-muted-foreground">Analizaremos cuatro dimensiones clave de tu arquitectura interna:</p>
                <div className="grid grid-cols-2 gap-3 mb-12">
                  {["Patroneado Repetitivo", "Lo Similar en lo Diferente", "La Fuga", "La Fortaleza"].map((name, i) => (
                    <div key={i} className="border border-border relative pl-5 py-4 pr-5">
                      <div className="absolute left-0 top-0 w-0.5 h-full bg-gold-dark" />
                      <div className="font-mono text-[10px] tracking-[0.2em] mb-1.5 text-gold-dark">0{i + 1}</div>
                      <div className="text-sm font-normal tracking-[0.05em] text-foreground">{name}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={startQuiz} className="group inline-flex items-center gap-3 border border-gold text-gold bg-transparent px-9 py-[18px] font-mono text-xs tracking-[0.25em] uppercase cursor-pointer transition-all duration-300 relative overflow-hidden hover:bg-gold hover:text-background">
                    <span>Comenzar Lectura</span><span className="text-base transition-transform group-hover:translate-x-1">→</span>
                  </button>
                  <div className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/50">15 preguntas · 7 minutos · sin filtros</div>
                </div>
              </div>
            )}

            {/* ─── Question ─── */}
            {screen === "question" && q && (
              <div className={`transition-all duration-300 ${fadingOut ? "opacity-0 -translate-y-2" : "animate-fade-up"}`} key={currentQ}>
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5 text-gold-dark">{q.area}</div>
                <p className="text-xl md:text-[28px] font-light leading-[1.45] mb-3 max-w-[620px] text-foreground">{q.texto}</p>
                <p className="text-sm font-light italic mb-10 text-muted-foreground">{q.sub}</p>
                <div className="flex flex-col gap-2.5">
                  {q.opciones.map((opt, i) => {
                    const letter = ["A", "B", "C", "D"][i];
                    const isSelected = selectedOption === i && !openMode;
                    return (
                      <button key={i} onClick={() => handlePick(i)} className={`flex items-start gap-4 py-[18px] px-5 border text-left transition-all duration-200 w-full font-display text-base leading-normal ${isSelected ? "border-gold text-foreground bg-gold/[0.06]" : "border-border text-muted-foreground hover:border-gold-dark hover:text-foreground"}`}>
                        <span className={`font-mono text-[11px] tracking-[0.1em] min-w-[20px] pt-0.5 ${isSelected ? "text-gold" : "text-gold-dark"}`}>{letter}</span>
                        <span>{opt.txt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Texto libre */}
                <button onClick={toggleOpen} className={`mt-4 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${openMode ? "text-gold" : "text-muted-foreground/60 hover:text-muted-foreground"}`}>
                  {openMode ? "← Volver a opciones" : "Ninguna me representa — escribir mi respuesta"}
                </button>
                {openMode && (
                  <div className="mt-3 animate-fade-up">
                    <textarea
                      value={openText}
                      onChange={(e) => setOpenText(e.target.value)}
                      placeholder="Escribe tu respuesta con tus propias palabras..."
                      className="w-full py-4 px-5 text-base outline-none transition-colors bg-card text-foreground font-display border border-border focus:border-gold-dark resize-none min-h-[120px]"
                    />
                  </div>
                )}

                {/* Botón siguiente */}
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`mt-8 inline-flex items-center gap-3 border px-9 py-[18px] font-mono text-xs tracking-[0.25em] uppercase transition-all duration-300 ${canProceed ? "border-gold text-gold hover:bg-gold hover:text-background cursor-pointer" : "border-border text-muted-foreground/30 cursor-not-allowed"}`}
                >
                  <span>Siguiente</span><span className="text-base">→</span>
                </button>
              </div>
            )}

            {/* ─── Capture (antes de processing) ─── */}
            {screen === "capture" && (
              <div className="animate-fade-up">
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-7 text-gold-dark">Tu lectura está lista</div>
                <h2 className="text-3xl md:text-[42px] font-light leading-[1.2] mb-3 text-foreground">Hemos detectado<br />tu <em className="italic text-gold">estructura.</em></h2>
                <div className="w-12 h-px my-7 bg-gold-dark" />
                <p className="text-[17px] font-light leading-[1.8] max-w-[500px] mb-10 text-muted-foreground">
                  En un momento verás los patrones que operan en tu vida.<br /><br />
                  Déjanos tu nombre y email para generar tu lectura personalizada — y notificarte cuando haya una plaza disponible para la <strong className="text-foreground font-normal">Lectura Estructural Completa</strong>.
                </p>

                {/* Preview items */}
                <div className="flex flex-col gap-px mb-10 bg-border">
                  {["Patroneado Repetitivo", "Lo Similar en lo Diferente", "La Fuga", "La Fortaleza"].map((name, i) => (
                    <div key={i} className="flex items-center gap-3.5 py-3.5 px-5 bg-card">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gold-dark" />
                      <div className="text-[15px] font-light italic text-muted-foreground">
                        0{i + 1} · {name} — <span className="blur-[4px] select-none opacity-50">{i === 0 ? "detectado en tu estructura" : i === 1 ? "patrón transversal identificado" : i === 2 ? "zona de evasión activa" : "recurso estructural clave"}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <div className="flex flex-col gap-3.5 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold-dark">Nombre</label>
                    <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value); setErrors((prev) => ({ ...prev, name: false })); }} placeholder="¿Cómo te llamas?" autoComplete="given-name" className={`w-full py-4 px-5 text-[17px] outline-none transition-colors bg-card text-foreground font-display border ${errors.name ? "border-destructive" : "border-border"} focus:border-gold-dark`} />
                    {errors.name && <div className="font-mono text-[11px] tracking-[0.05em] text-destructive">Por favor ingresa tu nombre.</div>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold-dark">Email</label>
                    <input type="email" value={userEmail} onChange={(e) => { setUserEmail(e.target.value); setErrors((prev) => ({ ...prev, email: false })); }} placeholder="tu@email.com" autoComplete="email" className={`w-full py-4 px-5 text-[17px] outline-none transition-colors bg-card text-foreground font-display border ${errors.email ? "border-destructive" : "border-border"} focus:border-gold-dark`} />
                    {errors.email && <div className="font-mono text-[11px] tracking-[0.05em] text-destructive">Por favor ingresa un email válido.</div>}
                  </div>
                </div>
                <button onClick={handleSubmitCapture} className="group inline-flex items-center gap-3 border border-gold text-gold bg-transparent px-9 py-[18px] font-mono text-xs tracking-[0.25em] uppercase cursor-pointer transition-all duration-300 hover:bg-gold hover:text-background">
                  <span>Generar mi Lectura Estructural</span><span className="text-base transition-transform group-hover:translate-x-1">→</span>
                </button>
                <div className="font-mono text-[10px] tracking-[0.05em] leading-[1.6] mt-3 text-muted-foreground/70">Tu información es privada. No compartimos datos con terceros.</div>
              </div>
            )}

            {/* ─── Processing ─── */}
            {screen === "processing" && (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-up">
                {/* Anillos concéntricos */}
                <div className="relative w-28 h-28 mb-10">
                  <div className="absolute inset-0 border border-border rounded-full animate-spin" style={{ animationDuration: "8s" }} />
                  <div className="absolute inset-3 border border-gold/20 rounded-full animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }} />
                  <div className="absolute inset-6 border border-gold/40 rounded-full animate-spin" style={{ animationDuration: "4s" }} />
                  <div className="absolute inset-[36px] border border-gold rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>
                </div>
                {/* Fases */}
                <div className="flex flex-col gap-2">
                  {PROCESSING_PHASES.map((phase, i) => (
                    <div key={i} className={`font-mono text-[11px] tracking-[0.15em] transition-all duration-500 ${i === processingPhase ? "text-gold opacity-100" : i < processingPhase ? "text-muted-foreground/40 opacity-60" : "text-muted-foreground/20 opacity-0"}`}>
                      {phase}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Results ─── */}
            {screen === "results" && results && (
              <div className="animate-fade-up">
                {/* Header */}
                <div className="text-center pb-12 mb-10 border-b border-border">
                  <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5 text-gold-dark">Resultado · Sanark</div>
                  <h2 className="text-3xl md:text-[44px] font-light leading-[1.2] text-foreground">
                    {userName.trim().split(" ")[0]},<br /><em className="italic text-gold">hemos leído tu arquitectura</em>
                  </h2>
                </div>

                {/* Intro */}
                <div className="mb-10">
                  <p className="text-lg font-light leading-[1.8] text-muted-foreground">{results.intro}</p>
                </div>

                {/* Pattern cards */}
                <div className="flex flex-col gap-px mb-12 bg-border">
                  {[
                    { num: "01", label: "Patroneado Repetitivo", data: results.patroneado },
                    { num: "02", label: "Lo Similar en lo Diferente", data: results.similar },
                    { num: "03", label: "La Fuga", data: results.fuga },
                    { num: "04", label: "La Fortaleza", data: results.fortaleza },
                  ].map((item, i) => (
                    <div key={i} className="relative py-7 px-8 animate-fade-up bg-card" style={{ animationDelay: `${i * 0.15}s` }}>
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold-dark" />
                      <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2 text-gold-dark">{item.num} · {item.label}</div>
                      <div className="text-xl font-normal mb-3 tracking-[0.02em] text-gold">{item.data.titulo}</div>
                      <div className="text-base font-light leading-[1.75] text-muted-foreground">{item.data.contenido}</div>
                    </div>
                  ))}
                </div>

                {/* Nivel de Responsabilidad */}
                <div className="mb-12 p-8 border border-border bg-card">
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4 text-gold-dark">Nivel de Responsabilidad Operativa</div>
                  <div className="text-xl font-light mb-4 text-foreground">
                    Responsabilidad <em className="italic text-gold">{results.nivel_responsabilidad}</em>
                  </div>
                  {/* Meter */}
                  <div className="flex gap-1.5 mb-6">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className={`h-1.5 flex-1 transition-colors ${n <= results.nivel_num ? "bg-gold" : "bg-border"}`} />
                    ))}
                  </div>
                  <p className="text-base font-light leading-[1.75] text-muted-foreground">{results.resp_texto}</p>
                  {results.resp_teaser && (
                    <p className="mt-4 text-sm font-light italic text-gold-dark leading-[1.7]">{results.resp_teaser}</p>
                  )}
                </div>

                {/* Narrativa */}
                <div className="mb-12 py-8 border-t border-b border-border">
                  <p className="text-lg font-light leading-[1.8] text-foreground/90 italic">{results.narrativa}</p>
                </div>

                {/* CTA */}
                <div className="border border-border relative overflow-hidden p-12 animate-fade-up" style={{ animationDelay: "0.65s" }}>
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.06)_0%,transparent_60%)]" />
                  <div className="relative">
                    <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5 text-gold-dark">El siguiente paso</div>
                    <h3 className="text-[28px] font-light leading-[1.3] mb-4 text-foreground">¿Listo para ver<br /><em className="italic text-gold">la estructura completa?</em></h3>
                    <p className="text-base font-light leading-[1.8] max-w-[480px] mb-8 text-muted-foreground">
                      Esta lectura es una primera capa. Lo que opera debajo — los mecanismos exactos, su origen y el camino para construir desde tu propia arquitectura — eso es la Lectura Estructural Completa.
                    </p>
                    <Link to="/lectura-estructural" className="inline-flex items-center gap-3.5 px-8 md:px-10 py-4 md:py-5 font-mono text-xs tracking-[0.2em] uppercase font-normal no-underline transition-all duration-300 bg-gold border border-gold text-background hover:bg-gold-light hover:shadow-[0_0_40px_hsl(var(--gold)/0.2)]">
                      <span>Acceder a Lectura Completa</span><span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="py-8 border-t border-border flex items-center justify-between">
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground/70">Sanark © 2026</div>
            <div className="text-[13px] italic text-muted-foreground/70">Decodificación Estructural de Vida</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LecturaBasica;
