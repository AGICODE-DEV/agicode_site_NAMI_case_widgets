import { imageProps } from "../shared/imageProps";
import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function TelegramMergeOnSiteContent({ assetBasePath }: ContentProps) {
  return (
    <div className="window site-window" tabIndex={0} aria-label="Карточка NAMI">
      <SiteHeader />
      <div className="site-location">{"Склад Японии → Консолидировать"}</div>
      <div className="real-shots">
        <div className="real-shot">
          <img
            {...imageProps(assetBasePath, "images/04e5b6352c5a18bc.png")}
            alt="Реальный интерфейс демоверсии NAMI — selection"
          />
        </div>
      </div>
    </div>
  );
}
