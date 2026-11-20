import { styled } from '@linaria/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NamiMiniWidget, scenarioWidgets } from './NamiMiniWidget';


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

const blocks = Object.entries(scenarioWidgets).map(([key, Component]) => {
  const [demo, scenario, step] = key.split('-');
  return { demo, scenario: Number(scenario), step: Number(step), Component };
});

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
