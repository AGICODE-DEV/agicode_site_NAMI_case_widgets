import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { AutomationShippingEmailContent } from './AutomationShippingEmailContent';

export function AutomationShippingEmailWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={AutomationShippingEmailContent} />;
}
