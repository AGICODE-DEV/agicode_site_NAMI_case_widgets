import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function TelegramStatusAnswerContent({ assetBasePath }: ContentProps) {
  return (
    <div className="window telegram">
      <ChatHeader
        avatar="N"
        title="AI-помощник NAMI"
        subtitle="бот"
        agent={true}
      />
      <div className="chat-body continued-chat">
        <div className="continued-history">
          <div className="message outgoing">
            <img
              className="client-question-shot"
              src={
                assetBasePath.replace(/\/$/, "") +
                "/images/64cbe098c6a56c64.png"
              }
              alt="Скриншот переписки с Никитой Речным"
            />
            <span className="time">{"12:41 ✓✓"}</span>
          </div>
          <div className="message outgoing">
            {"Уточни плиз"}
            <span className="time">{"12:41 ✓✓"}</span>
          </div>
          <div
            className="message incoming bot-unified lookup-card standard-client-card"
            data-continuity="order-N15"
          >
            <div className="tg-person" style={{ marginTop: "0" }}>
              {"👤 "}
              <a href="https://t.me/nami_demo_nikita">{"Никита Речной"}</a>
              {" · Telegram"}
            </div>
            <div className="tg-section">
              <b>{"📋 Информация"}</b>
              <div className="tg-tree" style={{ marginTop: "9px" }}>
                <div className="tg-stage">
                  <span className="tg-label">{"├ Этап"}</span>
                  <span style={{ color: "#111", fontWeight: "400" }}>
                    {"В пути в России"}
                  </span>
                </div>
                <div>
                  <span className="tg-label">{"└ Трек"}</span>
                  <span>
                    <span style={{ color: "#111", fontWeight: "700" }}>
                      {"DEMO-RUSSIA-103"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="tg-section">
              <b>{"🛍️ Товары"}</b>
              <div className="tg-product">
                {"1. Compact Espresso Machine — "}
                <b>{"1 шт."}</b>
                <div className="tg-branch">
                  {"├ "}
                  <a href="https://example.invalid/products/coffee">
                    {"https://example.invalid/products/coffee"}
                  </a>
                </div>
                <div className="tg-branch">
                  {"└ "}
                  <b>{"188 990 ₽"}</b>
                </div>
              </div>
            </div>
            <span className="time">{"12:41"}</span>
          </div>
          <div
            className="message incoming delivery-step"
            style={{
              width: "max-content!important",
              maxWidth: "86%!important",
            }}
          >
            {"Проверяю актуальный статус посылки."}
            <br className="compact-bubble-break" />
            {" Перехожу на сайт транспортной компании."}
            <span className="time">{"12:42"}</span>
          </div>
          <div className="message incoming delivery-step">
            {"Прохожу проверку на робота."}
            <span className="time">{"12:42"}</span>
          </div>
          <div
            className="message incoming"
            style={{
              width: "max-content!important",
              maxWidth: "86%!important",
            }}
          >
            {"Заказ прибыл в город получателя."}
            <br className="compact-bubble-break" />
            {" Доставят до клиента в течение 1–3 дней."}
            <span className="time">{"12:42"}</span>
          </div>
          <div className="message outgoing thanks-message">
            {"Супер, спасибо!"}
            <span className="time">{"12:43 ✓✓"}</span>
          </div>
        </div>
      </div>
      <Composer />
    </div>
  );
}
