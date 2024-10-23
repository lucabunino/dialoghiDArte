import { getPublications } from '$lib/utils/sanity';
import { getPublicationsEditors } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const editors = await getPublicationsEditors();
	const serie = url.searchParams.get('editor');
	const publications = await getPublications(serie);

	if (editors && publications) {
		return {
			editors,
      publications,
		};
	}
  throw error(404, 'Not found');
}