/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  Slider,
  Autocomplete,
} from '@mui/material';
import BACKEND_URL from '../supportFunctions.js';
import { UserContext } from '../components/UserContext.jsx';

export default function ProfileEdit() {
  // getting user data from useContext in UserContext
  const { user } = useContext(UserContext);
  console.log('user', user);

  // .............STATES...............
  const [skills, setSkills] = useState([]);

  // .......... HELPER FUNCTIONS .................

  const navigate = useNavigate();

  // get all skills to populate dropdown
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
  const { control, handleSubmit } = useForm({
    reValidateMode: 'onBlur',
  });

  // function to run when submitting form
  async function handleOnSubmit(event) {
    console.log('updating user data');
    console.log(event);
    try {
      const updateUserData = await axios.post(`${BACKEND_URL}/users/edit/${user.id}`, event);
      console.log(updateUserData);
      // redirect to profile page
      navigate('../profile', { replace: true });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

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

    const userSkills = [];

    user.skills.forEach((element) => {
      const skillToAdd = skills.find((x) => x.id === element.id);
      console.log('skillToAdd', skillToAdd);
      userSkills.push(skillToAdd);
    });
    console.log('userSkills', userSkills);

    return (
      <Box sx={{ margin: 7 }}>
        <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4">
                Edit your profile
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Controller
                control={control}
                name="name"
                defaultValue={user.name}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="My Name"
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="aboutMe"
                defaultValue={user.aboutMe}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      multiline
                      label="About Me"
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="experience"
                defaultValue={user.experience}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      multiline
                      label="My Experience"
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                control={control}
                name="email"
                defaultValue={user.email}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="My Email"
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                control={control}
                name="location"
                defaultValue={user.location}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="My Location"
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="industryId"
                defaultValue={user.industryId}
                render={({ field }) => (
                  <>
                    <Typography>
                      My Industry:
                    </Typography>
                    <Select
                      {...field}
                      fullWidth
                    >
                      <MenuItem value="1">Airline</MenuItem>
                      <MenuItem value="2">Finance</MenuItem>
                      <MenuItem value="3">Market Research</MenuItem>
                      <MenuItem value="4">Human Resources</MenuItem>
                      <MenuItem value="5">Technology</MenuItem>
                    </Select>
                  </>

                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                control={control}
                name="portfolioUrl"
                defaultValue={user.portfolioUrl}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      multiline
                      label="My Portfolio"
                    />
                  </>
                )}
              />
            </Grid>
            {' '}
            <Grid item xs={12}>
              <Controller
                control={control}
                name="minimumSalary"
                defaultValue={Number(user.minimumSalary)}
                render={({ field: { value, ...field } }) => (
                  <>
                    <Typography id="input-slider" gutterBottom>
                      My Minimum Salary
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Typography
                          variant="h5"
                          {...field}
                        >
                          {' '}
                          $
                          {' '}
                          {value}
                        </Typography>
                      </Grid>
                      <br />
                      <Grid item xs>
                        <Slider
                          {...field}
                          min={0}
                          max={200}
                          step={1}
                          value={value}
                          aria-labelledby="input-slider"
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="skills"
                render={({ field: { ref, onChange, ...field } }) => (
                  <>
                    <Typography>
                      My Skills
                    </Typography>
                    <Autocomplete
                      multiple
                      options={skills}
                      // inputValue={[skills[4].name]}
                      getOptionLabel={(option) => option.name}
                      onChange={(_, data) => onChange(data)}
                      renderInput={(params) => (
                        <TextField
                          {...field}
                          {...params}
                          fullWidth
                          inputRef={ref}
                          variant="outlined"
                        />
                      )}
                    />
                  </>
                )}
              />
            </Grid>
          </Grid>
          <br />
          <Button sx={{ margin: 2 }} variant="contained" disableElevation color="success" type="submit">
            Save Changes
          </Button>
        </Box>
      </Box>
    );
  }
}
