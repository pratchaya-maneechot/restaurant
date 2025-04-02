import { Box } from '@mui/material';
import RestaurantCard from '@src/sections/restaurant/restaurant-card';
import { IRestaurant } from '@src/types/restaurant';
import { Meta, StoryObj } from '@storybook/react';
import { mockRestaurants } from '../../../_mock/restaurant';

const baseRestaurant: IRestaurant = mockRestaurants[0];
const meta: Meta<typeof RestaurantCard> = {
  title: 'Sections/Restaurant/Restaurant Card',
  component: RestaurantCard,
  tags: ['autodocs', 'restaurant', 'card'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component displaying restaurant information with various states',
      },
    },
  },
  argTypes: {
    restaurant: {
      control: 'object',
      description: 'Restaurant data object containing all required properties',
      table: {
        type: { summary: 'IRestaurant' },
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, width: 300, margin: 'auto' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RestaurantCard>;

export const Default: Story = {
  args: {
    restaurant: baseRestaurant,
  },
};

export const ClosedRestaurant: StoryObj<typeof RestaurantCard> = {
  args: {
    restaurant: { ...baseRestaurant, isActive: false },
  },
};

export const NoPhotos: StoryObj<typeof RestaurantCard> = {
  args: {
    restaurant: { ...baseRestaurant, photos: [] },
  },
};

export const NoOperatingHours: StoryObj<typeof RestaurantCard> = {
  args: {
    restaurant: { ...baseRestaurant, operatingHours: [] },
  },
};

export const LowRating: StoryObj<typeof RestaurantCard> = {
  args: {
    restaurant: { ...baseRestaurant, totalRatings: 2 },
  },
};

export const HighRating: StoryObj<typeof RestaurantCard> = {
  args: {
    restaurant: { ...baseRestaurant, totalRatings: 5 },
  },
};
