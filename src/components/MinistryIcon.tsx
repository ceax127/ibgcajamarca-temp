// Minimal line-style icons, one per ministry, hand-drawn to match the
// stroke-icon style already used on the Seminario page — no icon library
// dependency needed for just thirteen glyphs.
const paths: Record<string, string> = {
  pastoral: 'M12 3v18M8 7h8M7 12h10M6 17h12',
  maestros: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z',
  administracion: 'M3 3v18h18M7 15l4-4 3 3 5-6',
  adolescentes: 'M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM5 21v-2a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v2',
  alabanza: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  benevolencia:
    'M12 21s-7-4.35-9.5-8.5C1 9.5 2.5 6 6 6c2 0 3.5 1.2 4.5 2.5C11.5 7.2 13 6 15 6c3.5 0 5 3.5 3.5 6.5C19 16.65 12 21 12 21Z',
  cafeteria: 'M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 2h1.5a2.5 2.5 0 0 1 0 5H17M6 3c0 1-1 1-1 2M10 3c0 1-1 1-1 2',
  'eventos-especiales': 'M8 2v3M16 2v3M3 9h18M4 6h16v14H4Zm8 6 1.5 3H16l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h2.5Z',
  hombres:
    'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-6 9a6 6 0 0 1 12 0',
  mujeres:
    'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 8v10m-3-4h6',
  ninos: 'M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM7 21c0-3 2-6 5-6s5 3 5 6M9 21v-3m6 3v-3',
  produccion: 'M15 10 20 7v10l-5-3M4 6h11v12H4Z',
  ujieres: 'M9 3v18M15 3v18M4 8h5m6 0h5M4 16h5m6 0h5',

  // Broader homepage "pillar" groupings — not tied to a single ministry id.
  'pillar-teaching': 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z',
  'pillar-adults': 'M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20a5 5 0 0 1 9-3m1-1a5 5 0 0 1 10 4',
  'pillar-youth': 'M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM7 21c0-3 2-6 5-6s5 3 5 6M9 21v-3m6 3v-3',
  'pillar-service':
    'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
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
