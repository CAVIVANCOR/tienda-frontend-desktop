
import React from 'react';
import './ContentData.css';
import SearchResultsList from './SearchResultsList';

function ContentData ({results, currentPage, itemsPerPage}) {
  return (
    <div className='content-data'>
      {results && results.length > 0 && <SearchResultsList results={results} currentPage={currentPage} itemsPerPage={itemsPerPage}/>}
    </div>
    )
}

export default ContentData;