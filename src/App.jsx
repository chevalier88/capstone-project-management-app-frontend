import './App.css';
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Home from './Pages/Home.jsx';
import Search from './Pages/Search.jsx';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Profile from './Pages/Profile.jsx';
import ProfileEdit from './Pages/ProfileEdit.jsx';
import { UserContext } from './components/UserContext.jsx';
import BACKEND_URL from './supportFunctions.js';

import AssignUsers from './components/FakeDocusign/AssignUsers.jsx';
import Preparation from './components/FakeDocusign/Preparation.jsx';
import Sign from './components/FakeDocusign/Sign.jsx';
import View from './components/FakeDocusign/View.jsx';
import Welcome from './components/FakeDocusign/Welcome.jsx';
import ResponsiveAppBar from './components/ResponsiveAppBar.jsx';

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: [
      'Nanum Gothic',
    ].join(','),
  },
});

export default function App() {
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
  // get user data
  useEffect(() => { getUserData(); }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            {/* <Navbar /> */}
            <ResponsiveAppBar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="dashboard" exact element={<Dashboard />} />
              <Route path="profile" exact element={<Profile />} />
              <Route path="search" element={<Search />} />
              <Route path="login" element={<Login />} />
              <Route path="profile/edit" element={<ProfileEdit />} />
              <Route path="fakeDocusign" exact element={<Welcome />} />
              <Route path="assignUsers" exact element={<AssignUsers />} />
              <Route path="prepareDocument" exact element={<Preparation />} />
              <Route path="signDocument" exact element={<Sign />} />
              <Route path="viewDocument" exact element={<View />} />
            </Routes>
          </Provider>
        </ThemeProvider>
      </UserContext.Provider>
    </BrowserRouter>

  );
}
