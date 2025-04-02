import { RestaurantAddress } from '@generated/graphql';
import { Stack, Typography } from '@mui/material';
import _ from 'lodash';

// ----------------------------------------------------------------------

type Props = {
  address: RestaurantAddress;
  phoneNumber: string;
};

export default function RestaurantDetailsContact({ address, phoneNumber }: Props) {
  return (
    <Stack p={3} spacing={1}>
      <Typography variant="subtitle2">Contact</Typography>
      <Stack>
        <Typography fontSize={14}>{formatRestaurantAddress(address)}.</Typography>
        <Typography fontSize={14}>Tel {phoneNumber}</Typography>
      </Stack>
    </Stack>
  );
}

const formatRestaurantAddress = (address: object): string => {
  return Object.entries(address)
    .filter(([key]) => key !== 'longitude' && key !== 'latitude') // Exclude longitude & latitude
    .map(([key, value]) => `${_.capitalize(key)} ${value}`)
    .join(', ');
};
