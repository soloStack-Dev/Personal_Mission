# Web Building Prompt — Byte_Foundry__ Portfolio Website

## Project Overview
Build a single-page portfolio website for "Byte_Foundry__" — a minimalist, 
high-performance personal portfolio for a developer/designer specializing 
in code and AI. The site must be fully responsive, fast, and pixel-perfect.

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

### 1. Navigation Bar (Fixed/Sticky)
- **Logo:** "STUDIO_MINIMAL" — bold, uppercase, left-aligned
- **Links:** HOME, ABOUT, BLOG, PROJECTS — right-aligned, uppercase, small font
- **CTA Button:** "RESUME →" — white background, black text, rightmost position
- **Behavior:** Transparent on hero, slight blur/darken on scroll

### 2. Hero Section
- **Layout:** Two-column grid (image left ~40%, content right ~60%)
- **Image:** Black & white portrait photo, left-aligned with padding
- **Headline:** "Building the Future with Code & AI" — massive bold typography
- **Subheadline:** 2-3 lines of body text describing the mission
- **CTA Buttons:** 
  - "VIEW WORK" — white bg, black text, no border
  - "GET IN TOUCH" — transparent bg, white border, white text
- **Background:** Pure black (#000000)

### 3. Services / Expertise Grid (2x2 Bento Layout)
- **Card 1 — Technical Strategy:** Dark gray card, white title top-left, 
  description bottom-left
- **Card 2 — AI Models:** White card, black title top-left, 
  abstract circular icon centered-bottom
- **Card 3 — UX Engineering:** Dark gray card with subtle border, 
  title top-left, description bottom-left
- **Card 4 — Precision:** Full-bleed dark server/hardware image with 
  "PRECISION." text overlay (centered, white, uppercase)
- **Grid:** 2 columns, equal height rows, 16-24px gap

### 4. Selected Works (Project List)
- **Header:** "Selected Works" left, "(01—04)" right
- **List Items:** 4 rows, each containing:
  - Index number (01, 02, 03, 04) — small, muted
  - Project name — bold, large
  - Category tags — uppercase, small, right-aligned group
  - Year — rightmost, muted
- **Dividers:** Subtle horizontal lines between items
- **Hover:** Row highlights, slight background shift or underline animation

### 5. CTA / Newsletter Section
- **Layout:** Two columns
- **Left:** "Think we should work together?" — large bold headline
  + subtext about freelance availability + email link
- **Right:** "STAY UPDATED" label + email input field with arrow submit button
- **Background:** Pure black, same as hero

### 6. Footer
- **Layout:** Two columns
- **Left:** "STUDIO_MINIMAL" logo + "© 2024 STUDIO_MINIMAL. ALL RIGHTS RESERVED."
- **Right:** Social links — LinkedIn, GitHub, Twitter, Email
- **Background:** Slightly lighter dark (#0a0a0a or #111111)

---

## Responsive Requirements
- **Desktop (1280px+):** Full layout as described
- **Tablet (768px-1279px):** 2-column grids collapse to stacked where needed, 
  reduce font sizes
- **Mobile (&lt;768px):** Single column, hamburger menu, stacked hero, 
  full-width cards, reduced padding

---

## Performance Requirements
- Lighthouse score: 95+ on all metrics
- Lazy load images below the fold
- Use `next/image` or optimized image formats (WebP/AVIF)
- Minimize CLS — fixed dimensions for images
- Smooth scroll behavior site-wide

---

## Accessibility
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratio 4.5:1 minimum
- Focus states visible on all interactive elements

---

## Animation & Interaction Specs
- **Page Load:** Fade-in from opacity 0, staggered by section (0.1s delay each)
- **Nav Links:** Underline slide-in on hover
- **Hero Text:** Staggered reveal (headline → subheadline → buttons)
- **Cards:** Subtle scale (1.02) + shadow on hover
- **Project Rows:** Background color shift + text indent on hover
- **Buttons:** Smooth background/border color transition (200-300ms ease)
- **Scroll:** Optional parallax on hero image (subtle, 0.1 factor)

---

## Assets Needed
- Hero portrait (B&W, high-res, ~600x800px)
- Server/hardware image for Precision card (dark, moody, ~800x600px)
- AI Models abstract icon (SVG, circular split design)
- Resume PDF (linked from nav button)

---

## Deliverables
- Source code (GitHub repo)
- Live deployment (Vercel/Netlify)
- README with setup instructions