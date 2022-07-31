/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {
  useState, useRef, useEffect,
} from 'react';
import axios from 'axios';
import {
  Chip,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  Container,
  Box,
} from '@mui/material';
import BACKEND_URL from '../supportFunctions.js';
import Iconify from './Iconify.jsx';

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
      <IconButton onClick={handleClickOpen()}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Dialog
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
              <Container maxWidth="md" alignItems="center">
                {' '}

                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                  maxWidth="sm"
                >
                  <Grid
                    container
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <HorizontalStepper stage={rowContent.stage} projectId={rowContent.id} setJustSubmitted={setJustSubmitted} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h3" textAlign="center" color="green.main">
                        {' '}
                        $
                        {rowContent.minimumSalary}
                        /hr
                      </Typography>
                      <Typography variant="h4" textAlign="center" color="primary">
                        @
                        {' '}
                        {rowContent.projectedHours}
                        {' '}
                        projected hours, per engineer
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {skillsList.map((data) => (
                        <Chip
                          key={data}
                          label={data}
                          color="warning"
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Grid>
                    <Grid item xs={1}>
                      <TextField
                        id="project-id"
                        label="ID"
                        fullWidth
                        defaultValue={rowContent.id}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="industry"
                        label="Industry"
                        fullWidth
                        defaultValue={rowContent.industry.name}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="created-date"
                        label="Created Date"
                        fullWidth
                        defaultValue={rowContent.createdAt.slice(0, 10)}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="summary"
                        label="Project Summary"
                        fullWidth
                        multiline
                        defaultValue={rowContent.summary}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="standard"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="span" textAlign="center" color="primary">
                        Number of Engineers Enrolled/Required:
                        {' '}
                        {rowContent.user_projects.length}
                        /
                        {rowContent.noEngineersRequired}
                      </Typography>

                    </Grid>
                    <Grid item xs={12}>
                      {rowContent.user_projects.length !== 0 && (
                        usersList.map((data) => (
                          <Chip
                            key={data}
                            label={data}
                            color="secondary"
                            variant="outlined"
                            size="small"
                          />
                        )))}
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="span" textAlign="center" color="primary">
                        Enrolment Deadline:
                        {' '}
                        {rowContent.enrolmentDeadline.slice(0, 10)}
                        /
                        {' '}
                        {rowContent.enrolmentDeadline.slice(11, 16)}
                        {' '}
                        hrs
                      </Typography>

                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="span" textAlign="center" color="error">

                        Delivery Deadline:
                        {' '}

                        {rowContent.deliveryDeadline.slice(0, 10)}
                        /
                        {' '}
                        {rowContent.deliveryDeadline.slice(11, 16)}
                        {' '}
                        hrs
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </DialogContentText>
          </DialogContent>

        )}
        <DialogActions alignItems="center">

          <Button onClick={handleClose}>Close</Button>

        </DialogActions>
      </Dialog>
    </>
  );
}
