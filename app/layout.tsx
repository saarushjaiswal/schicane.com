import type { Metadata } from "next";
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
  icons: { icon: "/icon.svg" },
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
              SCHICANE<span className="brand-period">.</span>
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
              <a className="wordmark" href="/">
                SCHICANE<span className="brand-period">.</span>
              </a>
              <p>The personal project space of Aarush Jaiswal.</p>
              <a href="/#main">Back to top ↑</a>
            </div>
            <div className="footer-links">
              <span>Built with curiosity. Shared with context.</span>
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
      </body>
    </html>
  );
}
