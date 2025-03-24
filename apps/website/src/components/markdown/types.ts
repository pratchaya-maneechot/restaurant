import { Options } from 'react-markdown';

import { SxProps, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export interface MarkdownProps extends Options {
  sx?: SxProps<Theme>;
}
