import React from 'react';
import "./SearchResultsList.css";
import SearchResult from "./SearchResult";
import { useSelector } from 'react-redux';

function SearchResultsList() {
  const results = useSelector((state) => state.inicio.results);
  const currentPage = useSelector((state) => state.inicio.currentPage);
  const itemsPerPage = useSelector((state) => state.inicio.itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = results.slice(startIndex, endIndex);
  return (
    <section className="search-results-list">
      {currentResults.map((product, id) => {
        let imageUrl = `http://localhost:3001${product.urlFotoProducto}`;
        return (
          <SearchResult
            urlFotoProducto={imageUrl}
            dataCompleta={product}
            key={id}
          />
        );
      })}
    </section>
  );
}

export default SearchResultsList;
