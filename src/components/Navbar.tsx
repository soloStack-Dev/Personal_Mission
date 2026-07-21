import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'

const navLinks = [
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT' },
  { to: '/blog', label: 'BLOG' },
  { to: '/projects', label: 'PROJECTS' },
]

export default function Navbar() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, isScrolled, setScrolled } = useStore()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrolled])

  useEffect(() => {
    closeMobileMenu()
  }, [location.pathname, closeMobileMenu])

  return (
    <nav style={{
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
    }}>
      <div className="container" style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <NavLink to="/" style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: '18px',
          letterSpacing: '0.05em',
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
        }}>
          Byte_Foundry__
        </NavLink>

        {/* Desktop Nav */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }} className="desktop-nav">
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
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'var(--text-primary)',
                    }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <a
            href="https://raw.githubusercontent.com/soloStack-Dev/personal_resume/main/FaleelOptimizedResume.pdf"
            download="FaleelOptimizedResume.pdf"
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: 'var(--text-inverse)',
              background: 'var(--text-primary)',
              padding: '10px 20px',
              borderRadius: '0px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            RESUME <span style={{ fontSize: '14px' }}>↓</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
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
          <span style={{
            width: '24px',
            height: '2px',
            background: 'var(--text-primary)',
            transition: 'all 0.3s ease',
            transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <span style={{
            width: '24px',
            height: '2px',
            background: 'var(--text-primary)',
            transition: 'all 0.3s ease',
            opacity: isMobileMenuOpen ? 0 : 1,
          }} />
          <span style={{
            width: '24px',
            height: '2px',
            background: 'var(--text-primary)',
            transition: 'all 0.3s ease',
            transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" style={{
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
          gap: '0',
          zIndex: 99,
          overflowY: 'auto',
        }}>
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
          <a
            href="https://raw.githubusercontent.com/soloStack-Dev/personal_resume/main/FaleelOptimizedResume.pdf"
            download="FaleelOptimizedResume.pdf"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: 'var(--text-inverse)',
              background: 'var(--text-primary)',
              padding: '14px 32px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              marginTop: '32px',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            RESUME ↓
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
