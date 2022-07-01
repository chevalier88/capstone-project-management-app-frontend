import './App.css';
import React from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './Pages/Home.jsx';
import Search from './Pages/Search.jsx';
import Login from './Pages/Login.jsx';

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

// export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';
// console.log(`BACKEND_URL: ${BACKEND_URL}`);

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
