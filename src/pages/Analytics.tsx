import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { clearEvents, getEvents, getStats, type CtaStats } from "@/lib/analytics";
import { Trash2, RefreshCw, BarChart3 } from "lucide-react";

const formatPct = (n: number) => `${(n * 100).toFixed(1)}%`;

const Analytics = () => {
  const [stats, setStats] = useState(() => getStats());
  const [count, setCount] = useState(() => getEvents().length);

  const refresh = () => {
    setStats(getStats());
    setCount(getEvents().length);
  };

  useEffect(() => {
    const id = setInterval(refresh, 3000);
    return () => clearInterval(id);
  }, []);

  const handleClear = () => {
    if (confirm("¿Borrar todos los eventos guardados localmente?")) {
      clearEvents();
      refresh();
    }
  };

  const sorted: CtaStats[] = [...stats.byCta].sort(
    (a, b) => b.successes - a.successes || b.clicks - a.clicks
  );

  return (
    <Layout>
      <section className="py-32 md:py-40 container mx-auto px-6 max-w-6xl">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="text-gold" size={28} strokeWidth={1.5} />
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold">Panel interno</p>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-light mb-3">
          Conversiones por <span className="gradient-text-gold">CTA</span>
        </h1>
        <p className="font-body text-foreground/60 mb-10 max-w-2xl">
          Eventos guardados en este navegador ({count} totales). Si conectas GA4 o Plausible al
          sitio, los mismos eventos se envían también allí automáticamente.
        </p>

        {/* Totals */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {[
            { label: "Clics", value: stats.totals.clicks },
            { label: "Aperturas", value: stats.totals.opens },
            { label: "Envíos", value: stats.totals.submits },
            { label: "Éxitos", value: stats.totals.successes },
            { label: "Errores", value: stats.totals.errors },
          ].map((t) => (
            <div
              key={t.label}
              className="p-5 bg-card/60 backdrop-blur-sm border border-border/40"
            >
              <p className="font-body text-xs tracking-wider uppercase text-foreground/50 mb-2">
                {t.label}
              </p>
              <p className="font-display text-3xl text-gold">{t.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border/50 hover:border-gold/40 transition-colors"
          >
            <RefreshCw size={14} /> Refrescar
          </button>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border/50 hover:border-destructive/60 hover:text-destructive transition-colors"
          >
            <Trash2 size={14} /> Borrar eventos
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-border/40 bg-card/40 backdrop-blur-sm">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30">
              <tr className="text-left font-body text-xs tracking-wider uppercase text-foreground/60">
                <th className="px-4 py-3">CTA</th>
                <th className="px-4 py-3">Ubicación</th>
                <th className="px-4 py-3 text-right">Clics</th>
                <th className="px-4 py-3 text-right">Envíos</th>
                <th className="px-4 py-3 text-right">Éxitos</th>
                <th className="px-4 py-3 text-right">Errores</th>
                <th className="px-4 py-3 text-right">Conversión</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center font-body text-foreground/50"
                  >
                    Aún no hay datos. Interactúa con los CTAs del sitio para empezar a medir.
                  </td>
                </tr>
              )}
              {sorted.map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-border/30 hover:bg-secondary/20 transition-colors"
                >
                  <td className="px-4 py-3 font-display">{row.cta}</td>
                  <td className="px-4 py-3 font-body text-foreground/60">{row.location}</td>
                  <td className="px-4 py-3 text-right">{row.clicks}</td>
                  <td className="px-4 py-3 text-right">{row.submits}</td>
                  <td className="px-4 py-3 text-right text-gold font-medium">{row.successes}</td>
                  <td className="px-4 py-3 text-right text-foreground/60">{row.errors}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatPct(row.conversionRate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-body text-xs text-foreground/40 mt-6">
          Nota: estos eventos viven en el navegador (localStorage). Para tracking persistente y
          multi-usuario, conecta GA4 o Plausible — los mismos eventos se reenvían automáticamente.
        </p>
      </section>
    </Layout>
  );
};

export default Analytics;
