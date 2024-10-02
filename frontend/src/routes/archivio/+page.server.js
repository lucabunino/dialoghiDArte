import { getArchive } from '$lib/utils/sanity';
import { getArchiveCategories } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const categories = await getArchiveCategories();
	
	const category = url.searchParams.get('category');
	const archive = await getArchive(category);

	if (categories && archive) {
		return {
			categories,
      archive,
		};
	}
  throw error(404, 'Not found');
}