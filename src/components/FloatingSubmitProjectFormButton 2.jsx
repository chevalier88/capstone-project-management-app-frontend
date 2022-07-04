/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Form from 'react-bootstrap/Form';

import {
  Fab,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function FloatingSubmitProjectFormButton() {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('submitting form...');

    const submittedProject = {
      name: projectName,
    };
    console.log('printing currently submitted project...');
    console.log(submittedProject);

    // const response = await axios.post(`${BACKEND_URL}/trip`, submittedProject);

    // console.log(response.data);
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Add new Project
      </Button> */}
      {/* <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab> */}
      <Tooltip title="Start A New Project">
        <Fab
          component="div"
          onClick={handleClickOpen}
          variant="circular"
          color="primary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            bottom: '25%',
            position: 'fixed',
            right: 100,
          }}
        >
          {/* <AnimateButton type="rotate"> */}
          <IconButton color="inherit" size="large" disableRipple>
            <AddIcon />
          </IconButton>
          {/* </AnimateButton> */}
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit New Trip</DialogTitle>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <DialogContent>
            <DialogContentText>
              What is the name of your project?
            </DialogContentText>
            <Form.Group controlId="projectName">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Trip Name"
                type="name"
                value={projectName}
                fullWidth
                variant="standard"
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Form.Group>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>Submit</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
}
