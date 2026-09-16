// Site-wide configuration. Edit these values to match the church's real details.

export const churchInfo = {
  name: 'Iglesia Bíblica Gracia Cajamarca',
  shortName: 'IBG Cajamarca',
  address: 'Cajamarca, Perú',
  phone: '+51 999 999 999',
  email: 'contacto@ibgcajamarca.org',
  facebookUrl: 'https://facebook.com/ibgcajamarca',
  instagramUrl: 'https://instagram.com/ibgcajamarca',
  youtubeUrl: 'https://www.youtube.com/@ibgcajamarca',
  googleMapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3894.0!2d-78.5!3d-7.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDknMzYuMCJTIDc4wrAzMCcwMC4wIlc!5e0!3m2!1ses!2spe!4v0000000000000',
} as const

// YouTube channel ID (starts with "UC..."). Find yours at
// https://www.youtube.com/account_advanced while logged into the channel.
// Leave as-is (empty) to hide the live/sermons video embeds until it's set.
export const YOUTUBE_CHANNEL_ID: string = ''

// Auto-derived "uploads" playlist ID (YouTube convention: replace the
// leading "UC" of a channel ID with "UU" to get its uploads playlist).
export const youtubeUploadsPlaylistId = YOUTUBE_CHANNEL_ID
  ? `UU${YOUTUBE_CHANNEL_ID.slice(2)}`
  : ''
