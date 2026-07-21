# Web Building Prompt — Byte_Foundry__ About Page

## Project Overview
Build the About page for "Byte_Foundry__" — a continuation of the minimalist 
dark portfolio. This page tells the founder's story through philosophy, 
expertise focus, and career timeline. Must match the home page's dark 
aesthetic and technical precision.

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

### 1. Navigation Bar (Fixed/Sticky — Shared with Home)
- **Logo:** "Byte_Foundry__" — bold, uppercase, left-aligned
- **Links:** HOME, ABOUT (active/highlighted), BLOG, PROJECTS — right-aligned, uppercase
- **CTA Button:** "RESUME →" — white background, black text, rightmost
- **Active State:** ABOUT link has underline or slightly brighter color
- **Behavior:** Transparent on load, slight blur/darken on scroll

### 2. Hero / Philosophy Section
- **Layout:** Two-column grid (image left ~45%, content right ~55%)
- **Image:** Black & white editorial photo of person at desk with laptop, 
  large window with city skyline background
- **Image Caption:** "WORKSPACE_01 // SYSTEM_ALPHA" — small, muted, bottom-left of image
- **Content Right:**
  - **Label:** "PHILOSOPHY" — uppercase, small, muted gray, letter-spaced
  - **Headline:** "The Journey" — massive bold typography, stacked 2 lines
  - **Body Paragraph 1:** Regular weight, ~3 lines about engineering as art
  - **Body Paragraph 2:** Italicized, ~3 lines about AI and human experience intersection
  - **Section Label:** "EXPERTISE FOCUS" — uppercase, small, muted gray
  - **Expertise Grid:** 2 columns
    - "01" + "SCALABLE SYSTEMS"
    - "02" + "MACHINE LEARNING"
- **Background:** Very dark gray (#0a0a0a or #0f0f0f) — slightly lighter than pure black

### 3. Timeline Section
- **Header:** "TIMELINE" — massive bold uppercase, left-aligned
- **Date Range:** "2018 — PRESENT" — small, muted, right-aligned
- **Timeline Items (3 rows):**
  - **Row 1:**
    - Index: "01"
    - Role: "Tech Lead" — small, muted, uppercase
    - Company: "Neural Architects" — large, bold
    - Description: Right-aligned, 1-2 lines about LLM integrations
  - **Row 2:**
    - Index: "02"
    - Role: "Backend Engineer" — small, muted, uppercase
    - Company: "CloudScale Dynamics" — large, bold
    - Description: Right-aligned, 1-2 lines about distributed databases
  - **Row 3:**
    - Index: "03"
    - Role: "Software Architect" — small, muted, uppercase
    - Company: "Studio Minimal" — large, bold
    - Description: Right-aligned, 1-2 lines about consulting
- **Dividers:** No visible dividers — spacing creates separation
- **Background:** Same dark gray as hero section

### 4. Footer (Shared with Home)
- **Layout:** Three columns (different from home page footer!)
- **Left:** "STUDIO_MINIMAL" logo — bold, uppercase
- **Center:** Social links — LinkedIn, GitHub, Twitter, Email — spaced evenly
- **Right:** "© 2024 STUDIO_MINIMAL. ALL RIGHTS RESERVED." — small, muted
- **Background:** Same dark gray as page (#0a0a0a or #0f0f0f)

---

## Responsive Requirements
- **Desktop (1280px+):** Full two-column layout, timeline 3-column feel
- **Tablet (768px-1279px):** Image and content stack, timeline items compress
- **Mobile (&lt;768px):** Single column, image full-width, expertise focus stacks, 
  timeline descriptions move below company names

---

## Performance Requirements
- Lighthouse score: 95+ on all metrics
- Lazy load timeline section
- Optimize B&W images (WebP/AVIF)
- Smooth scroll behavior
- Minimize CLS

---

## Accessibility
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratio 4.5:1 minimum
- Focus states visible

---

## Animation & Interaction Specs
- **Page Load:** Fade-in from opacity 0, staggered by section
- **Philosophy Label:** Fade in first, then headline, then paragraphs
- **Image:** Subtle parallax or scale on scroll
- **Expertise Numbers:** Count-up or fade-in stagger (01 → 02)
- **Timeline Items:** Staggered reveal on scroll (each row 0.15s delay)
- **Nav Links:** Underline slide-in on hover
- **Social Links:** Underline or opacity shift on hover
- **Resume Button:** Smooth hover invert

---

## Assets Needed
- Workspace editorial photo (B&W, high-res, ~600x800px, city skyline window)
- Resume PDF (linked from nav)

---

## Deliverables
- Source code (GitHub repo)
- Live deployment (Vercel/Netlify)
- README with setup instructions