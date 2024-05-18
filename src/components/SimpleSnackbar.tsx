import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  text: string;
  closeModal: () => void;
}

export default function SimpleSnackbar({ text, closeModal }: Props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    closeModal();
  };

  const action = (
    <>
      <Button color='warning' size='medium' onClick={handleClose}>
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
        autoHideDuration={5000}
        onClose={handleClose}
        message='Error!'
        action={action}
      />
    </div>
  );
}
