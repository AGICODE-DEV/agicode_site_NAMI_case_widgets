import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { AutomationChangesNotificationContent } from './AutomationChangesNotificationContent';

export function AutomationChangesNotificationWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={AutomationChangesNotificationContent} />;
}
