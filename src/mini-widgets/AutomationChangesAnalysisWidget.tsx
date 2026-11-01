import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { AutomationChangesAnalysisContent } from './AutomationChangesAnalysisContent';

export function AutomationChangesAnalysisWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={AutomationChangesAnalysisContent} />;
}
