// import * as React from 'react';
import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';
import BACKEND_URL from '../supportFunctions.js';
import { UserContext } from '../components/UserContext.jsx';

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
      console.log('currentProjects data:');
      console.log(data);
      console.log(Object.keys(data[0]));
      const newArray = [];
      data.forEach((project) => newArray.push(project));

      setCurrentProjects(newArray);
    } catch (error) {
      console.log(error);
    }
  }

  async function getOpenProjects() {
    try {
      const results = await axios.get(`${BACKEND_URL}/projects/open`);
      const { data } = results;
      console.log(data);
      console.log(Object.keys(data[0]));
      const newArray = [];
      data.forEach((project) => newArray.push(project));

      setOpenProjects(newArray);
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
      console.log(Object.keys(data[0]));
      const newArray = [];
      data.forEach((project) => newArray.push(project));

      setCompletedProjects(newArray);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrentProjects();
    getOpenProjects();
    getUserCompletedProjects();
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
          {/* End hero unit */}
          <h3> Current Projects </h3>
          <Grid container spacing={4}>
            {currentProjects.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Typography gutterBottom variant="h4" component="h2">
                    {card.project.name}
                  </Typography>
                  <Typography variant="h5">
                    {card.project.user_projects.length}
                    /
                    {card.project.noEngineersRequired}
                    {' '}
                    Engineers Enrolled
                  </Typography>
                  <Typography>
                    Stage:
                    {' '}
                    {card.project.stage}
                    <br />
                    Delivery Deadline:
                    {' '}
                    {card.project.deliveryDeadline}
                  </Typography>
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '10.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>

                    <Typography>
                      <br />
                      {card.project.summary}
                    </Typography>

                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container sx={{ py: 8 }} maxWidth="md">
          <h3> Available Open Projects </h3>
          <Grid container spacing={4}>
            {openProjects.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  {' '}
                  <Typography gutterBottom variant="h4" component="h2">
                    {card.name}
                  </Typography>
                  <Typography variant="h5">
                    {card.user_projects.length}
                    /
                    {card.noEngineersRequired}
                    {' '}
                    Engineers Enrolled
                  </Typography>
                  <Typography>
                    Stage:
                    {' '}
                    {card.stage}
                    <br />
                    Enrolment Deadline:
                    {' '}
                    {card.enrolmentDeadline}
                  </Typography>
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '10.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>

                    <Typography>
                      {' '}
                      <br />
                      {card.summary}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container sx={{ py: 8 }} maxWidth="md">
          <h3> Completed Projects </h3>
          <Grid container spacing={4}>
            {completedProjects.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '10.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.project.name}
                    </Typography>
                    <Typography>
                      <br />
                      Completion Deadline:
                      {' '}
                      {card.project.deliveryDeadline}
                    </Typography>
                    <Typography>
                      {' '}
                      <br />
                      {card.project.summary}
                    </Typography>
                    <Typography>
                      <br />
                      Industry:
                      {' '}
                      {card.project.industry.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>

  );
}
