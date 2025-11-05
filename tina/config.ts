import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,

  // Get this from tina.io (optional for GitHub backend)
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },

  // See docs on content modeling for more info on how to setup new content models:
  // https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'src/content/blog',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'datetime',
            name: 'pubDate',
            label: 'Publication Date',
            required: true,
          },
          {
            type: 'string',
            name: 'author',
            label: 'Author',
            required: true,
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
            ui: {
              component: 'tags',
            },
          },
          {
            type: 'image',
            name: 'heroImage',
            label: 'Hero Image',
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft',
            description: 'Check to save as draft',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
        defaultItem: () => {
          return {
            title: 'New Blog Post',
            description: '',
            pubDate: new Date().toISOString(),
            author: 'Team',
            tags: [],
            draft: false,
          };
        },
      },
      {
        name: 'docs',
        label: 'Documentation',
        path: 'src/content/docs',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'number',
            name: 'order',
            label: 'Order',
            required: true,
            description: 'Order in navigation (lower numbers appear first)',
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            required: true,
            options: [
              'Introduction',
              'Writing',
              'Development',
              'Deployment',
              'Advanced',
            ],
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
        defaultItem: () => {
          return {
            title: 'New Doc',
            description: '',
            order: 1,
            category: 'Introduction',
          };
        },
      },
      {
        name: 'pages',
        label: 'Pages',
        path: 'src/content/pages',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
        defaultItem: () => {
          return {
            title: 'New Page',
            description: '',
          };
        },
      },
    ],
  },
});
