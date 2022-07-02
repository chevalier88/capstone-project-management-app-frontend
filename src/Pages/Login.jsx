import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../supportFunctions.js';
import { updateUserData } from '../UserContext.jsx';

export default function Login() {
  //             STATES
  // ================================
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //          HELPER FUNCTIONS
  // ================================

  const navigate = useNavigate();
  const updateUser = updateUserData();

  // AJAX call to attempt login. if sucessful, return all relevant account info
  const attemptLogin = () => {
    axios
      .post(`${BACKEND_URL}/attemptLogin`, { username, password })
      .then((response) => {
        console.log('response', response.data);
        if (response.data.status) {
          // if login status = true then update the global UserContext data
          updateUser(response.data.user);
          // redirect to dashboard
          navigate('../dashboard', { replace: true });
        }
      })
      .catch((error) => { console.log(error); });
  };

  //       RENDERING OF COMPONENT
  // ================================
  return (
    <div id="page-container">
      <div className="input-group">
        <input id="username-input" type="text" placeholder="Username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input id="password-input" type="password" placeholder="Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-dark" type="button" onClick={attemptLogin}>
          Submit
        </button>
      </div>
    </div>
  );
}
