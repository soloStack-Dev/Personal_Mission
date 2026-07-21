import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { z } from 'zod'
import { useScrollFadeIn, useStaggerChildren, useHeroAnimation } from '../hooks/useScrollAnimation'

gsap.registerPlugin(ScrollTrigger)

const emailSchema = z.string().email('Please enter a valid email address')

const skills = [
  { name: 'HTML & CSS', image: '/skillsImage/htmlandcss.jpg' },
  { name: 'JavaScript', image: '/skillsImage/javascript.jpg' },
  { name: 'TypeScript', image: '/skillsImage/typescript.jpg' },
  { name: 'React', image: '/skillsImage/react.jpg' },
  { name: 'React Router', image: '/skillsImage/reactRouter.jpg' },
  { name: 'Tailwind CSS', image: '/skillsImage/TailwindCss.jpg' },
  { name: 'Material UI', image: '/skillsImage/MaterialUI.jpg' },
  { name: 'Vite', image: '/skillsImage/Vite.png' },
  { name: 'Bun', image: '/skillsImage/Bun.png' },
  { name: 'Hono', image: '/skillsImage/Hono.png' },
  { name: 'Drizzle ORM', image: '/skillsImage/DrizzleORM.png' },
  { name: 'MySQL', image: '/skillsImage/MySQL.jpg' },
  { name: 'SQL', image: '/skillsImage/SQL.jpg' },
  { name: 'MongoDB', image: '/skillsImage/MongoDB.jpg' },
  { name: 'Docker', image: '/skillsImage/Docker.jpg' },
  { name: 'Git & GitHub', image: '/skillsImage/GitandGitHub.jpg' },
  { name: 'TanStack Query', image: '/skillsImage/TanstackQuery.png' },
  { name: 'Zod', image: '/skillsImage/ZodTypeValidate.jpg' },
  { name: 'Zustand', image: '/skillsImage/Zustand.png' },
  { name: 'LangChain JS', image: '/skillsImage/LangchainJS.jpg' },
  { name: 'MS Excel', image: '/skillsImage/MSExcel.jpg' },
]

const articles = [
  { date: 'MAY 2024', title: 'Scaling Vector DBs with RAG Architecture', category: 'ARCHITECTURE' },
  { date: 'APR 2024', title: 'Why React is my choice for AI Frontends', category: 'FRONTEND' },
  { date: 'MAR 2024', title: 'Dockerizing Microservices for Webhook Ops', category: 'DEVOPS' },
]

function fetchSkillImage(url: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(url)
    img.onerror = () => resolve(url)
    img.src = url
  })
}

function SkillCard({ skill }: { skill: typeof skills[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const img = imgRef.current
    if (!card || !img) return

    const handleEnter = () => {
      gsap.to(img, { filter: 'grayscale(0%) brightness(1)', duration: 0.4, ease: 'power2.out' })
      gsap.to(card, { borderColor: '#555555', y: -2, duration: 0.2, ease: 'power2.out' })
    }
    const handleLeave = () => {
      gsap.to(img, { filter: 'grayscale(100%) brightness(0.7)', duration: 0.4, ease: 'power2.out' })
      gsap.to(card, { borderColor: '#2a2a2a', y: 0, duration: 0.2, ease: 'power2.out' })
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
        background: 'var(--bg-card-dark)',
        border: '1px solid #2a2a2a',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        aspectRatio: '1/0.85',
        cursor: 'default',
        transition: 'border-color 0.2s ease',
        overflow: 'hidden',
      }}
    >
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: '8px',
      }}>
        <img
          ref={imgRef}
          src={skill.image}
          alt={skill.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'grayscale(100%) brightness(0.7)',
            transition: 'filter 0.4s ease',
            padding: '4px',
          }}
        />
      </div>
      <div style={{
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: 'var(--text-primary)',
        textAlign: 'center',
      }}>
        {skill.name}
      </div>
    </div>
  )
}

