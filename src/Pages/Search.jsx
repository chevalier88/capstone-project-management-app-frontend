/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Container } from '@mui/material';
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
    //   return null;
    // }
    const searchResults = data.filter((user) => user.skills.find((skill) => skill.name.toLowerCase().includes(query)) || user.name.toLowerCase().includes(query));

    return searchResults;
  };

  const dataFiltered = filterData(searchQuery, users);

  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {' '}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </Grid>
          {dataFiltered.map((user) => (
            <Grid key={user.id} item xs={12}>
              <ProfileModalForSearch key={user.id} user={user} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
