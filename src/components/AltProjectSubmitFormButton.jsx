/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import {
  Fab,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import MUIReactHookForm from './MUIReactHookForm.jsx';

export default function AltProjectSubmitFormButton() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <Tooltip title="Start A New Project">
        <Fab
          component="div"
          onClick={handleClickOpen}
          variant="circular"
          color="primary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            bottom: '25%',
            position: 'fixed',
            right: 100,
          }}
        >
          {/* <AnimateButton type="rotate"> */}
          <IconButton color="inherit" size="large" disableRipple>
            <AddIcon />
          </IconButton>
          {/* </AnimateButton> */}
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit New Project</DialogTitle>
        <DialogContent>
          <MUIReactHookForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
