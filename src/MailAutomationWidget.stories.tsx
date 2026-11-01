import type { Meta, StoryObj } from '@storybook/react-vite';
import { MailAutomationWidget } from './NamiDemoFrame';

const meta = {
  title: 'NAMI/03 · Автоматизация писем',
  component: MailAutomationWidget,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MailAutomationWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Три сценария обработки почты и автоматических уведомлений. */
export const Interactive: Story = {};
