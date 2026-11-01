import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { AutomationShippingOrderContent } from './AutomationShippingOrderContent';

export function AutomationShippingOrderWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={AutomationShippingOrderContent} />;
}
