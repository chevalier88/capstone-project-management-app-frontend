/* eslint-disable max-len */
import React, { useRef, useState, useContext } from 'react';
// material
import {
  Menu, MenuItem, IconButton, ListItemIcon, ListItemText,
} from '@mui/material';
// component
import Iconify from './Iconify.jsx';
import { UserContext } from './UserContext.jsx';
import SingleProjectKanbanModal from './SingleProjectKanbanModal.jsx';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ rowContent }) {
  const { user } = useContext(UserContext);
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
  // Add Controller here
  const addProject = () => {
    console.log('USER ID:', user.id, 'ADDED PROJECT', rowContent.id);
    setIsOpen(false);
  };

  const checkIfProjectFull = () => {
    const engineersEnrolled = Number(rowContent.user_projects.length);
    const engineersRequired = Number(rowContent.noEngineersRequired);
    if ((engineersEnrolled / engineersRequired) === 1) return true;
    return false;
  };

  const checkDateValid = () => {
    const date = (rowContent.deliveryDeadline.slice(0, 10)).value;
    const varDate = new Date(date); // dd-mm-YYYY
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // check if the project deadline date is bigger than today, if yes, TRUE
    if (varDate >= today) {
      console.log('checkDateValid!');
      return true;
    }
    return false;
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
        {rowContent.stage === 'in-progress' && <SingleProjectKanbanModal row={rowContent} />}

        {user.accountType === 'manager' && (
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDeleteButtonClick}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        )}
        {rowContent.stage === 'sourcing' && !checkDateValid() && !checkIfProjectFull() && user.accountType === 'engineer' && (
        <MenuItem sx={{ color: 'text.secondary' }} onClick={(e) => addProject(e)}>
          <ListItemIcon>
            <Iconify
              icon="fluent:arrow-join-20-regular"
              width={24}
              height={24}
            />
          </ListItemIcon>
          <ListItemText primary="Join Project" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        )}
      </Menu>
    </>
  );
}
