# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio and blog built with Astro 5.x, featuring a hybrid architecture combining static generation (Astro) with client-side interactivity (React 19). Content is managed via TinaCMS with a local-first approach.

**Key Technologies:**
- Astro 5.17+ (SSG framework)
- React 19 (client components)
- TinaCMS 3.x (headless CMS, local mode)
- Tailwind CSS 3.4+ (styling)
- Framer Motion 12+ (animations)
- TypeScript (strict mode)

## Development Commands

```bash
# Start dev server with TinaCMS admin UI
npm run dev
# Access site: http://localhost:4321
# Access TinaCMS: http://localhost:4321/admin/index.html

# Start Astro dev server only (without TinaCMS)
npm run dev:astro

# Build for production (runs TinaCMS build first, then Astro build)
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro -- <command>
```

## Architecture

### Hybrid Rendering Strategy

**Static Components (Astro):** Use for SEO-critical, non-interactive content
- About, Skills, Recent Posts, Contact sections
- Blog index and post layouts
- Header, Footer

**Client Components (React with `client:load`):** Use for interactive features
- Hero section (Framer Motion animations)
- Projects section (hover effects, scroll animations)
- Any component requiring client-side state or events

**Decision Rule:** Only use React + `client:load` when you need animations, hover states, or client interactivity. Default to Astro for everything else to minimize bundle size.

### Directory Structure

```
src/
├── pages/              # File-based routing
│   ├── index.astro     # Homepage (hybrid components)
│   ├── about.astro     # About page
│   ├── blog/
│   │   ├── index.astro # Blog list
│   │   └── [slug].astro # Dynamic blog post pages
│   └── rss.xml.js      # RSS feed generation
├── components/
│   ├── home/           # Homepage-specific sections
│   │   ├── HeroSection.tsx       # React - Animated
│   │   ├── ProjectsSection.tsx   # React - Animated
│   │   ├── AboutSection.astro    # Static
│   │   ├── SkillsSection.astro   # Static
│   │   ├── RecentPostsSection.astro # Static
│   │   └── ContactSection.astro  # Static
│   ├── react/          # Reusable React components
│   └── *.astro         # Global Astro components (Header, Footer, etc)
├── layouts/
│   └── BlogPost.astro  # Blog post layout with hybrid image support
├── content/
│   └── blog/           # Markdown/MDX blog posts (managed by TinaCMS)
└── content.config.ts   # Content collections schema

public/
├── admin/              # TinaCMS admin UI (auto-generated)
└── uploads/            # TinaCMS uploaded images (not optimized)

tina/
└── config.ts           # TinaCMS configuration (local mode)
```

### Content Collections

Blog posts use Astro Content Collections with glob loader:
- Location: `src/content/blog/`
- Format: Markdown with frontmatter
- Schema enforced by `src/content.config.ts`
- Access via `getCollection('blog')`

### Image Strategy (Hybrid Approach)

**Two image paths are supported:**

1. **Public folder** (`public/uploads/`): For TinaCMS uploads
   - Path in frontmatter: `/uploads/image.jpg` (string)
   - Rendered with: `<img>` tag
   - Trade-offs: No optimization, faster builds, CMS-friendly

2. **Assets folder** (`src/assets/`): For optimized images
   - Path in frontmatter: `../../assets/image.jpg` (relative)
   - Rendered with: `<Image>` component from `astro:assets`
   - Trade-offs: Auto WebP conversion, responsive srcsets, slower builds

**Schema supports both:**
```typescript
heroImage: z.union([z.string(), image()]).optional()
```

**Type detection pattern:**
```astro
---
const isPublicImage = typeof heroImage === 'string';
---
{isPublicImage ? (
  <img src={heroImage} alt={title} />
) : (
  <Image src={heroImage} alt={title} width={1020} height={510} />
)}
```

**When to use which:**
- TinaCMS uploads → automatic → `public/uploads/`
- Production-critical images → manual → `src/assets/`

## TinaCMS Integration

**Local Mode (No Cloud):**
- No authentication required for local development
- Admin UI: `http://localhost:4321/admin/index.html`
- Media uploads go to `public/uploads/`
- Content saved directly to `src/content/blog/` as Markdown files

**Configuration:** `tina/config.ts`
- Schema mirrors Astro content collection schema
- Fields: title, description, pubDate, updatedDate, heroImage, tags, draft, body

