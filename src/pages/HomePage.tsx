import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHeroAnimation, useScrollFadeIn, useStaggerChildren } from '../hooks/useScrollAnimation'
import { useStore } from '../store/useStore'

const expertiseBlocks = [
  { title: 'Full Stack Developer', description: 'Building end-to-end web applications with modern frameworks, databases, and deployment pipelines.' },
  { title: 'AI Integration', description: 'Seamlessly embedding AI models and LLMs into production-grade applications.' },
  { title: 'Prompt & Context', description: 'Engineering precise prompts and context windows for optimal AI performance.' },
  { title: 'AI Automation Specialist', description: 'Designing autonomous AI workflows that transform business operations.' },
]

const selectedWorks = [
  { num: '01', title: 'Campfire Website', category: 'WEB APPLICATION', year: '2024', link: 'https://camp-client-mu.vercel.app/' },
  { num: '02', title: 'Historical Blog Agent', category: 'AI AGENT', year: '2024', link: 'https://historical-news-blog-agent.vercel.app/politics' },
  { num: '03', title: 'Musical Platform', category: 'WEB APPLICATION', year: '2024', link: 'https://music-client-brown.vercel.app/' },
]

function ExpertiseBlock({ title, description, index }: { title: string; description: string; index: number }) {
  const isEven = index % 2 === 0
  return (
    <div
      data-animate
      style={{
        background: isEven ? 'var(--bg-card-dark)' : 'var(--bg-card-light)',
        color: isEven ? 'var(--text-primary)' : 'var(--text-inverse)',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '220px',
        transition: 'transform 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <h3 style={{
        fontSize: '22px',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 1.2,
        fontFamily: 'var(--font-sans)',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '14px',
        lineHeight: 1.6,
        color: isEven ? 'var(--text-body)' : 'var(--text-muted-dark)',
        marginTop: '16px',
      }}>
        {description}
      </p>
    </div>
  )
}

export default function HomePage() {
  const heroRef = useHeroAnimation()
  const projectsRef = useStaggerChildren<HTMLDivElement>()
  const ctaRef = useScrollFadeIn()
  const gridRef = useStaggerChildren<HTMLDivElement>()
  const { isMobileMenuOpen } = useStore()

  const [subEmail, setSubEmail] = useState('')
  const [subStatus, setSubStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubscribe = async () => {
    if (!subEmail.trim() || !subEmail.includes('@')) return
    setSubStatus('sending')
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'subscribe', subscriberEmail: subEmail }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubStatus('success')
      setSubEmail('')
      setTimeout(() => setSubStatus('idle'), 3000)
    } catch {
      setSubStatus('error')
      setTimeout(() => setSubStatus('idle'), 3000)
    }
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} style={{
        padding: 'var(--space-2xl) 0 var(--space-xl)',
        background: 'var(--bg-primary)',
      }}>
        <div className="container hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: 'var(--space-lg)',
          alignItems: 'center',
          minHeight: '70vh',
        }}>
          <div
            data-hero-image
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src="/userImages/Faleel.jpeg"
              alt="Faleel"
              className="hero-portrait"
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                aspectRatio: '3/4',
                objectFit: 'cover',
                filter: 'grayscale(100%) brightness(0.8)',
                transition: 'filter 0.5s ease',
              }}
            />
          </div>

          <div>
            <h1 data-hero-headline style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-md)',
            }}>
              <span className="word" style={{ display: 'block' }}>Building the</span>
              <span className="word" style={{ display: 'block' }}>Future with</span>
              <span className="word" style={{ display: 'block' }}>Code & AI</span>
            </h1>

            <p data-hero-sub style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              maxWidth: '480px',
              marginBottom: 'var(--space-md)',
            }}>
              I craft high-performance web applications and integrate AI solutions
              that push the boundaries of what's possible. From full-stack architecture
              to intelligent automation.
            </p>

            <div data-hero-buttons style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
            }}>
              <Link
                to="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  background: 'var(--text-primary)',
                  color: 'var(--text-inverse)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                VIEW WORK
              </Link>
              <Link
                to="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section style={{
        padding: 'var(--space-xl) 0',
        background: 'var(--bg-primary)',
      }}>
        <div className="container">
          <div ref={gridRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}>
            {expertiseBlocks.map((block, i) => (
              <ExpertiseBlock key={block.title} {...block} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section style={{
        padding: 'var(--space-xl) 0',
        background: 'var(--bg-primary)',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 'var(--space-lg)',
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 3vw, 36px)',
              fontWeight: 800,
              letterSpacing: '-0.01em',
            }}>
              Selected Works
            </h2>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}>
              (01-03)
            </span>
          </div>

          <div ref={projectsRef}>
            {selectedWorks.map((work) => (
              <a
                key={work.num}
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '24px 0',
                  borderBottom: '1px solid #222',
                  textDecoration: 'none',
                  transition: 'background 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-secondary)'
                  const title = e.currentTarget.querySelector('.project-title') as HTMLElement
                  if (title) title.style.transform = 'translateX(8px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  const title = e.currentTarget.querySelector('.project-title') as HTMLElement
                  if (title) title.style.transform = 'translateX(0)'
                }}
              >
                <span style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  marginRight: '16px',
                  minWidth: '24px',
                }}>
                  {work.num}
                </span>
                <span className="project-title" style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  flex: 1,
                  transition: 'transform 0.25s ease',
                }}>
                  {work.title}
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginRight: '24px',
                }}>
                  {work.category}
                </span>
                <span style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}>
                  {work.year}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} style={{
        padding: 'var(--space-xl) 0',
        background: 'var(--bg-primary)',
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 'var(--space-lg)',
        }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 800,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}>
              Think we should<br />work together?
            </h2>
            <p style={{
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
            }}>
              I'm available for freelance projects and full-time opportunities.
              Let's build something exceptional.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}>
              STAY UPDATED
            </span>
            {subStatus === 'success' ? (
              <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                Subscribed! You'll hear from me.
              </p>
            ) : (
              <div style={{
                display: 'flex',
                border: '1px solid var(--border-subtle)',
                background: 'transparent',
                overflow: 'hidden',
              }}>
                <input
                  type="email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  placeholder="YOUREMAIL.COM"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    padding: '14px 16px',
                    fontSize: '11px',
                    letterSpacing: '0.05em',
                    outline: 'none',
                    width: '240px',
                    textTransform: 'uppercase',
                  }}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={subStatus === 'sending'}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    padding: '14px 16px',
                    cursor: subStatus === 'sending' ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    opacity: subStatus === 'sending' ? 0.5 : 1,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => { if (subStatus !== 'sending') e.currentTarget.style.opacity = '0.7' }}
                  onMouseLeave={(e) => { if (subStatus !== 'sending') e.currentTarget.style.opacity = '1' }}
                >
                  {subStatus === 'sending' ? '...' : '→'}
                </button>
              </div>
            )}
            {subStatus === 'error' && (
              <p style={{ fontSize: '11px', color: '#ff4444' }}>Failed. Try again.</p>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .hero-portrait:hover {
          filter: grayscale(0%) brightness(1) !important;
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-grid h1 {
            font-size: 36px !important;
          }
          .hero-grid p {
            max-width: 100% !important;
          }
          .hero-grid div[data-hero-buttons] {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}
