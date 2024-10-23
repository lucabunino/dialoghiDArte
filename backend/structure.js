import { CogIcon, HomeIcon, LinkIcon, EarthGlobeIcon, DocumentIcon, EnvelopeIcon} from '@sanity/icons'

export const myStructure = (S, context) => {
  const entities = [
    S.divider(),
    S.documentTypeListItem('whatWeDo')
      .title('Cosa facciamo'),
    S.documentTypeListItem('publication')
      .title('Pubblicazioni'),
  ];
  const pages = [
    S.divider(),
    S.listItem()
      .title('Homepage')
      .icon(HomeIcon)
      .child(S.document().schemaType('homepage').documentId('homepage')),
  ];
  const references = [
    S.divider(),
    S.documentTypeListItem('category')
      .title('Categorie'),
    S.documentTypeListItem('editor')
      .title('Editori'),
    S.documentTypeListItem('person')
      .title('Persone'),
    S.documentTypeListItem('entity')
      .title('Entità'),
  ];
  const siteSettings = [
    S.divider(),
    S.listItem()
      .title('Contatti')
      .icon(EnvelopeIcon)
      .child(S.document().schemaType('contact').documentId('contact')),
    S.listItem()
      .title('SEO')
      .icon(EarthGlobeIcon)
      .child(S.document().schemaType('seo').documentId('seo')),
  ];

  return S.list()
    .title('Contenuti')
    .items([
      ...entities,
      ...pages,
      ...references,
      ...siteSettings,
    ]);
};