import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { AutomationWarehouseNotificationContent } from './AutomationWarehouseNotificationContent';

export function AutomationWarehouseNotificationWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={AutomationWarehouseNotificationContent} />;
}
