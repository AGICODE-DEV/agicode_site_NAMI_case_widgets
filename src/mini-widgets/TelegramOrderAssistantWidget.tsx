import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { TelegramOrderAssistantContent } from './TelegramOrderAssistantContent';

export function TelegramOrderAssistantWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={TelegramOrderAssistantContent} />;
}
