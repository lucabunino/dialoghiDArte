import { TagsIcon } from '@sanity/icons'

export default {
  name: 'series',
  title: 'Collana',
  type: 'document',
  icon: TagsIcon,
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      rows: 2,
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
  ],
};