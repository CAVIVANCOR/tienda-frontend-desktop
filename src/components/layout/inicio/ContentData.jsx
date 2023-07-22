/* eslint-disable no-unused-vars */

import React from 'react';
import './ContentData.css';
import SearchResultsList from '../global/SearchResultsList';
import { useSelector } from 'react-redux';
function ContentData () {
  const results = useSelector((state) => state.inicio.results);
  return (
    <div className='content-data'>
      {results && results.length > 0 && <SearchResultsList />}
    </div>
    )
}

export default ContentData;