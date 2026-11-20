# Refactoring the NAMI widgets for the AGICODE site

Proposed implementation plan, 20 November 2026. Keep `@agicode/nami-case-widgets` as the product-owned ESM package. The target is an orders board rendered by the site's React instance, with its own NAMI appearance, alongside the existing 21 mini-widgets. The site owns placement, the preview poster and the decision to load the board.

## Starting point

The reference revisions are widgets `3131426` and site `d843ca4`. The site pins version `0.1.0`. The library build already externalizes React. The second runtime enters through the separately built HTML that the packaging script copies into `dist/nami-widgets`. Changing the React version in `package.json` alone leaves that delivery path in place. [Library build](../vite.lib.config.ts) · [Asset packaging](../scripts/copy-demo-assets.mjs) · [Current frame](../src/NamiDemoFrame.tsx)

| Baseline | Observed result |
| --- | --- |
| Delivered orders HTML | 883,175 bytes decoded, 216,836 bytes with production gzip. Excluding the embedded React, React DOM, JSX runtime and Scheduler blocks reduced gzip size by about 58.5 KiB in a size-only experiment. |
| Standalone demo on the mobile lab profile | Median 2,252 ms to the first board frame, 389 ms to open the new-order form, 160 ms to switch boards and 31 ms to filter orders. |
| Cold visit before scrolling | The case page requested zero orders documents. The business-systems page requested the full document while the slot started 2,827 px down a 390 × 844 viewport. Assigning the source at a 400 px margin deferred the request until approach. |
| Correctness | On the business-systems page the 840 px frame clipped a 951 px board in three mobile runs. Moving N1 to purchased and then editing only its note could move it back to new. |

The source inventory, extracted site archive and installed widget package were checked for this plan. The archive contains the expected media inventory. The consumer's local lab report is `.local/reports/nami-orders-performance-2026-11-20.json`. It records five cold runs per profile. The mobile profile used 2× pixel density, 4× CPU slowdown, 1.6 Mbit/s download and 150 ms simulated latency.

## Package contract

| Entry or asset | Target contract |
| --- | --- |
| `@agicode/nami-case-widgets/orders` | A new leaf entry exports the native `OrdersWidget` and its props. Preserve `assetBasePath`, `className` and `style` on the visible root. The widget owns instance-local state. Its published client entry carries `'use client'` and imports its scoped CSS. |
| `@agicode/nami-case-widgets/mini` | A separate entry exports `NamiMiniWidget`, its props and the 21 named mini-widgets. Keep the existing Telegram and automation mappings, screenshots and props. Named imports for individual illustrations should tree-shake. The full selector can reference its complete registry. |
| Package root and `./style.css` | Preserve current named exports, public types, `WidgetRoot` and the existing mini-widget stylesheet for callers. Keep the board and editor CSS out of this eagerly imported stylesheet. Release notes must identify the change from an iframe element to a native root for `OrdersWidget`. |
| `NamiDemoFrame` and `/nami-widgets/orders.html` | Keep the explicit frame API and the working direct URL for the transition release. The site embed uses the native entry. `NamiDemoFrame` keeps its actual iframe semantics for callers that select it explicitly. If standalone distribution continues, build that entry from the same board source. Retire a documented API or URL separately after checking its consumers. |
| Media | Keep `/nami-widgets` as the default base and support custom prefixes with or without a trailing slash. Cards use the catalog's 52/104/156 px variants. Detail views and downloads resolve the original. Keep the catalog-selected lossless screenshot representation and the published inventory. |

## Delivery sequence

### 1. Defer the existing embed and capture a comparison on the site

