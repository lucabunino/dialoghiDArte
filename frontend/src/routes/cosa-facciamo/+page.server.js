import { getWhatWeDos } from '$lib/utils/sanity';
import { getWhatWeDosCategories } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const categories = await getWhatWeDosCategories();
	
	const category = url.searchParams.get('category');
	const whatWeDos = await getWhatWeDos(category);
	
	if (categories && whatWeDos) {
		return {
			categories,
      whatWeDos,
		};
	}
  throw error(404, 'Not found');
}