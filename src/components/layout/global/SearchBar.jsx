/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { useDispatch } from "react-redux";
import React, { useState } from "react";

function SearchBar ({ placeholder,  setInput }) {
  const [inputLocal, setInputLocal] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let value = e.target.value;
    setInputLocal(value)
  };
  const handleClick=()=>{
    dispatch(setInput(inputLocal));
  }
  return (
    <div className="input-wrapper">
      <input
        placeholder={placeholder}
        value={inputLocal}
        onInput={(e)=>handleChange(e)}
      />
      <FaSearch id="search-icon" onClick={handleClick}/>
    </div>
  );
}

export default SearchBar;