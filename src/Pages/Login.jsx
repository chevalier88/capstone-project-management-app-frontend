import { React, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../supportFunctions.js';

export default function Login() {
  //             STATES
  // ================================
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //          HELPER FUNCTIONS
  // ================================

  // change state as user types
  const handleInputUsername = (event) => {
    const newName = event.target.value;
    setUsername(newName);
  };

  // change state as user types
  const handleInputPassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  // AJAX call to attempt login. if sucessful, return all relevant account info
  const attemptLogin = () => {
    axios
      .post(`${BACKEND_URL}/attemptLogin`, { username, password })
      .then((response) => {
        console.log('response', response.data);
      })
      .catch((error) => { console.log(error); });
  };

  // ================================
  //       RENDERING OF COMPONENT
  // ================================
  return (
    <div id="page-container">
      <div className="input-group">
        <input id="username-input" type="text" placeholder="Username" className="form-control" value={username} onChange={handleInputUsername} />
        <input id="password-input" type="password" placeholder="Password" className="form-control" value={password} onChange={handleInputPassword} />
        <button className="btn btn-dark" type="button" onClick={attemptLogin}>
          Submit
        </button>
      </div>
    </div>
  );
}
