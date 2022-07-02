import React from 'react';
import { userData } from '../UserContext.jsx';

export default function Profile() {
  // getting user data from useContext in UserContext
  const user = userData();
  return (
    <div id="page-container">
      <h1>Profile of USER (PM/SWE)</h1>
      <h1>
        Current user =
        {' '}
        {user.name}
      </h1>
      <h3>should have projects done, name, age , skills</h3>
    </div>
  );
}
