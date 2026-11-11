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
