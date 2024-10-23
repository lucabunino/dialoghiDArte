import { createClient } from '@sanity/client';
import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run sanity init --env?');
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: false, // `false` if you want to ensure fresh data
	apiVersion: '2024-09-23', // date of setup
});

// SEO
export async function getSEO() {
	return await client.fetch(`
		*[_type == "seo" && !(_id in path('drafts.**'))] {
			SEOTitle,
			SEODescription,
			SEOImage
		}
	`);
}

// Contacts
export async function getContacts() {
	return await client.fetch(`
		*[_type == "contact" && !(_id in path('drafts.**'))] {
			...,
		}
	`);
}

// Homepage
export async function getHomepage() {
	return await client.fetch(`
		*[_type == "homepage" && !(_id in path('drafts.**'))] {
			...,
			aboutContent[] {
				...,
				person-> { "title": name + " " + surname, slug, role, email, singlePage  },
				entities[]-> { title, link, slug },
				people[]-> { "title": name + " " + surname, singlePage, slug },
				"link": download.asset->url
			}
		}
	`);
}

// Homepage WhatWeDos
export async function getWhatWeDosHomepage() {
	return await client.fetch(`
		*[_type == "whatWeDo" && collector == "whatWeDo" && !(_id in path('drafts.**'))] {
			...,
			category[]-> { title, slug } | order(title asc),
		} | order(date desc)[0...6]
	`);
}

// Homepage Archive
export async function getArchiveHomepage() {
	return await client.fetch(`
		*[_type == "whatWeDo" && collector == "archive" && !(_id in path('drafts.**'))] {
			...,
			category[]-> { title, slug } | order(title asc),
		} | order(date desc)[0...6]
	`);
}

// Homepage Publications
export async function getPublicationsHomepage() {
	return await client.fetch(`
		*[_type == "publication" && !(_id in path('drafts.**'))] {
			...,
			editor-> {title, link, slug },
			curator -> { "title": name + " " + surname, },
			author -> { "title": name + " " + surname, },
		} | order(date desc)[0...6]
	`);
}

// Homepage WhoWeAre
export async function getPeopleHomepage() {
	return await client.fetch(`
		*[_type == "person" && withWhom && !(_id in path('drafts.**'))] {
			...,
			"title": name + " " + surname,
		} | order(surname asc)[0...11]
	`);
}

// WhoWeAre
export async function getPeople() {
	return await client.fetch(`
		*[_type == "person" && withWhom && !(_id in path('drafts.**'))] {
			...,
			"title": name + " " + surname,
		} | order(surname asc)
	`);
}

// WhatWeDo
export async function getWhatWeDos(category) {
	return await client.fetch(`
		*[_type == "whatWeDo" && collector == "whatWeDo"
		${category && category !== '*' ? `&& $category in category[]->slug.current` : ''}
		&& !(_id in path('drafts.**'))] {
			...,
			category[]-> { title, slug } | order(title asc),
		} | order(date desc)
	`, { category });
}

// WhatWeDo Categories
export async function getWhatWeDosCategories() {
	return await client.fetch(`
		*[_type == "category" && _id in *[_type == "whatWeDo" && collector == "whatWeDo"].category[]._ref] {
			"title": title,
			"slug": slug
		} | order(title asc)
	`);
}

// Archive
export async function getArchive(category) {
	return await client.fetch(`
		*[_type == "whatWeDo" && collector == "archive"
		${category && category !== '*' ? `&& $category in category[]->slug.current` : ''}
		&& !(_id in path('drafts.**'))] {
			...,
			category[]-> { title, slug } | order(title asc),
		} | order(date desc)
	`, { category });
}

// Archive Categories
export async function getArchiveCategories() {
	return await client.fetch(`
		*[_type == "category" && _id in *[_type == "whatWeDo" && collector == "archive"].category[]._ref] {
			"title": title,
			"slug": slug
		} | order(title asc)
	`);
}

// Publications
export async function getPublications(editor) {
	return await client.fetch(`
		*[_type == "publication"
		${editor ? `&& $editor == editor->slug.current` : ''}
		&& !(_id in path('drafts.**'))] {
			...,
			editor-> {title, link, slug },
			curator -> { "title": name + " " + surname, },
			author -> { "title": name + " " + surname, },
		} | order(date desc)
	`, { editor });
}

// Publications Editors
export async function getPublicationsEditors() {
	return await client.fetch(`
	*[_type == "editor" && _id in *[_type == "publication"].editor._ref] {
			"title": title,
			"slug": slug
		} | order(title asc)
	`);
}


// Single WhatWeDo
export async function getWhatWeDo(slug) {
	return await client.fetch(`
		*[_type == "whatWeDo" && slug.current == $slug] {
			...,
			image {
				...,
				"aspectRatio": asset->metadata.dimensions.width / asset->metadata.dimensions.height
			},
			category[]-> { title, slug },
			credits[]{
				...,
				_type == 'partners' => { partnersArray[]->{"title": coalesce(name + " " + surname, title), link} },
				_type == 'sponsors' => { sponsorsArray[]->{"title": coalesce(name + " " + surname, title), link} },
				_type == 'patronages' => { patronagesArray[]->{"title": coalesce(name + " " + surname, title), link} },
				_type == 'customCredit' => { customText, customsArray[]->{"title": coalesce(name + " " + surname, title), link} }
			},
			"prev": *[_type == "whatWeDo" && collector == ^.collector && date < ^.date] | order(date desc)[0] {
				slug, date
			},
			"next": *[_type == "whatWeDo" && collector == ^.collector && date > ^.date] | order(date asc)[0] {
				slug, date
			},
		}
	`, { slug });
}


// Single Pubblication
export async function getPublication(slug) {
  return await client.fetch(`
    *[_type == "publication" && slug.current == $slug] {
      ...,
      curator -> { "title": name + " " + surname },
      author -> { "title": name + " " + surname },
      editor -> { title, slug, link },
      "prev": *[_type == "publication" && date < ^.date] | order(date desc)[0] {
				slug, date
      },
      "next": *[_type == "publication" && date > ^.date] | order(date asc)[0] {
        slug, date
      },
    }
  `, { slug });
}


// Single Person
export async function getPerson(slug) {
	return await client.fetch(`
		*[_type == "person" && slug.current == $slug] {
			...,
			"title": name + " " + surname,
		}
	`, { slug });
}