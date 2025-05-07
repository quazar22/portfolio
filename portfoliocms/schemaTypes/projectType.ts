// project.ts
import { defineField, defineType } from 'sanity';
import { ProjectsIcon } from '@sanity/icons'; // or any icon you prefer

export const projectType = defineType({
  name: 'projectType',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'content', title: 'Content' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      group: 'details',
      validation: (rule) =>
        rule.required().error('Slug is required for generating pages'),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'details',
      description: 'A short summary for project listing',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'details',
    }),
    defineField({
      name: 'experience_tags',
      title: 'Experience Tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'details',
    }),
    // New optional link fields:
    defineField({
      name: 'github_link',
      title: 'GitHub Link',
      type: 'url',
      group: 'details',
      description: 'Optional link to the GitHub repository',
    }),
    defineField({
      name: 'deployment_link',
      title: 'Deployment Link',
      type: 'url',
      group: 'details',
      description: 'Optional link to the live deployed project (website)',
    }),
    defineField({
      name: 'info_link',
      title: 'Info Link',
      type: 'url',
      group: 'details',
      description: 'Optional link to further information about the project',
    }),
    defineField({
      name: 'body',
      title: 'Project Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'projectImage' } // custom image object you defined above
      ],
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
    },
    prepare({ title, publishedAt }) {
      const dateStr = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : 'Unpublished';
      return {
        title: title || 'Untitled Project',
        subtitle: dateStr,
      };
    },
  },
});
