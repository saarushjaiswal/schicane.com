import type { Metadata } from "next";
import { HeadingArtwork } from "@/components/heading-artwork";
import { ProjectDirectory } from "@/components/project-directory";
import { F1ScrollStudy } from "@/components/f1-scroll-study";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="portfolio-hero shell">
        <div className="hero-topline">
          <span className="eyebrow">AARUSH JAISWAL / PERSONAL PORTFOLIO</span>
          <span className="hero-edition">
            SOFTWARE · ROBOTICS · MOTORSPORTS
          </span>
        </div>
        <div className="portfolio-hero-grid">
          <div>
            <h1>
              <span className="hero-greeting">Hi, I’m</span>
              <HeadingArtwork text="Aarush" />
              <HeadingArtwork text="Jaiswal" />
            </h1>
            <p className="hero-description">
              I’m a college student working on software, AI, and robotics
              projects. This is where I share what I’m making, from school web
              tools to FRC robot code and motorsports experiments.
            </p>
            <div className="hero-actions">
              <a className="button" href="#f1-study">
                EXPLORE THE CAR <span aria-hidden="true">↘</span>
              </a>
              <a className="quiet-link" href="#projects">
                View projects
              </a>
            </div>
          </div>
          <div className="personal-brand">
            <div className="kinetic-emblem">
              <svg
                className="emblem-orbits"
                viewBox="0 0 400 400"
                fill="none"
                aria-hidden="true"
              >
                <g className="emblem-orbit-outer">
                  <path
                    d="M200 22L326 74L378 200L326 326L200 378L74 326L22 200L74 74Z"
                    stroke="currentColor"
                    strokeOpacity=".32"
                  />
                  <path
                    d="M200 22L326 74L378 200"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="200" cy="22" r="4" fill="currentColor" />
                </g>
                <g className="emblem-orbit-inner">
                  <circle
                    cx="200"
                    cy="200"
                    r="144"
                    stroke="currentColor"
                    strokeOpacity=".2"
                    strokeDasharray="3 12"
                  />
                  <path
                    d="M56 200A144 144 0 0 1 200 56"
                    stroke="currentColor"
                  />
                  <circle cx="56" cy="200" r="3" fill="currentColor" />
                </g>
              </svg>
              <svg
                className="emblem-logo"
                viewBox="25 24 492 202"
                role="img"
                aria-label="Schicane S logo"
              >
                <image
                  href="/brand/schicane-gold-symbol.png"
                  width="557"
                  height="262"
                />
              </svg>
            </div>
            <p>Schicane is the name I use for my personal projects.</p>
          </div>
        </div>
        <div className="hero-footnote">
          <span>Currently exploring</span>
          <p>
            Agentic AI & automation <span>/</span> Autonomous systems{" "}
            <span>/</span> Java & Python
          </p>
        </div>
      </section>
      <F1ScrollStudy />
      <nav className="motion-marquee" aria-label="Explore areas of my work">
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <div
              className="marquee-copy"
              key={i}
              aria-hidden={i === 1 ? true : undefined}
            >
              {[
                { label: "SOFTWARE", href: "#projects" },
                {
                  label: "ARTIFICIAL INTELLIGENCE",
                  href: "https://github.com/saarushjaiswal/f1-race-recaps",
                },
                {
                  label: "ROBOTICS",
                  href: "https://github.com/saarushjaiswal/reefscape",
                },
                { label: "MOTORSPORTS", href: "#f1-study" },
              ].map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  tabIndex={i === 1 ? -1 : undefined}
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </nav>
      <section
        className="featured-work shell portfolio-section"
        aria-labelledby="featured-title"
      >
        <div className="portfolio-section-heading">
          <span className="eyebrow">01 / FEATURED</span>
          <h2 id="featured-title">
            <HeadingArtwork text="Featured projects" />
          </h2>
        </div>
        <article className="featured-project">
          <div className="featured-copy">
            <span className="eyebrow">AI & DATA / IN DEVELOPMENT</span>
            <h3>
              <HeadingArtwork text="F1 Race Recaps" />
            </h3>
            <p>
              A Python project that fetches Formula 1 results, displays a race
              classification table, and supports AI-assisted summaries.
            </p>
            <p className="featured-detail">
              Built with the Jolpica API, pandas, and Groq. Still in
              development.
            </p>
            <a
              className="text-link"
              href="https://github.com/saarushjaiswal/f1-race-recaps"
            >
              Explore the repository <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="workflow-visual">
            <span className="eyebrow">PROJECT WORKFLOW</span>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <strong>Select a race</strong>
                  <small>Season + round</small>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Retrieve the results</strong>
                  <small>Jolpica API → pandas</small>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Build the recap</strong>
                  <small>Results table + optional Groq summary</small>
                </div>
              </li>
            </ol>
            <span className="visual-caption">
              Python / pandas / Jolpica / Groq
            </span>
          </div>
        </article>
        <article className="secondary-feature">
          <div>
            <span className="eyebrow">ROBOTICS / TEAM CODE</span>
            <h3>
              <HeadingArtwork text="Reefscape" />
            </h3>
          </div>
          <p>
            Autonomous routines, drive controls, and subsystems for an FRC robot
            during the 2025 Reefscape season.
          </p>
          <a
            className="text-link"
            href="https://github.com/saarushjaiswal/reefscape"
          >
            View robot code <span aria-hidden="true">↗</span>
          </a>
        </article>
      </section>
      <section
        id="projects"
        className="shell portfolio-section"
        aria-labelledby="projects-title"
      >
        <div className="portfolio-section-heading directory-heading">
          <div>
            <span className="eyebrow">02 / PROJECTS</span>
            <h2 id="projects-title">
              <HeadingArtwork text="All projects" />
            </h2>
          </div>
          <p>
            Projects, experiments, coursework, and forks.
            <br />
            View the code on GitHub.
          </p>
        </div>
        <ProjectDirectory />
      </section>
      <section id="about" className="about-portfolio portfolio-section">
        <div className="shell about-grid">
          <div>
            <span className="eyebrow">03 / ABOUT</span>
            <h2>
              <HeadingArtwork text="About me" />
            </h2>
          </div>
          <div className="about-body">
            <p>
              I’m studying computer science and artificial intelligence at
              Purdue University in Indianapolis, with an expected graduation in
              May 2030.
            </p>
            <p>
              I work on autonomous-vehicle software with Purdue VIP Autoveh.
              Before college, I led programming for FRC Team 5010, founded the
              Fishers High School AI Club, and taught beginner programmers at
              iCode Fishers.
            </p>
            <p>
              I also completed an AI internship at Blaizing Academy, working on
              logistic regression and generative-AI product development.
              Schicane is where I share my personal projects, including the ones
              inspired by motorsports.
            </p>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/aarushjaiswal/"
            >
              Find me on LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <dl className="about-notes">
              <div>
                <dt>Working with</dt>
                <dd>Java · Python · C++ · JavaScript · ROS 2</dd>
              </div>
              <div>
                <dt>Exploring</dt>
                <dd>AI agents · Autonomous systems · Computer vision</dd>
              </div>
              <div>
                <dt>Certification</dt>
                <dd>AWS Certified Cloud Practitioner</dd>
              </div>
            </dl>
            <div id="experience" className="resume-experience">
              <h3>Experience</h3>
              <ol>
                <li>
                  <div>
                    <strong>Purdue VIP Autoveh</strong>
                    <span>Autonomous Vehicle Software Development</span>
                  </div>
                  <time>Aug 2026–present</time>
                </li>
                <li>
                  <div>
                    <strong>iCode Fishers</strong>
                    <span>Programming Instructor</span>
                  </div>
                  <time>Aug 2025</time>
                </li>
                <li>
                  <div>
                    <strong>Blaizing Academy</strong>
                    <span>Artificial Intelligence Intern</span>
                  </div>
                  <time>Jun–Jul 2025</time>
                </li>
                <li>
                  <div>
                    <strong>Tiger Dynasty 5010</strong>
                    <span>Programming Lead</span>
                  </div>
                  <time>Aug 2024–Jun 2026</time>
                </li>
                <li>
                  <div>
                    <strong>Fishers High School AI Club</strong>
                    <span>Founder & President</span>
                  </div>
                  <time>Jan 2024–Jun 2026</time>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="shell contact-section">
        <span className="eyebrow">04 / GET IN TOUCH</span>
        <h2>
          <HeadingArtwork text="Get in touch" />
        </h2>
        <div className="contact-bottom">
          <p>
            Want to talk about a project?
            <br />
            Send me an email.
          </p>
          <a className="contact-email" href="mailto:saarushjaiswal@gmail.com">
            saarushjaiswal@gmail.com <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
