import { getHomepage } from '$lib/utils/sanity';
import { getWhatWeDosHomepage } from '$lib/utils/sanity';
import { getPeopleHomepage } from '$lib/utils/sanity';
import { getPublicationsHomepage } from '$lib/utils/sanity';
import { getArchiveHomepage } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const homepage = await getHomepage();
	const imageBackground = homepage[0].imagesBackground[Math.floor(Math.random() * homepage[0].imagesBackground.length)];
	const whatWeDos = await getWhatWeDosHomepage();
	const people = await getPeopleHomepage();
	const publications = await getPublicationsHomepage();	
	const archive = await getArchiveHomepage();

	if (homepage && whatWeDos && people && publications && archive && imageBackground) {
		return {
			homepage,
      whatWeDos,
      people,
      publications,
			archive,
			imageBackground,
		};
	}
  throw error(404, 'Not found');
}