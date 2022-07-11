/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Slider,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import MuiInput from '@mui/material/Input';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { styled } from '@mui/material/styles';

const Input = styled(MuiInput)`
  width: 42px;
`;

// const options = ['Finance', 'Human Resources', 'Market Research', 'Industry'];
const skillOptions = [
  { value: 1, label: 'JavaScript' },
  { value: 2, label: 'React.js' },
  { value: 3, label: 'Python' },
];

export default function MUIReactHookForm() {
  const { control, handleSubmit } = useForm({
    reValidateMode: 'onBlur',
  });

  const handleOnSubmit = (evt) => {
    console.log(evt);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="name"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                fullWidth
                label="What is the project's name?"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="industryId"
            defaultValue=""
            render={({ field }) => (
              <>
                <Typography>
                  Client&apos;s Industry:
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
        <Grid item xs={12}>
          <Controller
            control={control}
            name="summary"
            defaultValue="This client needs a ..."
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-multiline-static"
                label="Summarize the project's requirements here:"
                multiline
                fullWidth
                rows={5}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>

          <Controller
            control={control}
            name="numberEngineers"
            defaultValue={1}
            render={({ field: { value, ...field } }) => (
              <>
                <Typography>
                  Number of Engineers required:
                </Typography>
                <Slider
                  {...field}
                  marks
                  max={10}
                  min={1}
                  step={1}
                  value={value}
                  valueLabelDisplay="auto"
                />

              </>

            )}
          />
        </Grid>
        <Grid item xs={12}>

          <Controller
            control={control}
            name="minimumSalary"
            defaultValue={30}
            render={({ field: { value, ...field } }) => (
              <>
                <Typography id="input-slider" gutterBottom>
                  Minimum Salary Paid per Hour:
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <AttachMoneyIcon />
                  </Grid>
                  <Grid item xs>
                    <Slider
                      {...field}
                      value={typeof value === 'number' ? value : 0}
                      // onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      {...field}
                      value={value}
                      size="small"
                      // onChange={handleInputChange}
                      // onBlur={handleBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />
                  </Grid>
                </Grid>

              </>

            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="projectSkills"
            defaultValue={[skillOptions[0]]}
            render={({ field: { ref, onChange, ...field } }) => (
              <Autocomplete
                multiple
                options={skillOptions}
                defaultValue={[skillOptions[0]]}
                getOptionLabel={(option) => option.label}
                onChange={(_, data) => onChange(data)}
                renderInput={(params) => (
                  <TextField
                    {...field}
                    {...params}
                    fullWidth
                    inputRef={ref}
                    variant="standard"
                    label="Skills Required:"
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
