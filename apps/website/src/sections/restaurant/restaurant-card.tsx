import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';

import Iconify from '@src/components/iconify';
import Image from '@src/components/image';

import { Rating } from '@mui/material';
import { IRestaurant } from '@src/types/restaurant';
import { findTodayOperatingHours } from '@src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  restaurant: IRestaurant;
};

export default function RestaurantCard({ restaurant }: Props) {
  const { id, name, photos, isActive, operatingHours, totalRatings } = restaurant;

  const toDay = findTodayOperatingHours(operatingHours ?? []);

  const linkTo = paths.restaurant.details(id);

  const handleReserve = async () => {
    //
  };

  const renderImg = (
    <Box sx={{ position: 'relative', p: 1 }}>
      {!!isActive && (
        <Fab
          color="primary"
          size="medium"
          className="on-reserve"
          onClick={handleReserve}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="fluent-mdl2:reservation-orders" width={24} />
        </Fab>
      )}

      <Tooltip title={!isActive && 'Restaurant is closed'} placement="bottom-end">
        <Image
          alt={name}
          src={photos[0]}
          ratio="1/1"
          sx={{
            borderRadius: 1.5,
            opacity: 0.48,
            filter: 'grayscale(1)',
          }}
        />
      </Tooltip>
    </Box>
  );

  const renderContent = (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      <Link component={RouterLink} href={linkTo} color="inherit" variant="subtitle2" noWrap>
        {name}
      </Link>
      <Stack direction={'row'} justifyContent={'space-between'} sx={{ typography: 'caption' }}>
        {totalRatings && totalRatings > 3 && (
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={0.5}>
            <Rating defaultValue={totalRatings} max={1} size="small" />
            <Stack direction="row" spacing={0.5}>
              {totalRatings}
            </Stack>
          </Stack>
        )}
        {isActive && !toDay?.isClosed ? (
          <Stack direction="row" spacing={0.5}>
            {toDay?.openTime} - {toDay?.closeTime}
          </Stack>
        ) : (
          'Close'
        )}
      </Stack>
    </Stack>
  );

  return (
    <Card
      sx={{
        '&:hover .on-reserve': {
          opacity: 1,
        },
      }}
    >
      {renderImg}

      {renderContent}
    </Card>
  );
}
