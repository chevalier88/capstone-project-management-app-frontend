/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
// import * as React from 'react';
import React, {
  useState, useEffect, useContext, forwardRef,
} from 'react';

import {
  Grid,
  Box,
  Typography,
  Container,
  Divider,
  Snackbar,
} from '@mui/material';

import MuiAlert from '@mui/material/Alert';

import axios from 'axios';
// import Page from '../components/Page.jsx';
import BACKEND_URL from '../supportFunctions.js';
import { UserContext } from '../components/UserContext.jsx';
import ProjectSubmitFormButton from '../components/ProjectSubmitFormButton.jsx';
import LinearIndeterminate from '../components/LinearIndeterminate.jsx';
import DashboardTable from '../components/DashboardTable.jsx';
import AppWidgetSummary from '../components/AppWidgetSummary.jsx';

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [showLoading, setShowLoading] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [openProjects, setOpenProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const Alert = forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  async function getCurrentProjects() {
    try {
      const results = await axios.get(`${BACKEND_URL}/projects/current/${user.id}`);
      const { data } = results;
      const currentArray = [];
      data.forEach((project) => currentArray.push(project));

      setCurrentProjects(currentArray);
      setShowLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getOpenProjects() {
    try {
      const results = await axios.get(`${BACKEND_URL}/projects/open`);
      const { data } = results;
      const openArray = [];

      /*
      Available projects that the user has already enrolled in but have less than
      the required number of engineers will be in a "Current" project for the user
      that is also "Available". To avoid duplicate project cards,
      we filter out projects that contain the logged in user's involvement from
      the "Available" projects row. We use the .some method to achieve this.
      https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
       */

      data.forEach((project) => {
        if (project.user_projects.some((userInProject) => userInProject.userId === user.id)) {
          console.log('we have a repeat project already enrolled. skipping push of this project to openArray...');
        } else {
          openArray.push(project);
        }
      });

      setOpenProjects(openArray);
      setShowLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserCompletedProjects() {
    try {
      const results = await axios.get(`${BACKEND_URL}/projects/completed/${user.id}`);
      const { data } = results;
      const completedArray = [];
      data.forEach((project) => completedArray.push(project));

      setCompletedProjects(completedArray);
      setShowLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllProjects() {
    // consider filtering from backend and returning 3 arrays instead
    try {
      const results = await axios.get(`${BACKEND_URL}/projects`);
      const { data } = results;

      const currentArray = [];
      const openArray = [];
      const completedArray = [];

      data.forEach((project) => {
        if (project.stage === 'in-progress' || project.stage === 'client-review') {
          currentArray.push(project);
        } else if (project.stage === 'payment-pending' || project.stage === 'completed') {
          completedArray.push(project);
        } else {
          openArray.push(project);
        }
      });

      setCurrentProjects(currentArray);
      setOpenProjects(openArray);
      setCompletedProjects(completedArray);

      setShowLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setShowLoading(true);
    if (user.accountType === 'manager') {
      console.log(user);
      setTimeout(getAllProjects,
        1500);
      setJustSubmitted(false);
      setSnackbarOpen(true);
    } else {
      setTimeout(getCurrentProjects,
        1500);
      setTimeout(getOpenProjects,
        1500);
      setTimeout(getUserCompletedProjects,
        1500);
      setJustSubmitted(false);
      setSnackbarOpen(true);
    }
  }, [justSubmitted]);

  console.log('currentProjects', currentProjects);
  console.log('openProjects', openProjects);
  console.log('completedProjects', completedProjects);

  if (user.length === 0) {
    return (
      <div id="page-container">
        <h1>
          You are logged out! Please login to view more pages.
        </h1>
      </div>
    );
  }

  return (
    <>
      <main>
        {user.accountType === 'manager' && <ProjectSubmitFormButton setJustSubmitted={setJustSubmitted} />}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 4,
            pb: 1,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Dashboard
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              View all your current, available and completed projects
            </Typography>
          </Container>
        </Box>

        <Container sx={{ py: 2 }} maxWidth="md">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4} md={4}>
              <AppWidgetSummary title="Weekly Sales" total={714000} icon="ant-design:android-filled" />
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <AppWidgetSummary title="New Users" total={1352831} color="info" icon="ant-design:apple-filled" />
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon="ant-design:windows-filled" />
            </Grid>
          </Grid>
        </Container>

        <Container sx={{ py: 2 }} maxWidth="md">
          <Typography variant="h5">
            Current
          </Typography>
          <Divider />
          {showLoading ? (
            <LinearIndeterminate showLoading={showLoading} />
          ) : (
            <Grid>
              <DashboardTable type="current" user={user} data={currentProjects} setJustSubmitted={setJustSubmitted} />
            </Grid>
          )}
        </Container>

        <Container sx={{ py: 2 }} maxWidth="md">
          <Typography variant="h5">
            Available
          </Typography>
          <Divider />
          {showLoading ? (
            <LinearIndeterminate showLoading={showLoading} />
          ) : (
            <Grid>
              <DashboardTable type="available" user={user} data={openProjects} setJustSubmitted={setJustSubmitted} />
            </Grid>
          )}
        </Container>

        <Container sx={{ py: 2 }} maxWidth="md">
          <Typography variant="h5">
            Completed
          </Typography>
          <Divider />
          {showLoading ? (
            <LinearIndeterminate showLoading={showLoading} />
          ) : (
            <Grid>
              <DashboardTable type="completed" user={user} data={completedProjects} setJustSubmitted={setJustSubmitted} />
            </Grid>
          )}
        </Container>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackBarClose}>
          <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
            Dashboard refreshing!
          </Alert>
        </Snackbar>
      </main>

    </>
  );
}
