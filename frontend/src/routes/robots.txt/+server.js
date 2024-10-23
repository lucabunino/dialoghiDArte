export async function GET() {
	return new Response(
		`
		User-agent: *
		Disallow: 
		Disallow: /cgi-bin/
		Sitemap: https://www.dialoghidarte.it/sitemap.xml
		`.trim(),
	);
}