// pantry-tracker-app/components/Search.js
"use client";

import { TextField } from '@mui/material';

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      label="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
    />
  );
};

export default Search;
