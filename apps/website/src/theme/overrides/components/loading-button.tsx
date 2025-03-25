import { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { buttonClasses } from '@mui/material/Button';
import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function loadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: LoadingButtonProps }) => ({
          ...(ownerState.variant === 'soft' && {
            [`& .${buttonClasses.loadingIndicator}`]: {
              left: ownerState.loadingPosition === 'start' ? 10 : undefined,
              right: ownerState.loadingPosition === 'end' ? 14 : undefined,
            },
            ...(ownerState.size === 'small' && {
              [`& .${buttonClasses.loadingIndicator}`]: {
                left: ownerState.loadingPosition === 'start' ? 10 : undefined,
                right: ownerState.loadingPosition === 'end' ? 10 : undefined,
              },
            }),
          }),
        }),
      },
    },
  };
}
