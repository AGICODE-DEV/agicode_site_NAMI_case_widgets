import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function AutomationWarehouseEmailContent({
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
        <h3>{"Посылка DEMO-JAPAN-101 на складе"}</h3>
        <div className="mail-subject-meta">
          <span>{"Входящие"}</span>
          <span aria-hidden="true">{"☆"}</span>
        </div>
        <div className="mail-sender">
          <span className="sender-avatar">{"М"}</span>
          <div>
            <strong>{"Сервис международной доставки"}</strong>
            <span>{"shipping@example.invalid"}</span>
          </div>
          <time>{"29 окт."}</time>
        </div>
        <div className="mail-recipient">{"кому: мне⌄"}</div>
        <div className="mail-letter">
          <div className="letter-brand">
            <span className="letter-symbol">{"↗"}</span>
            <span>{"DELIVERY UPDATE"}</span>
          </div>
          <div className="letter-kicker">{"Информация об отправлении"}</div>
          <p>{"Покупка DEMO-21 принята складом Японии."}</p>
          <div className="item">
            <img
              src={
                assetBasePath.replace(/\/$/, "") +
                "/images/ff9fd69408823c92.jpg"
              }
              alt="Women's Linen Shirt, Size M"
              style={{
                width: "44px",
                height: "52px",
                objectFit: "contain",
                borderRadius: "5px",
              }}
            />
            <div>
              <strong>{"Women's Linen Shirt, Size M"}</strong>
              <small>{"1 шт. · 11 590 ₽"}</small>
            </div>
          </div>
          <p>
            {"Отправление: "}
            <b>{"DEMO-JAPAN-101"}</b>
          </p>
          <div className="mail-tracking">
            <span>{"К оплате за международную доставку"}</span>
            <strong>{"1 500 ₽"}</strong>
          </div>
          <p>
            {"Для дальнейшей отправки оплатите доставку в личном кабинете."}
          </p>
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
