import './App.css';
import React from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Pages/Home.jsx';
import Login from './components/Pages/Login.jsx';
import Search from './components/Pages/Search.jsx';

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';
console.log(`BACKEND_URL: ${BACKEND_URL}`);

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
