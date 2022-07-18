import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Grid,
  Button, Container, Typography,
} from '@mui/material';
import SignList from './Lists/SignList.jsx';
import SignedList from './Lists/SignedList.jsx';
import { resetDocToView } from './ViewDocument/ViewDocumentSlice.js';
import { resetDocToSign } from './SignDocument/SignDocumentSlice.js';
import 'gestalt/dist/gestalt.css';

function Welcome() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetDocToView());
    dispatch(resetDocToSign());
  }, [dispatch]);

  return (
    <Container>
      <Grid item xs={12}>
        <Typography size="md">Sign Documents</Typography>
      </Grid>
      <Grid item xs={12}>
        <SignList />
      </Grid>
      <Grid item xs={12}>
        <Typography size="md">Prepare Document</Typography>
      </Grid>
      <Grid item xs={12} padding={2}>
        <Button
          onClick={() => {
            navigate('/assignUsers');
          }}
          text="Prepare Document for Signing"
          color="blue"
          inline
        />
      </Grid>
      <Grid item xs={12} padding={3}>
        <Typography size="md">Review Signed Documents</Typography>
      </Grid>
      <Grid item xs={12} padding={3}>
        <SignedList />
      </Grid>
    </Container>
  );
}
export default Welcome;
