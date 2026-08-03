import { createRoot, hydrateRoot } from 'react-dom/client'
import { AppProviders } from './providers'
import './index.css'

/**
 * App entry point.
 *
 * The page is prerendered to static HTML at build time (see
 * scripts/prerender-html.mjs), so:
 *  - if #root already contains markup, we HYDRATE it (no flash,
 *    animations start immediately),
 *  - in dev (empty root) we just render normally.
 */
const rootEl = document.getElementById('root')!

if (rootEl.childElementCount > 0) {
  hydrateRoot(rootEl, <AppProviders />)
} else {
  createRoot(rootEl).render(<AppProviders />)
}
