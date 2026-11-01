import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function TelegramCreatedOrderContent({ assetBasePath }: ContentProps) {
  return (
    <div className="window site-window" tabIndex={0} aria-label="Карточка NAMI">
      <SiteHeader />
      <div className="site-location">{"Заказы → Новый"}</div>
      <div className="real-shots">
        <div className="real-shot">
          <img
            src={
              assetBasePath.replace(/\/$/, "") + "/images/fe961a6067ba9976.png"
            }
            alt="Реальный интерфейс демоверсии NAMI — N1"
          />
        </div>
      </div>
    </div>
  );
}
