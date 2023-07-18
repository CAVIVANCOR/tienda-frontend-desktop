/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { useDispatch } from "react-redux";

function SearchBar ({ placeholder, input, setInput }) {

  const dispatch = useDispatch();
  const handleChange = (e) => {
    let value = e.target.value;
    dispatch(setInput(value));
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder={placeholder}
        value={input}
        onInput={handleChange}
      />
    </div>
  );
}

export default SearchBar;