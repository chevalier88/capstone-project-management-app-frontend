import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar.jsx';
import BACKEND_URL from '../supportFunctions.js';
import ProfileModalForSearch from '../components/ProfileModalForSearch.jsx';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  async function getAllUsers() {
    try {
      const results = await axios.get(`${BACKEND_URL}/users`);
      const { data } = results;
      const currentArray = [];
      data.forEach((user) => {
        if (user.accountType === 'engineer') {
          currentArray.push(user);
        }
      });
      console.log(currentArray);
      setUsers(currentArray);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const filterData = (query, data) => {
    // if (!query) {
    //   return data;
    // }
    const searchResults = data.filter((user) => user.name.toLowerCase().includes(query));
    return searchResults;
  };

  const dataFiltered = filterData(searchQuery, users);

  return (
    <div
      style={{
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 20,
      }}
    >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div style={{ padding: 3 }}>
        {dataFiltered.map((user) => (
          <ProfileModalForSearch key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
