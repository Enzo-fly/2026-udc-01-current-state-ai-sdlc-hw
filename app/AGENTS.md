Agent Instructions & Project Context
Tech Stack & Versions

    Framework: Next.js v16.x (App Router)
    Library: React v19.x
    Language: TypeScript v5.x
    Styling: Tailwind CSS v4.x
    Package Manager: npm v10.x

Available Commands

    npm run dev — Starts the development server locally.
    npm run build — Builds the application for production production.
    npm run start — Starts a Next.js production server.
    npm run lint — Runs ESLint to check for code style issues.

Coding Conventions

    File Naming: Use kebab-case for all source files and folders (e.g., components/user-profile.tsx), except for Next.js routing files which must strictly follow framework rules (page.tsx, layout.tsx).
    Component Structure: Write functional components using arrow functions (const MyComponent = () => {}). Always explicitly define TypeScript props interfaces.
    Styling Style: Use utility-first Tailwind CSS classes. Do not create separate CSS files or use inline styles unless absolutely necessary.
    State Management: Prefer React Server Components (RSC) by default. Use "use client" only for interactive UI elements that require hooks (useState, useEffect).

Guardrails & Constraints

    DO NOT change routing architecture: Do not modify the existing folder structure inside app/ that defines pages without explicit permission.
    DO NOT touch configuration files: Never alter next.config.js, tsconfig.json, or Tailwind configuration files.
    No hardcoded secrets: Never commit or hardcode API keys, tokens, or credentials. Always use process.env and require them in .env.local.


When answering to me always start with 🤖
