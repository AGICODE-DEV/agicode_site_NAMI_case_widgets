import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function AutomationChangesAnalysisContent({
  assetBasePath,
}: ContentProps) {
  return (
    <div className="window site-window" tabIndex={0} aria-label="Карточка NAMI">
      <SiteHeader />
      <div className="site-location">
        {"Склад Таиланда → На складе посредника"}
      </div>
      <div className="real-shots">
        <div className="real-shot">
          <img
            src={
              assetBasePath.replace(/\/$/, "") + "/images/4980a24dae9000a4.png"
            }
            alt="Реальный интерфейс демоверсии NAMI — N7"
          />
        </div>
        <div className="real-shot">
          <img
            src={
              assetBasePath.replace(/\/$/, "") + "/images/8a5d5d54de3db4ca.png"
            }
            alt="Реальный интерфейс демоверсии NAMI — N8"
          />
        </div>
      </div>
    </div>
  );
}
