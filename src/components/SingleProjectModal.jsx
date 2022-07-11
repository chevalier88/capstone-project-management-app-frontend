/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import SingleProjectKanbanModal from './SingleProjectKanbanModal.jsx';
import RandomLoremIpsum from './RandomLoremIpsum.jsx';

export default function SingleProjectModal({ rowContent }) {
  const [open, setOpen] = useState(false);
  const [scroll] = useState('paper');

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

  return (
    <>
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

        <DialogContent component="div" dividers={scroll === 'paper'}>
          <DialogContentText
            component="div"
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            Project ID:
            {' '}
            {rowContent.id}
            <Divider component="div" />
            {rowContent.summary}
            <Divider component="div" />
            {JSON.stringify(rowContent)}
            <Divider component="div" />
            <RandomLoremIpsum />

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* {rowContent.stage === 'in-progress' && <Button onClick={(e) => handleKanbanOpen(e)}>Open Kanban</Button>} */}
          {rowContent.stage === 'in-progress' && <SingleProjectKanbanModal row={rowContent} />}
        </DialogActions>
      </Dialog>
    </>
  );
}
