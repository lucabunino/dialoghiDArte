import {BookIcon} from '@sanity/icons'

export default {
  name: 'pubblication',
  title: 'Pubblicazione',
  icon: BookIcon,
  type: 'document',
  fieldsets: [
    {
      name: 'info',
      get: 'Informazioni',
      options: { columns: 2 },
    },
    {
      name: 'buy',
      title: 'Acquisto',
      options: { columns: 2 },
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'thumbnail',
      title: 'Immagine di copertina',
      type: 'image',
    },
    {
      name: 'body',
      title: 'Contenuto',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Testo corrente', value: 'normal'},
            {title: 'Titolo', value: 'h3'},
            {title: 'Titoletto', value: 'h4'},
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    description: 'Meant to be used when the link is from another domain',
                    type: 'boolean'
                  }
                ]
              },
            ]
          },
        }
      ],
    },
    {
      name: 'logos',
      title: 'Loghi',
      type: 'array',
      of: [
        {
          name: 'logo',
          type: 'reference',
          to: [{type: 'entity'}]
        }
      ]
    },
    {
      name: 'curator',
      title: 'A cura di',
      type: 'reference',
      to: [{type: 'person'}],
      fieldset: 'info',
    },
    {
      name: 'editor',
      title: 'Editore',
      type: 'reference',
      to: [{type: 'entity'}],
      fieldset: 'info',
    },
    {
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      fieldset: 'info'
    },
    {
      name: 'price',
      title: 'Prezzo',
      type: 'number',
      fieldset: 'info'
    },
    {
      name: 'whereToBuy',
      title: 'Dove acquistare',
      type: 'string',
      fieldset: 'buy'
    },
    {
      name: 'subscribeToNewsletter',
      title: 'Download tramite newsletter',
      type: 'boolean',
      fieldset: 'buy',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'thumbnail',
    },
  },
}
