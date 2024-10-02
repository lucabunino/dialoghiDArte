import { getPublications } from '$lib/utils/sanity';
import { getPublicationsSeries } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const series = await getPublicationsSeries();
	const serie = url.searchParams.get('series');
	const publications = await getPublications(serie);

	if (series && publications) {
		return {
			series,
      publications,
		};
	}
  throw error(404, 'Not found');
}