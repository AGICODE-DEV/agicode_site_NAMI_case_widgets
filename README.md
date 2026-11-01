# AGICODE — NAMI Case Widgets

**Three interactive demos extracted from the supplied NAMI case HTML:**

1. `OrdersWidget` — NAMI order-management interface (create orders, add clients, merge parcels).
2. `TelegramWidget` — four scenarios: create order, read a document/photo, check shipping status, merge parcels.
3. `MailAutomationWidget` — three email-driven automation scenarios.

The supplied case contained **self-contained, already-built HTML/JS demos**, not reusable React/TypeScript source code. To keep the original visual appearance, data, interactivity and navigation without guessing how the original apps worked, the HTML demos are preserved **byte-for-byte** under `public/nami-widgets/`. The React/TypeScript/Linaria components are lightweight, sandboxed iframe adapters. This is a faithful extraction, **not a native TSX rewrite** of the original applications.

No actual NAMI back end, customer data or external API credentials are included; the source demos are illustrative. We did not add network access to them.

## Local Storybook

Requires Node.js 22.12+ and npm.

```bash
npm install
npm run storybook
```

Open `http://localhost:6006`. Three interactive stories are grouped under **NAMI**; use their own tabs and controls inside the preview. All assets are served by Storybook from `public/` using `staticDirs`.

## Package build

```bash
npm run typecheck
npm run build
```

The package build writes the ESM component library and Linaria CSS to `dist/`, plus copies the standalone demo HTML documents to `dist/nami-widgets/`. React/React DOM remain peer dependencies. The iframe content has its own styles and scripts, isolated from the AGICODE site and Storybook.

### Use on the AGICODE Next.js site

The HTML files **must be served** from the website's public directory. Copy the built `dist/nami-widgets/` folder into the Next.js site's `public/nami-widgets/` (and keep it in sync with package updates); don't import raw HTML files into React or ship them as strings in the JS bundle.

```tsx
import { OrdersWidget, TelegramWidget, MailAutomationWidget } from '@agicode/nami-case-widgets';
import '@agicode/nami-case-widgets/style.css';

export function NamiExamples() {
  return (
    <>
      <OrdersWidget />
      <TelegramWidget />
      <MailAutomationWidget />
    </>
  );
}
```

The default `assetBasePath` is `/nami-widgets`. Override it per component if the static files live under a different URL prefix. `NamiDemoFrame` is also exported for advanced use.

## Security and maintenance

Each demo runs in an iframe with `sandbox="allow-scripts allow-forms allow-downloads"`, **without** `allow-same-origin`. Messages affecting iframe height are validated against the exact frame window, expected message type and finite numeric value. The original NAMI ordering demo also receives viewport updates needed for its internal layout. The assets are intentionally treated as immutable snapshots; future improvements should be made from the original app source, if available.

The original order-management demo already declares a restrictive CSP including `connect-src 'none'`. For the other two standalone static demos, preserve appropriate site-level CSP and do not add dynamic external service calls.