# Standard React Web & App Monorepo

A modern, production-grade React monorepo architecture built with **Next.js (App Router)**, **React 19**, and **Turborepo**.

---

## 📁 Repository Structure

```text
react-monorepo/
├── apps/
│   ├── web/                     # Public marketing site (Next.js - Port 3000)
│   │   ├── app/                 # App Router pages & layouts
│   │   ├── public/              # Static assets
│   │   └── package.json
│   │
│   └── app/                     # Authenticated SaaS dashboard/portal (Next.js - Port 3001)
│       ├── app/                 # App Router pages & layouts
│       ├── public/              # Static assets
│       └── package.json
│
├── packages/
│   ├── ui/                      # Shared React component library (@repo/ui)
│   │   ├── src/
│   │   │   ├── button.tsx       # Reusable button with variants
│   │   │   ├── card.tsx         # Reusable card component
│   │   │   ├── navbar.tsx       # Shared cross-app navigation bar
│   │   │   └── badge.tsx        # Status badge component
│   │   └── package.json         # Exports source files directly (Zero build overhead)
│   │
│   ├── eslint-config/           # Shared ESLint configuration presets (@repo/eslint-config)
│   └── typescript-config/       # Base TypeScript configurations (@repo/typescript-config)
│
├── turbo.json                   # Turborepo task pipeline configuration
├── package.json                 # Monorepo root scripts & workspaces definition
└── package-lock.json
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Both Applications Concurrently
```bash
npm run dev
```

This starts:
- **`apps/web`** (Marketing & Landing) at [http://localhost:3000](http://localhost:3000)
- **`apps/app`** (Dashboard & Console) at [http://localhost:3001](http://localhost:3001)

You can seamlessly navigate between them using the shared header bar!

---

## 🛠️ Monorepo Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs both `web` and `app` development servers in parallel |
| `npm run build` | Builds all packages and apps with Turborepo caching |
| `npm run check-types` | Executes TypeScript typechecking across all workspaces |
| `npm run lint` | Runs ESLint across all apps and packages |
| `npm run format` | Formats code with Prettier |

---

## 🎯 Filtering Commands (Targeting Specific Apps)

To run a task for only a single application:

```bash
# Develop only the web app
npx turbo dev --filter=web

# Develop only the dashboard app
npx turbo dev --filter=app

# Build only packages/ui
npx turbo build --filter=@repo/ui
```

---

## 📦 How to Add a New Shared Component

1. Add your component inside [`packages/ui/src/my-component.tsx`](file:///C:/Users/aarav/.gemini/antigravity/scratch/react-monorepo/packages/ui/src).
2. It is immediately available in both `apps/web` and `apps/app` via:
   ```tsx
   import { MyComponent } from "@repo/ui/my-component";
   ```
3. No build or bundle step is required thanks to direct source exports!
