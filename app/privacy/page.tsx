import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How this Schicane portfolio handles visitor information, external links, and contact emails.",
  alternates: { canonical: "/privacy/" },
};
export default function Privacy() {
  return (
    <section className="shell page-intro">
      <span className="eyebrow">SITE INFORMATION</span>
      <h1>Privacy.</h1>
      <div className="prose info-prose">
        <h2>This portfolio</h2>
        <p>
          The portfolio does not include analytics, advertising, account
          registration, newsletter subscriptions, or contact forms. Project
          search and filters run in your browser; search terms are not submitted
          to a server. This site does not set cookies or use browser storage for
          tracking.
        </p>
        <p>
          If you change the color theme, your choice is saved locally in your
          browser so the site can remember it. That preference is not sent to a
          server.
        </p>
        <h2>Hosting and external links</h2>
        <p>
          This site is hosted on GitHub Pages. GitHub may process technical
          information when serving the site, including visitors’ IP addresses.
          See{" "}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement">
            GitHub’s privacy statement
          </a>{" "}
          for its practices. Links to GitHub, LinkedIn, and other sites take you
          to services with their own privacy policies.
        </p>
        <h2>Email and requests</h2>
        <p>
          If you email me, your email provider and mine process that message.
          Please send only information needed for the conversation. To ask about
          a message you sent or request its deletion, contact{" "}
          <a href="mailto:saarushjaiswal@gmail.com">saarushjaiswal@gmail.com</a>
          .
        </p>
      </div>
    </section>
  );
}
