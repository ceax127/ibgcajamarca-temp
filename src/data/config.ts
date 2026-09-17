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
  googleMapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.3789313228212!2d-78.49999798591!3d-7.165524801680548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b25bd5119e03a9%3A0xa2b8115eb4974e78!2sIglesia%20Gracia%20CAJAMARCA!5e1!3m2!1sen!2spe!4v1789600357134!5m2!1sen!2spe",
} as const;

// YouTube channel ID (starts with "UC..."). Find yours at
// https://www.youtube.com/account_advanced while logged into the channel.
// Leave as-is (empty) to hide the live/sermons video embeds until it's set.
export const YOUTUBE_CHANNEL_ID: string = "";

// Auto-derived "uploads" playlist ID (YouTube convention: replace the
// leading "UC" of a channel ID with "UU" to get its uploads playlist).
export const youtubeUploadsPlaylistId = YOUTUBE_CHANNEL_ID
  ? `UU${YOUTUBE_CHANNEL_ID.slice(2)}`
  : "";
