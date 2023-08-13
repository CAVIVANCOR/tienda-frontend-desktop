/* eslint-disable no-unused-vars */
import React from 'react';
import SearchResultsList from '../global/SearchResultsList';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
function ContentData () {
  const results = useSelector((state) => state.inicio.results);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {results.length > 0 && <SearchResultsList />}
    </Box>
  )
}
export default ContentData;