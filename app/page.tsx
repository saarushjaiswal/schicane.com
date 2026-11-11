import type { Metadata } from "next";
import { ProjectDirectory } from "@/components/project-directory";
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
              Curiosity.
              <br />
              Code.
              <br />
              <span>Real-world systems.</span>
            </h1>
            <p className="hero-description">
              I’m Aarush. I explore AI, build software, and work on robotics.
              Schicane is where my projects and experiments come together.
            </p>
            <div className="hero-actions">
              <a className="button" href="#projects">
                EXPLORE MY WORK <span aria-hidden="true">↘</span>
              </a>
              <a className="quiet-link" href="#about">
                A little about me
              </a>
            </div>
          </div>
          <div className="route-art" aria-hidden="true">
            <div className="route-art-label">
              SCHICANE / A CHANGE IN DIRECTION
            </div>
            <svg viewBox="0 0 440 440" fill="none">
              <path
                d="M60 20V157Q60 208 116 208H303Q374 208 374 280V420"
                stroke="currentColor"
                strokeWidth="52"
              />
              <path
                d="M60 20V157Q60 208 116 208H303Q374 208 374 280V420"
                stroke="#101210"
                strokeWidth="48"
              />
              <path
                d="M60 20V157Q60 208 116 208H303Q374 208 374 280V420"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="8 10"
              />
              <path
                d="M151 20V96Q151 123 178 123H310Q423 123 423 236V420M11 20V196Q11 292 107 292H246Q285 292 285 331V420"
                stroke="currentColor"
                strokeOpacity=".22"
              />
              <circle cx="60" cy="98" r="7" fill="currentColor" />
              <circle cx="374" cy="358" r="7" fill="currentColor" />
            </svg>
            <div className="route-art-footer">
              <span>THINK / BUILD / ITERATE</span>
              <span>01</span>
            </div>
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
      <section
        className="featured-work shell portfolio-section"
        aria-labelledby="featured-title"
      >
        <div className="portfolio-section-heading">
          <span className="eyebrow">01 / A CLOSER LOOK</span>
          <h2 id="featured-title">From interest to implementation.</h2>
        </div>
        <article className="featured-project">
          <div className="featured-copy">
            <span className="eyebrow">AI & DATA / IN DEVELOPMENT</span>
            <h3>F1 Race Recaps</h3>
            <p>
              Two interests in one project: motorsports and AI. A Python
              workflow turns race-result data into a readable classification
              table, with support for AI-assisted summaries.
            </p>
            <p className="featured-detail">
              Results come from the Jolpica API. The project is designed to keep
              recaps grounded in the retrieved data.
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
              A workflow overview, not a live race feed.
            </span>
          </div>
        </article>
        <article className="secondary-feature">
          <div>
            <span className="eyebrow">ROBOTICS / TEAM CODE</span>
            <h3>Reefscape</h3>
          </div>
          <p>
            Autonomous routines, drive controls, and subsystems for an FRC
            robot. A repository that brings software into the physical world.
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
            <span className="eyebrow">02 / PROJECT DIRECTORY</span>
            <h2 id="projects-title">The work, in one place.</h2>
          </div>
          <p>
            Projects, experiments, coursework, and forks.
            <br />
            Each entry takes you to its source.
          </p>
        </div>
        <ProjectDirectory />
      </section>
      <section id="about" className="about-portfolio portfolio-section">
        <div className="shell about-grid">
          <div>
            <span className="eyebrow">03 / BEHIND SCHICANE</span>
            <h2>
              Aarush Jaiswal.
              <br />
              <span>
                Always building
                <br />
                on what I learn.
              </span>
            </h2>
          </div>
          <div className="about-body">
            <p>
              I’m learning Java and Python through college coursework while
              exploring AI and software development independently. My current
              interests include agentic AI, automation, robotics, and autonomous
              systems.
            </p>
            <p>
              My work ranges from school web tools and FRC robot code to a
              project that combines race data with AI-assisted recaps. I’m also
              a motorsports fan, which finds its way into what I build.
            </p>
            <p>
              Schicane is my personal space for these projects and ideas. I’m
              interested in collaborating on software, AI, and robotics projects
              where I can contribute and keep learning.
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
                <dd>Java · Python · JavaScript</dd>
              </div>
              <div>
                <dt>Exploring</dt>
                <dd>AI agents · Automation · Autonomous systems</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section id="contact" className="shell contact-section">
        <span className="eyebrow">04 / GET IN TOUCH</span>
        <h2>
          Have something
          <br />
          <span>in mind?</span>
        </h2>
        <div className="contact-bottom">
          <p>
            For project conversations and collaboration,
            <br />
            the best place to reach me is email.
          </p>
          <a className="contact-email" href="mailto:saarushjaiswal@gmail.com">
            saarushjaiswal@gmail.com <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
