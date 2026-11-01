import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { AutomationChangesEmailContent } from './AutomationChangesEmailContent';

export function AutomationChangesEmailWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={AutomationChangesEmailContent} />;
}
