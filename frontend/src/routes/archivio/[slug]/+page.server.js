import { getWhatWeDo } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const archive = await getWhatWeDo(params.slug);
  if (archive) {
    return {
      archive,
    };
  }
  throw error(404, 'Not found');
}