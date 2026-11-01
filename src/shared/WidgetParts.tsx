import { styled } from "@linaria/react";

export interface ContentProps {
  assetBasePath: string;
}

export const WidgetSurface = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  color: #17212b;
  font-family: Arial, sans-serif;
  font-size: 13px;
  & *,
  & *::before,
  & *::after {
    box-sizing: border-box;
  }
  & a {
    color: #168acd;
    text-decoration: none;
    overflow-wrap: anywhere;
  }
  & a:hover {
    text-decoration: underline;
  }
  & .window {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 490px;
    min-width: 0;
    overflow: hidden;
    border: 1px solid #dfe7f0;
    border-radius: 13px;
    background: #fff;
  }
  & .chat-header,
  & .site-header {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 58px;
    flex-shrink: 0;
    padding: 0 14px;
    background: #fff;
  }
  & .chat-header > div,
  & .site-header > div {
    display: grid;
    gap: 4px;
    min-width: 0;
  }
  & .chat-header strong,
  & .site-header strong {
    font-size: 13px;
    font-weight: 600;
  }
  & .chat-header small,
  & .site-header small {
    font-size: 10px;
    color: #8d9baa;
  }
  & .back {
    font-size: 27px;
    color: #96a4b4;
  }
  & .avatar {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    flex: none;
    border-radius: 50%;
    color: white;
    font-size: 18px;
  }
  & .client-avatar {
    background: linear-gradient(145deg, #74bba9, #399383);
  }
  & .agent-avatar {
    background: linear-gradient(145deg, #54b4ed, #278ccc);
  }
  & .menu {
    margin-left: auto;
    color: #8d9baa;
    font-size: 24px;
  }
  & .chat-body {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
    min-height: 0;
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 13px 12px 17px;
    background: #c1d9b3 var(--nami-chat-background) repeat;
  }
  & .date-pill,
  & .auto-pill {
    align-self: center;
    padding: 3px 9px;
    border-radius: 12px;
    background: #89a28288;
    color: white;
    font-size: 10px;
  }
  & .message {
    max-width: 96%;
    min-width: 0;
    flex-shrink: 0;
    padding: 11px 12px 7px;
    border-radius: 11px 11px 11px 3px;
    background: #fff;
    box-shadow: 0 1px 2px #27434d20;
    font-size: 12px;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }
  & .incoming {
    align-self: flex-start;
  }
  & .outgoing {
    align-self: flex-end;
    border-radius: 11px 11px 3px 11px;
    background: #e4ffc9;
  }
  & .time {
    display: block;
    min-height: 13px;
    margin-top: 3px;
    color: #96a7b8;
    font-size: 9px;
    text-align: right;
  }
  & .composer {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 39px;
    flex-shrink: 0;
    padding: 0 14px;
    border-top: 1px solid #dce4ed;
    color: #a0abb8;
    font-size: 12px;
  }
  & .composer svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.6;
  }
  & .composer-mic {
    margin-left: auto;
  }
  & .item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 7px 0;
    padding: 10px;
    border: 1px solid #e5ebf4;
    border-radius: 7px;
    background: #fafbfe;
  }
  & .item > div {
    display: grid;
    gap: 5px;
    min-width: 0;
  }
  & .item strong {
    color: #4c6b95;
    font-size: 12px;
    font-weight: 500;
  }
  & .item small {
    color: #8b9bb0;
    font-size: 10px;
  }
  & .bot-unified {
    width: 100%;
    max-width: 100%;
    color: #111;
  }
  & .tg-person,
  & .tg-section {
    margin-top: 10px;
  }
  & .tg-tree,
  & .tg-product {
    margin-top: 8px;
  }
  & .tg-stage {
    display: flex;
    gap: 5px;
  }
  & .tg-label,
  & .tg-branch {
    color: #2877ac;
  }
  & .tg-comment .tg-label {
    margin-right: 0.3em;
  }
  & .tg-branch {
    padding-left: 7px;
  }
  & .site-window {
    overflow-y: auto;
    background: #eaf0f6;
  }
  & .site-header {
    border-bottom: 1px solid #e7edf5;
  }
  & .site-app-icon {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #eef5ff;
    color: #0773f9;
    font-size: 20px;
  }
  & .site-location {
    flex-shrink: 0;
    padding: 13px 15px 12px;
    color: #7c90ad;
    font-size: 11px;
  }
  & .real-shots {
    display: grid;
    flex-shrink: 0;
    gap: 8px;
    padding: 0 13px 13px;
  }
  & .real-shot {
    min-width: 0;
    overflow: hidden;
    border: 1px solid #dfe7f0;
    border-radius: 10px;
  }
  & .real-shot img {
    display: block;
    width: 100%;
    height: auto;
  }
  & .tax-notice-photo,
  & .client-question-shot {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  & .continued-chat,
  & .continued-history {
    width: 100%;
  }
  & .continued-history {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  & .mail-window {
    overflow-y: auto;
    background: #202124;
    color: #e8eaed;
  }
  & .mail-toolbar {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 20px;
    height: 48px;
    padding: 0 18px;
    color: #bdc1c6;
  }
  & .mail-back {
    font-size: 25px;
  }
  & .mail-content {
    flex-shrink: 0;
    padding: 17px 18px;
  }
  & .mail-content > h3 {
    margin: 0 0 14px;
    font-size: 19px;
    font-weight: 500;
    line-height: 1.3;
  }
  & .mail-subject-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    color: #9aa0a6;
    font-size: 10px;
  }
  & .mail-sender {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 17px;
  }
  & .mail-sender > div {
    display: grid;
    gap: 3px;
    min-width: 0;
  }
  & .mail-sender strong {
    font-size: 12px;
  }
  & .mail-sender span,
  & .mail-sender time {
    color: #9aa0a6;
    font-size: 10px;
  }
  & .mail-sender time {
    margin-left: auto;
  }
  & .sender-avatar {
    display: grid;
    place-items: center;
    width: 31px;
    height: 31px;
    flex: none;
    border-radius: 50%;
    background: #7b5a8f;
    color: white !important;
    font-size: 14px !important;
  }
  & .mail-recipient {
    display: none;
  }
  & .mail-letter {
    padding: 16px;
    border-radius: 8px;
    background: #fff;
    color: #28374b;
    font-size: 12px;
    line-height: 1.6;
  }
  & .mail-letter p {
    margin: 0 0 11px;
  }
  & .letter-brand {
    display: flex;
    align-items: center;
    gap: 7px;
    color: #0773f9;
    font-size: 11px;
    font-weight: bold;
  }
  & .letter-symbol {
    font-size: 20px;
  }
  & .letter-kicker {
    margin: 15px 0 8px;
    color: #8196b1;
    font-size: 11px;
  }
  & .mail-tracking {
    display: grid;
    gap: 6px;
    margin: 13px 0 15px;
    padding: 12px;
    border: 1px solid #deebfc;
    border-radius: 9px;
    background: #f1f7ff;
  }
  & .mail-tracking span,
  & .letter-footer {
    color: #8196b1;
    font-size: 10px;
  }
  & .mail-tracking strong {
    color: #0773f9;
    font-size: 18px;
    overflow-wrap: anywhere;
  }
  & .mail-reply-bar {
    display: flex;
    flex-shrink: 0;
    gap: 10px;
    padding: 0 18px 18px;
    color: #bdc1c6;
    font-size: 11px;
  }
  & .mail-reply-bar span {
    padding: 8px 14px;
    border: 1px solid #5f6368;
    border-radius: 5px;
  }
`;

export function ChatHeader({
  avatar,
  title,
  subtitle,
  agent,
}: {
  avatar: string;
  title: string;
  subtitle: string;
  agent: boolean;
}) {
  return (
    <div className="chat-header">
      <span className="back" aria-hidden="true">
        ‹
      </span>
      <span className={`avatar ${agent ? "agent-avatar" : "client-avatar"}`}>
        {avatar}
      </span>
      <div>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </div>
      <span className="menu" aria-hidden="true">
        ⋮
      </span>
    </div>
  );
}

export function Composer() {
  return (
    <div className="composer" aria-hidden="true">
      <span className="composer-clip">
        <svg viewBox="0 0 24 24">
          <path d="m8 13 7-7a3 3 0 0 1 4 4l-9 9a5 5 0 0 1-7-7l9-9" />
        </svg>
      </span>
      <span>Сообщение</span>
      <span className="composer-mic">
        <svg viewBox="0 0 24 24">
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M6 11v2a6 6 0 0 0 12 0v-2M12 19v3M9 22h6" />
        </svg>
      </span>
    </div>
  );
}

export function SiteHeader() {
  return (
    <div className="site-header">
      <span className="site-app-icon" aria-hidden="true">
        ▦
      </span>
      <div>
        <strong>NAMI</strong>
        <small>Скриншот демоверсии</small>
      </div>
    </div>
  );
}
