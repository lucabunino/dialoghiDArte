export default {
  name: 'seo',
  title: 'SEO',
  type: 'document',
  fieldsets: [

  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      hidden: true,
    },
    {
      name: 'SEOTitle',
      type: 'string',
    },
    {
      name: 'SEODescription',
      type: 'text',
      rows: 5,
    },
    {
      name: 'SEOImage',
      type: 'image',
    },
  ],
}