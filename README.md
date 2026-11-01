# AGICODE — NAMI Case Widgets

Minimal React component package for interactive NAMI case widgets used **only on agicode.ru**.

**Stack:** React 19, TypeScript, Linaria (`@wyw-in-js/vite`), Vite 8, Storybook 10.

## Requirements

- Node.js 22.12+
- npm

## Getting started

```bash
npm install
npm run storybook
```

Storybook is deliberately **empty**. There are no `.stories.tsx` files, examples, demos, or addons. Before the first story is added, Storybook may display its standard empty-state notice.

## Building the package

```bash
npm run typecheck
npm run build
```

Outputs in `dist/`:

- `index.js` — ES module
- `index.d.ts` — TypeScript declarations
- `style.css` — extracted Linaria styles

`src/WidgetRoot.tsx` is just a neutral typed container using Linaria to prove the CSS pipeline is connected. **It is not an implementation of the NAMI case.**

## Using from the AGICODE site

After making the package available to the AGICODE Next.js project (for example, as a built tarball or internal Git dependency), import its CSS once from the Next.js app's global entry point:

```tsx
import '@agicode/nami-case-widgets/style.css';
```

Then render the component from a client boundary or a server component as appropriate:

```tsx
import { WidgetRoot } from '@agicode/nami-case-widgets';

export function CaseWidget() {
  return <WidgetRoot>{/* Future NAMI content */}</WidgetRoot>;
}
```

React and React DOM are peer dependencies to avoid shipping a second copy of React into AGICODE. The library is not independently hosted, and no iframe or standalone website is configured.

## Structure

```text
.storybook/main.ts      Storybook configuration (no stories yet)
src/WidgetRoot.tsx     Linaria-based neutral wrapper
src/index.ts           Public package exports
vite.config.ts         Vite plugin setup for Storybook
vite.lib.config.ts     Separate library build configuration
tsconfig.json          Type checking
tsconfig.build.json    Declaration generation
```

When actual widgets appear, add stories named `src/**/*.stories.tsx`. Keep the Storybook configuration and component source in the same repository.
