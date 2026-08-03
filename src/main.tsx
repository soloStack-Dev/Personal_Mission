import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

/**
 * React Query client configuration.
 * - staleTime: how long fetched data is considered fresh (5 minutes)
 *   so the same query is not refetched on every mount.
 * - refetchOnWindowFocus: disabled so returning to the tab does not
 *   trigger silent network requests.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})

/**
 * App entry point.
 * Provider order matters:
 * 1. QueryClientProvider  — supplies React Query to the whole tree
 * 2. BrowserRouter        — enables client-side routing
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
