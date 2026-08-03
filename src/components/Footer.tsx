import { useLocation, Link } from 'react-router-dom'
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
    { label: 'Instagram', href: 'https://www.instagram.com/byte_foundry__?igsh=Y2w5YXQzOW44aDIz', target: '_blank' },
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
        <ExploreLinks />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '24px' }}>
          <SocialLinks />
          <ShareLinks />
        </div>
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

/** Internal navigation links — helps SEO with more on-page internal links. */
function ExploreLinks() {
  const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Skills & Insights', to: '/blog' },
  ]
  return (
    <div>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.1em',
          color: 'var(--text-muted-dark)',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        Explore
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{ fontSize: '13px', color: 'var(--text-body)', textDecoration: 'none' }}
          >
            {link.label}
          </Link>
        ))}
      </div>
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

/**
 * Social share buttons — let visitors share the current page on X,
 * LinkedIn or Facebook. The href is static (hydration-safe); the
 * real, current URL is injected when the link is clicked.
 */
function ShareLinks() {
  const shareBaseUrl = 'https://personal-mission-mu.vercel.app/'
  const shareText = 'Byte_Foundry__ — Building the Future with Code & AI'
  const links = [
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareBaseUrl)}&text=${encodeURIComponent(shareText)}`,
      build: (url: string) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareBaseUrl)}`,
      build: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareBaseUrl)}`,
      build: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
  ]

  return (
    <div style={{ textAlign: 'right' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.1em',
          color: 'var(--text-muted-dark)',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        Share this page
      </div>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault()
              const current = typeof window !== 'undefined' ? window.location.href : shareBaseUrl
              window.open(link.build(current), '_blank', 'noopener,noreferrer')
            }}
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
    </div>
  )
}
