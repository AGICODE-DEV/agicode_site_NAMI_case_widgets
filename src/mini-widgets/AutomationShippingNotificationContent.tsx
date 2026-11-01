import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function AutomationShippingNotificationContent({
  assetBasePath,
}: ContentProps) {
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
        <span className="auto-pill">{"Автоматическое уведомление"}</span>
        <div className="message incoming bot-unified standard-client-card">
          <div className="tg-person" style={{ marginTop: "0" }}>
            {"👤 "}
            <a href="https://vk.com/nami_demo_mark">{"Марк Белозёров"}</a>
            {" · VK"}
          </div>
          <div className="tg-section">
            <b>{"📋 Информация"}</b>
            <div className="tg-tree" style={{ marginTop: "9px" }}>
              <div className="tg-stage">
                <span className="tg-label">{"├ Этап"}</span>
                <span style={{ color: "#111", fontWeight: "400" }}>
                  {"Едет в Японию"}
                </span>
              </div>
              <div>
                <span className="tg-label">{"├ Трек"}</span>
                <span>
                  <span style={{ color: "#111", fontWeight: "700" }}>
                    {"DEMO-JAPAN-103"}
                  </span>
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
                  {"Отправить вместе с остальными покупками."}
                </span>
              </div>
            </div>
          </div>
          <div className="tg-section">
            <b>{"🛍️ Товары"}</b>
            <div className="tg-product">
              {"1. 2.4 m Spinning Rod & Reel Set — "}
              <b>{"1 шт."}</b>
              <div className="tg-branch">
                {"├ "}
                <a href="https://example.invalid/products/rod">
                  {"https://example.invalid/products/rod"}
                </a>
              </div>
              <div className="tg-branch">
                {"└ "}
                <b>{"32 490 ₽"}</b>
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
