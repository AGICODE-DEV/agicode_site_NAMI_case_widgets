import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function TelegramMergeAssistantContent({ assetBasePath }: ContentProps) {
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
        <div className="message outgoing" style={{ whiteSpace: "pre-wrap" }}>
          {
            "Как приедет DEMO-JAPAN-102 у Софии, объедини её с той что на складе"
          }
          <span className="time">{"12:46 ✓✓"}</span>
        </div>
        <span className="auto-pill">{"После письма о поступлении"}</span>
        <div className="message incoming">
          {"Посылка "}
          <strong>{"DEMO-JAPAN-102"}</strong>
          {" прибыла на склад. Объединяю её с "}
          <strong>{"DEMO-JAPAN-101"}</strong>
          {"."}
          <span className="time">{"12:47"}</span>
        </div>
        <div className="message incoming bot-unified standard-client-card">
          <div className="tg-person" style={{ marginTop: "0" }}>
            {"👤 "}
            <a href="https://t.me/nami_demo_sofia">{"София Соколова"}</a>
            {" · Telegram"}
          </div>
          <div className="tg-section">
            <b>{"📋 Информация"}</b>
            <div className="tg-tree" style={{ marginTop: "9px" }}>
              <div className="tg-stage">
                <span className="tg-label">{"├ Этап"}</span>
                <span style={{ color: "#111", fontWeight: "400" }}>
                  {"Ожидает отправки из Японии"}
                </span>
              </div>
              <div>
                <span className="tg-label">{"├ Трек"}</span>
                <span>
                  <span style={{ color: "#111", fontWeight: "700" }}>
                    {"DEMO-JAPAN-101"}
                    <br />
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
              {"1. Women's Linen Shirt, Size M — "}
              <b>{"1 шт."}</b>
              <div className="tg-branch">
                {"├ "}
                <a href="https://example.invalid/products/shirt">
                  {"https://example.invalid/products/shirt"}
                </a>
              </div>
              <div className="tg-branch">
                {"└ "}
                <b>{"11 590 ₽"}</b>
              </div>
            </div>
            <div className="tg-product">
              {"2. Women's Pleated Midi Skirt, Size M — "}
              <b>{"1 шт."}</b>
              <div className="tg-branch">
                {"├ "}
                <a href="https://example.invalid/products/skirt">
                  {"https://example.invalid/products/skirt"}
                </a>
              </div>
              <div className="tg-branch">
                {"└ "}
                <b>{"11 890 ₽"}</b>
              </div>
            </div>
          </div>
          <span className="time">{"12:47"}</span>
        </div>
      </div>
      <Composer />
    </div>
  );
}
