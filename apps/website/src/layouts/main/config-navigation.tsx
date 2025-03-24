import Iconify from '@src/components/iconify';
import { NavItemBaseProps } from './nav/types';

// ----------------------------------------------------------------------

export const navConfig: NavItemBaseProps[] = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
];
