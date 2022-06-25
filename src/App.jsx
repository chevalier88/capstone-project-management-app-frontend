import './App.css';
import React from 'react';
import './index.css';
// import React, { useState } from 'react';
import axios from 'axios';
// Components
import ProjectsCards from './components/ProjectsCards.jsx';

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';
console.log(`BACKEND_URL: ${BACKEND_URL}`);

export default function App() {
  return (
    <h1>hello</h1>,
      <ProjectsCards />
  );
}
