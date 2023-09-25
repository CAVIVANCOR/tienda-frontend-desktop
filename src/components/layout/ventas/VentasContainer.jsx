/* eslint-disable no-unused-vars */
import React from "react";
import Footer from "../../layout/global/Footer";
import Content from "../../layout/ventas/Content";
import ResponsiveAppBar from "../../layout/global/ResponsiveAppBar";
import { Box } from "@mui/material";
const VentasContainer = () => {
  console.log("Hola entro a VentasContainer");
  return (
    <Box sx={{ flexGrow: 1 }}>
        <ResponsiveAppBar/>
        <Content />
        <Footer />
    </Box>
  );
};
export default VentasContainer;