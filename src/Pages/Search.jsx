import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar.jsx';
import BACKEND_URL from '../supportFunctions.js';

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
          currentArray.push(user.name);
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
    if (!query) {
      return data;
    }
    return data.filter((d) => d.toLowerCase().includes(query));
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
        {dataFiltered.map((d) => (
          <div
            className="text"
            style={{
              padding: 5,
              justifyContent: 'normal',
              fontSize: 20,
              color: 'blue',
              margin: 1,
              width: '250px',
              BorderColor: 'green',
              borderWidth: '10px',
            }}
            key={d}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
