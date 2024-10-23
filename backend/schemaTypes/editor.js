import { TagsIcon } from '@sanity/icons'

export default {
  name: 'editor',
  title: 'Editor',
  type: 'document',
  icon: TagsIcon,
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
      name: 'link',
      title: 'Link',
      type: 'url',
    },
  ],
};