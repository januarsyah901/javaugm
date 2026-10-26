# Awesomic — Style Reference
> editorial zinc grid with confetti-orange punctuation.

**Theme:** light

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

Awesomic operates in a restrained, neutral-first visual register: a zinc-gray scale carries nearly the entire interface, with one vivid orange badge accent and almost no other chromatic intrusion. The geometry is defined by generous corner rounding — 36px cards, 14px buttons, 10000px pills — and hairline 1px borders replace drop shadows as the primary elevation tool. Typography is a single custom geometric sans (Cosmica) deployed at bold display weights (56–64px / weight 600) for editorial headlines, paired with compact 14px body text that signals efficiency. The atmosphere is that of a confident, infrastructure-grade marketplace: quiet surfaces, precise density, and color deployed as functional punctuation rather than decoration.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Obsidian | `#09090b` | `--color-obsidian` | Primary action buttons, hero headlines, dominant text — the deepest near-black that grounds every dark CTA and display heading against the light canvas |
| Graphite | `#18181b` | `--color-graphite` | Body text, nav text, badge text — the working ink color across paragraphs, links, and labels |
| Slate | `#27272a` | `--color-slate` | Secondary headings and elevated card surfaces — a mid-dark gray for cards that need visual weight |
| Iron | `#3f3f46` | `--color-iron` | Muted text, button labels on light surfaces, badge text — the mid-gray used for secondary UI labels and outlined-button text |
| Steel | `#52525b` | `--color-steel` | Icon strokes, supporting metadata — borders and icon outlines in darker contexts |
| Fog | `#71717a` | `--color-fog` | Helper text, tertiary labels — muted copy and supporting metadata |
| Ash | `#a1a1aa` | `--color-ash` | Placeholder text, disabled labels, light icon strokes — the lightest readable gray |
| Mist | `#d4d4d8` | `--color-mist` | Subtle borders, secondary card fills, link pill backgrounds — structural divider color |
| Cloud | `#ececee` | `--color-cloud` | Primary border color across the system — 1px hairline rules on cards, badges, and inputs |
| Paper | `#f4f4f5` | `--color-paper` | Canvas background, card surfaces, badge fills — the warm-cool gray that carries the page surface |
| Snow | `#ffffff` | `--color-snow` | Elevated surfaces (cards on canvas), input fields, button backgrounds for ghost/neutral actions |
| Ember | `#ff5a00` | `--color-ember` | Accent badges (YC batch tags, highlight chips) — the single vivid color in the system, used sparingly for startup credentials and category emphasis |
| Magenta Spark | `#fe45e2` | `--color-magenta-spark` | Rare decorative card accent — used on one hero card as visual punctuation against the monochrome grid |

## Tokens — Typography

### Cosmica — Single-family type system for everything: 56–64px weight 600 display headlines with tight 1.12–1.28 line-height, 32–40px weight 600–700 section headings, 14–16px weight 400 body and UI text, 12–13px weight 400 badge and meta labels · `--font-cosmica`
- **Substitute:** DM Sans / Plus Jakarta Sans / Inter
- **Weights:** 300, 400, 500, 600, 700
- **Sizes:** 10, 12, 13, 14, 15, 16, 18, 20, 32, 40, 56, 64
- **Line height:** 1.0–1.8
- **Letter spacing:** normal across all steps (no tracking adjustments detected)
- **Role:** Single-family type system for everything: 56–64px weight 600 display headlines with tight 1.12–1.28 line-height, 32–40px weight 600–700 section headings, 14–16px weight 400 body and UI text, 12–13px weight 400 badge and meta labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|------|--------|--------|------|-------------|----------------|-------|
| caption | — | — | 12px | 1.64 | — | `--text-caption` |
| body | — | — | 15px | 1.45 | — | `--text-body` |
| body-lg | — | — | 18px | 1.45 | — | `--text-body-lg` |
| subheading | — | — | 20px | 1.5 | — | `--text-subheading` |
| heading-sm | — | — | 32px | 1.5 | — | `--text-heading-sm` |
| heading | — | — | 40px | 1.28 | — | `--text-heading` |
| heading-lg | — | — | 56px | 1.28 | — | `--text-heading-lg` |
| display | — | — | 64px | 1.12 | — | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** compact

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 28 | 28px | `--spacing-28` |
| 32 | 32px | `--spacing-32` |
| 36 | 36px | `--spacing-36` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 68 | 68px | `--spacing-68` |
| 80 | 80px | `--spacing-80` |
| 120 | 120px | `--spacing-120` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 36px |
| icons | 40px |
| pills | 10000px |
| badges | 12px |
| inputs | 14px |
| buttons | 14px |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| subtle | `rgba(255, 255, 255, 0.5) 0px 0.5px 0px 0px inset, rgba(117, 123, 133, 0.4) 0px 9px 14px -5px inset, rgb(44, 46, 52) 0px 0px 0px 1.5px, rgba(0, 0, 0, 0.14) 0px 4px 6px 0px` | `--shadow-subtle` |
| subtle-2 | `rgb(228, 228, 231) 0px 1px 0px 0px inset` | `--shadow-subtle-2` |
| subtle-3 | `rgb(255, 255, 255) 0px 0.5px 0px 0px inset` | `--shadow-subtle-3` |
| subtle-4 | `rgb(255, 255, 255) 0px -0.5px 0px 0px` | `--shadow-subtle-4` |
| subtle-5 | `rgb(228, 228, 231) 0px -1px 0px 0px` | `--shadow-subtle-5` |
| md | `rgba(0, 0, 0, 0.04) 0px 4px 12px 0px` | `--shadow-md` |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 80px
- **Card padding:** 28px
- **Element gap:** 8px

