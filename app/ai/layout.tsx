import type { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false, follow: true } };
export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <aside className="shell archive-banner">
        Archived publication pages. AI Weekly is paused.{" "}
        <a href="/#projects">Explore the current portfolio</a>.
      </aside>
      {children}
    </>
  );
}
