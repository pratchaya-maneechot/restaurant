import sumBy from 'lodash/sumBy';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useBoolean } from '@src/hooks/use-boolean';

import { fShortenNumber } from '@src/utils/format-number';

import Iconify from '@src/components/iconify';

import { IRestaurantReview } from '@src/types/restaurant';

import RestaurantReviewList from './restaurant-review-list';

// ----------------------------------------------------------------------

type Props = {
  totalRatings: number;
  totalReviews: number;
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  reviews: IRestaurantReview[];
};

export default function RestaurantDetailsReview({ totalRatings, totalReviews, ratings, reviews }: Props) {
  const review = useBoolean();

  const total = sumBy(ratings, (star) => star.starCount);

  const renderSummary = (
    <Stack spacing={1} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">Average rating</Typography>

      <Typography variant="h2">{totalRatings}/5</Typography>

      <Rating readOnly value={totalRatings} precision={0.1} />

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        ({fShortenNumber(totalReviews)} reviews)
      </Typography>
    </Stack>
  );

  const renderProgress = (
    <Stack
      spacing={1.5}
      sx={{
        py: 5,
        px: { xs: 3, md: 5 },
        borderLeft: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
        borderRight: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
      }}
    >
      {ratings
        .slice(0)
        .reverse()
        .map((rating) => (
          <Stack key={rating.name} direction="row" alignItems="center">
            <Typography variant="subtitle2" component="span" sx={{ width: 42 }}>
              {rating.name}
            </Typography>

            <LinearProgress
              color="inherit"
              variant="determinate"
              value={(rating.starCount / total) * 100}
              sx={{
                mx: 2,
                flexGrow: 1,
              }}
            />

            <Typography
              variant="body2"
              component="span"
              sx={{
                minWidth: 48,
                color: 'text.secondary',
              }}
            >
              {fShortenNumber(rating.reviewCount)}
            </Typography>
          </Stack>
        ))}
    </Stack>
  );

  const renderReviewButton = (
    <Stack alignItems="center" justifyContent="center">
      <Button
        size="large"
        variant="soft"
        color="inherit"
        onClick={review.onTrue}
        startIcon={<Iconify icon="solar:pen-bold" />}
      >
        Write your review
      </Button>
    </Stack>
  );

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{
          py: { xs: 5, md: 0 },
        }}
      >
        {renderSummary}

        {renderProgress}

        {renderReviewButton}
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <RestaurantReviewList reviews={reviews} />
    </>
  );
}
