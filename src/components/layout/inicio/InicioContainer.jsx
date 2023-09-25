/* eslint-disable no-unused-vars */
import React from "react";
import Footer from "../../layout/global/Footer";
import Content from "../../layout/inicio/Content";
import ResponsiveAppBar from "../../layout/global/ResponsiveAppBar";
import { Box } from "@mui/material";
const InicioContainer = () => {
  console.log("Entro a InicioContainer de Inicio");
  return (
    <Box sx={{ flexGrow: 1 }}>
        <ResponsiveAppBar />
        <Content />
        <Footer />
    </Box>
  );
};

export default InicioContainer;
