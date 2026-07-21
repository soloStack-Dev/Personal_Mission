# Web Design Prompt — Byte_Foundry__ Portfolio Website

## Brand Identity
- **Name:** Byte_Foundry__
- **Persona:** Elite, understated, technically sophisticated developer/designer
- **Mood:** Dark, minimal, confident, editorial
- **Vibe Reference:** High-end fashion editorial meets brutalist tech

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#000000` | Main background (hero, CTA, works) |
| `--bg-secondary` | `#0a0a0a` | Footer background |
| `--bg-card-dark` | `#1a1a1a` | Dark service cards |
| `--bg-card-light` | `#ffffff` | Light service cards |
| `--text-primary` | `#ffffff` | Headlines, primary text on dark |
| `--text-inverse` | `#000000` | Text on light cards |
| `--text-muted` | `#888888` | Secondary text, labels, years |
| `--border-subtle` | `#333333` | Card borders, dividers |
| `--accent` | `#ffffff` | Buttons, highlights |

**Rules:**
- 90%+ of the page is black or near-black
- White is used sparingly for impact (cards, buttons)
- Zero bright colors — monochrome only
- Subtle gray scale for hierarchy

---

## Typography System

| Element | Font | Weight | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
|---------|------|--------|----------------|---------------|-------------|----------------|
| Logo | Inter / Geometric Sans | 800 | 18px | 16px | 1.0 | 0.05em |
| Nav Links | Inter | 500 | 12px | 11px | 1.0 | 0.08em |
| H1 (Hero) | Inter | 800 | 72-96px | 40-48px | 1.05 | -0.02em |
| H2 (Section) | Inter | 700 | 36-48px | 28-32px | 1.1 | -0.01em |
| H3 (Card Title) | Inter | 600 | 20-24px | 18px | 1.2 | 0 |
| Body | Inter | 400 | 16px | 14px | 1.6 | 0 |
| Caption/Label | Inter | 500 | 11-12px | 10px | 1.0 | 0.1em |
| Button | Inter | 600 | 12-13px | 11px | 1.0 | 0.05em |

**Rules:**
- All caps for navigation, labels, buttons, categories
- Tight line-height on headlines for impact
- Generous line-height on body for readability
- Negative letter-spacing on large headlines only

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 8px | Tight gaps, icon padding |
| `--space-sm` | 16px | Internal card padding |
| `--space-md` | 24px | Component gaps |
| `--space-lg` | 48px | Section internal padding |
| `--space-xl` | 80px | Between major sections |
| `--space-2xl` | 120px | Hero top padding, footer breathing room |

**Container:**
- Max-width: 1280px
- Side padding: 48px (desktop), 24px (tablet), 16px (mobile)

---

## Component Design Specs

### Navigation
- Height: 64px
- Logo: Bold, uppercase, tracking wide
- Links: Small, uppercase, muted white, hover → full white + underline
- Resume button: White fill, black text, 4px border-radius, arrow icon

### Hero Section
- Vertical padding: 120px top, 80px bottom
- Image: B&W portrait, slight desaturation, no border-radius, 
  positioned with asymmetric left padding
- Headline: Massive, bold, stacked 3 lines, flush left
- Subheadline: Max-width 480px, muted gray, 2-3 lines
- Buttons: Side-by-side, 16px gap, equal height (~48px), 
  sharp corners (0px border-radius)

### Service Cards (Bento Grid)
- Gap: 16-24px
- Dark cards: #1a1a1a background, no border or 1px #333 border
- Light card: Pure white, black text, centered abstract icon
- Card padding: 32px
- Icon: Minimal geometric, circular split (black on white)
- Image card: Full-bleed dark photo, white uppercase overlay text, 
  slight dark gradient overlay for readability

### Project List
- Row height: ~80px
- Divider: 1px solid #222222
- Number: 11px, muted gray, leftmost
- Title: 20px, bold, white
- Category: 11px, uppercase, muted gray, right group
- Year: 11px, muted gray, rightmost
- Hover: Background shifts to #0a0a0a, title shifts right 8px

### Email Input
- Background: transparent
- Border: 1px solid #333333
- Text: uppercase placeholder, muted
- Submit: Arrow icon inside input or adjacent
- Focus: Border brightens to #666666

### Footer
- Padding: 48px vertical
- Logo: Same as nav but slightly larger
- Copyright: 11px, uppercase, muted
- Social links: 13px, regular weight, spaced 24px apart, hover underline

---

## Visual Effects & Atmosphere

### Photography
- All photos: Black & white or heavily desaturated
- High contrast, editorial quality
- No colorful imagery anywhere

### Shadows & Depth
- Cards: No shadows (flat design) or extremely subtle 
  `0 4px 24px rgba(0,0,0,0.3)`
- Buttons: No shadows

### Borders
- Service cards: 1px solid #333333 (subtle)
- Buttons: 1px solid white (outline style)
- Input: 1px solid #333333

### Cursor
- Default on text
- Pointer on all interactive elements

---

## Animation & Motion Design

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Page sections | Fade in + translateY(30px→0) | 0.6s | cubic-bezier(0.25, 0.1, 0.25, 1) |
| Hero headline | Staggered word reveal | 0.8s total | ease-out |
| Nav link hover | Underline scaleX(0→1) from left | 0.25s | ease |
| Card hover | Scale 1.02, border brighten | 0.3s | ease |
| Project row hover | bg color + text indent | 0.25s | ease |
| Button hover | Invert colors or bg fill | 0.2s | ease |
| Scroll | Smooth scroll (CSS scroll-behavior) | — | — |

**Rules:**
- Animations are subtle and purposeful — never flashy
- Prefer opacity and transform (GPU-accelerated)
- Respect `prefers-reduced-motion`

---

## Responsive Behavior

### Desktop (1280px+)
- Full bento grid, 2-column hero, side-by-side CTA

### Tablet (768px-1279px)
- Hero stacks: image top, text below
- Bento grid: 2 columns maintained, smaller cards
- Project list: Slightly smaller text

### Mobile (&lt;768px)
- Single column everything
- Hamburger menu (animated, 2-3 lines)
- Hero image full-width, headline 40-48px
- Bento cards stack vertically
- Project list: 2-line rows (title + category/year on second line)
- CTA section stacks, email input full-width

---

## Design Principles (Immutable)
1. **Restraint over decoration** — Every element must earn its place
2. **Typography as UI** — Size and weight create hierarchy, not color
3. **Black is the brand** — The darkness IS the identity
4. **Asymmetric balance** — Visual weight distributed, not mirrored
5. **Editorial spacing** — Generous whitespace is not empty space
6. **Monochrome discipline** — No color except black, white, and grays