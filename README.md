Go Paddie Travel Itinerary is a feature‑oriented Next.js application for planning trips, including activities and hotels.

### Project structure

- **Features** are grouped under `features/*` (for example `features/activities`, `features/hotels`).
- **Shared modules** are located at the root:
  - `components/*` – reusable UI and layout components.
  - `queries/*` – React Query hooks.
  - `features/**/api/*` and `services/*` – HTTP clients and service helpers.
  - `constants/*`, `lib/utils/*` – configuration, helpers, formatting, validation.

### Technology stack

- Next.js (App Router)
- React with TypeScript
- Tailwind CSS with a custom component layer
- React Query, React Hook Form, Zod

### Running locally

```bash
npm install
npm run dev
```

The application runs on `http://localhost:3000`. The project uses **npm** as the package manager.
