import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { TelegramCreatedOrderContent } from './TelegramCreatedOrderContent';

export function TelegramCreatedOrderWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={TelegramCreatedOrderContent} />;
}
