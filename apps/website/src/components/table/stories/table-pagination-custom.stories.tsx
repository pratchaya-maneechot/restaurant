import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TablePaginationCustom from '../table-pagination-custom';

const meta: Meta<typeof TablePaginationCustom> = {
  title: 'Components/Table/TablePaginationCustom',
  component: TablePaginationCustom,
  tags: ['autodocs'],
  argTypes: {
    count: { control: 'number' },
    page: { control: 'number' },
    rowsPerPage: { control: 'number' },
    dense: { control: 'boolean' },
    onPageChange: { action: 'pageChanged' },
    onRowsPerPageChange: { action: 'rowsPerPageChanged' },
    onChangeDense: { action: 'denseChanged' },
  },
};

export default meta;

type Story = StoryObj<typeof TablePaginationCustom>;

export const Default: Story = {
  args: {
    count: 100,
    page: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25],
  },
};

export const WithDenseToggle: Story = {
  args: {
    count: 50,
    page: 1,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    dense: false,
    onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => console.log('Dense toggled:', event.target.checked),
  },
};

export const HighPageCount: Story = {
  args: {
    count: 1000,
    page: 5,
    rowsPerPage: 25,
    rowsPerPageOptions: [25, 50, 100],
    dense: true,
  },
};
