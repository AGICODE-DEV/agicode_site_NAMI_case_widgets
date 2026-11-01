import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function AutomationChangesNotificationContent({
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
                <span className="tg-label">{"└ Трек"}</span>
                <span>
                  <span style={{ color: "#111", fontWeight: "700" }}>
                    {"DEMO-THAILAND-102"}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="tg-section">
            <b>{"🛍️ Товары"}</b>
            <div className="tg-product">
              {"1. Silk Twill Scarf, 90 × 90 cm — "}
              <b>{"1 шт."}</b>
              <div className="tg-branch">
                {"├ "}
                <a href="https://example.invalid/products/scarf">
                  {"https://example.invalid/products/scarf"}
                </a>
              </div>
              <div className="tg-branch">
                {"└ "}
                <b>{"11 290 ₽"}</b>
              </div>
            </div>
          </div>
          <div className="tg-result">
            {"Склад просит подтвердить маркировку шарфа."}
          </div>
          <span className="time">{"12:41"}</span>
        </div>
      </div>
      <Composer />
    </div>
  );
}
