import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about/", "/privacy/"].map((route) => ({
    url: `https://schicane.com${route}`,
  }));
}
