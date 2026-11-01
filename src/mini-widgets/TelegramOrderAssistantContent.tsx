import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function TelegramOrderAssistantContent({ assetBasePath }: ContentProps) {
  return (
    <div className="window telegram">
      <ChatHeader
        avatar="N"
        title="AI-помощник NAMI"
        subtitle="бот"
        agent={true}
      />
      <div className="chat-body" tabIndex={0} aria-label="История сообщений">
        <span className="date-pill">{"Сегодня"}</span>
        <div className="message outgoing">
          {"Создай заказ для "}
          <a>{"t.me/nami_demo_polina"}</a>
          {"."}
          <br />
          <a>{"https://example.invalid/products/shampoo"}</a>
          <br />
          {"12 шт. Проверьте упаковку перед отправкой."}
          <span className="time">{"12:41 ✓✓"}</span>
        </div>
        <div className="message incoming bot-unified standard-client-card">
          <div className="tg-person" style={{ marginTop: "0" }}>
            {"👤 "}
            <a href="https://t.me/nami_demo_polina">{"Полина Лесная"}</a>
            {" · Telegram"}
          </div>
          <div className="tg-section">
            <b>{"📋 Информация"}</b>
            <div className="tg-tree" style={{ marginTop: "9px" }}>
              <div className="tg-stage">
                <span className="tg-label">{"├ Этап"}</span>
                <span style={{ color: "#111", fontWeight: "400" }}>
                  {"Новый заказ"}
                </span>
              </div>
              <div
                className="tg-comment"
                style={{
                  display: "block",
                  position: "relative",
                  paddingLeft: "12px",
                  gridTemplateColumns: "none",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "0",
                    color: "#2877ac",
                  }}
                >
                  {"└"}
                </span>
                <span
                  className="tg-label"
                  style={{ display: "inline", whiteSpace: "normal" }}
                >
                  {"Комментарий"}
                </span>
                <span
                  style={{
                    display: "inline",
                    fontWeight: "400",
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                  }}
                >
                  {"Проверьте упаковку перед отправкой."}
                </span>
              </div>
            </div>
          </div>
          <div className="tg-section">
            <b>{"🛍️ Товары"}</b>
            <div className="tg-product">
              {"1. Daily Care Gentle Shampoo, 500 ml — "}
              <b>{"12 шт."}</b>
              <div className="tg-branch">
                {"├ "}
                <a href="https://example.invalid/products/shampoo">
                  {"https://example.invalid/products/shampoo"}
                </a>
              </div>
              <div className="tg-branch">
                {"└ "}
                <b>{"16 680 ₽"}</b>
              </div>
            </div>
          </div>
          <span className="time">{"12:41"}</span>
        </div>
      </div>
      <Composer />
    </div>
  );
}
