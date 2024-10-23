import { getCookies } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const cookies = await getCookies();

	if (cookies) {
		return {
      cookies,
		};
	}
  throw error(404, 'Not found');
}