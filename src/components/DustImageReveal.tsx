import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * DustImageReveal — a canvas animation that turns images into a cloud
 * of "dust" particles, which periodically morph into the next image.
 *
 * How it works:
 * 1. Every image is preloaded once.
 * 2. Each image is sampled on an offscreen canvas: every N pixels becomes
 *    one particle, carrying its target position + color.
 * 3. An animation loop then plays a repeating cycle per image:
 *      FORM     (60 frames) particles fly from random spots to their target,
 *      HOLD     (90 frames) the picture stays assembled,
 *      DISSOLVE (60 frames) particles scatter away.
 *    When the cycle restarts the next image is loaded and the loop repeats.
 * 4. On hover / touch the particles render in their ORIGINAL colors and the
 *    animation runs at half speed; normally everything is grayscale.
 *
 * Timing constants (in frames @ ~60fps):
 */
const PARTICLE_SIZE = 3 // square size of one particle in px
const GAP = 4           // sample one pixel every GAP px when reading the image
const FORM_DURATION = 60
const HOLD_DURATION = 90
const DISSOLVE_DURATION = 60
const CYCLE_FRAMES = FORM_DURATION + HOLD_DURATION + DISSOLVE_DURATION

/** Images cycled through by the reveal animation. */
const IMAGES = [
  '/userImages/Faleel.jpeg',
  '/userImages/stackasserts/bhvrstack.png',
  '/userImages/stackasserts/Codemode.jpg',
  '/userImages/stackasserts/thought.jpg',
  '/skillsImage/react.jpg',
  '/skillsImage/typescript.jpg',
  '/skillsImage/javascript.jpg',
  '/skillsImage/htmlandcss.jpg',
  '/skillsImage/TailwindCss.jpg',
  '/skillsImage/Vite.png',
  '/skillsImage/MaterialUI.jpg',
  '/skillsImage/Zustand.png',
  '/skillsImage/TanstackQuery.png',
  '/skillsImage/ZodTypeValidate.jpg',
  '/skillsImage/reactRouter.jpg',
  '/skillsImage/LangchainJS.jpg',
  '/skillsImage/MongoDB.jpg',
  '/skillsImage/MySQL.jpg',
  '/skillsImage/SQL.jpg',
  '/skillsImage/MSExcel.jpg',
  '/skillsImage/DrizzleORM.png',
  '/skillsImage/Docker.jpg',
  '/skillsImage/GitandGitHub.jpg',
  '/skillsImage/Hono.png',
  '/skillsImage/Bun.png',
]

/**
 * One particle of the animation.
 * - tx/ty   : target position (where it sits in the formed image)
 * - x/y     : current position
 * - vx/vy   : current velocity (used while dissolving)
 * - r/g/b   : grayscale color (brightness of the sampled pixel)
 * - a       : current alpha
 * - or/og/ob: ORIGINAL colors, used when the user hovers the canvas
 */
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
  or: number
  og: number
  ob: number
}

/**
 * Reads an image and converts it into a particle list.
 * Each particle = one sampled pixel, colored by its brightness.
 */
function sampleImage(img: HTMLImageElement, canvasW: number, canvasH: number): Particle[] {
  // Draw the image centered + scaled to fit the canvas, on an offscreen canvas
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

  // Read the raw RGBA pixel data of the drawn image
  const data = offCtx.getImageData(0, 0, canvasW, canvasH).data
  const particles: Particle[] = []

  // Walk through the image every GAP pixels and keep the opaque ones
  for (let y = 0; y < canvasH; y += GAP) {
    for (let x = 0; x < canvasW; x += GAP) {
      const i = (y * canvasW + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const a = data[i + 3]
      if (a < 30) continue // skip fully transparent pixels

      // Grayscale = perceived brightness of the pixel
      const gray = 0.299 * r + 0.587 * g + 0.114 * b
      const bright = gray * (a / 255)

      // Start the particle at a random position with a random velocity
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
        or: r,
        og: g,
        ob: b,
      })
    }
  }
  return particles
}

/** Standard easing: slow start + slow end for a smooth drift. */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Component — the visible part is just a canvas + a status label.
 * All the animation lives inside one `useEffect` so it never re-runs.
 */
