/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import {
  IconButton,
  Box,
  Container,
  Avatar,
  Badge,
  TextField,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import Iconify from './Iconify.jsx';

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
      <IconButton onClick={handleClickOpen()}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {user.username}
        </DialogTitle>

        <DialogContent component="div" dividers={scroll === 'paper'}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ margin: 2 }}>
              <Badge
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={(
                  <Chip
                    icon={<accountMapping.icon />}
                    label={accountMapping.name}
                    color={accountMapping.color}
                    size="small"
                  />
            )}
              >
                <Avatar
                  alt="Nothing"
                  src={user.profilePhoto}
                  sx={{ width: 100, height: 100 }}
                />
              </Badge>
            </Box>
            <Container sx={{ padding: 1 }}>
              {user.skills.map((data) => (
                <Chip
                  key={data.id}
                  label={data.name}
                  color="warning"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Container>
            <div>
              <TextField
                id="name"
                label="Name"
                multiline
                defaultValue={user.name}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <TextField
                id="aboutMe"
                label="About Me"
                multiline
                fullWidth
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
                fullWidth
                defaultValue={user.experience}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <TextField
                id="email"
                label="My Email Address"
                multiline
                defaultValue={user.email}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <TextField
                id="location"
                label="My Location"
                multiline
                defaultValue={user.location}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <TextField
                id="minimumSalary"
                label="My Minimum Salary"
                multiline
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
                multiline
                defaultValue={user.portfolioUrl}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />

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
