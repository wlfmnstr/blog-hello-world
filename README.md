# Knowledge Base System

A production-ready Git-based knowledge base with dual editing capabilities: visual CMS for non-technical users and direct file editing for developers.

## Features

- **Dual Editing Experience**
  - Tina CMS at `/admin` for visual, Notion-like editing
  - Direct MDX file editing in your IDE for developers
  - Both paths commit to GitHub and trigger automatic deployment

- **Modern Tech Stack**
  - Astro 4.x for fast static site generation
  - React for interactive components (islands architecture)
  - TypeScript strict mode for type safety
  - Tailwind CSS for utility-first styling

- **Content Management**
  - Three content types: Blog, Docs, Pages
  - Zod schema validation
  - MDX for rich content with React components
  - GitHub as single source of truth

- **User Experience**
  - Fast Pagefind search with Cmd/Ctrl+K keyboard shortcut
  - Dark/light theme toggle with localStorage persistence
  - Responsive mobile-first design
  - Table of contents for documentation
  - Category-based doc navigation

- **Deployment**
  - GitHub Actions for CI/CD
  - GitHub Pages for hosting
  - Automatic builds on push to main
  - Pagefind index generation in pipeline

## Prerequisites

- Node.js 20+
- npm or yarn
- Git
- GitHub account with repository access

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/wlfmnstr/blog-hello-world.git
cd blog-hello-world
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# GitHub Configuration for Tina CMS
GITHUB_OWNER=your-username
GITHUB_REPO=blog-hello-world
GITHUB_BRANCH=main
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Site Configuration
PUBLIC_SITE_URL=https://your-username.github.io/blog-hello-world
```

**To create a GitHub Personal Access Token:**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Copy the token to your `.env` file

### 4. Start Development Server

```bash
npm run dev
```

The site will be available at:
- Main site: `http://localhost:4321`
- Tina CMS: `http://localhost:4321/admin`

## Project Structure

```
knowledge-base/
├── .claude/                 # Claude Code agentic scaffolding
│   ├── agents/             # Specialized AI agents
│   ├── commands/           # Workflow commands
│   └── skills/             # Reusable patterns
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
├── src/
│   ├── components/
│   │   ├── layout/         # Header, Footer, ThemeToggle
│   │   ├── content/        # Search, BlogCard, etc.
│   │   └── mdx/           # Custom MDX components
│   ├── layouts/           # Astro layouts
│   │   ├── BaseLayout.astro
│   │   └── MainLayout.astro
│   ├── pages/             # Astro pages (routing)
│   │   ├── index.astro
│   │   ├── blog/
│   │   ├── docs/
│   │   └── about.astro
│   ├── content/           # Content collections
│   │   ├── config.ts      # Zod schemas
│   │   ├── blog/         # Blog posts (.mdx)
│   │   ├── docs/         # Documentation (.mdx)
│   │   └── pages/        # Static pages (.mdx)
│   └── styles/
│       └── global.css    # Global styles + theme
├── public/
│   └── uploads/          # Media uploaded via CMS
├── tina/
│   └── config.ts         # Tina CMS configuration
├── CLAUDE.md             # Claude Code working memory
├── astro.config.mjs      # Astro configuration
├── package.json
└── README.md
```

## Available Scripts

```bash
# Development
npm run dev          # Start Astro + Tina dev server
npm run start        # Start Astro only

# Production
npm run build        # Type check + build Astro site
npm run tina:build   # Build Tina admin panel
npm run preview      # Preview production build locally

# Type Checking
npm run astro check  # Check TypeScript types
```

## Content Management

### Content Types

#### Blog Posts
- Path: `src/content/blog/*.mdx`
- Fields: title, description, pubDate, author, tags, heroImage, draft
- Use case: Announcements, articles, updates

#### Documentation
- Path: `src/content/docs/*.mdx`
- Fields: title, description, order, category
- Use case: Guides, references, technical docs

#### Pages
- Path: `src/content/pages/*.mdx`
- Fields: title, description
- Use case: About, Contact, static content

### Creating Content

#### Via Tina CMS (Non-Technical)

1. Navigate to `/admin` in your browser
2. Authenticate with GitHub
3. Click "Create New" and select content type
4. Fill in the form fields
5. Write content in the rich text editor
6. Click "Save" - this commits directly to GitHub
7. GitHub Actions will automatically build and deploy

#### Via File Editing (Technical)

