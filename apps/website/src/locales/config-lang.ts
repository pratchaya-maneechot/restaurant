'use client';

import merge from 'lodash/merge';
// date fns
import { enUS as enUSAdapter } from 'date-fns/locale';

// date pickers (MUI)
import { enUS as enUSDate } from '@mui/x-date-pickers/locales';
// core (MUI)
import { enUS as enUSCore } from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
    numberFormat: {
      code: 'en-US',
      currency: 'USD',
    },
  },
  // {
  //   label: 'Thailand',
  //   value: 'th',
  //   systemValue: merge(enUSDate, thTHCore),
  //   adapterLocale: thAdapter,
  //   icon: 'flagpack:gb-nir',
  //   numberFormat: {
  //     code: 'th-TH',
  //     currency: 'THB',
  //   },
  // },
];

export const defaultLang = allLangs[0]; // English

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
