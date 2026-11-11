"use client";
import { HeadingArtwork } from "@/components/heading-artwork";
import { useState } from "react";
import { projects, emptyRepositories, repoUrl } from "@/lib/projects";
const categories = [
  "All",
  "AI & data",
  "Robotics",
  "Web",
  "Coursework",
  "Forks",
];
export function ProjectDirectory() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = projects.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      `${p.name} ${p.description} ${p.stack}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <div className="directory-controls">
        <div
          className="filters"
          role="group"
          aria-label="Filter projects by subject"
        >
          {categories.map((c) => (
            <button
              type="button"
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="project-search">
          <span>Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, topic, or technology"
          />
        </label>
      </div>
      <p className="result-count" role="status">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {category !== "All" ? ` in ${category}` : " in the directory"}
      </p>
      <div className="project-list">
        {filtered.map((p) => (
          <article className="project-row" key={p.repo}>
            <div className="project-subject">{p.category}</div>
            <div className="project-details">
              <h3>
                <a href={repoUrl(p.repo)}>
                  <HeadingArtwork text={p.name} />
                  <span aria-hidden="true"> ↗</span>
                </a>
              </h3>
              <p>{p.description}</p>
              <div className="project-meta">
                {p.stack}
                {p.note && <span>{p.note}</span>}
              </div>
            </div>
            <a
              className="repo-link"
              href={repoUrl(p.repo)}
              aria-label={`View ${p.name} on GitHub`}
            >
              Repository <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <h3>No projects match that search.</h3>
          <p>Try another topic or technology.</p>
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
      <details className="repository-archive">
        <summary>
          More repositories <span>Early ideas & empty workspaces</span>
        </summary>
        <p>
          These public repositories had no project files when this directory was
          reviewed. They are listed as workspaces, without claims about
          completed products.
        </p>
        <ul>
          {emptyRepositories.map((repo) => (
            <li key={repo}>
              <a href={repoUrl(repo)}>
                {repo} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
        <p>
          The <a href={repoUrl("saarushjaiswal")}>GitHub profile repository</a>{" "}
          contains my introduction and technical interests.
        </p>
      </details>
    </>
  );
}
