// Runs after `vite build`. The site is a single-page app, so every route used
// to be served the same index.html: same <title>, same description, and a
// canonical pointing at the homepage — which tells search engines that every
// inner page is a duplicate of "/". This writes one HTML file per top-level
// page with that page's own title, description, canonical and social-preview
// tags (texts in src/data/seo.json, Spanish as the primary language), and
// rewrites each route to its file in dist/staticwebapp.config.json. The React
// app itself is unchanged and still boots from the same bundle on every page.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const seo = JSON.parse(readFileSync(join(root, 'src/data/seo.json'), 'utf8'))
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function replaceOnce(html, pattern, replacement, label) {
  const matches = html.match(new RegExp(pattern.source, 'g')) ?? []
  if (matches.length !== 1) throw new Error(`prerender-seo: expected exactly one ${label} in dist/index.html, found ${matches.length}`)
  return html.replace(pattern, replacement)
}

function pageHtml(path, { title, description }) {
  const url = `${seo.siteUrl}${path}`
  const t = escapeAttr(title)
  const d = escapeAttr(description)
  let html = template
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`, '<title>')
  html = replaceOnce(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${d}" />\n    <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />`,
    'meta description',
  )
  html = replaceOnce(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${t}" />`, 'og:title')
  html = replaceOnce(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${d}" />`, 'og:description')
  html = replaceOnce(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${t}" />`, 'twitter:title')
  html = replaceOnce(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${d}" />`, 'twitter:description')
  return html
}

// Every other route (ministry pages, /admin, 404s) falls back to an untouched
// copy of the template: no canonical baked in, so the app sets the right one
// at runtime instead of inheriting the homepage's.
writeFileSync(join(dist, 'app.html'), template)

const routes = []
mkdirSync(join(dist, '_seo'), { recursive: true })
for (const [path, langs] of Object.entries(seo.pages)) {
  const html = pageHtml(path, langs.es)
  if (path === '/') {
    writeFileSync(join(dist, 'index.html'), html)
    continue
  }
  const file = `/_seo/${path.slice(1)}.html`
  writeFileSync(join(dist, file), html)
  routes.push({ route: path, rewrite: file })
}

const configPath = join(dist, 'staticwebapp.config.json')
const config = JSON.parse(readFileSync(configPath, 'utf8'))
config.routes = [...routes, ...(config.routes ?? [])]
config.navigationFallback = { ...config.navigationFallback, rewrite: '/app.html' }
writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`)

console.log(`prerender-seo: wrote ${routes.length + 1} page heads, fallback /app.html`)
