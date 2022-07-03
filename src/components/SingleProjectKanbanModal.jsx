/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import Board from 'react-trello';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function SingleProjectKanbanModal({ row }) {
  console.log(row.kanbanData);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Kanban
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {row.name}
              {' '}
              Kanban
            </Typography>

          </Toolbar>
          <Divider />
          {/* {JSON.stringify(row.kanbanData)} */}
          <Board data={row.kanbanData} />
        </AppBar>

      </Dialog>
    </div>
  );
}
