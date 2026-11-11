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
        Archived editorial methodology from the earlier AI publication.{" "}
        <a href="/">Return to the portfolio</a>.
      </aside>
      {children}
    </>
  );
}
