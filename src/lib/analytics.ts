// Lightweight analytics for CTA clicks and booking conversions.
// - Forwards to window.gtag (GA4) and window.plausible if available
// - Always logs to localStorage so you can inspect conversions without a provider
// - Read aggregated stats with getStats() or open /analytics

export type AnalyticsEvent = {
  name: string;
  cta?: string;
  location?: string;
  meta?: Record<string, unknown>;
  ts: number;
};

const STORAGE_KEY = "sanark_analytics_events_v1";
const MAX_EVENTS = 1000;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
  }
}

function readAll(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AnalyticsEvent[]) : [];
  } catch {
    return [];
  }
}

function persist(events: AnalyticsEvent[]) {
  try {
    const trimmed = events.slice(-MAX_EVENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore quota errors
  }
}

export function track(
  name: string,
  payload: { cta?: string; location?: string; meta?: Record<string, unknown> } = {}
) {
  const event: AnalyticsEvent = { name, ...payload, ts: Date.now() };

  // Persist locally
  const all = readAll();
  all.push(event);
  persist(all);

  // Forward to GA4 if present
  try {
    window.gtag?.("event", name, {
      cta_label: payload.cta,
      cta_location: payload.location,
      ...payload.meta,
    });
  } catch {
    /* noop */
  }

  // Forward to Plausible if present
  try {
    window.plausible?.(name, {
      props: { cta: payload.cta, location: payload.location, ...payload.meta },
    });
  } catch {
    /* noop */
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log("[analytics]", event);
  }
}

export function trackCtaClick(cta: string, location: string, meta?: Record<string, unknown>) {
  track("cta_click", { cta, location, meta });
}

export function trackBookingOpen(cta: string, location: string) {
  track("booking_open", { cta, location });
}

export function trackBookingSubmit(cta: string, location: string) {
  track("booking_submit", { cta, location });
}

export function trackBookingSuccess(cta: string, location: string) {
  track("booking_success", { cta, location });
}

export function trackBookingError(cta: string, location: string, message: string) {
  track("booking_error", { cta, location, meta: { message } });
}

// ---------- Read API for the dashboard ----------

export type CtaStats = {
  cta: string;
  location: string;
  clicks: number;
  opens: number;
  submits: number;
  successes: number;
  errors: number;
  conversionRate: number; // successes / clicks
};

export function getEvents(): AnalyticsEvent[] {
  return readAll();
}

export function clearEvents() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

export function getStats(): {
  byCta: CtaStats[];
  totals: { clicks: number; opens: number; submits: number; successes: number; errors: number };
} {
  const events = readAll();
  const map = new Map<string, CtaStats>();

  for (const e of events) {
    const cta = e.cta ?? "(unknown)";
    const location = e.location ?? "(unknown)";
    const key = `${cta}::${location}`;
    const row =
      map.get(key) ??
      ({
        cta,
        location,
        clicks: 0,
        opens: 0,
        submits: 0,
        successes: 0,
        errors: 0,
        conversionRate: 0,
      } as CtaStats);

    if (e.name === "cta_click") row.clicks += 1;
    else if (e.name === "booking_open") row.opens += 1;
    else if (e.name === "booking_submit") row.submits += 1;
    else if (e.name === "booking_success") row.successes += 1;
    else if (e.name === "booking_error") row.errors += 1;

    map.set(key, row);
  }

  const byCta = [...map.values()].map((r) => ({
    ...r,
    conversionRate: r.clicks > 0 ? r.successes / r.clicks : 0,
  }));

  byCta.sort((a, b) => b.successes - a.successes || b.clicks - a.clicks);

  const totals = byCta.reduce(
    (acc, r) => ({
      clicks: acc.clicks + r.clicks,
      opens: acc.opens + r.opens,
      submits: acc.submits + r.submits,
      successes: acc.successes + r.successes,
      errors: acc.errors + r.errors,
    }),
    { clicks: 0, opens: 0, submits: 0, successes: 0, errors: 0 }
  );

  return { byCta, totals };
}
