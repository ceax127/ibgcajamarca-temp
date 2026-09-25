// Minimal line-style icons, hand-drawn to match the stroke-icon style
// already used on the Seminario page — no icon library dependency needed
// for this many glyphs. Originally one per ministry (chosen to be
// semantically distinct rather than a generic icon-pack drop — e.g. no two
// ministries share a plain person silhouette), now also reused for a
// handful of non-ministry concepts (mission/vision, contact info) so the
// same unboxed-icon-with-glow card language stays consistent site-wide.
const paths: Record<string, string> = {
  // Open book — shepherding the congregation through the Word.
  pastoral: 'M12 6c-1.7-1-4.3-1-6 0v12c1.7-1 4.3-1 6 0 1.7-1 4.3-1 6 0V6c-1.7-1-4.3-1-6 0Zm0 0v12',
  // Graduation cap — formal biblical instruction.
  maestros: 'M12 4 2 9l10 5 8-4.2V16M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4',
  // Building — orderly stewardship of church operations.
  administracion: 'M4 21V7l8-4 8 4v14M4 21h16M9 10h.5M9 14h.5M14 10h.5M14 14h.5',
  // Shield — steadfastness and spiritual leadership.
  hombres: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z',
  // Flower — warmth and community, not a restroom-sign gender glyph.
  mujeres: 'M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0Zm0 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM12 16v5',
  // Flame — zeal and growth at this stage of life.
  adolescentes: 'M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-.5-2-1-2.5.5 2-1 3-2 3-1.5 0-2-1.5-1-3 .8-1 1-2 1-3.5C13 6 12.5 3 12 2Z',
  // Smiling face — friendly, clearly a child rather than a small adult.
  ninos: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9 10h.5M15 10h.5M8 14s1.5 2 4 2 4-2 4-2',
  // Two eighth notes — the worship/music team.
  alabanza: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  // Gift box — practical, active charity.
  benevolencia: 'M4 8h16v13H4V8Zm0 0V6a2 2 0 0 1 2-2h1.5a2.5 2.5 0 0 1 0 5M20 8V6a2 2 0 0 0-2-2h-1.5a2.5 2.5 0 0 0 0 5M12 8v13',
  // Coffee cup with steam — hospitality and fellowship.
  cafeteria: 'M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 2h1.5a2.5 2.5 0 0 1 0 5H17M6 3c0 1-1 1-1 2M10 3c0 1-1 1-1 2',
  // Sparkles — churchwide gatherings and standout occasions.
  'eventos-especiales': 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3ZM19 13l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z',
  // Mixing-board sliders — audio/video production.
  produccion: 'M4 6h6m4 0h6M4 12h10m4 0h2M4 18h2m4 0h10M8 4v4M16 10v4M10 16v4',
  // Open door with handle — the first welcome for every visitor.
  ujieres: 'M3 21V4l11-2v19M14 21h7M14 4v17M9 12h.5',

  // Broader homepage "pillar" groupings — not tied to a single ministry id.
  'pillar-teaching': 'M12 6c-1.7-1-4.3-1-6 0v12c1.7-1 4.3-1 6 0 1.7-1 4.3-1 6 0V6c-1.7-1-4.3-1-6 0Zm0 0v12',
  'pillar-adults': 'M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20a5 5 0 0 1 9-3m1-1a5 5 0 0 1 10 4',
  // Sprout — the next generation taking root and growing.
  'pillar-youth': 'M12 22v-7m0 0c-4 0-7-3-7-7 4 0 7 2 7 5m0-5c0-4 3-7 7-7 0 4-2 7-5 7',
  'pillar-service':
    'M12 20.5c-4-2.5-8-5.5-8-9.5a4 4 0 0 1 8-1.5A4 4 0 0 1 20 11c0 4-4 7-8 9.5Z',

  // Non-ministry concepts, reusing the same visual language.
  // Target — a clear, aimed purpose.
  mission: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z',
  // Eye — a far-off, aspirational view.
  vision:
    'M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0ZM9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z',
  // Circle with a plus — an open invitation to join in.
  invite: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 8v8M8 12h8',
  'contact-address': 'M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Zm0-8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  'contact-phone':
    'M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.6c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z',
  'contact-email': 'M4 6h16v12H4V6Zm0 0 8 7 8-7',
  'contact-social':
    'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 13.5l6.8 3.9M15.4 6.5l-6.8 4',
  // Bank building with columns — for account/transfer details.
  bank: 'M3 21h18M4 21V9l8-5 8 5v12M8 21v-8M12 21v-8M16 21v-8',
  // Smartphone — Yape is a mobile-payment app tied to a phone number.
  smartphone: 'M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1ZM11 19h2',
}

export function MinistryIcon({ id, className }: { id: string; className?: string }) {
  const d = paths[id]
  if (!d) return null
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  )
}
