import type { Preview } from '@storybook/nextjs-vite';
import '@fontsource-variable/inter'; // placeholder until Söhne is licensed
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    a11y: { test: 'todo' },
  },
};

export default preview;
