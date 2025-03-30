import { Box } from '@mui/material';
import { RestaurantCardSkeleton } from '@src/sections/restaurant/restaurant-skeleton';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RestaurantCardSkeleton> = {
  title: 'Sections/Restaurant/Restaurant Card Skeleton',
  component: RestaurantCardSkeleton,
  tags: ['autodocs', 'skeleton', 'restaurant', 'card'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Skeleton component for restaurant card loading state',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, maxWidth: 400, margin: 'auto' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RestaurantCardSkeleton>;

export const Default: Story = {
  args: {
    sx: { width: 300 },
  },
};
