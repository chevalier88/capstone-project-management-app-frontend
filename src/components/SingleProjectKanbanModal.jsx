/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {
  MenuItem, ListItemIcon, ListItemText,
} from '@mui/material';
import Board from 'react-trello';
import Iconify from './Iconify.jsx';

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
      <MenuItem sx={{ color: 'text.primary' }} onClick={handleClickOpen}>
        <ListItemIcon>
          <Iconify
            sx={{ color: 'text.primary' }}
            icon="ph:kanban-duotone"
            width={24}
            height={24}
          />
        </ListItemIcon>
        <ListItemText primary="Open Kanban" primaryTypographyProps={{ variant: 'body2' }} />
      </MenuItem>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open Kanban
      </Button> */}
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
          <Board data={row.kanbanData} editable />
        </AppBar>

      </Dialog>
    </div>
  );
}
