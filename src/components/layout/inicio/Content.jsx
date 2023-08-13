/* eslint-disable no-unused-vars */
import React from 'react';
import ContentControllers from './ContentControllers';
import ContentData from './ContentData';
import ContentTotals from './ContentTotals';
import { Box, Grid } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
function Content() {
  console.log("Hola entro a Content");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2} >
        <Grid2 xs={12}>
          <ContentControllers />
        </Grid2>
        <Grid2 xs={12}>
          <ContentData />
        </Grid2>
        <Grid2 xs={12}>
          <ContentTotals />
        </Grid2>
      </Grid2>
    </Box>
  )
}
export default Content;