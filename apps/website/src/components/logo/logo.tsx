import { forwardRef } from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from '@src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      component="img"
      ref={ref}
      src="/logo/logo_single.png"
      sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
      {...other}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

export default Logo;
