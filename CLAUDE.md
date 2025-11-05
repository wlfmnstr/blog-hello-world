# Knowledge Base Project - Context & Memory

## Project Overview
Building an internal Git-based knowledge base with:
- Dual editing: Tina CMS (visual) + direct MDX files (code)
- Tech: Astro 4.x + React + TypeScript + Tailwind
- Storage: GitHub (MDX files, no database)
- CI/CD: GitHub Actions exclusively
- Hosting: GitHub Pages initially
- Search: Pagefind static index

## Development Status
**Current Phase:** Complete - Production Ready

### Completed
- [x] Claude Code agentic scaffolding (CLAUDE.md, 6 subagents, 3 skills, 2 commands)
- [x] Project scaffolding and Astro setup
- [x] Content collections with Zod schemas (blog, docs, pages)
- [x] Tina CMS with GitHub backend configuration
- [x] UI components (Header, Footer, ThemeToggle, Search)
- [x] Complete page templates (blog, docs, about, home)
- [x] GitHub Actions deployment workflow
- [x] Pagefind search with Cmd/Ctrl+K shortcut
- [x] Dark/light theme toggle with persistence
- [x] Sample content (2 blog posts, 2 docs, 1 page)
- [x] Comprehensive README.md documentation

### In Progress
None - all core features implemented

### Blocked
None

## Architecture Decisions

### ADR-001: GitHub-First Architecture
**Decision:** All storage, CI/CD, and hosting through GitHub ecosystem
**Rationale:** Simplifies infrastructure, leverages existing GitHub features, no external dependencies
**Implications:** Must use GitHub API for CMS backend, GitHub Actions for deployment, GitHub Pages for hosting

### ADR-002: Static Site Generation
**Decision:** Astro with static output (no SSR)
**Rationale:** Best performance, simplest deployment to GitHub Pages, no server needed
**Implications:** All content must be known at build time, search uses static Pagefind index

### ADR-003: Dual Editing Model
**Decision:** Support both Tina CMS (visual) and direct file editing
**Rationale:** Empowers both technical and non-technical users
**Implications:** Schemas must stay in sync, both paths commit to GitHub

## Code Standards
- TypeScript strict mode, no `any`
- Astro best practices for static generation
- React components as islands only
- Tailwind utility-first styling
- MDX for content with frontmatter

## Git Workflow
- Branch: claude/kb-system-setup-011CUp5NbMuhDiUzkZVtk7ej
- Commits: descriptive, atomic
- GitHub Actions deploy on push to main

## Build Commands
```bash
npm run dev          # Astro + Tina local
npm run build        # Production build
npm run preview      # Preview build locally
npm run tina:build   # Build Tina admin
```

## Key Constraints

- Internal tool (no SEO/analytics/social features)
- GitHub-first (Actions + Pages + API)
- Fast builds (<2 min)
- Simple initially, extensible later

## Next Steps

**Ready for Deployment:**
1. Set up environment variables (see .env.example)
2. Configure GitHub Pages in repository settings
3. Push to main branch to trigger deployment
4. Test CMS at `/admin` route
5. Create initial content for the team

**Future Enhancements:**
- Additional MDX components (Callout, Tabs, CodeBlock)
- Content templates for common doc types
- RSS feed generation
- Enhanced search filtering by content type
- Multi-language support

## Notes & Learnings

**2025-11-05 - Project Development:**
- Successfully implemented agentic development approach with Claude Code
- CLAUDE.md proved valuable for tracking context and decisions
- Created comprehensive scaffolding: 6 subagents, 3 skills, 2 commands
- All core features implemented in single development session
- Project is production-ready and can be deployed immediately

**Key Implementation Details:**
- Tina CMS configured for GitHub API backend (not local filesystem)
- Pagefind search runs in CI/CD pipeline after Astro build
- Theme toggle uses localStorage with inline script to prevent flash
- Search component uses React with client:load directive
- All pages use static generation (output: 'static')
- Content collections enforce schema validation with Zod
- GitHub Actions workflow includes proper permissions for Pages deployment

**Architecture Insights:**
- Astro's islands architecture keeps JavaScript minimal
- MDX enables rich content with React components
- Tailwind custom properties enable easy theming
- Static Pagefind index provides fast search without server
- GitHub-first approach eliminates need for external services
