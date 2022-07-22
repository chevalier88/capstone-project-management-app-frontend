/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {
  useState, useRef, useEffect,
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

// import ButtonGroup from '@mui/material/ButtonGroup';

// import { UserContext } from './UserContext.jsx';
import Typography from './Home/Typography.jsx';
import BACKEND_URL from '../supportFunctions.js';

import CircularIndeterminate from './CircularIndeterminate.jsx';
import UserMoreMenu from './UserMoreMenu.jsx';
import HorizontalStepper from './HorizontalStepper.jsx';

export default function SingleProjectModal({ rowContent, setJustSubmitted }) {
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
    setTimeout(getUsersAndSkillsForThisProject, 1500);
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
        maxWidth="md"
        fullWidth
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid
            container
            spacing={1}
            alignItems="center"
          >
            <Grid item xs={11}>
              <Typography component="span" variant="h3">
                {' '}
                {rowContent.name}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {!showLoading && <UserMoreMenu rowContent={rowContent} usersList={usersList} setJustSubmitted={setJustSubmitted} />}
            </Grid>
          </Grid>

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
              <Grid>
                <HorizontalStepper stage={rowContent.stage} projectId={rowContent.id} setJustSubmitted={setJustSubmitted} />
              </Grid>
              <Divider />
              <Grid
                container
                spacing={2}
              >
                <Grid item xs={1}>
                  ID:
                  {' '}
                  {rowContent.id}
                </Grid>
                <Grid item xs={2}>
                  Industry:
                  {' '}
                  <br />
                  {rowContent.industry.name}
                </Grid>
                <Grid item xs={3}>
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

          <Button onClick={handleClose}>Close</Button>

        </DialogActions>
      </Dialog>
    </>
  );
}
