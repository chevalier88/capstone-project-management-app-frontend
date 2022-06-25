import './App.css';

import React, { useState } from 'react';
import axios from 'axios';

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

export default function App() {
  return (
    <div className="container">
      <div className="row">
        <h1 className="page-title">Wow Shopping!</h1>
        <h3> Empty Front End for Eric, Zack and Graham </h3>
      </div>
    </div>
  );
}
