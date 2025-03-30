import RestaurantSearch from '@src/sections/restaurant/restaurant-search';
import { Meta, StoryObj } from '@storybook/react';
import { mockRestaurants } from '../../../_mock/restaurant';

// Mock hrefItem function
const mockHrefItem = (id: string) => `/restaurant/${id}`;

const meta: Meta<typeof RestaurantSearch> = {
  title: 'Sections/Restaurant/Restaurant Search',
  component: RestaurantSearch,
  tags: ['autodocs'],
  argTypes: {
    query: { control: 'text' },
    results: { control: 'object' },
    onSearch: { action: 'searched' },
    hrefItem: { action: 'hrefGenerated' },
    loading: { control: 'boolean' },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof RestaurantSearch>;

export const Default: Story = {
  args: {
    query: '',
    results: mockRestaurants,
    onSearch: (inputValue: string) => console.log('Search input:', inputValue),
    hrefItem: mockHrefItem,
    loading: false,
  },
};

export const LoadingState: Story = {
  args: {
    query: 'Sushi',
    results: [],
    onSearch: (inputValue: string) => console.log('Search input:', inputValue),
    hrefItem: mockHrefItem,
    loading: true,
  },
};

export const NoResults: Story = {
  args: {
    query: 'Tacos',
    results: [],
    onSearch: (inputValue: string) => console.log('Search input:', inputValue),
    hrefItem: mockHrefItem,
    loading: false,
  },
};

export const FullResults: Story = {
  args: {
    query: '',
    results: mockRestaurants,
    onSearch: (inputValue: string) => console.log('Search input:', inputValue),
    hrefItem: mockHrefItem,
    loading: false,
  },
};
