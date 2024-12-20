import { UserIcon } from '@sanity/icons'

export default {
  name: 'person',
  title: 'Persona',
  type: 'document',
  icon: UserIcon,
  fieldsets: [
    {
      name: 'where',
      title: 'Raccoglitore',
      description: 'Indicare dove verrà mostrata la persona (scelta indipendente)',
      options: { columns: 2 },
    }
  ],
  fields: [
    {
      name: 'name',
      title: 'Nome',
      type: 'string',
    },
    {
      name: 'surname',
      title: 'Cognome',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: (doc) => `${doc.name}-${doc.surname}`,
        maxLength: 96,
      },
    },
    {
      name: 'role',
      title: 'Ruolo/professione',
      type: 'string',
    },
    {
      name: 'withWhom',
      title: 'Mostra in Con chi',
      type: 'boolean',
      initialValue: true,
      fieldset: 'where',
    },
    {
      name: 'singlePage',
      title: 'Mostra in Pagina singola',
      type: 'boolean',
      initialValue: false,
      fieldset: 'where',
    },
    {
      name: 'externalLink',
      title: 'Link esterno',
      description: 'Se presente, sarà aggiunto un link esterno. Non funziona se il campo "Mostra in pagina singola" è attivo',
      type: 'url',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
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
      ]
    },
  ],
  orderings: [
    {
      title: 'Cognome',
      name: 'surnameAsc',
      by: [
        { field: 'surname', direction: 'asc' },
      ],
    },
    {
      title: 'Nome',
      name: 'nameAsc',
      by: [
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      name: 'name',
      surname: 'surname',
      media: 'thumbnail',
    },
    prepare(selection) {
      const {name, surname, media} = selection;
      return {
        title: `${name} ${surname}`,
        media: media
      };
    }
  }
};