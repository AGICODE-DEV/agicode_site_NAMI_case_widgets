import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { AutomationWarehouseEmailContent } from './AutomationWarehouseEmailContent';

export function AutomationWarehouseEmailWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={AutomationWarehouseEmailContent} />;
}
