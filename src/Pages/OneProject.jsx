import React from 'react';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function OneProject() {
  // Planning

  // need to write API to fetch data of 1 project select from backend
  // After we get the data, then we can display the info of project selected here
  // Write Function to register for project into backend

  // const { user } = useContext(UserContext);
  // const [SelectedProject, setSelectedProject] = useState([]);

  // API CALL
  // async function getSelectedProject() {
  //   try {
  //     const results = await axios.get(`${BACKEND_URL}/projects/${project.id}`);
  //     const { data } = results;
  //     const currentArray = [];
  //     data.forEach((project) => currentArray.push(project));

  //     setSelectedProject(currentArray);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // Write Function to register for project into backend
  // has to be a post request
  // const addProject () {}

  // dummy data
  const projectSelected = 1;

  return (
    <>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          One Project
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          You are Currently Viewing:
          {' '}
          {projectSelected}
        </Typography>
      </Container>

      <h1>One Project</h1>
      <br />
      <h3>Information on the project</h3>
      <br />
      <Button>Click to register for this project</Button>
      <h3>Kanban Board here</h3>
    </>
  );
}
