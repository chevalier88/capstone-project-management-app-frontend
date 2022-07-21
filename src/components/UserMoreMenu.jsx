import React, { useRef, useState } from 'react';
// material
import {
  Menu, MenuItem, IconButton, ListItemIcon, ListItemText,
} from '@mui/material';
// component
import Iconify from './Iconify.jsx';

// ----------------------------------------------------------------------

export default function UserMoreMenu() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    console.log('clicked');
  };

  const handleDeleteButtonClick = () => {
    console.log('delete button was clicked');
    setIsOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={handleOpen}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDeleteButtonClick}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
