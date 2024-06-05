import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface Props {
  text: string;
  closeModal: () => void;
  colorName: 'success' | 'error' | 'warning';
}

export default function SimpleSnackbar({ text, closeModal, colorName }: Props) {
  const DURATION_HIDE = 5000;
  const [open, setOpen] = useState(true);

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    closeModal();
  };

  const action = (
    <>
      <Button color={colorName} size='medium' onClick={handleClose}>
        {text}
      </Button>
      <IconButton size='medium' aria-label='close' color='inherit' onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={DURATION_HIDE}
        onClose={handleClose}
        action={action}
      />
    </div>
  );
}
