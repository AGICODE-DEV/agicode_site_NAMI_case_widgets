import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { TelegramMergeAssistantContent } from './TelegramMergeAssistantContent';

export function TelegramMergeAssistantWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={TelegramMergeAssistantContent} />;
}
