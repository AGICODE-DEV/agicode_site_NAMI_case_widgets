# AGICODE — NAMI Case Widgets

The package includes `OrdersWidget`, an illustrative order-management demo, and 21 standalone React mini-widgets for Telegram and email automation scenarios. The full orders demo uses the original HTML in a sandboxed iframe; the mini-widgets render directly in React with Linaria styles.

No actual NAMI back end, customer data or external API credentials are included; the source demos are illustrative. We did not add network access to them.

## Local Storybook

Requires Node.js 22.12+ and npm.

```bash
npm install
npm run storybook
```

Open `http://localhost:6006`. The order demo and the mini-widget gallery are grouped under **NAMI**. All assets are served by Storybook from `public/` using `staticDirs`.

## Package build

```bash
npm run typecheck
npm run build
```

The package build writes the ESM component library and Linaria CSS to `dist/`, plus copies the orders demo and images to `dist/nami-widgets/`. React/React DOM remain peer dependencies. The iframe content has its own styles and scripts, isolated from the AGICODE site and Storybook. Images are stored separately in `nami-widgets/images/` and are copied with the HTML files.

### Use on the AGICODE Next.js site

The orders HTML file and images **must be served** from the website's public directory. Copy the built `dist/nami-widgets/` folder into the Next.js site's `public/nami-widgets/` (and keep it in sync with package updates); don't import raw HTML files into React or ship them as strings in the JS bundle.

```tsx
import { OrdersWidget } from '@agicode/nami-case-widgets';
import '@agicode/nami-case-widgets/style.css';

export function NamiExamples() {
  return (
    <>
      <OrdersWidget />    </>
  );
}
```

The default `assetBasePath` is `/nami-widgets`. Override it per component if the static files live under a different URL prefix. `NamiDemoFrame` is also exported for advanced use.

## Security and maintenance

The orders demo runs in an iframe with `sandbox="allow-scripts allow-forms allow-downloads"`, **without** `allow-same-origin`. Messages affecting iframe height are validated against the exact frame window, expected message type and finite numeric value. The orders demo also receives viewport updates needed for its internal layout. Mini-widgets render directly in the host document without iframe or messaging.

The order-management demo declares a restrictive CSP including `connect-src 'none'`.
## Standalone mini-widgets

Each of the 21 blocks from the Telegram and mail automation scenarios can also be embedded on its own. Scenarios and steps are numbered from 1: Telegram has scenarios 1–4, automation 1–3; each has steps 1–3.

```tsx
import { NamiMiniWidget } from '@agicode/nami-case-widgets';
import '@agicode/nami-case-widgets/style.css';

<NamiMiniWidget demo="telegram" scenario={1} step={3} />
<NamiMiniWidget demo="automation" scenario={2} step={1} />
```

The component uses the same `assetBasePath` convention as the full demos; deploy `dist/nami-widgets/images/` to the matching asset path. Storybook's **NAMI/04 · Мини-виджеты** shows a single configurable block and a gallery of all blocks. The blocks preserve the source presentation: images of NAMI cards remain screenshots, and the illustrated chat and mail content is not connected to external services.

Each block also has its own component. All accept `assetBasePath`, `className`, and `style`; shared layout components and scoped styles use Linaria. NAMI order-card screenshots remain images.

| Scenario | Step | Component |
| --- | --- | --- |
| Telegram 1 | Заявка клиента | `TelegramClientRequestWidget` |
| Telegram 1 | Передача заявки помощнику | `TelegramOrderAssistantWidget` |
| Telegram 1 | Созданный заказ | `TelegramCreatedOrderWidget` |
| Telegram 2 | Извещение | `TelegramDocumentNoticeWidget` |
| Telegram 2 | Фото помощнику | `TelegramDocumentAssistantWidget` |
| Telegram 2 | Обновлённый заказ | `TelegramUpdatedOrderWidget` |
| Telegram 3 | Вопрос о статусе | `TelegramStatusQuestionWidget` |
| Telegram 3 | Запрос помощнику | `TelegramStatusAssistantWidget` |
| Telegram 3 | Ответ о статусе | `TelegramStatusAnswerWidget` |
| Telegram 4 | Объединение через помощника | `TelegramMergeAssistantWidget` |
| Telegram 4 | Объединение на сайте | `TelegramMergeOnSiteWidget` |
| Telegram 4 | Общая посылка | `TelegramMergedParcelWidget` |
| Автоматизация 1 | Письмо об отправке | `AutomationShippingEmailWidget` |
| Автоматизация 1 | Уведомление об отправке | `AutomationShippingNotificationWidget` |
| Автоматизация 1 | Обновлённый этап | `AutomationShippingOrderWidget` |
| Автоматизация 2 | Письмо о складе | `AutomationWarehouseEmailWidget` |
| Автоматизация 2 | Уведомление о складе | `AutomationWarehouseNotificationWidget` |
| Автоматизация 2 | Карточка на складе | `AutomationWarehouseOrderWidget` |
| Автоматизация 3 | Письмо с изменениями | `AutomationChangesEmailWidget` |
| Автоматизация 3 | Анализ изменений | `AutomationChangesAnalysisWidget` |
| Автоматизация 3 | Уведомление владельцу | `AutomationChangesNotificationWidget` |

```tsx
import { TelegramCreatedOrderWidget, AutomationShippingEmailWidget } from '@agicode/nami-case-widgets';

<TelegramCreatedOrderWidget />
<AutomationShippingEmailWidget assetBasePath="/nami-widgets" />
```
