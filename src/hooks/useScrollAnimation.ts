import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Only register ScrollTrigger in the browser — during server-side
// prerendering there is no DOM, and the plugin must not initialize.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Shared scroll-animation helpers used by every page.
 *
 * All three follow the same pattern:
 * 1. return a `ref` the page attaches to a wrapper element,
 * 2. on mount, hide the child elements with gsap,
 * 3. register a ScrollTrigger that animates them back into view
 *    the first time the element scrolls into the viewport.
 *
 * `gsap.context` scopes the animations to the wrapper element, so
 * cleanup is a single `ctx.revert()` that kills tweens + triggers.
 */

interface FadeOptions {
  delay?: number
  duration?: number
  y?: number
  stagger?: number
}

/**
 * Fades in either the wrapper itself or its `[data-animate]` children
 * when the wrapper enters the viewport. Used for whole-section reveals.
 */
export function useScrollFadeIn<T extends HTMLElement = HTMLDivElement>(options?: FadeOptions) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion: never hide content for those users
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Animate explicit [data-animate] children if present, otherwise the wrapper itself
    const children = el.querySelectorAll<HTMLElement>('[data-animate]')
    const targets = children.length > 0 ? Array.from(children) : [el]

    // 1. Start hidden (transparent + shifted down)
    gsap.set(targets, { opacity: 0, y: options?.y ?? 30 })

    let revealed = false
    const reveal = () => {
      if (revealed) return
      revealed = true
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.6,
        ease: 'power2.out',
        stagger: options?.stagger ?? 0.1,
        delay: options?.delay ?? 0,
      })
    }

    // 2. Reveal once when the element reaches 85% down the viewport
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: reveal,
      })
    }, el)

    // 3. Safety net: reveal shortly after load even if the section is never
    //    scrolled into view (crawlers don't scroll). Keeps all content
    //    visible in search-engine snapshots.
    const timer = window.setTimeout(reveal, 600)

    return () => {
      window.clearTimeout(timer)
      ctx.revert()
    }
  }, [options?.delay, options?.duration, options?.y, options?.stagger])

  return ref
}

/**
 * Staggers in the direct children of the wrapper (e.g. grid cards or list rows).
 * Each child fades up one after the other for a cascade effect.
 */
export function useStaggerChildren<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion: never hide content for those users
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // The direct children are the "cards" we want to cascade in
    const children = Array.from(el.children) as HTMLElement[]
    if (!children.length) return

    gsap.set(children, { opacity: 0, y: 20 })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.08,
          })
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}

/**
 * Hero entrance sequence — animates the hero section's pieces in a
 * timed order: image first, then headline words, subtitle and buttons.
 *
 * The page marks each piece with a `data-hero-*` attribute:
 *   data-hero-image    portrait image
 *   data-hero-headline headline (or each `.word` inside it)
 *   data-hero-sub      supporting paragraph
 *   data-hero-buttons  call-to-action row
 */
export function useHeroAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion: never hide content for those users
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Grab every animated piece inside the hero section
    const image = el.querySelector<HTMLElement>('[data-hero-image]')
    const headline = el.querySelector<HTMLElement>('[data-hero-headline]')
    const sub = el.querySelector<HTMLElement>('[data-hero-sub]')
    const buttons = el.querySelector<HTMLElement>('[data-hero-buttons]')

    // If the headline contains `.word` spans, animate each word separately
    const words = headline ? Array.from(headline.querySelectorAll<HTMLElement>('.word')) : []
    const headlineTargets = words.length > 0 ? words : headline ? [headline] : []

    const allTargets = [image, ...headlineTargets, sub, buttons].filter(Boolean) as HTMLElement[]

    // Start everything hidden
    gsap.set(allTargets, { opacity: 0, y: 20 })

    const ctx = gsap.context(() => {
      // Timeline plays each piece at its own time offset (seconds)
      const tl = gsap.timeline({ delay: 0.15 })

      if (image) {
        // Image: fade in with a gentle zoom-out
        tl.fromTo(
          image,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
          0,
        )
      }

      if (headlineTargets.length > 0) {
        // Headline words slide up one by one
        tl.fromTo(
          headlineTargets,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
          0.15,
        )
      }

      if (sub) {
        tl.fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.5)
      }

      if (buttons) {
        tl.fromTo(buttons, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.7)
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
