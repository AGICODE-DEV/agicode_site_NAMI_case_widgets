import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { TelegramDocumentAssistantContent } from './TelegramDocumentAssistantContent';

export function TelegramDocumentAssistantWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={TelegramDocumentAssistantContent} />;
}
