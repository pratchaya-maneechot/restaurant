import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { fShortenNumber } from '@src/utils/format-number';

import FormProvider from '@src/components/hook-form';
import Iconify from '@src/components/iconify';

import { IRestaurant } from '@src/types/restaurant';

import Button from '@mui/material/Button';
import { useBoolean } from '@src/hooks/use-boolean';
import { findTodayOperatingHours } from '@src/utils/format-time';
import IncrementerButton from './common/incrementer-button';
import RestaurantBookingDialog from './restaurant-booking-dialog';

// ----------------------------------------------------------------------

type Props = {
  restaurant: IRestaurant;
  disabledActions?: boolean;
  onGotoStep?: (step: number) => void;
  onAddCart?: (cartItem: never) => void;
};

export default function RestaurantDetailsSummary({ restaurant, disabledActions, ...other }: Props) {
  const { id, name, totalRatings, totalReviews, subDescription, operatingHours, isActive } = restaurant;
  const toDay = findTodayOperatingHours(operatingHours ?? []);

  const defaultValues = {
    id,
    name,
    quantity: 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (restaurant) {
      reset(defaultValues);
    }
  }, [restaurant]);

  const onSubmit = handleSubmit(async (_) => {
    //
  });

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        People
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={values.quantity}
          disabledDecrease={values.quantity <= 1}
          disabledIncrease={false}
          onIncrease={() => setValue('quantity', values.quantity + 1)}
          onDecrease={() => setValue('quantity', values.quantity - 1)}
        />
      </Stack>
    </Stack>
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const renderDateTime = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Date
      </Typography>

      <Stack spacing={1}>
        <DateTimePicker
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          slotProps={{ textField: { size: 'small' } }}
          timezone="Asia/Bangkok"
          label="Date"
        />
        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          {isActive && !toDay?.isClosed ? `Open ${toDay?.openTime} - ${toDay?.closeTime}` : 'Close'}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subDescription}
    </Typography>
  );

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        color: 'text.disabled',
        typography: 'body2',
      }}
    >
      <Rating size="small" value={totalRatings} precision={0.1} readOnly sx={{ mr: 1 }} />
      {`(${fShortenNumber(totalReviews)} reviews)`}
    </Stack>
  );

  const confirmBooking = useBoolean();

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={disabledActions}
        onClick={confirmBooking.onTrue}
      >
        Book
      </Button>
      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:share-bold" width={16} sx={{ mr: 1 }} />
        Share
      </Link>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h5">{name}</Typography>

          {renderRating}

          {renderSubDescription}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        {renderDateTime}
        {renderQuantity}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderActions}
        <RestaurantBookingDialog onClose={confirmBooking.onFalse} open={confirmBooking.value} />
      </Stack>
    </FormProvider>
  );
}
