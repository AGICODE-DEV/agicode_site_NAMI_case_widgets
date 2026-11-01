import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { TelegramStatusAssistantContent } from './TelegramStatusAssistantContent';

export function TelegramStatusAssistantWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={TelegramStatusAssistantContent} />;
}
