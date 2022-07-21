/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { UserContext } from './UserContext.jsx';
import SingleProjectKanbanModal from './SingleProjectKanbanModal.jsx';
import Typography from './Home/Typography.jsx';
import BACKEND_URL from '../supportFunctions.js';

import CircularIndeterminate from './CircularIndeterminate.jsx';

export default function SingleProjectModal({ rowContent }) {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [scroll] = useState('paper');

  const [showLoading, setShowLoading] = useState(true);

  const [userList, setUserList] = useState([]);
  // const [skillList, setSkillList] = useState([]);

  async function getUsersAndSkillsForThisProject() {
    try {
      const results = await axios.get(`${BACKEND_URL}/project/${rowContent.id}`);
      const { data } = results;
      console.log(data);
      const usersArray = [];
      data.forEach((item) => usersArray.push(item.user.name));
      console.log(usersArray);
      setUserList(usersArray);
      setShowLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickOpen = () => () => {
    setOpen(true);
    setTimeout(getUsersAndSkillsForThisProject, 3000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Add Controller here
  const addProject = () => {
    console.log('USER ID:', user.id, 'ADDED PROJECT', rowContent.id);
    setOpen(false);
  };

  console.log('user_projects', rowContent.user_projects.length);
  console.log('user_engineers required', rowContent.noEngineersRequired);
  console.log('user id ', user.id);

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

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  console.log(rowContent);

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
          {rowContent.name}
        </DialogTitle>

        {showLoading ? (<CircularIndeterminate showLoading={showLoading} />
        ) : (
          <DialogContent component="div" dividers={scroll === 'paper'}>
            <DialogContentText
              component="div"
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              ID:
              {' '}
              {rowContent.id}
              <Divider component="div" />
              {rowContent.summary}
              <Divider component="div" />
              <br />
              <Typography variant="h4">
                {' '}
                $
                {rowContent.minimumSalary}
                /hr

              </Typography>
              <br />
              Number of Engineers Enrolled/Required:
              {' '}
              {rowContent.user_projects.length}
              /
              {rowContent.noEngineersRequired}
              <br />
              {rowContent.user_projects.length !== 0 && (
              <Autocomplete
                multiple
                id="Engineer IDs Enrolled"
                options={userList.map((option) => option)}
                defaultValue={userList.map((option) => option)}
                readOnly
                renderInput={(params) => (
                  <TextField {...params} placeholder="Enrolled So Far" />
                )}
              />
              )}

              Enrolment Deadline:
              {rowContent.enrolmentDeadline.slice(0, 10)}
              /
              {rowContent.enrolmentDeadline.slice(11, 16)}
              <br />
              Delivery Deadline:
              {rowContent.deliveryDeadline.slice(0, 10)}
              /
              {rowContent.deliveryDeadline.slice(11, 16)}
              {' '}
              <br />
              {' '}
              <br />
              <Divider component="div" />

            </DialogContentText>
          </DialogContent>

        )}
        <DialogActions>
          {rowContent.stage === 'sourcing' && !checkDateValid() && !checkIfProjectFull() && user.accountType === 'engineer' && <Button onClick={(e) => addProject(e)}>Join Project</Button>}
          {rowContent.stage === 'in-progress' && <SingleProjectKanbanModal row={rowContent} />}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
