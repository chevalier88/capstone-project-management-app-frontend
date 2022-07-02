import React, { useContext } from 'react';
import { UserContext } from '../components/UserContext.jsx';

export default function Profile() {
  // getting user data from useContext in UserContext
  const { user } = useContext(UserContext);
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
