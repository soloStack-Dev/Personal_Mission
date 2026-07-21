import { useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHeroAnimation, useStaggerChildren, useScrollFadeIn } from '../hooks/useScrollAnimation'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Campfire Website',
    category: 'WEB APPLICATION',
    year: '2024',
    description: 'A modern web application built with cutting-edge technologies for seamless user experience and real-time interactions.',
    image: '/ProjectThumbnailImage/campfirewebsiteThumbnail.png',
    link: 'https://camp-client-mu.vercel.app/',
  },
  {
    title: 'Historical Blog Agent',
    category: 'AI AGENT',
    year: '2024',
    description: 'An AI-powered blog agent that curates and generates historical news content with intelligent context awareness.',
    image: '/ProjectThumbnailImage/HistoricalBlognewwebsiteThumbnail.png',
    link: 'https://historical-news-blog-agent.vercel.app/',
  },
  {
    title: 'Musical Platform',
    category: 'WEB APPLICATION',
    year: '2024',
    description: 'A feature-rich musical platform delivering immersive audio experiences with modern web technologies.',
    image: '/ProjectThumbnailImage/musicalwebsiteThumbnail.png',
    link: 'https://music-client-brown.vercel.app/',
  },
]

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const img = imgRef.current
    const preview = previewRef.current
    if (!card || !img) return

    const handleEnter = () => {
      gsap.to(img, { filter: 'grayscale(0%) brightness(1)', duration: 0.5, ease: 'power2.out' })
      gsap.to(img, { scale: 1.03, duration: 0.3, ease: 'power2.out' })
      if (preview) {
        gsap.to(preview, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      }
    }
    const handleLeave = () => {
      gsap.to(img, { filter: 'grayscale(100%) brightness(0.7)', duration: 0.5, ease: 'power2.out' })
      gsap.to(img, { scale: 1, duration: 0.3, ease: 'power2.out' })
      if (preview) {
        gsap.to(preview, { opacity: 0, duration: 0.3, ease: 'power2.out' })
      }
    }

    card.addEventListener('mouseenter', handleEnter)
    card.addEventListener('mouseleave', handleLeave)
    return () => {
      card.removeEventListener('mouseenter', handleEnter)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      data-animate
      style={{
        cursor: 'pointer',
      }}
    >
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '16/10',
        marginBottom: '24px',
      }}>
        <img
          ref={imgRef}
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(100%) brightness(0.7)',
            transition: 'filter 0.5s ease, transform 0.3s ease',
          }}
        />

        {/* Preview Button Overlay */}
        <div
          ref={previewRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.4)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: '12px 28px',
              background: 'var(--text-primary)',
              color: 'var(--text-inverse)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            PREVIEW
          </a>
        </div>
      </div>

      <div style={{
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text-muted-dark)',
        marginBottom: '8px',
      }}>
        {project.category} / {project.year}
      </div>

      <h3 style={{
        fontSize: 'clamp(22px, 2.5vw, 28px)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0',
        marginBottom: '12px',
        lineHeight: 1.1,
      }}>
        {project.title}
      </h3>

      <p style={{
        fontSize: '14px',
        lineHeight: 1.6,
        color: 'var(--text-body)',
        marginBottom: '16px',
      }}>
        {project.description}
      </p>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-hover)',
          padding: '8px 16px',
          textDecoration: 'none',
          transition: 'border-color 0.2s ease, color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--text-primary)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-hover)'
        }}
      >
        VIEW CASE STUDY
      </a>
    </div>
  )
}

export default function ProjectPage() {
  const heroRef = useHeroAnimation()
  const projectsRef = useStaggerChildren<HTMLDivElement>()
  const ctaRef = useScrollFadeIn()

  return (
    <div style={{ background: '#0a0a0a' }}>
      {/* Hero Section */}
      <section ref={heroRef} style={{
        padding: 'var(--space-2xl) 0 var(--space-lg)',
      }}>
        <div className="container">
          <h1 data-hero-headline style={{
            fontSize: 'clamp(40px, 5vw, 72px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}>
            <span className="word" style={{ display: 'block' }}>Selected</span>
            <span className="word" style={{ display: 'block' }}>Works</span>
          </h1>

          <p data-hero-sub style={{
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'var(--text-body)',
            maxWidth: '480px',
            marginTop: 'var(--space-md)',
          }}>
            A curated collection of projects showcasing architectural logic,
            minimalist design systems, and intelligent automation.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{
        padding: '0 0 var(--space-xl)',
      }}>
        <div className="container">
          <div ref={projectsRef} className="projects-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px',
          }}>
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} style={{
        padding: 'var(--space-xl) 0 var(--space-2xl)',
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 'var(--space-lg)',
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 1.05,
            }}>
              LET'S BUILD<br />SOMETHING<br />SUBSTANTIAL.
            </h2>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-muted)',
              marginTop: '16px',
            }}>
              Have a project in mind? Let's discuss how we can create something remarkable together.
            </p>
          </div>

          <a
            href="#"
            style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontWeight: 700,
              letterSpacing: '0.02em',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'gap 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = '16px')}
            onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
          >
            CONTACT <span>→</span>
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
