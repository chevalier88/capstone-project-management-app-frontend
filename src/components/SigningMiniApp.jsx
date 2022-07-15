import React from 'react';
import { Router } from '@reach/router';

import { Provider } from 'react-redux';
import AssignUsers from './AssignUsers.js';
import Preparation from './Preparation.js';
import Sign from './Sign.js';
import View from './View.js';

import Welcome from './Welcome.js';
import store from './Store/store.js';

// import './App.css';

const SigningMiniApp = () => (
  <Provider store={store}>
    <Router>
      <Welcome path="/" />
      <AssignUsers path="/assignUsers" />
      <Preparation path="/prepareDocument" />
      <Sign path="/signDocument" />
      <View path="/viewDocument" />
    </Router>
  </Provider>
);

export default SigningMiniApp;
