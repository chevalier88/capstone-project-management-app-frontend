/* eslint-disable import/no-unresolved */
import {
  Navigate, useRoutes, BrowserRouter, Routes, Route,
} from 'react-router-dom';
// layouts
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from './DashboardLayout.jsx';
import LogoOnlyLayout from './LogoOnlyLayout.jsx';
//

// import { Provider } from 'react-redux';
// import store from './redux/store.js';
// import Navbar from './components/Navbar/Navbar.jsx';
// import Home from './Pages/Home.jsx';
// import Search from './Pages/Search.jsx';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Profile from './Pages/Profile.jsx';
// import ProfileEdit from './Pages/ProfileEdit.jsx';
// import { UserContext } from './components/UserContext.jsx';
import BACKEND_URL from './supportFunctions.js';

// import AssignUsers from './components/FakeDocusign/AssignUsers.jsx';
// import Preparation from './components/FakeDocusign/Preparation.jsx';
// import Sign from './components/FakeDocusign/Sign.jsx';
// import View from './components/FakeDocusign/View.jsx';
// import Welcome from './components/FakeDocusign/Welcome.jsx';

// ----------------------------------------------------------------------
// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

// .............STATES...............
const [user, setUser] = useState([]);

// .......... HELPER FUNCTIONS .................
async function getUserData() {
  try {
    const results = await axios.get(`${BACKEND_URL}/userData`);
    const { data } = results;
    setUser(data);
  } catch (error) {
    console.log('not logged in. Try again.');
    console.log(error);
  }
}

/// / get user data
useEffect(() => { getUserData(); }, []);
//

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/dashboard', element: <Dashboard /> },
        { path: `/profile/${user}`, element: <Profile /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '/login', element: <Login /> },

      ],
    },
  ]);
}
