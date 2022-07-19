/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { UserContext } from './UserContext.jsx';
import SingleProjectKanbanModal from './SingleProjectKanbanModal.jsx';
import RandomLoremIpsum from './RandomLoremIpsum.jsx';

export default function SingleProjectModal({ rowContent }) {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [scroll] = useState('paper');

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Add Controller here
  const addProject = () => {
    console.log('USER ID:', user.id, 'ADDED PROJECT', rowContent.id);
    setOpen(false);
  };

  console.log('user_projects', rowContent.user_projects.length);
  console.log('user_engineers required', rowContent.noEngineersRequired);
  console.log('user id ', user.id);

  const checkIfProjectFull = () => {
    const engineersEnrolled = Number(rowContent.user_projects.length);
    const engineersRequired = Number(rowContent.noEngineersRequired);
    if ((engineersEnrolled / engineersRequired) === 1) return true;
    return false;
  };

  const checkDateValid = () => {
    const date = (rowContent.deliveryDeadline.slice(0, 10)).value;
    const varDate = new Date(date); // dd-mm-YYYY
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // check if the project deadline date is bigger than today, if yes, TRUE
    if (varDate >= today) {
      console.log('checkDateValid!');
      return true;
    }
    return false;
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const projectId = rowContent.id;
  console.log(projectId);
  const openSingleProject = `${/projects/}${projectId}`;

  return (
    <>
      <Button onClick={handleClickOpen()}>View</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          PLACEHOLDER FOR ONE PROJECT
          {' '}
          {rowContent.name}
        </DialogTitle>

        <DialogContent component="div" dividers={scroll === 'paper'}>
          <DialogContentText
            component="div"
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            Project ID:
            {' '}
            {rowContent.id}
            <Divider component="div" />
            {rowContent.summary}
            <Divider component="div" />

            <br />
            Number of Engineers Required:
            {' '}
            {rowContent.noEngineersRequired}
            <br />
            Enrolment Deadline:
            {rowContent.enrolmentDeadline.slice(0, 10)}
            <br />
            Time:
            {rowContent.enrolmentDeadline.slice(11, 16)}
            <br />
            Salary Paid:
            {rowContent.minimumSalary}
            /hr
            <br />
            {' '}
            <br />
            Delivery Deadline:
            {rowContent.deliveryDeadline.slice(0, 10)}
            <br />
            Time:
            {rowContent.deliveryDeadline.slice(11, 16)}
            {' '}
            <br />
            {' '}
            <br />
            {/* {JSON.stringify(rowContent)} */}
            <Divider component="div" />
            <RandomLoremIpsum />

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {' '}
          <a href={openSingleProject}>
            {' '}
            <Button>Open Project</Button>
            {' '}
          </a>
          {rowContent.stage === 'sourcing' && !checkDateValid() && !checkIfProjectFull() && <Button onClick={(e) => addProject(e)}>Join Project</Button>}
          {rowContent.stage === 'in-progress' && <SingleProjectKanbanModal row={rowContent} />}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