1. Create a new `.mdx` file in the appropriate directory:
   - Blog: `src/content/blog/my-post.mdx`
   - Docs: `src/content/docs/my-guide.mdx`
   - Pages: `src/content/pages/my-page.mdx`

2. Add frontmatter with required fields:

```mdx
---
title: "My Blog Post"
description: "A brief description"
pubDate: 2025-11-05
author: "Your Name"
tags: ["topic", "category"]
draft: false
---

# Your Content Here

Write your content using MDX (Markdown + JSX).
```

3. Commit and push:

```bash
git add src/content/blog/my-post.mdx
git commit -m "Add new blog post about X"
git push origin main
```

## Deployment

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to Pages section
3. Under "Build and deployment":
   - Source: GitHub Actions (not branch)
4. First push to `main` will trigger the workflow

### Deployment Process

```
Push to main → GitHub Actions triggered
  ↓
Install dependencies
  ↓
Build Tina admin
  ↓
Build Astro site
  ↓
Generate Pagefind index
  ↓
Upload artifact
  ↓
Deploy to GitHub Pages
```

The site will be available at: `https://your-username.github.io/repo-name`

### Manual Deployment

You can also trigger a deployment manually:
1. Go to Actions tab in GitHub
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

## Features Guide

### Search

- Press **Cmd+K** (Mac) or **Ctrl+K** (Windows/Linux) to open search
- Type to search across all content
- Use arrow keys to navigate results
- Press Enter to visit a result
- Press Escape to close

### Theme Toggle

- Click the sun/moon icon in the header to switch themes
- Your preference is saved in localStorage
- Theme persists across page visits

### Navigation

- Header has main navigation links
- Docs include sidebar navigation by category
- Long docs show table of contents on the right
- Blog posts show tags for filtering

## Customization

### Site Configuration

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://your-domain.com',  // Your production URL
  base: '/your-base-path',          // Or '/' for root
  // ... other config
});
```

### Theme Colors

Edit `src/styles/global.css` to customize the color scheme:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... other colors */
}
```

### Add New Content Collections

1. Define schema in `src/content/config.ts`
2. Add collection to Tina config in `tina/config.ts`
3. Create pages in `src/pages/` for the collection
4. Update navigation in `src/components/layout/Header.astro`

## Troubleshooting

### Build Fails

1. Check Node.js version: `node --version` (should be 20+)
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check for TypeScript errors: `npm run astro check`

### CMS Not Loading

1. Verify environment variables are set correctly
2. Check GitHub token has `repo` scope
3. Verify repository owner and name are correct
4. Check browser console for errors

### Search Not Working

1. Pagefind runs after build, not in dev mode
2. Test search after running `npm run build && npm run preview`
3. Check that Pagefind is installed: `npx pagefind --version`

### Theme Not Persisting

1. Check browser localStorage is enabled
2. Verify the script in `BaseLayout.astro` is executing
3. Clear browser cache and try again

## Architecture Decisions

### Why Astro?
- Fast static site generation
- Islands architecture for minimal JavaScript
- Excellent content-first features
- Native MDX support

### Why Tina CMS?
- GitHub-first approach (no external database)
- Real-time editing with instant preview
- Type-safe schemas matching content collections
- Accessible to non-technical users

### Why GitHub Pages?
- Free hosting
- Automatic HTTPS
- Native integration with GitHub Actions
- Simple deployment workflow

### Why Pagefind?
- Static search index (no server needed)
- Fast and lightweight
- Works offline
- Easy integration with Astro

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Test locally: `npm run build && npm run preview`
4. Commit: `git commit -m "Add feature X"`
5. Push: `git push origin feature/my-feature`
6. Create a Pull Request on GitHub

## Claude Code Integration

This project uses Claude Code's agentic development approach:

- **CLAUDE.md**: Working memory and project context
- **Agents**: Specialized AI assistants (architect, frontend, cms, etc.)
- **Skills**: Reusable patterns for Astro, Tina, GitHub Actions
- **Commands**: Workflow automation (`/spec`, `/review`)

See `.claude/` directory for details.

## License

MIT License - feel free to use for your own projects

## Support

- Check the [documentation](/docs) for guides
- Search existing issues on GitHub
- Create a new issue for bugs or feature requests

## Roadmap

- [ ] Additional MDX components (Callout, Tabs, etc.)
- [ ] Content templates
- [ ] Enhanced search filtering
- [ ] RSS feed generation
- [ ] Social media preview cards
- [ ] Multi-language support

---

Built with ❤️ using Astro, React, TypeScript, and Tailwind CSS
