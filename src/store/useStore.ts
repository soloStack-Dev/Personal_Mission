import { create } from 'zustand'

/**
 * AppState — describes every piece of global UI state the app shares
 * between components (navbar, mobile menu and the contact modal).
 */
interface AppState {
  // UI flags
  isMobileMenuOpen: boolean // whether the mobile navigation drawer is open
  isScrolled: boolean       // whether the user has scrolled past the top (navbar styling)
  isContactModalOpen: boolean

  // Actions to change those flags
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  setScrolled: (scrolled: boolean) => void
  openContactModal: () => void
  closeContactModal: () => void
}

/**
 * Zustand store — a tiny global state container.
 * `set` merges the new partial state into the current state,
 * so every action only updates what it needs to.
 */
export const useStore = create<AppState>((set) => ({
  // Initial state
  isMobileMenuOpen: false,
  isScrolled: false,
  isContactModalOpen: false,

  // Toggle the mobile menu open/closed (used by the hamburger button)
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  // Always close the menu — used after clicking a link
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  // Track scroll position for the navbar background
  setScrolled: (scrolled) => set({ isScrolled: scrolled }),

  // Open / close the contact modal (used by the footer "Email" link)
  openContactModal: () => set({ isContactModalOpen: true }),
  closeContactModal: () => set({ isContactModalOpen: false }),
}))
