import { getSEO } from '$lib/utils/sanity';
import { getContacts } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const seo = await getSEO();
	const contacts = await getContacts();
	const { pathname } = url
	if (seo && contacts) {
		return {
			seo,
			contacts,
			pathname
		};
	}
  throw error(404, 'Not found');
}