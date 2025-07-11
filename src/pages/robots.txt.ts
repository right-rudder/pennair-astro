import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `# Robots.txt for ${sitemapURL.origin}
# Generated automatically

# Allow all web crawlers to access all content
User-agent: *
Allow: /

# Common paths to disallow
Disallow: /api/
Disallow: /_astro/
Disallow: /admin/
Disallow: /.well-known/

# Crawl delay (optional - uncomment if needed)
Crawl-delay: 10

# Sitemap location
Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
