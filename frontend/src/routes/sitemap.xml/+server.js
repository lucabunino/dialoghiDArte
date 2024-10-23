import { getArchive } from '$lib/utils/sanity';
import { getWhatWeDos } from '$lib/utils/sanity';
import { getPublications } from '$lib/utils/sanity';

export async function GET() {
  // Fetch data from Sanity
  const [archives, whatWeDos, publications] = await Promise.all([
    getArchive(''),
    getWhatWeDos(''),
    getPublications('')
  ]);

  // Generate XML for archive pages
  const archivesSlugsXML = archives.map(archive => {
    return `
      <url>
        <loc>https://www.dialoghidarte.it/archivio/${archive.slug.current}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.70</priority>
      </url>`;
  }).join('');

  // Generate XML for 'What We Do' pages
  const whatWeDosSlugsXML = whatWeDos.map(whatWeDo => {
    return `
      <url>
        <loc>https://www.dialoghidarte.it/cosa-facciamo/${whatWeDo.slug.current}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.75</priority>
      </url>`;
  }).join('');

  // Generate XML for publications
  const publicationsSlugsXML = publications.map(publication => {
    return `
      <url>
        <loc>https://www.dialoghidarte.it/pubblicazioni/${publication.slug.current}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.75</priority>
      </url>`;
  }).join('');

  // Add listing pages for 'What We Do', publications, and archives
  const listingPagesXML = `
    <url>
      <loc>https://www.dialoghidarte.it/cosa-facciamo</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://www.dialoghidarte.it/pubblicazioni</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://www.dialoghidarte.it/archivio</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.80</priority>
    </url>
  `;

  // Build the complete sitemap
  return new Response(
    `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    >
      <url>
        <loc>https://www.dialoghidarte.it/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://www.dialoghidarte.it/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      ${archivesSlugsXML}
      ${whatWeDosSlugsXML}
      ${publicationsSlugsXML}
      ${listingPagesXML}
    </urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}
