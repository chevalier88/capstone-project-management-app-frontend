/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function ProfileModalForSearch({ user }) {
  const [open, setOpen] = useState(false);
  const [scroll] = useState('paper');

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
  // role and account mapping
  const accountMapping = {

    name: 'Software Engineer',
    icon: HandymanTwoToneIcon,
    color: 'secondary',
  };

  return (
    <>
      <Button onClick={handleClickOpen()}>{user.name}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {user.username}
          <Chip
            icon={<accountMapping.icon />}
            label={accountMapping.name}
            color={accountMapping.color}
          />
        </DialogTitle>

        <DialogContent component="div" dividers={scroll === 'paper'}>
          {/* <DialogContentText
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
            {JSON.stringify(rowContent)}
            <Divider component="div" />
            <RandomLoremIpsum />

          </DialogContentText> */}
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
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <TextField
                id="email"
                label="My Email Address"
                defaultValue={user.email}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <TextField
                id="location"
                label="My Location"
                defaultValue={user.location}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <TextField
                id="minimumSalary"
                label="My Minimum Salary"
                defaultValue={user.minimumSalary}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              {/* <TextField
                id="industry"
                label="My Industry"
                defaultValue={user.industry.name}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              /> */}
              <TextField
                id="portfolioUrl"
                label="My Profolio link"
                defaultValue={user.portfolioUrl}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <TextField
                id="aboutMe"
                label="About Me"
                multiline
                rows={4}
                defaultValue={user.aboutMe}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <TextField
                id="experience"
                label="My Experience"
                multiline
                rows={4}
                defaultValue={user.experience}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <Container>
                <div>
                  Skills:
                  {' '}
                  {user.skills.map((data) => (
                    <Chip
                      key={data.id}
                      label={data.name}
                      color="primary"
                    />
                  ))}
                </div>
              </Container>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>

        </DialogActions>
      </Dialog>
    </>

  );
}
