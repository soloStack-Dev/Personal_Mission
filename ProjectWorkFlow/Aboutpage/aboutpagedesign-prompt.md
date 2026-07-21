# Web Design Prompt — Byte_Foundry__ About Page

## Brand Identity
- **Name:** Byte_Foundry__
- **Persona:** Elite, understated, technically sophisticated developer/designer
- **Mood:** Dark, minimal, confident, editorial, introspective
- **Vibe Reference:** Architectural monograph meets tech manifesto

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0a0a0a` | Page background (slightly lighter than home) |
| `--bg-nav` | `#0a0a0a` | Navigation background |
| `--bg-footer` | `#0a0a0a` | Footer background |
| `--text-primary` | `#ffffff` | Headlines, primary text |
| `--text-muted` | `#888888` | Labels, captions, secondary text |
| `--text-inverse` | `#000000` | Text on light elements |
| `--border-subtle` | `#222222` | Invisible dividers (if any) |
| `--accent` | `#ffffff` | Buttons, highlights |

**Rules:**
- Background is very dark gray (#0a0a0a), NOT pure black — subtle distinction from home
- All text is white or muted gray
- Zero color — strict monochrome discipline
- Image caption uses muted gray

---

## Typography System

| Element | Font | Weight | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
|---------|------|--------|----------------|---------------|-------------|----------------|
| Logo | Inter / Geometric Sans | 800 | 18px | 16px | 1.0 | 0.05em |
| Nav Links | Inter | 500 | 12px | 11px | 1.0 | 0.08em |
| H1 (Timeline) | Inter | 800 | 48-56px | 32-36px | 1.0 | -0.02em |
| H2 (Journey) | Inter | 800 | 56-64px | 36-42px | 1.05 | -0.02em |
| Label | Inter | 500 | 11-12px | 10px | 1.0 | 0.12em |
| Body | Inter | 400 | 16px | 14px | 1.7 | 0 |
| Body Italic | Inter | 400 Italic | 16px | 14px | 1.7 | 0 |
| Caption | Inter | 500 | 10-11px | 9px | 1.0 | 0.08em |
| Number | Inter | 700 | 24px | 20px | 1.0 | 0 |
| Company Name | Inter | 700 | 22-24px | 18px | 1.2 | -0.01em |
| Role | Inter | 500 | 11px | 10px | 1.0 | 0.08em |
| Button | Inter | 600 | 12-13px | 11px | 1.0 | 0.05em |

**Rules:**
- "PHILOSOPHY" and "EXPERTISE FOCUS" labels: uppercase, wide letter-spacing, muted gray
- "The Journey" headline: massive, bold, tight line-height, negative tracking
- Body paragraph 2: Italicized for emphasis and voice distinction
- Timeline "TIMELINE" header: uppercase, bold, same weight as Journey but smaller
- Numbers "01", "02": Bold, large, white — act as visual anchors

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 8px | Tight gaps |
| `--space-sm` | 16px | Internal padding |
| `--space-md` | 24px | Component gaps |
| `--space-lg` | 48px | Section internal padding |
| `--space-xl` | 80px | Between major sections |
| `--space-2xl` | 100px | Hero top padding |

**Container:**
- Max-width: 1280px
- Side padding: 48px (desktop), 24px (tablet), 16px (mobile)

---

## Component Design Specs

### Navigation (Shared with Home)
- Same specs as home page
- **Active State:** ABOUT link has 1px underline or #ffffff color (others at #888888)

### Philosophy Section
- **Layout:** Two-column, image left, content right
- **Image Container:**
  - No border-radius (sharp corners)
  - Slight inner shadow or gradient overlay at bottom for caption readability
  - Caption positioned absolute bottom-left: "WORKSPACE_01 // SYSTEM_ALPHA"
  - Caption style: 10px, uppercase, muted gray (#666666), letter-spaced
- **Content Right:**
  - "PHILOSOPHY" label: 11px, uppercase, #666666, margin-bottom 24px
  - "The Journey": 56-64px, weight 800, white, margin-bottom 24px
  - Body paragraph 1: 16px, regular, #aaaaaa, max-width 480px, margin-bottom 20px
  - Body paragraph 2: 16px, italic, #aaaaaa, max-width 480px, margin-bottom 48px
  - "EXPERTISE FOCUS" label: 11px, uppercase, #666666, margin-bottom 16px
  - Expertise grid: 2 columns, gap 48px
    - Number: 24px, bold, white
    - Label: 11px, uppercase, #888888, margin-top 8px

### Timeline Section
- **Header Row:**
  - "TIMELINE": 48-56px, weight 800, uppercase, left
  - "2018 — PRESENT": 11px, uppercase, #666666, right-aligned
  - Margin-bottom: 64px
- **Timeline Items (3 rows):**
  - Vertical spacing between rows: 48-56px
  - **Left Group (40% width):**
    - Index: "01" — 11px, #666666, margin-bottom 4px
    - Role: "Tech Lead" — 11px, uppercase, #888888, margin-bottom 8px
    - Company: "Neural Architects" — 22-24px, bold, white
  - **Right Group (55% width):**
    - Description: 14-16px, #aaaaaa, right-aligned, max-width 400px
  - **No visible dividers** — pure whitespace separation
  - **Alignment:** Left group flush left, right group flush right within container

### Footer (About Page Variant)
- **Layout:** Three columns (DIFFERENT from home page!)
- **Left (33%):** "STUDIO_MINIMAL" logo — 18px, bold, uppercase
- **Center (33%):** Social links — LinkedIn, GitHub, Twitter, Email
  - 13px, regular weight, #aaaaaa
  - Spaced ~32px apart
  - Hover: underline or #ffffff
- **Right (33%):** "© 2024 STUDIO_MINIMAL. ALL RIGHTS RESERVED."
  - 11px, uppercase, #666666, right-aligned
- **Padding:** 48px vertical
- **Background:** Same as page (#0a0a0a)

---

## Visual Effects & Atmosphere

### Photography
- B&W editorial workspace photo
- High contrast, soft natural light from window
- City skyline slightly blurred in background (depth)
- Professional, contemplative mood

### Shadows & Depth
- No card shadows (flat design throughout)
- Image may have extremely subtle vignette or bottom gradient for caption

### Borders
- No visible borders in timeline
- No card borders
- Pure whitespace as separator

---

## Animation & Motion Design

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Philosophy label | Fade in + translateY(10px→0) | 0.4s | ease-out |
| "The Journey" headline | Staggered word/line reveal | 0.8s | cubic-bezier(0.25, 0.1, 0.25, 1) |
| Body paragraphs | Fade in, 0.2s stagger | 0.5s each | ease-out |
| Expertise numbers | Fade in + scale(0.9→1) | 0.4s | ease-out |
| Image | Subtle scale(1.02→1) on load | 1.0s | ease-out |
| Timeline header | Fade in from left | 0.5s | ease-out |
| Timeline rows | Staggered fade-in + translateY(20px→0) | 0.5s each, 0.15s stagger | ease-out |
| Footer | Fade in | 0.4s | ease |

**Rules:**
- Animations are subtle and editorial
- Prefer opacity and transform
- Respect `prefers-reduced-motion`

---

## Responsive Behavior

### Desktop (1280px+)
- Full two-column philosophy, timeline side-by-side layout

### Tablet (768px-1279px)
- Philosophy: Image full-width top, content below
- Timeline: Description moves below company name, left-aligned

### Mobile (&lt;768px)
- Single column everything
- Image full-width
- "The Journey" headline: 36-42px
- Expertise focus: 2 columns maintained but smaller
- Timeline: Each item stacks (role/company top, description below)
- Footer: Stacks vertically — logo, socials, copyright centered

---

## Design Principles (Immutable)
1. **Restraint over decoration** — Every element earns its place
2. **Typography as UI** — Size and weight create hierarchy
3. **Dark gray over pure black** — #0a0a0a distinguishes about from home
4. **Asymmetric editorial balance** — Visual weight distributed with intent
5. **Whitespace as structure** — No borders needed when spacing is precise
6. **Monochrome discipline** — No color, ever
7. **Voice through typography** — Italic body text adds personal warmth