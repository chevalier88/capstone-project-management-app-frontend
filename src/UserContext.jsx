/* eslint-disable max-len */
/* eslint-disable react/prop-types */
// ================================
//       CONTEXT for User Data
// ================================
import React, { useContext, useState } from 'react';

// initiatve useContext for retrieve and to update
const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

// this custom hook function will be called in all children components to retrieve the global user data
export function userData() {
  return useContext(UserContext);
}

// this function is to update the user data when user logins
export function updateUserData() {
  return useContext(UserUpdateContext);
}

export default function UserProvider({ children }) {
  // STATE to store user data
  const [user, setUser] = useState({});

  // update user data in state
  function updateUser(newUserData) {
    setUser({ ...newUserData });
  }

  // HOC for wrap the main app
  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
