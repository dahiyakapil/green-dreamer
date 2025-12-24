Green Dreamer — Next.js app

Overview
This is a Next.js application (app router) used as a small dashboard/demo site. It includes authentication, a dashboard area with product and user pages, UI components using MUI, a small client API service, and simple state stores.

Key features
- Authentication: NextAuth-based auth endpoint at [src/app/api/auth/[...nextauth]/route.ts](src/app/api/auth/[...nextauth]/route.ts)
- Dashboard (protected): routes under [src/app/dashboard](src/app/dashboard)
- Products: listing and detail pages at [src/app/dashboard/products](src/app/dashboard/products)
- Users: listing and detail pages at [src/app/dashboard/users](src/app/dashboard/users)
- Login page: [src/app/login/page.tsx](src/app/login/page.tsx)
- Reusable components: `Navbar`, `ProductCard`, `ProtectedRoute`, `UserTable` under [src/components](src/components)
- API client: Axios-based service in [src/services/api.ts](src/services/api.ts)
- State management: lightweight stores under [src/store](src/store) (e.g. `authStore`, `productsStore`, `usersStore`)
- Theming: MUI theme at [src/theme/muiTheme.ts](src/theme/muiTheme.ts)

Tech stack & dependencies
- Framework: Next.js 16 (app router)
- React: 19
- UI: MUI (@mui/material, @mui/icons-material) + Emotion for styling
- State: `zustand` stores
- Auth: `next-auth` (NextAuth)
- HTTP client: `axios`
- Styling helpers: Tailwind CSS (dev dependency)

Exact dependencies (from `package.json`)
- next 16.1.1
- react 19.2.3, react-dom 19.2.3
# Green Dreamer — Next.js Dashboard (Assessment-ready)

## Overview
Green Dreamer is a small Next.js (app router) dashboard demo built with Material UI and Zustand. It demonstrates authentication, protected dashboard routes, user and product listing/detail pages, a simple Axios API client, and lightweight client-side stores.

This repository has been adapted to meet the "Help Study Abroad" frontend technical assessment using the public DummyJSON API (https://dummyjson.com/).

## Summary of Assessment Mapping
- Authentication: NextAuth route at [src/app/api/auth/[...nextauth]/route.ts](src/app/api/auth/[...nextauth]/route.ts). Client auth state in the store at [src/store/authStore.ts](src/store/authStore.ts).
- Users: list, search, pagination, and single-user view at [src/app/dashboard/users](src/app/dashboard/users).
- Products: paginated/searchable product grid, category filter, and product details with an image carousel at [src/components/ImagesCarousel.tsx](src/components/ImagesCarousel.tsx).
- State: `zustand` stores under [src/store](src/store) manage auth, users, and products; async actions and lightweight in-memory caching are implemented.

## Quick Start
1. Install dependencies:

```bash
npm install
```

2. (Optional) Create `.env.local` for NextAuth when running locally:

- `NEXTAUTH_URL`=http://localhost:3000
- `NEXTAUTH_SECRET`=<secure-random-string>

3. Run development server:

```bash
npm run dev
```

Open http://localhost:3000

## What’s Implemented (Checklist)
- Authentication: NextAuth endpoint + client login page ([src/app/login/page.tsx](src/app/login/page.tsx)). Token persisted to `zustand` (optional localStorage).
- Route protection: dashboard routes are protected via the `ProtectedRoute` wrapper.
- Users list: responsive MUI table/cards with API-side pagination and search.
- User detail: dedicated page with full user information and a "Back to Users" link.
- Products list: responsive MUI grid with pagination, search, and category filter.
- Product detail: image carousel, full description, and "Back to Products" link.
- State management: `zustand` stores for auth, users, and products with async API actions and in-memory caching.

## Architecture & Rationale
- UI: Material-UI (MUI) for consistent, accessible components and responsive layouts.
- State: Zustand chosen for its small footprint, simple API, and ability to colocate async actions and caching inside stores—ideal for small-to-medium demos.
- Data: DummyJSON (https://dummyjson.com/) is used for all backend endpoints (auth, users, products).

### Caching strategy (brief)
- List responses are cached in-memory keyed by query params (e.g. `users?limit=10&skip=0&q=...`).
- Short TTL (minutes) keeps data reasonably fresh while reducing redundant requests.
- Caching improves perceived performance when navigating between paginated/listed views.

## Performance & Best Practices
- Uses API-side pagination (`limit`/`skip`) to avoid fetching large datasets.
- Components use `React.memo`, `useCallback`, and `useMemo` where beneficial to limit re-renders.

## Useful Files
- API client: [src/services/api.ts](src/services/api.ts)
- Auth store: [src/store/authStore.ts](src/store/authStore.ts)
- Protected route wrapper: [src/components/ProtectedRoute.tsx](src/components/ProtectedRoute.tsx)

## Next Steps / Suggestions
- Add unit and integration tests for stores and critical components.
- Improve loading and error states across list/detail pages.
- Add E2E tests for auth and protected routes.

## Contributing
- Fork the repository, create a feature branch, and submit a pull request with a concise description of changes.

---
Generated/updated to present the project as an assessment submission.
