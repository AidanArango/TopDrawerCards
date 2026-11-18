# Top Drawer Cards — Phase 1

The new site foundation uses Next.js App Router, TypeScript, Tailwind CSS, and
local demo artwork. No Supabase account or environment variables are needed to
preview this phase.

## Requirements

- Node.js 22 LTS (Next.js requires Node.js 20.9 or newer)
- npm

## Run locally

Open this folder in Visual Studio Code, then open **Terminal → New Terminal**:

```powershell
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). Stop the server with
`Ctrl+C`.

Useful checks:

```powershell
npm run typecheck
npm run build
```

## Phase 1 routes and files

- `/` — editorial homepage
- `/collection` — responsive gallery of clearly marked demo cards
- `src/components` — shared header, footer, theme controls, and card component
- `src/lib/sample-cards.ts` — demo-only collection data
- `public/images` — local brand logo and original vector demo artwork

The existing static-site files are left untouched. Phase 1 is served by the
Next.js app under `src/app`; no existing files or images are required to run it.
Replace the sample artwork and text with confirmed collection details in a
later phase.

## Project structure

```text
src/
  app/
    collection/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
  lib/
public/
  images/
```

The shadcn/ui configuration is ready for future shared interface primitives.
This phase uses small accessible components directly and does not add UI-kit
dependencies that are not needed yet.
