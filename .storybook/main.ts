import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Intentionally empty until the first NAMI widget story is added.
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
