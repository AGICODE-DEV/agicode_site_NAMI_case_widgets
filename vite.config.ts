import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';
import { defineConfig } from 'vite';

// Used by Storybook. Keep library-specific build options separate.
export default defineConfig({
  plugins: [wyw(), react()],
});
