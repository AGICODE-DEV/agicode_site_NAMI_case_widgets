import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function AutomationWarehouseOrderContent({
  assetBasePath,
}: ContentProps) {
  return (
    <div className="window site-window" tabIndex={0} aria-label="Карточка NAMI">
      <SiteHeader />
      <div className="site-location">
        {"Склад Японии → На складе посредника"}
      </div>
      <div className="real-shots">
        <div className="real-shot">
          <img
            src={
              assetBasePath.replace(/\/$/, "") + "/images/fa306b47dc8001e2.png"
            }
            alt="Реальный интерфейс демоверсии NAMI — N4"
          />
        </div>
      </div>
    </div>
  );
}
