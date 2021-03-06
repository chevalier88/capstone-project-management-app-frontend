/* eslint-disable max-len */
// import * as React from 'react';
import React, { useState, useEffect, useContext } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

import BACKEND_URL from '../supportFunctions.js';
import { UserContext } from '../components/UserContext.jsx';
import DashboardGridRow from '../components/DashboardGridRow.jsx';
import ProjectSubmitFormButton from '../components/ProjectSubmitFormButton.jsx';

import LinearIndeterminate from '../components/LinearIndeterminate.jsx';

const theme = createTheme();

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [showLoading, setShowLoading] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [openProjects, setOpenProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);

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
    } else {
      setTimeout(getCurrentProjects,
        1500);
      setTimeout(getOpenProjects,
        1500);
      setTimeout(getUserCompletedProjects,
        1500);
      setJustSubmitted(false);
    }
  }, [justSubmitted]);

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {user.accountType === 'manager' && <ProjectSubmitFormButton setJustSubmitted={setJustSubmitted} />}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Dashboard
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              View all Current, Available and Completed Projects
            </Typography>
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h3">
            Current
          </Typography>
          <Divider />
          {showLoading ? (
            <LinearIndeterminate showLoading={showLoading} />
          ) : (
            <Grid container spacing={4}>
              {user.accountType === 'engineer' && currentProjects.map((row) => (
                <DashboardGridRow key={row.project.id} row={row.project} setJustSubmitted={setJustSubmitted} />
              ))}
              {user.accountType === 'manager' && currentProjects.map((row) => (
                <DashboardGridRow key={row.id} row={row} setJustSubmitted={setJustSubmitted} />
              ))}
            </Grid>
          )}

        </Container>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h3">
            Available
          </Typography>
          <Divider />
          {showLoading ? (
            <LinearIndeterminate showLoading={showLoading} />
          ) : (
            <Grid container spacing={4}>
              {openProjects.map((row) => (
                <DashboardGridRow key={row.id} row={row} setJustSubmitted={setJustSubmitted} />
              ))}
            </Grid>
          )}
        </Container>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h3">
            Completed
          </Typography>
          <Divider />
          {showLoading ? (
            <LinearIndeterminate showLoading={showLoading} />
          ) : (
            <Grid container spacing={4}>
              {user.accountType === 'engineer' && completedProjects.map((row) => (
                <DashboardGridRow key={row.project.id} row={row.project} setJustSubmitted={setJustSubmitted} />
              ))}
              {user.accountType === 'manager' && completedProjects.map((row) => (
                <DashboardGridRow key={row.id} row={row} setJustSubmitted={setJustSubmitted} />
              ))}
            </Grid>
          )}
        </Container>

      </main>
    </ThemeProvider>

  );
}
