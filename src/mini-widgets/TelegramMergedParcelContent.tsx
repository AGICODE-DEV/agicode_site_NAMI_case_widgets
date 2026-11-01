import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function TelegramMergedParcelContent({ assetBasePath }: ContentProps) {
  return (
    <div className="window site-window" tabIndex={0} aria-label="Карточка NAMI">
      <SiteHeader />
      <div className="site-location">{"Склад Японии → Ожидает отправки"}</div>
      <div className="real-shots">
        <div className="real-shot">
          <img
            src={
              assetBasePath.replace(/\/$/, "") + "/images/91b835432a883d0e.png"
            }
            alt="Реальный интерфейс демоверсии NAMI — combined"
          />
        </div>
      </div>
    </div>
  );
}