## Components

### Primary Action Button (Dark Filled)
**Role:** Main CTA — 'Book demo', 'Get started', 'Get match'
Background #09090b, white text (#ffffff), 1.5px solid #2c2e34 border with subtle inset highlight shadow, 14px border-radius, 12px vertical / 16px horizontal padding, 14px Cosmica weight 400.

### Ghost Action Button (White)
**Role:** Secondary CTA on dark backgrounds
Background #ffffff, dark text (#3f3f46), 1px solid #3f3f46 border, 36px pill radius, 20px all padding, 14px Cosmica.

### Neutral Pill Button (Light)
**Role:** Subtle action on light backgrounds — 'Our work'
Background #fafafa, text #18181b, 14px border-radius, 12px vertical / 16px horizontal padding, 14px Cosmica weight 400.

### Category Card (Image Top)
**Role:** Service category showcase — 'Web & product', 'Motion design'
Full-width image fills the top half, 36px border-radius, 28px bottom padding, no shadow. Title overlay or below image at 20px Cosmica weight 600. Tag pills sit inside the card at bottom.

### Dark Feature Card
**Role:** Pain-point listing with arrow bullets
Background #27272a or #18181b, white text, 28–36px border-radius, 24px padding.

### Tag Pill Badge
**Role:** Category tags — 'Web', 'UX/UI design', 'Mobile app'
Transparent background with 1px solid #ececee border, text #18181b, 12px border-radius, 4px vertical / 8px horizontal padding, 12–13px Cosmica weight 400.

### Filled Tag Badge
**Role:** Accent tags — 'Software development', 'Marketing'
Background #3f3f46, text #fafafa, 12px border-radius, 4px/8px padding.

### Orange Accent Badge
**Role:** YC batch badges, highlight chips
Background #ff5a00, white text, 12px border-radius, 4px/8px padding.

### Email Input Field
**Role:** Hero email capture, newsletter signup
White background (#ffffff), text #333333, 14px border-radius, 12px vertical / 16px horizontal padding, 1px transparent border.

### Logo Strip
**Role:** Social proof — partner/client logos
Grayscale logos rendered in #71717a at 60–70% opacity, horizontally centered with even spacing.

### Stats Block
**Role:** Headline metrics — '20 000+ completed projects'
Large number at 40–56px Cosmica weight 600 in #09090b, adjacent descriptor at 14px weight 400 in #52525b.

### Navigation Bar
**Role:** Top-level site navigation
Sticky white header, logo left, nav links center (14px Cosmica), login + dark CTA button right.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Canvas | `#f4f4f5` | Page background — the warm-cool gray that fills the viewport |
| 1 | Card | `#ffffff` | Elevated content surfaces sitting on the canvas |
| 2 | Subtle Card | `#fafafa` | Slightly recessed surfaces within content areas |
| 3 | Dark Surface | `#18181b` | Dark feature blocks and inverted sections |
| 4 | Deep Dark | `#27272a` | Darker feature cards and dark mode accents |

## Elevation

- **Primary Dark Button:** `inset 0 0.5px 0 0 rgba(255,255,255,0.5), inset 0 9px 14px -5px rgba(117,123,133,0.4), 0 0 0 1.5px rgb(44,46,52), 0 4px 6px 0 rgba(0,0,0,0.14)`
- **Card:** `none — uses 1px solid #ececee hairline border instead`
- **Link/Pill:** `inset 0 1px 0 0 rgb(228,228,231)`

### Tailwind v4 Theme Setup

```css
@theme {
  --color-obsidian: #09090b;
  --color-graphite: #18181b;
  --color-slate: #27272a;
  --color-iron: #3f3f46;
  --color-steel: #52525b;
  --color-fog: #71717a;
  --color-ash: #a1a1aa;
  --color-mist: #d4d4d8;
  --color-cloud: #ececee;
  --color-paper: #f4f4f5;
  --color-snow: #ffffff;
  --color-ember: #ff5a00;
  --color-magenta-spark: #fe45e2;

  --font-cosmica: var(--font-dm-sans), 'DM Sans', ui-sans-serif, system-ui, -apple-system, sans-serif;

  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-68: 68px;
  --spacing-80: 80px;
  --spacing-120: 120px;

  --radius-md: 6px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-3xl: 24px;
  --radius-card: 36px;
  --radius-btn: 14px;
  --radius-pill: 10000px;
}
```
