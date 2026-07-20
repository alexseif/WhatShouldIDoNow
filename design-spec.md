# Design Specification: What Should I Do Now

## 1. Brand & Aesthetic Vision
- **Pure Minimalism**: Seamless 1-color background with zero visual clutter.
- **Refined Real-Time Clock**: Clean digital clock (`HH:mm:ss`) and date display without 3D frames or borders.

---

## 2. Typographic System (Swapped Roles)

- **Primary Headings (Sans-Serif)**: `Inter`, sans-serif
  - Used for crisp, modern headings: brand title (`What Should I Do Now`), popover headings, and system column titles.
- **Primary Arabic / Cultural Accent**: `Amiri`, serif
  - Used for cultural greetings and brand initials (`أ.س.`).
- **Monospace Accent**: `Geist Mono` / System Mono
  - Used for the refined digital clock (`HH:mm:ss`), date, and technical metadata.

---

## 3. Color System

### Dark Mode (Primary Aesthetic)
- **Background (Dark)**: `#050505` (Deep Black) with `#0f0f0f` elevated surfaces.
- **Foreground (Light)**: `#e8e8e8` (Crisp White) and `#a3a3a3` for secondary copy.
- **Signature Accent**: Dark Goldenrod (`#B8860B`)

### Light Mode (Calculated High-Contrast Contrast)
- **Background (Light)**: `#fcfcfc` with `#ffffff` elevated surfaces.
- **Foreground (Dark)**: `#171717` (Deep Ink) and `#52525b` for secondary copy.
- **Signature Accent**: Dark Goldenrod (`#B8860B`)

---

## 4. UI & Interaction Discipline
- **Refined Digital Clock**: Balanced size (`font-size: clamp(3.5rem, 9vw, 6.5rem)`).
- **Dynamic Systems Grid**: Automatically renders any number of systems returned from the Wuwei API (`https://wuwei.alexseif.com/api/v1/temporal-blocks`).
- **Left-Aligned Bullet Points**: Systems feature clean headings with left-aligned bullet items.
- **Flat Floating Popover**: Info trigger (`i`) opens a flat floating popover with zero backdrop blur or shadow (`box-shadow: none`), enlarged body font (`1.05rem`), and gold border.
- **Radial Ripple Theme Switcher**: Radial circle expansion animation when toggling dark/light modes.
