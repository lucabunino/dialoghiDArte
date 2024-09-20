import {ProjectsIcon, SchemaIcon, TokenIcon, StarIcon, EditIcon} from '@sanity/icons';

export default {
  name: 'whatWeDo',
  title: 'Cosa facciamo',
  icon: ProjectsIcon,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Sottotitolo',
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
      name: 'archiveOnly',
      title: 'Mostra solamente in archivio',
      type: 'boolean',
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        }
      ]
    },
    {
      name: 'thumbnail',
      title: 'Immagine di copertina',
      type: 'image',
    },
    {
      name: 'images',
      title: 'Immagini interne',
      type: 'array',
      of: [
        {
          type: 'image',
        }
      ]
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
    {
      name: 'credits',
      title: 'Crediti',
      type: 'array',
      of: [
        {
          name: 'partners',
          title: 'Partner',
          icon: SchemaIcon,
          type: 'object',
          fields: [
            {
              name: 'partnersArray',
              title: 'Partner',
              type: 'array',
              of: [
                {
                  name: 'partner',
                  type: 'reference',
                  to: [{type: 'entity'}, {type: 'person'}], // Allow referencing both entity and person
                }
              ]
            }
          ],
          preview: {
            select: {
              partnersArray: 'partnersArray',
            },
            prepare(selection) {
              const {partnersArray} = selection;
              return {
                title: `${partnersArray.length} partner`,
              };
            }
          }
        },
        {
          name: 'sponsors',
          title: 'Sponsor',
          icon: TokenIcon,
          type: 'object',
          fields: [
            {
              name: 'sponsorsArray',
              title: 'Sponsor',
              type: 'array',
              of: [
                {
                  name: 'sponsor',
                  type: 'reference',
                  to: [{type: 'entity'}, {type: 'person'}], // Allow referencing both entity and person
                }
              ]
            }
          ],
          preview: {
            select: {
              sponsorsArray: 'sponsorsArray',
            },
            prepare(selection) {
              const {sponsorsArray} = selection;
              return {
                title: `${sponsorsArray.length} sponsor`,
              };
            }
          }
        },
        {
          name: 'patronages',
          title: 'Patrocini',
          icon: StarIcon,
          type: 'object',
          fields: [
            {
              name: 'patronagesArray',
              title: 'Patrocini',
              type: 'array',
              of: [
                {
                  name: 'patronage',
                  type: 'reference',
                  to: [{type: 'entity'}, {type: 'person'}], // Allow referencing both entity and person
                }
              ]
            }
          ],
          preview: {
            select: {
              patronagesArray: 'patronagesArray',
            },
            prepare(selection) {
              const {patronagesArray} = selection;
    
              return {
                title: `${patronagesArray.length} patrocin${patronagesArray.length === 1 ? 'io' : 'i'}`,
              };
            }
          }
        },
        {
          name: 'customCredit',
          title: 'Custom',
          icon: EditIcon,
          type: 'object',
          fields: [
            {
              name: 'customText',
              title: 'Testo personalizzato',
              type: 'text',
              rows: 3
            },
            {
              name: 'customsArray',
              title: 'Entità/persone personalizzate',
              type: 'array',
              of: [
                {
                  name: 'custom',
                  type: 'reference',
                  to: [{type: 'entity'}, {type: 'person'}],
                }
              ]
            }
          ],
          preview: {
            select: {
              customText: 'customText'
            },
            prepare(selection) {
              const {customText} = selection;
              return {
                title: `${customText}`,
              };
            }
          }
        }
      ]
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