**Build Process:**
- `tinacms build` generates admin UI in `public/admin/`
- Must run before `astro build` (handled by npm build script)

## Styling Guidelines

**Tailwind Configuration:** Standard setup, content scanning includes all Astro/React/MDX files

**Responsive Breakpoints:**
- Mobile-first approach
- Breakpoints: `md:` (768px), `lg:` (1024px), `xl:` (1280px)

**Dark Mode:**
- Implemented via Tailwind's `dark:` classes
- No toggle implemented yet (system preference or manual class on `<html>`)

**Color System:**
- Light: white, gray-50, gray-100 backgrounds; gray-700/900 text
- Dark: gray-900, gray-800 backgrounds; gray-300/white text
- Accents: blue-600/purple-600 (light), blue-400/purple-400 (dark)

## React + Framer Motion Patterns

**Animation Best Practices:**
- Import only needed components: `import { motion } from 'framer-motion'`
- Use `initial`, `animate`, `transition` props for entrance animations
- `whileInView` for scroll-triggered animations
- Keep animations subtle (0.3-0.5s duration)

**Client Directive:**
- Always use `client:load` for Framer Motion components
- Import in Astro: `import HeroSection from '@/components/home/HeroSection'`
- Render: `<HeroSection client:load />`

## TypeScript Configuration

- Extends: `astro/tsconfigs/strict`
- `strictNullChecks: true`
- JSX: `react-jsx` with `jsxImportSource: "react"`
- React 19 types installed

## Build & Deployment

**Build Output:** `./dist/` (static site)

**Build Order:**
1. `tinacms build` → generates admin UI
2. `astro build` → generates static site

**Environment Variables:**
- Not required for local development
- `.env.example` shows optional Tina Cloud config
- `PUBLIC_*` prefix for client-side env vars

## Common Patterns

### Adding a New Blog Post

**Via TinaCMS (Recommended):**
1. Run `npm run dev`
2. Open `http://localhost:4321/admin/index.html`
3. Create new post, upload images (auto-saved to `public/uploads/`)
4. Post saved to `src/content/blog/`

**Manually:**
1. Create `src/content/blog/your-post.md`
2. Add required frontmatter: title, description, pubDate
3. Add optional: updatedDate, heroImage, tags, draft
4. Write content in Markdown

### Adding a New Homepage Section

1. Create component in `src/components/home/`
2. Choose Astro (static) or React (interactive)
3. Import in `src/pages/index.astro`
4. Add between existing sections

### Converting Astro Component to React

When you need client-side interactivity:
1. Change `.astro` → `.tsx`
2. Convert Astro syntax to JSX
3. Add Framer Motion if animations needed
4. Update import in parent: `import Component from '...'`
5. Add `client:load` directive: `<Component client:load />`

### Optimizing Public Images

To move TinaCMS uploads to optimized assets:
```bash
# 1. Move file
mv public/uploads/image.jpg src/assets/blog/image.jpg

# 2. Update frontmatter in blog post
# From: heroImage: /uploads/image.jpg
# To:   heroImage: ../../assets/blog/image.jpg
```

## Git Workflow

**Current Branch:** `master`
**Main Branch:** `main` (use for PRs)

**Ignored Directories:**
- `.astro/` (build cache)
- `dist/` (build output)
- `node_modules/`
- `public/admin/` (generated by TinaCMS)
- `tina/__generated__/` (generated types)

## Performance Considerations

- **Selective Hydration:** Only Hero and Projects sections use React
- **Static First:** Most content is pre-rendered HTML
- **Image Optimization:** Use `src/assets/` for production images
- **Code Splitting:** React components automatically split by Astro
- **RSS/Sitemap:** Auto-generated on build

## Known Issues & Gotchas

1. **TinaCMS dev server:** Must use `npm run dev`, not `npm run dev:astro`, to access admin UI
2. **Image type errors:** Ensure hybrid image detection pattern is used in all components displaying blog images
3. **Dark mode:** No toggle implemented; requires manual testing with browser DevTools or system settings
4. **Build order:** TinaCMS build must precede Astro build (handled by scripts)
5. **React 19:** Ensure strict null checks and proper typing for props

## Project-Specific Documentation

Detailed guides available in repository:
- `HYBRID_IMAGE_SETUP.md` - Complete image handling documentation
- `PORTFOLIO_HOME_GUIDE.md` - Homepage architecture and customization guide
