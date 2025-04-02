'use client';

import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';

import EmptyContent from '@src/components/empty-content';
import Iconify from '@src/components/iconify';
import { useSettingsContext } from '@src/components/settings';

import { CardContent } from '@mui/material';
import { PUBLISH_OPTIONS } from '@src/_mock/restaurant';
import { IRestaurant } from '@src/types/restaurant';
import RestaurantDetailsCarousel from '../restaurant-details-carousel';
import RestaurantDetailsContact from '../restaurant-details-contact';
import RestaurantDetailsDescription from '../restaurant-details-description';
import RestaurantDetailsMenuRecommend from '../restaurant-details-menu-recommend';
import RestaurantDetailsReview from '../restaurant-details-review';
import RestaurantDetailsSummary from '../restaurant-details-summary';
import RestaurantDetailsToolbar from '../restaurant-details-toolbar';
import { RestaurantDetailsSkeleton } from '../restaurant-skeleton';

// ----------------------------------------------------------------------

type Props = {
  slug: string;
  restaurant: IRestaurant;
};

export default function RestaurantDetailsView({ slug, restaurant }: Props) {
  const SUMMARY = [
    {
      title: 'Cuisines type',
      description: restaurant.cuisineType.join(', '),
      icon: 'mdi:food',
    },
    {
      title: 'Languages',
      description: restaurant.serviceLanguages?.join(', '),
      icon: 'fa:language',
    },
    {
      title: 'Payment Method',
      description: restaurant.paymentMethods?.join(', '),
      icon: 'ic:baseline-payment',
    },
  ];

  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('description');

  const [publish, setPublish] = useState(restaurant?.isActive ? 'ACTIVE' : 'INACTIVE');

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const renderSkeleton = <RestaurantDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`Something went wrong`}
      action={
        <Button
          component={RouterLink}
          href={paths.restaurant.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderRestaurant = restaurant && (
    <>
      <RestaurantDetailsToolbar
        backLink={paths.restaurant.root}
        editLink={paths.home}
        liveLink={paths.restaurant.details(`${restaurant?.id}`)}
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={PUBLISH_OPTIONS}
      />
      <Card>
        <CardContent>
          <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
            <Grid size={{ xs: 12, md: 6, lg: 7 }}>
              <RestaurantDetailsCarousel restaurant={restaurant} />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 5 }}>
              <RestaurantDetailsSummary restaurant={restaurant} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{ my: 10 }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: 'center', px: 5 }} flexGrow={1}>
            <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card
        sx={{
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {[
            {
              value: 'description',
              label: 'Description',
            },
            {
              value: 'reviews',
              label: `Reviews (${restaurant.totalReviews})`,
            },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {currentTab === 'description' && (
          <>
            <RestaurantDetailsDescription description={restaurant?.description ?? ''} />
            <RestaurantDetailsMenuRecommend items={restaurant.recommendedMenus ?? []} />
            <RestaurantDetailsContact address={restaurant.address} phoneNumber={restaurant.phoneNumber} />
          </>
        )}

        {currentTab === 'reviews' && (
          <RestaurantDetailsReview
            ratings={restaurant.ratings ?? []}
            reviews={restaurant.reviews ?? []}
            totalRatings={restaurant.totalRatings}
            totalReviews={restaurant.totalReviews}
          />
        )}
      </Card>
    </>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {/* {restaurantLoading && renderSkeleton} */}

      {/* {restaurantError && renderError} */}

      {restaurant && renderRestaurant}
    </Container>
  );
}
