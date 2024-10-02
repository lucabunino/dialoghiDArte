import { getWhatWeDo } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const whatWeDo = await getWhatWeDo(params.slug);
  if (whatWeDo) {
    return {
      whatWeDo,
    };
  }
  throw error(404, 'Not found');
}