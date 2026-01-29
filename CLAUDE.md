# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with React, TypeScript, and Vite. The site uses a custom static site generator architecture powered by Apocrypha (a Markdoc-based content framework) that processes markdown content files into React components at build time.

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code with Biome
npm run lint
```

## Architecture

### Content Pipeline

The core architecture revolves around processing markdown content through a metadata enrichment pipeline:

1. **Content Files** (`content/`): Markdown files with frontmatter define articles, pages, and music entries
2. **Build-Time Processing** (`build/metadata/`): Multiple metadata plugins extract and enhance content:
   - `getBasicMetadata`: Extracts frontmatter (title, date, type, state)
   - `getThumbnail`: Resolves thumbnail images
   - `getContentStats`: Calculates reading time and grade level
   - `getExcerpt`: Extracts article excerpt from lead-in
   - `getImages`: Collects all images with metadata
   - `getOutgoingLinks`: Extracts external links
   - `getSections`: Builds table of contents from headings
   - `getSpotifyData`: Enriches music articles with Spotify API data (cached in `.cache/spotify/`)
3. **Markdoc Components** (`src/markdoc/`): Custom tags and nodes for rich content (e.g., `{% music-grid /%}`, `{% article-card /%}`)
4. **React Components** (`src/components/`): Render processed content with layouts

### Key Directories

- `build/`: Build-time code (metadata extraction, Spotify integration, utilities)
- `src/`: Frontend React application
  - `src/shell/`: Core layout components (header, footer, navigation, theme provider)
  - `src/components/`: Content components and layouts
  - `src/markdoc/`: Markdoc tag/node definitions that map to React components
  - `src/util/`: Utility functions and React hooks
- `content/`: Markdown content files organized by type
- `assets/`: Static assets (fonts, images)
- `functions/`: Cloudflare Pages Functions (API endpoints)

### Content Types

Articles have different types that affect rendering:

- `page`: Static pages (e.g., homepage, uses page)
- `narrative`: Long-form writing with full layout
- `vignette`: Short stories/anecdotes
- `instructional`: Technical articles
- `music`: Music-specific layout with Spotify integration

### Spotify Integration

The site features music pages enriched with Spotify data. The `SpotifyClient` (`build/spotify/`) fetches album and track metadata, with responses cached in `.cache/spotify/` to avoid rate limits. Environment variables in `.env` configure Spotify API credentials.

### Routing and Rendering

The app uses React Router with dynamic routes generated from the content catalog. The `Body` component (`src/shell/Body.tsx`) selects the appropriate layout (default or music) based on article metadata type. All routes use Framer Motion for page transitions.

### Styling

The site uses Tailwind CSS 4 with a custom semantic color system for theme support. Typography uses the SN Pro variable font. Theme switching is managed by `ThemeProvider` and stored in localStorage.

## Configuration

- **Vite Config** (`vite.config.ts`): Configures Apocrypha plugin with content paths and metadata pipeline
- **TypeScript** (`tsconfig.json`): Strict mode enabled, includes both `build/` and `src/`
- **Biome** (`biome.jsonc`): Code formatting and linting (single quotes, 100 char line width)
- **Environment** (`.env`): Spotify API credentials, base URLs, ports

## Important Notes

- Content changes trigger hot reload during development via Apocrypha's file watcher
- The metadata pipeline runs at build time, not request time
- Spotify data is cached indefinitely - delete `.cache/spotify/` to refresh
- The `functions/` directory contains Cloudflare Pages Functions, not client-side code
