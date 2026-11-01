import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function AutomationShippingEmailContent({
  assetBasePath,
}: ContentProps) {
  return (
    <div className="window mail-window dark-mail" tabIndex={0} aria-label="Письмо">
      <div className="mail-toolbar" aria-hidden="true">
        <span className="mail-back">{"‹"}</span>
        <span>{"▣"}</span>
        <span>
          <svg
            width="17"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7" />
          </svg>
        </span>
        <span>{"✉"}</span>
        <span>{"•••"}</span>
      </div>
      <div className="mail-content">
        <h3>{"Ваш заказ DEMO-23 отправлен"}</h3>
        <div className="mail-subject-meta">
          <span>{"Входящие"}</span>
          <span aria-hidden="true">{"☆"}</span>
        </div>
        <div className="mail-sender">
          <span className="sender-avatar">{"М"}</span>
          <div>
            <strong>{"Магазин · отправка заказа"}</strong>
            <span>{"shipping@example.invalid"}</span>
          </div>
          <time>{"27 окт."}</time>
        </div>
        <div className="mail-recipient">{"кому: мне⌄"}</div>
        <div className="mail-letter">
          <div className="letter-brand">
            <span className="letter-symbol">{"↗"}</span>
            <span>{"ORDER UPDATE"}</span>
          </div>
          <div className="letter-kicker">{"Обновление покупки"}</div>
          <p>
            {"Покупка "}
            <b>{"DEMO-23"}</b>
            {" передана перевозчику."}
          </p>
          <div className="item">
            <img
              src={
                assetBasePath.replace(/\/$/, "") +
                "/images/0a6240dad3b265f5.jpg"
              }
              alt="2.4 m Spinning Rod & Reel Set"
              style={{
                width: "44px",
                height: "52px",
                objectFit: "contain",
                borderRadius: "5px",
              }}
            />
            <div>
              <strong>{"2.4 m Spinning Rod & Reel Set"}</strong>
              <small>{"1 шт. · 32 490 ₽"}</small>
            </div>
          </div>
          <div className="mail-tracking">
            <span>{"Трек-номер"}</span>
            <strong>{"DEMO-JAPAN-103"}</strong>
          </div>
          <p>{"Товар отправлен на склад Японии."}</p>
          <div className="letter-footer">
            {"Подробности доступны в личном кабинете сервиса."}
          </div>
        </div>
      </div>
      <div className="mail-reply-bar" aria-hidden="true">
        <span>{"↶ Ответить"}</span>
        <span>{"↪ Переслать"}</span>
      </div>
    </div>
  );
}
