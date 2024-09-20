import {CaseIcon} from '@sanity/icons'

export default {
  name: 'entity',
  title: 'Entità',
  type: 'document',
  icon: CaseIcon,
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'file',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};