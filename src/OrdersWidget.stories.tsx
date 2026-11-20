import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrdersWidget } from './orders';
import { NamiDemoFrame } from './NamiDemoFrame';
import { expect, fireEvent, userEvent, within } from 'storybook/test';

const meta = {
  title: 'NAMI/01 · Система заказов',
  component: OrdersWidget,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof OrdersWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};
export const EditPurchasedOrder: Story = {
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-nami-orders]')!.shadowRoot!;
    const board = within(root.querySelector('.workspace')!);
    const card = board.getByLabelText(/^N1 ·/);
    await userEvent.click(within(card).getByRole('button', { name: 'Выкуплен' }));
    await userEvent.click(await board.findByRole('button', { name: 'Подтвердить' }));
    await userEvent.click(board.getByRole('button', { name: /^Открыть N1$/ }));
    fireEvent.change(board.getByLabelText('Заметка к заказу'), { target: { value: 'Проверено.' } });
    await userEvent.click(board.getByRole('button', { name: 'Сохранить изменения' }));
    const moved = within(board.getByRole('region', { name: 'Выкуплен' })).getByLabelText(/^N1 ·/);
    await expect(within(moved).getByText(/Проверено/)).toBeVisible();
  },
};
export const TwoBoards: Story = { render: () => <><OrdersWidget/><OrdersWidget/></> };
export const StandaloneFrame: Story = { render: () => <NamiDemoFrame demo="orders"/> };
