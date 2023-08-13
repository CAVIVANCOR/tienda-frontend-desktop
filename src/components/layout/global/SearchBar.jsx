/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaRegTimesCircle, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
function SearchBar ({ placeholder,  setInput }) {
  const [inputLocal, setInputLocal] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let value = e.target.value;
    setInputLocal(value)
  };
  const handleClick= async()=>{
    let tempSearch = inputLocal;
    setInputLocal("");
    await dispatch(setInput(""));
    await dispatch(setInput(tempSearch));
    setInputLocal(tempSearch);
  }
  const handleCleanClick = async () => {
    setInputLocal("");
    await dispatch(setInput(""));
  }
  return (
    <Box sx={{ flexGrow: 1, border: "2px solid grey", borderRadius: "15px", backgroundColor: "white" }}>
      <Grid2 container xs={12} alignItems="center" spacing={0}>
        <Grid2 align="center" xs={1.5} >
          <FaRegTimesCircle fontSize={"large"} id="clean-icon" onClick={handleCleanClick} />
        </Grid2>
        <Grid2 xs={9} >
          <TextField sx={{ width: "100%", mt: 0.5, mb: 0.5 }} id="search-bar" placeholder={placeholder} value={inputLocal} size="small" onInput={handleChange}/>
        </Grid2>
        <Grid2 align="center" xs={1.5} >
          <FaSearch id="search-icon" onClick={handleClick}/>
        </Grid2>
      </Grid2>
    </Box>
  );
}
export default SearchBar;