import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

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

/** The full app wrapped in its providers (StrictMode + Query + Router). */
export function AppProviders() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  )
}
