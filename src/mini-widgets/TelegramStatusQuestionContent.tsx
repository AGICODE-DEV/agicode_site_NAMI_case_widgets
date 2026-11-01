import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function TelegramStatusQuestionContent({ assetBasePath }: ContentProps) {
  return (
    <div className="window telegram">
      <ChatHeader
        avatar="Н"
        title="Никита Речной"
        subtitle="был(а) недавно"
        agent={false}
      />
      <div className="chat-body" tabIndex={0} aria-label="История сообщений">
        <span className="date-pill">{"Сегодня"}</span>
        <div
          className="message incoming"
          style={{ width: "max-content!important", maxWidth: "86%!important" }}
        >
          {"Здравствуйте, что с моим заказом? Скоро"}
          <br className="compact-bubble-break" />
          {" приедет?"}
          <span className="time">{"12:40"}</span>
        </div>
        <div
          className="message outgoing"
          style={{ width: "max-content!important", maxWidth: "86%!important" }}
        >
          {"Здравствуйте, сейчас уточним и вернёмся с"}
          <br className="compact-bubble-break" />
          {" ответом."}
          <span className="time">{"12:40 ✓✓"}</span>
        </div>
      </div>
      <Composer />
    </div>
  );
}
