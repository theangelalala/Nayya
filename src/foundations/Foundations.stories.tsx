import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Foundations } from './Foundations';

const meta: Meta<typeof Foundations> = {
  title: 'Foundations/Titan tokens',
  component: Foundations,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const All: StoryObj<typeof Foundations> = {};
