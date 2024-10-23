import { getPrivacy } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const privacy = await getPrivacy();

	if (privacy) {
		return {
      privacy,
		};
	}
  throw error(404, 'Not found');
}