import {BookIcon} from '@sanity/icons'

export default {
  name: 'publication',
  title: 'Pubblicazione',
  icon: BookIcon,
  type: 'document',
  fieldsets: [
    {
      name: 'info',
      title: 'Informazioni',
      options: { columns: 2 },
    },
    {
      name: 'buy',
      title: 'Acquisto',
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
      name: 'date',
      title: 'Data',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'editor',
      title: 'Editore',
      type: 'reference',
      to: [{type: 'editor'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'curator',
      title: 'A cura di',
      type: 'reference',
      to: [{type: 'person'}],
      fieldset: 'info',
    },
    {
      name: 'author',
      title: 'Autore',
      type: 'reference',
      to: [{type: 'person'}],
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
      name: 'thumbnail',
      title: 'Immagine di copertina',
      type: 'image',
      options: {
        accept: 'image/jpeg,image/png,image/webp', // Specify acceptable formats
      },
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
      name: 'buyLink',
      title: 'Link di acquisto',
      type: 'url',
      fieldset: 'buy'
    },
    {
      name: 'buyMessage',
      title: 'Messaggio di acquisto',
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
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' },
      ],
    },
    {
      title: 'Date',
      name: 'dateAsc',
      by: [
        { field: 'date', direction: 'desc' },
      ],
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
