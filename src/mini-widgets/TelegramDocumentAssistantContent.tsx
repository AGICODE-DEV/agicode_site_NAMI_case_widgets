import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function TelegramDocumentAssistantContent({
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
        <div className="message outgoing">
          <img
            className="tax-notice-photo"
            src={
              assetBasePath.replace(/\/$/, "") + "/images/20e4afb208b0696a.png"
            }
            alt="Фото бумажного извещения на столе: DEMO-THAILAND-101, 20 USD"
          />
          <span className="time">{"12:41 ✓✓"}</span>
        </div>
        <div className="message incoming bot-unified standard-client-card">
          <div className="tg-person" style={{ marginTop: "0" }}>
            {"👤 "}
            <a href="https://www.avito.ru/user/nami-demo-alisa/profile">
              {"Алиса Ясная"}
            </a>
            {" · Авито"}
          </div>
          <div className="tg-section">
            <b>{"📋 Информация"}</b>
            <div className="tg-tree" style={{ marginTop: "9px" }}>
              <div className="tg-stage">
                <span className="tg-label">{"├ Этап"}</span>
                <span style={{ color: "#111", fontWeight: "400" }}>
                  {"На складе в Таиланде"}
                </span>
              </div>
              <div>
                <span className="tg-label">{"├ Трек"}</span>
                <span>
                  <span style={{ color: "#111", fontWeight: "700" }}>
                    {"DEMO-THAILAND-101"}
                  </span>
                </span>
              </div>
              <div>
                <span className="tg-label">{"├ Налог"}</span>
                <span>
                  <span style={{ color: "#111", fontWeight: "700" }}>
                    {"20 USD"}
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
                  {"Проверьте упаковку перед отправкой."}
                </span>
              </div>
            </div>
          </div>
          <div className="tg-section">
            <b>{"🛍️ Товары"}</b>
            <div className="tg-product">
              {"1. Women's Leather Shoulder Bag — "}
              <b>{"1 шт."}</b>
              <div className="tg-branch">
                {"├ "}
                <a href="https://example.invalid/products/handbag">
                  {"https://example.invalid/products/handbag"}
                </a>
              </div>
              <div className="tg-branch">
                {"└ "}
                <b>{"43 490 ₽"}</b>
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
