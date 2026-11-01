import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function TelegramClientRequestContent({ assetBasePath }: ContentProps) {
  return (
    <div className="window telegram">
      <ChatHeader
        avatar="П"
        title="Полина Лесная"
        subtitle="был(а) недавно"
        agent={false}
      />
      <div className="chat-body" tabIndex={0} aria-label="История сообщений">
        <span className="date-pill">{"Сегодня"}</span>
        <div className="message incoming">
          {
            "Здравствуйте! Хочу заказать 12 флаконов этого шампуня. Проверьте упаковку перед отправкой."
          }
          <span className="time">{"12:41"}</span>
        </div>
        <div className="message incoming">
          <a>{"https://example.invalid/products/shampoo"}</a>
          <div className="item">
            <img
              src={
                assetBasePath.replace(/\/$/, "") +
                "/images/03c8c086a22c7e6d.jpg"
              }
              alt="Daily Care Gentle Shampoo, 500 ml"
              style={{
                width: "44px",
                height: "52px",
                objectFit: "contain",
                borderRadius: "5px",
              }}
            />
            <div>
              <strong>{"Daily Care Gentle Shampoo, 500 ml"}</strong>
              <small>{"1 шт. · 1 390 ₽"}</small>
            </div>
          </div>
          <span className="time">{"12:41"}</span>
        </div>
      </div>
      <Composer />
    </div>
  );
}
