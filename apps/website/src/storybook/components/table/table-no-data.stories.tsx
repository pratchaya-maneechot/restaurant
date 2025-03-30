import { TableNoData } from '@src/components/table';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TableNoData> = {
  title: 'Components/Table/TableNoData',
  component: TableNoData,
  tags: ['autodocs'],
  argTypes: {
    notFound: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof TableNoData>;

export const DataNotFound: Story = {
  args: {
    notFound: true,
  },
};

export const HasData: Story = {
  args: {
    notFound: false,
  },
};
