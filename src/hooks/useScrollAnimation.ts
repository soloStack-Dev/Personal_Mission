import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollFadeIn<T extends HTMLElement = HTMLDivElement>(options?: {
  delay?: number
  duration?: number
  y?: number
  stagger?: number
}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll<HTMLElement>('[data-animate]')
    const targets = children.length > 0 ? Array.from(children) : [el]

    gsap.set(targets, { opacity: 0, y: options?.y ?? 30 })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: options?.duration ?? 0.6,
            ease: 'power2.out',
            stagger: options?.stagger ?? 0.1,
            delay: options?.delay ?? 0,
          })
        },
      })
    }, el)

    return () => {
      ctx.revert()
    }
  }, [options?.delay, options?.duration, options?.y, options?.stagger])

  return ref
}

export function useStaggerChildren<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

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

    return () => {
      ctx.revert()
    }
  }, [])

  return ref
}

export function useHeroAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const image = el.querySelector<HTMLElement>('[data-hero-image]')
    const headline = el.querySelector<HTMLElement>('[data-hero-headline]')
    const sub = el.querySelector<HTMLElement>('[data-hero-sub]')
    const buttons = el.querySelector<HTMLElement>('[data-hero-buttons]')

    const words = headline ? Array.from(headline.querySelectorAll<HTMLElement>('.word')) : []
    const headlineTargets = words.length > 0 ? words : headline ? [headline] : []

    const allTargets = [image, ...headlineTargets, sub, buttons].filter(Boolean) as HTMLElement[]

    gsap.set(allTargets, { opacity: 0, y: 20 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })

      if (image) {
        tl.fromTo(image,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
          0
        )
      }

      if (headlineTargets.length > 0) {
        tl.fromTo(headlineTargets,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
          0.15
        )
      }

      if (sub) {
        tl.fromTo(sub,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          0.5
        )
      }

      if (buttons) {
        tl.fromTo(buttons,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          0.7
        )
      }
    }, el)

    return () => {
      ctx.revert()
    }
  }, [])

  return ref
}
