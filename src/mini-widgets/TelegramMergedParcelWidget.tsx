import { MiniWidgetShell } from '../shared/MiniWidgetShell';
import type { MiniWidgetProps } from '../shared/MiniWidgetShell';
import { TelegramMergedParcelContent } from './TelegramMergedParcelContent';

export function TelegramMergedParcelWidget(props: MiniWidgetProps) {
  return <MiniWidgetShell {...props} Content={TelegramMergedParcelContent} />;
}
