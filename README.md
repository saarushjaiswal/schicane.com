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
