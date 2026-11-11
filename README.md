# Schicane

Aarush Jaiswal’s personal portfolio at [schicane.com](https://schicane.com).

Built with Next.js, React, and TypeScript; exported as static HTML for GitHub Pages. The original charcoal (#101210), warm paper (#f4f2ec), and gold (#c6a660) palette is retained. No analytics, tracking cookies, external fonts, newsletter signup, paid services, or contact form.

## Development

Use Node.js 22 or newer and npm:

```sh
npm ci
npm run dev
npm test
npm run build
npm run typecheck
npm run verify
npm run preview
```

The preview serves the exported site at http://127.0.0.1:3000.

## Content

- `lib/projects.ts`: reviewed public project descriptions, categories, and repository links.
- `components/project-directory.tsx`: browser-local filtering and search.
- `app/page.tsx`: introduction, featured work, project directory, bio, and contact.
- `docs/PORTFOLIO_SOURCES.md`: research evidence and attribution decisions.
- `app/privacy/page.tsx`: site-specific information handling notice.

The public project directory is a reviewed snapshot, not a live GitHub feed. It contains populated public repositories, with empty workspaces listed separately. Private repositories are not published. Forks and collaborative work are labeled. Edit the directory when project status changes.

Earlier AI publication routes are retained for existing inbound links and marked as archived. They are excluded from portfolio navigation and the sitemap. No newsletter automation runs.

## Deployment

Pushes to `main` run tests, build, type checking, and static verification before deploying through the existing GitHub Pages workflow. `CNAME` remains `schicane.com`. No new hosting service or external account is needed.

## Brand and typography update

The supplied gold wordmark and compact S are preserved in public/brand. The shared BrandLogo component uses the full logo on wide layouts and the S when space is limited. The favicon embeds the supplied S artwork.

Body copy uses self-hosted Raleway with its SIL OFL notice. Ethnocentric headings are fixed SVG artwork exported from the user-supplied Regular font with accessible text equivalents. The desktop-only source font is not published. See public/brand/README.md and AGENTS.md for ongoing brand rules.

The content direction references https://www.zachjordan.io/: a direct personal introduction followed by featured work and a full project list. Its wording, projects, media, and personal claims were not copied.

## Animation

Anime.js sequences the hero entrance, heading reveals, project rows, and interactive link motion. The hero emblem, topic marquee, and workflow accents loop only while visible. A fixed pause control disables the animation layer, and the OS reduced-motion preference disables it by default. Motion preferences stay in React state and are not saved to browser storage. All content is visible in the static HTML without JavaScript.

## F1 scroll study

The F1 study uses an original procedural open-wheel concept model in lib/f1-model.ts. Three.js renders the geometry; Anime.js interpolates camera angles and component separation through a scroll-scrubbed timeline. No third-party car asset, team livery, or external 3D service is used.

components/f1-scroll-study.tsx lazy-loads the renderer near the section, frames the car to the available viewport, provides four viewpoint buttons and a keyboard-accessible range control, and disposes its scene and GPU resources on unmount. The global motion pause control freezes automatic scroll motion. Reduced-motion layouts use a single stationary section with manual controls. A static concept illustration remains available if WebGL cannot initialize.

References read during implementation: Anime.js getting-started, React integration, JavaScript-object animation, scope cleanup, timeline seek, and ScrollObserver documentation. The reference site's mechanical assembly inspired the scroll narrative; its assets and model were not copied.

The car study is a résumé-backed navigation device: software/autonomy, AI/data, robotics/controls, and web tools, each with real project or experience links. Keep these chapter descriptions aligned with the owner's supplied résumé and public repositories. The original résumé is not published.

Project names use wrapping Raleway text. Retained display-heading artwork was regenerated with FontTools; verification checks SVG paths for invalid coordinates. Do not restore clipping-mask heading reveals. Topic marquee arrows are actual links; the strip pauses for mouse and keyboard interaction.
