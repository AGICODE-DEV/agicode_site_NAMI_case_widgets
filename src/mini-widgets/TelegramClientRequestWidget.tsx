import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { TelegramClientRequestContent } from './TelegramClientRequestContent';

export function TelegramClientRequestWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={TelegramClientRequestContent} />;
}
