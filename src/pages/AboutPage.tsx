import { useStaggerChildren, useHeroAnimation } from '../hooks/useScrollAnimation'

const timeline = [
  {
    num: '01',
    role: 'Tech Lead',
    company: 'Neural Architects',
    description: 'Leading the integration of LLM-powered features into enterprise applications, architecting scalable AI pipelines.',
  },
  {
    num: '02',
    role: 'Backend Engineer',
    company: 'CloudScale Dynamics',
    description: 'Designed and maintained distributed database systems serving millions of requests with sub-millisecond latency.',
  },
  {
    num: '03',
    role: 'Software Architect',
    company: 'Studio Minimal',
    description: 'Consulting on minimalist software design, building clean architectures that prioritize developer experience.',
  },
]

export default function AboutPage() {
  const heroRef = useHeroAnimation()
  const timelineRef = useStaggerChildren<HTMLDivElement>()

  return (
    <div style={{ background: '#0a0a0a' }}>
      {/* Philosophy Section */}
      <section ref={heroRef} style={{
        padding: 'var(--space-2xl) 0 var(--space-xl)',
      }}>
        <div className="container about-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 'var(--space-xl)',
          alignItems: 'center',
        }}>
          <div
            data-hero-image
            style={{ position: 'relative' }}
          >
            <img
              src="/userImages/Faleel.jpeg"
              alt="Workspace"
              className="about-portrait"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                objectFit: 'cover',
                filter: 'grayscale(100%) brightness(0.8)',
                transition: 'filter 0.5s ease',
              }}
            />
            <span style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#666',
            }}>
              WORKSPACE_01 // SYSTEM_ALPHA
            </span>
          </div>

          <div>
            <span data-hero-headline style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#666',
              marginBottom: 'var(--space-md)',
            }}>
              PHILOSOPHY
            </span>

            <h1 data-hero-headline style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-md)',
            }}>
              The Journey
            </h1>

            <p data-hero-sub style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--text-body)',
              maxWidth: '480px',
              marginBottom: '20px',
            }}>
              Engineering is more than building systems — it's crafting experiences that
              seamlessly blend form and function. Every line of code is a deliberate choice,
              every architecture a statement of intent.
            </p>

            <p data-hero-sub style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--text-body)',
              maxWidth: '480px',
              fontStyle: 'italic',
              marginBottom: 'var(--space-lg)',
            }}>
              The intersection of artificial intelligence and human experience is where
              the most profound innovations emerge. I believe in building technology that
              amplifies human potential rather than replacing it.
            </p>

            <span style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#666',
              marginBottom: 'var(--space-sm)',
            }}>
              EXPERTISE FOCUS
            </span>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-lg)',
            }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700 }}>01</div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginTop: '8px',
                }}>
                  SCALABLE SYSTEMS
                </div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700 }}>02</div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginTop: '8px',
                }}>
                  MACHINE LEARNING
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{
        padding: 'var(--space-xl) 0 var(--space-2xl)',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '64px',
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
            }}>
              Timeline
            </h2>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: '#666',
              textTransform: 'uppercase',
            }}>
              2018 — PRESENT
            </span>
          </div>

          <div ref={timelineRef}>
            {timeline.map((item) => (
              <div
                key={item.num}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 3fr',
                  gap: 'var(--space-lg)',
                  padding: '32px 0',
                  alignItems: 'start',
                }}
                className="timeline-row"
              >
                <div>
                  <div style={{
                    fontSize: '11px',
                    color: '#666',
                    marginBottom: '4px',
                  }}>
                    {item.num}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '8px',
                  }}>
                    {item.role}
                  </div>
                  <div style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                  }}>
                    {item.company}
                  </div>
                </div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--text-body)',
                  maxWidth: '400px',
                }}
                className="timeline-desc"
                >
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .about-portrait:hover {
          filter: grayscale(0%) brightness(1) !important;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .timeline-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .timeline-desc {
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  )
}
