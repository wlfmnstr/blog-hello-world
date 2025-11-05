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
**Current Phase:** Setup

### Completed
- [x] Project scaffolding initiated
- [ ] Content collections
- [ ] Tina CMS with GitHub backend
- [ ] UI components
- [ ] GitHub Actions workflows
- [ ] Search & theme toggle
- [ ] Sample content
- [ ] Documentation

### In Progress
- Creating Claude Code agentic scaffolding (CLAUDE.md, subagents, skills, commands)
- Setting up project structure

### Blocked
None currently

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

1. Create all Claude Code scaffolding:
   - 6 subagent files in `.claude/agents/`
   - 3 skill folders in `.claude/skills/`
   - 2 command files in `.claude/commands/`
2. Initialize Astro project with proper configuration
3. Set up content collections
4. Configure Tina CMS with GitHub backend
5. Build core UI components
6. Set up GitHub Actions deployment

## Notes & Learnings

**2025-11-05 - Project Initialization:**
- Starting with Claude Code agentic development approach
- Using CLAUDE.md as persistent working memory
- Subagents will handle specialized domains (architecture, frontend, CMS, deployment, content, integration)
- Skills provide reusable patterns for Astro, Tina, and GitHub Actions
- Commands enable workflow automation (/spec, /review)
