# Web Design Prompt — Byte_Foundry__ Projects Page

## Brand Identity
- **Name:** Byte_Foundry__
- **Persona:** Elite architect-engineer building substantial digital systems
- **Mood:** Dark, gallery-like, monumental, confident
- **Vibe Reference:** Architectural monograph + brutalist portfolio + high-end gallery

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0a0a0a` | Page background (slightly lighter than pure black) |
| `--bg-nav` | `#0a0a0a` | Navigation background |
| `--bg-footer` | `#0a0a0a` | Footer background |
| `--text-primary` | `#ffffff` | Headlines, titles |
| `--text-muted` | `#888888` | Descriptions, secondary text |
| `--text-faint` | `#666666` | Categories, years, labels |
| `--border-subtle` | `#555555` | Button borders |
| `--border-hover` | `#ffffff` | Button hover borders |
| `--accent` | `#ffffff` | Buttons, highlights |

**Rules:**
- Background is very dark gray (#0a0a0a) — warmer than pure black
- All images are B&W or heavily desaturated
- Strict monochrome — no color anywhere
- White text on dark, subtle gray for hierarchy

---

## Typography System

| Element | Font | Weight | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
|---------|------|--------|----------------|---------------|-------------|----------------|
| Logo | Inter / Geometric Sans | 800 | 18px | 16px | 1.0 | 0.05em |
| Nav Links | Inter | 500 | 12px | 11px | 1.0 | 0.08em |
| H1 (Selected) | Inter | 800 | 64-72px | 40-48px | 0.95 | -0.02em |
| H2 (CTA) | Inter | 800 | 36-42px | 28-32px | 1.05 | -0.01em |
| Project Title | Inter | 700 | 28-32px | 22-24px | 1.1 | 0 |
| Category | Inter | 500 | 11px | 10px | 1.0 | 0.08em |
| Description | Inter | 400 | 14px | 13px | 1.6 | 0 |
| Button | Inter | 600 | 11px | 10px | 1.0 | 0.08em |
| CTA Action | Inter | 700 | 24-28px | 18-20px | 1.0 | 0.02em |
| Footer Text | Inter | 400 | 11px | 10px | 1.0 | 0.05em |

**Rules:**
- "SELECTED WORKS": Massive, stacked 2 lines, uppercase, tight line-height
- Project titles: Uppercase, bold, commanding presence
- Categories: Uppercase, small, very muted — fade into background
- CTA headline: Uppercase, stacked, impactful

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 8px | Tight gaps |
| `--space-sm` | 16px | Internal padding |
| `--space-md` | 24px | Component gaps |
| `--space-lg` | 48px | Section internal padding |
| `--space-xl` | 80px | Between sections |
| `--space-2xl` | 120px | Hero top padding |

**Container:**
- Max-width: 1280px
- Side padding: 48px (desktop), 24px (tablet), 16px (mobile)

---

## Component Design Specs

### Navigation
- Same as other pages
- **Active State:** PROJECTS link underlined or #ffffff

### Page Header
- **Padding:** 120px top, 48px bottom
- **"SELECTED"**: 64-72px, weight 800, uppercase, white, line 1
- **"WORKS"**: 64-72px, weight 800, uppercase, white, line 2
- **Subheadline:** 14-16px, #aaaaaa, max-width 480px, margin-top 24px
- **No decorative line** — headline alone is the statement

### Project Cards (4 Total)

#### Image
- Aspect ratio: ~16:10 or ~3:2
- Object-fit: cover
- No border-radius (sharp corners)
- Full-width within card
- B&W filter or desaturated
- Optional: Very subtle dark gradient overlay at bottom for text safety

#### Category / Year
- Format: "CATEGORY / YEAR"
- 11px, uppercase, #666666, weight 500
- Margin-top: 24px (below image)
- Margin-bottom: 8px

#### Title
- 28-32px, weight 700, uppercase, white
- Margin-bottom: 12px
- Letter-spacing: 0 or -0.01em

#### Description
- 14px, weight 400, #aaaaaa
- Line-height: 1.6
- Max-width: 90% of card
- 2-3 lines maximum

#### CTA Button
- Text: "VIEW CASE STUDY"
- 11px, uppercase, weight 600
- Background: transparent
- Border: 1px solid #555555
- Border-radius: 0px
- Padding: 8px 16px
- Margin-top: 16px
- Hover: Border #ffffff, text #ffffff

### CTA Section
- **Layout:** Flexbox, space-between alignment
- **Left Column (60%):**
  - "LETS BUILD SOMETHING": 36-42px, weight 800, uppercase, white, line 1
  - "SUBSTANTIAL.": 36-42px, weight 800, uppercase, white, line 2
  - Subtext: 14px, #888888, margin-top 16px
- **Right Column (40%):**
  - "CONTACT →": 24-28px, weight 700, white, right-aligned
  - Arrow: →, moves right 4px on hover
  - Positioned at bottom of section
- **Padding:** 80px vertical
- **Margin-top:** 80px from project grid

### Footer (Centered Variant)
- **Layout:** Three equal columns, flexbox
- **Left Column:**
  - "STUDIO_MINIMAL": 18px, weight 800, uppercase, white
- **Center Column:**
  - Social links: LinkedIn, GitHub, Twitter, Email
  - 13px, weight 400, #aaaaaa
  - Spaced ~32px apart
  - Hover: underline or #ffffff
- **Right Column:**
  - "© 2024 STUDIO_MINIMAL. ALL RIGHTS RESERVED."
  - 11px, uppercase, #666666, right-aligned
- **Padding:** 32px vertical
- **Border-top:** Optional 1px solid #1a1a1a (very subtle)

---

## Visual Effects & Atmosphere

### Photography
- All project images: Black & white, high contrast
- Architectural subjects: Buildings, structures, industrial objects
- Dramatic angles: Looking up, looking down, close-ups
- Gallery-quality, editorial feel
- No people, no color, no soft focus

### Image Treatment
- Sharp, crisp edges
- High contrast, deep blacks
- Optional: Slight grain for texture
- No filters, no overlays except subtle gradient if needed

### Depth & Layers
- No card shadows — flat design
- No borders on cards
- Separation through spacing and typography weight only
- Images "float" on the dark background

---

## Animation & Motion Design

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Headline | Staggered line reveal | 0.6s | cubic-bezier(0.25, 0.1, 0.25, 1) |
| Subheadline | Fade in | 0.4s | ease-out |
| Project cards | Staggered fade + translateY(40px→0) | 0.5s each, 0.15s stagger | ease-out |
| Card images | Scale(1.02→1) on load | 0.8s | ease-out |
| Card hover | Image scale(1.03), overflow hidden | 0.3s | ease |
| CTA section | Fade in on scroll | 0.5s | ease-out |
| CONTACT arrow | translateX(0→4px) on hover | 0.2s | ease |
| Footer | Fade in | 0.4s | ease |

**Rules:**
- Animations are subtle and architectural
- Staggered card reveals create rhythm
- Respect `prefers-reduced-motion`

---

## Responsive Behavior

### Desktop (1280px+)
- 2-column grid, full-size images
- CTA side-by-side

### Tablet (768px-1279px)
- 2-column grid maintained
- Smaller images and titles
- CTA stacks slightly

### Mobile (&lt;768px)
- Single column grid
- Images full-width
- Titles: 22-24px
- CTA stacks: headline top, CONTACT below
- Footer: stacks vertically, all centered

---

## Design Principles (Immutable)
1. **Gallery as interface** — Images are the primary content, everything else supports
2. **Monumental typography** — Headlines command space like building facades
3. **Restraint in decoration** — No borders, no shadows, no gradients on cards
4. **Architectural photography** — B&W, dramatic, structural subjects only
5. **Whitespace as structure** — Generous spacing creates the grid
6. **Monochrome discipline** — No color, ever
7. **Confidence in minimalism** — Every element must justify its existence