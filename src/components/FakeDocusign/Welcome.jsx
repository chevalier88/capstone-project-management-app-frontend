import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Box, Button, Container, Heading,
} from 'gestalt';

import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import SignList from './Lists/SignList.jsx';
import SignedList from './Lists/SignedList.jsx';
import { resetDocToView } from './ViewDocument/ViewDocumentSlice.js';
import { resetDocToSign } from './SignDocument/SignDocumentSlice.js';
import 'gestalt/dist/gestalt.css';
import { UserContext } from '../UserContext.jsx';

function Welcome() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetDocToView());
    dispatch(resetDocToSign());
  }, [dispatch]);

  return (

    <div>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <CssBaseline />
          <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
            <Typography variant="h2" component="h1" gutterBottom>
              Get Your Contracts Signed
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              Manage signatures via
              {' '}
              {user.email}
            </Typography>
          </Container>
        </Box>
        <Box padding={3}>
          <Heading size="md">Sign Documents</Heading>
        </Box>
        <Box padding={3}>
          <SignList />
        </Box>
        <Box padding={3}>
          <Heading size="md">Prepare Document</Heading>
        </Box>
        <Box padding={2}>
          <Button
            onClick={() => {
              navigate('/assignUsers');
            }}
            text="Prepare Document for Signing"
            color="blue"
            inline
          />
        </Box>
        <Box padding={3}>
          <Heading size="md">Review Signed Documents</Heading>
        </Box>
        <Box padding={3}>
          <SignedList />
        </Box>
      </Container>
    </div>
  );
}
export default Welcome;
