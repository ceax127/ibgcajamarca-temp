// Site-wide configuration. Edit these values to match the church's real details.

export const churchInfo = {
  name: "Iglesia Bíblica Gracia Cajamarca",
  shortName: "IBG Cajamarca",
  address: "Av. Atahualpa 931 (frente a la UNC), Cajamarca, Perú",
  phone: "+51 940 007 521",
  email: "administracion@ibgcajamarca.org",
  facebookUrl: "https://www.facebook.com/IglesiaGraciaCajamarca",
  instagramUrl: "https://www.instagram.com/ibg_cajamarca",
  youtubeUrl: "https://www.youtube.com/@Ibgcajamarca9670",
  // Most past-service videos have third-party Content ID claims disabling
  // embedding (YouTube's own restriction — not something the site can work
  // around), so past sermons link out here instead of trying to embed them.
  youtubeStreamsUrl: "https://www.youtube.com/@Ibgcajamarca9670/streams",
  googleMapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.3789313228212!2d-78.49999798591!3d-7.165524801680548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b25bd5119e03a9%3A0xa2b8115eb4974e78!2sIglesia%20Gracia%20CAJAMARCA!5e1!3m2!1sen!2spe!4v1789600357134!5m2!1sen!2spe",
} as const;

// The Sermones page no longer talks to YouTube directly from the browser.
// Instead, a standalone Azure Function polls YouTube on a timer and caches
// the result; the frontend just fetches that cache. See functions/README.md
// for the channel ID / playlist / API key configuration (those live as
// environment variables for the build script and the Function App, not
// here, since this file only ships to the browser).
//
// VITE_SERMONS_API_URL should point at the deployed Function App, e.g.
// "https://ibg-cajamarca-sermons.azurewebsites.net/api/sermons". Falls back
// to a same-origin "/api/sermons" (useful if it's ever linked into Azure
// Static Web Apps as a "bring your own backend" on the Standard plan).
export const SERMONS_API_URL: string =
  import.meta.env.VITE_SERMONS_API_URL || "/api/sermons";

// How often the browser re-checks the sermons API for a live status change
// while the Sermones/Home page is open, in milliseconds.
export const SERMONS_POLL_INTERVAL_MS = 60_000;

// Contact form submissions go to this same Function App (functions/src/functions/sendContactMessage.ts),
// which sends the email via Azure Communication Services — see functions/README.md.
export const CONTACT_API_URL: string =
  import.meta.env.VITE_CONTACT_API_URL || "/api/contact";
