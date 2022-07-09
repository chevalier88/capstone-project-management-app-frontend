/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
  const [summary, setSummary] = useState([]);
  const [industry, setIndustry] = useState('');
  // const [engineerNumbers, setEngineerNumbers] = useState(0);
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
      summary,
      industryId: industry,

    };
    console.log('printing currently submitted project...');
    console.log(submittedProject);

    // const response = await axios.post(`${BACKEND_URL}/trip`, submittedProject);

    // console.log(response.data);
  }

  return (
    <div>

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
        <DialogTitle>Submit New Project</DialogTitle>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <DialogContent>
            <Form.Group size="sm-3" controlId="projectName">
              <br />
              <Form.Label>What is the name of this project?</Form.Label>
              <Form.Control
                autoFocus
                type="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="summary">
              <br />
              <Form.Label>
                Please summarize the scope below:
              </Form.Label>
              <Form.Control
                autoFocus
                as="textarea"
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="industryId">
              <br />
              <Form.Label>What industry is the client from?</Form.Label>
              <Form.Control
                as="select"
                value={industry}
                placeholder="select one"
                onChange={(e) => {
                  console.log('e.target.value', e.target.value);
                  setIndustry(e.target.value);
                }}
              >
                <option value="1">Airline</option>
                <option value="2">Finance</option>
                <option value="3">Market Research</option>
                <option value="4">Human Resources</option>
                <option value="5">Human Resources</option>
              </Form.Control>
            </Form.Group>
            {/* <Form.Group controlId="engineerNumbers">
              <br />
              <Form.Label>How many engineers are required?</Form.Label>
              <Form.Control
                type="engineerNumbers"
                value={engineerNumbers}
                onChange={(e) => setEngineerNumbers(e.target.value)}
                as={(
                  <Slider
                    aria-label="engineerNumbers"
                    defaultValue={1}
                    valueLabelDisplay="on"
                    step={1}
                    marks
                    min={1}
                    max={10}
                  />
)}
              />
            </Form.Group> */}
            {/* <Form.Group controlId="entitiesStatus">
              <br />
              <Form.Label>Region Requested?</Form.Label>
              <Form.Control
                as="select"
                value={entitiesStatus}
                onChange={(e) => {
                  console.log('e.target.value', e.target.value);
                  setEntitiesStatus(e.target.value);
                }}
              >
                <option value="All">Yes</option>
                <option value="Some">In some locations only, but not all</option>
                <option value="None">No</option>
              </Form.Control>
            </Form.Group> */}

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
