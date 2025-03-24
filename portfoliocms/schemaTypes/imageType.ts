// projectImage.ts
import { defineField, defineType } from 'sanity';

export const imageType = defineType({
  name: 'projectImage',
  title: 'Project Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Subtitle',
      type: 'string',
    }),
  ],
});
