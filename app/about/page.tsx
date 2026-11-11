import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Aarush Jaiswal",
  description:
    "About Aarush Jaiswal and Schicane, his personal space for software, AI, and robotics projects.",
  alternates: { canonical: "/about/" },
};
export default function About() {
  return (
    <section className="shell page-intro">
      <span className="eyebrow">ABOUT SCHICANE</span>
      <h1>Aarush Jaiswal.</h1>
      <div className="prose">
        <p>
          Schicane is my personal space for software, AI, automation, robotics,
          and motorsports projects. I’m learning Java and Python through college
          coursework while exploring software development independently.
        </p>
        <p>
          My portfolio brings together projects, coursework, and experiments,
          with links to their original repositories and context for
          collaborative work and forks.
        </p>
        <p>
          <a href="/#about">Read more about me</a> or{" "}
          <a href="/#projects">explore the project directory</a>.
        </p>
      </div>
    </section>
  );
}
