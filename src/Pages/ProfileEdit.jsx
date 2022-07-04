/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import BACKEND_URL from '../supportFunctions.js';
import { UserContext } from '../components/UserContext.jsx';

export default function ProfileEdit() {
  // getting user data from useContext in UserContext
  const { user } = useContext(UserContext);
  console.log('user', user);

  // .............STATES...............
  const [skills, setSkills] = useState([]);
  const [selected, setSelected] = useState({});

  // .......... HELPER FUNCTIONS .................
  async function getSkills() {
    try {
      const results = await axios.get(`${BACKEND_URL}/skills`);
      const { data } = results;
      console.log(data);
      setSkills(data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleChange = (event) => {
    setSelected({
      ...selected,
      [event.target.name]: event.target.checked,
    });
  };

  // return message when user is not logged in
  if (user.length === 0) {
    return (
      <div id="page-container">
        <h1>
          Please login first.
        </h1>
      </div>
    );
  }

  // run below when user is logged in
  if (user.length !== 0) {
    // get all the skills
    useEffect(() => { getSkills(); }, []);

    return (
      <div id="">
        <h1>
          This is the Edit Page
        </h1>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="name"
              label="My Name"
              defaultValue={user.name}
              variant="standard"
            />
            <TextField
              id="email"
              label="My Email Address"
              defaultValue={user.email}
              variant="standard"
            />
            <TextField
              id="location"
              label="My Location"
              defaultValue={user.location}
              variant="standard"
            />
            <TextField
              id="minimumSalary"
              label="My Minimum Salary"
              defaultValue={user.minimumSalary}
              variant="standard"
            />
            <TextField
              id="industry"
              label="My Industry"
              defaultValue={user.industry.name}
              variant="standard"
            />
            <TextField
              id="portfolioUrl"
              label="My Profolio link"
              defaultValue={user.portfolioUrl}
              variant="standard"
            />
            <TextField
              id="aboutMe"
              label="About Me"
              multiline
              rows={4}
              defaultValue={user.aboutMe}
              variant="standard"
            />
            <TextField
              id="experience"
              label="My Experience"
              multiline
              rows={4}
              defaultValue={user.experience}
              variant="standard"
            />
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">My Skills</FormLabel>
              <FormGroup>

                {skills.map((data) => (
                  <FormControlLabel
                    key={data.id}
                    control={
                      <Checkbox onChange={handleChange} name={data.name} />
}
                    label={data.name}
                  />
                ))}
              </FormGroup>
              <FormHelperText>Select all that apply</FormHelperText>
            </FormControl>
          </div>
          <div>
            <br />
            <Button variant="contained" disableElevation color="success">
              Save Changes
            </Button>
          </div>
        </Box>
      </div>
    );
  }
}
