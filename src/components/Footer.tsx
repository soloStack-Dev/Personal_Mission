import { useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'

interface FooterProps {
  variant?: 'home' | 'about' | 'project'
}

/**
 * Links shown in the footer.
 * `onClick` is used for actions (like opening the contact modal), not navigation.
 */
function getSocialLinks(openContactModal: () => void) {
  return [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/faleel-h-b772a1416/', target: '_blank' },
    { label: 'GitHub', href: 'https://github.com/soloStack-Dev', target: '_blank' },
    { label: 'Twitter', href: '#', target: '' },
    { label: 'Email', href: '#', target: '', onClick: openContactModal },
  ]
}

/**
 * Footer — shows the brand, social links and copyright.
 *
 * Two visual variants:
 * - 'home': larger, left/right two-column layout (used on the home page)
 * - 'about' / 'project': compact, single centered row (used on inner pages)
 *
 * When no `variant` prop is passed it is derived from the current route.
 */
export default function Footer({ variant = 'home' }: FooterProps) {
  const location = useLocation()

  // Derive the variant from the route when the caller did not specify one
  const currentVariant =
    variant ||
    (location.pathname === '/about' ? 'about' : location.pathname === '/projects' ? 'project' : 'home')

  // Compact layout for inner pages
  if (currentVariant !== 'home') {
    return (
      <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid #1a1a1a' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '32px var(--container-padding)',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <Brand />
          <SocialLinks />
          <Copyright />
        </div>
      </footer>
    )
  }

  // Larger layout for the home page
  return (
    <footer style={{ background: 'var(--bg-secondary)' }}>
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '48px var(--container-padding)',
          flexWrap: 'wrap',
          gap: '32px',
        }}
      >
        <div>
          <Brand />
          <Copyright />
        </div>
        <SocialLinks />
      </div>
    </footer>
  )
}

/** Brand name block. */
function Brand() {
  return (
    <div
      style={{
        fontWeight: 800,
        fontSize: '18px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginBottom: '12px',
      }}
    >
      Byte_Foundry__
    </div>
  )
}

/** Copyright line. */
function Copyright() {
  return (
    <div
      style={{
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: 'var(--text-muted-dark)',
      }}
    >
      © 2024 BYTE_FOUNDRY__. ALL RIGHTS RESERVED.
    </div>
  )
}

/** Horizontal row of social links. */
function SocialLinks() {
  const { openContactModal } = useStore()
  const links = getSocialLinks(openContactModal)
  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.target || undefined}
          rel={link.target ? 'noopener noreferrer' : undefined}
          onClick={
            link.onClick
              ? (e) => {
                  e.preventDefault()
                  link.onClick!()
                }
              : undefined
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)'
            e.currentTarget.style.textDecoration = 'underline'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-body)'
            e.currentTarget.style.textDecoration = 'none'
          }}
          style={{
            fontSize: '13px',
            color: 'var(--text-body)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            cursor: 'pointer',
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
