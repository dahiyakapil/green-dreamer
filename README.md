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
- @mui/material 7.3.6, @emotion/react, @emotion/styled
- next-auth 4.24.13
- axios 1.13.2
- zustand 5.0.9

Project structure (high level)
- [src/app](src/app) – Next.js app routes and pages
	- [src/app/page.tsx](src/app/page.tsx) – public root page
	- [src/app/dashboard](src/app/dashboard) – dashboard layout and child pages
	- [src/app/login/page.tsx](src/app/login/page.tsx)
	- [src/app/api/auth/[...nextauth]/route.ts](src/app/api/auth/[...nextauth]/route.ts)
- [src/components](src/components) – UI components
- [src/services/api.ts](src/services/api.ts) – API helpers (axios)
- [src/store](src/store) – small client-side stores
- [src/theme/muiTheme.ts](src/theme/muiTheme.ts) – MUI theme configuration

Data types (what the app uses)
The app primarily works with two domain types: Users and Products. Below are example TypeScript-style shapes used as a guide (your actual types may vary):

```
interface User {
	id: string | number
	name?: string
	email?: string
	role?: string // e.g. "admin" | "user"
	createdAt?: string
}

interface Product {
	id: string | number
	name: string
	description?: string
	price?: number
	sku?: string
	createdAt?: string
}

// Auth session/token shapes are handled by NextAuth and may include
// fields like `user`, `expires`, and provider-specific tokens.
```

Environment variables
The project uses NextAuth for authentication and may require environment variables for proper operation. Common vars to set in a local `.env.local` file:
- `NEXTAUTH_URL` — http://localhost:3000 (or your deployed URL)
- `NEXTAUTH_SECRET` — a secure random string used by NextAuth
- Provider credentials (if using OAuth providers): e.g. `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, etc.

How to run (local development)
Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000

Available npm scripts (from `package.json`)
- `npm run dev` — start Next.js in development mode
- `npm run build` — build for production
- `npm run start` — run the production build
- `npm run lint` — run ESLint

Notes and development tips
- Authentication: the NextAuth route is defined at [src/app/api/auth/[...nextauth]/route.ts](src/app/api/auth/[...nextauth]/route.ts). Configure providers and secrets there (or via environment variables).
- Protected routes: The dashboard area is intended to be protected. See `ProtectedRoute` in [src/components/ProtectedRoute.tsx](src/components/ProtectedRoute.tsx) for how client-side protection is implemented.
- API client: [src/services/api.ts](src/services/api.ts) centralizes HTTP requests using `axios`. Use it to implement server calls and handle headers, tokens, and interceptors.
- State: `zustand` stores under [src/store](src/store) provide small client-side state for auth, products, and users.

Contributing
- Fork the repo, create a feature branch, open a pull request.
- Keep changes focused and add a short description of what you changed and why.

Troubleshooting
- If auth doesn't work locally, confirm `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are set and that provider credentials (if any) are configured.
- Check the server console for NextAuth or API errors when using the dashboard.

Next steps (ideas)
- Add explicit TypeScript interfaces and share them in `src/types`.
- Add API routes for products/users if you want a full-stack demo (currently app expects an API client).

Files to inspect quickly
- [src/services/api.ts](src/services/api.ts)
- [src/store/authStore.ts](src/store/authStore.ts)
- [src/components/ProtectedRoute.tsx](src/components/ProtectedRoute.tsx)

If you want, I can:
- Commit this README change for you.
- Add example `.env.local` and a small `src/types` file with the interfaces above.

---
Generated on: see project commit history
