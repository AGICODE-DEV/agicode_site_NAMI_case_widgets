import type { Meta, StoryObj } from '@storybook/react-vite';
import { TelegramWidget } from './NamiDemoFrame';

const meta = {
  title: 'NAMI/02 · Telegram',
  component: TelegramWidget,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TelegramWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Четыре оригинальных сценария переключаются вкладками внутри демо. */
export const Interactive: Story = {};
