"use client";
import { useState } from "react";
export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="primary-nav"
        className={open ? "primary-nav is-open" : "primary-nav"}
        aria-label="Main navigation"
      >
        <a href="/#f1-study" onClick={() => setOpen(false)}>
          F1 study
        </a>
        <a href="/#projects" onClick={() => setOpen(false)}>
          Projects
        </a>
        <a href="/#about" onClick={() => setOpen(false)}>
          About
        </a>
        <a href="/#contact" onClick={() => setOpen(false)}>
          Contact
        </a>
        <a className="nav-github" href="https://github.com/saarushjaiswal">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </>
  );
}
