# AGICODE — NAMI Case Widgets

The package includes `OrdersWidget`, an illustrative order-management demo, and 21 standalone React mini-widgets for Telegram and email automation scenarios. The native board uses the host's React and React DOM through peer dependencies. Its open shadow root isolates the NAMI interface and dialogs. Mini-widgets use Linaria styles.

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

The build writes ESM and declarations for the root, orders and mini entries, the mini-widget stylesheet and the static distribution under dist/nami-widgets/.

### Use on the AGICODE Next.js site

Copy the package's dist/nami-widgets/ directory to the corresponding public asset prefix. The site loads the orders entry when its preview enters the viewport.

```tsx
import { OrdersWidget } from '@agicode/nami-case-widgets/orders';

export function NamiExamples() {
  return (
    <>
      <OrdersWidget />
    </>
  );
}
```

The default `assetBasePath` is `/nami-widgets`. Override it per component if the static files live under a different URL prefix. `NamiDemoFrame` is also exported for advanced use.

## Security and maintenance

In version 0.2, OrdersWidget renders a native element with natural height. Existing className, style and assetBasePath props belong to this root. The explicit NamiDemoFrame adapter retains its sandboxed iframe, height messages and standalone orders.html URL. Both render the same typed board. The standalone bundles its renderer and enforces a content security policy with a script hash and connect-src 'none'. Order edits, photos, customer details and link previews stay within the mounted demo.
## Standalone mini-widgets

Each of the 21 blocks from the Telegram and mail automation scenarios can also be embedded on its own. Scenarios and steps are numbered from 1: Telegram has scenarios 1–4, automation 1–3; each has steps 1–3.

```tsx
import { NamiMiniWidget } from '@agicode/nami-case-widgets/mini';
import '@agicode/nami-case-widgets/style.css';

<NamiMiniWidget demo="telegram" scenario={1} step={3} />
<NamiMiniWidget demo="automation" scenario={2} step={1} />
```

The component uses the same `assetBasePath` convention as the full demos; deploy `dist/nami-widgets/images/` to the matching asset path. Storybook's **NAMI/04 · Мини-виджеты** shows a single configurable block and a gallery of all blocks. The blocks preserve the source presentation: images of NAMI cards remain screenshots, and the illustrated chat and mail content is not connected to external services.

The mini/document and mini/status entries each expose the three named examples used by the site's document-recognition and AI-employee routes. A route can load one scenario independently of the complete selector.

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
import { TelegramCreatedOrderWidget, AutomationShippingEmailWidget } from '@agicode/nami-case-widgets/mini';

<TelegramCreatedOrderWidget />
<AutomationShippingEmailWidget assetBasePath="/nami-widgets" />
```


## Browser image delivery

The media build converts document and interface PNGs losslessly when smaller and supplies 52, 104 and 156 px product thumbnails. The original images remain available for detail views and downloads. The standalone orders document is generated from the readable HTML shell and the native React entry in src/demo/. Run npm run media:build followed by npm run build:standalone before serving static files directly. The normal widget, Storybook and package builds prepare the media automatically.
