import type { MiniWidgetProps } from "./shared/MiniWidgetShell";
import { TelegramClientRequestWidget } from "./mini-widgets/TelegramClientRequestWidget";
import { TelegramOrderAssistantWidget } from "./mini-widgets/TelegramOrderAssistantWidget";
import { TelegramCreatedOrderWidget } from "./mini-widgets/TelegramCreatedOrderWidget";
import { TelegramDocumentNoticeWidget } from "./mini-widgets/TelegramDocumentNoticeWidget";
import { TelegramDocumentAssistantWidget } from "./mini-widgets/TelegramDocumentAssistantWidget";
import { TelegramUpdatedOrderWidget } from "./mini-widgets/TelegramUpdatedOrderWidget";
import { TelegramStatusQuestionWidget } from "./mini-widgets/TelegramStatusQuestionWidget";
import { TelegramStatusAssistantWidget } from "./mini-widgets/TelegramStatusAssistantWidget";
import { TelegramStatusAnswerWidget } from "./mini-widgets/TelegramStatusAnswerWidget";
import { TelegramMergeAssistantWidget } from "./mini-widgets/TelegramMergeAssistantWidget";
import { TelegramMergeOnSiteWidget } from "./mini-widgets/TelegramMergeOnSiteWidget";
import { TelegramMergedParcelWidget } from "./mini-widgets/TelegramMergedParcelWidget";
import { AutomationShippingEmailWidget } from "./mini-widgets/AutomationShippingEmailWidget";
import { AutomationShippingNotificationWidget } from "./mini-widgets/AutomationShippingNotificationWidget";
import { AutomationShippingOrderWidget } from "./mini-widgets/AutomationShippingOrderWidget";
import { AutomationWarehouseEmailWidget } from "./mini-widgets/AutomationWarehouseEmailWidget";
import { AutomationWarehouseNotificationWidget } from "./mini-widgets/AutomationWarehouseNotificationWidget";
import { AutomationWarehouseOrderWidget } from "./mini-widgets/AutomationWarehouseOrderWidget";
import { AutomationChangesEmailWidget } from "./mini-widgets/AutomationChangesEmailWidget";
import { AutomationChangesAnalysisWidget } from "./mini-widgets/AutomationChangesAnalysisWidget";
import { AutomationChangesNotificationWidget } from "./mini-widgets/AutomationChangesNotificationWidget";

export type { MiniWidgetProps } from "./shared/MiniWidgetShell";
export interface NamiMiniWidgetProps extends MiniWidgetProps {
  demo: "telegram" | "automation";
  scenario: 1 | 2 | 3 | 4;
  step: 1 | 2 | 3;
}

const blocks = {
  "telegram-1-1": TelegramClientRequestWidget,
  "telegram-1-2": TelegramOrderAssistantWidget,
  "telegram-1-3": TelegramCreatedOrderWidget,
  "telegram-2-1": TelegramDocumentNoticeWidget,
  "telegram-2-2": TelegramDocumentAssistantWidget,
  "telegram-2-3": TelegramUpdatedOrderWidget,
  "telegram-3-1": TelegramStatusQuestionWidget,
  "telegram-3-2": TelegramStatusAssistantWidget,
  "telegram-3-3": TelegramStatusAnswerWidget,
  "telegram-4-1": TelegramMergeAssistantWidget,
  "telegram-4-2": TelegramMergeOnSiteWidget,
  "telegram-4-3": TelegramMergedParcelWidget,
  "automation-1-1": AutomationShippingEmailWidget,
  "automation-1-2": AutomationShippingNotificationWidget,
  "automation-1-3": AutomationShippingOrderWidget,
  "automation-2-1": AutomationWarehouseEmailWidget,
  "automation-2-2": AutomationWarehouseNotificationWidget,
  "automation-2-3": AutomationWarehouseOrderWidget,
  "automation-3-1": AutomationChangesEmailWidget,
  "automation-3-2": AutomationChangesAnalysisWidget,
  "automation-3-3": AutomationChangesNotificationWidget,
};

export function NamiMiniWidget({
  demo,
  scenario,
  step,
  ...props
}: NamiMiniWidgetProps) {
  const Component =
    blocks[`${demo}-${scenario}-${step}` as keyof typeof blocks];
  if (!Component) throw new RangeError("Мини-виджет не найден");
  return <Component {...props} />;
}
