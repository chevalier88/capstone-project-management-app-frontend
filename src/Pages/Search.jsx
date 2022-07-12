import React, { useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';

const data = [
  'Paris',
  'London',
  'New York',
  'Tokyo',
  'Berlin',
  'Buenos Aires',
  'Cairo',
  'Canberra',
  'Rio de Janeiro',
  'Dublin',
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const filterData = (query, data) => {
    if (!query) {
      return data;
    }
    return data.filter((d) => d.toLowerCase().includes(query));
  };

  const dataFiltered = filterData(searchQuery, data);

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
            key={d.id}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