export default function DustImageReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // React state only for the UI label ("SEQUENCE_xx" + hover styling).
  // The hot animation loop reads the mirrored refs instead, to avoid re-renders.
  const [seqNum, setSeqNum] = useState(1)
  const [active, setActive] = useState(false)
  const activeRef = useRef(false)

  /** Hover/touch entered — show original colors + half speed. */
  const onEnter = useCallback(() => {
    activeRef.current = true
    setActive(true)
    if (canvasRef.current) canvasRef.current.style.filter = 'contrast(1.1)'
  }, [])

  /** Hover/touch left — back to grayscale. */
  const onLeave = useCallback(() => {
    activeRef.current = false
    setActive(false)
    if (canvasRef.current) canvasRef.current.style.filter = 'grayscale(100%) contrast(1.1)'
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')!

    // Mutable animation state (all local to the effect)
    let animId = 0
    let particles: Particle[] = []
    let loadedImages: HTMLImageElement[] = []
    let currentIdx = 0
    let frame = 0
    let started = false
    let cW = 400
    let cH = 400
    let skipFrame = false // used to halve speed while hovered

    /** Size the canvas square (max 400px) to match its container. */
    const resize = () => {
      const rect = container.getBoundingClientRect()
      const size = Math.min(rect.width, 400)
      cW = size
      cH = size
      canvas.width = size
      canvas.height = size
    }
    resize()

    // Preload every image once, then sample the first one to start the loop
    const loadAll = Promise.all(
      IMAGES.map(
        (src) =>
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => resolve(img)
            img.onerror = () => resolve(img) // even failed loads resolve so the loop survives
            img.src = src
          }),
      ),
    )
    loadAll.then((imgs) => {
      loadedImages = imgs
      particles = sampleImage(imgs[0], cW, cH)
      started = true
    })

    // Start / keep the loop running only while the canvas is on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && started) {
          frame = 0
          if (!animId) tick()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(container)

    /** The main animation loop — runs every animation frame. */
    function tick() {
      // Wait until images are loaded before drawing anything
      if (!started) {
        animId = requestAnimationFrame(tick)
        return
      }

      const isHovered = activeRef.current

      // While hovered, render every OTHER frame → animation at half speed
      if (isHovered) {
        skipFrame = !skipFrame
        if (skipFrame) {
          animId = requestAnimationFrame(tick)
          return
        }
      }

      // Clear + paint the solid background
      ctx.clearRect(0, 0, cW, cH)
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, cW, cH)

      const phase = frame % CYCLE_FRAMES

      // New cycle: advance to the next image, keeping the particles'
      // current position so the old image visually morphs into the new one
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

      // ---- Move particles depending on the current phase ----

      // FORM: drift from the random start point toward the target,
      // with random jitter that shrinks as the image assembles
      if (phase < FORM_DURATION) {
        const t = easeInOutCubic(phase / FORM_DURATION)
        for (const p of particles) {
          p.x += (p.tx - p.x) * t * 0.12
          p.y += (p.ty - p.y) * t * 0.12
          p.x += (Math.random() - 0.5) * (1 - t) * 2
          p.y += (Math.random() - 0.5) * (1 - t) * 2
        }
      }
      // HOLD: image is formed — tiny idle shimmer around each target
      else if (phase < FORM_DURATION + HOLD_DURATION) {
        for (const p of particles) {
          p.x += (Math.random() - 0.5) * 0.3
          p.y += (Math.random() - 0.5) * 0.3
          p.x += (p.tx - p.x) * 0.05
          p.y += (p.ty - p.y) * 0.05
        }
      }
      // DISSOLVE: accelerate particles outward + fade them out
      else {
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

      // ---- Draw every visible particle ----
      for (const p of particles) {
        if (p.a < 5) continue
        // Hovered → true colors; otherwise grayscale brightness
        ctx.fillStyle = isHovered
          ? `rgba(${p.or},${p.og},${p.ob},${p.a / 255})`
          : `rgba(${Math.round(p.r)},${Math.round(p.g)},${Math.round(p.b)},${p.a / 255})`
        ctx.fillRect(p.x - PARTICLE_SIZE / 2, p.y - PARTICLE_SIZE / 2, PARTICLE_SIZE, PARTICLE_SIZE)
      }

      frame++
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)

    // Recompute the canvas size if the container resizes (responsive layout)
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    // Full cleanup: stop the loop and disconnect both observers
    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
      ro.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
      style={{
        width: '100%',
        maxWidth: '400px',
        aspectRatio: '1',
        position: 'relative',
        border: active ? '1px solid #333' : '1px solid #1a1a1a',
        background: '#0a0a0a',
        overflow: 'hidden',
        transition: 'border-color 0.6s ease',
        cursor: 'pointer',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          filter: 'grayscale(100%) contrast(1.1)',
          transition: 'filter 0.8s ease',
        }}
      />

      {/* Status label: which image is currently forming */}
      <span
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: active ? '#888' : '#444',
          pointerEvents: 'none',
          transition: 'color 0.6s ease',
        }}
      >
        {active ? 'LIVE_COLOR // ' : 'DUST_REVEAL // '}SEQUENCE_{String(seqNum).padStart(2, '0')}
      </span>
    </div>
  )
}
