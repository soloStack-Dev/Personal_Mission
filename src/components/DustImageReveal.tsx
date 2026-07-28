import { useEffect, useRef, useState } from 'react'

const IMAGES = [
  '/userImages/Faleel.jpeg',
  '/userImages/stackasserts/bhvrstack.png',
  '/userImages/stackasserts/Codemode.jpg',
  '/userImages/stackasserts/thought.jpg',
]

const PARTICLE_SIZE = 3
const GAP = 4
const FORM_DURATION = 60
const HOLD_DURATION = 90
const DISSOLVE_DURATION = 60
const CYCLE_FRAMES = FORM_DURATION + HOLD_DURATION + DISSOLVE_DURATION

interface Particle {
  tx: number
  ty: number
  x: number
  y: number
  vx: number
  vy: number
  r: number
  g: number
  b: number
  a: number
}

function sampleImage(img: HTMLImageElement, canvasW: number, canvasH: number): Particle[] {
  const offscreen = document.createElement('canvas')
  offscreen.width = canvasW
  offscreen.height = canvasH
  const offCtx = offscreen.getContext('2d')!
  const scale = Math.min(canvasW / img.width, canvasH / img.height)
  const w = img.width * scale
  const h = img.height * scale
  const ox = (canvasW - w) / 2
  const oy = (canvasH - h) / 2
  offCtx.drawImage(img, ox, oy, w, h)
  const data = offCtx.getImageData(0, 0, canvasW, canvasH).data
  const particles: Particle[] = []

  for (let y = 0; y < canvasH; y += GAP) {
    for (let x = 0; x < canvasW; x += GAP) {
      const i = (y * canvasW + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const a = data[i + 3]
      if (a < 30) continue
      const gray = 0.299 * r + 0.587 * g + 0.114 * b
      const bright = gray * (a / 255)
      particles.push({
        tx: x,
        ty: y,
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        r: bright,
        g: bright,
        b: bright,
        a: Math.min(a, 220),
      })
    }
  }
  return particles
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function DustImageReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [seqNum, setSeqNum] = useState(1)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')!
    let animId = 0
    let particles: Particle[] = []
    let loadedImages: HTMLImageElement[] = []
    let currentIdx = 0
    let frame = 0
    let started = false
    let cW = 400
    let cH = 400

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const size = Math.min(rect.width, 400)
      cW = size
      cH = size
      canvas.width = size
      canvas.height = size
    }
    resize()

    const loadAll = Promise.all(
      IMAGES.map(
        (src) =>
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => resolve(img)
            img.onerror = () => resolve(img)
            img.src = src
          })
      )
    )

    loadAll.then((imgs) => {
      loadedImages = imgs
      particles = sampleImage(imgs[0], cW, cH)
      started = true
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && started) {
          frame = 0
          if (!animId) tick()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(container)

    function tick() {
      if (!started) {
        animId = requestAnimationFrame(tick)
        return
      }

      ctx.clearRect(0, 0, cW, cH)
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, cW, cH)

      const phase = frame % CYCLE_FRAMES

      if (frame > 0 && phase === 0) {
        currentIdx = (currentIdx + 1) % IMAGES.length
        setSeqNum(currentIdx + 1)
        const newParticles = sampleImage(loadedImages[currentIdx], cW, cH)
        const minLen = Math.min(particles.length, newParticles.length)
        for (let i = 0; i < minLen; i++) {
          newParticles[i].x = particles[i].x
          newParticles[i].y = particles[i].y
          newParticles[i].vx = particles[i].vx
          newParticles[i].vy = particles[i].vy
        }
        particles = newParticles
      }

      if (phase < FORM_DURATION) {
        const t = easeInOutCubic(phase / FORM_DURATION)
        for (const p of particles) {
          p.x += (p.tx - p.x) * t * 0.12
          p.y += (p.ty - p.y) * t * 0.12
          p.x += (Math.random() - 0.5) * (1 - t) * 2
          p.y += (Math.random() - 0.5) * (1 - t) * 2
        }
      } else if (phase < FORM_DURATION + HOLD_DURATION) {
        for (const p of particles) {
          p.x += (Math.random() - 0.5) * 0.3
          p.y += (Math.random() - 0.5) * 0.3
          p.x += (p.tx - p.x) * 0.05
          p.y += (p.ty - p.y) * 0.05
        }
      } else {
        const dissolvePhase = phase - FORM_DURATION - HOLD_DURATION
        const t = easeInOutCubic(dissolvePhase / DISSOLVE_DURATION)
        for (const p of particles) {
          p.vx += (Math.random() - 0.5) * 3
          p.vy += (Math.random() - 0.5) * 3 - 0.5
          p.vx *= 0.96
          p.vy *= 0.96
          p.x += p.vx * t * 1.5
          p.y += p.vy * t * 1.5
          p.a = Math.max(0, 220 * (1 - t))
        }
      }

      for (const p of particles) {
        if (p.a < 5) continue
        ctx.fillStyle = `rgba(${Math.round(p.r)},${Math.round(p.g)},${Math.round(p.b)},${p.a / 255})`
        ctx.fillRect(p.x - PARTICLE_SIZE / 2, p.y - PARTICLE_SIZE / 2, PARTICLE_SIZE, PARTICLE_SIZE)
      }

      frame++
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)

    const ro = new ResizeObserver(resize)
    ro.observe(container)

    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
      ro.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '400px',
        aspectRatio: '1',
        position: 'relative',
        border: '1px solid #1a1a1a',
        background: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          filter: 'grayscale(100%) contrast(1.1)',
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
        color: '#444',
        pointerEvents: 'none',
      }}>
        DUST_REVEAL // SEQUENCE_{String(seqNum).padStart(2, '0')}
      </span>
    </div>
  )
}
