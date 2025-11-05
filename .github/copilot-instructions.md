# Copilot Instructions for Knowledge Base Project

## Project Overview

This is a Git-based knowledge base system with dual editing capabilities:
- **Visual editing**: Tina CMS at `/admin` route for non-technical users
- **Code editing**: Direct MDX file editing for developers
- **Architecture**: Astro 4.x static site generator with React islands, TypeScript strict mode, and Tailwind CSS
- **Storage**: GitHub as single source of truth (no external database)
- **Deployment**: GitHub Actions CI/CD pipeline deploying to GitHub Pages
- **Search**: Pagefind static search index

## Tech Stack

- **Framework**: Astro 4.x (static site generation, output: 'static')
- **UI Library**: React 18 (islands architecture only, minimal JavaScript)
- **Language**: TypeScript 5.6+ (strict mode, no `any` types)
- **Styling**: Tailwind CSS 3.4+ (utility-first approach)
- **CMS**: Tina CMS 2.2+ (GitHub API backend)
- **Content**: MDX files with frontmatter (Zod schema validation)
- **Search**: Pagefind 1.1+ (static index built during CI/CD)

## Code Standards & Conventions

### TypeScript
- Always use strict mode
- Never use `any` type - prefer `unknown` or specific types
- Define explicit return types for functions
- Use type inference where it improves readability

### React Components
- Use React only as Astro islands with `client:*` directives
- Prefer `client:load` for interactive components
- Keep components small and focused
- Use TypeScript interfaces for props

### Astro Best Practices
- Use static generation exclusively (no SSR)
- Leverage content collections for all content types
- Use Astro components for layouts and static content
- Only use React for interactive features

### Styling
- Use Tailwind utility classes exclusively
- Follow mobile-first responsive design
- Use CSS custom properties defined in `src/styles/global.css` for theming
- Never write custom CSS unless absolutely necessary

### Content Management
- All content lives in `src/content/` with Zod schemas
- Three content types: blog, docs, pages
- MDX files must have valid frontmatter matching schemas
- Both Tina CMS and direct file editing must work

### File Naming
- Use kebab-case for file names: `my-blog-post.mdx`, `user-auth.ts`
- React components: PascalCase files with `.tsx` extension
- Astro components: PascalCase files with `.astro` extension

## Project Structure

```
/
├── .github/
│   ├── workflows/          # GitHub Actions (deploy.yml)
│   └── copilot-instructions.md
├── src/
│   ├── components/
│   │   ├── layout/        # Header, Footer, ThemeToggle
│   │   ├── content/       # Search, BlogCard, DocCard
│   │   └── mdx/          # Custom MDX components
│   ├── layouts/          # BaseLayout, MainLayout
│   ├── pages/            # Astro pages (file-based routing)
│   │   ├── index.astro
│   │   ├── blog/         # Blog listing and posts
│   │   ├── docs/         # Documentation pages
│   │   └── about.astro
│   ├── content/          # Content collections
│   │   ├── config.ts     # Zod schemas
│   │   ├── blog/         # Blog posts (.mdx)
│   │   ├── docs/         # Documentation (.mdx)
│   │   └── pages/        # Static pages (.mdx)
│   └── styles/
│       └── global.css    # Global styles + theme variables
├── public/
│   └── uploads/          # Media uploaded via CMS
├── tina/
│   └── config.ts         # Tina CMS configuration
├── CLAUDE.md             # Project context for Claude Code
└── README.md             # Comprehensive documentation
```

## Build & Development Commands

```bash
# Development (Astro + Tina CMS)
npm run dev              # Start dev server at localhost:4321

# Development (Astro only)
npm run start            # Start Astro dev server without Tina

# Production Build
npm run build            # Type check + build Astro site
npm run tina:build       # Build Tina admin panel
npm run preview          # Preview production build

# Type Checking
npm run astro check      # Check TypeScript types
```

## Content Types & Schemas

### Blog Posts (`src/content/blog/*.mdx`)
```typescript
{
  title: string          // Required
  description: string    // Required
  pubDate: Date         // Required
  author: string        // Required
  tags: string[]        // Optional
  heroImage: string     // Optional
  draft: boolean        // Optional (default: false)
}
```

### Documentation (`src/content/docs/*.mdx`)
```typescript
{
  title: string          // Required
  description: string    // Required
  order: number         // Optional (for sorting)
  category: string      // Optional (for grouping)
}
```

### Pages (`src/content/pages/*.mdx`)
```typescript
{
  title: string          // Required
  description: string    // Required
}
```

## Making Changes

