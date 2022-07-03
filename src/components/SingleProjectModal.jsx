import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

export default function SingleProjectModal({ rowContent }) {
  const [open, setOpen] = useState(false);
  const [scroll] = useState('paper');
  // const [inProgress, setInProgress] = useState(false);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  if (rowContent.stage === 'in-progress') {
    // setInProgress(true);
    console.log('in progress, kanban board enabled!');
  } else {
    console.log('not in progress, no kanban board.');
  }

  return (
    <div>
      <Button onClick={handleClickOpen()}>View</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          PLACEHOLDER FOR ONE PROJECT
          {' '}
          {rowContent.name}
        </DialogTitle>

        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            Project ID:
            {' '}
            {rowContent.id}
            <Divider />
            {rowContent.summary}
            <Divider />
            <ul>
              {Object.keys(rowContent).map((key) => (
                <li>{key}</li>
              ))}
            </ul>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {rowContent.stage === 'in-progress' && <Button onClick={handleClose}>Open Kanban</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
