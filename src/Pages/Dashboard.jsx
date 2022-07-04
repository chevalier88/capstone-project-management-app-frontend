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

const theme = createTheme();

export default function Dashboard() {
  const { user } = useContext(UserContext);

  const [currentProjects, setCurrentProjects] = useState([]);
  const [openProjects, setOpenProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);

  async function getCurrentProjects() {
    try {
      const results = await axios.get(`${BACKEND_URL}/projects/current/${user.id}`);
      const { data } = results;
      console.log(data);
      const currentArray = [];
      data.forEach((project) => currentArray.push(project));

      setCurrentProjects(currentArray);
    } catch (error) {
      console.log(error);
    }
  }

  async function getOpenProjects() {
    try {
      const results = await axios.get(`${BACKEND_URL}/projects/open`);
      const { data } = results;
      console.log(data);
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
          console.log('we have a repeat project already enrolled');
        } else {
          openArray.push(project);
        }
      });

      setOpenProjects(openArray);
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserCompletedProjects() {
    try {
      console.log(`user.id : ${user.id}`);
      const results = await axios.get(`${BACKEND_URL}/projects/completed/${user.id}`);
      const { data } = results;
      console.log(data);
      const completedArray = [];
      data.forEach((project) => completedArray.push(project));

      setCompletedProjects(completedArray);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllProjects() {
    try {
      const results = await axios.get(`${BACKEND_URL}/projects`);
      const { data } = results;
      console.log(data);

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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user.accountType === 'manager') {
      console.log(`user.account_type: ${user.accountType}`);
      getAllProjects();
    } else {
      getCurrentProjects();
      getOpenProjects();
      getUserCompletedProjects();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
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
          <br />
          <Grid container spacing={4}>
            {user.accountType === 'engineer' && currentProjects.map((row) => (
              <DashboardGridRow row={row.project} />
            ))}
            {user.accountType === 'manager' && currentProjects.map((row) => (
              <DashboardGridRow row={row} />
            ))}
          </Grid>
        </Container>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h3">
            Available
          </Typography>
          <Divider />

          <Grid container spacing={4}>
            {openProjects.map((row) => (
              <DashboardGridRow row={row} />
            ))}
          </Grid>
        </Container>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h3">
            Completed
          </Typography>
          <Divider />
          <br />
          <Grid container spacing={4}>
            {user.accountType === 'engineer' && completedProjects.map((row) => (
              <DashboardGridRow row={row.project} />
            ))}
            {user.accountType === 'manager' && completedProjects.map((row) => (
              <DashboardGridRow row={row} />
            ))}
          </Grid>
        </Container>

      </main>
    </ThemeProvider>

  );
}
