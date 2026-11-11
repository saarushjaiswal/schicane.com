import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";
import { MotionController } from "@/components/motion-controller";
import { ThemeToggle } from "@/components/theme-toggle";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";
const description =
  "Aarush Jaiswal’s personal portfolio: software, AI, automation, robotics, and motorsports projects. Explore the work and its source code at Schicane.";
export const metadata: Metadata = {
  metadataBase: new URL("https://schicane.com"),
  title: { default: "Aarush Jaiswal | Schicane", template: "%s | Schicane" },
  description,
  openGraph: {
    type: "website",
    siteName: "Schicane",
    title: "Aarush Jaiswal | Schicane",
    description,
    images: [
      {
        url: "/social.png?v=3",
        width: 1200,
        height: 630,
        alt: "Aarush Jaiswal: software, AI and robotics. Schicane personal portfolio.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarush Jaiswal | Schicane",
    description,
    images: ["/social.png?v=3"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/brand/favicon-s-32.png?v=3", type: "image/png", sizes: "32x32" },
      { url: "/brand/favicon-s.svg?v=3", type: "image/svg+xml" },
    ],
    apple: [{ url: "/brand/favicon-s-180.png?v=3", sizes: "180x180" }],
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `try { var preference = localStorage.getItem("schicane-theme"); document.documentElement.dataset.theme = preference === "light" ? "light" : "dark"; } catch {}`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="shell header-inner">
            <a className="wordmark" href="/" aria-label="Schicane home">
              <BrandLogo />
            </a>
            <div className="header-tools">
              <SiteNav />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="portfolio-footer">
          <div className="shell">
            <div className="footer-main">
              <a className="wordmark" href="/" aria-label="Schicane home">
                <BrandLogo />
              </a>
              <p>The personal project space of Aarush Jaiswal.</p>
              <a href="/#main">Back to top ↑</a>
            </div>
            <div className="footer-links">
              <span>Aarush Jaiswal / Schicane</span>
              <nav aria-label="Footer navigation">
                <a href="https://github.com/saarushjaiswal">GitHub</a>
                <a href="https://www.linkedin.com/in/aarushjaiswal/">
                  LinkedIn
                </a>
                <a href="mailto:saarushjaiswal@gmail.com">Email</a>
                <a href="/privacy/">Privacy</a>
              </nav>
            </div>
          </div>
        </footer>
        <MotionController />
      </body>
    </html>
  );
}
