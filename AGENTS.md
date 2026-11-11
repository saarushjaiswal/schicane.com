# Schicane portfolio conventions

- Keep all task changes inside this repository.
- Preserve the charcoal, warm paper, and gold palette.
- Use the user-supplied `public/brand/schicane-gold-wordmark.png` as the primary logo. Use `public/brand/schicane-gold-symbol.png` for compact placements and the favicon. Preserve both originals; do not replace them with typeset text or redraw them.
- `components/brand-logo.tsx` is the shared logo implementation.
- Body copy, navigation, and controls use self-hosted Raleway. Keep its SIL OFL notice.
- The user approved fixed Ethnocentric Regular artwork from their supplied ZIP because it contains a desktop license, not a webfont license. `public/brand/headings/` contains whole-heading SVG artwork, with accessible text supplied by `components/heading-artwork.tsx`. Do not publish the OTF, convert it to a webfont, create a reusable alphabet, or claim this is the Bold Italic font.
- Keep copy personal and factual. Avoid generic slogans such as “Curiosity. Code. Real-world systems.” Do not invent awards, experience, copyright statements, testimonials, usage numbers, or project status.
- Preserve project attributions and distinguish forks, team code, coursework, and empty repositories.
- Newsletter work is paused.
- The user subsequently requested an animation-heavy design inspired by Anime.js. Use Anime.js for sequenced entrances, scroll reveals, and interactive motion; keep the pause control and respect reduced-motion preferences. Pause continuous animation when it is offscreen or the document is hidden. Earlier aversion to hover animations is superseded by this request.
- Run the production build, type check, and static verification for site changes. Review responsive behavior when layout or typography changes.
