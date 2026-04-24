import { PlayCircle } from "lucide-react";
import FadeIn from "./FadeIn";

interface VideoExplainerProps {
  /** URL del video (mp4, YouTube embed, Vimeo embed). Reemplazar cuando esté disponible. */
  videoUrl?: string;
  /** Poster opcional mientras no haya video */
  poster?: string;
}

const VideoExplainer = ({ videoUrl, poster }: VideoExplainerProps) => {
  const isEmbed = videoUrl?.includes("youtube") || videoUrl?.includes("vimeo");

  return (
    <section className="py-32 md:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.05)_0%,transparent_60%)]" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <FadeIn>
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold text-center mb-6">
            En 90 segundos
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-6 leading-tight">
            Mira lo que <span className="gradient-text-gold">nadie te ha mostrado</span>
          </h2>
          <p className="font-body text-base md:text-lg text-foreground/65 text-center mb-14 max-w-2xl mx-auto leading-relaxed">
            Un ejemplo real de cómo opera una estructura heredada — y qué cambia cuando la ves por primera vez.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative aspect-video bg-card/80 backdrop-blur-sm border border-gold/20 overflow-hidden group">
            {videoUrl ? (
              isEmbed ? (
                <iframe
                  src={videoUrl}
                  title="Lectura Estructural — Explicación"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={videoUrl}
                  poster={poster}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 bg-gradient-to-br from-background via-card to-background">
                <PlayCircle size={64} className="text-gold/60 mb-6" strokeWidth={1} />
                <p className="font-display text-xl md:text-2xl text-foreground/80 font-light mb-3">
                  Video en preparación
                </p>
                <p className="font-body text-sm text-foreground/50 max-w-md">
                  Aquí irá el video de 60–90 segundos donde explico, con un ejemplo concreto, qué es una Lectura Estructural.
                </p>
              </div>
            )}
            {/* Decorative frame */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-l border-t border-gold/40 pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r border-b border-gold/40 pointer-events-none" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default VideoExplainer;
