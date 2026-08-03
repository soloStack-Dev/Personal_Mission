/**
 * Build-time prerenderer.
 *
 * After `vite build` produces the SPA in /dist, this script:
 *  1. loads the SSR bundle (dist-ssr/prerender.js) produced by `vite build --ssr`,
 *  2. renders every route to static HTML with `render()`,
 *  3. injects that HTML into the /dist/index.html template's #root div,
 *  4. writes per-route titles/descriptions and saves each page
 *     as /dist/<route>/index.html (so crawlers get real content).
 *
 * Usage:  node scripts/prerender-html.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const distDir = join(root, 'dist')

/** Routes to prerender + the meta (title/description) each page should use. */
const routes = {
  '/': {
    title: 'Byte_Foundry__ | Portfolio',
    description:
      'Byte_Foundry__ — Full Stack Developer, AI Integration, Prompt & Context, AI Automation Specialist',
  },
  '/about': {
    title: 'About — Byte_Foundry__',
    description: 'The philosophy and career timeline of Byte_Foundry__, a Full Stack Developer focused on AI integration.',
  },
  '/blog': {
    title: 'Skills & Insights — Byte_Foundry__',
    description: 'A full-stack roadmap, skill stack and engineering insights from Byte_Foundry__.',
  },
  '/projects': {
    title: 'Projects — Byte_Foundry__',
    description: 'Selected works by Byte_Foundry__ — web applications, AI agents and full-stack systems.',
  },
}

// Load the SSR bundle (Vite SSR build output is ESM). On Windows the
// absolute path must be converted to a file:// URL for dynamic import.
const ssrEntry = await import(pathToFileURL(join(root, 'dist-ssr', 'prerender.js')).href)
const { render } = ssrEntry

// The built client template (has all the meta tags + asset links)
const template = readFileSync(join(distDir, 'index.html'), 'utf8')

for (const [route, meta] of Object.entries(routes)) {
  // 1. Render the full page markup for this route
  const rendered = render(route)

  // 2. Inject it into the empty #root div of the template
  let page = template.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`)

  // 3. Swap in this route's title + description
  page = page.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
  page = page.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${meta.description}" />`,
  )

  // 4. Write dist/index.html (for /) or dist/<route>/index.html
  const outPath = route === '/' ? join(distDir, 'index.html') : join(distDir, route.slice(1), 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, page)

  const words = page.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  console.log(`✓ prerendered ${route} → ${outPath.replace(root + '\\', '')}  (${words} words)`)
}

console.log('Prerendering complete.')
