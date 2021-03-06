/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {
  useRef, useState, useContext, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Menu, MenuItem, IconButton, ListItemIcon, ListItemText,
} from '@mui/material';
import axios from 'axios';
import Iconify from './Iconify.jsx';
import { UserContext } from './UserContext.jsx';
import SingleProjectKanbanModal from './SingleProjectKanbanModal.jsx';
import BACKEND_URL from '../supportFunctions.js';

export default function UserMoreMenu({ rowContent, usersList, setJustSubmitted }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showJoinButton, setShowJoinButton] = useState(false);

  const checkIfUserIsAlreadyEnrolledHere = () => {
    if (usersList.some((name) => name === user.name)) {
      return true;
    } return false;
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSignContractButtonClick = () => {
    console.log('contract button was clicked');
    setIsOpen(false);
    navigate('/fakeDocusign');
  };

  async function deleteCurrentProject() {
    try {
      const deletion = await axios.delete(`${BACKEND_URL}/project/${rowContent.id}`);
      console.log(deletion);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteButtonClick = () => {
    console.log('delete button was clicked');
    deleteCurrentProject();
    setIsOpen(false);
    setJustSubmitted(true);
  };

  async function addUserToProject() {
    try {
      const enrolUserToProjectObject = {
        userId: user.id,
        projectId: rowContent.id,
      };
      const enrolUser = await axios.post(`${BACKEND_URL}/project/enrol-user/${user.id}`, enrolUserToProjectObject);
      console.log(enrolUser);
    } catch (error) {
      console.log(error);
    }
  }
  const handleAddUserToProject = () => {
    console.log('USER ID:', user.id, 'ADDED PROJECT', rowContent.id);
    setIsOpen(false);
    addUserToProject();
    setJustSubmitted(true);
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

  useEffect(() => {
    if (rowContent.stage === 'sourcing' && !checkDateValid() && !checkIfProjectFull() && user.accountType === 'engineer' && !checkIfUserIsAlreadyEnrolledHere()) {
      setShowJoinButton(true);
    } else {
      console.log('this user cannot join this project.');
    }
  }, []);

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
        {rowContent.stage === 'in-progress' && <SingleProjectKanbanModal projectId={rowContent.id} name={rowContent.name} data={rowContent.kanbanData} setJustSubmitted={setJustSubmitted} />}

        {user.accountType === 'manager' && (
        <MenuItem
          sx={{ color: 'text.primary' }}
          onClick={handleSignContractButtonClick}
        >
          <ListItemIcon>
            <Iconify
              sx={{ color: 'text.primary' }}
              icon="clarity:contract-line"
              width={24}
              height={24}
            />
          </ListItemIcon>
          <ListItemText primary="Sign Contract" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        )}

        {user.accountType === 'manager' && (
        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={handleDeleteButtonClick}
        >
          <ListItemIcon>
            <Iconify
              sx={{ color: 'error.main' }}
              icon="eva:trash-2-outline"
              width={24}
              height={24}
            />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        )}
        {showJoinButton ? (
          <MenuItem sx={{ color: 'text.secondary' }} onClick={(e) => handleAddUserToProject(e)}>
            <ListItemIcon>
              <Iconify
                icon="fluent:arrow-join-20-regular"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText primary="Join Project" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : (
          <MenuItem sx={{ color: 'text.secondary' }} disabled>
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
