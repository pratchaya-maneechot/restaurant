import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = DialogProps & {
  phoneNumber?: string;
  onBook?: VoidFunction;
  onChangePhoneNumber?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //
  open: boolean;
  onClose: VoidFunction;
};

export default function RestaurantBookingDialog({
  phoneNumber,
  onBook,
  onChangePhoneNumber,
  //
  open,
  onClose,
  ...other
}: Props) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle>Booking Info</DialogTitle>

      <DialogContent sx={{ overflow: 'unset' }}>
        <TextField
          size="small"
          fullWidth
          value={phoneNumber}
          placeholder="Name"
          onChange={onChangePhoneNumber}
          sx={{ mb: 2 }}
        />
        <TextField
          size="small"
          fullWidth
          value={phoneNumber}
          placeholder="Phone"
          onChange={onChangePhoneNumber}
          sx={{ mb: 2 }}
        />
        <TextField
          size="small"
          fullWidth
          multiline
          minRows={2}
          value={phoneNumber}
          placeholder="Additional"
          onChange={onChangePhoneNumber}
          sx={{ mb: 2 }}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between' }}>
        {onBook && (
          <Button startIcon={<Iconify icon="eva:link-2-fill" />} onClick={onBook}>
            Confirm
          </Button>
        )}

        {onClose && (
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
