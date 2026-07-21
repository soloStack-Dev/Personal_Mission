import { useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'

interface FooterProps {
  variant?: 'home' | 'about' | 'project'
}

export default function Footer({ variant = 'home' }: FooterProps) {
  const location = useLocation()
  const { openContactModal } = useStore()
  const currentVariant = variant || (
    location.pathname === '/about' ? 'about' :
    location.pathname === '/projects' ? 'project' : 'home'
  )

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/faleel-h-b772a1416/', target: '_blank' },
    { label: 'GitHub', href: 'https://github.com/soloStack-Dev', target: '_blank' },
    { label: 'Twitter', href: '#', target: '' },
    { label: 'Email', href: '#', target: '', onClick: openContactModal },
  ]

  if (currentVariant === 'about' || currentVariant === 'project') {
    return (
      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid #1a1a1a',
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '32px var(--container-padding)',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          <div style={{
            fontWeight: 800,
            fontSize: '18px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            Byte_Foundry__
          </div>

          <div style={{
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
          }}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.target || undefined}
                rel={link.target ? 'noopener noreferrer' : undefined}
                onClick={link.onClick ? (e) => { e.preventDefault(); link.onClick!() } : undefined}
                style={{
                  fontSize: '13px',
                  color: 'var(--text-body)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.textDecoration = 'underline'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-body)'
                  e.currentTarget.style.textDecoration = 'none'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--text-muted-dark)',
          }}>
            © 2024 BYTE_FOUNDRY__. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '48px var(--container-padding)',
        flexWrap: 'wrap',
        gap: '32px',
      }}>
        <div>
          <div style={{
            fontWeight: 800,
            fontSize: '18px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Byte_Foundry__
          </div>
          <div style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--text-muted-dark)',
          }}>
            © 2024 BYTE_FOUNDRY__. ALL RIGHTS RESERVED.
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
        }}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.target || undefined}
              rel={link.target ? 'noopener noreferrer' : undefined}
              onClick={link.onClick ? (e) => { e.preventDefault(); link.onClick!() } : undefined}
              style={{
                fontSize: '13px',
                color: 'var(--text-body)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.style.textDecoration = 'underline'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-body)'
                e.currentTarget.style.textDecoration = 'none'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
