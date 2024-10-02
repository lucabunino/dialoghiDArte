import { getPerson } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const person = await getPerson(params.slug);
  if (person) {
    return {
      person,
    };
  }
  throw error(404, 'Not found');
}