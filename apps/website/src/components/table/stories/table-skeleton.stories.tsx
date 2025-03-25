import type { Meta, StoryObj } from '@storybook/react';
import TableSkeleton from '../table-skeleton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Table/TableSkeleton',
  component: TableSkeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof TableSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
