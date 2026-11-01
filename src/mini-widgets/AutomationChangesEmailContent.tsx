import { ChatHeader, Composer, SiteHeader } from "../shared/WidgetParts";
import type { ContentProps } from "../shared/WidgetParts";

export function AutomationChangesEmailContent({ assetBasePath }: ContentProps) {
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
        <h3>{"Обновление по покупкам DEMO-31 и DEMO-32"}</h3>
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
          <p>{"Здравствуйте! Обновление по двум отправлениям Алисы Ясной."}</p>
          <p>
            <b>{"DEMO-THAILAND-101"}</b>
            {
              " · Women’s Leather Shoulder Bag — 1 шт. Принята складом Таиланда."
            }
          </p>
          <p>
            <b>{"DEMO-THAILAND-102"}</b>
            {
              " · Silk Twill Scarf, 90 × 90 cm — 1 шт. Требуется уточнить состав: маркировка не совпадает с заявкой."
            }
          </p>
          <p>
            {
              "Пожалуйста, подтвердите данные по шарфу. Отправление с сумкой не затронуто."
            }
          </p>
          <div className="letter-footer">
            {"Для уточнения данных ответьте на это письмо."}
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
