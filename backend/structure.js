import { CogIcon, HomeIcon, LinkIcon, EarthGlobeIcon, DocumentIcon, EnvelopeIcon} from '@sanity/icons'

export const myStructure = (S, context) => {
  const entities = [
    S.divider(),
    S.documentTypeListItem('whatWeDo')
      .title('Cosa facciamo'),
    S.documentTypeListItem('pubblication')
      .title('Pubblicazioni'),
  ];
  const pages = [
    S.divider(),
    S.listItem()
      .title('Pagine')
      .icon(DocumentIcon)
      .child(
        S.list()
          .title('Pagine')
          .items([
            S.listItem()
              .title('Homepage')
              .icon(HomeIcon)
              .child(S.document().schemaType('homepage').documentId('homepage')),
            S.listItem()
              .title('Dd’A Consiglia')
              .icon(LinkIcon)
              .child(S.document().schemaType('advice').documentId('advice')),
          ])
      ),
  ];
  const references = [
    S.divider(),
    S.documentTypeListItem('category')
      .title('Categorie'),
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