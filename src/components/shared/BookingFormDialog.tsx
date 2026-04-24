import { useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  trackBookingError,
  trackBookingOpen,
  trackBookingSubmit,
  trackBookingSuccess,
  trackCtaClick,
} from "@/lib/analytics";

interface BookingFormDialogProps {
  trigger: ReactNode;
  /** Short label of the CTA that opened the dialog (e.g. "Quiero ver mi estructura"). */
  cta?: string;
  /** Section/page where the CTA lives (e.g. "home_hero"). */
  location?: string;
}

const BookingFormDialog = ({ trigger, cta = "(unknown)", location = "(unknown)" }: BookingFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });

  const handleOpenChange = (next: boolean) => {
    if (next && !open) {
      trackCtaClick(cta, location);
      trackBookingOpen(cta, location);
    }
    setOpen(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim()) {
      toast({ title: "Faltan datos", description: "Nombre y email son obligatorios.", variant: "destructive" });
      return;
    }
    setLoading(true);
    trackBookingSubmit(cta, location);
    try {
      const { error } = await supabase.functions.invoke("send-booking-emails", { body: form });
      if (error) throw error;
      trackBookingSuccess(cta, location);
      setDone(true);
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          setDone(false);
          setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
        }, 400);
      }, 2400);
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "unknown";
      trackBookingError(cta, location, message);
      toast({
        title: "No se pudo enviar",
        description: "Inténtalo de nuevo o escríbenos a sanark.studio@gmail.com",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-card/95 backdrop-blur-xl border-gold/30 max-w-lg">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" strokeWidth={1.5} />
              <h3 className="font-display text-2xl text-foreground mb-3">Solicitud recibida</h3>
              <p className="font-body text-foreground/70 max-w-xs mx-auto leading-relaxed">
                En unos minutos recibirás en tu correo el enlace de pago para confirmar tu sesión.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogHeader>
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-2">Lectura Estructural</p>
                <DialogTitle className="font-display text-2xl md:text-3xl font-light text-foreground">
                  Reserva tu sesión
                </DialogTitle>
                <DialogDescription className="font-body text-foreground/60 text-sm">
                  Completa tus datos. Te enviaré por correo el enlace de pago para confirmar la sesión.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-foreground/80 text-xs tracking-wider uppercase">Nombre *</Label>
                  <Input
                    id="nombre"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    required
                    maxLength={100}
                    className="bg-background/50 border-border/50 focus-visible:ring-gold/40 focus-visible:border-gold/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/80 text-xs tracking-wider uppercase">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    maxLength={200}
                    className="bg-background/50 border-border/50 focus-visible:ring-gold/40 focus-visible:border-gold/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-foreground/80 text-xs tracking-wider uppercase">Teléfono (opcional)</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    maxLength={40}
                    className="bg-background/50 border-border/50 focus-visible:ring-gold/40 focus-visible:border-gold/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensaje" className="text-foreground/80 text-xs tracking-wider uppercase">Mensaje (opcional)</Label>
                  <Textarea
                    id="mensaje"
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    maxLength={2000}
                    rows={3}
                    placeholder="Cuéntame brevemente qué te trae aquí..."
                    className="bg-background/50 border-border/50 focus-visible:ring-gold/40 focus-visible:border-gold/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full mt-2 inline-flex items-center justify-center gap-3 font-body text-sm tracking-wider uppercase px-8 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-semibold shadow-[0_0_30px_hsl(38_50%_48%/0.3)] hover:shadow-[0_0_50px_hsl(38_50%_48%/0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Enviando…
                    </>
                  ) : (
                    <>
                      Enviar solicitud
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-foreground/40 font-body pt-1">
                  Plazas limitadas · Respuesta en 24h
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormDialog;
