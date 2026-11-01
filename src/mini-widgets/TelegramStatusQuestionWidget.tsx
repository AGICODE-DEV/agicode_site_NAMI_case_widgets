import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { TelegramStatusQuestionContent } from './TelegramStatusQuestionContent';

export function TelegramStatusQuestionWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={TelegramStatusQuestionContent} />;
}
