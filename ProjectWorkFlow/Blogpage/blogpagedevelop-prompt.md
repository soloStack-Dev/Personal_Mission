# Web Building Prompt — Byte_Foundry__ Blog Page

## Project Overview
Build the Blog page for "Byte_Foundry__" — a dark, technical blog showcasing 
skills, insights, and featured articles. The page features a unique "keyboard 
grid" skills section, a featured article card, a latest insights list, and a 
newsletter subscription. Must maintain the minimalist dark aesthetic.

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
- **Links:** HOME, ABOUT, BLOG (active/highlighted), PROJECTS — right-aligned, uppercase
- **CTA Button:** "RESUME →" — white background, black text, rightmost
- **Active State:** BLOG link has underline or brighter color
- **Background:** Transparent on load, slight blur/darken on scroll

### 2. Hero / Skills Section
- **Headline:** "Skills & Insights" — massive bold typography
  - "Skills" on line 1, "&" on line 2, "Insights" on line 3
  - Subtle large ghost text "Skills" behind as watermark (very faint, oversized)
- **Decorative Line:** Short horizontal white line (~60px) below headline
- **Subheadline:** 2-3 lines about exploring web architectures, AI, and database systems
- **Background:** Pure black (#000000)

### 3. Skills Grid (Keyboard-Style Layout)
- **Layout:** CSS Grid, 6 columns on desktop, responsive down
- **Cards:** 18 total skill cards arranged in keyboard-like grid
- **Each Card Contains:**
  - Icon (top-left or centered)
  - Small decorative squares/dots pattern (grid of 9 small squares, 3x3)
  - Skill name (bottom): uppercase, small, bold
  - Some cards have additional label like "T" badge or version number
- **Card Design:** Dark gray (#1a1a1a) background, 1px #333333 border, no border-radius
- **Card Size:** ~120-140px width, ~100-120px height
- **Gap:** 8-12px between cards
- **Skills Listed:**
  - Row 1: HTML, CSS, JS, TYPESCRIPT, SVELTE KIT, MYSQL
  - Row 2: DATABASE ORM, AI AGENTS, RAG SYSTEMS, LLM ORCHESTRATION, GENERATIVE AI, VERCEL
  - Row 3: MACHINE LEARNING, VECTOR DATABASE, POSTMAN API, MONGODB, DOCKER, GIT & GITHUB
  - Row 4: WEBSOCKETS
- **Featured Insight Card (Row 4, spans 2 columns):**
  - White/light background (#f5f5f5 or #eeeeee)
  - Label: "FEATURED INSIGHT" — small, uppercase, muted
  - Title: "The Future of AI Agents in Production" — large, dark text
  - CTA: "READ ARTICLE →" — small, uppercase, dark text with arrow
  - Decorative faint icons in background (ghosted tech icons)

### 4. Latest Insights Section
- **Header:** "LATEST INSIGHTS" — large bold uppercase, left-aligned
- **Count:** "/ 004 ARTICLES" — small, muted, right-aligned
- **Article List (3 items):**
  - **Row 1:** "MAY 2024" | "Scaling Vector DBs with RAG Architecture" | "ARCHITECTURE"
  - **Row 2:** "APR 2024" | "Why Svelte Kit is my choice for AI Frontends" | "FRONTEND"
  - **Row 3:** "MAR 2024" | "Dockerizing Microservices for Webhook Ops" | "DEVOPS"
- **Row Structure:**
  - Date: small, muted gray, leftmost
  - Title: bold, white, larger
  - Category: small, uppercase, muted, rightmost with subtle border/background pill
- **Dividers:** No visible dividers — whitespace separation
- **Hover:** Row background shifts slightly, title shifts right

### 5. Newsletter Section
- **Background:** Dark gray card (#1a1a1a), full-width within container
- **Label:** "STAY UPDATED" — small, uppercase, muted, centered
- **Headline:** "Deep dives into tech sent to your inbox monthly." — large, bold, centered, white
- **Input Field:**
  - Placeholder: "YOUREMAIL.COM" — uppercase, muted
  - Submit: "SUBSCRIBE" — small, uppercase, white text, right-aligned inside input
  - Style: Dark background, 1px border, no border-radius
- **Alignment:** Centered within the card

### 6. Footer (Shared — Home Style)
- **Layout:** Two columns
- **Left:** "STUDIO_MINIMAL" logo + "© 2024 STUDIO_MINIMAL. ALL RIGHTS RESERVED."
- **Right:** Social links — LinkedIn, GitHub, Twitter, Email
- **Background:** Slightly lighter dark (#0a0a0a or #111111)

---

## Responsive Requirements
- **Desktop (1280px+):** 6-column skills grid, side-by-side article layout
- **Tablet (768px-1279px):** 4-column skills grid, article list compresses
- **Mobile (&lt;768px):** 2-3 column skills grid, stacked article rows, full-width newsletter

---

## Performance Requirements
- Lighthouse score: 95+ on all metrics
- Lazy load skills grid and article list
- Optimize icons (SVG, inline)
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
- **Headline:** Staggered word reveal with ghost text fade-in
- **Skills Cards:** Staggered fade-in (0.05s delay per card), scale(0.95→1)
- **Featured Card:** Slide in from bottom or scale-in with slight delay
- **Article Rows:** Staggered reveal on scroll
- **Newsletter:** Fade in when scrolled into view
- **Card Hover:** Border brightens to #555555, subtle translateY(-2px)
- **Article Hover:** Background #0a0a0a, title indent 8px right
- **Nav Links:** Underline slide-in on hover

---

## Assets Needed
- Skill icons (18 total, SVG, monochrome)
- Featured article thumbnail or background pattern
- Resume PDF (linked from nav)

---

## Deliverables
- Source code (GitHub repo)
- Live deployment (Vercel/Netlify)
- README with setup instructions