import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function TelegramUpdatedOrderContent({ assetBasePath }: ContentProps) {
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
              assetBasePath.replace(/\/$/, "") + "/images/bd4a05a6c8c22f25.png"
            }
            alt="Реальный интерфейс демоверсии NAMI — N7"
          />
        </div>
      </div>
    </div>
  );
}
