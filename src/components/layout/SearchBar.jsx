/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

function SearchBar ({ setResults, input, setInput }) {

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Buscar ID, Descripción"
        value={input}
        onInput={handleChange}
      />
    </div>
  );
}

export default SearchBar;