import { getPublication } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const publication = await getPublication(params.slug);

  if (publication) {
    return {
      publication,
    };
  }
  throw error(404, 'Not found');
}