### When Modifying Content Schema
1. Update Zod schema in `src/content/config.ts`
2. Update Tina schema in `tina/config.ts`
3. Update TypeScript types if needed
4. Test with both Tina CMS and direct file editing

### When Adding Components
1. Place in appropriate directory under `src/components/`
2. Use TypeScript for props
3. If interactive, use React with minimal `client:*` directive
4. If static, prefer Astro components

### When Adding Routes
1. Create file in `src/pages/` (file-based routing)
2. Use existing layouts: `BaseLayout` or `MainLayout`
3. Follow SSG patterns (no `getServerSideProps` equivalent)

### When Modifying Styles
1. Edit Tailwind utility classes in components
2. For theme changes, edit CSS custom properties in `src/styles/global.css`
3. Maintain both light and dark theme support

## Important Constraints

### GitHub-First Architecture
- All storage through GitHub (no external databases)
- CI/CD exclusively through GitHub Actions
- Hosting on GitHub Pages
- Tina CMS uses GitHub API backend

### Static Site Generation Only
- No server-side rendering (SSR)
- No API routes
- All content must be available at build time
- Search uses pre-built static Pagefind index

### Performance Requirements
- Fast builds (target: under 2 minutes)
- Minimal JavaScript (islands architecture)
- Optimized for static hosting
- Lazy loading for images and interactive components

### Security Considerations
- Never commit secrets to repository
- Use environment variables for sensitive data (see `.env.example`)
- GitHub token needs `repo` scope for Tina CMS
- Branch protection on `main` branch

## Environment Variables

Required for Tina CMS:
```env
GITHUB_OWNER=your-username
GITHUB_REPO=blog-hello-world
GITHUB_BRANCH=main
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxx
PUBLIC_SITE_URL=https://your-username.github.io/blog-hello-world
```

## Testing Strategy

This is a static site project with minimal testing infrastructure:
- Type checking via `npm run astro check`
- Build validation via `npm run build`
- Manual testing in development mode
- Preview builds before deployment

**Note**: There is no formal test suite. When making changes:
1. Run type checking to catch TypeScript errors
2. Build the site to ensure it compiles
3. Test locally in dev mode
4. Preview production build

## Deployment Workflow

1. Push to `main` branch or create PR
2. GitHub Actions workflow triggers (`.github/workflows/deploy.yml`)
3. Install dependencies
4. Build Tina admin panel
5. Build Astro site
6. Generate Pagefind search index
7. Deploy to GitHub Pages

**CI/CD runs only after manual PR approval** - Copilot cannot trigger deployments directly.

## Common Tasks

### Adding a Blog Post
Create `src/content/blog/my-post.mdx` with valid frontmatter or use Tina CMS at `/admin`.

### Adding Documentation
Create `src/content/docs/my-guide.mdx` with valid frontmatter or use Tina CMS.

### Updating Navigation
Edit `src/components/layout/Header.astro` for main navigation links.

### Customizing Theme
Edit CSS custom properties in `src/styles/global.css` under `:root` and `[data-theme="dark"]`.

### Adding MDX Components
1. Create component in `src/components/mdx/`
2. Export from component file
3. Import in MDX files where needed

## Related Documentation

- **README.md**: Comprehensive setup and usage guide
- **CLAUDE.md**: Project context and development history
- **.claude/**: Claude Code agents, skills, and commands
- **Astro Docs**: https://docs.astro.build
- **Tina CMS Docs**: https://tina.io/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

## Architecture Decisions

### ADR-001: GitHub-First Architecture
All infrastructure through GitHub ecosystem to minimize external dependencies and simplify deployment.

### ADR-002: Static Site Generation
Astro with static output for best performance, simplest deployment, and no server requirements.

### ADR-003: Dual Editing Model
Support both Tina CMS (visual) and direct file editing to empower both technical and non-technical users.

## What NOT to Do

- ❌ Don't add server-side rendering (SSR) or API routes
- ❌ Don't introduce external databases or services
- ❌ Don't use CSS-in-JS or styled-components
- ❌ Don't add React for static content (use Astro components)
- ❌ Don't commit `.env` files or secrets
- ❌ Don't modify the deployment workflow without careful consideration
- ❌ Don't add dependencies without checking for security vulnerabilities
- ❌ Don't break Tina CMS compatibility when changing content schemas
- ❌ Don't add SEO, analytics, or social features (internal tool)

## Getting Help

- Check existing issues on GitHub
- Review README.md for setup instructions
- Consult CLAUDE.md for project context
- Reference Astro, Tina, or Tailwind documentation
