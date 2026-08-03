import { useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHeroAnimation, useStaggerChildren, useScrollFadeIn } from '../hooks/useScrollAnimation'

gsap.registerPlugin(ScrollTrigger)

/** Portfolio projects, each linking to its live site. */
const projects = [
  {
    title: 'Campfire Website',
    category: 'WEB APPLICATION',
    year: '2024',
    description: 'A modern web application built with cutting-edge technologies for seamless user experience and real-time interactions.',
    image: '/ProjectThumbnailImage/campReservation.png',
    link: 'https://camp-client-mu.vercel.app/',
  },
  {
    title: 'Historical Blog Agent',
    category: 'AI AGENT',
    year: '2024',
    description: 'An AI-powered blog agent that curates and generates historical news content with intelligent context awareness.',
    image: '/ProjectThumbnailImage/ChronicalArchive.png',
    link: 'https://historical-news-blog-agent.vercel.app/',
  },
  {
    title: 'Musical Platform',
    category: 'WEB APPLICATION',
    year: '2024',
    description: 'A feature-rich musical platform delivering immersive audio experiences with modern web technologies.',
    image: '/ProjectThumbnailImage/MusicalInstrumentjoining.png',
    link: 'https://music-client-brown.vercel.app/',
  },
  {
    title: 'You Make it. You wear it',
    category: 'STILL DEVELOPING',
    year: '2026',
    description: 'The Electric Canvas client is a full-featured t-shirt design studio built with modern React. Users can: Design t-shirts with text, images, and color overlays, drag & drop elements with rotation, flip, and alignment controls, generate AI product descriptions via OpenRouter/LangChain, browse the collection of community and AI-generated designs, cart & checkout flow with tax calculation.',
    image: '/ProjectThumbnailImage/clothappimage.png',
    link: 'https://cloth-client-eta.vercel.app/',
  },
  {
    title: 'Wooden Artist',
    category: 'WEB APPLICATION',
    year: '2025',
    description: 'Handcrafted Heritage — a vertical-scroll premium furniture website built with Next.js 16, GSAP scroll animations, TanStack Query data sync, and a warm editorial design system.',
    image: '/ProjectThumbnailImage/woodenArtist.png',
    link: 'https://wooden-artist.vercel.app/',
  },
]

/**
 * ProjectCard — one project tile.
 *
 * Hover behavior:
 * - the thumbnail loses its grayscale filter and zooms in slightly,
 * - a "PREVIEW" button fades in over the image.
 * All animation is done with GSAP tweens bound via event listeners.
 */
function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const img = imgRef.current
    const preview = previewRef.current
    if (!card || !img) return

    // Mouse entered: colorize + zoom the image, show the PREVIEW overlay
    const handleEnter = () => {
      gsap.to(img, { filter: 'grayscale(0%) brightness(1)', duration: 0.5, ease: 'power2.out' })
      gsap.to(img, { scale: 1.03, duration: 0.3, ease: 'power2.out' })
      if (preview) gsap.to(preview, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    }
    // Mouse left: back to grayscale, resting zoom, hide the overlay
    const handleLeave = () => {
      gsap.to(img, { filter: 'grayscale(100%) brightness(0.7)', duration: 0.5, ease: 'power2.out' })
      gsap.to(img, { scale: 1, duration: 0.3, ease: 'power2.out' })
      if (preview) gsap.to(preview, { opacity: 0, duration: 0.3, ease: 'power2.out' })
    }

    card.addEventListener('mouseenter', handleEnter)
    card.addEventListener('mouseleave', handleLeave)
    return () => {
      card.removeEventListener('mouseenter', handleEnter)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div ref={cardRef} data-animate style={{ cursor: 'pointer' }}>
      {/* Thumbnail with hover overlay */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10', marginBottom: '24px' }}>
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

        {/* PREVIEW button overlay (fades in on hover) */}
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
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
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
          >
            PREVIEW
          </a>
        </div>
      </div>

      {/* Category / year */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-muted-dark)',
          marginBottom: '8px',
        }}
      >
        {project.category} / {project.year}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 'clamp(22px, 2.5vw, 28px)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0',
          marginBottom: '12px',
          lineHeight: 1.1,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-body)', marginBottom: '16px' }}>
        {project.description}
      </p>

      {/* "View case study" link — border lights up on hover */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--text-primary)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
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
      >
        VIEW CASE STUDY
      </a>
    </div>
  )
}

/** ProjectPage — hero, project grid, and a closing call-to-action. */
export default function ProjectPage() {
  const heroRef = useHeroAnimation()
  const projectsRef = useStaggerChildren<HTMLDivElement>()
  const ctaRef = useScrollFadeIn()

  return (
    <div style={{ background: '#0a0a0a' }}>
      {/* Hero Section */}
      <section ref={heroRef} style={{ padding: 'var(--space-2xl) 0 var(--space-lg)' }}>
        <div className="container">
          <h1
            data-hero-headline
            style={{
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            <span className="word" style={{ display: 'block' }}>Selected</span>
            <span className="word" style={{ display: 'block' }}>Works</span>
          </h1>

          <p
            data-hero-sub
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'var(--text-body)',
              maxWidth: '480px',
              marginTop: 'var(--space-md)',
            }}
          >
            A curated collection of projects showcasing architectural logic,
            minimalist design systems, and intelligent automation.
          </p>
        </div>
      </section>

      {/* Projects Grid — two columns on desktop, one on mobile */}
      <section style={{ padding: '0 0 var(--space-xl)' }}>
        <div className="container">
          <div
            ref={projectsRef}
            className="projects-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} style={{ padding: 'var(--space-xl) 0 var(--space-2xl)' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 'var(--space-lg)',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 'clamp(28px, 3vw, 42px)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                lineHeight: 1.05,
              }}
            >
              LET'S BUILD<br />SOMETHING<br />SUBSTANTIAL.
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '16px' }}>
              Have a project in mind? Let's discuss how we can create something remarkable together.
            </p>
          </div>

          {/* Contact link — arrow slides outward on hover */}
          <a
            href="#"
            onMouseEnter={(e) => (e.currentTarget.style.gap = '16px')}
            onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
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
          >
            CONTACT <span>→</span>
          </a>
        </div>
      </section>

      {/* Responsive: single column below 768px */}
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
