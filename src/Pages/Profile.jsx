/* eslint-disable max-len */
import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import HandymanTwoToneIcon from '@mui/icons-material/HandymanTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext.jsx';

export default function Profile() {
  // getting user data from useContext in UserContext
  const { user } = useContext(UserContext);
  console.log('user', user);

  // .......... HELPER FUNCTIONS .................

  const navigate = useNavigate();

  const navigateEdit = () => {
    navigate('edit');
  };

  // return message when user is not logged in
  if (user.length === 0) {
    return (
      <div id="page-container">
        <h1>
          You are logged out! Please login to view your Profile.
        </h1>
      </div>
    );
  }

  // run below when user is logged in
  if (user.length !== 0) {
    //
    // role and account mapping
    let accountMapping = {};
    if (user.accountType === 'engineer') {
      accountMapping = { name: 'Software Engineer', icon: HandymanTwoToneIcon, color: 'secondary' };
    }
    if (user.accountType === 'manager') {
      accountMapping = { name: 'Manager', icon: ManageAccountsTwoToneIcon, color: 'warning' };
    }
    if (user.accountType === 'client') {
      accountMapping = { name: 'Client', icon: WorkTwoToneIcon, color: 'info' };
    }

    return (
      <Box sx={{ margin: 3 }}>
        <Box sx={{ margin: 2 }}>
          <h1>
            Hello
            {' '}
            {user.username}
          </h1>
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
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="name"
              label="My Name"
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
            <TextField
              id="industry"
              label="My Industry"
              multiline
              defaultValue={user.industry.name}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
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
            <Container sx={{ padding: 1 }}>
              My Skills:
              {' '}
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
          </div>
          <div>
            <br />
            <Button sx={{ margin: 2 }} variant="contained" color="success" disableElevation onClick={navigateEdit}>
              Edit Profile
            </Button>
          </div>
        </Box>
      </Box>
    );
  }
}
