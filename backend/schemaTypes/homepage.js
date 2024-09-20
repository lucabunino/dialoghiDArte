import { UserIcon, DownloadIcon, EnvelopeIcon, TextIcon } from '@sanity/icons'

export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'about', title: 'Chi siamo'},
  ],
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      hidden: true,
    },
    {
      name: 'intro',
      title: 'Introduzione',
      type: 'text',
      rows: 3,
      group: 'hero',
    },
    {
      name: 'imagesBackground',
      title: 'Immagini sfondo',
      type: 'array',
      of: [
        {
          type: 'image',
        }
      ],
      group: 'hero',
    },
    {
      name: 'imagesForeground',
      title: 'Immagini in primo piano',
      type: 'array',
      of: [
        {
          type: 'image',
        }
      ],
      group: 'hero',
    },
    {
      name: 'aboutIntro',
      title: 'Introduzione',
      type: 'text',
      rows: 3,
      group: 'about',
    },
    {
      name: 'aboutContent',
      title: 'Contenuto',
      type: 'array',
      of: [
        {
          name: 'aboutPerson',
          title: 'Persona',
          type: 'object',
          icon: UserIcon,
          fields: [
            {name: 'person', title: 'Persona', type: 'reference', to: [{type: 'person'}]},
            {name: 'extra', title: 'Informazioni aggiuntive', type: 'text', rows: 4,},
          ],
          preview: {
            select: {
              title: 'person.title',
              media: 'person.thumbnail'
            },
          }
        },
        {
          name: 'aboutDownload',
          title: 'Download',
          type: 'object',
          icon: DownloadIcon,
          fields: [
            {name: 'title', title: 'Titolo', type: 'string'},
            {name: 'cta', title: 'Call to action', type: 'string'},
            {name: 'download', title: 'Download', type: 'file'}
          ]
        },
        {
          name: 'aboutContact',
          title: 'Contatto email',
          type: 'object',
          icon: EnvelopeIcon,
          fields: [
            {name: 'title', title: 'Titolo', type: 'string'},
            {name: 'email', title: 'Email', type: 'string'},
          ]
        },
        {
          name: 'aboutCustom',
          title: 'Testo custom',
          type: 'object',
          icon: TextIcon,
          fields: [
            {name: 'title', title: 'Titolo', type: 'string'},
            {name: 'content', title: 'Contenuto', type: 'text'}
          ]
        },
      ],
      group: 'about',
    },

  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};