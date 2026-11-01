import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { TelegramStatusAnswerContent } from './TelegramStatusAnswerContent';

export function TelegramStatusAnswerWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={TelegramStatusAnswerContent} />;
}
