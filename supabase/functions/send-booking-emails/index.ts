import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.0";

interface BookingPayload {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje?: string;
}

const ADMIN_EMAIL = "sanark.studio@gmail.com";
// Placeholder: replace this URL with your real payment link (Stripe, Bizum, PayPal, etc.)
const PAYMENT_LINK = "https://example.com/pago-lectura-estructural";

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function sanitize(s: string, max = 1000) {
  return String(s).replace(/[<>]/g, "").slice(0, max).trim();
}

function clientEmailHtml(nombre: string) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif;color:#f5f0e6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#141414;border:1px solid rgba(182,140,64,0.25);padding:48px 40px;">
        <tr><td>
          <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:4px;color:#B68C40;text-transform:uppercase;margin:0 0 24px;">Sanark · Lectura Estructural</p>
          <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:300;color:#f5f0e6;margin:0 0 24px;">Hola ${nombre},</h1>
          <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:rgba(245,240,230,0.8);margin:0 0 20px;">
            He recibido tu solicitud para una <strong style="color:#B68C40;">Lectura Estructural</strong>.
          </p>
          <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:rgba(245,240,230,0.8);margin:0 0 32px;">
            Para confirmar tu sesión (90 minutos · 180€), realiza el pago a través del siguiente enlace seguro:
          </p>
          <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;"><tr><td>
            <a href="${PAYMENT_LINK}" style="display:inline-block;background:#B68C40;color:#0a0a0a;font-family:Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:600;padding:18px 36px;text-decoration:none;">Completar pago</a>
          </td></tr></table>
          <p style="font-family:Arial,sans-serif;font-size:13px;line-height:1.7;color:rgba(245,240,230,0.55);margin:0 0 8px;">
            Una vez recibido el pago, te enviaré los detalles para agendar el día y la hora de tu sesión.
          </p>
          <p style="font-family:Arial,sans-serif;font-size:13px;line-height:1.7;color:rgba(245,240,230,0.55);margin:0 0 32px;">
            Si tienes cualquier duda, responde directamente a este correo.
          </p>
          <hr style="border:none;border-top:1px solid rgba(182,140,64,0.15);margin:32px 0;">
          <p style="font-family:Georgia,serif;font-size:13px;color:#B68C40;font-style:italic;margin:0;">— Juan Carlos Sánchez Velázquez</p>
          <p style="font-family:Arial,sans-serif;font-size:11px;color:rgba(245,240,230,0.4);margin:4px 0 0;">Arquitecto del Proceso Sanark</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`;
}

function adminEmailHtml(p: BookingPayload) {
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;padding:32px;border-radius:8px;">
    <h2 style="color:#B68C40;margin:0 0 16px;">Nueva solicitud de Lectura Estructural</h2>
    <table cellpadding="8" style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="color:#666;width:120px;"><strong>Nombre</strong></td><td>${p.nombre}</td></tr>
      <tr><td style="color:#666;"><strong>Email</strong></td><td><a href="mailto:${p.email}">${p.email}</a></td></tr>
      <tr><td style="color:#666;"><strong>Teléfono</strong></td><td>${p.telefono || "—"}</td></tr>
      <tr><td style="color:#666;vertical-align:top;"><strong>Mensaje</strong></td><td>${p.mensaje ? p.mensaje.replace(/\n/g, "<br>") : "—"}</td></tr>
    </table>
    <p style="margin-top:24px;font-size:13px;color:#888;">Se ha enviado automáticamente al cliente el correo con el enlace de pago.</p>
  </div>
  </body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = (await req.json()) as Partial<BookingPayload>;

    if (!body.nombre || !body.email || !isValidEmail(body.email)) {
      return new Response(JSON.stringify({ error: "Datos inválidos" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload: BookingPayload = {
      nombre: sanitize(body.nombre, 100),
      email: sanitize(body.email, 200),
      telefono: body.telefono ? sanitize(body.telefono, 40) : undefined,
      mensaje: body.mensaje ? sanitize(body.mensaje, 2000) : undefined,
    };

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Persist request
    const { error: dbError } = await supabase.from("lectura_requests").insert({
      nombre: payload.nombre,
      email: payload.email,
      telefono: payload.telefono ?? null,
      mensaje: payload.mensaje ?? null,
    });
    if (dbError) console.error("DB insert error:", dbError);

    // Send emails via Lovable transactional email API
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (LOVABLE_API_KEY) {
      const sendEmail = async (to: string, subject: string, html: string) => {
        try {
          const r = await fetch("https://api.lovable.dev/v1/email/send", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ to, subject, html, from: "Sanark <noreply@sanark.lovable.app>" }),
          });
          if (!r.ok) console.error("Email send failed:", r.status, await r.text());
        } catch (e) {
          console.error("Email error:", e);
        }
      };

      await Promise.all([
        sendEmail(
          payload.email,
          "Tu Lectura Estructural · Enlace de pago",
          clientEmailHtml(payload.nombre)
        ),
        sendEmail(
          ADMIN_EMAIL,
          `Nueva solicitud · ${payload.nombre}`,
          adminEmailHtml(payload)
        ),
      ]);
    } else {
      console.warn("LOVABLE_API_KEY not set — emails not sent, request stored in DB only.");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
