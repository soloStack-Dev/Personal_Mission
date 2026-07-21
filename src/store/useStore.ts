import { create } from 'zustand'

interface AppState {
  isMobileMenuOpen: boolean
  isScrolled: boolean
  isContactModalOpen: boolean
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  setScrolled: (scrolled: boolean) => void
  openContactModal: () => void
  closeContactModal: () => void
}

export const useStore = create<AppState>((set) => ({
  isMobileMenuOpen: false,
  isScrolled: false,
  isContactModalOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  setScrolled: (scrolled) => set({ isScrolled: scrolled }),
  openContactModal: () => set({ isContactModalOpen: true }),
  closeContactModal: () => set({ isContactModalOpen: false }),
}))
