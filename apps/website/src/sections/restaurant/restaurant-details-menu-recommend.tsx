import { MenuItem } from '@generated/graphql';
import { Avatar, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

// ----------------------------------------------------------------------

type Props = {
  items: MenuItem[];
};

export default function RestaurantDetailsMenuRecommend({ items }: Props) {
  return (
    <Stack p={3} spacing={1}>
      <Typography variant="subtitle2">Recommended</Typography>

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid key={item.name} size={{ xs: 12, md: 6 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              {item.imageUrl && (
                <Avatar variant="rounded" alt={item.name} src={item.imageUrl} sx={{ width: 64, height: 64 }} />
              )}
              <Stack>
                <Typography fontSize={14}>{item.name}</Typography>
                <Typography fontSize={14}>{item.price} ฿</Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
