import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { TelegramDocumentNoticeContent } from './TelegramDocumentNoticeContent';

export function TelegramDocumentNoticeWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={TelegramDocumentNoticeContent} />;
}