export default function BlogPage() {
  const heroRef = useHeroAnimation()
  const articlesRef = useStaggerChildren<HTMLDivElement>()
  const newsletterRef = useScrollFadeIn()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const { data: loadedSkills } = useQuery({
    queryKey: ['skills-images'],
    queryFn: async () => {
      const results = await Promise.all(
        skills.map(async (skill) => {
          await fetchSkillImage(skill.image)
          return skill
        })
      )
      return results
    },
    staleTime: 10 * 60 * 1000,
  })

  const displaySkills = loadedSkills || skills

  const handleSubscribe = () => {
    const result = emailSchema.safeParse(email)
    if (!result.success) {
      setEmailError(result.error.issues[0].message)
      return
    }
    setEmailError('')
    setSubscribed(true)
    setEmail('')
  }

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} style={{
        padding: 'var(--space-2xl) 0 var(--space-lg)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ghost Text */}
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(120px, 20vw, 280px)',
          fontWeight: 800,
          color: 'var(--ghost-text)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          Skills
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 data-hero-headline style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: 'var(--space-md)',
          }}>
            <span className="word" style={{ display: 'block' }}>Skills</span>
            <span className="word" style={{ display: 'block' }}>&</span>
            <span className="word" style={{ display: 'block' }}>Insights</span>
          </h1>

          <div data-hero-headline style={{
            width: '60px',
            height: '2px',
            background: 'var(--text-primary)',
            marginBottom: 'var(--space-md)',
          }} />

          <p data-hero-sub style={{
            fontSize: '16px',
            lineHeight: 1.6,
            color: 'var(--text-body)',
            maxWidth: '520px',
          }}>
            Exploring the intersection of web architecture, artificial intelligence,
            and database systems. A collection of technologies and insights that shape
            modern software development.
          </p>
        </div>
      </section>

      {/* Skills Grid */}
      <section style={{
        padding: '0 0 var(--space-xl)',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: '8px',
          }}>
            {displaySkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section style={{
        padding: 'var(--space-xl) 0',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 'var(--space-lg)',
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
            }}>
              Latest Insights
            </h2>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: 'var(--text-muted-dark)',
              textTransform: 'uppercase',
            }}>
              / 003 ARTICLES
            </span>
          </div>

          <div ref={articlesRef}>
            {articles.map((article) => (
              <div
                key={article.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px 0',
                  borderBottom: '1px solid #222',
                  cursor: 'pointer',
                  transition: 'background 0.25s ease',
                  gap: '24px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-secondary)'
                  const title = e.currentTarget.querySelector('.article-title') as HTMLElement
                  if (title) title.style.transform = 'translateX(8px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  const title = e.currentTarget.querySelector('.article-title') as HTMLElement
                  if (title) title.style.transform = 'translateX(0)'
                }}
              >
                <span style={{
                  fontSize: '11px',
                  color: 'var(--text-muted-dark)',
                  minWidth: '80px',
                }}>
                  {article.date}
                </span>
                <span className="article-title" style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  flex: 1,
                  transition: 'transform 0.25s ease',
                }}>
                  {article.title}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-subtle)',
                  padding: '4px 12px',
                }}>
                  {article.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section ref={newsletterRef} style={{
        padding: 'var(--space-xl) 0',
      }}>
        <div className="container">
          <div style={{
            background: 'var(--bg-card-dark)',
            padding: '64px var(--space-lg)',
            textAlign: 'center',
          }}>
            <span style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '16px',
            }}>
              STAY UPDATED
            </span>

            <h3 style={{
              fontSize: 'clamp(22px, 2.5vw, 32px)',
              fontWeight: 700,
              maxWidth: '480px',
              margin: '0 auto var(--space-md)',
              lineHeight: 1.3,
            }}>
              Deep dives into tech sent to your inbox monthly.
            </h3>

            <div style={{
              display: 'flex',
              maxWidth: '400px',
              margin: '0 auto',
              border: '1px solid var(--border-subtle)',
              background: '#111',
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError('')
                }}
                placeholder="YOUREMAIL.COM"
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  padding: '16px',
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  outline: 'none',
                  textTransform: 'uppercase',
                }}
              />
              <button
                onClick={handleSubscribe}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  transition: 'opacity 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                SUBSCRIBE
              </button>
            </div>

            {emailError && (
              <p style={{
                color: '#ff4444',
                fontSize: '12px',
                marginTop: '12px',
              }}>
                {emailError}
              </p>
            )}

            {subscribed && (
              <p style={{
                color: '#44ff44',
                fontSize: '12px',
                marginTop: '12px',
              }}>
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
