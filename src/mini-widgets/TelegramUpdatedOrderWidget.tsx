import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { TelegramUpdatedOrderContent } from './TelegramUpdatedOrderContent';

export function TelegramUpdatedOrderWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={TelegramUpdatedOrderContent} />;
}
