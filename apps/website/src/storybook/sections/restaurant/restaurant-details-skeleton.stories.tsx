import { Box } from '@mui/material';
import { RestaurantDetailsSkeleton } from '@src/sections/restaurant/restaurant-skeleton';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RestaurantDetailsSkeleton> = {
  title: 'Sections/Restaurant/Restaurant Details Skeleton',
  component: RestaurantDetailsSkeleton,
  tags: ['autodocs', 'skeleton', 'restaurant', 'details'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Skeleton component for restaurant details loading state',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, width: '100%', maxWidth: 1200, margin: 'auto' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RestaurantDetailsSkeleton>;

export const Default: Story = {
  args: {},
};

export const MobileView: Story = {
  name: 'Mobile View',
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletView: Story = {
  name: 'Tablet View',
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const CustomSpacing: Story = {
  name: 'Custom Spacing',
  args: {
    spacing: 4,
  },
};
