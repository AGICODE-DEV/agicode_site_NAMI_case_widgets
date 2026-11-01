import { styled } from '@linaria/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NamiMiniWidget } from './NamiMiniWidget';
import {
  TelegramClientRequestWidget,
  TelegramOrderAssistantWidget,
  TelegramCreatedOrderWidget,
  TelegramDocumentNoticeWidget,
  TelegramDocumentAssistantWidget,
  TelegramUpdatedOrderWidget,
  TelegramStatusQuestionWidget,
  TelegramStatusAssistantWidget,
  TelegramStatusAnswerWidget,
  TelegramMergeAssistantWidget,
  TelegramMergeOnSiteWidget,
  TelegramMergedParcelWidget,
  AutomationShippingEmailWidget,
  AutomationShippingNotificationWidget,
  AutomationShippingOrderWidget,
  AutomationWarehouseEmailWidget,
  AutomationWarehouseNotificationWidget,
  AutomationWarehouseOrderWidget,
  AutomationChangesEmailWidget,
  AutomationChangesAnalysisWidget,
  AutomationChangesNotificationWidget,
} from './mini-widgets';

const Gallery = styled.div`
  padding: 24px;
  font-family: sans-serif;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 16px;
  align-items: start;
`;

const blocks = [
  { demo: 'telegram', scenario: 1, step: 1, Component: TelegramClientRequestWidget },
  { demo: 'telegram', scenario: 1, step: 2, Component: TelegramOrderAssistantWidget },
  { demo: 'telegram', scenario: 1, step: 3, Component: TelegramCreatedOrderWidget },
  { demo: 'telegram', scenario: 2, step: 1, Component: TelegramDocumentNoticeWidget },
  { demo: 'telegram', scenario: 2, step: 2, Component: TelegramDocumentAssistantWidget },
  { demo: 'telegram', scenario: 2, step: 3, Component: TelegramUpdatedOrderWidget },
  { demo: 'telegram', scenario: 3, step: 1, Component: TelegramStatusQuestionWidget },
  { demo: 'telegram', scenario: 3, step: 2, Component: TelegramStatusAssistantWidget },
  { demo: 'telegram', scenario: 3, step: 3, Component: TelegramStatusAnswerWidget },
  { demo: 'telegram', scenario: 4, step: 1, Component: TelegramMergeAssistantWidget },
  { demo: 'telegram', scenario: 4, step: 2, Component: TelegramMergeOnSiteWidget },
  { demo: 'telegram', scenario: 4, step: 3, Component: TelegramMergedParcelWidget },
  { demo: 'automation', scenario: 1, step: 1, Component: AutomationShippingEmailWidget },
  { demo: 'automation', scenario: 1, step: 2, Component: AutomationShippingNotificationWidget },
  { demo: 'automation', scenario: 1, step: 3, Component: AutomationShippingOrderWidget },
  { demo: 'automation', scenario: 2, step: 1, Component: AutomationWarehouseEmailWidget },
  { demo: 'automation', scenario: 2, step: 2, Component: AutomationWarehouseNotificationWidget },
  { demo: 'automation', scenario: 2, step: 3, Component: AutomationWarehouseOrderWidget },
  { demo: 'automation', scenario: 3, step: 1, Component: AutomationChangesEmailWidget },
  { demo: 'automation', scenario: 3, step: 2, Component: AutomationChangesAnalysisWidget },
  { demo: 'automation', scenario: 3, step: 3, Component: AutomationChangesNotificationWidget },
];

const meta = {
  title: 'NAMI/04 · Мини-виджеты',
  component: NamiMiniWidget,
  args: { demo: 'telegram', scenario: 1, step: 1 },
} satisfies Meta<typeof NamiMiniWidget>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

/** All blocks are rendered through their individual public components. */
export const All: Story = {
  render: () => (
    <Gallery>
      {(['telegram', 'automation'] as const).map(demo => (
        <section key={demo}>
          <h2>{demo === 'telegram' ? 'Telegram' : 'Автоматизация'}</h2>
          {Array.from({ length: demo === 'telegram' ? 4 : 3 }, (_, index) => (
            <div key={index}>
              <h3>Сценарий {index + 1}</h3>
              <Grid>
                {blocks.filter(block => block.demo === demo && block.scenario === index + 1).map(({ Component, step }) => <Component key={step} />)}
              </Grid>
            </div>
          ))}
        </section>
      ))}
    </Gallery>
  ),
};
