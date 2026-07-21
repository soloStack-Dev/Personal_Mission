# Web Design Prompt — Byte_Foundry__ Blog Page

## Brand Identity
- **Name:** Byte_Foundry__
- **Persona:** Elite, technically sophisticated developer sharing knowledge
- **Mood:** Dark, minimal, technical, organized, authoritative
- **Vibe Reference:** Mechanical keyboard meets editorial tech journal

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#000000` | Page background |
| `--bg-card` | `#1a1a1a` | Skills cards, newsletter card |
| `--bg-card-light` | `#f0f0f0` | Featured insight card |
| `--bg-footer` | `#0a0a0a` | Footer background |
| `--text-primary` | `#ffffff` | Headlines, primary text |
| `--text-inverse` | `#1a1a1a` | Text on light cards |
| `--text-muted` | `#888888` | Labels, dates, secondary text |
| `--text-muted-dark` | `#666666` | Labels on light cards |
| `--border-subtle` | `#333333` | Card borders |
| `--border-hover` | `#555555` | Card hover borders |
| `--accent` | `#ffffff` | Buttons, highlights |

**Rules:**
- Pure black background for maximum contrast
- Dark gray cards (#1a1a1a) for skills grid
- ONE light card (#f0f0f0) for featured insight — creates visual anchor
- Strict monochrome — no colors

---

## Typography System

| Element | Font | Weight | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
|---------|------|--------|----------------|---------------|-------------|----------------|
| Logo | Inter / Geometric Sans | 800 | 18px | 16px | 1.0 | 0.05em |
| Nav Links | Inter | 500 | 12px | 11px | 1.0 | 0.08em |
| H1 (Skills) | Inter | 800 | 72-96px | 40-56px | 0.95 | -0.03em |
| H2 (Latest) | Inter | 800 | 36-42px | 28-32px | 1.0 | -0.01em |
| Ghost Text | Inter | 800 | 200-300px | 120-160px | 1.0 | -0.05em |
| Body | Inter | 400 | 16px | 14px | 1.6 | 0 |
| Label | Inter | 500 | 10-11px | 9px | 1.0 | 0.12em |
| Card Title | Inter | 700 | 11-12px | 10px | 1.0 | 0.05em |
| Article Title | Inter | 600 | 18-20px | 16px | 1.3 | 0 |
| Date | Inter | 400 | 11px | 10px | 1.0 | 0.05em |
| Category | Inter | 500 | 10-11px | 9px | 1.0 | 0.08em |
| Button | Inter | 600 | 11-12px | 10px | 1.0 | 0.08em |

**Rules:**
- "Skills & Insights": Massive, stacked 3 lines, tight line-height
- Ghost "Skills" text behind: Very faint (#111111 or #0d0d0d), massive, z-index behind
- Decorative line: 60px wide, 2px height, white, below headline
- All skill names: Uppercase, small, bold
- Article titles: Regular case, bold but not uppercase

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 8px | Card gaps |
| `--space-sm` | 16px | Internal card padding |
| `--space-md` | 24px | Component gaps |
| `--space-lg` | 48px | Section padding |
| `--space-xl` | 80px | Between sections |
| `--space-2xl` | 120px | Hero top padding |

**Container:**
- Max-width: 1280px
- Side padding: 48px (desktop), 24px (tablet), 16px (mobile)

---

## Component Design Specs

### Navigation
- Same as home/about pages
- **Active State:** BLOG link underlined or #ffffff (others at #888888)

### Hero / Skills Header
- **Padding:** 120px top, 48px bottom
- **Ghost Text:** "Skills" — 250-300px, weight 800, color #0d0d0d, positioned behind headline, slightly offset
- **Headline:** "Skills" / "&" / "Insights" — 72-96px, weight 800, white, stacked
- **Decorative Line:** 60px × 2px, white, margin-top 24px, margin-bottom 24px
- **Subheadline:** 16px, #aaaaaa, max-width 520px, 2-3 lines

### Skills Grid (Keyboard Style)
- **Grid:** 6 columns, gap 8-12px
- **Card Specs:**
  - Size: ~130px × ~110px
  - Background: #1a1a1a
  - Border: 1px solid #2a2a2a
  - Border-radius: 0px (sharp corners)
  - Padding: 12-16px
- **Card Internal Layout:**
  - Top area: Icon (16-20px, white or muted) + 3×3 grid of tiny squares (4-6px each, #333333)
  - Bottom: Skill name, 11px, uppercase, weight 700, white
  - Some cards have small "T" badge or version tag (top-right corner)
- **Featured Insight Card:**
  - Spans 2 columns (or 2×2 grid area)
  - Background: #f0f0f0
  - Padding: 24px
  - "FEATURED INSIGHT" label: 10px, uppercase, #888888
  - Title: 24-28px, weight 700, #1a1a1a, max-width 280px
  - "READ ARTICLE →": 11px, uppercase, #333333, with arrow
  - Background pattern: Faint ghosted tech icons (very subtle, #e0e0e0)

### Latest Insights Section
- **Header Row:**
  - "LATEST INSIGHTS": 36-42px, weight 800, uppercase, left
  - "/ 004 ARTICLES": 11px, uppercase, #666666, right
  - Margin-bottom: 48px
- **Article Row:**
  - Height: ~60-70px
  - **Date:** 11px, #666666, leftmost, width ~100px
  - **Title:** 18-20px, weight 600, white, flex-grow
  - **Category:** 10px, uppercase, #888888, with subtle 1px border (#333333) or pill background (#1a1a1a), padding 4px 12px
  - No visible dividers between rows
  - Hover: Background #0a0a0a, title translateX(8px)

### Newsletter Section
- **Container:** Full-width within max-width, background #1a1a1a
- **Padding:** 64px vertical
- **Label:** "STAY UPDATED" — 11px, uppercase, #888888, centered, margin-bottom 16px
- **Headline:** "Deep dives into tech sent to your inbox monthly." — 28-32px, weight 700, white, centered, max-width 480px
- **Input:**
  - Width: ~400px max, centered
  - Background: transparent or #111111
  - Border: 1px solid #333333
  - Border-radius: 0px
  - Padding: 16px
  - Placeholder: "YOUREMAIL.COM" — 11px, uppercase, #555555
  - Submit text: "SUBSCRIBE" — 11px, uppercase, white, positioned right inside input

### Footer
- Same two-column layout as home page
- Logo left, copyright below logo
- Social links right: LinkedIn, GitHub, Twitter, Email

---

## Visual Effects & Atmosphere

### Ghost Typography
- Large "Skills" text behind the headline
- Color: #0d0d0d (barely visible against #000000)
- Size: 250-300px
- Position: Slightly offset behind actual headline
- Creates depth without clutter

### Skills Card Pattern
- 3×3 grid of tiny squares inside each card
- Squares: 4-6px, #2a2a2a or #333333
- Creates keyboard-key visual metaphor

### Featured Card Pattern
- Faint ghosted icons in background
- Very low opacity (~5-10%)
- Adds texture without distraction

---

## Animation & Motion Design

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Ghost text | Fade in (opacity 0→0.3) | 1.0s | ease-out |
| Headline words | Staggered reveal | 0.8s | cubic-bezier(0.25, 0.1, 0.25, 1) |
| Decorative line | ScaleX(0→1) from left | 0.4s | ease-out |
| Skills cards | Staggered fade + scale(0.95→1) | 0.3s each, 0.05s stagger | ease-out |
| Featured card | Slide up + fade in | 0.5s | ease-out |
| Article rows | Staggered fade-in | 0.4s each, 0.1s stagger | ease-out |
| Newsletter | Fade in on scroll | 0.5s | ease-out |
| Card hover | Border color + translateY(-2px) | 0.2s | ease |
| Article hover | bg shift + title indent | 0.25s | ease |

**Rules:**
- Staggered animations create "typing" or "keypress" rhythm
- Respect `prefers-reduced-motion`

---

## Responsive Behavior

### Desktop (1280px+)
- 6-column skills grid
- Featured card spans 2 columns
- Article list: 3-column row layout

### Tablet (768px-1279px)
- 4-column skills grid
- Featured card spans 2 columns
- Article list: Date above title on mobile

### Mobile (&lt;768px)
- 2-3 column skills grid
- Featured card full-width
- Article rows stack: Date on top, title below, category right
- Newsletter input full-width

---

## Design Principles (Immutable)
1. **Keyboard metaphor** — Skills grid mimics mechanical key layout
2. **One light moment** — Featured card is the only light element, creating focus
3. **Ghost depth** — Oversized background text adds layers without noise
4. **Monochrome discipline** — No color, ever
5. **Technical precision** — Grid alignment, equal card sizes, consistent gaps
6. **Restraint** — No unnecessary decoration, every element serves a purpose