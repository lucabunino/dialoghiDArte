import { getPeople } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const people = await getPeople();

	if (people) {
		return {
      people,
		};
	}
  throw error(404, 'Not found');
}