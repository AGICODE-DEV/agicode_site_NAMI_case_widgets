import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { AutomationShippingNotificationContent } from './AutomationShippingNotificationContent';

export function AutomationShippingNotificationWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={AutomationShippingNotificationContent} />;
}
