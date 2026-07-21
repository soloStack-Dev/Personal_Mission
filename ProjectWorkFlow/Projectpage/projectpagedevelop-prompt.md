# Web Building Prompt — Byte_Foundry__ Projects Page

## Project Overview
Build the Projects page for "Byte_Foundry__" — a curated portfolio showcase 
featuring 4 case studies in a 2-column masonry-style grid, followed by a bold 
CTA section and a centered footer. The page emphasizes architectural imagery, 
editorial typography, and a dark, gallery-like atmosphere.

---

## Tech Stack
- **Framework:** React (Next.js 14 App Router) or plain HTML/CSS/JS
- **Styling:** Tailwind CSS or custom CSS with CSS variables
- **Animations:** Framer Motion (React) or GSAP (vanilla JS)
- **Fonts:** Inter or similar geometric sans-serif
- **Icons:** Lucide React or Heroicons
- **Build:** Vite or Next.js

---

## Page Structure & Sections

### 1. Navigation Bar (Fixed/Sticky — Shared)
- **Logo:** "Byte_Foundry__" — bold, uppercase, left-aligned
- **Links:** HOME, ABOUT, BLOG, PROJECTS (active/highlighted) — right-aligned, uppercase
- **CTA Button:** "RESUME →" — white background, black text, rightmost
- **Active State:** PROJECTS link has underline or brighter color
- **Background:** Transparent on load, slight blur/darken on scroll

### 2. Hero / Page Header
- **Headline:** "SELECTED" / "WORKS" — massive bold uppercase, stacked 2 lines
- **Subheadline:** 2-3 lines about architectural logic and minimalist design systems
- **Background:** Very dark gray (#0a0a0a or #0f0f0f) — slightly lighter than pure black
- **Padding:** 120px top, 48px bottom

### 3. Projects Grid (2×2 Masonry-Style)
- **Layout:** 2-column grid, equal width columns, 24-32px gap
- **Cards:** 4 project cards total

#### Card 1 — MONOLITH OS
- **Image:** B&W architectural photo (modern angular building, dramatic angle)
- **Category/Year:** "ARCHITECTURAL SYSTEM / 2024" — small, uppercase, muted
- **Title:** "MONOLITH OS" — large, bold, uppercase
- **Description:** 2-3 lines about structural integrity and brutalist geometry
- **CTA:** "VIEW CASE STUDY" — small, uppercase, bordered button
- **Card Background:** Transparent (inherits page bg)

#### Card 2 — VERTEX CAPITAL
- **Image:** B&W architectural photo (tall geometric tower, upward angle)
- **Category/Year:** "FINTECH / 2023" — small, uppercase, muted
- **Title:** "VERTEX CAPITAL" — large, bold, uppercase
- **Description:** 2 lines about secure minimal dashboard for trading
- **CTA:** "VIEW CASE STUDY" — small, uppercase, bordered button

#### Card 3 — ETHER AUDIO
- **Image:** B&W close-up industrial photo (sleek device, minimal)
- **Category/Year:** "INDUSTRIAL DESIGN / 2023" — small, uppercase, muted
- **Title:** "ETHER AUDIO" — large, bold, uppercase
- **Description:** 2-3 lines about sound system and tactile feedback
- **CTA:** "VIEW CASE STUDY" — small, uppercase, bordered button

#### Card 4 — NEXUS PORTAL
- **Image:** B&W spiral staircase photo (dramatic downward perspective)
- **Category/Year:** "WEB PLATFORM / 2022" — small, uppercase, muted
- **Title:** "NEXUS PORTAL" — large, bold, uppercase
- **Description:** 2 lines about experimental portfolio platform
- **CTA:** "VIEW CASE STUDY" — small, uppercase, bordered button

#### Card Structure (All):
- Image: Full-width within card, aspect ratio ~16:10 or ~3:2, no border-radius
- Content below image: 24px padding-top
- Category: 11px, uppercase, #666666, margin-bottom 8px
- Title: 28-32px, weight 700, uppercase, white, margin-bottom 12px
- Description: 14px, #aaaaaa, line-height 1.6, max-width 90%
- CTA Button: 11px, uppercase, weight 600, transparent bg, 1px solid #555555 border, padding 8px 16px, no border-radius

### 4. CTA Section
- **Layout:** Two columns (text left, action right)
- **Left:**
  - Headline: "LETS BUILD SOMETHING" / "SUBSTANTIAL." — large, bold, uppercase, stacked
  - Subtext: "Available for select freelance engagements and creative direction." — 14px, muted
- **Right:**
  - "CONTACT →" — large, bold, uppercase, white, with arrow
  - Positioned bottom-right of the section
- **Background:** Same dark gray as page
- **Padding:** 80px vertical, significant top margin from grid

### 5. Footer (Centered Variant)
- **Layout:** Three columns, evenly distributed
- **Left:** "STUDIO_MINIMAL" logo — bold, uppercase
- **Center:** Social links — LinkedIn, GitHub, Twitter, Email — spaced evenly
- **Right:** "© 2024 STUDIO_MINIMAL. ALL RIGHTS RESERVED." — small, muted
- **Background:** Same dark gray as page (#0a0a0a or #0f0f0f)
- **Padding:** 32px vertical

---

## Responsive Requirements
- **Desktop (1280px+):** 2-column grid, side-by-side CTA
- **Tablet (768px-1279px):** 2-column grid maintained, smaller images
- **Mobile (&lt;768px):** Single column grid, stacked CTA, footer stacks vertically

---

## Performance Requirements
- Lighthouse score: 95+ on all metrics
- Lazy load project images (below the fold)
- Optimize images (WebP/AVIF, responsive srcset)
- Smooth scroll behavior
- Minimize CLS — fixed image aspect ratios

---

## Accessibility
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratio 4.5:1 minimum
- Focus states visible on all interactive elements
- Alt text for all project images

---

## Animation & Interaction Specs
- **Page Load:** Fade-in from opacity 0, staggered by section
- **Headline:** Staggered line reveal (SELECTED → WORKS)
- **Project Cards:** Staggered fade-in + translateY(40px→0), 0.15s delay per card
- **Images:** Subtle scale(1.02→1) on load, optional parallax on scroll
- **Card Hover:**
  - Image: scale(1.03) with overflow hidden
  - Title: slight brightness increase
  - CTA Button: border brightens to #ffffff, text brightens
- **CTA "CONTACT →":** Arrow translateX(0→4px) on hover
- **Nav Links:** Underline slide-in on hover

---

## Assets Needed
- 4 B&W architectural/industrial photos (high-res, ~800x600px each)
  - Angular modern building
  - Geometric tower
  - Sleek industrial device
  - Spiral staircase
- Resume PDF (linked from nav)

---

## Deliverables
- Source code (GitHub repo)
- Live deployment (Vercel/Netlify)
- README with setup instructions