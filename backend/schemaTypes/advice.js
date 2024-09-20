import {SquareIcon} from '@sanity/icons'

export default {
  name: 'advice',
  title: 'Consiglio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
    },
    {
      name: 'advices',
      title: 'Consigli',
      type: 'array',
      of: [
        {
          name: 'adviceSingle',
          title: 'Consiglio',
          icon: SquareIcon,
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Titolo'},
            {name: 'subtitle', type: 'string', title: 'Sottotitolo'},
            {name: 'link', type: 'url', title: 'Link'}
          ]
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};