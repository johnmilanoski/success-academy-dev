# Success‑Academy – UI Design Spec

> **Goal** — Give Codex (and any dev) a *single source of truth* for styling and layout so it can generate coherent, on‑brand React/Tailwind/shadcn/ui code without screenshots.

---

## 1 • Brand & Look‑and‑Feel

| Token                     | Value                   | Usage                   |
| ------------------------- | ----------------------- | ----------------------- |
| **--brand‑primary**       | `#2563EB` (`blue‑600`)  | Buttons, links, accents |
| **--brand‑primary‑light** | `#3B82F6` (`blue‑500`)  | Gradients, hovers       |
| **--brand‑surface**       | `#F8FAFC` (`slate‑50`)  | Page bg                 |
| **--brand‑surface‑alt**   | `#FFFFFF`               | Cards, modals           |
| **--brand‑text**          | `#0F172A` (`slate‑900`) | Body copy               |
| **--brand‑accent**        | `#E11D48` (`rose‑600`)  | Error, highlights       |

**Typography**  `font‑family: "Inter", sans‑serif;`
`font‑weight‑scale: 400 / 500 / 700`
Line‑height 1.5 → readable blocks

**Radii** `rounded‑2xl` (24 px) for cards & modals / `rounded‑full` for buttons & avatars

**Shadow** `shadow‑lg` (Tailwind default) — softened with `shadow-slate-200/40`

**Spacing scale (px)** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64

**Breakpoints** `sm 640 px` | `md 768 px` | `lg 1024 px` | `xl 1280 px`

---

## 2 • Layout Shell

```txt
<Header>
  ├─ logo left
  ├─ nav: Catalog | Pricing | FAQ
  └─ auth‑switch right (Login / Dashboard)
<Main>
  ├─ dynamic page content (min‑h‑screen‑header)
<Footer>
  ├─ link clusters (About, Legal)
  └─ small print
```

Header is sticky, translucent (`backdrop‑blur`) on scroll.

---

## 3 • Key Page Templates (Wireframes)

### 3.1 Landing (public)

```md
<Hero full‑vh bg‑gradient‑brand>
  [ Headline | Sub ]
  [ CTA primary | CTA secondary ]
  ↓
<Feature Grid 3×>
<Testimonial Carousel>
<Pricing Tiers 3‑up>
<Footer>
```

### 3.2 Instructor Dashboard

```md
<Sidebar 72px fixed>
  ├ Courses
  ├ Students
  ├ Earnings
  └ Settings
<Main>
  <Breadcrumb>
  <Page Header title+actions>
  <Grid gap‑6 cols‑auto‑fill‑min‑280>
    <Course Card>*
```

### 3.3 Student Dashboard

Same shell but sidebar items: *My Courses*, *Progress*, *Profile*.

### 3.4 Course Builder Wizard

```md
<Stepper top sticky>
<Section py‑12>
  [Form fields]  max‑w‑2xl mx‑auto
<Stepper Footer actions stick‑bottom>
```

---

## 4 • Component Catalogue (use shadcn/ui primitives)

* **Button** `variant: primary|secondary|ghost` `size: sm|md|lg`
* **Card** `rounded‑2xl shadow‑lg bg‑surface‑alt p‑6`
* **Input / Textarea** with floating label
* **Stepper** (Course Builder) >> progress bar, numbered steps
* **Tabs** for dashboard views
* **Modal / Dialog** for confirmations
* **Toast** notifications (bottom‑right, auto‑dismiss 4 s)
* **Avatar** (rounded‑full, 40 px)

---

## 5 • Accessibility & Responsiveness

* Every interactive element ≥ 44 × 44 px touch target
* Focus ring: `outline‑2 outline‑brand‑primary offset‑2`
* Prefers‑color‑scheme: automatic dark‑mode (`surface` → `slate‑800`, text → `slate‑100`)

---

## 6 • Example Prompt for Codex

```txt
# Context
We follow design_spec.md (tokens & layout). Component to style: Hero.tsx.

# Changes Wanted
1. Full‑viewport height flex‑center.
2. Add gradient bg from --brand‑primary‑light → --brand‑primary.
3. Headline `text‑5xl lg:text‑7xl font‑bold text‑white`.
4. Primary CTA Button: variant "primary", shadow‑lg, hover:scale‑105.

# Code to Modify
…paste component…
```

Codex will output updated JSX/Tailwind respecting tokens.

---

## 7 • Future Enhancements

* **Dark Mode 2.0**: user toggle persisted in `localStorage`.
* **Motion**: Framer Motion for hero reveal & card hover.
* **Skeletons** for loading states.

---

*End of spec — iterate as needed.*
