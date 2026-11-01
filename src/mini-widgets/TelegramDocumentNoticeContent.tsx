import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function TelegramDocumentNoticeContent({ assetBasePath }: ContentProps) {
  return (
    <div className="window telegram">
      <ChatHeader
        avatar="Т"
        title="Транспортная компания"
        subtitle="служба доставки"
        agent={false}
      />
      <div className="chat-body" tabIndex={0} aria-label="История сообщений">
        <span className="date-pill">{"Сегодня"}</span>
        <div className="message incoming">
          {"Здравствуйте, оплатите, пожалуйста."}
          <span className="time">{"12:41"}</span>
        </div>
        <div className="message incoming">
          <img
            className="tax-notice-photo"
            src={
              assetBasePath.replace(/\/$/, "") + "/images/20e4afb208b0696a.png"
            }
            alt="Фото бумажного извещения на столе: DEMO-THAILAND-101, 20 USD"
          />
          <span className="time">{"12:41"}</span>
        </div>
      </div>
      <Composer />
    </div>
  );
}
