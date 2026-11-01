import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrdersWidget } from './NamiDemoFrame';

const meta = {
  title: 'NAMI/01 · Система заказов',
  component: OrdersWidget,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof OrdersWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Создание заказов, клиентов и объединение посылок. */
export const Interactive: Story = {};
