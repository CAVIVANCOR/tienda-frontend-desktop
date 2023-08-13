/* eslint-disable no-unused-vars */
import React from "react";
import Footer from "../global/Footer";
import Content from "../ventas/Content";
import ResponsiveAppBar from "../global/ResponsiveAppBar";
import { Box, Grid } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
const VentasContainer = () => {
  console.log("Hola entro a VentasContainer");
  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid2 container spacing={2} disableEqualOverflow backgroundColor="#00386d">
        <Grid2 xs={12}>
          <ResponsiveAppBar/>
        </Grid2>
        <Grid2 xs={12}>
          <Content/>
        </Grid2>
        <Grid2 xs={12}>
          <Footer/>
        </Grid2>
      </Grid2>
    </Box>
  );
};
export default VentasContainer;