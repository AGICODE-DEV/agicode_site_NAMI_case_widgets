import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { TelegramMergeOnSiteContent } from './TelegramMergeOnSiteContent';

export function TelegramMergeOnSiteWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={TelegramMergeOnSiteContent} />;
}
