export default {
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fieldsets: [

  ],
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      hidden: true,
    },
    {
      name: 'legalForm',
      title: 'Forma giuridica',
      type: 'string',      
    },
    {
      name: 'vat',
      title: 'Partita IVA',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'adresses',
      title: 'Indirizzi',
      type: 'array',
      of: [
        {
          name: 'adress',
          title: 'Indirizzo',
          type: 'object',
          fields: [
            {
              name: 'adressName',
              title: 'Nome indirizzo',
              type: 'text',
              rows: 3
            },
            {
              name: 'adressGoogleMaps',
              title: 'Link Google Maps',
              type: 'url'
            },
          ],
          preview: {
            select: {
              title: 'adressName',
            }
          }
        }
      ]
    },
    {
      name: 'socials',
      title: 'Social media',
      type: 'array',
      of: [
        {
          name: 'socialUrl',
          title: 'Link',
          type: 'url'
        },
      ]
    },
  ]
}