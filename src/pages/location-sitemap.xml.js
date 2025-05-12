import { getCollection } from 'astro:content';

export async function get() {
  // Get all location pages
  const locations = await getCollection('location');
  
  // Format the current date for the sitemap
  const date = new Date().toISOString().split('T')[0];
  
  // Generate sitemap entries for each location
  const sitemapItems = locations.map((location) => {
    return `
    <url>
      <loc>https://pennairrepair.com/location/${location.id}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`;
  }).join('');

  // Add the main locations index page
  const mainLocationPage = `
    <url>
      <loc>https://pennairrepair.com/locations</loc>
      <lastmod>${date}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>`;

  // Create the complete sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${mainLocationPage}
    ${sitemapItems}
</urlset>`;

  return {
    body: sitemap,
    headers: {
      'Content-Type': 'application/xml'
    }
  };
}