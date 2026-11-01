import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function AutomationShippingOrderContent({
  assetBasePath,
}: ContentProps) {
  return (
    <div className="window site-window" tabIndex={0} aria-label="Карточка NAMI">
      <SiteHeader />
      <div className="site-location">{"Склад Японии → Едет на склад"}</div>
      <div className="real-shots">
        <div className="real-shot">
          <img
            src={
              assetBasePath.replace(/\/$/, "") + "/images/24c52236e01a9919.png"
            }
            alt="Реальный интерфейс демоверсии NAMI — N6"
          />
        </div>
      </div>
    </div>
  );
}
