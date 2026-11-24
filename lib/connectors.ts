// The apps whose Claude connector this site's consent page can hand a request to.
//
// A plain module on purpose (no "use client"): the page and the component both read it.
// To add an app, add one entry. Every address is fixed here and never read from the
// request, so the consent page cannot be used to send anyone to another site.

export type ConnectorApp = {
  /** Which logo and wordmark to draw (see components/BrandMarks.tsx). */
  brand: 'parline' | 'nonozempic';
  /** The app's main colour, used for the hover ring and the arrow. */
  accent: string;
  name: string;
  blurb: string;
  /** The app's own consent screen. It receives the same authorization id. */
  consentUrl: string;
  /** Extra query parameters that app's consent screen expects. */
  params?: Record<string, string>;
};

export const CONNECTOR_APPS: ConnectorApp[] = [
  {
    brand: "parline",
    accent: "#1b3563",
    name: "Parline",
    blurb: "Double-entry bookkeeping",
    consentUrl: "https://www.parline.app/oauth/consent",
  },
  {
    brand: "nonozempic",
    accent: "#2f7d4f",
    name: "NONOZEMPIC",
    blurb: "Calorie tracker",
    consentUrl: "https://nonozempic.vercel.app/oauth/consent",
    params: { app: "nonozempic" },
  },
];

// An authorization request id from Supabase. Opaque, so only its shape is checked:
// short, URL-safe, no slashes or spaces.
const AUTHORIZATION_ID = /^[A-Za-z0-9_-]{1,200}$/;

export function isAuthorizationId(value: unknown): value is string {
  return typeof value === "string" && AUTHORIZATION_ID.test(value);
}

export function consentLink(app: ConnectorApp, authorizationId: string): string {
  const url = new URL(app.consentUrl);
  url.searchParams.set("authorization_id", authorizationId);
  for (const [key, value] of Object.entries(app.params ?? {})) url.searchParams.set(key, value);
  return url.toString();
}
