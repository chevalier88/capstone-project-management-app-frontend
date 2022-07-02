import './App.css';
import React from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './Pages/Home.jsx';
import Search from './Pages/Search.jsx';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Profile from './Pages/Profile.jsx';
import UserProvider from './UserContext.jsx';

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="Dashboard" exact element={<Dashboard />} />
          <Route path="profile" exact element={<Profile />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
