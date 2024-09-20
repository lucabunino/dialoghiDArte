import { FilterIcon } from '@sanity/icons'

export default {
  name: 'category',
  title: 'Categoria',
  type: 'document',
  icon: FilterIcon,
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
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};