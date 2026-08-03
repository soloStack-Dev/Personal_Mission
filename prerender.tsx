import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './src/App'

/**
 * Server-side entry used ONLY at build time to prerender each route
 * into static HTML (see scripts/prerender-html.mjs).
 *
 * It renders the exact same <App /> the client uses, but:
 *  - inside a StaticRouter pinned to a specific URL (instead of BrowserRouter),
 *  - with a fresh QueryClient so no cached data leaks between routes.
 *
 * During renderToString no effects run, so GSAP/canvas/scroll code is inert —
 * we simply get the full page markup (headings, paragraphs, links) that
 * search-engine crawlers can read without executing JavaScript.
 */
export function render(url: string): string {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  })

  return renderToString(
    <QueryClientProvider client={queryClient}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </QueryClientProvider>,
  )
}