Extract the existing 400 px intersection check and poster into one lightweight site component. Use it on `/cases/nami`, `/tools/business-systems` and the alternate homepage that actually displays the board. Keep the main homepage on its existing NAMI promo. Trigger loading once per mounted slot, keep the poster visible until the board is ready and provide an activation button when intersection observation is unavailable. This change can ship against `0.1.0` and be reused for the native import. [Case integration](https://github.com/AGICODE-DEV/agicode_site/blob/d843ca4/src/_pages/marketing/ui/NamiCase.tsx#L166) · [Business-systems integration](https://github.com/AGICODE-DEV/agicode_site/blob/d843ca4/src/_pages/marketing/ui/Tools.tsx#L625)

**Evidence to collect.** Record the old board on each real route from the moment the slot triggers to the first visible card. Take desktop and mobile references for the board, an order editor and a warehouse consolidation. Keep the recorded revision or pinned archive as the reference throughout the migration.

### 2. Build a native board in the widget repository

Locate the editable source of the public demo first. This checkout tracks the full board as a bundled HTML file. If its authoring project is unavailable, reimplement the public interactions from the checked-in fixtures and the reference screens. Keep demo data and state local to each mount. Keep store imports and product links in their local demo flows. Read uploaded photos on the device and scope drop and keyboard handlers to the active widget or dialog. Check that a create/edit/reset session only loads site assets and never submits customer input. [Current demo](../src/demo/orders.html)

Put the native component, typed fixtures and workflow transitions under `src/orders/`. Keep `src/NamiDemoFrame.tsx` for the compatibility adapter. Start with a Storybook example that covers the seeded boards, a card, a stage change and editing a note. Separate typed fixtures and workflow transitions from rendering. Derive the displayed column and the editor's purchase stage from consistent state. Model shipping location and purchase status separately where they mean different things. The first regression check moves N1 to purchased, saves just its note and verifies both the column and the editor value.

Use a scoped board root and a scoped dialog container. The site's `.agi-theme.bs-site` wraps the route. Verify typography, controls, focus and overlays in that shell as well as Storybook. If the host cannot supply an unthemed slot and scoped styles cannot provide isolation, test a React portal into a shadow root using the same renderer. Keep board styles and dialog styles within the chosen boundary. The page should size the board through normal layout. [Public shell](https://github.com/AGICODE-DEV/agicode_site/blob/d843ca4/src/_app/ui/PublicSiteShell.tsx#L23) · [Design-system boundaries](https://github.com/AGICODE-DEV/agicode_site_design_system/blob/c976539/COMPONENTS.md#L111)

### 3. Complete order, customer and shipment workflows

| Area | Acceptance example |
| --- | --- |
| Board and state | Show five boards with 3/3/3/3/2 cards, ten customers and fifteen product entries. Search the active board. Preserve the two products in N13. Represent the N7 tax example as fixture data. Reset restores the initial state, and two mounted boards operate independently. |
| Orders and customers | Create and edit a customer and a multi-item order. Preserve contact and delivery fields, validation, pricing, local product previews, the 50-item limit and one photo of up to 5 MB per item. Verify cancel, save, delete and reload with demo data. |
| Fulfilment | Move forward and back, ship with a required track and mark a review request. Combine purchases made for the same customer at the same store. Consolidate N4 and N5 at the Japanese warehouse, inspect both sources, assign an outbound track, and exercise return or dissolution at the permitted stage. |
| Interaction | Use keyboard and touch to select tabs, open a dialog and restore focus on close. At 320 and 390 px, keep the bottom action reachable, horizontal scrolling within the board and the page scroll usable after closing. Verify form errors, image selection and distinct tab, panel and dialog IDs for two widget instances on one page. |

Keep first-board code small. Split out editors and consolidation dialogs if a production trace confirms the split reduces startup. Measure the first cold click as well as repeat opens. Preload on user intent or after the first board paint only when it improves the measured interaction. Reuse the existing mini-widgets and shared media helper. Its current variant path always supplies a 52 px display size. Give the board a separate original-image lookup for product detail and download. [Mini-widget registry](../src/NamiMiniWidget.tsx) · [Image resolver](../src/shared/imageProps.ts)

### 4. Separate mini-widget imports and verify the packed library

Build ESM entries and matching TypeScript declarations for the root, orders and minis. Keep `react`, `react-dom` and their runtime subpaths external to the library, with React supplied through peer dependencies. Verify the packaged client directive, CSS side effects, imports and generated asset paths from a clean installation of the tarball. Use the bundle graph to check a single named mini-widget, the full selector and the orders entry. Inspect the installed consumer's chunks as well as the library output. [Package exports](../package.json) · [Vite library mode](https://vite.dev/guide/build.html#library-mode)

Use one typed scenario registry for the full selector and the Storybook gallery. Keep named components independent of that registry. The document-recognition tool uses only Telegram scenario 2 and the AI-employee tool uses only scenario 3. Import each tool's three named components in its route-specific client module and pass the rendered examples into the shared steps UI. Compare their production chunks before and after, including any shared tools chunk. Preserve the selector's error for unknown keys. [Gallery](../src/NamiMiniWidget.stories.tsx) · [Tool consumers](https://github.com/AGICODE-DEV/agicode_site/blob/d843ca4/src/_pages/marketing/ui/Tools.tsx#L90)

Add the native board story beside the legacy reference during comparison. Exercise the existing typecheck, library build, Storybook build and media check. Pack the candidate, extract it and run the pinned `agicode-media inspect` on the extracted package and on the installed copy. Verify generated catalog, derivatives and originals through the default and an alternate asset prefix. Use one release archive for testing and pinning. [Media rules](../media.config.json) · [Current CI](../.github/workflows/validate.yml)

### 5. Switch the consumer, measure and retire the snapshot

In the lightweight site client component, conditionally import `@agicode/nami-case-widgets/orders` when the slot activates. Switch mini-only use sites to the mini entry. Check shared `Tools.tsx`, the homepage variant and route-level CSS imports for accidental eager imports or preloads. The site enables `experimental.inlineCss`. Inspect the initial HTML as well as network requests. If the optimizer hoists board rules, load the board-only stylesheet at activation and keep the poster until the CSS and component are ready. Update `media-smoke.mjs` to locate the product image under the native root. Update `migration-interactions.mjs` to scope its seven scenario tabs to their page tab list now that board tabs share the document. [Next.js loading guidance](https://nextjs.org/docs/app/guides/lazy-loading) · [Media smoke test](https://github.com/AGICODE-DEV/agicode_site/blob/d843ca4/scripts/media-smoke.mjs) · [Interaction smoke test](https://github.com/AGICODE-DEV/agicode_site/blob/d843ca4/scripts/migration-interactions.mjs)

Pin the new package version, archive, byte count, SHA-256 and lockfile together in the site. Run the production build and browser checks through the site's Windows launcher. Stage package-owned static assets from a clean output, preserving direct URLs supported by this release. The current sync script copies over existing files, so explicitly check for obsolete generated files during cleanup. Roll back the site integration and its package pin together, or redeploy the preceding complete site build. After the native cutover is verified, remove the old minified template, injection script and obsolete frame-specific CSS when their final compatibility consumer is retired or built from the native source. [Pinned archive record](https://github.com/AGICODE-DEV/agicode_site/blob/d843ca4/docs/migration/packages.json) · [Static asset sync](https://github.com/AGICODE-DEV/agicode_site/blob/d843ca4/scripts/sync-nami-widget-assets.mjs)

## How to judge the result

- **Browser delivery.** On both board routes the initial screen gets the poster and activation code. Before the 400 px threshold, the browser receives zero board-specific implementation or editor bytes, including code hidden in shared chunks or inlined styles. After activation the native board uses the site's React instance with natural height. The embedded flow makes zero requests for `orders.html`. The default homepage and the mini-only document-recognition and AI-employee pages receive zero orders implementation.
- **Images and compatibility.** Verify all 21 scenario selections and named exports, a custom asset base, and a cold product card at 1× and 2×. The card requests only the selected derivative. Opening a detail or download reaches the original. Retest the standalone URL separately while it is part of the contract.
- **Proposed performance targets.** Aim for at most 150 KiB gzip of incremental board JS, CSS and fixture data through first render, a mobile median of at most 1.6 s from activation to visible cards and at most 200 ms from the new-order click to the form when its code is ready. Measure the first click with the editor chunk cold and aim to match or improve the old same-route form-open median. Record those bytes and timings separately from repeat opens. Compare desktop and mobile search, board switching, initial page LCP and layout shift against the same-route baseline from step 1. Use five cold runs per profile and retain the raw samples in the site's local reports directory. These are tuning targets to validate on the candidate.

The first independently deployable change is the shared site loader. The cutover decision comes after the native workflows pass and the installed candidate demonstrates the delivery and interaction results on AGICODE.

## Local review candidate

Version 0.2.0 implements the native board. The site resolves React and React DOM 19.3.0 once for the embed. A portal into each widget's open shadow root isolates the product UI and keeps dialogs in the host viewport. The independent standalone document builds from the same board and retains the explicit frame API. The site loads the orders entry when a preview comes within 400 CSS pixels of the viewport. Its manual activation button works without intersection observation.

The document-recognition and AI-employee pages load their three named examples through separate scenario entries. The full scenario selector loads on the case page. A trace of the built site verified these boundaries on the homepage and all four affected routes. The production build, Storybook, packed declarations and imports, media inventory, custom asset prefixes, DPR 1 and 2 thumbnails, original download, sandboxed frame, two independent boards and order workflows passed local verification. The site includes a repeatable browser regression suite in its `scripts/nami-orders-smoke.mjs`.

The candidate archive is 2,384,452 bytes. Its SHA-256 is `edd3fa24ad67d884dabe37dad02a15111816e2397995a1be3dc5f6886734b022`. All 169 installed package files matched the extracted archive, and all 84 browser files matched the installed package. The site pins the same bytes in its vendor directory, dependency lockfile and migration manifest.

In five alternating cold Chromium runs per version on the mobile case page, the median time from scrolling to the first card fell from 2,098 ms to 478 ms. Opening the editor for the first time fell from 370 ms to 183 ms, and a repeat open from 128 ms to 101 ms. The browser transferred 17,068 gzip bytes of incremental JavaScript, embedded board styles and data through activation, compared with 216,836 bytes for the previous embedded document. This comparison excludes the poster and product photos. The editors fit within the activated bundle, so the first click requires no extra code request. Raw samples and before-and-after screenshots are in the consuming site's local reports directory.

The business-systems page previously fetched the entire frame before the first scroll. Deferral removes that request and changes the mobile median wait at the board from 81 ms to 606 ms. The mobile case-page LCP measured 2,280 ms before and 2,384 ms after, and filtering measured 29 ms and 47 ms respectively. Initial case-page CLS measured 0.0013 in both versions. These laboratory samples cover the local builds and the stated viewport, network and CPU profile.

The owner approved the locally reviewed candidate for production on 20 November 2026. The consuming site's release record tracks publication.
