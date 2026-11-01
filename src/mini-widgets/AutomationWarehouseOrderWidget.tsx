import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { AutomationWarehouseOrderContent } from './AutomationWarehouseOrderContent';

export function AutomationWarehouseOrderWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={AutomationWarehouseOrderContent} />;
}
