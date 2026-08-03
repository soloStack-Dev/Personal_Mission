import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'

/** Public URL + download name of the resume file. */
const RESUME_URL = 'https://raw.githubusercontent.com/soloStack-Dev/personal_resume/main/FaleelOptimizedResume.pdf'
const RESUME_FILENAME = 'FaleelOptimizedResume.pdf'

/** Navigation items shown in both the desktop bar and mobile drawer. */
const navLinks = [
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT' },
  { to: '/blog', label: 'BLOG' },
  { to: '/projects', label: 'PROJECTS' },
]

/**
 * ResumeButton — a link styled as a solid button.
 * `small` renders the compact version used in the desktop navbar.
 */
function ResumeButton({ small = false }: { small?: boolean }) {
  return (
    <a
      href={RESUME_URL}
      download={RESUME_FILENAME}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        background: 'var(--text-primary)',
        color: 'var(--text-inverse)',
        fontSize: small ? '12px' : '13px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'opacity 0.2s ease',
        // Layout differs slightly between desktop (inline) and mobile (block)
        ...(small
          ? { padding: '10px 20px' }
          : { padding: '14px 32px', marginTop: '32px', width: 'fit-content' }),
      }}
    >
      RESUME <span style={{ fontSize: small ? '14px' : '13px' }}>↓</span>
    </a>
  )
}

/**
 * Navbar — fixed top bar.
 *
 * Responsibilities:
 * - shows the brand + desktop links + resume button,
 * - collapses into a hamburger + full-screen drawer on mobile,
 * - changes background once the page is scrolled (`isScrolled`).
 */
export default function Navbar() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, isScrolled, setScrolled } = useStore()
  const location = useLocation()

  // Listen to the window scroll position so the navbar can gain a
  // solid background after the user scrolls past 50px.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrolled])

  // Always close the mobile drawer when navigating to another route.
  useEffect(() => {
    closeMobileMenu()
  }, [location.pathname, closeMobileMenu])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        background: isScrolled ? 'rgba(0, 0, 0, 0.98)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="container"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand / logo */}
        <NavLink
          to="/"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: '18px',
            letterSpacing: '0.05em',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
          }}
        >
          Byte_Foundry__
        </NavLink>

        {/* Desktop navigation (hidden on small screens via CSS) */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                textTransform: 'uppercase',
                textDecoration: 'none',
                position: 'relative',
                paddingBottom: '2px',
              })}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {/* Small underline marker under the active link */}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'var(--text-primary)',
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <ResumeButton small />
        </div>

        {/* Mobile hamburger — three bars that morph into an X when open */}
        <button
          onClick={toggleMobileMenu}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '2px',
              background: 'var(--text-primary)',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <span
            style={{
              width: '24px',
              height: '2px',
              background: 'var(--text-primary)',
              transition: 'all 0.3s ease',
              opacity: isMobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: '24px',
              height: '2px',
              background: 'var(--text-primary)',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile drawer — full-screen overlay below the navbar */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            background: '#000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: '48px',
            paddingBottom: '48px',
            paddingLeft: 'var(--container-padding)',
            paddingRight: 'var(--container-padding)',
            zIndex: 99,
            overflowY: 'auto',
          }}
        >
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '20px 0',
                borderBottom: i < navLinks.length - 1 ? '1px solid #1a1a1a' : 'none',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              })}
            >
              {link.label}
            </NavLink>
          ))}

          <ResumeButton />
        </div>
      )}

      {/* Responsive rules: swap the desktop bar for the hamburger below 768px */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
