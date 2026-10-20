# BRIEF — Chiang Rai Coffee v2 (demo)

Demo/experiment only: there is no real café. Keep all placeholders ("[Your Café Name]", "Placeholder" blocks, sample prices) exactly as in the old site.

## Source content (use verbatim)
- `reference/old-index.html` is the old site. Copy ALL visible text from it verbatim: title, meta description, nav, hero, stats, Origin (Doi Chaang, Doi Tung, Wawee, hill-tribe farms, with every "Sources:" link), Menu (all 10 drinks with descriptions, hot/iced prices, the "Sample" note and the Thai sweetness words หวานน้อย / ไม่หวาน), About, Visit (hours, address, contact, map placeholder), footer incl. "Images are illustrative (AI-generated)...".
- Keep the "[Your Café Name]" auto-replace script behaviour (one constant updates title, logo, headings, footer).
- Images: `assets/img/*.webp` (hero-hills, plantation, farmworkers, espresso, hot-cup, cafe) with the same alt text as the old site. Do not generate or download new images.
- Keep `SOURCES.md` and `.nojekyll`. Do not ship `reference/` links on the site.

## Sections (order)
Sticky nav → Hero (full-bleed hero-hills) → Stats strip → Origin (3 region cards + hill-tribe farms, with photos) → Menu → About → Visit → Footer.

## Design
- Modern, calm, generous whitespace, editorial feel.
- Palette (neutral earthy, northern Thai mountains + coffee): warm off-white `#F6F2EC`, sand `#E8DFD3`, stone grey `#8A857E`, soft taupe `#B7A99A`, deep coffee brown `#3B2A20` (text), muted green accent `#6F7D5C`. No pure black/white, no beige overload.
- Type: Inter (body) + Fraunces or Source Serif 4 (headings); Noto Sans Thai for Thai.
- Subtle scroll-reveal (IntersectionObserver, fade/translate), disabled under `prefers-reduced-motion`.
- Mobile-first, responsive images (`loading="lazy"` except hero, width/height set).

## Tech
- Vanilla HTML/CSS/JS, no build step: `index.html`, `assets/css/style.css`, `assets/js/main.js`.
- All external links: `target="_blank" rel="noopener noreferrer"`. In-page anchors scroll smoothly.
- SEO: title, description, Open Graph, canonical `https://janvanhal.github.io/chiangrai-coffee-v2/`, lang="en".
- Accessibility: semantic landmarks, skip link, focus styles, AA contrast, accessible mobile menu.
- GitHub Pages ready from main root.

## Fix list
