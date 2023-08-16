/* eslint-disable no-unused-vars */
import React from "react";
import Footer from "../global/Footer";
import Content from "./Content";
import ResponsiveAppBar from "../global/ResponsiveAppBar";
import { Box } from "@mui/material";
const InicioContainer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <ResponsiveAppBar />
        <Content />
        <Footer />
    </Box>
  );
};

export default InicioContainer;
