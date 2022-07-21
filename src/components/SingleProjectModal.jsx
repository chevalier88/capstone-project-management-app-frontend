/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import Grid from '@mui/material/Grid';
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

  const [usersList, setUsersList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);

  async function getUsersAndSkillsForThisProject() {
    try {
      const results = await axios.get(`${BACKEND_URL}/project/${rowContent.id}`);
      const { data } = results;
      console.log(data);
      const usersArray = [];
      const skillsArray = [];
      data.skills.forEach((skillObject) => skillsArray.push(skillObject.skill.name));
      data.users.forEach((userObject) => usersArray.push(userObject.user.name));
      setSkillsList(skillsArray);
      setUsersList(usersArray);
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

  return (
    <>
      <Button onClick={handleClickOpen()}>View</Button>
      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography component="span" variant="h3">
            {' '}
            {rowContent.name}
          </Typography>

        </DialogTitle>

        {showLoading ? (
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <CircularIndeterminate showLoading={showLoading} />
          </Grid>

        ) : (
          <DialogContent component="div" dividers={scroll === 'paper'}>
            <DialogContentText
              component="div"
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  ID:
                  {' '}
                  {rowContent.id}
                </Grid>
                <Grid item xs={4}>
                  Industry:
                  {' '}
                  <br />
                  {rowContent.industry.name}
                </Grid>
                <Grid item xs={6}>
                  Created Date:
                  {' '}
                  <br />
                  {rowContent.createdAt.slice(0, 10)}
                  /
                  {' '}
                  {rowContent.createdAt.slice(11, 16)}
                  {' '}
                  hrs
                </Grid>
              </Grid>

              <Divider component="div" />
              Summary:
              <br />
              {rowContent.summary}
              <Divider component="div" />
              Forecasted Hours Required for Project Completion:
              <br />
              {rowContent.projectedHours}
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
                id="Engineers Enrolled"
                options={usersList.map((option) => option)}
                defaultValue={usersList.map((option) => option)}
                readOnly
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    placeholder="Enrolled So Far"
                  />
                )}
              />
              )}
              <br />
              Skills Needed for this Project:
              <Autocomplete
                multiple
                id="Skills"
                options={skillsList.map((option) => option)}
                defaultValue={skillsList.map((option) => option)}
                readOnly
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                  />
                )}
              />
              <br />
              Enrolment Deadline:
              {' '}
              {rowContent.enrolmentDeadline.slice(0, 10)}
              /
              {' '}
              {rowContent.enrolmentDeadline.slice(11, 16)}
              {' '}
              hrs
              <br />
              Delivery Deadline:
              {' '}
              {rowContent.deliveryDeadline.slice(0, 10)}
              /
              {' '}
              {rowContent.deliveryDeadline.slice(11, 16)}
              {' '}
              hrs
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
