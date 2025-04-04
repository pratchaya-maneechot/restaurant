import AppBar from '@mui/material/AppBar';
import Badge, { badgeClasses } from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { paths } from '@src/routes/paths';

import { useOffSetTop } from '@src/hooks/use-off-set-top';
import { useResponsive } from '@src/hooks/use-responsive';

import { bgBlur } from '@src/theme/css';

import Label from '@src/components/label';
import Logo from '@src/components/logo';

import HeaderShadow from '../common/header-shadow';
import LoginButton from '../common/login-button';
import SettingsButton from '../common/settings-button';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import NavDesktop from './nav/desktop';
import NavMobile from './nav/mobile';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 8,
                right: -16,
              },
            }}
            badgeContent={
              <Label color="info" sx={{ textTransform: 'unset', height: 22, px: 0.5 }}>
                v5.7.0
              </Label>
            }
          >
            <Logo />
          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop data={navConfig} />}

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
            <Button variant="contained" target="_blank" rel="noopener" href={paths.home}>
              Purchase Now
            </Button>

            {mdUp && <LoginButton />}

            <SettingsButton
              sx={{
                ml: { xs: 1, md: 0 },
                mr: { md: 2 },
              }}
            />

            {!mdUp && <NavMobile data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
