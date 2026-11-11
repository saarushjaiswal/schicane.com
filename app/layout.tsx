import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";
import { MotionController } from "@/components/motion-controller";
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
        url: "/social.png",
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
    images: ["/social.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/brand/favicon-s-32.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/brand/favicon-s.svg?v=2", type: "image/svg+xml" },
    ],
    apple: [{ url: "/brand/favicon-s-180.png?v=2", sizes: "180x180" }],
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="shell header-inner">
            <a className="wordmark" href="/" aria-label="Schicane home">
              <BrandLogo />
            </a>
            <SiteNav />
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
